"use client";

import { useEffect, useRef } from "react";

const LINES = 90;

export function HeroWave({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    // Fixed dust particles drifting around the ribbon
    const dust = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.4 + 0.1,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const mid = h / 2;
      const amp = h / 340; // scale shapes with canvas height

      // Soft glow in the centre of the ribbon
      ctx!.save();
      ctx!.translate(w * 0.48, mid);
      ctx!.scale(2.8, 1);
      const glow = ctx!.createRadialGradient(0, 0, 0, 0, 0, h * 0.3);
      glow.addColorStop(0, "rgba(96, 150, 255, 0.4)");
      glow.addColorStop(1, "rgba(96, 150, 255, 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(-w, -h, w * 2, h * 2);
      ctx!.restore();

      ctx!.lineWidth = 0.7;
      for (let i = 0; i < LINES; i++) {
        const u = i / (LINES - 1) - 0.5;
        ctx!.strokeStyle = `rgba(59, 120, 246, ${0.14 + (0.5 - Math.abs(u)) * 0.2})`;
        ctx!.beginPath();
        for (let x = 0; x <= w + 4; x += 4) {
          const base = Math.sin(x * 0.004 + t * 0.6) * 28 + Math.sin(x * 0.011 - t * 0.4 + 1.3) * 16;
          const spread = u * (110 + 70 * Math.sin(x * 0.0055 + t * 0.3 + 2));
          const twist = Math.sin(x * 0.009 + t * 0.5 + u * 3) * 18 * u;
          // each strand drifts on its own so the band reads as a woven mesh
          const strand = Math.sin(x * 0.007 + t * 0.8 + i * 0.37) * 14 + Math.sin(x * 0.013 - t * 0.5 + i * 0.91) * 7;
          const y = mid + (base + spread + twist + strand) * amp;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }

      ctx!.fillStyle = "rgba(59, 120, 246, 0.45)";
      for (const d of dust) {
        const x = ((d.x + t * 0.01 * d.s) % 1) * w;
        const y = d.y * h + Math.sin(t * d.s + d.x * 10) * 6;
        ctx!.beginPath();
        ctx!.arc(x, y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function frame(now: number) {
      draw((now - start) / 1000);
      if (visible) raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    // Pause the animation while the hero is scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block w-full ${className}`} />;
}
