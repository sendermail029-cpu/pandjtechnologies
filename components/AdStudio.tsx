"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { crmLogos } from "@/lib/crm-logos";
import { toolIcons } from "@/lib/brand-icons";

const ease = [0.22, 1, 0.36, 1] as const;
const google = toolIcons.find((b) => b.title === "Google")!;
const youtube = {
  color: "#FF0000",
  path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

const Logo = ({ l, className = "h-4 w-4" }: { l: { color: string; path: string }; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill={l.color} aria-hidden>
    <path d={l.path} />
  </svg>
);

/* ---------- example ads (a made-up brand, for illustration) ---------- */

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[250px] overflow-hidden rounded-[34px] border-[6px] border-[#1c2c55] bg-white shadow-[0_40px_80px_-30px_rgba(56,189,248,0.45)] sm:w-[270px]">
      <div className="mx-auto mt-1.5 h-4 w-20 rounded-full bg-[#1c2c55]" />
      {children}
    </div>
  );
}

function SocialAd({ cta, caption }: { cta: string; caption: string }) {
  return (
    <Phone>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#f472b6] to-cobalt text-[10px] font-bold text-white">YB</span>
        <span className="flex-1">
          <span className="block text-[12px] font-semibold text-ink">yourbrand</span>
          <span className="block text-[10px] text-slate">Sponsored</span>
        </span>
        <span className="text-slate">···</span>
      </div>
      <div className="relative grid aspect-square place-items-center overflow-hidden bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#f59e0b] text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
        <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-black/10" />
        <div className="relative px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">New season</p>
          <p className="mt-1 text-[24px] font-bold leading-tight">Your offer, front and centre</p>
          <p className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink">Limited time</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#f1f5ff] px-3 py-2.5">
        <span className="text-[12px] font-semibold text-ink">{cta}</span>
        <span className="text-ink">›</span>
      </div>
      <div className="px-3 pb-3 pt-2 text-[11.5px] leading-snug text-slate">
        <span className="font-semibold text-ink">yourbrand</span> {caption}
      </div>
    </Phone>
  );
}

function SearchAd() {
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(56,189,248,0.45)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Logo l={google} className="h-4 w-4" />
        <span className="flex-1 rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[12px] text-ink">interior designers near me</span>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <p className="text-[11px] font-semibold text-ink">Sponsored</p>
          <p className="mt-1 flex items-center gap-2 text-[11.5px] text-slate">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-cobalt text-[8px] font-bold text-white">YB</span>
            yourbrand.com
          </p>
          <p className="mt-1 text-[16px] font-medium leading-snug text-[#1a0dab]">Interior Design for Your Home | Free Consultation</p>
          <p className="mt-1 text-[12px] leading-snug text-slate">Designs that fit your space and budget. Book a free design consultation today.</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#1a0dab]">
            <span>Our work</span>
            <span>Pricing</span>
            <span>Book a visit</span>
          </div>
        </div>
        {[0, 1].map((k) => (
          <div key={k} className="space-y-1.5 opacity-50">
            <span className="block h-2 w-24 rounded-full bg-line" />
            <span className="block h-2.5 w-[80%] rounded-full bg-[#c7d2fe]" />
            <span className="block h-2 w-[90%] rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoAd() {
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#0f0f0f] shadow-[0_40px_80px_-30px_rgba(255,0,0,0.35)]">
      <div className="relative grid aspect-video place-items-center bg-gradient-to-br from-[#1e3a8a] via-[#7c3aed] to-[#db2777]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f0f0f" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-3 left-3 rounded bg-[#fbbf24] px-1.5 py-0.5 text-[10px] font-bold text-ink">Ad</span>
        <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white">Skip ›</span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <motion.span className="block h-full bg-[#fbbf24]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
        </span>
      </div>
      <div className="flex items-center gap-3 p-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f472b6] to-cobalt text-[11px] font-bold text-white">YB</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-white">See how we design your space</span>
          <span className="block text-[11px] text-white/55">Sponsored · yourbrand.com</span>
        </span>
        <span className="shrink-0 rounded-full bg-[#3ea6ff] px-3 py-1.5 text-[11.5px] font-semibold text-ink">Book now</span>
      </div>
    </div>
  );
}

const platforms = [
  {
    t: "Instagram",
    logo: crmLogos.Instagram,
    ad: <SocialAd cta="Learn more" caption="Fresh designs for your home this season. Tap to see the full collection." />,
    points: ["Feed, Stories and Reels placements", "Audiences by location, interest and lookalikes", "Creatives sized for every placement"],
  },
  {
    t: "Facebook",
    logo: crmLogos.Facebook,
    ad: <SocialAd cta="Send WhatsApp message" caption="Questions? Message us on WhatsApp and get a reply in minutes." />,
    points: ["Lead forms and click-to-WhatsApp ads", "Retargeting people who visited your website", "Leads sent straight to your CRM"],
  },
  {
    t: "Google Search",
    logo: google,
    ad: <SearchAd />,
    points: ["Show up when people search for what you sell", "Keywords, ad copy and sitelinks that convert", "Calls and enquiries tracked as conversions"],
  },
  {
    t: "YouTube",
    logo: youtube,
    ad: <VideoAd />,
    points: ["Short video ads that build trust before the click", "Targeted by topic, audience and location", "Scripts and edits handled for you"],
  },
];

// Pick a platform to preview an example ad there, with what we handle on it
export function AdStudio() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % platforms.length), 5200);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const p = platforms[i];

  return (
    <div className="mt-10 sm:mt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* platform switcher */}
      <div role="tablist" aria-label="Ad platforms" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {platforms.map((x, k) => {
          const on = k === i;
          return (
            <button
              key={x.t}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setI(k)}
              className={`relative flex shrink-0 items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[14px] font-semibold transition ${
                on ? "text-ink" : "bg-white/[0.05] text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {on && <motion.span layoutId="ad-tab" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.4, ease }} />}
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white">
                <Logo l={x.logo} />
              </span>
              <span className="relative">{x.t}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* the example ad */}
        <div className="relative min-w-0">
          <div aria-hidden className="absolute inset-x-[10%] inset-y-[8%] rounded-full bg-gradient-to-br from-[#db2777]/25 via-[#7c3aed]/25 to-sky/25 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              aria-hidden
              className="relative"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
            >
              {p.ad}
            </motion.div>
          </AnimatePresence>
          <p className="relative mt-4 text-center text-[12px] text-white/40">Example ad for illustration</p>
        </div>

        {/* what we handle there */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white">
                  <Logo l={p.logo} className="h-6 w-6" />
                </span>
                <span className="text-[26px] font-semibold tracking-tight sm:text-[30px]">{p.t} ads</span>
              </p>
              <ul className="mt-6 space-y-3">
                {p.points.map((x) => (
                  <li key={x} className="flex items-start gap-3 rounded-2xl bg-white/[0.05] px-4 py-3.5 text-[15px] text-white/85 ring-1 ring-white/10">
                    <svg className="mt-0.5 shrink-0 text-emerald-400" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          {/* progress to the next platform */}
          <div aria-hidden className="mt-6 flex gap-1.5">
            {platforms.map((x, k) => (
              <span key={x.t} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                {k === i && !paused && !reduce ? (
                  <motion.span key={`p-${i}`} className="block h-full bg-gradient-to-r from-[#f472b6] to-sky" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5.2, ease: "linear" }} />
                ) : (
                  <span className={`block h-full ${k < i || (k === i && (paused || reduce)) ? "w-full bg-white/40" : "w-0"}`} />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
