"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type Value = { name: string; text: string; i: string };

const STEP = 5000; // ms each value stays on screen
const ease = [0.22, 1, 0.36, 1] as const;

// one colour per value, in the order the values are listed
const themes = ["#14b8c4", "#f0a23b", "#1ec0f2", "#10b981", "#a78bfa", "#6d8bff"];

// ---- one animated illustration per value (viewBox 0 0 200 200, drawn in the theme colour) ----

const draw = (delay = 0, duration = 1.1) => ({
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration, delay, ease: "easeInOut" as const },
});

// Integrity first: a shield that draws itself, then a tick
function Integrity() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="100" cy="100" r="84" strokeWidth="1" strokeDasharray="3 7" opacity="0.5" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: "100px", originY: "100px" }} />
      <motion.path d="M100 38l48 18v38c0 30-21 54-48 62-27-8-48-32-48-62V56z" strokeWidth="4" fill="currentColor" fillOpacity="0.08" {...draw(0)} />
      <motion.path d="M78 100l16 16 30-34" strokeWidth="6" {...draw(0.9, 0.5)} />
    </g>
  );
}

// a gear: a thick dashed ring reads as teeth
const Gear = ({ cx, cy, r, dir, dur }: { cx: number; cy: number; r: number; dir: number; dur: number }) => (
  <motion.g animate={{ rotate: 360 * dir }} transition={{ duration: dur, repeat: Infinity, ease: "linear" }} style={{ originX: `${cx}px`, originY: `${cy}px` }}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={r * 0.32} strokeDasharray={`${r * 0.36} ${r * 0.3}`} />
    <circle cx={cx} cy={cy} r={r * 0.78} fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="3" />
    <circle cx={cx} cy={cy} r={r * 0.28} fill="none" stroke="currentColor" strokeWidth="3" />
  </motion.g>
);

// Automation with purpose: interlocking gears turning
function Automation() {
  return (
    <g>
      <Gear cx={82} cy={92} r={40} dir={1} dur={8} />
      <Gear cx={138} cy={128} r={26} dir={-1} dur={5.2} />
      <Gear cx={140} cy={60} r={18} dir={-1} dur={3.6} />
    </g>
  );
}

// Reliability, 24×7: a clock whose 24 hour marks light up in turn, with a turning hand
function Reliability() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <circle cx="100" cy="100" r="70" strokeWidth="3" fill="currentColor" fillOpacity="0.06" />
      {Array.from({ length: 24 }).map((_, k) => {
        const a = (k / 24) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.line
            key={k}
            x1={100 + Math.cos(a) * 78}
            y1={100 + Math.sin(a) * 78}
            x2={100 + Math.cos(a) * 88}
            y2={100 + Math.sin(a) * 88}
            strokeWidth="4"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 1, 1] }}
            transition={{ duration: 0.6, delay: k * 0.08 }}
          />
        );
      })}
      <motion.line x1="100" y1="100" x2="100" y2="52" strokeWidth="5" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ originX: "100px", originY: "100px" }} />
      <line x1="100" y1="100" x2="128" y2="100" strokeWidth="5" />
      <circle cx="100" cy="100" r="6" fill="currentColor" />
      <text x="100" y="140" textAnchor="middle" fill="currentColor" stroke="none" fontSize="15" fontFamily="ui-monospace, monospace" fontWeight="600">24×7</text>
    </g>
  );
}

// Security by default: a lock with a scanning beam passing over it
function Security() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M72 92V72a28 28 0 0 1 56 0v20" strokeWidth="6" {...draw(0, 0.8)} />
      <rect x="58" y="92" width="84" height="66" rx="14" strokeWidth="5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="100" cy="120" r="8" fill="currentColor" stroke="none" />
      <line x1="100" y1="126" x2="100" y2="140" strokeWidth="5" />
      <motion.g initial={{ y: 0 }} animate={{ y: [0, 120, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="40" y1="40" x2="160" y2="40" strokeWidth="2" opacity="0.9" />
        <rect x="40" y="40" width="120" height="14" fill="currentColor" fillOpacity="0.15" stroke="none" />
      </motion.g>
    </g>
  );
}

// Customer partnership: two linked nodes with data travelling both ways
function Partnership() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M58 100 C 90 60, 110 60, 142 100" strokeWidth="3" opacity="0.6" />
      <path d="M58 100 C 90 140, 110 140, 142 100" strokeWidth="3" opacity="0.6" />
      {[0, 1].map((k) => (
        <motion.circle key={k} r="5" fill="currentColor" stroke="none">
          <animateMotion dur="2.4s" begin={`${k * 1.2}s`} repeatCount="indefinite" path={k ? "M142 100 C 110 140, 90 140, 58 100" : "M58 100 C 90 60, 110 60, 142 100"} />
        </motion.circle>
      ))}
      {[58, 142].map((x) => (
        <g key={x}>
          <motion.circle cx={x} cy="100" r="30" strokeWidth="2" opacity="0.4" animate={{ r: [24, 34, 24], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.4, repeat: Infinity }} />
          <circle cx={x} cy="100" r="22" strokeWidth="4" fill="currentColor" fillOpacity="0.12" />
          <circle cx={x} cy="94" r="6" strokeWidth="3" />
          <path d={`M${x - 10} 112c2-6 6-9 10-9s8 3 10 9`} strokeWidth="3" />
        </g>
      ))}
    </g>
  );
}

// Always improving: bars that rise and a trend line that draws upwards
function Improving() {
  const bars = [40, 58, 52, 78, 96];
  return (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="36" y1="160" x2="168" y2="160" strokeWidth="2" opacity="0.5" />
      {bars.map((h, k) => (
        <motion.rect
          key={k}
          x={44 + k * 25}
          width="16"
          rx="4"
          fill="currentColor"
          fillOpacity="0.18"
          strokeWidth="2"
          initial={{ height: 0, y: 160 }}
          animate={{ height: h, y: 160 - h }}
          transition={{ duration: 0.6, delay: k * 0.12, ease }}
        />
      ))}
      <motion.path d="M52 116 L77 98 L102 104 L127 78 L156 50" fill="none" strokeWidth="5" {...draw(0.5, 1)} />
      <motion.path d="M140 50h16v16" fill="none" strokeWidth="5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
    </g>
  );
}

const visuals: (() => ReactNode)[] = [Integrity, Automation, Reliability, Security, Partnership, Improving];

// Core values as a control panel: a numbered list that advances on its own (or on click), and a dark display
// whose colour and animated illustration change with the selected value
export function ValuesShowcase({ values }: { values: Value[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const v = values[active];
  const color = themes[active % themes.length];
  const Visual = visuals[active % visuals.length];
  const row = useRef<HTMLUListElement>(null);

  // on phones the list scrolls sideways: keep the active value in view (without moving the page)
  useEffect(() => {
    const ul = row.current;
    const li = ul?.children[active] as HTMLElement | undefined;
    if (!ul || !li || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % values.length), STEP);
    return () => clearTimeout(t);
  }, [active, paused, reduce, values.length]);

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* the list */}
      <ul ref={row} className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" role="tablist" aria-label="Core values">
        {values.map((x, i) => {
          const on = i === active;
          const c = themes[i % themes.length];
          return (
            <li key={x.name} className="shrink-0 lg:shrink">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="value-panel"
                onClick={() => setActive(i)}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3 text-left transition duration-300 lg:px-5 lg:py-4 ${
                  on ? "border-line bg-white shadow-[0_18px_40px_-24px_rgba(15,29,51,0.45)]" : "border-transparent hover:bg-white/70"
                }`}
              >
                <span className="font-mono text-[12px] text-slate/60" style={on ? { color: c } : undefined}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition duration-300"
                  style={on ? { background: c, color: "#fff" } : { background: `${c}1f`, color: c }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={x.i} />
                  </svg>
                </span>
                <span className={`whitespace-nowrap text-[16px] font-semibold tracking-tight lg:text-[17px] ${on ? "text-ink" : "text-ink-2"}`}>{x.name}</span>
                {/* progress line for the active value */}
                {on && (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: `${c}22` }}>
                    <motion.span
                      key={`${active}-${paused}`}
                      className="block h-full origin-left"
                      style={{ background: c }}
                      initial={{ scaleX: reduce || paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce || paused ? 0 : STEP / 1000, ease: "linear" }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* the display: its glow, accent and illustration follow the selected value */}
      <div id="value-panel" role="tabpanel" className="relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[32px] bg-[#060d18] p-8 text-white sm:p-10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          aria-hidden
          className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full blur-3xl"
          animate={{ backgroundColor: color, opacity: 0.35 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full blur-3xl"
          animate={{ backgroundColor: color, opacity: 0.12 }}
          transition={{ duration: 0.8 }}
        />

        {/* the value's own illustration */}
        <div aria-hidden className="absolute right-4 top-4 h-52 w-52 sm:right-8 sm:top-6 sm:h-64 sm:w-64" style={{ color, filter: `drop-shadow(0 0 18px ${color}88)` }}>
          <AnimatePresence mode="wait">
            <motion.svg
              key={active}
              viewBox="0 0 200 200"
              className="h-full w-full overflow-visible"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease }}
            >
              <Visual />
            </motion.svg>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="relative max-w-[30rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="font-mono text-[12px] uppercase tracking-[0.22em]" style={{ color }}>
              Value {String(active + 1).padStart(2, "0")} <span className="text-white/35">/ {String(values.length).padStart(2, "0")}</span>
            </p>
            <h3 className="mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.1] tracking-tight">{v.name}</h3>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-white/70">{v.text}</p>
            <span aria-hidden className="mt-6 block h-[3px] w-16 rounded-full" style={{ background: color }} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
