import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import type { ServicePage } from "@/lib/service-pages";
import { AgentLoop } from "./AgentLoop";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";
const h2 = "mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em]";

const Icon = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const ic = {
  cloud: "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  chip: "M8 8h8v8H8zM4 10h2M4 14h2M18 10h2M18 14h2M10 4v2M14 4v2M10 18v2M14 18v2",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  user: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  doc: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",
  book: "M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z",
  finger: "M12 11v4M8 9a4 4 0 0 1 8 0v4a8 8 0 0 1-1 4M5 12a7 7 0 0 1 14-3M9 21a10 10 0 0 0 1-5v-3",
  scan: "M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10",
  temp: "M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z",
  pin: "M12 21s7-6.3 7-11a7 7 0 0 0-14 0c0 4.7 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  camera: "M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  printer: "M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z",
  chart: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  users: "M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20M11 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.4",
  shield: "M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10z",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3 0 6 3 6 6l-7 7-6-6zM9 13l-2 2M15 9h.01",
};

/* ---------- the four live cards ---------- */

function SaasMock() {
  return (
    <div className="space-y-3">
      <div className="flex w-max gap-1 rounded-full bg-white/[0.06] p-1 text-[11px] ring-1 ring-white/10">
        <span className="rounded-full bg-white px-2.5 py-0.5 font-semibold text-ink">Monthly</span>
        <span className="px-2.5 py-0.5 text-white/55">Yearly</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Starter", "Pro", "Business"].map((p, k) => (
          <div key={p} className={`rounded-xl p-2.5 ring-1 ${k === 1 ? "bg-sky/15 ring-sky/50" : "bg-white/[0.04] ring-white/10"}`}>
            <span className={`block text-[11.5px] font-semibold ${k === 1 ? "text-sky" : "text-white/80"}`}>{p}</span>
            <span className="mt-2 block h-1.5 w-[70%] rounded-full bg-white/30" />
            <span className="mt-1.5 block h-1.5 w-[50%] rounded-full bg-white/15" />
            <span className={`mt-3 block rounded-md py-1 text-center text-[10px] font-semibold ${k === 1 ? "bg-sky text-ink" : "bg-white/10 text-white/70"}`}>Subscribe</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentMock() {
  return (
    <div className="space-y-2.5 text-[12.5px]">
      <div className="ml-auto w-max max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-white/85">Has my order shipped?</div>
      <div className="flex w-max items-center gap-1.5 rounded-full bg-[#a78bfa]/15 px-2.5 py-1 font-mono text-[10.5px] text-[#c4b5fd] ring-1 ring-[#a78bfa]/30">
        <Icon d={ic.spark} className="h-3 w-3" /> Checked order #4821
      </div>
      <div className="w-max max-w-[88%] rounded-2xl rounded-bl-md bg-gradient-to-br from-[#7c3aed] to-cobalt px-3 py-2 text-white">
        Yes, it&apos;s out for delivery and arrives today.
      </div>
      <div className="flex w-max gap-1 rounded-full bg-white/[0.06] px-3 py-2">
        {[0, 1, 2].map((k) => (
          <span key={k} className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" style={{ animationDelay: `${k * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function DeviceMock() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid shrink-0 place-items-center gap-1.5 rounded-xl bg-white/[0.05] p-3 ring-1 ring-white/10">
        <Icon d={ic.chip} className="h-6 w-6 text-emerald-300" />
        <span className="text-[10px] text-white/55">Sensor</span>
      </div>
      <svg className="h-4 min-w-0 flex-1 text-emerald-400" viewBox="0 0 60 8" preserveAspectRatio="none" aria-hidden>
        <path className="map-flow" d="M0 4h60" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="min-w-0 flex-[1.6] space-y-1.5 rounded-xl bg-white/[0.05] p-3 ring-1 ring-white/10">
        {[
          ["Temp", "24°C"],
          ["Door", "Closed"],
          ["Power", "On"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-2 text-[11.5px]">
            <span className="truncate text-white/55">{k}</span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomMock() {
  const steps = ["Form", "Approve", "Notify", "Report"];
  return (
    <div className="flex items-center justify-between gap-0.5 sm:gap-1">
      {steps.map((s, k) => (
        <div key={s} className="flex min-w-0 flex-1 items-center gap-1">
          <span className={`w-full truncate rounded-lg px-1 py-2 text-center text-[10.5px] font-semibold sm:px-1.5 sm:text-[11px] ring-1 ${k === 1 ? "bg-saffron/20 text-saffron ring-saffron/40" : "bg-white/[0.05] text-white/75 ring-white/10"}`}>
            {s}
          </span>
          {k < steps.length - 1 && <span aria-hidden className="shrink-0 text-white/30">›</span>}
        </div>
      ))}
    </div>
  );
}

const four = [
  { t: "SaaS products", d: "Your own software product, sold on subscription to customers anywhere.", i: ic.cloud, tone: "text-sky bg-sky/15", glow: "bg-sky/25", v: SaasMock, href: "#saas" },
  { t: "AI agents", d: "Agents that answer customers, qualify leads and update records on their own.", i: ic.spark, tone: "text-[#c4b5fd] bg-[#7c3aed]/20", glow: "bg-[#7c3aed]/30", v: AgentMock, href: "#ai-agents" },
  { t: "Hardware + software", d: "Sensors, scanners, biometric devices and trackers connected to live dashboards.", i: ic.chip, tone: "text-emerald-300 bg-emerald-400/15", glow: "bg-emerald-400/20", v: DeviceMock, href: "#hardware" },
  { t: "Your requirement", d: "Portals, booking systems, automation and integrations, built to your exact needs.", i: ic.code, tone: "text-saffron bg-saffron/15", glow: "bg-saffron/20", v: CustomMock, href: "#included" },
];

/* ---------- section data ---------- */

const agents = [
  { tone: "from-[#7c3aed] to-[#a78bfa]", ring: "hover:border-[#c4b5fd]", t: "Customer support agent", d: "Answers questions on WhatsApp and your website, any hour, and hands over to your team when needed.", i: ic.chat },
  { tone: "from-[#db2777] to-[#f472b6]", ring: "hover:border-[#f9a8d4]", t: "Sales agent", d: "Replies to new enquiries in seconds, asks the right questions and books calls for your team.", i: ic.target },
  { tone: "from-[#0284c7] to-[#38bdf8]", ring: "hover:border-[#7dd3fc]", t: "Operations agent", d: "Reads invoices, forms and emails, then updates your records without anyone typing them in.", i: ic.doc },
  { tone: "from-[#d97706] to-[#fbbf24]", ring: "hover:border-[#fcd34d]", t: "Knowledge agent", d: "Answers staff questions from your own documents, policies and manuals.", i: ic.book },
];
const loop = [
  { t: "Listen", d: "A message, email or event comes in" },
  { t: "Understand", d: "It works out what is being asked" },
  { t: "Act", d: "It uses your tools and data" },
  { t: "Report", d: "It replies, logs and updates" },
];

const devices = [
  { t: "Biometric & RFID", i: ic.finger },
  { t: "Barcode & QR scanners", i: ic.scan },
  { t: "Temperature & energy sensors", i: ic.temp },
  { t: "GPS trackers", i: ic.pin },
  { t: "Cameras", i: ic.camera },
  { t: "POS printers & scales", i: ic.printer },
];
const outputs = [
  { t: "Live dashboards", i: ic.chart },
  { t: "Instant alerts", i: ic.bell },
  { t: "Mobile app", i: ic.phone },
];

const saasBlocks = [
  { t: "Sign-up & onboarding", i: ic.user },
  { t: "Plans & subscriptions", i: ic.card },
  { t: "Separate accounts per customer", i: ic.users },
  { t: "Admin console", i: ic.shield },
  { t: "Usage analytics", i: ic.chart },
  { t: "Built to scale", i: ic.rocket },
];
const saasStages = [
  { t: "MVP", d: "The core features your first customers need, live quickly so you can learn from real users." },
  { t: "Launch", d: "Payments, onboarding and your marketing site ready, so customers can sign up on their own." },
  { t: "Scale", d: "New features, more customers and more regions, on infrastructure that grows with you." },
];

const examples = ["Customer portals", "Booking systems", "Internal tools", "Dashboards", "Workflow automation", "API integrations", "Chatbots", "Data migration"];

// Body of the SaaS, AI & custom software page only
export function CustomPageBody({ page, slug }: { page: ServicePage; slug: string }) {
  const { build, included } = page;

  return (
    <>
      {/* the four things we build: carries on from the navy hero with no seam */}
      <section className="relative isolate -mt-px overflow-hidden bg-[#060d18] px-6 pb-16 pt-6 text-white sm:pb-24 sm:pt-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-[#7c3aed]/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-sky`}>
                <span aria-hidden className="h-px w-8 bg-sky/50" />
                {build.label}
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={h2}>
                {build.plain} <span className={`${serif.className} tracking-normal text-sky`}>{build.accent}</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16px] leading-relaxed text-white/60">
              {build.intro}
            </p>
          </div>

          {/* phones: a swipeable row */}
          <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible mt-10 sm:mt-12 sm:grid md:grid-cols-2 lg:gap-5">
            {four.map((x, k) => {
              const V = x.v;
              return (
                <li key={x.t} data-aos="fade-up" data-aos-delay={(k % 2) * 100} className="w-[86%] min-w-0 shrink-0 snap-center sm:w-auto">
                  <a
                    href={x.href}
                    className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] bg-white/[0.04] p-6 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20 sm:p-8"
                  >
                    <div aria-hidden className={`absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full ${x.glow} blur-3xl transition duration-500 group-hover:scale-125`} />
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${x.tone}`}>
                        <Icon d={x.i} className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-[12px] text-white/35">0{k + 1}</span>
                    </div>
                    <h3 className="mt-5 text-[22px] font-semibold tracking-tight">{x.t}</h3>
                    <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-white/60">{x.d}</p>
                    <div aria-hidden className="mt-6 min-w-0 rounded-2xl bg-[#0a1428]/80 p-3 sm:p-4 ring-1 ring-white/10 sm:mt-auto sm:pt-4">
                      <V />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* AI agents */}
      <section id="ai-agents" className="scroll-mt-8 bg-gradient-to-br from-[#f3efff] via-[#f7f5ff] to-[#eef3ff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-[#7c3aed]`}>
              <span aria-hidden className="h-px w-8 bg-[#7c3aed]/40" />
              AI agents
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              AI agents that <span className={`${serif.className} tracking-normal text-[#7c3aed]`}>do the work.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-slate">
              Not just a chatbot. An agent connected to your own data and tools, so it can look things up, take action and keep
              your team in the loop.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {agents.map((a, k) => (
                <li
                  key={a.t}
                  data-aos="fade-up"
                  data-aos-delay={k * 60}
                  className={`group relative flex gap-4 overflow-hidden rounded-2xl border border-[#e4dcff] bg-white/85 p-4 transition ${a.ring} sm:block sm:p-5 duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7c3aed]/15`}
                >
                  <span aria-hidden className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${a.tone} opacity-10 blur-xl transition duration-500 group-hover:scale-150 group-hover:opacity-25`} />
                  <span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${a.tone} text-white shadow-md transition duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
                    <Icon d={a.i} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-ink sm:mt-4 sm:text-[16.5px]">{a.t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate sm:mt-1.5">{a.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* the agent loop, live */}
          <AgentLoop />
        </div>
        <p className="mx-auto mt-10 flex max-w-[83rem] items-center gap-2 text-[14px] text-slate">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <Icon d={ic.shield} className="h-3.5 w-3.5" />
          </span>
          You decide what it can do on its own and what needs a person to approve.
        </p>
      </section>

      {/* hardware + software */}
      <section id="hardware" className="scroll-mt-8 bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-emerald-600`}>
              <span aria-hidden className="h-px w-8 bg-emerald-500/40" />
              Hardware + software
              <span aria-hidden className="h-px w-8 bg-emerald-500/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              Devices that talk to <span className={`${serif.className} tracking-normal text-emerald-600`}>your software.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-slate">
              We connect the machines and devices in your business to software you can see and act on, from the factory floor to
              your phone.
            </p>
          </div>

          <div className="mt-10 grid items-center gap-4 sm:mt-12 lg:gap-4 lg:grid-cols-[1.2fr_auto_0.8fr_auto_1fr] lg:gap-4">
            {/* devices */}
            <ul data-aos="fade-right" className="grid grid-cols-2 gap-3">
              {devices.map((d) => (
                <li key={d.t} className="flex items-center gap-3 rounded-2xl border border-[#cdeedd] bg-gradient-to-br from-[#ebfaf3] to-white p-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-[#cdeedd]">
                    <Icon d={d.i} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug text-ink">{d.t}</span>
                </li>
              ))}
            </ul>

            <span aria-hidden className="mx-auto h-10 w-0.5 bg-[repeating-linear-gradient(180deg,#34d399_0_4px,transparent_4px_9px)] lg:hidden" />
            <svg aria-hidden className="mx-auto hidden h-4 w-16 text-emerald-400 lg:block" viewBox="0 0 60 8" preserveAspectRatio="none">
              <path className="map-flow" d="M0 4h60" stroke="currentColor" strokeWidth="3" />
            </svg>

            {/* the hub */}
            <div data-aos="zoom-in" className="relative mx-auto grid w-full max-w-[260px] place-items-center rounded-[28px] bg-[#060d18] px-6 py-8 text-center text-white shadow-[0_30px_60px_-24px_rgba(5,150,105,0.5)]">
              <div aria-hidden className="absolute inset-0 -z-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.25),transparent_65%)]" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                <Icon d={ic.cloud} className="h-7 w-7" />
              </span>
              <p className="relative mt-4 text-[17px] font-semibold">Your platform</p>
              <p className="relative mt-1 text-[13px] leading-snug text-white/55">Collects every reading, applies your rules, stores the history</p>
            </div>

            <span aria-hidden className="mx-auto h-10 w-0.5 bg-[repeating-linear-gradient(180deg,#34d399_0_4px,transparent_4px_9px)] lg:hidden" />
            <svg aria-hidden className="mx-auto hidden h-4 w-16 text-emerald-400 lg:block" viewBox="0 0 60 8" preserveAspectRatio="none">
              <path className="map-flow" d="M0 4h60" stroke="currentColor" strokeWidth="3" />
            </svg>

            {/* what you get */}
            <ul data-aos="fade-left" className="grid grid-cols-3 gap-2 lg:block lg:space-y-3">
              {outputs.map((o) => (
                <li key={o.t} className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-[#f7f9ff] p-3 text-center lg:flex-row lg:gap-3 lg:p-4 lg:text-left">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cobalt text-white">
                    <Icon d={o.i} className="h-5 w-5" />
                  </span>
                  <span className="text-[12.5px] font-semibold leading-tight text-ink lg:text-[15px]">{o.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SaaS */}
      <section id="saas" className="relative isolate scroll-mt-8 overflow-hidden bg-gradient-to-br from-[#e6f3ff] via-[#eef2ff] to-[#f5f0ff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              SaaS products
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              Launch your own <span className={`${serif.className} tracking-normal text-cobalt`}>SaaS product.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-slate">
              Have an idea other businesses would pay for? We build the full product, so customers can sign up, subscribe and use it
              on their own.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {saasBlocks.map((b, k) => (
                <li
                  key={b.t}
                  data-aos="fade-up"
                  data-aos-delay={k * 50}
                  className="flex flex-col gap-3 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_-20px_rgba(39,71,214,0.5)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e6edff] text-cobalt">
                    <Icon d={b.i} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[14px] font-semibold leading-snug text-ink">{b.t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MVP, launch, scale */}
          <ol className="relative space-y-4 self-center">
            {saasStages.map((st, k) => (
              <li
                key={st.t}
                data-aos="fade-left"
                data-aos-delay={k * 100}
                className={`relative rounded-[24px] p-6 sm:p-7 ${["", "sm:ml-[6%]", "sm:ml-[12%]"][k]} ${
                  k === 1 ? "bg-cobalt text-white shadow-xl shadow-cobalt/30" : "border border-white bg-white/85 shadow-[0_20px_40px_-28px_rgba(39,71,214,0.5)]"
                }`}
                
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[12px] ${k === 1 ? "text-white/70" : "text-cobalt"}`}>Stage 0{k + 1}</span>
                  <span className={`h-px flex-1 ${k === 1 ? "bg-white/25" : "bg-line"}`} />
                </div>
                <p className={`mt-2 text-[24px] font-semibold tracking-tight ${k === 1 ? "text-white" : "text-ink"}`}>{st.t}</p>
                <p className={`mt-1.5 text-[15px] leading-relaxed ${k === 1 ? "text-white/80" : "text-slate"}`}>{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* any other requirement, and how we work */}
      <section id="included" className="scroll-mt-8 bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-saffron`}>
                <span aria-hidden className="h-px w-8 bg-saffron/50" />
                Your requirement
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
                Something else in mind? <span className={`${serif.className} tracking-normal text-cobalt`}>We&apos;ll build it.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              {included.intro}
            </p>
          </div>
          <ul data-aos="fade-up" className="mt-8 flex flex-wrap gap-2">
            {examples.map((e) => (
              <li key={e} className="rounded-full border border-[#f8d3b6] bg-[#fff5ec] px-4 py-2 text-[14px] font-medium text-ink">
                {e}
              </li>
            ))}
          </ul>

          <ol className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible mt-10 sm:mt-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {included.items.map((b, k) => (
              <li
                key={b.t}
                data-aos="fade-up"
                data-aos-delay={(k % 3) * 80}
                className={`group relative w-[78%] shrink-0 snap-center overflow-hidden rounded-[22px] border p-6 transition sm:w-auto duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  k % 2 ? "border-transparent bg-[#060d18] text-white hover:shadow-ink/30" : "border-line bg-[#f7f9ff] hover:border-cobalt/30 hover:shadow-cobalt/10"
                }`}
              >
                <span aria-hidden className={`absolute -right-2 -top-5 font-mono text-[84px] font-bold leading-none ${k % 2 ? "text-white/[0.06]" : "text-cobalt/[0.07]"}`}>
                  {k + 1}
                </span>
                <span className={`font-mono text-[12px] ${k % 2 ? "text-sky" : "text-cobalt"}`}>Step 0{k + 1}</span>
                <h3 className={`mt-2 text-[18px] font-semibold tracking-tight ${k % 2 ? "text-white" : "text-ink"}`}>{b.t}</h3>
                <p className={`mt-1.5 text-[14.5px] leading-relaxed ${k % 2 ? "text-white/65" : "text-slate"}`}>{b.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* call to action */}
      <section className="bg-white px-6 pb-16 sm:pb-24">
        <div data-aos="fade-up" className="relative isolate mx-auto flex max-w-[83rem] flex-col gap-6 overflow-hidden rounded-[30px] bg-[#060d18] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
          <div aria-hidden className="absolute -left-16 -top-24 -z-10 h-72 w-72 rounded-full bg-[#7c3aed]/35 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 right-10 -z-10 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />
          <div>
            <p className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              Have an idea? <span className={`${serif.className} tracking-normal text-sky`}>Let&apos;s build it.</span>
            </p>
            <p className="mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-white/65">
              A SaaS product, an AI agent, a connected device or something only your business needs. Tell us about it and we&apos;ll
              come back with a clear plan.
            </p>
          </div>
          <Link
            href={`/contact?service=${slug}`}
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] lg:self-center"
          >
            Discuss my idea <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
