"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brandIcons } from "@/lib/brand-icons";
import { crmLogos } from "@/lib/crm-logos";

const ease = [0.22, 1, 0.36, 1] as const;
const meta = brandIcons.find((b) => b.title === "Meta")!;
const gads = brandIcons.find((b) => b.title === "Google Ads")!;
const wa = crmLogos.WhatsApp;

const Logo = ({ l, className = "h-4 w-4" }: { l: { color: string; path: string }; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill={l.color} aria-hidden>
    <path d={l.path} />
  </svg>
);
const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

/* ---------- one screen per step of the journey ---------- */

function AdsScreen() {
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {/* Meta ad */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col overflow-hidden rounded-xl bg-white text-ink">
        <span className="flex items-center gap-1.5 px-2.5 py-2 text-[10px]">
          <Logo l={meta} className="h-3.5 w-3.5" />
          <span className="font-semibold">Meta Ads</span>
          <span className="ml-auto text-slate">Sponsored</span>
        </span>
        <span className="grid flex-1 place-items-center bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#f59e0b] px-2 text-center text-[13px] font-bold leading-tight text-white">
          Your offer here
        </span>
        <span className="flex items-center justify-center gap-1 bg-[#e7fbe9] py-1.5 text-[10px] font-semibold text-[#128c4a]">
          <Logo l={wa} className="h-3 w-3" /> Send message
        </span>
      </motion.div>
      {/* Google ad */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-col gap-2 rounded-xl bg-white p-2.5 text-ink">
        <span className="flex items-center gap-1.5 text-[10px]">
          <Logo l={gads} className="h-3.5 w-3.5" />
          <span className="font-semibold">Google Ads</span>
        </span>
        <span className="rounded-full bg-[#f1f3f4] px-2 py-1 text-[9.5px] text-slate">interiors near me</span>
        <span>
          <span className="block text-[9px] font-semibold">Sponsored</span>
          <span className="block text-[11px] font-medium leading-snug text-[#1a0dab]">Interior Design | Free Visit</span>
          <span className="mt-1 block h-1.5 w-[90%] rounded-full bg-line" />
          <span className="mt-1 block h-1.5 w-[70%] rounded-full bg-line" />
        </span>
        <span className="mt-auto rounded-md bg-cobalt py-1 text-center text-[10px] font-semibold text-white">Call now</span>
      </motion.div>
    </div>
  );
}

function WhatsAppScreen() {
  const msgs = [
    { me: false, t: "Hi, I saw your ad. What are the prices?" },
    { me: true, t: "Hi! Thanks for reaching out 👋 What are you looking for?" },
  ];
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl bg-[#0b141a] p-3">
      <span className="flex items-center gap-2 border-b border-white/10 pb-2 text-[11px] text-white/80">
        <Logo l={wa} className="h-3.5 w-3.5" /> WhatsApp · auto-reply
      </span>
      {msgs.map((m, k) => (
        <motion.span
          key={k}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + k * 0.5 }}
          className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug ${m.me ? "self-end rounded-br-sm bg-[#005c4b] text-white" : "self-start rounded-bl-sm bg-[#202c33] text-white/90"}`}
        >
          {m.t}
        </motion.span>
      ))}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex justify-end gap-1.5">
        {["Home", "Office", "Talk to us"].map((b) => (
          <span key={b} className="rounded-full border border-[#25D366]/50 px-2 py-0.5 text-[10px] text-[#25D366]">
            {b}
          </span>
        ))}
      </motion.span>
    </div>
  );
}

function CallScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-[#1e1b4b] to-[#0b1630] p-3 text-center">
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] to-cobalt text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#7c3aed]/40" />
        <PhoneIcon className="relative h-5 w-5" />
      </span>
      <span>
        <span className="block text-[12.5px] font-semibold text-white">AI agent calling the new lead</span>
        <span className="block text-[10.5px] text-white/55">Within minutes of the enquiry</span>
      </span>
      <span className="flex h-6 items-center gap-[3px]">
        {Array.from({ length: 18 }).map((_, k) => (
          <motion.span
            key={k}
            className="w-[3px] rounded-full bg-sky"
            animate={{ height: [4, 8 + ((k * 7) % 16), 4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: k * 0.05 }}
          />
        ))}
      </span>
      <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10.5px] font-semibold text-emerald-300">
        ✓ Site visit booked for Saturday
      </motion.span>
    </div>
  );
}

function CrmScreen() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl bg-[#0b1630] p-3">
      <span className="text-[11px] text-white/55">Your CRM · new leads</span>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="rounded-xl bg-white p-2.5 text-ink ring-2 ring-emerald-400">
        <span className="flex items-center justify-between">
          <span className="text-[12px] font-semibold">Priya S.</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600">Hot lead</span>
        </span>
        <span className="mt-1.5 flex flex-wrap gap-1 text-[9.5px]">
          <span className="flex items-center gap-1 rounded-full bg-[#eef2ff] px-1.5 py-0.5"><Logo l={meta} className="h-2.5 w-2.5" /> Meta ad</span>
          <span className="flex items-center gap-1 rounded-full bg-[#e7fbe9] px-1.5 py-0.5"><Logo l={wa} className="h-2.5 w-2.5" /> WhatsApp</span>
          <span className="rounded-full bg-[#f3e8ff] px-1.5 py-0.5 text-[#7c3aed]">AI call: visit booked</span>
        </span>
      </motion.div>
      {[0, 1].map((k) => (
        <motion.span key={k} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.3 + k * 0.15 }} className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-2.5">
          <span className="h-6 w-6 rounded-full bg-white/15" />
          <span className="h-1.5 w-[50%] rounded-full bg-white/25" />
        </motion.span>
      ))}
    </div>
  );
}

const steps: { t: string; short?: string; icon: ReactNode; screen: () => ReactNode }[] = [
  {
    t: "Meta & Google Ads",
    short: "Ads",
    icon: (
      <span className="flex -space-x-1">
        <Logo l={meta} className="h-3.5 w-3.5" />
        <Logo l={gads} className="h-3.5 w-3.5" />
      </span>
    ),
    screen: AdsScreen,
  },
  { t: "WhatsApp", icon: <Logo l={wa} className="h-3.5 w-3.5" />, screen: WhatsAppScreen },
  { t: "AI call", icon: <PhoneIcon className="h-3.5 w-3.5 text-[#7c3aed]" />, screen: CallScreen },
  {
    t: "Lead in CRM",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
        <path d="M5 12.5 10 17l9-10" />
      </svg>
    ),
    screen: CrmScreen,
  },
];

// Digital marketing hero: one enquiry's journey, from the ad to a lead in the CRM
export function MarketingHeroVisual() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  const Screen = steps[i].screen;

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[600px] pb-4 pt-2">
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-[#db2777]/30 via-[#7c3aed]/30 to-cobalt/40 blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1630] shadow-[0_40px_90px_-30px_rgba(124,58,237,0.55)]"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
      >
        {/* the journey, step by step */}
        <div className="flex items-center gap-1 border-b border-white/10 bg-[#0f1d3d] p-2 sm:gap-1.5 sm:p-2.5">
          {steps.map((s, k) => {
            const on = k === i;
            const done = k < i;
            return (
              <div key={s.t} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-1.5">
                <span
                  className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-1.5 py-1.5 text-[10px] font-semibold transition duration-300 sm:text-[11.5px] ${
                    on ? "bg-white text-ink shadow-lg" : done ? "bg-white/15 text-white" : "bg-white/[0.05] text-white/45"
                  }`}
                >
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${on || done ? "bg-white" : "bg-white/20"}`}>{s.icon}</span>
                  <span className="hidden truncate sm:inline">{s.short ?? s.t}</span>
                </span>
                {k < steps.length - 1 && <span className={`shrink-0 text-[11px] ${done ? "text-sky" : "text-white/25"}`}>→</span>}
              </div>
            );
          })}
        </div>

        <div className="relative h-[230px] p-3 sm:h-[260px] sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="h-full"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="border-t border-white/10 px-4 py-2.5 text-center text-[11.5px] text-white/60">
          <span className="font-semibold text-white">Step {i + 1}:</span> {steps[i].t}
        </p>
      </motion.div>
    </div>
  );
}
