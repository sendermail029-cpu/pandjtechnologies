"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, inView } from "framer-motion";

// where each reveal starts from (the markup keeps the familiar data-aos names)
const FROM: Record<string, { x?: number; y?: number }> = {
  "fade-up": { y: 40 },
  "fade-down": { y: -40 },
  "fade-left": { x: 60 }, // slides in from the right
  "fade-right": { x: -60 }, // slides in from the left
  fade: {},
};

/**
 * Scroll reveals powered by Framer Motion. Mark any element with data-aos="fade-up" (or fade-left / fade-right)
 * and optionally data-aos-delay="200" (ms); it springs into place the first time it scrolls into view.
 * CSS keeps [data-aos] hidden until it gets data-revealed (a <noscript> style in the layout shows it without JS).
 * Elements are marked revealed only when they actually animate, so re-running this effect (React strict mode,
 * client navigation) never strands anything hidden.
 */
export function MotionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]:not([data-revealed])"));

    if (still) {
      els.forEach((el) => (el.dataset.revealed = ""));
      return;
    }

    const stops = els.map((el) =>
      inView(
        el,
        () => {
          if (el.dataset.revealed !== undefined) return;
          el.dataset.revealed = "";
          const from = FROM[el.dataset.aos ?? ""] ?? FROM["fade-up"];
          const delay = Number(el.dataset.aosDelay ?? 0) / 1000;
          animate(el, { opacity: [0, 1] }, { duration: 0.6, delay, ease: "easeOut" });
          animate(el, { x: [from.x ?? 0, 0], y: [from.y ?? 0, 0] }, { type: "spring", stiffness: 80, damping: 17, mass: 0.9, delay });
        },
        { amount: 0.15 },
      ),
    );
    return () => stops.forEach((stop) => stop());
  }, [pathname]);

  return null;
}
