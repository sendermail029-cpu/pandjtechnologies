"use client";

import { motion, useReducedMotion } from "framer-motion";

// Animated contact icon: a glossy question bubble in logo colours, pulse rings, and Email / Phone / WhatsApp badges orbiting it
export function HelpOrbit({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className={`relative flex h-[320px] w-[320px] items-center justify-center ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-44 w-44 rounded-full border border-[#14b8c4]/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={reduce ? { scale: 1.2, opacity: 0.3 } : { scale: [0.8, 1.9], opacity: [0.6, 0] }}
          transition={reduce ? {} : { duration: 3.6, repeat: Infinity, ease: "easeOut", delay: i * 1.2 }}
        />
      ))}
      <div className="absolute h-56 w-56 rounded-full bg-[#14b8c4]/20 blur-3xl" />

      <motion.svg
        width="190"
        height="180"
        viewBox="0 0 190 180"
        className="relative drop-shadow-[0_30px_40px_rgb(11_31_92/0.35)]"
        {...(reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } })}
      >
        <defs>
          <linearGradient id="ho-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5eead4" />
            <stop offset="0.5" stopColor="#1ec0f2" />
            <stop offset="1" stopColor="#2747d6" />
          </linearGradient>
          <linearGradient id="ho-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M40 10h110a30 30 0 0 1 30 30v62a30 30 0 0 1-30 30H88l-34 34v-34H40a30 30 0 0 1-30-30V40a30 30 0 0 1 30-30z" fill="url(#ho-fill)" />
        <path d="M40 14h110a26 26 0 0 1 26 26v18c-40 12-110 14-162 0V40a26 26 0 0 1 26-26z" fill="url(#ho-shine)" />
        <path d="M74 56a21 21 0 1 1 30 19c-6 3-9 6-9 12v4" fill="none" stroke="#fff" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="95" cy="112" r="8" fill="#f0a23b" />
      </motion.svg>

      <motion.div
        className="absolute inset-[20px]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[
          { pos: "left-1/2 -top-2 -translate-x-1/2", bg: "bg-white text-[#0e9aa6] ring-1 ring-line", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
          { pos: "-right-2 bottom-8", bg: "bg-saffron text-ink", d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" },
          { pos: "-left-2 bottom-8", bg: "bg-[#25d366] text-white", d: "M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z" },
        ].map((ic) => (
          <motion.span
            key={ic.d}
            className={`absolute grid h-12 w-12 place-items-center rounded-2xl shadow-xl shadow-ink/20 ${ic.pos} ${ic.bg}`}
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={ic.d} />
            </svg>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
