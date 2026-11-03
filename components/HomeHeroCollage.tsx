"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brandIcons } from "@/lib/brand-icons";
import { crmLogos } from "@/lib/crm-logos";

const ease = [0.22, 1, 0.36, 1] as const;
const meta = brandIcons.find((b) => b.title === "Meta")!;
const gads = brandIcons.find((b) => b.title === "Google Ads")!;
const wa = crmLogos.WhatsApp;

const Logo = ({ l, className = "h-3.5 w-3.5" }: { l: { color: string; path: string }; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill={l.color} aria-hidden>
    <path d={l.path} />
  </svg>
);

// one piece of the collage: rises in, then drifts gently
function Piece({ className, delay, float = 0, children }: { className: string; delay: number; float?: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      <div className="float-icon h-full" style={{ animationDelay: `${float}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

// Home hero: a collage of what we build — a website, an app, a CRM, an AI agent, ads and the test center
export function HomeHeroCollage() {
  return (
    <div aria-hidden className="relative mx-auto aspect-[1/0.92] w-full max-w-[520px]">
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-cobalt/50 via-[#7c3aed]/30 to-sky/30 blur-3xl" />
      <div className="orbit-spin absolute inset-[6%] rounded-full border border-dashed border-white/10" />

      {/* website */}
      <Piece className="left-[4%] top-[8%] w-[68%]" delay={0.1} float={0}>
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/20">
          <div className="flex items-center gap-1.5 border-b border-line bg-[#f5f7fc] px-3 py-2">
            {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
              <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
            ))}
            <span className="ml-2 flex h-4 flex-1 items-center rounded bg-white px-2 font-mono text-[8px] text-slate">🔒 yourbrand.com</span>
          </div>
          <div className="p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2f8f] via-cobalt to-[#1e7fd6] p-3 text-white sm:p-4">
              <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky/40 blur-xl" />
              <span className="relative block text-[11px] font-bold leading-tight sm:text-[14px]">Grow with a website<br />that works 24×7</span>
              <span className="relative mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[8px] font-semibold text-ink sm:text-[9px]">Get a quote →</span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {["from-[#fde2ef] to-[#f3e8ff]", "from-[#dcfce7] to-[#e0f2fe]", "from-[#fff1e6] to-[#fde68a]"].map((c) => (
                <span key={c} className="space-y-1 rounded-lg bg-[#f5f7fc] p-1.5">
                  <span className={`block h-7 rounded-md bg-gradient-to-br ${c} sm:h-9`} />
                  <span className="block h-1 w-[80%] rounded-full bg-line" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Piece>

      {/* ads bring an enquiry */}
      <Piece className="right-[2%] top-[2%]" delay={0.5} float={-1.2}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-xl ring-1 ring-white/40 backdrop-blur">
          <span className="flex -space-x-1">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-line"><Logo l={meta} /></span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-line"><Logo l={gads} /></span>
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold text-ink sm:text-[11px]">New enquiry</span>
            <span className="block text-[9px] text-slate">from your ad</span>
          </span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </Piece>

      {/* mobile app */}
      <Piece className="right-[3%] top-[20%] w-[27%]" delay={0.3} float={-0.6}>
        <div className="overflow-hidden rounded-[22px] border-[4px] border-[#1c2c55] bg-[#0b1630] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="mx-auto mt-1 h-2 w-10 rounded-full bg-black" />
          <div className="space-y-1.5 p-2">
            <span className="flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-1 text-[7px] text-white/80 sm:text-[8px]">
              <span className="h-1 w-1 rounded-full bg-saffron" /> Order on the way
            </span>
            <span className="block h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#db2777] sm:h-12" />
            <span className="grid grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className="h-6 rounded-md bg-gradient-to-br from-sky/50 to-cobalt/60 sm:h-8" />
              ))}
            </span>
            <span className="block rounded-full bg-white py-1 text-center text-[7px] font-semibold text-ink sm:text-[8px]">Pay with UPI</span>
          </div>
        </div>
      </Piece>

      {/* CRM */}
      <Piece className="bottom-[6%] left-0 w-[47%]" delay={0.6} float={-2}>
        <div className="rounded-2xl bg-[#0f1d3d]/95 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15 backdrop-blur">
          <span className="flex items-center justify-between text-[10px] text-white/60 sm:text-[11px]">
            <span className="font-semibold text-white">CRM · Leads</span>
            <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[8.5px] font-semibold text-emerald-300">Live</span>
          </span>
          <div className="mt-2 space-y-1.5">
            {[
              ["Priya S.", "Hot", "bg-[#f472b6]/20 text-[#f9a8d4]"],
              ["Ravi K.", "Quoted", "bg-saffron/20 text-saffron"],
              ["Anitha R.", "Won", "bg-emerald-400/20 text-emerald-300"],
            ].map(([n, st, tone]) => (
              <span key={n} className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2 py-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-sky to-cobalt text-[8px] font-bold text-white">{n[0]}</span>
                <span className="flex-1 text-[9.5px] font-medium text-white sm:text-[10.5px]">{n}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${tone}`}>{st}</span>
              </span>
            ))}
          </div>
        </div>
      </Piece>

      {/* AI agent */}
      <Piece className="bottom-[2%] right-[2%] w-[46%]" delay={0.8} float={-2.8}>
        <div className="rounded-2xl bg-gradient-to-br from-[#2b1a6b] to-[#13245e] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#a78bfa]/30">
          <span className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] to-cobalt">
              <svg viewBox="0 0 64 64" className="h-5 w-5">
                <rect x="10" y="15" width="44" height="34" rx="13" fill="#fff" />
                <rect x="16" y="23" width="32" height="17" rx="8.5" fill="#1e1b4b" />
                <rect className="animate-pulse" x="22.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
                <rect className="animate-pulse" x="35.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
              </svg>
            </span>
            <span className="text-[10px] font-semibold text-white sm:text-[11px]">AI agent</span>
            <Logo l={wa} className="ml-auto h-3.5 w-3.5" />
          </span>
          <span className="mt-2 block rounded-xl rounded-tl-sm bg-white/10 px-2.5 py-1.5 text-[9.5px] leading-snug text-white/90 sm:text-[10.5px]">
            Called Priya and booked a site visit for Saturday ✓
          </span>
        </div>
      </Piece>

      {/* test center */}
      <Piece className="left-[-2%] top-[50%]" delay={0.95} float={-3.4}>
        <div className="flex items-center gap-2 rounded-full bg-saffron px-3 py-1.5 text-[10px] font-semibold text-ink shadow-xl sm:text-[11px]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
          </svg>
          Authorized test center
        </div>
      </Piece>
    </div>
  );
}
