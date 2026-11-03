"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

// Ray-marched cobalt "liquid glass": soft blobs that merge and part, lit by studio softboxes
// (white key, sky-blue side, saffron rim). One blob follows the pointer. Transparent outside the shapes.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
  float t = uTime * 0.32;
  float d = length(p - vec3(sin(t) * 0.8, cos(t * 1.3) * 0.45, sin(t * 0.7) * 0.4)) - 0.78;
  d = smin(d, length(p - vec3(cos(t * 0.8) * 1.1, sin(t * 1.1) * 0.75, cos(t * 0.5) * 0.5)) - 0.52, 0.6);
  d = smin(d, length(p - vec3(sin(t * 1.4 + 2.0) * 0.75, sin(t * 0.9 + 1.0) * 0.95, 0.3)) - 0.46, 0.6);
  d = smin(d, length(p - vec3(cos(t * 0.6 + 4.0) * 1.25, cos(t * 1.2) * 0.35, -0.4)) - 0.58, 0.6);
  d = smin(d, length(p - vec3(uMouse.x * 1.7, uMouse.y * 1.1, 0.6)) - 0.36, 0.75);
  return d;
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

vec3 env(vec3 r) {
  float y = r.y * 0.5 + 0.5;
  vec3 c = mix(vec3(0.015, 0.03, 0.07), vec3(0.09, 0.2, 0.48), smoothstep(0.15, 1.0, y));
  c += vec3(0.95, 0.97, 1.0) * smoothstep(0.93, 0.995, dot(r, normalize(vec3(-0.5, 0.7, 0.6)))) * 1.6;
  c += vec3(0.12, 0.75, 0.95) * smoothstep(0.86, 0.99, dot(r, normalize(vec3(0.85, 0.1, 0.4)))) * 1.0;
  c += vec3(0.94, 0.64, 0.23) * smoothstep(0.9, 1.0, dot(r, normalize(vec3(0.15, -0.65, 0.7)))) * 0.6;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 7.0);
  vec3 rd = normalize(vec3(uv, -1.55));

  float t = 0.0;
  float glow = 0.0;
  bool hit = false;
  for (int i = 0; i < 80; i++) {
    float d = map(ro + rd * t);
    glow += exp(-max(d, 0.0) * 9.0) * 0.012;
    if (d < 0.001) { hit = true; break; }
    t += d * 0.9;
    if (t > 12.0) break;
  }

  if (hit) {
    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec3 r = reflect(rd, n);
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    float key = max(dot(n, normalize(vec3(-0.4, 0.8, 0.5))), 0.0);
    vec3 base = vec3(0.07, 0.19, 0.78) * (0.25 + 0.75 * key);
    vec3 col = mix(base, env(r), 0.3 + 0.7 * fres);
    // thin-film shimmer along the edges
    col += 0.18 * fres * (0.5 + 0.5 * cos(6.2832 * (fres * 1.4 + vec3(0.0, 0.33, 0.67))));
    gl_FragColor = vec4(col, 1.0);
  } else {
    // soft cobalt halo around the shapes, transparent elsewhere
    vec3 halo = vec3(0.16, 0.36, 0.95) * glow;
    gl_FragColor = vec4(halo, clamp(glow, 0.0, 1.0));
  }
}
`;

function shader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
  return s;
}

export function LiquidGlass({ className = "", quality = 0.85 }: { className?: string; quality?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { premultipliedAlpha: false, alpha: true, antialias: false });
    if (!gl) return; // no WebGL: the section's own background shows

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, shader(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, shader(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link error");
    } catch (err) {
      console.warn("LiquidGlass disabled:", err);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.35, y: -0.2 };
    const mouse = { ...target };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
      const w = Math.max(1, Math.round(el.clientWidth * dpr));
      const h = Math.max(1, Math.round(el.clientHeight * dpr));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
      }
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, still ? 4 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = visible && !still ? requestAnimationFrame(frame) : 0;
    };
    raf = requestAnimationFrame(frame);
    requestAnimationFrame(() => (el.style.opacity = "1"));

    // stop rendering while scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [quality]);

  return <canvas ref={canvas} aria-hidden className={`block h-full w-full opacity-0 transition-opacity duration-1000 ${className}`} />;
}
