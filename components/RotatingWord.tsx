"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Cycles through words with a short slide-up. The first word renders fully visible (server HTML included);
// only the swaps that follow animate, so the word never depends on an animation finishing to be seen.
export function RotatingWord({ words, className = "", interval = 2400 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    // extra bottom padding (cancelled by the negative margin) keeps italic descenders inside the clip
    <span className="relative -mb-[0.2em] inline-grid overflow-hidden pb-[0.2em] align-bottom">
      {/* invisible longest word: fixes the width so swaps never clip or shift the line */}
      <span aria-hidden className={`invisible col-start-1 row-start-1 ${className}`}>
        {longest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          className={`col-start-1 row-start-1 inline-block ${className}`}
          initial={{ y: "70%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
