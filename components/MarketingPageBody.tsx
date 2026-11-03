import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons, moreToolIcons } from "@/lib/brand-icons";
import { crmLogos } from "@/lib/crm-logos";
import { AdStudio } from "./AdStudio";
import { AiCallDemo, WhatsAppDemo } from "./ChatCallDemos";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";
const h2 = "mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em]";

const Icon = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

// WhatsApp automation
const waFeatures = [
  { t: "Instant replies, any hour", d: "Every new enquiry gets an answer the moment it arrives.", i: "M13 2 4 14h7l-1 8 9-12h-7z" },
  { t: "Menus and quick buttons", d: "Customers tap to pick a service, see prices or book.", i: "M4 6h16M4 12h16M4 18h10" },
  { t: "Bookings and reminders", d: "Appointments, order updates and payment reminders, sent automatically.", i: "M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
  { t: "Broadcasts that get read", d: "Offers and updates sent to customers who have opted in.", i: "M3 10v4h3l7 4V6L6 10H3zM17 9a4 4 0 0 1 0 6" },
  { t: "Every chat in your CRM", d: "Each conversation saved with the ad it came from.", i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6" },
  { t: "Your team steps in anytime", d: "Hand the chat to a person whenever it is needed.", i: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" },
];

// AI calling agents
const callFeatures = [
  { t: "Calls new leads in minutes", d: "Before they go cold or call someone else.", i: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" },
  { t: "Answers incoming calls 24×7", d: "No more missed calls after hours or on holidays.", i: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" },
  { t: "Books visits and appointments", d: "Straight into your calendar, with a WhatsApp confirmation.", i: "M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 15l2 2 4-4" },
  { t: "Follow-up and reminder calls", d: "Leads who asked to be called later get called later.", i: "M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" },
  { t: "Every call summarised", d: "Recording, transcript and summary saved to your CRM.", i: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5" },
  { t: "Warm leads to your team", d: "Ready-to-buy customers handed over to a person.", i: "M5 12h14M13 6l6 6-6 6" },
];

// the funnel, from first view to paying customer
const funnel = [
  { t: "Reach", d: "People who see your ad", we: "The right audience, location and budget", w: "100%", c: "from-[#db2777] to-[#f472b6]" },
  { t: "Clicks", d: "People who tap to learn more", we: "Scroll-stopping creatives and copy", w: "90%", c: "from-[#ea580c] to-[#fbbf24]" },
  { t: "Landing page", d: "Where interest becomes intent", we: "Fast pages built to convert", w: "80%", c: "from-[#7c3aed] to-[#a78bfa]" },
  { t: "Enquiries", d: "Calls, forms and WhatsApp messages", we: "Every lead tracked back to its ad", w: "70%", c: "from-[#2747d6] to-[#60a5fa]" },
  { t: "Customers", d: "Enquiries that turn into sales", we: "Leads sent to your CRM for quick follow-up", w: "60%", c: "from-[#059669] to-[#34d399]" },
];

// tools we use, as real logos
const pick = (t: string) => [...brandIcons, ...moreToolIcons].find((b) => b.title === t)!;
const tools = [
  { t: "Meta", ...pick("Meta") },
  { t: "Google Ads", ...pick("Google Ads") },
  { t: "Google Analytics", ...pick("Google Analytics") },
  { t: "Search Console", ...pick("Search Console (SEO)") },
  { t: "WhatsApp", ...crmLogos.WhatsApp },
  { t: "Instagram", ...crmLogos.Instagram },
  { t: "Canva", ...pick("Canva") },
  { t: "Photoshop", ...pick("Photoshop") },
  { t: "Premiere Pro", ...pick("Premiere Pro") },
];

const reportItems = [
  "How many leads came in, and from where",
  "Cost per lead for each campaign",
  "The ads that worked best, and why",
  "What we'll change next month",
];

// Body of the Digital marketing page only: ad studio, funnel, creatives, report, process
export function MarketingPageBody({ page, slug }: { page: ServicePage; slug: string }) {
  const { build, included } = page;

  return (
    <>
      {/* ad studio: carries on from the navy hero with no seam */}
      <section className="relative isolate -mt-px overflow-hidden bg-[#060d18] px-6 pb-16 pt-6 text-white sm:pb-24 sm:pt-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-[#db2777]/15 blur-3xl" />
          <div className="footer-glow absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-cobalt/25 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-sky`}>
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              {build.label}
              <span aria-hidden className="h-px w-8 bg-sky/50" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={h2}>
              {build.plain} <span className={`${serif.className} tracking-normal text-sky`}>{build.accent}</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/60">
              Pick a platform to see an example ad, and what we take care of there.
            </p>
          </div>
          <AdStudio />
        </div>
      </section>

      {/* WhatsApp automation */}
      <section id="whatsapp" className="scroll-mt-8 bg-gradient-to-br from-[#e9fbf0] via-[#f2fcf6] to-[#eaf6ff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-[#128c4a]`}>
              <span aria-hidden className="h-px w-8 bg-[#25D366]/50" />
              WhatsApp automation
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              WhatsApp that <span className={`${serif.className} tracking-normal text-[#128c4a]`}>replies for you.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-slate">
              Most customers would rather message than call. We set up WhatsApp so every enquiry gets an instant answer, day or
              night, and your team only steps in when it matters.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3">
              {waFeatures.map((x, k) => (
                <li key={x.t} data-aos="fade-up" data-aos-delay={k * 50} className="flex flex-col gap-2.5 rounded-2xl border border-[#c9f0d9] bg-white/85 p-3.5 transition sm:flex-row sm:gap-3.5 sm:p-4 duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/10">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128c4a] text-white shadow-md">
                    <Icon d={x.i} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold leading-snug tracking-tight text-ink sm:text-[15.5px]">{x.t}</span>
                    <span className="mt-0.5 hidden text-[13.5px] leading-relaxed text-slate sm:block">{x.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div data-aos="zoom-in">
            <WhatsAppDemo />
            <p className="mt-4 text-center text-[12px] text-slate">Example chat for illustration</p>
          </div>
        </div>
      </section>

      {/* AI calling agents */}
      <section id="ai-calling" className="relative isolate scroll-mt-8 overflow-hidden bg-[#0b0a24] px-6 py-16 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-[#7c3aed]/30 blur-3xl" />
          <div className="footer-glow absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cobalt/25 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-aos="zoom-in" className="order-2 lg:order-1">
            <AiCallDemo />
            <p className="mt-4 text-center text-[12px] text-white/40">Example call for illustration</p>
          </div>
          <div className="order-1 lg:order-2">
            <p data-aos="fade-up" className={`${label} text-[#c4b5fd]`}>
              <span aria-hidden className="h-px w-8 bg-[#a78bfa]/50" />
              AI calling agents
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={h2}>
              AI agents that <span className={`${serif.className} tracking-normal text-[#c4b5fd]`}>call every lead.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-white/65">
              The faster you call a new lead, the more likely they buy. An AI calling agent rings each enquiry within minutes,
              answers questions, books the visit and hands warm leads to your team.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3">
              {callFeatures.map((x, k) => (
                <li key={x.t} data-aos="fade-up" data-aos-delay={k * 50} className="flex flex-col gap-2.5 rounded-2xl bg-white/[0.05] p-3.5 ring-1 sm:flex-row sm:gap-3.5 sm:p-4 ring-white/10 transition duration-300 hover:bg-white/[0.08]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-cobalt text-white shadow-md">
                    <Icon d={x.i} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold leading-snug tracking-tight sm:text-[15.5px]">{x.t}</span>
                    <span className="mt-0.5 hidden text-[13.5px] leading-relaxed text-white/60 sm:block">{x.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* the funnel */}
      <section className="bg-gradient-to-br from-[#fff1f6] via-[#f7f0ff] to-[#eef4ff] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-[#db2777]`}>
              <span aria-hidden className="h-px w-8 bg-[#db2777]/40" />
              How ads turn into sales
              <span aria-hidden className="h-px w-8 bg-[#db2777]/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              From scroll <span className={`${serif.className} tracking-normal text-[#db2777]`}>to sale.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
              {build.intro}
            </p>
          </div>

          <ol className="mx-auto mt-12 max-w-5xl space-y-3">
            {funnel.map((f, k) => (
              <li key={f.t} data-aos="fade-up" data-aos-delay={k * 80} className="grid items-center gap-x-8 gap-y-2 lg:grid-cols-[1.1fr_1fr]">
                <div className="flex justify-center">
                  <div
                    className={`group relative flex h-16 items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r ${f.c} px-5 text-white shadow-[0_16px_30px_-16px_rgba(124,58,237,0.6)] transition duration-300 hover:scale-[1.02] sm:h-[72px] sm:px-6`}
                    style={{ width: f.w }}
                  >
                    <span aria-hidden className="absolute -right-6 -top-10 h-24 w-24 rounded-full bg-white/15" />
                    <span className="relative shrink-0">
                      <span className="block font-mono text-[10.5px] text-white/75">0{k + 1}</span>
                      <span className="block whitespace-nowrap text-[16px] font-semibold sm:text-[18px]">{f.t}</span>
                    </span>
                    {k < 3 && <span className="relative hidden truncate text-[12.5px] text-white/85 sm:block">{f.d}</span>}
                  </div>
                </div>
                <p className="flex items-center justify-center gap-2 text-center text-[14.5px] text-ink-2 lg:justify-start lg:text-left">
                  <svg className="hidden shrink-0 text-emerald-500 lg:block" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                  <span>
                    <span className="font-semibold text-ink">We handle: </span>
                    {f.we}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* creatives */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-[#7c3aed]`}>
                <span aria-hidden className="h-px w-8 bg-[#7c3aed]/40" />
                Creatives
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
                Creatives that <span className={`${serif.className} tracking-normal text-[#7c3aed]`}>stop the scroll.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              Designs, videos and copy made for each platform, then tested so your budget goes to what works.
            </p>
          </div>

          <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:mt-12 sm:auto-rows-[170px] sm:gap-4 lg:grid-cols-4">
            {/* reels */}
            <div data-aos="fade-up" className="group relative row-span-2 overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fde2ef] to-[#f3e8ff] p-4 sm:p-5">
              <p className="relative z-10 text-[15px] font-semibold text-ink">Reels & short videos</p>
              <div className="absolute bottom-0 left-1/2 h-[78%] w-[62%] -translate-x-1/2 overflow-hidden rounded-t-[22px] bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#f59e0b] shadow-xl transition duration-500 group-hover:-translate-y-2">
                <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0f1d33" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="absolute bottom-4 left-3 right-8 space-y-1.5">
                  <span className="block h-1.5 w-[70%] rounded-full bg-white/80" />
                  <span className="block h-1.5 w-[45%] rounded-full bg-white/50" />
                </span>
                <span className="absolute bottom-4 right-2.5 space-y-2">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className="block h-3.5 w-3.5 rounded-full bg-white/70" />
                  ))}
                </span>
              </div>
            </div>
            {/* carousel */}
            <div data-aos="fade-up" data-aos-delay="80" className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#fff1e6] to-[#ffe4cc] p-4 sm:p-5">
              <p className="text-[15px] font-semibold text-ink">Carousels</p>
              <div className="absolute -bottom-3 left-4 flex gap-2 transition duration-500 group-hover:-translate-x-4">
                {["from-[#f97316] to-[#fbbf24]", "from-[#db2777] to-[#f97316]", "from-[#7c3aed] to-[#db2777]"].map((c) => (
                  <span key={c} className={`h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br ${c} shadow-md sm:h-24 sm:w-24`} />
                ))}
              </div>
            </div>
            {/* stories */}
            <div data-aos="fade-up" data-aos-delay="160" className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] p-4 sm:p-5">
              <p className="text-[15px] font-semibold text-ink">Stories</p>
              <div className="absolute -bottom-4 right-4 h-[68%] w-16 overflow-hidden rounded-xl bg-gradient-to-b from-[#2747d6] to-[#38bdf8] shadow-md transition duration-500 group-hover:-translate-y-2 sm:w-20">
                <span className="flex gap-0.5 p-1.5">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className={`h-0.5 flex-1 rounded-full ${k === 0 ? "bg-white" : "bg-white/40"}`} />
                  ))}
                </span>
              </div>
            </div>
            {/* posts */}
            <div data-aos="fade-up" className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#dcfce7] to-[#d1fae5] p-4 sm:p-5">
              <p className="text-[15px] font-semibold text-ink">Posts & offers</p>
              <span className="absolute -bottom-3 right-4 grid h-20 w-20 rotate-6 place-items-center rounded-xl bg-white text-center shadow-md transition duration-500 group-hover:rotate-0 sm:h-24 sm:w-24">
                <span>
                  <span className="block text-[18px] font-bold text-emerald-600 sm:text-[22px]">Offer</span>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-slate">this week</span>
                </span>
              </span>
            </div>
            {/* search copy */}
            <div data-aos="fade-up" data-aos-delay="80" className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] p-4 sm:p-5">
              <p className="text-[15px] font-semibold text-ink">Search ad copy</p>
              <div className="mt-3 space-y-1.5 rounded-xl bg-white p-3 shadow-sm">
                <span className="block h-1.5 w-12 rounded-full bg-line" />
                <span className="block h-2 w-[85%] rounded-full bg-[#1a0dab]/60" />
                <span className="block h-1.5 w-[95%] rounded-full bg-line" />
              </div>
            </div>
            {/* landing pages */}
            <div data-aos="fade-up" data-aos-delay="160" className="group relative col-span-2 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#f3e8ff] to-[#fce7f3] p-4 sm:p-5 lg:col-span-2">
              <p className="text-[15px] font-semibold text-ink">Landing pages</p>
              <div className="absolute -bottom-6 left-1/2 w-[78%] -translate-x-1/2 overflow-hidden rounded-t-xl bg-white shadow-lg transition duration-500 group-hover:-translate-y-2">
                <span className="flex gap-1 border-b border-line px-3 py-2">
                  {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
                    <span key={c} className={`h-1.5 w-1.5 rounded-full ${c}`} />
                  ))}
                </span>
                <span className="flex items-center gap-4 p-3">
                  <span className="flex-1 space-y-1.5">
                    <span className="block h-2.5 w-[80%] rounded-full bg-ink/80" />
                    <span className="block h-1.5 w-[60%] rounded-full bg-line" />
                    <span className="mt-2 block h-5 w-20 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#db2777]" />
                  </span>
                  <span className="h-16 w-24 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#f472b6]" />
                </span>
              </div>
            </div>
          </div>

          {/* tools */}
          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
            {tools.map((x) => (
              <li key={x.t} className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-ink-2 shadow-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f5f7fc]">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill={x.color} aria-hidden>
                    <path d={x.path} />
                  </svg>
                </span>
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* the monthly report */}
      <section className="bg-gradient-to-br from-[#e8f1ff] via-[#eef0ff] to-[#f3ecff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Reporting
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              A report you can read in <span className={`${serif.className} tracking-normal text-cobalt`}>five minutes.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-slate">
              No jargon and no vanity numbers. Every month you see what your budget did, and what we&apos;ll do next.
            </p>
            <ul className="mt-7 space-y-3">
              {reportItems.map((x, k) => (
                <li key={x} data-aos="fade-up" data-aos-delay={k * 60} className="flex items-center gap-3 text-[15.5px] text-ink-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cobalt font-mono text-[11px] font-semibold text-white">{k + 1}</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* example report */}
          <div data-aos="fade-left" aria-hidden className="relative">
            <div className="absolute inset-[6%] rounded-full bg-cobalt/20 blur-3xl" />
            <div className="relative rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(39,71,214,0.55)] ring-1 ring-white sm:p-7">
              <div className="flex items-center justify-between">
                <span>
                  <span className="block text-[16px] font-semibold text-ink">Monthly report</span>
                  <span className="block text-[12px] text-slate">Your brand · example</span>
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">Leads up</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  ["Leads", "bg-cobalt"],
                  ["Cost per lead", "bg-[#db2777]"],
                  ["Calls", "bg-saffron"],
                ].map(([t, c]) => (
                  <span key={t} className="rounded-xl bg-[#f5f7fc] p-3">
                    <span className="block text-[11px] text-slate">{t}</span>
                    <span className={`mt-2 block h-2 w-[70%] rounded-full ${c}`} />
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-[#f5f7fc] p-3">
                <svg viewBox="0 0 300 90" className="h-24 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="rep" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2747d6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2747d6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 75 C40 70 60 60 90 58 S150 40 180 42 S240 20 300 12 V90 H0Z" fill="url(#rep)" />
                  <path d="M0 75 C40 70 60 60 90 58 S150 40 180 42 S240 20 300 12" fill="none" stroke="#2747d6" strokeWidth="2.5" />
                  <circle cx="300" cy="12" r="4" fill="#2747d6" />
                </svg>
              </div>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <span className="flex items-center gap-2.5 rounded-xl bg-[#fdf2f8] p-3">
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-[#db2777] to-[#f59e0b]" />
                  <span className="text-[12px]">
                    <span className="block font-semibold text-ink">Best ad</span>
                    <span className="block text-slate">Reel · Instagram</span>
                  </span>
                </span>
                <span className="flex items-center gap-2.5 rounded-xl bg-[#ecfdf5] p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500 text-white">→</span>
                  <span className="text-[12px]">
                    <span className="block font-semibold text-ink">Next month</span>
                    <span className="block text-slate">Shift budget to best ads</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how we run it */}
      <section id="included" className="scroll-mt-8 bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              How we run it
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              {included.plain} <span className={`${serif.className} tracking-normal text-cobalt`}>{included.accent}</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
              {included.intro}
            </p>
          </div>

          <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            <span aria-hidden className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-gradient-to-r from-[#db2777] via-[#7c3aed] to-cobalt opacity-30 lg:block" />
            {included.items.map((b, k) => {
              const tone = ["from-[#db2777] to-[#f472b6]", "from-[#ea580c] to-[#fbbf24]", "from-[#7c3aed] to-[#a78bfa]", "from-[#2747d6] to-[#60a5fa]", "from-[#0891b2] to-[#38bdf8]", "from-[#059669] to-[#34d399]"][k % 6];
              return (
                <li
                  key={b.t}
                  data-aos="fade-up"
                  data-aos-delay={k * 60}
                  className="relative flex gap-4 rounded-2xl border border-line bg-[#f7f9ff] p-4 sm:block sm:p-5 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
                >
                  <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg ring-4 ring-white lg:mx-auto lg:h-14 lg:w-14`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={b.i} />
                    </svg>
                  </span>
                  <span className="block min-w-0">
                    <span className="block font-mono text-[11px] text-cobalt sm:mt-4">0{k + 1}</span>
                    <span className="mt-0.5 block text-[16px] font-semibold leading-snug tracking-tight text-ink">{b.t}</span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-slate">{b.d}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* call to action */}
      <section className="bg-white px-6 pb-16 sm:pb-24">
        <div data-aos="fade-up" className="relative isolate mx-auto flex max-w-[83rem] flex-col gap-6 overflow-hidden rounded-[30px] bg-gradient-to-r from-[#be185d] via-[#7c3aed] to-cobalt p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
          <div aria-hidden className="absolute -right-10 -top-20 -z-10 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div>
            <p className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              Ready for enquiries, <span className={`${serif.className} tracking-normal`}>not just likes?</span>
            </p>
            <p className="mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-white/80">
              Tell us about your business and budget, and we&apos;ll suggest where to advertise and what to test first.
            </p>
          </div>
          <Link
            href={`/contact?service=${slug}`}
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#fdf2f8] lg:self-center"
          >
            Plan my campaign <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
