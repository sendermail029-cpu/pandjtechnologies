"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const ease = [0.22, 1, 0.36, 1] as const;

export type Commitment = { title: string; text: string };

// Our written commitments shown as the agreement itself: each clause ticks off as it scrolls in,
// then a signature draws itself and the "signed" stamp lands
export function CommitmentsContract({ items }: { items: Commitment[] }) {
  const reduce = useReducedMotion();
  const done = 0.3 + items.length * 0.25; // when the last clause has ticked

  return (
    <motion.div
      className="relative"
      initial={reduce ? false : { opacity: 0, y: 30, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease }}
    >
      {/* a second sheet peeking out behind */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-[22px] bg-white/10" />

      <div className="relative overflow-hidden rounded-[22px] bg-[#fbfcff] p-7 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
        {/* faint ruled lines like paper */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_31px,rgb(39_71_214/0.06)_32px)] bg-[size:100%_32px]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-ink/10 pb-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate">Service agreement</p>
            <p className="mt-1.5 text-[19px] font-semibold tracking-tight">Our commitments to you</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.webp" alt="" className="h-10 w-10 shrink-0 object-contain" />
        </div>

        <ol className="relative mt-6 space-y-6">
          {items.map((c, i) => (
            <motion.li
              key={c.title}
              className="flex gap-4"
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease, delay: 0.3 + i * 0.25 }}
            >
              <span className="mt-0.5 font-mono text-[12px] text-slate">§{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold tracking-tight">{c.title}</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-slate">{c.text}</span>
              </span>
              <motion.span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.55 + i * 0.25 }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                </svg>
              </motion.span>
            </motion.li>
          ))}
        </ol>

        {/* signature line */}
        <div className="relative mt-8 flex items-end justify-between gap-6 border-t border-dashed border-ink/15 pt-6">
          <div className="min-w-0">
            <svg viewBox="0 0 220 60" className="h-12 w-44 text-cobalt" aria-hidden>
              <motion.path
                d="M6 42c14-22 22-30 28-26 6 5-10 30-2 32 9 2 16-30 26-28 8 2-4 24 4 26 10 2 18-22 28-20 7 2 2 16 10 16 12 0 22-14 34-16 10-2 14 8 26 8 14 0 30-10 44-14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: done }}
              />
            </svg>
            <p className="mt-1 border-t border-ink/20 pt-1.5 text-[12.5px] text-slate">
              For <span className={`${serif.className} text-[14px] text-ink`}>P &amp; J Technologies</span>
            </p>
          </div>

          {/* stamp */}
          <motion.div
            aria-hidden
            className="grid h-24 w-24 shrink-0 -rotate-12 place-items-center rounded-full border-[3px] border-double border-emerald-600/80 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-emerald-700/90"
            initial={reduce ? false : { opacity: 0, scale: 1.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: done + 1.3 }}
          >
            In every
            <br />
            contract
            <br />✓
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
