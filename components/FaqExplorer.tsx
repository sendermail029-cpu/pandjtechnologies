"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { HelpBanner } from "./HelpBanner";
import { accents, CardRow, CardStack, reveal, RibbonBackdrop, type HeroCard } from "./HeroKit";
import type { FaqCategory, FaqItem } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// wraps every match of the query in a highlight
function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${escapeRe(q)})`, "ig"));
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded bg-saffron/35 px-0.5 text-ink">
        {p}
      </mark>
    ) : (
      p
    ),
  );
}

function Question({ item, q, forceOpen, index, phoneHidden = false }: { item: FaqItem; q: string; forceOpen: boolean; index: number; phoneHidden?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  const shown = forceOpen || open;
  return (
    <motion.li
      {...reveal(reduce, Math.min(index, 6) * 0.06)}
      className={`rounded-2xl border bg-white transition-colors ${phoneHidden ? "hidden sm:block" : ""} ${shown ? "border-cobalt/30 shadow-lg shadow-ink/5" : "border-line hover:border-ink/25"}`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={shown}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15.5px] font-semibold tracking-tight sm:gap-6 sm:px-7 sm:py-5 sm:text-[17px]"
        >
          <span>{highlight(item.q, q)}</span>
          <span
            aria-hidden
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${shown ? "rotate-45 bg-cobalt text-white" : "bg-[#e6edff] text-cobalt"}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {shown && (
          <motion.div
            id={id}
            role="region"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-[70ch] px-5 pb-5 text-[15px] leading-relaxed text-slate sm:px-7 sm:pb-6 sm:text-[16px]">{highlight(item.a, q)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}


// a very light pastel wash behind each topic (fades out at the edges, no box), with a matching number badge
const pastels = [
  { panel: "bg-[radial-gradient(ellipse_55%_45%_at_25%_22%,#e6edff,transparent_75%)]", badge: "bg-white text-cobalt shadow-sm" },
  { panel: "bg-[radial-gradient(ellipse_55%_45%_at_25%_22%,#fff0dd,transparent_75%)]", badge: "bg-white text-[#c2620a] shadow-sm" },
  { panel: "bg-[radial-gradient(ellipse_55%_45%_at_25%_22%,#efe7ff,transparent_75%)]", badge: "bg-white text-[#7c3aed] shadow-sm" },
  { panel: "bg-[radial-gradient(ellipse_55%_45%_at_25%_22%,#e1f7ee,transparent_75%)]", badge: "bg-white text-[#059669] shadow-sm" },
  { panel: "bg-[radial-gradient(ellipse_55%_45%_at_25%_22%,#dff3fc,transparent_75%)]", badge: "bg-white text-[#0284c7] shadow-sm" },
]

// Hero cards: three real questions; each links to its topic
const featured = [
  { topic: "general", index: 0 },
  { topic: "test-center", index: 1 },
  { topic: "pricing", index: 0 },
];

const getFeatured = (categories: FaqCategory[]): HeroCard[] =>
  featured
    .map((f) => {
      const c = categories.find((x) => x.id === f.topic);
      const item = c?.items[f.index];
      return c && item ? { key: c.id, href: `#${c.id}`, tag: c.title, title: item.q, text: item.a } : null;
    })
    .filter((x): x is HeroCard => !!x);

export function FaqExplorer({ categories }: { categories: FaqCategory[] }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const q = query.trim();
  const [active, setActive] = useState(categories[0]?.id);
  // phones: topics whose full list has been opened
  const [expanded, setExpanded] = useState<string[]>([]);

  const visible = useMemo(() => {
    if (!q) return categories;
    const needle = q.toLowerCase();
    return categories
      .map((c) => ({ ...c, items: c.items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(needle)) }))
      .filter((c) => c.items.length > 0);
  }, [categories, q]);
  const matches = visible.reduce((n, c) => n + c.items.length, 0);

  // highlight the category being read (falling back to the first one a search leaves visible)
  useEffect(() => {
    const sections = visible.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    // the current topic is the last one whose heading has passed the line just below the header
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top <= 100) current = s.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [visible]);

  return (
    <>
      {/* hero: deep navy like the other pages, with the ribbon glowing in cobalt behind */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 pb-10 pt-10 sm:pb-14 sm:pt-16">
        <RibbonBackdrop dark />

        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
          {/* min-w-0 lets the swipeable card row scroll instead of stretching the column on phones */}
          <div className="min-w-0 max-w-3xl">
            <p data-aos="fade-up" className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur sm:text-[12px] sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cobalt to-[#8b5cf6]" aria-hidden />
              Help centre
            </p>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.3rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Questions,{" "}
              <span className="bg-gradient-to-r from-sky via-[#a78bfa] to-[#5eead4] bg-clip-text text-transparent">answered.</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/65">
              Services, pricing, support, ownership and the test center. Search below or browse by topic.
            </p>

            <div data-aos="fade-up" data-aos-delay="300" className="relative mt-7">
              <label htmlFor="faq-search" className="sr-only">
                Search the FAQs
              </label>
              <svg className="pointer-events-none absolute left-6 top-1/2 z-10 -translate-y-1/2 text-white/75" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim()) document.getElementById("faq-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                placeholder="Search questions…"
                autoComplete="off"
                className="h-14 w-full rounded-full border border-transparent border-white/15 bg-white/[0.08] pl-16 pr-6 text-[16px] text-white shadow-xl shadow-black/30 backdrop-blur outline-none transition placeholder:text-white/65 focus:border-sky/60 focus:ring-4 focus:ring-sky/25"
              />
            </div>

            <ul data-aos="fade-up" data-aos-delay="400" className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {categories.slice(0, 4).map((c, i) => (
                <li key={c.id} className="shrink-0">
                  <a href={`#${c.id}`} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[13.5px] text-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/35 hover:text-white">
                    <span aria-hidden className={`h-2 w-2 rounded-full ${accents[i % accents.length].dot}`} />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>

            <CardRow cards={getFeatured(categories)} />
          </div>

          <CardStack cards={getFeatured(categories)} />
        </div>
      </section>

      {/* questions */}
      <section id="faq-list" className="scroll-mt-20 bg-paper px-6 pb-24 pt-14">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            {/* phones and tablets: swipeable chips */}
            <nav aria-label="FAQ topics" className="sticky top-0 z-10 -mx-6 bg-paper/95 px-6 py-3 backdrop-blur lg:static lg:m-0 lg:bg-transparent lg:p-0">
              <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:block lg:space-y-1 lg:overflow-visible">
                {visible.map((c) => (
                  <li key={c.id} className="relative shrink-0">
                    {active === c.id && (
                      <motion.span layoutId="faq-active" transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full bg-ink lg:rounded-xl" />
                    )}
                    <a
                      href={`#${c.id}`}
                      aria-current={active === c.id ? "true" : undefined}
                      className={`relative flex items-center justify-between gap-3 rounded-full px-4 py-2 text-[14px] font-medium transition-colors lg:rounded-xl lg:py-2.5 lg:text-[15px] ${
                        active === c.id ? "text-white" : "text-ink-2 hover:bg-white"
                      }`}
                    >
                      <span className="whitespace-nowrap">{c.title}</span>
                      <span className={`hidden text-[12.5px] tabular-nums lg:inline ${active === c.id ? "text-white/60" : "text-slate/70"}`}>{c.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div>
            <AnimatePresence initial={false}>
              {q && (
                <motion.p
                  key="summary"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="mb-8 flex flex-wrap items-center gap-3 text-[15px] text-slate"
                >
                  <span>
                    <strong className="text-ink">{matches}</strong> {matches === 1 ? "answer" : "answers"} for “{q}”
                  </span>
                  <button type="button" onClick={() => setQuery("")} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] font-semibold text-ink hover:border-ink">
                    Clear search
                  </button>
                </motion.p>
              )}
            </AnimatePresence>

            {visible.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-white p-10 text-center">
                <p className="text-[19px] font-semibold">No answers match “{q}”</p>
                <p className="mx-auto mt-2 max-w-[44ch] text-[15.5px] text-slate">Try a different word, or ask us directly — we&apos;ll reply within one working day.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {visible.map((c, i) => (
                  <section
                    key={c.id}
                    id={c.id}
                    aria-labelledby={`${c.id}-title`}
                    className={`relative -mx-4 scroll-mt-20 px-4 py-4 sm:-mx-8 sm:py-6 sm:px-8 lg:scroll-mt-8 ${pastels[i % pastels.length].panel}`}
                  >
                    <motion.div {...reveal(reduce)} className="flex items-baseline gap-3.5">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center self-center rounded-xl font-mono text-[13px] font-semibold ${pastels[i % pastels.length].badge}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 id={`${c.id}-title`} className="text-[22px] font-semibold tracking-tight sm:text-[26px]">
                        {c.title}
                      </h2>
                      <span className="text-[14px] text-slate">{c.items.length}</span>
                    </motion.div>
                    <ul className="mt-5 space-y-3">
                      {c.items.map((f, j) => (
                        <Question key={f.q} item={f} q={q} forceOpen={q.length >= 3} index={j} phoneHidden={!q && j >= 3 && !expanded.includes(c.id)} />
                      ))}
                    </ul>
                    {!q && c.items.length > 3 && !expanded.includes(c.id) && (
                      <button
                        type="button"
                        onClick={() => setExpanded((e) => [...e, c.id])}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-semibold text-cobalt shadow-sm sm:hidden"
                      >
                        Show {c.items.length - 3} more <span aria-hidden>↓</span>
                      </button>
                    )}
                  </section>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      <HelpBanner />
    </>
  );
}
