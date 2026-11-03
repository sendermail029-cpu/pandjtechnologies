"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import TextMorph from "./originkit/ui/textmorph";
import { HeroOrbit } from "./HeroOrbit";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// one word every MORPH + HOLD seconds (the textmorph's own timing, so the window stays in step)
const MORPH = 0.8;
const HOLD = 2.4;

// what we build: the word, its colour and the service it belongs to
// colours from the P & J logo: tile in the network, color for the headline word (lighter shades of the darkest ones so they read on navy)
const slides = [
  { word: "Websites", short: "Websites", color: "#0090a8", slug: "website-design", tile: "#0090a8", title: "yourbrand.com" },
  { word: "Mobile apps", short: "Mobile apps", color: "#3f8fe0", slug: "app-development", tile: "#0060a8", title: "Your app · preview" },
  { word: "CRM software", short: "CRM", color: "#2fa865", slug: "crm-software", tile: "#006030", title: "Sales pipeline" },
  { word: "ERP systems", short: "ERP", color: "#ffc030", slug: "erp-software", tile: "#ffc030", title: "Operations dashboard" },
  { word: "AI agents", short: "SaaS & AI", color: "#5b8fd0", slug: "custom-software", tile: "#004878", title: "AI agent · live" },
  { word: "Ad campaigns", short: "Marketing", color: "#f07818", slug: "digital-marketing", tile: "#f07818", title: "Campaign results" },
];

// Home hero: "We build ___ that grow your business." with a morphing word, and an app window showing that service
export function HomeHero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);


  // the morph and the window share one clock: both start when the page becomes interactive
  const [started, setStarted] = useState(false);
  // a new run id restarts the morph whenever the clock restarts, so they never drift apart
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (reduce) return;
    setStarted(true);
    setRun((r) => r + 1);
    setI(0);
    const t0 = performance.now();
    const slot = (MORPH + HOLD) * 1000;
    // the window switches halfway through each morph, when the words cross over
    const id = setInterval(() => setI(Math.floor((performance.now() - t0 + (MORPH * 1000) / 2) / slot) % slides.length), 100);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className={`${grotesk.className} mx-auto grid w-full max-w-[83rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6`}>
      {/* message */}
      <div className="order-2 min-w-0 lg:order-1 lg:pt-16">
        <h1 className="font-medium tracking-[-0.035em]">
          <span className="block text-[clamp(1.7rem,3.2vw,2.75rem)] leading-tight text-white/85">We build</span>
          <span className="sr-only">{slides.map((x) => x.word).join(", ")}</span>
          <span aria-hidden className="block h-[1.25em] text-[clamp(2.6rem,5.6vw,4.6rem)] font-bold">
            {reduce || !started ? (
              <span style={{ color: slides[0].color }}>{slides[0].word}</span>
            ) : (
              <TextMorph
                key={run}
                words={slides.map((x) => x.word).join("\n")}
                colors={slides.map((x) => x.color)}
                align="left"
                tag="span"
                transition={{ duration: MORPH, delay: HOLD, ease: "easeInOut" }}
                font={{ fontFamily: "inherit", fontWeight: 700, fontSize: "1em", lineHeight: "1.2em", letterSpacing: "-0.04em", textAlign: "left" }}
              />
            )}
          </span>
          <span className="block text-[clamp(1.7rem,3.2vw,2.75rem)] leading-tight text-white/85">that grow your business.</span>
        </h1>
        <p className="mt-5 max-w-[44ch] font-sans text-[16px] leading-relaxed text-white/60">
          Websites, apps, software and marketing from one accountable team, connected into one system.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 font-sans sm:flex sm:flex-wrap">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-3.5 text-[14.5px] font-semibold text-ink shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] sm:px-7 sm:text-[15px]"
          >
            Start a project <span aria-hidden className="transition group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-3.5 text-[14.5px] font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:px-7 sm:text-[15px]"
          >
            Explore services
          </Link>
        </div>
      </div>

      {/* every service connected to P & J, turning slowly; the one in the headline lights up */}
      <div className="order-1 mx-auto w-full max-w-[340px] min-w-0 font-sans sm:max-w-[440px] lg:order-2 lg:max-w-none">
        <HeroOrbit nodes={slides.map((x) => ({ slug: x.slug, label: x.short, color: x.tile }))} active={i} />
      </div>
    </div>
  );
}
