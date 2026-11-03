import type { ReactNode } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { company } from "@/lib/site";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export type LegalSection = { title: string; icon: string; body: ReactNode };
export type LegalHighlight = { t: string; d: string; icon: string };

const Icon = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const slug = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Shared layout for the privacy policy and terms: navy hero with the key points, a contents list, and numbered section cards
export function LegalPage({
  eyebrow,
  title,
  accent,
  intro,
  updated,
  highlights,
  sections,
  related,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  updated: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
  related: { href: string; label: string };
}) {
  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 bottom-0 h-[420px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute -right-32 -top-20 h-[380px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-3xl [animation-delay:-9s]" />
        </div>

        <div className="mx-auto grid max-w-[83rem] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              {eyebrow}
            </p>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
              {title} <span className={`${serif.className} tracking-normal text-sky`}>{accent}</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-white/65">
              {intro}
            </p>
            <div data-aos="fade-up" data-aos-delay="200" className="mt-7 flex flex-wrap items-center gap-2.5 text-[13px]">
              <span className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-white/75 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Last updated {updated}
              </span>
              <span className="rounded-full bg-white/[0.06] px-3.5 py-2 text-white/75 ring-1 ring-white/10">
                {sections.length} sections · about 3 min read
              </span>
              <Link
                href={related.href}
                className="group flex items-center gap-1.5 rounded-full px-3.5 py-2 font-semibold text-sky ring-1 ring-sky/30 transition hover:bg-sky hover:text-ink"
              >
                {related.label}
                <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>

          {/* the key points */}
          <div data-aos="fade-left" className="min-w-0 rounded-[26px] bg-white/[0.04] p-5 ring-1 ring-white/10 backdrop-blur sm:p-6">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-white/50">At a glance</p>
            <ul className="mt-4 space-y-3">
              {highlights.map((h) => (
                <li key={h.t} className="flex gap-3.5 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.08]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky to-cobalt text-white shadow-lg shadow-cobalt/30">
                    <Icon d={h.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold">{h.t}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-white/60">{h.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* contents and sections */}
      <section className="bg-[#f5f7fc] px-6 py-14 sm:py-20">
        <div className="mx-auto grid max-w-[83rem] grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-slate">On this page</p>
            {/* phones: a swipeable row; desktop: a numbered list */}
            <ol className="-mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0">
              {sections.map((s, i) => (
                <li key={s.title} className="shrink-0">
                  <a
                    href={`#${slug(s.title)}`}
                    className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition hover:border-cobalt/40 hover:text-cobalt lg:rounded-xl lg:border-transparent lg:bg-transparent lg:px-3 lg:py-2.5 lg:text-[14.5px] lg:hover:bg-white"
                  >
                    <span className="font-mono text-[11.5px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-w-0 space-y-4">
            {sections.map((s, i) => (
              <article
                key={s.title}
                id={slug(s.title)}
                data-aos="fade-up"
                className="scroll-mt-8 rounded-[24px] border border-line bg-white p-6 transition duration-300 hover:border-cobalt/25 hover:shadow-xl hover:shadow-ink/5 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e6edff] text-cobalt">
                    <Icon d={s.icon} />
                  </span>
                  <div className="min-w-0">
                    <span className="block font-mono text-[11.5px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-[20px] font-semibold leading-tight tracking-tight text-ink sm:text-[22px]">{s.title}</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-slate sm:pl-[60px] [&_a]:font-semibold [&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-4 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-1 [&_li]:before:top-[0.6em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-cobalt/60 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:space-y-2">
                  {s.body}
                </div>
              </article>
            ))}

            {/* questions */}
            <div data-aos="fade-up" className="relative isolate overflow-hidden rounded-[24px] bg-[#060d18] p-6 text-white sm:p-8">
              <div aria-hidden className="absolute -right-16 -top-20 -z-10 h-56 w-56 rounded-full bg-cobalt/40 blur-3xl" />
              <p className="text-[22px] font-semibold tracking-tight">Questions about this page?</p>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-white/65">
                We&apos;re happy to explain anything here. Write to us and we&apos;ll reply within one working day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14.5px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe]"
                >
                  {company.email}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold ring-1 ring-white/20 transition hover:bg-white/10"
                >
                  Contact page <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
