"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];
const COBALT: RGB = [39, 71, 214];
const NAVY: RGB = [11, 42, 102];
const SKY: RGB = [30, 192, 242];

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/**
 * A wide ribbon drawn as a stack of hairlines that twists edge-on into bright creases as it drifts across the frame,
 * in brand blues. Canvas 2D, so it is light; pauses off-screen and holds still for reduced motion.
 */
export function TwistLines({
  className = "",
  lines = 40,
  centreY = 0.62,
  thickness = 0.2,
}: {
  className?: string;
  lines?: number;
  centreY?: number; // vertical centre of the ribbon, 0..1 of the canvas height
  thickness?: number; // half-width of the ribbon, 0..1 of the canvas height
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, w * dpr);
      el.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ribbon geometry at horizontal position x (0..1) and time t; wave lengths are in pixels so narrow screens
    // get the same broad folds as wide ones
    const k = () => w / 1400;
    const centre = (x: number, t: number) =>
      h * centreY + h * 0.08 * Math.sin(x * 4.2 * k() - t * 0.35) + h * 0.03 * Math.sin(x * 9 * k() + t * 0.2);
    const half = (x: number, t: number) => h * thickness * Math.sin(x * 5.2 * k() - t * 0.5 + 0.6); // signed: crossing zero = the twist
    const band = (x0: number, x1: number, t: number, u0: number, u1: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = x0 + ((x1 - x0) * i) / 120;
        const y = centre(x, t) + u0 * half(x, t);
        if (i === 0) ctx.moveTo(x * w, y);
        else ctx.lineTo(x * w, y);
      }
      for (let i = 120; i >= 0; i--) {
        const x = x0 + ((x1 - x0) * i) / 120;
        ctx.lineTo(x * w, centre(x, t) + u1 * half(x, t));
      }
      ctx.closePath();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const steps = Math.max(60, Math.round(w / 6));
      const xs = Array.from({ length: steps + 1 }, (_, i) => i / steps);

      // satin body: deep blue toward the edges, with a soft bright sheen down the middle of each lobe
      band(0, 1, t, -1, 1);
      ctx.fillStyle = rgba(COBALT, 0.34);
      ctx.fill();
      band(0, 1, t, -0.82, 0.82);
      ctx.fillStyle = rgba(SKY, 0.22);
      ctx.fill();
      ctx.save();
      ctx.filter = "blur(14px)";
      band(0, 1, t, -0.42, 0.42);
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.fill();
      ctx.restore();

      // hairlines across the width; each one is denser and darker toward the edges, so twists read as bright creases
      for (let k = 0; k <= lines; k++) {
        const u = (k / lines) * 2 - 1; // -1..1 across the ribbon
        const edge = Math.abs(u);
        ctx.beginPath();
        xs.forEach((x, i) => {
          const y = centre(x, t) + u * half(x, t);
          if (i === 0) ctx.moveTo(x * w, y);
          else ctx.lineTo(x * w, y);
        });
        const c = edge > 0.92 ? NAVY : edge > 0.6 ? COBALT : SKY;
        ctx.strokeStyle = rgba(c, edge > 0.92 ? 0.9 : 0.14 + edge * 0.4);
        ctx.lineWidth = edge > 0.92 ? 1.8 : 0.9;
        ctx.stroke();
      }
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const loop = (now: number) => {
      draw(still ? 2 : (now - start) / 1000);
      raf = visible && !still ? requestAnimationFrame(loop) : 0;
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [lines, centreY, thickness]);

  return <canvas ref={canvas} aria-hidden className={`block h-full w-full ${className}`} />;
}
