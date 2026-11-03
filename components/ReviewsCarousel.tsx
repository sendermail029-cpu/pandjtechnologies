"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";

const STEP = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

export type ShownReview = { id: string; quote: string; name: string; role: string; company: string; service: string; rating: number; country?: string };

const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// a colour per reviewer, so each card and avatar is easy to tell apart
const tones = [
  { ring: "from-sky to-cobalt", glow: "rgba(30,192,242,0.45)" },
  { ring: "from-[#a78bfa] to-[#6d28d9]", glow: "rgba(167,139,250,0.45)" },
  { ring: "from-[#34d399] to-[#047857]", glow: "rgba(52,211,153,0.4)" },
  { ring: "from-[#fbbf24] to-[#c2620a]", glow: "rgba(240,162,59,0.45)" },
  { ring: "from-[#f472b6] to-[#be185d]", glow: "rgba(244,114,182,0.4)" },
];

const Stars = ({ n }: { n: number }) => (
  <span className="flex gap-0.5 text-saffron" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, k) => (
      <svg key={k} width="15" height="15" viewBox="0 0 24 24" fill={k < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
      </svg>
    ))}
  </span>
);

// Real client reviews as a deck of cards: the top card can be swiped (or use the arrows / pick a reviewer below),
// the next ones peek out behind it, and the deck advances on its own until someone interacts
export function ReviewsCarousel({ reviews }: { reviews: ShownReview[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = reviews.length;
  const go = (d: number) => {
    setDir(d);
    setI((x) => (x + d + n) % n);
  };
  const jump = (k: number) => {
    setDir(k > i ? 1 : -1);
    setI(k);
  };

  // keeps going round: after the last review it starts again from the first
  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const t = setTimeout(() => go(1), STEP);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, reduce, n]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 80 || info.velocity.x > 400) go(-1);
  };

  const r = reviews[i];
  // one row of reviewer chips: the first few, keeping the active one in view, then "+N more"
  const VISIBLE = 3;
  const shown = n <= VISIBLE ? reviews.map((_, k) => k) : i < VISIBLE ? [0, 1, 2] : [0, 1, i];
  // phones show just the active chip plus "+N more"; wider screens show the row of three
  const tone = tones[i % tones.length];

  return (
    <div className="min-w-0" onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}>
      {/* the deck */}
      <div className="relative h-[420px] sm:h-[350px]" style={{ perspective: 1200 }}>
        {/* cards waiting behind */}
        {[2, 1].map((depth) =>
          n > depth ? (
            <div
              key={depth}
              aria-hidden
              className="absolute inset-x-0 top-0 h-full rounded-[26px] border border-white/10 bg-[#0d1830]"
              style={{ transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`, opacity: 1 - depth * 0.3 }}
            />
          ) : null,
        )}

        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={r.id}
            custom={dir}
            drag={n > 1 && !reduce ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: dir * -260, rotate: dir * -8, transition: { duration: 0.35 } }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-x-0 top-0 flex h-full cursor-grab flex-col overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-br from-[#13234a] to-[#0a1226] p-6 sm:p-8"
            style={{ boxShadow: `0 30px 70px -30px ${tone.glow}` }}
          >
            {/* big soft quote mark */}
            <span aria-hidden className="pointer-events-none absolute -right-2 -top-10 font-serif text-[180px] leading-none text-white/[0.05]">
              &rdquo;
            </span>
            <div className="relative flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-sky ring-1 ring-white/10">
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${tone.ring}`} />
                {r.service || "Client review"}
              </span>
              <Stars n={r.rating} />
            </div>
            <blockquote className="relative mt-5 flex-1 text-[16.5px] leading-[1.75] text-white/85 sm:text-[17.5px]">{r.quote}</blockquote>
            <figcaption className="relative mt-5 flex items-center gap-3.5 border-t border-white/10 pt-5">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[14px] font-semibold text-white ${tone.ring}`}>
                {initials(r.name)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-white">{r.name}</span>
                <span className="block truncate text-[13px] text-white/55">
                  {r.role ? `${r.role}, ` : ""}
                  {r.company}
                  {r.country ? ` · ${r.country}` : ""}
                </span>
              </span>
              <span className="hidden items-center gap-1.5 text-[12px] text-emerald-400 sm:flex">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12.5l2.5 2.5 5-5" />
                </svg>
                Verified client
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {n > 1 && (
        <>
          {/* reviewers: pick one to bring their card to the front */}
          <div className="mt-9 flex min-w-0 items-center gap-2 overflow-hidden" role="tablist" aria-label="Reviews">
            {shown.map((k) => {
              const x = reviews[k];
              const on = k === i;
              const t = tones[k % tones.length];
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => jump(k)}
                  className={`min-w-0 shrink items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-left transition duration-300 ${
                    on ? "flex border-white/30 bg-white/10" : "hidden border-white/10 hover:border-white/25 hover:bg-white/[0.05] sm:flex"
                  }`}
                >
                  <span className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white ${t.ring} ${on ? "" : "opacity-70"}`}>
                    {initials(x.name)}
                  </span>
                  <span className={`truncate whitespace-nowrap text-[13px] ${on ? "text-white" : "text-white/55"}`}>{x.company}</span>
                </button>
              );
            })}
            {/* the rest are one tap away: +N more steps to the next review not shown above */}
            {n > 1 && (
              <button
                type="button"
                onClick={() => jump(reviews.findIndex((_, k) => !shown.includes(k) && k > i) >= 0 ? reviews.findIndex((_, k) => !shown.includes(k) && k > i) : reviews.findIndex((_, k) => !shown.includes(k)))}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3.5 py-2 text-[13px] font-medium text-white/70 transition hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
              >
                <span className="sm:hidden">+{n - 1} more</span>
                <span className="hidden sm:inline">+{n - shown.length} more</span>
              </button>
            )}
          </div>

          {/* progress, count and arrows */}
          <div className="mt-5 flex items-center gap-4">
            <span className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                key={`${i}-${paused}`}
                className={`block h-full rounded-full bg-gradient-to-r ${tone.ring}`}
                initial={{ width: paused || reduce ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: paused || reduce ? 0 : STEP / 1000, ease: "linear" }}
              />
            </span>
            <span className="font-mono text-[12.5px] text-white/50">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(d)}
                  aria-label={d < 0 ? "Previous review" : "Next review"}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-sky hover:bg-sky hover:text-[#060d18]"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d={d < 0 ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
                  </svg>
                </button>
              ))}
            </span>
          </div>
          <p className="mt-3 text-[12.5px] text-white/40">Swipe the card or pick a client to read their review.</p>
        </>
      )}
    </div>
  );
}
