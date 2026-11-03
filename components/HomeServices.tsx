"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services, testingPartners } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { WebsiteBuildMockup } from "./WebsiteBuildMockup";
import { MarketingHeroVisual } from "./MarketingHeroVisual";
import { ServiceHeroVisual } from "./ServiceHeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

const shortNames: Record<string, string> = {
  "website-design": "Websites",
  "app-development": "Mobile apps",
  "crm-software": "CRM software",
  "erp-software": "ERP software",
  "custom-software": "SaaS & AI",
  "digital-marketing": "Digital marketing",
};

type Item = { slug: string; href: string; name: string; text: string; points: string[]; cta: string };
const items: Item[] = [
  ...services.map((s) => ({
    slug: s.slug,
    href: `/services/${s.slug}`,
    name: shortNames[s.slug] ?? s.name,
    text: s.short,
    points: s.outcomes.slice(0, 3),
    cta: `Explore ${shortNames[s.slug] ?? s.name}`,
  })),
  {
    slug: "test-center",
    href: "/test-center",
    name: "Test center",
    text: `Authorized, proctored exams in Vijayawada for ${testingPartners.join(", ")}.`,
    points: ["Dedicated, secure testing room", "Proctored sessions and ID checks", "Help with booking and exam day"],
    cta: "See the test center",
  },
];

// the preview on the right: each service's own hero visual
function Visual({ slug }: { slug: string }) {
  if (slug === "website-design") return <WebsiteBuildMockup />;
  if (slug === "digital-marketing") return <MarketingHeroVisual />;
  if (slug === "test-center")
    return (
      <div className="relative mx-auto grid aspect-[4/3] w-full max-w-[560px] place-items-center">
        <div className="absolute inset-[12%] rounded-full bg-saffron/20 blur-3xl" />
        <div className="relative w-[80%] rounded-[28px] bg-white/[0.05] p-6 text-center ring-1 ring-white/15 backdrop-blur">
          <Image src="/services-3d/test-center.png" alt="" width={120} height={120} className="float-icon mx-auto h-24 w-24" />
          <p className="mt-4 text-[20px] font-semibold">Authorized test center</p>
          <p className="mt-1 text-[13.5px] text-white/60">Vijayawada · computer-based exams</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {testingPartners.map((t) => (
              <span key={t} className="rounded-full bg-saffron/15 px-3 py-1.5 text-[12.5px] font-semibold text-saffron ring-1 ring-saffron/30">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  return <ServiceHeroVisual slug={slug} tags={servicePages[slug]?.tags ?? []} />;
}

// Home: every service in one place — pick one to see what it looks like
export function HomeServices() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const row = useRef<HTMLUListElement>(null);
  const it = items[i];

  // moves on by itself until someone picks a service
  useEffect(() => {
    if (!auto || hover || reduce) return;
    const id = setTimeout(() => setI((n) => (n + 1) % items.length), 7000);
    return () => clearTimeout(id);
  }, [i, auto, hover, reduce]);

  // phones: keep the active pill in view
  useEffect(() => {
    const ul = row.current;
    const li = ul?.children[i] as HTMLElement | undefined;
    if (!ul || !li || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: li.offsetLeft - 24, behavior: "smooth" });
  }, [i]);

  const pick = (k: number) => {
    setI(k);
    setAuto(false);
  };

  return (
    <div className="mt-10 grid min-w-0 gap-8 sm:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {/* phones: this column dissolves so the order is service pills, preview, then details */}
      <div className="contents lg:block lg:min-w-0">
        <ul ref={row} role="tablist" aria-label="Our services" className="order-1 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((x, k) => {
            const on = k === i;
            return (
              <li key={x.slug} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(k)}
                  className={`relative flex w-full items-center gap-3 overflow-hidden rounded-full py-1.5 pl-1.5 pr-4 text-left transition duration-300 lg:rounded-2xl lg:p-3 ${
                    on ? "bg-white/[0.09] ring-1 ring-white/20" : "ring-1 ring-white/10 hover:bg-white/[0.05] lg:ring-transparent"
                  }`}
                >
                  <Image src={`/services-3d/${x.slug}.png`} alt="" width={48} height={48} className={`h-8 w-8 shrink-0 transition duration-300 lg:h-11 lg:w-11 ${on ? "scale-110" : "opacity-70"}`} />
                  <span className="min-w-0 flex-1">
                    <span className={`block whitespace-nowrap text-[14px] font-semibold lg:text-[17px] ${on ? "text-white" : "text-white/65"}`}>{x.name}</span>
                    <span className={`hidden text-[13px] leading-snug text-white/50 ${on ? "lg:block" : ""}`}>{x.text}</span>
                  </span>
                  <span className={`hidden font-mono text-[11px] lg:block ${on ? "text-sky" : "text-white/30"}`}>0{k + 1}</span>
                  {/* time until the next service */}
                  {on && auto && !hover && !reduce && (
                    <motion.span
                      key={`bar-${i}`}
                      aria-hidden
                      className="absolute bottom-0 left-0 hidden h-0.5 bg-gradient-to-r from-sky to-[#a78bfa] lg:block"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* details of the selected service */}
        <AnimatePresence mode="wait">
          <motion.div
            key={it.slug}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease }}
            className="order-3 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 lg:mt-6"
          >
            <p className="text-[15px] leading-relaxed text-white/70 lg:hidden">{it.text}</p>
            <ul className="mt-3 space-y-2 lg:mt-0">
              {it.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                  <svg className="mt-1 shrink-0 text-emerald-400" width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <Link href={it.href} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe]">
              {it.cta} <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* live preview */}
      <div className="relative order-2 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={it.slug}
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
          >
            <Visual slug={it.slug} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
