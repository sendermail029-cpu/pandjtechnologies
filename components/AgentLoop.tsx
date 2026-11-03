"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// the agent's loop, with what it is doing at each step (an example conversation)
const steps = [
  { t: "Listen", d: "A message comes in", log: "New WhatsApp message: “Has my order shipped?”", tone: "bg-sky" },
  { t: "Understand", d: "Works out the ask", log: "The customer wants an update on their order", tone: "bg-[#a78bfa]" },
  { t: "Act", d: "Uses your tools", log: "Looked up order #4821 in your system", tone: "bg-saffron" },
  { t: "Report", d: "Replies and logs", log: "Replied to the customer and logged it in the CRM", tone: "bg-emerald-400" },
];
// node positions around the ring: top, right, bottom, left
const pos = ["left-1/2 top-[2%] -translate-x-1/2", "right-0 top-1/2 -translate-y-1/2", "left-1/2 bottom-[2%] -translate-x-1/2", "left-0 top-1/2 -translate-y-1/2"];

function Bot() {
  return (
    <svg className="float-icon mx-auto h-11 w-11 drop-shadow-[0_6px_10px_rgba(15,10,60,0.35)] sm:h-16 sm:w-16" viewBox="0 0 64 64" aria-hidden>
      <path d="M32 7v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle className="animate-pulse" cx="32" cy="6" r="3.5" fill="#67e8f9" />
      <rect x="5" y="27" width="5" height="12" rx="2.5" fill="#e0e7ff" />
      <rect x="54" y="27" width="5" height="12" rx="2.5" fill="#e0e7ff" />
      <rect x="10" y="15" width="44" height="34" rx="13" fill="#fff" />
      <rect x="16" y="23" width="32" height="17" rx="8.5" fill="#1e1b4b" />
      <rect className="animate-pulse" x="22.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
      <rect className="animate-pulse" x="35.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
      <rect x="22" y="52" width="20" height="6" rx="3" fill="#e0e7ff" opacity="0.85" />
    </svg>
  );
}

// The AI agent at the centre, cycling through listen, understand, act and report
export function AgentLoop() {
  const [n, setN] = useState(0); // keeps counting up, so the travelling dot always moves forward
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const i = n % steps.length;

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setN((x) => x + 1), 2600);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <div data-aos="zoom-in" className="mx-auto w-full max-w-[460px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-square w-full">
        {/* glow, dashed track, and a light beam sweeping the ring */}
        <div aria-hidden className="absolute inset-[16%] rounded-full bg-[#7c3aed]/20 blur-3xl" />
        <div aria-hidden className="absolute inset-[14%] rounded-full border-2 border-dashed border-[#7c3aed]/20" />
        <div
          aria-hidden
          className="orbit-spin absolute inset-[14%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(124,58,237,0.55)_70deg,rgba(56,189,248,0.7)_100deg,transparent_110deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))] [animation-duration:6s]"
        />

        {/* the dot that travels to the active step */}
        <motion.div aria-hidden className="absolute inset-[14%]" animate={{ rotate: n * 90 }} transition={{ duration: reduce ? 0 : 0.9, ease }}>
          <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(124,58,237,0.35),0_0_18px_4px_rgba(56,189,248,0.8)]" />
        </motion.div>

        {/* floating sparkles */}
        {[
          "left-[18%] top-[20%] h-1.5 w-1.5 bg-sky",
          "right-[20%] top-[24%] h-2 w-2 bg-[#a78bfa]",
          "left-[24%] bottom-[22%] h-2 w-2 bg-saffron/80",
          "right-[18%] bottom-[18%] h-1.5 w-1.5 bg-emerald-400",
        ].map((c, k) => (
          <span key={c} aria-hidden className={`float-icon absolute rounded-full ${c}`} style={{ animationDelay: `${k * -0.8}s` }} />
        ))}

        {/* the agent: ripples and the bot */}
        <div className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2">
          {!reduce &&
            [0, 1].map((k) => (
              <motion.span
                key={k}
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-[#a78bfa]/60"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 2.6, repeat: Infinity, delay: k * 1.3, ease: "easeOut" }}
              />
            ))}
          <div className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] via-[#5b3df0] to-cobalt text-white shadow-[0_24px_50px_-16px_rgba(124,58,237,0.7)] ring-4 ring-white/60">
            <span className="text-center">
              <Bot />
              <span className="mt-0.5 block text-[10.5px] font-semibold leading-tight sm:mt-1 sm:text-[13px]">
                <span className="hidden sm:inline">Your </span>AI agent
              </span>
            </span>
          </div>
        </div>

        {/* the four steps */}
        {steps.map((s, k) => {
          const on = k === i;
          return (
            <motion.button
              key={s.t}
              type="button"
              onClick={() => setN((x) => x + ((k - (x % steps.length) + steps.length) % steps.length))}
              animate={{ scale: on ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease }}
              className={`absolute ${pos[k]} isolate w-[29%] overflow-hidden rounded-2xl bg-white p-2 text-center sm:w-[30%] sm:p-3 ${
                on ? "text-white shadow-[0_18px_36px_-12px_rgba(124,58,237,0.65)]" : "text-ink shadow-[0_14px_30px_-16px_rgba(15,29,51,0.35)] ring-1 ring-[#e4dcff] hover:ring-[#a78bfa]"
              }`}
            >
              {/* the highlight fades in behind the active step */}
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7c3aed] to-cobalt"
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.35 }}
              />
              <span className="flex items-center justify-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-white" : s.tone}`} />
                <span className={`font-mono text-[10px] sm:text-[10.5px] ${on ? "text-white/75" : "text-[#7c3aed]"}`}>0{k + 1}</span>
              </span>
              <span className="mt-0.5 block text-[13px] font-semibold sm:text-[15px]">{s.t}</span>
              <span className={`mt-0.5 hidden text-[11.5px] leading-snug sm:block ${on ? "text-white/80" : "text-slate"}`}>{s.d}</span>
            </motion.button>
          );
        })}
      </div>

      {/* live log of what the agent is doing */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0b1230] px-4 py-3 text-white shadow-[0_20px_40px_-24px_rgba(15,10,60,0.6)] sm:mt-2">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${steps[i].tone} shadow-[0_0_10px_currentColor]`} />
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{steps[i].t}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={n}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="min-w-0 text-[13px] leading-snug text-white/85 sm:truncate sm:text-[13.5px]"
          >
            {steps[i].log}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
