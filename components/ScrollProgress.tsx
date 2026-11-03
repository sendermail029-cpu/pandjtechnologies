"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// A thin brand-coloured bar along the top of the window that fills as you scroll the page
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cobalt via-sky to-saffron"
    />
  );
}
