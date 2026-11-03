import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { process } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons } from "@/lib/brand-icons";
import { crmLogos } from "@/lib/crm-logos";
import { CrmModuleExplorer } from "./CrmModuleExplorer";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";

const before = [
  "Leads scattered across WhatsApp, notebooks and Excel",
  "Follow-ups forgotten when someone is busy or on leave",
  "No idea which ads or sources actually bring sales",
  "Quotes typed out by hand, again and again",
  "Owners chasing the team for updates",
];
const after = [
  "Every lead from every source in one inbox",
  "Automatic reminders and clear ownership of each deal",
  "Source and conversion reports, live",
  "Branded, GST-ready quotes in a click",
  "One dashboard for the whole team's performance",
];

// integrations around the CRM, with real logos
const meta = brandIcons.find((b) => b.title === "Meta")!;
const gads = brandIcons.find((b) => b.title === "Google Ads")!;
const integrations = [
  { t: "WhatsApp", ...crmLogos.WhatsApp },
  { t: "Meta Lead Ads", color: meta.color, path: meta.path },
  { t: "Google Ads", color: gads.color, path: gads.path },
  { t: "Gmail", ...crmLogos.Gmail },
  { t: "Google Sheets", ...crmLogos["Google Sheets"] },
  { t: "Google Calendar", ...crmLogos["Google Calendar"] },
  { t: "Instagram", ...crmLogos.Instagram },
  { t: "Razorpay", ...crmLogos.Razorpay },
];

const roles = [
  {
    t: "Sales team",
    d: "A clear list of today's leads and follow-ups, with call logs, notes and quotes in one place.",
    points: ["My leads & tasks", "Call & WhatsApp log", "Quick quotations"],
    i: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  },
  {
    t: "Managers",
    d: "Assign leads, track every deal's stage and step in before an opportunity goes cold.",
    points: ["Lead assignment", "Pipeline by person", "Overdue alerts"],
    i: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v6h-4z",
  },
  {
    t: "Owners",
    d: "See sources, conversion and revenue at a glance, without chasing anyone for updates.",
    points: ["Live dashboard", "Source & ROI reports", "Team performance"],
    i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6",
  },
];

// Body of the CRM software page only: before/after, module explorer, integrations, roles, and how we set it up
export function CrmPageBody({ page, slug }: { page: ServicePage; slug: string }) {
  const { included } = page;

  return (
    <>
      {/* before and after */}
      <section className="bg-[#f5f7fc] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Why a CRM
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              From scattered leads to <span className={`${serif.className} tracking-normal text-cobalt`}>one system.</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
            <div data-aos="fade-right" className="rounded-[26px] border border-line bg-white p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[12.5px] font-semibold text-red-600">
                <span aria-hidden>✕</span> Without a CRM
              </p>
              <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                {before.map((x) => (
                  <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-slate sm:text-[15.5px]">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div data-aos="fade-left" className="relative overflow-hidden rounded-[26px] bg-[#060d18] p-6 text-white sm:p-8">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cobalt/40 blur-3xl" />
              <p className="relative inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-[12.5px] font-semibold text-emerald-300">
                <span aria-hidden>✓</span> With a P &amp; J CRM
              </p>
              <ul className="relative mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                {after.map((x) => (
                  <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-white/85 sm:text-[15.5px]">
                    <svg className="mt-1 shrink-0 text-emerald-400" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* module explorer */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-20 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-sky`}>
                <span aria-hidden className="h-px w-8 bg-sky/50" />
                Inside your CRM
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em]">
                Everything your sales team <span className={`${serif.className} tracking-normal text-sky`}>needs.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-white/60">
              Pick a module to see how it works. Every CRM we build is shaped around how your team already sells.
            </p>
          </div>
          <CrmModuleExplorer />
        </div>
      </section>

      {/* integrations */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f5f0ff] to-[#e8f7ff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Integrations
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              Connected to the tools <span className={`${serif.className} tracking-normal text-cobalt`}>you already use.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-slate">
              Leads flow in from your ads, website and WhatsApp on their own, and quotes, payments and reminders flow back out.
              No copying and pasting between apps.
            </p>
            <Link
              data-aos="fade-up"
              href={`/contact?service=${slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cobalt"
            >
              Get a proposal <span aria-hidden>→</span>
            </Link>
          </div>

          {/* the CRM at the centre, integrations around it */}
          <div aria-hidden className="relative mx-auto aspect-square w-[88%] max-w-[460px] sm:w-full">
            <div className="absolute inset-[22%] rounded-full bg-cobalt/20 blur-3xl" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-cobalt/25" />
            <div className="absolute inset-[30%] rounded-full border border-cobalt/15" />
            <div className="absolute left-1/2 top-1/2 grid h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[22px] sm:rounded-[28px] bg-[#060d18] text-white shadow-[0_24px_50px_-16px_rgba(39,71,214,0.6)]">
              <span className="text-center">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-sky">Your</span>
                <span className="block text-[22px] font-semibold tracking-tight">CRM</span>
              </span>
            </div>
            {integrations.map((x, k) => {
              const a = (k / integrations.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <span
                  key={x.t}
                  title={x.t}
                  className="float-icon absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white shadow-[0_12px_28px_-12px_rgba(15,29,51,0.35)] ring-1 ring-line sm:h-16 sm:w-16"
                  style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 38}%`, animationDelay: `${k * -0.5}s` }}
                >
                  <svg viewBox="0 0 24 24" fill={x.color} className="h-6 w-6 sm:h-7 sm:w-7">
                    <path d={x.path} />
                  </svg>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* roles */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Built for every role
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              The right view for <span className={`${serif.className} tracking-normal text-cobalt`}>everyone.</span>
            </h2>
          </div>
          {/* phones: a swipeable row, the next card peeking in */}
          <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mt-12 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {roles.map((r, i) => (
              <li
                key={r.t}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`flex w-[84%] shrink-0 snap-center flex-col rounded-[26px] p-6 transition sm:w-[60%] sm:p-7 md:w-auto duration-300 hover:-translate-y-1 ${
                  i === 1 ? "bg-cobalt text-white shadow-xl shadow-cobalt/30" : "border border-line bg-[#f7f9ff] hover:shadow-xl hover:shadow-ink/5"
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 1 ? "bg-white/15 text-white" : "bg-[#e6edff] text-cobalt"}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={r.i} />
                  </svg>
                </span>
                <h3 className={`mt-5 text-[21px] font-semibold tracking-tight ${i === 1 ? "text-white" : "text-ink"}`}>{r.t}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${i === 1 ? "text-white/80" : "text-slate"}`}>{r.d}</p>
                <ul className={`mt-6 space-y-2 border-t pt-5 text-[14.5px] ${i === 1 ? "border-white/20" : "border-line"}`}>
                  {r.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <svg className={i === 1 ? "text-white" : "text-emerald-500"} width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                      </svg>
                      <span className={i === 1 ? "text-white" : "text-ink-2"}>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* how we set it up */}
      <section id="included" className="scroll-mt-8 border-t border-line bg-[#f5f7fc] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              How we set it up
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              {included.plain} <span className={`${serif.className} tracking-normal text-cobalt`}>{included.accent}</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[44ch] text-[16.5px] leading-relaxed text-slate">
              {included.intro}
            </p>
            <p data-aos="fade-up" data-aos-delay="200" className="mt-6 text-[14.5px] text-slate">
              Usually live in {process.length} stages, from discovery to support.
            </p>
          </div>

          {/* vertical timeline */}
          <ol className="relative ml-4 border-l-2 border-cobalt/20 pl-7 sm:ml-0 sm:pl-8">
            {included.items.map((b, i) => (
              <li key={b.t} data-aos="fade-up" data-aos-delay={i * 60} className="relative pb-6 last:pb-0 sm:pb-9">
                <span className="absolute -left-[41px] grid h-8 w-8 sm:-left-[45px] place-items-center rounded-full bg-cobalt font-mono text-[12px] font-semibold text-white ring-4 ring-[#f5f7fc]">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5">
                  <h3 className="text-[17.5px] font-semibold tracking-tight text-ink">{b.t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{b.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* call to action */}
      <section className="bg-[#f5f7fc] px-6 pb-20">
        <div data-aos="fade-up" className="relative isolate mx-auto flex max-w-[83rem] flex-col gap-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1a2f8f] via-cobalt to-[#1e7fd6] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div aria-hidden className="absolute -right-10 -top-16 -z-10 h-64 w-64 rounded-full bg-sky/30 blur-3xl" />
          <div>
            <p className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight">Ready to stop losing leads?</p>
            <p className="mt-2 max-w-[54ch] text-[15.5px] text-white/80">
              No per-seat licence fees. A CRM you own, built around your team, with a written scope and fixed price before we start.
            </p>
          </div>
          <Link
            href={`/contact?service=${slug}`}
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] lg:self-center"
          >
            Get a proposal <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
