"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number; segs: number[] };

// seeded random, so the circuit layout is the same on every visit
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

// circuit traces on a grid: each runs mostly to the right, turning at 45° now and then, and ends in a node
function buildTraces(w: number, h: number, cell: number): Trace[] {
  const rand = rng(7);
  const cols = Math.ceil(w / cell) + 2;
  const rows = Math.ceil(h / cell) + 2;
  const used = new Set<string>();
  const traces: Trace[] = [];
  const count = Math.round((cols * rows) / 9);

  for (let t = 0; t < count; t++) {
    let cx = Math.floor(rand() * cols) - 1;
    let cy = Math.floor(rand() * rows) - 1;
    if (used.has(`${cx},${cy}`)) continue;
    const pts: Pt[] = [{ x: cx * cell, y: cy * cell }];
    let dy = 0;
    const steps = 3 + Math.floor(rand() * 9);
    for (let s = 0; s < steps; s++) {
      if (rand() < 0.3) dy = dy === 0 ? (rand() < 0.5 ? -1 : 1) : 0;
      const nx = cx + 1;
      const ny = cy + dy;
      if (used.has(`${nx},${ny}`)) break;
      used.add(`${nx},${ny}`);
      cx = nx;
      cy = ny;
      const last = pts[pts.length - 1];
      const p = { x: cx * cell, y: cy * cell };
      // merge straight runs into one segment
      const prev = pts[pts.length - 2];
      if (prev && (p.y - last.y) * (last.x - prev.x) === (last.y - prev.y) * (p.x - last.x)) pts[pts.length - 1] = p;
      else pts.push(p);
    }
    if (pts.length < 2) continue;
    const segs = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
    traces.push({ pts, segs, len: segs.reduce((a, b) => a + b, 0) });
  }
  return traces;
}

function pointAt(tr: Trace, d: number): Pt {
  let i = 0;
  while (i < tr.segs.length - 1 && d > tr.segs[i]) d -= tr.segs[i++];
  const a = tr.pts[i];
  const b = tr.pts[i + 1];
  const k = Math.min(1, Math.max(0, d / tr.segs[i]));
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

// Technology backdrop for dark heroes: a faint circuit board with glowing data pulses running along its traces
export function TechCircuit({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let traces: Trace[] = [];
    let base: HTMLCanvasElement | null = null;
    type Pulse = { tr: Trace; d: number; speed: number; color: string };
    let pulses: Pulse[] = [];
    const colors = ["#7dd3fc", "#1ec0f2", "#8ea8ff", "#f0a23b"];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = w < 640 ? 34 : 44;
      traces = buildTraces(w, h, cell);

      // draw the still board once into an offscreen canvas
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d")!;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      b.lineWidth = 1;
      b.strokeStyle = "rgba(125, 160, 255, 0.3)";
      for (const tr of traces) {
        b.beginPath();
        b.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (const p of tr.pts.slice(1)) b.lineTo(p.x, p.y);
        b.stroke();
        const end = tr.pts[tr.pts.length - 1];
        b.fillStyle = "#060d18";
        b.beginPath();
        b.arc(end.x, end.y, 2.6, 0, Math.PI * 2);
        b.fill();
        b.strokeStyle = "rgba(125, 200, 255, 0.7)";
        b.stroke();
        b.strokeStyle = "rgba(125, 160, 255, 0.3)";
        b.fillStyle = "rgba(125, 160, 255, 0.55)";
        b.fillRect(tr.pts[0].x - 1.5, tr.pts[0].y - 1.5, 3, 3);
      }
      // a few chip outlines
      const rand = rng(11);
      b.strokeStyle = "rgba(125, 160, 255, 0.26)";
      for (let i = 0; i < Math.max(3, Math.round(w / 260)); i++) {
        const cw = cell * (1 + Math.floor(rand() * 2));
        const x = Math.round((rand() * w) / cell) * cell + cell / 2;
        const y = Math.round((rand() * h) / cell) * cell + cell / 2;
        b.strokeRect(x, y, cw, cw * 0.7);
        for (let k = 1; k < 4; k++) {
          b.beginPath();
          b.moveTo(x + (cw * k) / 4, y);
          b.lineTo(x + (cw * k) / 4, y - 6);
          b.moveTo(x + (cw * k) / 4, y + cw * 0.7);
          b.lineTo(x + (cw * k) / 4, y + cw * 0.7 + 6);
          b.stroke();
        }
      }

      const n = Math.min(40, Math.round(traces.length / 3));
      pulses = Array.from({ length: n }, () => newPulse(true));
    };

    const newPulse = (anywhere = false): Pulse => {
      const tr = traces[Math.floor(Math.random() * traces.length)];
      return {
        tr,
        d: anywhere ? Math.random() * tr.len : 0,
        speed: 40 + Math.random() * 70,
        color: Math.random() < 0.12 ? colors[3] : colors[Math.floor(Math.random() * 3)],
      };
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      // nothing to draw until the canvas has a size
      if (!w || !h || !base?.width || !base.height) return;
      ctx.drawImage(base, 0, 0, w, h);
      if (reduce) return;
      ctx.lineCap = "round";
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.d += p.speed * dt;
        if (p.d > p.tr.len + 40) {
          pulses[i] = newPulse();
          continue;
        }
        // tail: a short fading stroke behind the head
        const tail = 46;
        for (let k = 0; k < 6; k++) {
          const d0 = p.d - (tail * k) / 6;
          const d1 = p.d - (tail * (k + 1)) / 6;
          if (d0 < 0 || d0 > p.tr.len) continue;
          const a = pointAt(p.tr, d0);
          const bb = pointAt(p.tr, Math.max(0, d1));
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.75 * (1 - k / 6);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(bb.x, bb.y);
          ctx.stroke();
        }
        if (p.d <= p.tr.len) {
          const head = pointAt(p.tr, p.d);
          ctx.globalAlpha = 1;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
    };

    setup();
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) draw(dt);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    // pause while the hero is scrolled out of view
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);
    // resizing clears the canvas, so redraw straight away rather than waiting for the next frame
    const ro = new ResizeObserver(() => {
      setup();
      draw(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none block h-full w-full ${className}`} />;
}
