"use client";

import { useEffect, useRef } from "react";

// Two eyeballs that sit inline in a headline (the "oo" in "look") and follow the pointer.
export function LookingEyes() {
  const irises = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const iris of irises.current) {
          const eye = iris?.parentElement;
          if (!iris || !eye) continue;
          const r = eye.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const reach = Math.min(dist / 6, r.width * 0.24);
          iris.style.transform = `translate(${(dx / dist) * reach}px, ${(dy / dist) * reach}px)`;
        }
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span aria-hidden className="inline-flex gap-[0.03em] align-baseline">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="relative inline-block h-[0.68em] w-[0.68em] translate-y-[0.04em] overflow-hidden rounded-full shadow-[inset_-0.04em_-0.06em_0.12em_rgba(120,60,70,0.45),0_0.03em_0.08em_rgba(15,29,51,0.25)]"
          style={{ background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #f7eeef 40%, #e6cfd2 72%, #c79fa6 100%)" }}
        >
          <span
            ref={(el) => {
              irises.current[i] = el;
            }}
            className="absolute left-[27%] top-[27%] h-[46%] w-[46%] rounded-full transition-transform duration-150 ease-out"
            style={{
              background:
                "radial-gradient(circle, #0b1422 0 30%, #0a8b97 33%, #0b6aa8 62%, #0b2a66 100%)",
              transform: "translate(0.05em, -0.04em)",
            }}
          >
            <span className="absolute left-[22%] top-[18%] h-[22%] w-[22%] rounded-full bg-white/85" />
          </span>
        </span>
      ))}
    </span>
  );
}
