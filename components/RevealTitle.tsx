"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Heading whose words rise out of a mask one after another; the accent words carry a slowly flowing gradient
export function RevealTitle({ plain, accent, className = "" }: { plain: string; accent: string; className?: string }) {
  const reduce = useReducedMotion();
  const plainWords = plain.split(" ");
  const accentWords = accent.split(" ");

  const word = (w: string, order: number, isAccent: boolean) => (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${isAccent ? "title-flow bg-clip-text text-transparent" : ""}`}
        initial={reduce ? false : { y: "105%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease, delay: 0.25 + order * 0.14 }}
      >
        {w}
      </motion.span>
    </span>
  );

  const total = plainWords.length + accentWords.length;

  return (
    <h1 className={className}>
      <span className="sr-only">{`${plain} ${accent}`}</span>
      <span aria-hidden>
        {plainWords.map((w, i) => (
          <Fragment key={i}>
            {word(w, i, false)}{" "}
          </Fragment>
        ))}
        {/* the accent stays together on one line */}
        <span className="whitespace-nowrap">
          {accentWords.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              {word(w, plainWords.length + i, true)}
            </Fragment>
          ))}
        </span>
      </span>
      {/* hairline that draws in under the heading */}
      <motion.span
        aria-hidden
        className="mt-5 block h-px w-40 origin-left bg-gradient-to-r from-saffron via-sky to-transparent"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.25 + total * 0.14 }}
      />
    </h1>
  );
}
