"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// one mock CRM screen per module
function LeadsScreen() {
  const rows = [
    ["Priya S.", "Meta Ads", "New", "bg-sky/20 text-sky"],
    ["Ravi K.", "Website", "Contacted", "bg-saffron/20 text-saffron"],
    ["Anitha R.", "WhatsApp", "New", "bg-sky/20 text-sky"],
    ["Kiran M.", "Google Ads", "Qualified", "bg-emerald-400/20 text-emerald-300"],
  ];
  return (
    <div className="space-y-2">
      {rows.map(([n, src, st, tone], k) => (
        <motion.div key={n} className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5 ring-1 ring-white/10" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.08 }}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky to-cobalt text-[11px] font-semibold">{n[0]}</span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold">{n}</span>
            <span className="block text-[11px] text-white/50">via {src}</span>
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tone}`}>{st}</span>
        </motion.div>
      ))}
    </div>
  );
}

function PipelineScreen() {
  const cols = [
    { t: "New", n: 3, c: "bg-sky" },
    { t: "Quoted", n: 2, c: "bg-saffron" },
    { t: "Won", n: 2, c: "bg-emerald-400" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((c, ci) => (
        <div key={c.t} className="rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/10">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
            <span className={`h-1.5 w-1.5 rounded-full ${c.c}`} />
            {c.t}
          </span>
          <div className="mt-2 space-y-1.5">
            {Array.from({ length: c.n }).map((_, k) => (
              <motion.div key={k} className="rounded-lg bg-white/[0.07] p-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.12 + k * 0.08 }}>
                <span className="block h-1.5 w-[80%] rounded-full bg-white/50" />
                <span className="mt-1 block h-1 w-[50%] rounded-full bg-white/25" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FollowUpScreen() {
  const items = [
    ["Call Ravi about the quote", "Today, 11:00 AM", true],
    ["Send brochure to Priya", "Today, 3:30 PM", false],
    ["Site visit with Kiran", "Tomorrow, 10:00 AM", false],
  ] as const;
  return (
    <div className="space-y-2">
      {items.map(([t, when, done], k) => (
        <motion.div key={t} className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5 ring-1 ring-white/10" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.1 }}>
          <span className={`grid h-5 w-5 place-items-center rounded-md ${done ? "bg-emerald-500" : "ring-1 ring-white/30"}`}>
            {done && (
              <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden>
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="white" strokeWidth="2.4" />
              </svg>
            )}
          </span>
          <span className="flex-1">
            <span className={`block text-[13px] font-semibold ${done ? "text-white/50 line-through" : ""}`}>{t}</span>
            <span className="block text-[11px] text-white/50">{when}</span>
          </span>
          {!done && <span className="h-2 w-2 animate-pulse rounded-full bg-saffron" />}
        </motion.div>
      ))}
    </div>
  );
}

function QuoteScreen() {
  return (
    <motion.div className="rounded-xl bg-white p-4 text-ink" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <span className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">Quotation #Q-1024</span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">Sent</span>
      </span>
      <div className="mt-3 space-y-1.5 text-[11.5px] text-slate">
        {["Website design", "Hosting (1 year)", "Business email"].map((x) => (
          <span key={x} className="flex justify-between border-b border-line pb-1.5">
            <span>{x}</span>
            <span className="h-1.5 w-12 self-center rounded-full bg-line" />
          </span>
        ))}
      </div>
      <span className="mt-3 flex items-center justify-between text-[12px]">
        <span className="font-semibold">Total incl. GST</span>
        <span className="h-2 w-16 rounded-full bg-cobalt" />
      </span>
    </motion.div>
  );
}

function ReportScreen() {
  const bars = [40, 55, 48, 70, 62, 85];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Leads", "bg-sky"],
          ["Won", "bg-emerald-400"],
          ["Pending", "bg-saffron"],
        ].map(([t, c]) => (
          <span key={t} className="rounded-xl bg-white/[0.05] p-2.5 ring-1 ring-white/10">
            <span className="block text-[10.5px] text-white/50">{t}</span>
            <span className={`mt-1.5 block h-2 w-10 rounded-full ${c}`} />
          </span>
        ))}
      </div>
      <div className="mt-3 flex h-28 items-end gap-2 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        {bars.map((h, k) => (
          <motion.span key={k} className="flex-1 rounded-t-md bg-gradient-to-t from-cobalt to-sky" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: k * 0.08, ease }} />
        ))}
      </div>
    </div>
  );
}

const modules: { t: string; d: string; i: string; screen: () => ReactNode; title: string }[] = [
  { t: "Lead capture", d: "Leads from Meta, Google, your website and WhatsApp arrive in one inbox automatically.", i: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", screen: LeadsScreen, title: "Leads inbox" },
  { t: "Sales pipeline", d: "See every deal by stage and move it forward with a drag.", i: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v6h-4z", screen: PipelineScreen, title: "Pipeline" },
  { t: "Follow-ups & reminders", d: "Tasks, call reminders and assignments, so no enquiry is forgotten.", i: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0", screen: FollowUpScreen, title: "Today's follow-ups" },
  { t: "Quotations & invoices", d: "Create GST-ready quotes and invoices from the deal in a click.", i: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5", screen: QuoteScreen, title: "Quotations" },
  { t: "Reports & dashboards", d: "Sources, conversion and team performance at a glance for owners.", i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6", screen: ReportScreen, title: "Owner dashboard" },
];

// CRM modules: a list on the left, and a live mock screen on the right that changes with the selected module
export function CrmModuleExplorer() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const Screen = modules[i].screen;
  const row = useRef<HTMLUListElement>(null);

  // phones: the module row scrolls sideways, so keep the active one in view
  useEffect(() => {
    const ul = row.current;
    const li = ul?.children[i] as HTMLElement | undefined;
    if (!ul || !li || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: li.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
  }, [i, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % modules.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  return (
    <div className="mt-10 grid min-w-0 items-center gap-6 sm:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ul ref={row} role="tablist" aria-label="CRM modules" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-2 lg:overflow-visible lg:px-0 lg:pb-0">
        {modules.map((m, k) => {
          const on = k === i;
          return (
            <li key={m.t} className="shrink-0 lg:shrink">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setI(k)}
                className={`flex w-full items-center gap-3 whitespace-nowrap rounded-full border px-3 py-2 text-left transition duration-300 lg:items-start lg:gap-4 lg:whitespace-normal lg:rounded-2xl lg:p-4 ${on ? "border-sky/40 bg-white/[0.08]" : "border-transparent hover:bg-white/[0.04]"}`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition lg:h-10 lg:w-10 lg:rounded-xl ${on ? "bg-sky text-[#060d18]" : "bg-white/10 text-sky"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={m.i} />
                  </svg>
                </span>
                <span>
                  <span className={`block text-[14px] font-semibold lg:text-[16.5px] ${on ? "text-white" : "text-white/70"}`}>{m.t}</span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span className="mt-1 hidden overflow-hidden text-[14px] leading-relaxed text-white/60 lg:block" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        {m.d}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* phones: the selected module's description sits above the screen */}
      <p className="min-h-[3rem] text-[15px] leading-relaxed text-white/65 lg:hidden">{modules[i].d}</p>

      <div aria-hidden className="relative min-w-0">
        <div className="absolute inset-[8%] rounded-full bg-cobalt/30 blur-3xl" />
        <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-[#0b1630] shadow-[0_40px_90px_-30px_rgba(30,192,242,0.5)]">
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#0f1d3d] px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="font-mono text-[11.5px] text-white/50">your-crm · {modules[i].title}</span>
          </div>
          <div className="flex">
            {/* sidebar */}
            <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-white/10 py-4 sm:flex">
              {modules.map((m, k) => (
                <span key={m.t} className={`grid h-8 w-8 place-items-center rounded-lg ${k === i ? "bg-sky/20 text-sky" : "text-white/30"}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={m.i} />
                  </svg>
                </span>
              ))}
            </div>
            <div className="min-h-[260px] min-w-0 flex-1 p-4 text-white sm:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
