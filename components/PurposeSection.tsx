"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { TechCircuit } from "./TechCircuit";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const ease = [0.22, 1, 0.36, 1] as const;

// the vision, written as a small config file that types itself out
type Tok = [string, string];
const code: Tok[][] = [
  [["text-[#c792ea]", "const "], ["text-sky", "vision"], ["text-white/70", " = {"]],
  [["text-white/45", "  // what we are building towards"]],
  [["text-[#82aaff]", "  runs"], ["text-white/70", ": "], ["text-[#c3e88d]", '"24×7"'], ["text-white/70", ","]],
  [["text-[#82aaff]", "  manualWork"], ["text-white/70", ": "], ["text-[#f78c6c]", "false"], ["text-white/70", ","]],
  [["text-[#82aaff]", "  risk"], ["text-white/70", ": "], ["text-[#c3e88d]", '"minimal"'], ["text-white/70", ","]],
  [["text-[#82aaff]", "  ownersFocusOn"], ["text-white/70", ": "], ["text-[#c3e88d]", '"growth"'], ["text-white/70", ","]],
  [["text-white/70", "};"]],
];

const steps = [
  {
    t: "Understand",
    d: "We learn how your business really works before we build anything.",
    i: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  },
  {
    t: "Build",
    d: "Secure, reliable websites, apps and software made around your daily operations.",
    i: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  },
  {
    t: "Support",
    d: "Long-term support after launch, so your systems keep working as you grow.",
    i: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5",
  },
];

function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const show = reduce || inView;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1226]/90 shadow-[0_30px_80px_-30px_rgba(39,71,214,0.6)] backdrop-blur">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[12px] text-white/45">vision.ts</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.9] sm:text-[14px]" aria-label="Our vision: businesses that run 24×7 without manual work, with minimal risk, so owners can focus on growth.">
        {code.map((line, n) => (
          <motion.div
            key={n}
            className="flex"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, ease, delay: 0.2 + n * 0.22 }}
          >
            <span className="mr-5 w-4 shrink-0 select-none text-right text-white/25">{n + 1}</span>
            <span>
              {line.map(([c, t], k) => (
                <span key={k} className={c}>
                  {t}
                </span>
              ))}
              {n === code.length - 1 && <span aria-hidden className="ml-1 inline-block h-[1.05em] w-[7px] translate-y-[3px] animate-pulse bg-sky" />}
            </span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

// Vision and mission for international readers: a dark technology section with a self-typing "vision" file
// and the mission as a three-step pipeline with a data pulse running through it
export function PurposeSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10">
        <TechCircuit className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgb(6_13_24/0.55),rgb(6_13_24/0.92))]" />
        <div className="footer-glow absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
        <div className="footer-glow absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-3xl [animation-delay:-9s]" />
      </div>

      <div className="mx-auto max-w-[83rem]">
        <div className="mx-auto max-w-3xl text-center">
          <p data-aos="fade-up" className="flex items-center justify-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
            <span aria-hidden className="h-px w-8 bg-sky/50" />
            Our purpose
            <span aria-hidden className="h-px w-8 bg-sky/50" />
          </p>
          <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Where we&apos;re going, and <span className={`${serif.className} whitespace-nowrap tracking-normal text-sky`}>how we get there.</span>
          </h2>
        </div>

        {/* vision */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div data-aos="fade-up">
            <p className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-sky/30 bg-sky/10">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </span>
              Our vision
            </p>
            <p className="mt-6 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
              Businesses that run smoothly <span className="text-sky">24×7</span>, without the manual work.
            </p>
            <p className="mt-5 max-w-[50ch] text-[16.5px] leading-[1.75] text-white/65">
              We want business owners to spend their time growing the business, not repeating the same tasks every day. So we
              build automation that takes care of the routine work, keeps running day and night, and keeps risk to a minimum.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="150">
            <CodeWindow />
          </div>
        </div>

        {/* mission */}
        <div className="mt-20 sm:mt-24">
          <div data-aos="fade-up" className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-sky/30 bg-sky/10">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </span>
              Our mission
            </p>
            <p className="mt-6 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
              Reliable, secure technology for every business, <span className="text-sky">whatever its size.</span>
            </p>
          </div>

          {/* pipeline: three stages joined by a line with a travelling pulse */}
          <div className="relative mt-12">
            <div aria-hidden className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-px bg-gradient-to-r from-sky/20 via-sky/50 to-sky/20 md:block">
              {!reduce && (
                <motion.span
                  className="absolute -top-[3px] h-[7px] w-16 rounded-full bg-gradient-to-r from-transparent via-sky to-transparent shadow-[0_0_12px_#1ec0f2]"
                  animate={{ left: ["-5%", "100%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                />
              )}
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.t} data-aos="fade-up" data-aos-delay={i * 120} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl md:h-[72px] md:w-[72px] border border-sky/30 bg-[#0a1226] text-sky shadow-[0_0_40px_-8px_rgba(30,192,242,0.55)]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={s.i} />
                    </svg>
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-saffron font-mono text-[11px] font-semibold text-ink">
                      {i + 1}
                    </span>
                  </span>
                  <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:mt-5 md:p-6 transition duration-300 hover:-translate-y-1 hover:border-sky/40 hover:bg-white/[0.07]">
                    <h3 className="text-[19px] font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/65">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
