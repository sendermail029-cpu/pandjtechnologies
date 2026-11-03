"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/site";
import { serviceIcons, testCenterIcon } from "@/lib/service-icons";

// every service, plus the test center, around the P & J core
const items = [
  ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name.split(" —")[0].replace(" design & development", "s").replace(" development", "s").replace(" software", ""), icon: serviceIcons[s.slug] })),
  { href: "/test-center", label: "Test center", icon: testCenterIcon },
];

// node positions as % of the box: an ellipse around the centre
const spots = items.map((_, k) => {
  const a = (k / items.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 38 };
});

// P & J at the centre, connected to every service: a pulse runs out to each in turn, and hovering one lights its link
export function FooterScene() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const on = hover ?? active;

  useEffect(() => {
    if (reduce || hover !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 1600);
    return () => clearInterval(t);
  }, [reduce, hover]);

  return (
    <div className="relative aspect-[10/9] w-full max-w-[340px]">
      <div aria-hidden className="absolute inset-[20%] rounded-full bg-cobalt/30 blur-3xl" />

      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {/* orbit */}
        <ellipse cx="50" cy="50" rx="40" ry="38" fill="none" stroke="rgb(125 211 252 / 0.14)" strokeWidth="0.3" strokeDasharray="1 1.6" vectorEffect="non-scaling-stroke" />
        {/* links from the centre to each service */}
        {spots.map((p, k) => (
          <line
            key={k}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke={k === on ? "#1ec0f2" : "rgb(125 211 252 / 0.18)"}
            strokeWidth={k === on ? 1.6 : 1}
            vectorEffect="non-scaling-stroke"
            className={k === on ? "" : "map-flow"}
            style={{ transition: "stroke 0.3s" }}
          />
        ))}
        {/* a pulse travelling out to the active service */}
        {!reduce && (
          <motion.circle
            key={on}
            r="1.4"
            fill="#7dd3fc"
            style={{ filter: "drop-shadow(0 0 2px #1ec0f2)" }}
            initial={{ cx: 50, cy: 50, opacity: 1 }}
            animate={{ cx: spots[on].x, cy: spots[on].y, opacity: [1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* the P & J core */}
      <div className="absolute left-1/2 top-1/2 grid h-[26%] w-[29%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sky/40 bg-[#0a1226] shadow-[0_0_50px_-6px_rgba(30,192,242,0.8)]">
        {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-sky/30 [animation-duration:3s]" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.webp" alt="P & J Technologies" className="h-[58%] w-[58%] object-contain" />
      </div>

      {/* services */}
      {items.map((it, k) => {
        const lit = k === on;
        return (
          <Link
            key={it.href}
            href={it.href}
            onMouseEnter={() => setHover(k)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(k)}
            onBlur={() => setHover(null)}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${spots[k].x}%`, top: `${spots[k].y}%` }}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl border transition duration-300 sm:h-11 sm:w-11 ${
                lit ? "scale-110 border-sky bg-sky text-[#060d18] shadow-[0_0_24px_-2px_rgba(30,192,242,0.9)]" : "border-white/15 bg-[#0a1226] text-sky"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={it.icon} />
              </svg>
            </span>
            <span className={`whitespace-nowrap text-[11px] font-medium transition-colors ${lit ? "text-white" : "text-white/50"}`}>{it.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
