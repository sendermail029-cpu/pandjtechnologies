"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import TwistRibbon from "./originkit/ui/twist-ribbon";
import { CareerGlobe } from "./CareerGlobe";
import { accents } from "@/lib/accents";

// Shared pieces for the light "ribbon" heroes (FAQs, Careers): background, desktop card stack, tablet card row.

const ease = [0.22, 1, 0.36, 1] as const;

// scroll reveal: fade up the first time an element enters the viewport (skipped for reduced motion)
export const reveal = (reduce: boolean | null, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.5, ease, delay },
      };

export { accents };

export type HeroCard = { key: string; href: string; tag: string; title: string; text: string };

/**
 * Background for a light hero: a twisting satin ribbon in light blues with white veils that keep text crisp
 * and fade the top into the white header. On tall phone screens the ribbon runs top-to-bottom so it keeps broad folds.
 * Place inside a `relative isolate overflow-hidden` section.
 */
// the ribbon in light blues on white, or (dark) in cobalt on the footer navy
export function RibbonBackdrop({ dark = false }: { dark?: boolean }) {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <div aria-hidden className="absolute inset-0">
        <TwistRibbon
          background={dark ? "#060d18" : "#f7f8ff"}
          baseColor={dark ? "#0e1f4d" : "#cfe0ff"}
          accentColor={dark ? "#1c3fa8" : "#7fb2ff"}
          speed={40}
          direction={portrait ? 90 : 0}
          advanced={
            dark
              ? { goldColor: "#1e4fc4", highColor: "#5aa9e6", blueDeep: "#081a46", blueHigh: "#2f7fd8", paleColor: "#060d18", coolTint: "#0b2357" }
              : { goldColor: "#a9c6ff", highColor: "#f2f7ff", blueDeep: "#6f9cff", blueHigh: "#bfe9ff", paleColor: "#f7f8ff", coolTint: "#e3edff" }
          }
          style={{ position: "absolute", inset: 0, minWidth: 0, minHeight: 0, width: "100%", height: "100%" }}
        />
        {/* phones and tablets: soften the ribbon a little so the text stays calm */}
        <div className={`absolute inset-0 lg:hidden ${dark ? "bg-[#060d18]/40" : "bg-white/35"}`} />
      </div>
      {/* a veil behind the text keeps it crisp over the colour */}
      <div aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${dark ? "from-[#060d18]/80 via-[#060d18]/30" : "from-white/70 via-white/25"} to-transparent`} />
      {/* fade the top into the header, so the colour rises out of it with no visible edge */}
      <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${dark ? "from-[#060d18] via-[#060d18]/70" : "from-white via-white/70"} to-transparent`} />
      {!dark && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" />}
    </div>
  );
}

function CardBody({ c, i }: { c: HeroCard; i: number }) {
  return (
    <>
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${accents[i % accents.length].bar}`} />
      <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${accents[i % accents.length].tag}`}>
        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${accents[i % accents.length].dot}`} />
        {c.tag}
      </span>
      <span className="mt-3 block text-[15.5px] font-semibold leading-snug tracking-tight text-ink">{c.title}</span>
      <span className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-slate">{c.text}</span>
    </>
  );
}

// tablets: up to three cards across (phones skip them; desktop has the tilted stack)
export function CardRow({ cards }: { cards: HeroCard[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="mt-8 hidden gap-3 md:grid md:grid-cols-3 lg:hidden">
      {cards.slice(0, 3).map((c, i) => (
        <motion.li key={c.key} {...reveal(reduce, 0.3 + i * 0.1)}>
          <a href={c.href} className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white bg-white/85 p-5 pl-6 shadow-lg shadow-ink/10 backdrop-blur">
            <CardBody c={c} i={i} />
          </a>
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * A dark blue globe lit from the top left, with a dotted world map turning inside it (offices marked) and a dashed
 * orbit circling it. Size it with className (square, absolutely positioned).
 */
export function GlobeOrbit({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="absolute inset-[2%] rounded-full bg-cobalt/30 blur-[60px]" />
      <div className="absolute inset-[10%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_28%,#3d63f0_0%,#1c36ab_28%,#0b1f5c_58%,#060d18_100%)] shadow-[inset_-30px_-40px_80px_rgb(0_0_0/0.45),0_30px_80px_-20px_rgb(11_31_92/0.6)]">
        {spin ? (
          /* turning dotted world map */
          <div className="absolute inset-[-4%] opacity-90 mix-blend-screen">
            <CareerGlobe />
          </div>
        ) : (
          <>
            {/* lines of longitude (ellipses of shrinking width) and latitude (horizontal bands) */}
            {[100, 72, 44, 16].map((w) => (
              <span key={`lon-${w}`} className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-[50%] border border-white/[0.2]" style={{ width: `${w}%` }} />
            ))}
            {[22, 38, 50, 62, 78].map((t) => (
              <span key={`lat-${t}`} className="absolute inset-x-0 h-px bg-white/[0.18]" style={{ top: `${t}%` }} />
            ))}
          </>
        )}
        {/* soft highlight and a sky rim light on the dark side */}
        <span className="absolute left-[14%] top-[12%] h-[34%] w-[34%] rounded-full bg-white/20 blur-2xl" />
        <span className="absolute inset-0 rounded-full shadow-[inset_8px_-6px_24px_rgb(30_192_242/0.35)]" />
      </div>
      <motion.div
        className="absolute inset-[3%] rounded-full border-[1.5px] border-dashed border-cobalt/45"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_14px_rgb(30_192_242/0.9)]" />
      </motion.div>
      {/* a second, tilted orbit turning the other way */}
      <div className="absolute inset-[-2%] [transform:rotateX(68deg)_rotateZ(-18deg)]">
        <motion.div
          className="h-full w-full rounded-full border border-sky/50"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-saffron shadow-[0_0_14px_rgb(240_162_59/0.9)]" />
        </motion.div>
      </div>
    </div>
  );
}

// desktop: up to three cards as a floating, tilted stack in front of a dark blue globe with a turning orbit
export function CardStack({ cards }: { cards: HeroCard[] }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="relative hidden h-[420px] [perspective:1400px] lg:block">
      <GlobeOrbit className="absolute left-[68%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />

      {/* one tilt for the whole stack (no preserve-3d, so the cards keep their stacking order) */}
      <div className="absolute inset-0 [transform:rotateY(-14deg)_rotateX(6deg)]">
        {cards.slice(0, 3).map((c, i) => (
          <motion.a
            key={c.key}
            href={c.href}
            tabIndex={-1}
            initial={{ opacity: 0, y: 30 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
            transition={
              reduce
                ? { duration: 0.6, delay: 0.2 + i * 0.15 }
                : { opacity: { duration: 0.6, delay: 0.2 + i * 0.15 }, y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 } }
            }
            style={{ top: `${20 + i * 128}px`, left: `${[0, 48, 16][i]}px`, zIndex: 3 - i }}
            className="absolute flex w-[360px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-5 pl-6 shadow-2xl shadow-ink/15 backdrop-blur transition-colors hover:border-cobalt/40"
          >
            <CardBody c={c} i={i} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
