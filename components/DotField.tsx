"use client";

import { useEffect, useRef } from "react";

// A grid of dots on a dark ground: a slow diagonal wave breathes through it, and dots near the pointer swell and
// glow from cobalt to sky. Clicking sends out a ripple. Pauses off-screen; static for reduced motion.
// `strength` scales the dots' opacity (lower it on light backgrounds)
export function DotField({ className = "", gap = 26, strength = 1 }: { className?: string; gap?: number; strength?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const ripples: { x: number; y: number; t: number }[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -9999;
    };
    const onDown = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };
    const host = el.parentElement ?? el;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);

    let raf = 0;
    let visible = true;
    const draw = (now: number) => {
      const t = now / 1000;
      if (pointer.tx < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      } else {
        pointer.x += (pointer.tx - pointer.x) * 0.15;
        pointer.y += (pointer.ty - pointer.y) * 0.15;
      }
      while (ripples.length && now - ripples[0].t > 1800) ripples.shift();

      ctx.clearRect(0, 0, w, h);
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const wave = still ? 0.5 : 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.008 - t * 0.9);
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          let near = Math.max(0, 1 - d / 170);
          for (const r of ripples) {
            const radius = ((now - r.t) / 1800) * 520;
            const band = 1 - Math.min(1, Math.abs(Math.hypot(x - r.x, y - r.y) - radius) / 40);
            near = Math.max(near, band * (1 - (now - r.t) / 1800));
          }
          const size = 1 + wave * 0.6 + near * 2.6;
          // cobalt (39,71,214) → sky (30,192,242) as the pointer gets close
          const cr = 39 + (30 - 39) * near;
          const cg = 71 + (192 - 71) * near;
          const cb = 214 + (242 - 214) * near;
          ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${(0.3 + wave * 0.25 + near * 0.45) * strength})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = visible && !still ? requestAnimationFrame(draw) : 0;
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [gap, strength]);

  return <canvas ref={canvas} aria-hidden className={`block h-full w-full ${className}`} />;
}
