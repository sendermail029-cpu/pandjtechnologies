"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { crmLogos } from "@/lib/crm-logos";

const ease = [0.22, 1, 0.36, 1] as const;

// reveals items one by one while on screen, then starts again
function useSequence(total: number, step = 1300, hold = 3500) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setN((x) => (x >= total ? 0 : x + 1)), n >= total ? hold : n === 0 ? 400 : step);
    return () => clearTimeout(id);
  }, [n, inView, reduce, total, step, hold]);

  return { ref, n: reduce ? total : n };
}

/* ---------- WhatsApp automation: an example chat (made-up brand) ---------- */

const chat: { me?: boolean; t: string; buttons?: string[]; tap?: boolean }[] = [
  { t: "Hi, I saw your ad. What are your prices?" },
  { me: true, t: "Hi! 👋 Thanks for reaching out to Your Brand. What are you looking for?", buttons: ["Home interiors", "Office", "Talk to us"] },
  { t: "Home interiors", tap: true },
  { me: true, t: "Great choice! Here's our price guide 📄 Would you like a free site visit?", buttons: ["Book a visit"] },
  { t: "Book a visit", tap: true },
  { me: true, t: "✅ Booked for Saturday, 11 AM. Our designer will call you before the visit." },
];

export function WhatsAppDemo() {
  const { ref, n } = useSequence(chat.length);
  const wa = crmLogos.WhatsApp;

  return (
    <div ref={ref} aria-hidden className="relative mx-auto w-[290px] sm:w-[310px]">
      <div className="absolute inset-[-10%] rounded-full bg-[#25D366]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[38px] border-[7px] border-[#1c2c55] bg-[#0b141a] shadow-[0_40px_80px_-30px_rgba(18,140,74,0.55)]">
        <div className="flex items-center gap-2.5 bg-[#1f2c34] px-4 pb-3 pt-5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#f472b6] to-cobalt text-[10px] font-bold text-white">YB</span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold text-white">Your Brand</span>
            <span className="block text-[10.5px] text-[#25D366]">online · replies instantly</span>
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={wa.color}>
            <path d={wa.path} />
          </svg>
        </div>
        <div className="flex h-[340px] flex-col justify-end sm:h-[400px] gap-2 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(37,211,102,0.06),transparent_50%)] p-3">
          <AnimatePresence initial={false}>
            {chat.slice(0, n).map((m, k) => (
              <motion.div
                key={k}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className={`flex max-w-[86%] flex-col gap-1.5 ${m.me ? "self-start" : "self-end items-end"}`}
              >
                <span
                  className={`rounded-xl px-3 py-2 text-[12.5px] leading-snug ${
                    m.me ? "rounded-tl-sm bg-[#202c33] text-white/90" : m.tap ? "rounded-tr-sm bg-[#005c4b] text-white italic" : "rounded-tr-sm bg-[#005c4b] text-white"
                  }`}
                >
                  {m.t}
                </span>
                {m.buttons && (
                  <span className="flex flex-wrap gap-1.5">
                    {m.buttons.map((b) => (
                      <span key={b} className="rounded-lg bg-[#202c33] px-2.5 py-1.5 text-[11.5px] font-medium text-[#53bdeb]">
                        {b}
                      </span>
                    ))}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {n < chat.length && n > 0 && chat[n].me && (
            <span className="flex w-max gap-1 self-start rounded-xl bg-[#202c33] px-3 py-2.5">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${k * 0.15}s` }} />
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- AI calling agent: an example call (made-up brand) ---------- */

const call: { ai: boolean; t: string }[] = [
  { ai: true, t: "Hi Priya, I'm calling from Your Brand. You enquired about home interiors. Is now a good time?" },
  { ai: false, t: "Yes, I wanted to know the cost for a 2BHK." },
  { ai: true, t: "Sure. It depends on the design you choose. Can I book a free site visit so our designer can give you an exact quote?" },
  { ai: false, t: "Saturday morning works." },
  { ai: true, t: "Done. Saturday at 11 AM is booked. You'll get the details on WhatsApp." },
];

export function AiCallDemo() {
  const { ref, n } = useSequence(call.length + 1, 1700, 4000);
  const done = n > call.length;

  return (
    <div ref={ref} aria-hidden className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute inset-[-6%] rounded-full bg-[#7c3aed]/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] bg-[#0b1230] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(124,58,237,0.6)]">
        {/* the call */}
        <div className="flex items-center gap-3 border-b border-white/10 p-4 sm:p-5">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] to-cobalt text-white">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#7c3aed]/35" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14.5px] font-semibold text-white">AI agent → Priya S.</span>
            <span className="block text-[12px] text-white/50">New lead from Meta ad · calling now</span>
          </span>
          <span className="flex h-7 items-center gap-[3px]">
            {Array.from({ length: 10 }).map((_, k) => (
              <motion.span
                key={k}
                className="w-[3px] rounded-full bg-sky"
                animate={done ? { height: 4 } : { height: [4, 10 + ((k * 5) % 14), 4] }}
                transition={{ duration: 0.8, repeat: done ? 0 : Infinity, delay: k * 0.06 }}
              />
            ))}
          </span>
        </div>

        {/* live transcript */}
        <div className="flex h-[250px] flex-col justify-end gap-2.5 overflow-hidden p-4 sm:h-[310px] sm:p-5">
          <AnimatePresence initial={false}>
            {call.slice(0, Math.min(n, call.length)).map((m, k) => (
              <motion.div
                key={k}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="flex gap-2.5"
              >
                <span className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold ${m.ai ? "bg-[#7c3aed]/25 text-[#c4b5fd]" : "bg-white/10 text-white/60"}`}>
                  {m.ai ? "AI" : "Lead"}
                </span>
                <span className={`text-[13px] leading-snug ${m.ai ? "text-white" : "text-white/65"}`}>{m.t}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* outcome */}
        <div className="flex flex-wrap gap-2 border-t border-white/10 p-4 sm:p-5">
          {["Visit booked", "Summary sent to CRM", "WhatsApp confirmation sent"].map((x, k) => (
            <motion.span
              key={x}
              animate={{ opacity: done ? 1 : 0.3, scale: done ? 1 : 0.96 }}
              transition={{ duration: 0.4, delay: done ? k * 0.15 : 0 }}
              className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11.5px] font-semibold text-emerald-300"
            >
              ✓ {x}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
