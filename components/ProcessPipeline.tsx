"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type Stage = { name: string; text: string };

const STEP = 6000; // ms each stage stays active
const ease = [0.22, 1, 0.36, 1] as const;

// what happens in each stage, shown as a checklist in the console (taken from each stage's description)
const tasks: string[][] = [
  ["Meet your team", "Study how work gets done today", "Agree on what success looks like"],
  ["Written scope", "Fixed milestones and timeline", "A clear price, before any work begins"],
  ["Short build cycles", "Weekly review on a live link", "Your feedback built into every cycle"],
  ["Testing", "Data migration", "Staff training", "Go live with a rollback plan"],
  ["A named contact for you", "Fixes and improvements", "Optional annual maintenance plan"],
];

const icons = [
  "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",
  "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  "M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1 0-2.9a2.1 2.1 0 0 0-3-.1zM12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z",
  "M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10zM9 11l2 2 4-4",
];

// The five delivery stages as a deployment pipeline: a track that fills stage by stage,
// and a console that lists what happens in the active stage
export function ProcessPipeline({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const pct = (active / (stages.length - 1)) * 100;
  const row = useRef<HTMLOListElement>(null);

  // on phones the stage row scrolls sideways: keep the active stage in view (without moving the page)
  useEffect(() => {
    const ol = row.current;
    const btn = ol?.children[active] as HTMLElement | undefined;
    if (!ol || !btn || ol.scrollWidth <= ol.clientWidth) return;
    ol.scrollTo({ left: btn.offsetLeft - (ol.clientWidth - btn.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % stages.length), STEP);
    return () => clearTimeout(t);
  }, [active, paused, reduce, stages.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* the track */}
      <div className="relative mt-14">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-[2px] rounded-full bg-line md:block">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-cobalt to-sky" animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease }} />
          {!reduce && (
            <motion.span
              className="absolute -top-[3px] h-2 w-2 rounded-full bg-sky shadow-[0_0_10px_#1ec0f2]"
              animate={{ left: `${pct}%` }}
              transition={{ duration: 0.8, ease }}
              style={{ marginLeft: -4 }}
            />
          )}
        </div>
        <ol ref={row} className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:px-0" role="tablist" aria-label="Delivery stages">
          {stages.map((s, i) => {
            const done = i < active;
            const on = i === active;
            return (
              <li key={s.name} className="shrink-0 md:shrink">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="stage-panel"
                  onClick={() => setActive(i)}
                  className="group flex w-full flex-col items-center gap-3 rounded-2xl px-3 py-2 text-center"
                >
                  <span
                    className={`relative grid h-14 w-14 place-items-center rounded-2xl border transition duration-300 ${
                      on
                        ? "scale-110 border-cobalt bg-cobalt text-white shadow-[0_12px_30px_-8px_rgba(39,71,214,0.7)]"
                        : done
                          ? "border-cobalt/30 bg-[#eef3ff] text-cobalt"
                          : "border-line bg-white text-slate group-hover:border-cobalt/40"
                    }`}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={icons[i]} />
                    </svg>
                    {done && (
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                        <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden>
                          <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
                        </svg>
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">Stage {i + 1}</span>
                  <span className={`whitespace-nowrap text-[16px] font-semibold tracking-tight ${on ? "text-ink" : "text-ink-2"}`}>{s.name}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the console */}
      <div id="stage-panel" role="tabpanel" className="relative isolate mt-10 overflow-hidden rounded-[28px] bg-[#060d18] text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div aria-hidden className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-cobalt/35 blur-3xl" />
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[12px] text-white/45">delivery-pipeline</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            running
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-sky">
                Stage {String(active + 1).padStart(2, "0")} <span className="text-white/35">/ {String(stages.length).padStart(2, "0")}</span>
              </p>
              <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-tight">{stages[active].name}</h3>
              <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.75] text-white/70">{stages[active].text}</p>
            </div>
            <ul className="space-y-3 self-center font-mono text-[14px]">
              {tasks[active].map((t, k) => (
                <motion.li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + k * 0.35 }}
                >
                  <motion.span
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.45 + k * 0.35 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                    </svg>
                  </motion.span>
                  <span className="text-white/85">{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
