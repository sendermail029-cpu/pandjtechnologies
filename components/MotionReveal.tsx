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
    const root = document.documentElement;
    let els = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]:not([data-revealed])"));

    if (still) {
      els.forEach((el) => (el.dataset.revealed = ""));
      root.classList.remove("aos-intro");
      return;
    }

    // first load: the CSS intro already showed what's on screen, so keep that as it is
    // and only hide what's further down, to reveal it on scroll
    if (root.classList.contains("aos-intro")) {
      const h = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < h && r.bottom > 0) el.dataset.revealed = "";
      });
      els = els.filter((el) => el.dataset.revealed === undefined);
      root.classList.remove("aos-intro");
    }
    root.classList.add("aos-armed");

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
