"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type Offering = { slug: string; href?: string; t: string; d: string; i: string };

const STEP = 5000; // ms each service stays selected
const ease = [0.22, 1, 0.36, 1] as const;
const loop = { repeat: Infinity, repeatDelay: 0.6 };

// ---- small looping scenes, one per service, drawn on a 200 × 130 "screen" ----

// Websites: a page builds itself, block by block, then a cursor clicks the button
function WebScene() {
  const block = (d: number) => ({ initial: { opacity: 0, y: 6 }, animate: { opacity: [0, 1, 1, 0], y: [6, 0, 0, 0] }, transition: { duration: 4, times: [0, 0.12, 0.88, 1], delay: d, ...loop } });
  return (
    <g>
      <rect x="10" y="8" width="180" height="114" rx="8" fill="#0d1a36" stroke="#2a4a8a" />
      <rect x="10" y="8" width="180" height="16" rx="8" fill="#13244a" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, k) => <circle key={c} cx={22 + k * 9} cy="16" r="2.6" fill={c} />)}
      <rect x="60" y="12" width="90" height="8" rx="4" fill="#0d1a36" />
      <motion.rect x="22" y="32" width="70" height="8" rx="3" fill="#7dd3fc" {...block(0)} />
      <motion.rect x="22" y="44" width="100" height="5" rx="2.5" fill="#3b5998" {...block(0.25)} />
      <motion.rect x="22" y="53" width="86" height="5" rx="2.5" fill="#3b5998" {...block(0.4)} />
      <motion.rect x="22" y="64" width="34" height="11" rx="5.5" fill="#1ec0f2" {...block(0.6)} />
      {[0, 1, 2].map((k) => <motion.rect key={k} x={22 + k * 56} y="86" width="48" height="28" rx="5" fill="#13244a" stroke="#2a4a8a" {...block(0.8 + k * 0.15)} />)}
      <motion.rect x="130" y="32" width="48" height="43" rx="6" fill="#1c36ab" {...block(0.5)} />
      <motion.path d="M0 0l9 4-4 1.5L3 10z" fill="#fff" initial={{ x: 170, y: 110 }} animate={{ x: [170, 42, 42, 170], y: [110, 70, 70, 110], scale: [1, 1, 0.8, 1] }} transition={{ duration: 4, times: [0, 0.45, 0.55, 1], ...loop }} />
    </g>
  );
}

// Apps: a phone whose screens swipe across, with a notification popping in
export function AppScene() {
  return (
    <g>
      <rect x="72" y="4" width="56" height="122" rx="12" fill="#0d1a36" stroke="#2a4a8a" strokeWidth="2" />
      <rect x="92" y="9" width="16" height="3" rx="1.5" fill="#2a4a8a" />
      <clipPath id="app-screen"><rect x="77" y="16" width="46" height="100" rx="6" /></clipPath>
      <g clipPath="url(#app-screen)">
        <motion.g animate={{ x: [0, 0, -50, -50, -100, -100, 0] }} transition={{ duration: 6, times: [0, 0.25, 0.33, 0.58, 0.66, 0.92, 1], repeat: Infinity }}>
          {["#1c36ab", "#0e9aa6", "#7c3aed"].map((c, k) => (
            <g key={c} transform={`translate(${k * 50} 0)`}>
              <rect x="77" y="16" width="46" height="44" fill={c} />
              <circle cx="100" cy="38" r="10" fill="#ffffff33" />
              <rect x="82" y="66" width="36" height="5" rx="2.5" fill="#7dd3fc" />
              <rect x="82" y="75" width="28" height="4" rx="2" fill="#3b5998" />
              <rect x="82" y="86" width="36" height="12" rx="6" fill="#1ec0f2" />
            </g>
          ))}
        </motion.g>
      </g>
      <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8] }} transition={{ duration: 6, times: [0.1, 0.18, 0.45, 0.52], repeat: Infinity }}>
        <rect x="128" y="20" width="62" height="22" rx="8" fill="#13244a" stroke="#2a4a8a" />
        <circle cx="140" cy="31" r="5" fill="#f0a23b" />
        <rect x="150" y="26" width="32" height="4" rx="2" fill="#7dd3fc" />
        <rect x="150" y="33" width="22" height="3" rx="1.5" fill="#3b5998" />
      </motion.g>
      <motion.circle cx="124" cy="16" r="5" fill="#ef4444" animate={{ scale: [0, 1.2, 1, 1, 0] }} transition={{ duration: 6, times: [0.12, 0.17, 0.2, 0.5, 0.55], repeat: Infinity }} />
    </g>
  );
}

// CRM: a deal card moving across the pipeline from "New" to "Won"
export function CrmScene() {
  const cols = ["New", "In talks", "Won"];
  return (
    <g fontFamily="ui-sans-serif, system-ui" fontSize="7">
      {cols.map((c, k) => (
        <g key={c}>
          <rect x={10 + k * 62} y="8" width="56" height="114" rx="7" fill="#0d1a36" stroke="#2a4a8a" />
          <text x={18 + k * 62} y="20" fill={k === 2 ? "#34d399" : "#7dd3fc"}>{c}</text>
          <rect x={16 + k * 62} y="28" width="44" height="18" rx="4" fill="#13244a" />
          <rect x={16 + k * 62} y="50" width="44" height="18" rx="4" fill="#13244a" />
        </g>
      ))}
      <motion.g initial={{ x: 0 }} animate={{ x: [0, 0, 62, 62, 124, 124, 0], y: [0, 0, 0, 0, 0, 0, 0] }} transition={{ duration: 5, times: [0, 0.2, 0.35, 0.55, 0.7, 0.92, 1], repeat: Infinity }}>
        <rect x="16" y="74" width="44" height="22" rx="4" fill="#1ec0f2" />
        <rect x="21" y="79" width="26" height="4" rx="2" fill="#060d18" />
        <rect x="21" y="86" width="18" height="3" rx="1.5" fill="#060d1888" />
      </motion.g>
      <motion.text x="150" y="112" fill="#34d399" fontSize="8" fontWeight="700" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 5, times: [0, 0.7, 0.75, 0.92, 0.95], repeat: Infinity }}>+1 deal</motion.text>
    </g>
  );
}

// ERP & billing: bars filling in and an invoice printing out
export function ErpScene() {
  const bars = [38, 56, 46, 72, 64, 88];
  return (
    <g>
      <rect x="10" y="8" width="112" height="114" rx="8" fill="#0d1a36" stroke="#2a4a8a" />
      <line x1="20" y1="108" x2="112" y2="108" stroke="#2a4a8a" />
      {bars.map((h, k) => (
        <motion.rect key={k} x={24 + k * 15} width="9" rx="2" fill={k === 5 ? "#1ec0f2" : "#3b5998"} initial={{ height: 0, y: 108 }} animate={{ height: [0, h * 0.85, h * 0.85, 0], y: [108, 108 - h * 0.85, 108 - h * 0.85, 108] }} transition={{ duration: 4.5, times: [0, 0.2, 0.9, 1], delay: k * 0.1, ...loop }} />
      ))}
      <rect x="130" y="8" width="60" height="8" rx="4" fill="#13244a" />
      <clipPath id="erp-print"><rect x="130" y="14" width="60" height="110" /></clipPath>
      <g clipPath="url(#erp-print)">
        <motion.g initial={{ y: -90 }} animate={{ y: [-90, 0, 0, -90] }} transition={{ duration: 4.5, times: [0, 0.35, 0.9, 1], ...loop }}>
          <rect x="135" y="14" width="50" height="86" rx="3" fill="#e8eefc" />
          <rect x="141" y="22" width="24" height="5" rx="2" fill="#1c36ab" />
          {[34, 42, 50, 58].map((y) => <rect key={y} x="141" y={y} width="38" height="3" rx="1.5" fill="#94a3b8" />)}
          <rect x="141" y="72" width="38" height="1" fill="#94a3b8" />
          <rect x="157" y="78" width="22" height="6" rx="2" fill="#0e9aa6" />
          <text x="141" y="94" fontSize="6" fill="#0e9aa6" fontFamily="ui-monospace, monospace">GST ✓</text>
        </motion.g>
      </g>
    </g>
  );
}

// Custom software: code typing itself out in an editor
export function CodeScene() {
  const lines: [number, number, string][] = [
    [0, 60, "#c792ea"], [12, 80, "#82aaff"], [12, 54, "#c3e88d"], [24, 70, "#82aaff"], [24, 40, "#f78c6c"], [12, 30, "#82aaff"], [0, 20, "#c792ea"],
  ];
  return (
    <g>
      <rect x="10" y="8" width="180" height="114" rx="8" fill="#0a1226" stroke="#2a4a8a" />
      <rect x="10" y="8" width="180" height="14" rx="8" fill="#13244a" />
      <rect x="18" y="12" width="30" height="6" rx="3" fill="#0a1226" />
      {lines.map(([indent, w, c], k) => (
        <g key={k}>
          <text x="18" y={36 + k * 12} fontSize="6" fill="#ffffff33" fontFamily="ui-monospace, monospace">{k + 1}</text>
          <motion.rect x={30 + indent} y={31 + k * 12} height="5" rx="2.5" fill={c} initial={{ width: 0 }} animate={{ width: [0, w, w, 0] }} transition={{ duration: 5, times: [0, 0.12, 0.9, 1], delay: k * 0.35, ...loop }} />
        </g>
      ))}
      <motion.rect x="150" y="100" width="34" height="14" rx="7" fill="#28c840" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 5.6, times: [0, 0.55, 0.6, 0.9, 1], repeat: Infinity }} />
      <motion.text x="157" y="109.5" fontSize="7" fill="#060d18" fontWeight="700" fontFamily="ui-sans-serif, system-ui" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 5.6, times: [0, 0.55, 0.6, 0.9, 1], repeat: Infinity }}>Live</motion.text>
    </g>
  );
}

// Digital marketing: results climbing on a chart, with enquiries pinging in
export function MarketingScene() {
  return (
    <g fontFamily="ui-sans-serif, system-ui">
      <rect x="10" y="8" width="180" height="114" rx="8" fill="#0d1a36" stroke="#2a4a8a" />
      <text x="20" y="24" fontSize="7" fill="#7dd3fc">Enquiries</text>
      <motion.text x="20" y="40" fontSize="14" fontWeight="700" fill="#fff" animate={{ opacity: [0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}>Growing ↑</motion.text>
      {[40, 60, 80, 100].map((y) => <line key={y} x1="20" x2="180" y1={y + 10} y2={y + 10} stroke="#13244a" />)}
      <motion.path d="M20 108 L50 98 L78 102 L106 80 L134 72 L160 50 L180 38" fill="none" stroke="#1ec0f2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4.5, times: [0, 0.5, 0.92, 1], ...loop }} />
      <motion.path d="M20 108 L50 98 L78 102 L106 80 L134 72 L160 50 L180 38 L180 110 L20 110z" fill="#1ec0f2" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.15, 0.15, 0] }} transition={{ duration: 4.5, times: [0, 0.4, 0.55, 0.92, 1], ...loop }} />
      {[[106, 80], [160, 50]].map(([x, y], k) => (
        <motion.g key={k} animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, 0] }} transition={{ duration: 4.5, times: [0, 0.3 + k * 0.15, 0.38 + k * 0.15, 0.9, 1], ...loop }}>
          <rect x={x - 16} y={y - 20} width="32" height="12" rx="6" fill="#f0a23b" />
          <text x={x} y={y - 12} fontSize="6.5" fontWeight="700" fill="#060d18" textAnchor="middle">+ lead</text>
        </motion.g>
      ))}
    </g>
  );
}

// Test center: a computer-based exam with questions being answered and a secure check
function ExamScene() {
  return (
    <g fontFamily="ui-sans-serif, system-ui">
      <rect x="30" y="8" width="140" height="94" rx="8" fill="#0d1a36" stroke="#2a4a8a" />
      <rect x="88" y="102" width="24" height="12" fill="#13244a" />
      <rect x="70" y="114" width="60" height="6" rx="3" fill="#13244a" />
      <text x="40" y="24" fontSize="7" fill="#7dd3fc">Question 12 / 40</text>
      <motion.rect x="128" y="17" width="34" height="10" rx="5" fill="#f0a23b33" />
      <text x="133" y="24.5" fontSize="6.5" fill="#f0a23b" fontFamily="ui-monospace, monospace">45:00</text>
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x="40" y={34 + k * 15} width="120" height="11" rx="5.5" fill="#13244a" />
          <circle cx="48" cy={39.5 + k * 15} r="3" fill="none" stroke="#3b5998" />
          <rect x="56" y={38 + k * 15} width={60 + (k % 2) * 20} height="3" rx="1.5" fill="#3b5998" />
        </g>
      ))}
      <motion.circle cx="48" cy="54.5" r="3" fill="#1ec0f2" animate={{ cy: [39.5, 54.5, 54.5, 69.5, 69.5, 39.5], opacity: [1, 1, 1, 1, 1, 1] }} transition={{ duration: 4, times: [0, 0.25, 0.5, 0.75, 0.95, 1], repeat: Infinity }} />
      <motion.g animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} style={{ originX: "178px", originY: "108px" }}>
        <path d="M178 96l10 4v7c0 6-4 10-10 12-6-2-10-6-10-12v-7z" fill="#10b981" />
        <path d="M173 107l3.5 3.5 6-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </g>
  );
}

const scenes: Record<string, () => ReactNode> = {
  "website-design": WebScene,
  "app-development": AppScene,
  "crm-software": CrmScene,
  "erp-software": ErpScene,
  "custom-software": CodeScene,
  "digital-marketing": MarketingScene,
  "test-center": ExamScene,
};

// Services as one connected system: a large interactive list beside a live hub. The hub's centre is a screen
// that plays a short animation of the selected service; the services orbit it as 3D icons joined by data lines.
export function ServicesHub({ items }: { items: Offering[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const R = 40;
  const nodes = items.map((_, k) => {
    const a = (k / items.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
  });
  const Scene = scenes[items[active].slug];

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), STEP);
    return () => clearTimeout(t);
  }, [active, paused, reduce, items.length]);

  return (
    <div className="mt-10 grid items-center gap-8 sm:mt-14 sm:gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16" onMouseLeave={() => setPaused(false)}>
      {/* the list: big type, hairlines, the selected one opens up */}
      <ol className="order-2 border-t border-white/10 lg:order-1" onMouseEnter={() => setPaused(true)}>
        {items.map((o, i) => {
          const on = i === active;
          return (
            <li key={o.slug} className="border-b border-white/10">
              <button type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-expanded={on} className="group flex w-full items-center gap-5 py-4 text-left sm:py-5">
                <span className={`font-mono text-[12px] transition-colors ${on ? "text-sky" : "text-white/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex-1 text-[clamp(1.15rem,2.3vw,1.9rem)] font-semibold tracking-tight transition-all duration-300 ${on ? "translate-x-1 text-white" : "text-white/40 group-hover:text-white/70"}`}>
                  {o.t}
                </span>
                <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 ${on ? "rotate-0 border-sky bg-sky text-[#060d18]" : "-rotate-45 border-white/15 text-white/40"}`}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                    <div className="pb-6 pl-10">
                      <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-white/60">{o.d}</p>
                      <Link href={o.href ?? `/services/${o.slug}`} className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-sky hover:text-white">
                        Explore {o.t.toLowerCase()} <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>

      {/* the hub */}
      <div aria-hidden className="relative order-1 mx-auto aspect-square w-[88%] max-w-[560px] sm:w-full lg:order-2">
        <div className="absolute inset-[18%] rounded-full bg-cobalt/25 blur-3xl" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.circle cx="50" cy="50" r={R} fill="none" stroke="rgb(125 211 252 / 0.18)" strokeWidth="0.25" strokeDasharray="1 1.6" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }} />
          {nodes.map((n, k) => (
            <line key={k} x1="50" y1="50" x2={n.x} y2={n.y} stroke={k === active ? "#1ec0f2" : "rgb(125 211 252 / 0.15)"} strokeWidth={k === active ? 0.5 : 0.25} style={{ transition: "stroke 0.4s, stroke-width 0.4s" }} />
          ))}
          {!reduce && (
            <motion.circle key={active} r="1.1" fill="#7dd3fc" style={{ filter: "drop-shadow(0 0 2px #1ec0f2)" }} initial={{ cx: 50, cy: 50, opacity: 1 }} animate={{ cx: nodes[active].x, cy: nodes[active].y, opacity: [1, 1, 0] }} transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }} />
          )}
        </svg>

        {/* centre screen: plays the selected service */}
        <div className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl sm:w-[52%] sm:rounded-2xl border border-sky/30 bg-[#081022] shadow-[0_0_70px_-12px_rgba(30,192,242,0.8)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{items[active].t}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.svg key={active} viewBox="0 0 200 130" className="block w-full" initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease }}>
              <Scene />
            </motion.svg>
          </AnimatePresence>
        </div>

        {/* service nodes: 3D icons */}
        {items.map((o, k) => {
          const on = k === active;
          const n = nodes[k];
          return (
            <button
              key={o.slug}
              type="button"
              tabIndex={-1}
              onClick={() => setActive(k)}
              onMouseEnter={() => {
                setPaused(true);
                setActive(k);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl border transition duration-300 sm:h-[68px] sm:w-[68px] sm:rounded-2xl ${on ? "scale-110 border-sky bg-[#0e2350] shadow-[0_0_40px_-4px_rgba(30,192,242,0.9)]" : "border-white/15 bg-[#0a1226] hover:border-sky/50"}`}>
                <Image src={`/services-3d/${o.slug}.png`} alt="" width={44} height={44} loading="eager" className={`h-7 w-7 transition duration-300 sm:h-11 sm:w-11 ${on ? "" : "opacity-80 grayscale-[30%]"}`} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
