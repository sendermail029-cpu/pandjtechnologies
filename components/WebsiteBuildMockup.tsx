"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE = 7; // seconds for one build of the page

// A website being built, block by block, in a browser window, with the same site on a phone beside it (responsive),
// and tags for what every site gets
export function WebsiteBuildMockup() {
  const reduce = useReducedMotion();

  // each block fades and rises in at its moment, holds, then the page resets and builds again
  const block = (at: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: [0, 1, 1, 0], y: [10, 0, 0, 0] },
          transition: { duration: CYCLE, times: [at, at + 0.06, 0.92, 1], repeat: Infinity, ease: "easeOut" as const },
        };

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[600px] pb-10 pt-6">
      <div className="absolute inset-[10%] rounded-full bg-cobalt/40 blur-3xl" />

      {/* browser window */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1630] shadow-[0_40px_90px_-30px_rgba(30,192,242,0.55)]"
        initial={reduce ? false : { opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease }}
        style={{ transformPerspective: 1200 }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f1d3d] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-[#0b1630] px-3 font-mono text-[11px] text-white/50">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.4">
              <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z" />
            </svg>
            yourbusiness.com
          </span>
        </div>

        <div className="space-y-3 p-5">
          {/* nav */}
          <motion.div className="flex items-center justify-between" {...block(0)}>
            <span className="h-3 w-20 rounded-full bg-sky/80" />
            <span className="flex gap-2">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-2 w-10 rounded-full bg-white/20" />
              ))}
              <span className="h-4 w-14 rounded-full bg-saffron/90" />
            </span>
          </motion.div>
          {/* hero */}
          <div className="grid grid-cols-[1.2fr_1fr] gap-4 pt-2">
            <div className="space-y-2.5">
              <motion.span className="block h-4 w-[90%] rounded-full bg-white/85" {...block(0.08)} />
              <motion.span className="block h-4 w-[70%] rounded-full bg-white/85" {...block(0.12)} />
              <motion.span className="block h-2 w-[95%] rounded-full bg-white/25" {...block(0.18)} />
              <motion.span className="block h-2 w-[80%] rounded-full bg-white/25" {...block(0.2)} />
              <motion.span className="mt-2 block h-7 w-28 rounded-full bg-gradient-to-r from-sky to-cobalt" {...block(0.26)} />
            </div>
            <motion.div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cobalt to-[#7c3aed]" {...block(0.22)}>
              <span className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/25" />
              <span className="absolute right-3 top-3 h-5 w-16 rounded-full bg-white/20" />
            </motion.div>
          </div>
          {/* cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[0, 1, 2].map((k) => (
              <motion.div key={k} className="space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-3" {...block(0.34 + k * 0.05)}>
                <span className="block h-6 w-6 rounded-lg bg-sky/40" />
                <span className="block h-2 w-[80%] rounded-full bg-white/40" />
                <span className="block h-1.5 w-[60%] rounded-full bg-white/20" />
              </motion.div>
            ))}
          </div>
          {/* enquiry form */}
          <motion.div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3" {...block(0.5)}>
            <span className="h-6 flex-1 rounded-md bg-white/10" />
            <span className="h-6 flex-1 rounded-md bg-white/10" />
            <span className="h-6 w-20 rounded-md bg-saffron/90" />
          </motion.div>
        </div>

        {/* a cursor that moves to the button and clicks */}
        {!reduce && (
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="absolute left-0 top-0 drop-shadow"
            animate={{ x: [480, 480, 120, 120, 480], y: [330, 330, 190, 190, 330], scale: [1, 1, 1, 0.8, 1] }}
            transition={{ duration: CYCLE, times: [0, 0.55, 0.68, 0.72, 1], repeat: Infinity }}
          >
            <path d="M4 2l15 7-6.5 1.8L9 17z" fill="#fff" stroke="#0b1630" strokeWidth="1.2" />
          </motion.svg>
        )}
      </motion.div>

      {/* the same site on a phone */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-[30%] overflow-hidden rounded-[22px] border-[3px] border-[#1c2c55] bg-[#0b1630] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:-right-6"
        initial={reduce ? false : { opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
      >
        <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-white/15" />
        <div className="space-y-2 p-3">
          <motion.span className="block h-2.5 w-12 rounded-full bg-sky/80" {...block(0.04)} />
          <motion.div className="h-16 rounded-lg bg-gradient-to-br from-cobalt to-[#7c3aed]" {...block(0.24)} />
          <motion.span className="block h-2.5 w-[85%] rounded-full bg-white/80" {...block(0.14)} />
          <motion.span className="block h-1.5 w-[70%] rounded-full bg-white/25" {...block(0.2)} />
          <motion.span className="block h-5 w-16 rounded-full bg-gradient-to-r from-sky to-cobalt" {...block(0.28)} />
          {[0, 1].map((k) => (
            <motion.div key={k} className="h-8 rounded-lg border border-white/10 bg-white/[0.05]" {...block(0.38 + k * 0.05)} />
          ))}
        </div>
      </motion.div>

      {/* a second phone on the left, showing the store side of the site */}
      <motion.div
        className="absolute -bottom-2 -left-2 w-[26%] overflow-hidden rounded-[22px] border-[3px] border-[#1c2c55] bg-[#0b1630] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:-left-6"
        initial={reduce ? false : { opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
      >
        <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-white/15" />
        <div className="space-y-2 p-3">
          <motion.span className="block h-2.5 w-10 rounded-full bg-saffron/90" {...block(0.06)} />
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((k) => (
              <motion.div key={k} className="space-y-1 rounded-lg border border-white/10 bg-white/[0.05] p-1.5" {...block(0.18 + k * 0.05)}>
                <span className="block h-7 rounded-md bg-gradient-to-br from-sky/60 to-cobalt/70" />
                <span className="block h-1 w-[80%] rounded-full bg-white/40" />
              </motion.div>
            ))}
          </div>
          <motion.span className="block h-5 w-full rounded-full bg-saffron/90" {...block(0.42)} />
        </div>
      </motion.div>

      {/* what every site gets */}
      {[
        { t: "Mobile-first", c: "left-[-4%] top-[18%]", d: 0.6, i: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" },
        { t: "Fast loading", c: "right-[-4%] top-[2%]", d: 0.8, i: "M13 2 4 14h7l-1 8 9-12h-7z" },
        { t: "Search-ready", c: "bottom-[-2%] left-[30%]", d: 1, i: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" },
      ].map((tag, k) => (
        <motion.span
          key={tag.t}
          className={`float-icon absolute flex items-center gap-2 rounded-full border border-white/15 bg-[#0f1d3d]/90 px-3.5 py-2 text-[12.5px] font-medium text-white shadow-lg shadow-black/40 backdrop-blur ${tag.c}`}
          style={{ animationDelay: `${k * -1.3}s` }}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: tag.d, ease }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={tag.i} />
          </svg>
          {tag.t}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#34d399" strokeWidth="2.4">
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
