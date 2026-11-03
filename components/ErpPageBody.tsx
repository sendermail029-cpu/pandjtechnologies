import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons, cloudIcons } from "@/lib/brand-icons";
import { crmLogos } from "@/lib/crm-logos";
import { ErpFlow } from "./ErpFlow";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";
const h2 = "mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em]";

// small visuals for each module card
function StockBars() {
  const rows = [
    ["Hyderabad", 82, "bg-cobalt"],
    ["Vijayawada", 56, "bg-sky"],
    ["Warehouse", 18, "bg-red-400"],
  ] as const;
  return (
    <div className="space-y-3">
      {rows.map(([n, v, c]) => (
        <div key={n}>
          <div className="flex justify-between text-[12px] text-slate">
            <span>{n}</span>
            {v < 25 ? <span className="font-semibold text-red-500">Low stock</span> : <span>{v}%</span>}
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-[#e6ecf8]">
            <div className={`h-full rounded-full ${c}`} style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoiceMini() {
  return (
    <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-line">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-semibold text-ink">Tax invoice</span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-600">GST</span>
      </div>
      {["CGST 9%", "SGST 9%"].map((x) => (
        <div key={x} className="mt-2 flex items-center justify-between text-[11.5px] text-slate">
          <span>{x}</span>
          <span className="h-1.5 w-10 rounded-full bg-[#e6ecf8]" />
        </div>
      ))}
      <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2 text-[12px] font-semibold text-ink">
        <span>Total</span>
        <span className="h-2 w-14 rounded-full bg-cobalt" />
      </div>
    </div>
  );
}

function ApprovalChips() {
  return (
    <div className="space-y-2">
      {[
        ["PO-2041", "Approved", "bg-emerald-50 text-emerald-600"],
        ["PO-2042", "Awaiting", "bg-amber-50 text-amber-600"],
      ].map(([n, st, tone]) => (
        <div key={n} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-line">
          <span className="font-mono text-[12px] text-ink">{n}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tone}`}>{st}</span>
        </div>
      ))}
    </div>
  );
}

function AttendanceGrid() {
  const marks = "PPPAPPLPPPPPAPPPPLPP";
  return (
    <div className="grid grid-cols-10 gap-1.5">
      {marks.split("").map((m, k) => (
        <span
          key={k}
          className={`aspect-square rounded-[5px] ${m === "P" ? "bg-cobalt/80" : m === "L" ? "bg-saffron/80" : "bg-[#dfe6f5]"}`}
        />
      ))}
    </div>
  );
}

function BranchNodes() {
  return (
    <div className="relative mx-auto h-[92px] w-full max-w-[220px]">
      <svg className="absolute inset-0 h-full w-full text-cobalt/30" viewBox="0 0 220 92" fill="none" aria-hidden>
        <path d="M110 46 30 18M110 46 30 74M110 46l80-28M110 46l80 28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-ink text-[10px] font-bold text-white">HQ</span>
      {[
        ["left-[8%] top-[6%]"],
        ["left-[8%] bottom-[6%]"],
        ["right-[8%] top-[6%]"],
        ["right-[8%] bottom-[6%]"],
      ].map(([p]) => (
        <span key={p} className={`absolute ${p} h-6 w-6 rounded-lg bg-white shadow-sm ring-1 ring-cobalt/30`} />
      ))}
    </div>
  );
}

function Donut() {
  return (
    <div className="flex items-center gap-4">
      <svg width="78" height="78" viewBox="0 0 42 42" aria-hidden className="shrink-0 -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#e6ecf8" strokeWidth="6" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2747d6" strokeWidth="6" strokeDasharray="55 45" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-55" />
      </svg>
      <div className="space-y-1.5 text-[12px] text-slate">
        {[
          ["bg-cobalt", "Sales"],
          ["bg-sky", "Purchase"],
          ["bg-[#e6ecf8]", "Expenses"],
        ].map(([c, t]) => (
          <span key={t} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${c}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const modules = [
  { t: "Inventory & warehouse", tint: "bg-gradient-to-br from-[#dfe8ff] to-[#eef3ff] border-[#ccd9ff]", d: "Real-time stock across branches and warehouses, with low-stock alerts.", v: StockBars, span: "lg:col-span-2" },
  { t: "Sales & GST billing", tint: "bg-gradient-to-br from-[#daf5e7] to-[#edfaf3] border-[#c2ead5]", d: "Quotations, orders and GST-compliant invoices, with e-invoicing support.", v: InvoiceMini, span: "" },
  { t: "Purchase & vendors", tint: "bg-gradient-to-br from-[#ffe9d9] to-[#fff5ec] border-[#f8d3b6]", d: "Purchase orders, vendor management and approvals in one flow.", v: ApprovalChips, span: "" },
  { t: "HR & payroll", tint: "bg-gradient-to-br from-[#ebe4ff] to-[#f6f2ff] border-[#d8ccfb]", d: "Attendance, leave and payroll that feed straight into accounts.", v: AttendanceGrid, span: "" },
  { t: "Multi-branch", tint: "bg-gradient-to-br from-[#dcf2ff] to-[#eef9ff] border-[#c3e5fa]", d: "Every branch and warehouse in one system, with roles for each team.", v: BranchNodes, span: "" },
  { t: "Accounts & reports", tint: "bg-gradient-to-r from-[#fff3d6] via-[#fbeeff] to-[#e3edff] border-[#efdcb3]", d: "Sales, stock, purchase and profit reports, ready for owners and accountants.", v: Donut, span: "lg:col-span-3" },
];

// industries an ERP suits, with the modules each leans on (3D icons in public/industries, Fluent Emoji, MIT)
const industries = [
  { t: "Manufacturing", d: "Raw material, production and dispatch", img: "manufacturing" },
  { t: "Distribution & wholesale", d: "Stock, dealers and credit control", img: "logistics" },
  { t: "Retail chains", d: "Billing, stock and transfers per store", img: "retail" },
  { t: "Supermarkets", d: "Fast billing, batches and offers", img: "supermarket" },
  { t: "Pharmacies", d: "Batch, expiry and GST billing", img: "pharmacy" },
  { t: "Construction", d: "Sites, materials and contractor payments", img: "construction" },
  { t: "Schools & colleges", d: "Fees, staff payroll and stores", img: "education" },
  { t: "Restaurants & cafés", d: "Kitchen stock, outlets and costing", img: "restaurant" },
];

// rollout plan: where each piece of work sits across the four phases
const phases = ["Plan", "Build", "Go live", "Support"];
const spans: [number, number][] = [
  [0, 1],
  [1, 2.4],
  [1.5, 2.8],
  [1.8, 3],
  [2, 3],
  [2.4, 4],
];

// tools the ERP connects to (real logos where a free one exists)
const odoo = brandIcons.find((b) => b.title === "Odoo")!;
const aws = cloudIcons.find((b) => b.title === "AWS")!;
const gcloud = cloudIcons.find((b) => b.title === "Google Cloud")!;
const connects: { t: string; color?: string; path?: string; glyph?: string }[] = [
  { t: "Tally", glyph: "T" },
  { t: "GST e-invoicing", glyph: "₹" },
  { t: "Razorpay", ...crmLogos.Razorpay },
  { t: "UPI & banks", glyph: "⇄" },
  { t: "Excel imports", glyph: "⊞" },
  { t: "Odoo", color: odoo.color, path: odoo.path },
  { t: "AWS", color: aws.color, path: aws.path },
  { t: "Google Cloud", color: gcloud.color, path: gcloud.path },
];

// Body of the ERP software page only: order-to-cash flow, module bento, industries, rollout plan, connections
export function ErpPageBody({ page, slug }: { page: ServicePage; slug: string }) {
  const { included } = page;

  return (
    <>
      {/* one entry, everything updates: carries on from the navy hero with no seam */}
      <section className="relative isolate overflow-hidden -mt-px bg-[#060d18] px-6 pb-16 pt-6 text-white sm:pb-24 sm:pt-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-cobalt/25 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-sky`}>
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              How an ERP works
              <span aria-hidden className="h-px w-8 bg-sky/50" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={h2}>
              Enter it once. <span className={`${serif.className} tracking-normal text-sky`}>Everything updates.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/60">
              Follow one order from purchase to profit. Each step updates stock, accounts and reports on its own.
            </p>
          </div>
          <ErpFlow />
        </div>
      </section>

      {/* modules, as a bento grid */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                {page.build.label}
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
                {page.build.plain} <span className={`${serif.className} tracking-normal text-cobalt`}>{page.build.accent}</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              {page.build.intro}
            </p>
          </div>

          <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-5">
            {modules.map((m, k) => {
              const V = m.v;
              const wide = k === 0 || k === modules.length - 1;
              return (
                <li
                  key={m.t}
                  data-aos="fade-up"
                  data-aos-delay={(k % 3) * 80}
                  className={`group flex w-[84%] shrink-0 snap-center flex-col rounded-[26px] border ${m.tint} p-6 sm:w-auto transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cobalt/10 sm:p-7 ${m.span} ${
                    wide ? "sm:col-span-2 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10" : ""
                  }`}
                >
                  <div className="flex-1">
                    <span className="font-mono text-[12px] text-cobalt">0{k + 1}</span>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-ink">{m.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{m.d}</p>
                  </div>
                  <div aria-hidden className={`mt-6 rounded-2xl bg-white/80 p-4 shadow-[0_10px_30px_-18px_rgba(15,29,51,0.35)] ring-1 ring-white ${wide ? "lg:mt-0" : ""}`}>
                    <V />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* industries */}
      <section className="border-t border-line bg-[#f5f7fc] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Who it&apos;s for
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              Shaped around how <span className={`${serif.className} tracking-normal text-cobalt`}>your business runs.</span>
            </h2>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {industries.map((x, k) => (
              <li
                key={x.t}
                data-aos="fade-up"
                data-aos-delay={(k % 4) * 60}
                className="group relative overflow-hidden rounded-[22px] border border-line bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-xl hover:shadow-cobalt/10 sm:p-6"
              >
                <Image
                  src={`/industries/${x.img}.png`}
                  alt=""
                  width={64}
                  height={64}
                  className="h-11 w-11 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:h-14 sm:w-14"
                />
                <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">{x.t}</h3>
                <p className="mt-1 text-[13px] leading-snug text-slate sm:text-[14px]">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* phased rollout plan */}
      <section id="included" className="relative isolate scroll-mt-8 overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f5f0ff] to-[#e8f7ff] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                The rollout plan
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
                {included.plain} <span className={`${serif.className} tracking-normal text-cobalt`}>{included.accent}</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              {included.intro}
            </p>
          </div>

          <div data-aos="fade-up" className="mt-10 rounded-[28px] border border-white bg-white/70 p-5 shadow-[0_30px_60px_-30px_rgba(39,71,214,0.35)] backdrop-blur sm:mt-12 sm:p-8">
            {/* phase headings */}
            <div className="grid gap-x-6 lg:grid-cols-[300px_1fr]">
              <span className="hidden lg:block" />
              <div className="grid grid-cols-4 border-b border-line pb-3">
                {phases.map((p, k) => (
                  <span key={p} className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate sm:text-[12px] sm:tracking-[0.16em]">
                    <span className="hidden text-cobalt sm:inline">0{k + 1} </span>{p}
                  </span>
                ))}
              </div>
            </div>

            <ul className="relative">
              {/* business as usual, the whole way through */}
              <li className="grid items-center gap-x-6 gap-y-2 border-b border-dashed border-line py-4 lg:grid-cols-[300px_1fr]">
                <span className="flex items-center gap-2 text-[14.5px] font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Your business keeps running
                </span>
                <span className="relative h-3 rounded-full bg-[repeating-linear-gradient(90deg,#34d399_0_14px,#a7f3d0_14px_22px)]" />
              </li>
              {included.items.map((b, k) => {
                const [a, z] = spans[k] ?? [0, 4];
                return (
                  <li key={b.t} className="grid items-center gap-x-6 gap-y-2.5 border-b border-line/70 py-4 last:border-0 lg:grid-cols-[300px_1fr]">
                    <div>
                      <h3 className="text-[15.5px] font-semibold tracking-tight text-ink">{b.t}</h3>
                      <p className="mt-0.5 text-[13.5px] leading-snug text-slate">{b.d}</p>
                    </div>
                    <div className="relative h-8 rounded-lg bg-[repeating-linear-gradient(90deg,transparent_0_calc(25%-1px),rgb(15_29_51/0.06)_calc(25%-1px)_25%)]">
                      <span
                        className={`absolute inset-y-1 rounded-md ${k % 2 ? "bg-gradient-to-r from-sky to-cobalt" : "bg-gradient-to-r from-cobalt to-[#4f46e5]"} shadow-[0_6px_14px_-6px_rgba(39,71,214,0.6)]`}
                        style={{ left: `${(a / 4) * 100}%`, width: `${((z - a) / 4) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* connections and call to action */}
      <section className="bg-[#f5f7fc] px-6 py-16 sm:py-24">
        <div className="relative isolate mx-auto max-w-[83rem] overflow-hidden rounded-[30px] bg-[#060d18] p-6 text-white sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-cobalt/40 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div>
              <p className={`${label} text-sky`}>
                <span aria-hidden className="h-px w-8 bg-sky/50" />
                Works with what you have
              </p>
              <p className="mt-5 text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Keep your accountant&apos;s tools. <span className={`${serif.className} tracking-normal text-sky`}>Lose the re-typing.</span>
              </p>
              <p className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-white/65">
                Tell us how your business runs today and we&apos;ll map out the modules, the order to launch them and how they connect.
              </p>
              <Link
                href={`/contact?service=${slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe]"
              >
                Plan my ERP <span aria-hidden>→</span>
              </Link>
            </div>
            <ul className="grid grid-cols-4 gap-2 sm:gap-3">
              {connects.map((c) => (
                <li
                  key={c.t}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.05] px-1 py-3 text-center sm:gap-2.5 sm:px-2 sm:py-4 ring-1 ring-white/10 transition hover:bg-white/[0.09]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white sm:h-11 sm:w-11">
                    {c.path ? (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill={c.color} aria-hidden>
                        <path d={c.path} />
                      </svg>
                    ) : (
                      <span aria-hidden className="text-[18px] font-bold text-cobalt">{c.glyph}</span>
                    )}
                  </span>
                  <span className="text-[10.5px] font-medium leading-tight text-white/80 sm:text-[12.5px]">{c.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
