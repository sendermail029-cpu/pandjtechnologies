"use client";

import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

// the plane's flight: a gentle loop up and across, ending where the tick appears
const flight = "M20 120 C 90 120, 110 40, 190 52 S 300 120, 360 70";

const steps = [
  { t: "Enquiry received", d: "It's with our team now." },
  { t: "We review your project", d: "A senior team member reads it in full." },
  { t: "We get back to you", d: "Within 24 hours on working days." },
];

// Animated "sent" state for the contact form: a paper plane flies its trail, a tick draws in, then the next steps appear
export function EnquirySent({ name, onReset }: { name: string; onReset: () => void }) {
  const reduce = useReducedMotion();
  const first = name.trim().split(/\s+/)[0];
  // timings (seconds)
  const flyFor = reduce ? 0 : 1.6;
  const tickAt = reduce ? 0 : flyFor + 0.1;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-white p-7 shadow-[0_30px_80px_-40px_rgba(15,29,51,0.35)] sm:p-10" role="status">
      {/* soft colour wash */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cobalt/10 blur-3xl" />

      {/* flight stage */}
      <div aria-hidden className="relative mx-auto h-[150px] w-full max-w-[400px]">
        <svg viewBox="0 0 400 150" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={flight}
            fill="none"
            stroke="#2747d6"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="2 7"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: flyFor, ease: "easeInOut" }}
          />
        </svg>

        {/* paper plane following the trail */}
        {!reduce && (
          <motion.div
            className="absolute left-0 top-0 text-cobalt"
            style={{ offsetPath: `path("${flight}")`, offsetRotate: "auto" }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
            animate={{ offsetDistance: "100%", opacity: [1, 1, 0], scale: [1, 1, 0.4] }}
            transition={{ duration: flyFor, ease: "easeInOut", times: [0, 0.85, 1] }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" className="-translate-x-1/2 -translate-y-1/2" fill="currentColor">
              <path d="M2.5 11.2 21 3.5l-5.8 17.3-4.1-6.9-8.6-2.7z" opacity="0.9" />
              <path d="m11.1 13.9 9.9-10.4-6.3 11.2z" fill="#1ec0f2" />
            </svg>
          </motion.div>
        )}

        {/* tick: lands where the plane arrives */}
        <div className="absolute left-[90%] top-[46.6%] -translate-x-1/2 -translate-y-1/2">
          {/* ripples */}
          {!reduce &&
            [0, 0.35].map((d) => (
              <motion.span
                key={d}
                className="absolute inset-0 rounded-full border-2 border-emerald-400"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, delay: tickAt + d, ease: "easeOut" }}
              />
            ))}
          {/* sparkles */}
          {!reduce &&
            Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-saffron" : "bg-sky"}`}
                  initial={{ x: "-50%", y: "-50%", opacity: 0 }}
                  animate={{ x: `calc(-50% + ${Math.cos(a) * 46}px)`, y: `calc(-50% + ${Math.sin(a) * 46}px)`, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, delay: tickAt + 0.1, ease: "easeOut" }}
                />
              );
            })}
          <motion.span
            className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
            initial={reduce ? false : { scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: tickAt }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M5 12.5 10 17.5 19 7"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: tickAt + 0.25, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
        </div>
      </div>

      {/* message */}
      <motion.div
        className="relative mt-4 text-center"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: tickAt + 0.4 }}
      >
        <h3 className="text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-tight text-ink">
          Enquiry sent{first ? `, thank you ${first}` : ""}!
        </h3>
        <p className="mx-auto mt-2 max-w-[46ch] text-[15.5px] leading-relaxed text-slate">
          Your message is on its way to our team. Urgent? Call{" "}
          <a href={`tel:${company.phones[0].tel}`} className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:text-cobalt">
            {company.phones[0].number}
          </a>
          .
        </p>
      </motion.div>

      {/* what happens next */}
      <ol className="relative mx-auto mt-8 grid max-w-[560px] gap-3 sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            className="relative rounded-2xl border border-line bg-[#f7f9ff] p-4 text-left"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: tickAt + 0.7 + i * 0.18 }}
          >
            <span className={`grid h-7 w-7 place-items-center rounded-full text-[12px] font-semibold ${i === 0 ? "bg-emerald-500 text-white" : "bg-white text-cobalt ring-1 ring-cobalt/20"}`}>
              {i === 0 ? (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className="mt-3 block text-[14px] font-semibold text-ink">{s.t}</span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-slate">{s.d}</span>
          </motion.li>
        ))}
      </ol>

      <motion.div
        className="relative mt-7 text-center"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: tickAt + 1.4 }}
      >
        <button
          type="button"
          onClick={onReset}
          className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink"
        >
          Send another enquiry
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </motion.div>
    </div>
  );
}
