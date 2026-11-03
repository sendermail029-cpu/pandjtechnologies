"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services, testingPartners } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const shortNames: Record<string, string> = {
  "website-design": "Websites",
  "app-development": "Mobile apps",
  "crm-software": "CRM",
  "erp-software": "ERP",
  "custom-software": "SaaS & AI",
  "digital-marketing": "Marketing",
};

// every service, plus the test center, around the P & J core
const items = [
  ...services.map((s) => ({ slug: s.slug, href: `/services/${s.slug}`, label: shortNames[s.slug] ?? s.name, text: s.short })),
  { slug: "test-center", href: "/test-center", label: "Test center", text: `Authorized exams for ${testingPartners.join(", ")}.` },
];

// node positions as % of the square: a circle around the centre
const spots = items.map((_, k) => {
  const a = (k / items.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 39, y: 50 + Math.sin(a) * 39 };
});

// P & J at the centre, connected to every service. A pulse runs out to each in turn; hover or tap one to light it.
export function HomeHub() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const on = hover ?? active;

  useEffect(() => {
    if (reduce || hover !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 2200);
    return () => clearInterval(t);
  }, [reduce, hover]);

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <div className="relative aspect-square w-full">
        {/* soft glow, rings and a beam sweeping round */}
        <div aria-hidden className="absolute inset-[18%] rounded-full bg-gradient-to-br from-cobalt/25 via-[#7c3aed]/15 to-sky/25 blur-3xl" />
        <div aria-hidden className="absolute inset-[11%] rounded-full border border-dashed border-cobalt/20" />
        <div aria-hidden className="absolute inset-[27%] rounded-full border border-cobalt/10" />
        <div
          aria-hidden
          className="orbit-spin absolute inset-[11%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(39,71,214,0.35)_60deg,rgba(56,189,248,0.6)_90deg,transparent_100deg)] [animation-duration:9s] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]"
        />

        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {spots.map((p, k) => (
            <line
              key={k}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={k === on ? "#2747d6" : "rgb(39 71 214 / 0.16)"}
              strokeWidth={k === on ? 0.7 : 0.4}
              className={k === on ? "" : "map-flow"}
              style={{ transition: "stroke 0.3s" }}
            />
          ))}
          {!reduce && (
            <motion.circle
              key={on}
              r="1.3"
              fill="#38bdf8"
              style={{ filter: "drop-shadow(0 0 1.5px #2747d6)" }}
              initial={{ cx: 50, cy: 50, opacity: 1 }}
              animate={{ cx: spots[on].x, cy: spots[on].y, opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* the P & J core */}
        <div className="absolute left-1/2 top-1/2 grid h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#060d18] shadow-[0_24px_60px_-12px_rgba(39,71,214,0.7)] ring-4 ring-white">
          {!reduce && (
            <>
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-cobalt/30 [animation-duration:3s]" />
              <span aria-hidden className="absolute -inset-3 animate-ping rounded-full border border-sky/20 [animation-delay:1.5s] [animation-duration:3s]" />
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="P & J Technologies" className="relative h-[52%] w-[52%] object-contain" />
        </div>

        {/* services */}
        {items.map((it, k) => {
          const lit = k === on;
          return (
            <Link
              key={it.slug}
              href={it.href}
              onMouseEnter={() => setHover(k)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(k)}
              onBlur={() => setHover(null)}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${spots[k].x}%`, top: `${spots[k].y}%` }}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-white ring-1 transition duration-300 sm:h-[72px] sm:w-[72px] ${
                  lit ? "scale-110 shadow-[0_18px_40px_-12px_rgba(39,71,214,0.55)] ring-cobalt/50" : "shadow-[0_10px_24px_-14px_rgba(15,29,51,0.4)] ring-line"
                }`}
              >
                <Image src={`/services-3d/${it.slug}.png`} alt="" width={56} height={56} className={`h-9 w-9 transition duration-300 sm:h-12 sm:w-12 ${lit ? "-rotate-6" : ""}`} />
              </span>
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold transition duration-300 sm:text-[13px] ${
                  lit ? "bg-cobalt text-white" : "bg-white/80 text-ink-2"
                }`}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* what the lit service does */}
      <div className="mt-2 min-h-[64px] text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={on}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
            className="mx-auto max-w-[40ch] text-[14.5px] leading-relaxed text-slate"
          >
            <Link href={items[on].href} className="font-semibold text-cobalt hover:underline">
              {items[on].label} →
            </Link>{" "}
            {items[on].text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
