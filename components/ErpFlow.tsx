"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// one business flow, start to finish: what happens, and what the ERP updates on its own
const steps = [
  {
    t: "Purchase order",
    d: "A purchase order is raised and approved, right from the ERP.",
    updates: ["Vendor ledger", "Pending deliveries", "Branch budget"],
    i: "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6M10 21h.01M17 21h.01",
  },
  {
    t: "Goods received",
    d: "Stock arrives at the warehouse and is checked in against the order.",
    updates: ["Stock quantity", "Batch & expiry", "Purchase bill"],
    i: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  },
  {
    t: "Sales order",
    d: "A customer places an order at any branch, counter or online.",
    updates: ["Stock reserved", "Customer account", "Dispatch list"],
    i: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  },
  {
    t: "GST invoice",
    d: "The invoice is created from the order with GST, ready for e-invoicing.",
    updates: ["GST register", "E-invoice details", "Customer outstanding"],
    i: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  },
  {
    t: "Payment",
    d: "Payment comes in by UPI, card or bank transfer and is matched to the invoice.",
    updates: ["Receipts", "Outstanding cleared", "Bank reconciliation"],
    i: "M3 6h18v12H3zM3 10h18M7 15h3",
  },
  {
    t: "Reports",
    d: "Owners and accountants see the full picture, live, without anyone compiling it.",
    updates: ["Profit & loss", "Stock value", "Synced to Tally"],
    i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6",
  },
];

// Order-to-cash, step by step: a row of connected stages and the records each one updates
export function ErpFlow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), 4200);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const s = steps[i];

  return (
    <div className="mt-10 sm:mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* the stages, joined by a line that fills as the flow moves */}
      <div className="relative">
        <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-5 h-0.5 bg-white/10 sm:top-7" />
        <motion.div
          aria-hidden
          className="absolute left-[8.33%] top-5 h-0.5 bg-gradient-to-r from-sky to-cobalt sm:top-7"
          animate={{ width: `${(i / (steps.length - 1)) * 83.33}%` }}
          transition={{ duration: 0.6, ease }}
        />
        <ol role="tablist" aria-label="Order to cash" className="relative grid grid-cols-6">
          {steps.map((x, k) => {
            const on = k === i;
            const done = k < i;
            return (
              <li key={x.t} className="flex justify-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setI(k)}
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <span
                    className={`relative grid h-10 w-10 place-items-center rounded-full ring-1 transition duration-300 sm:h-14 sm:w-14 ${
                      on
                        ? "bg-gradient-to-br from-sky to-cobalt text-white shadow-[0_0_0_6px_rgba(56,189,248,0.15),0_12px_30px_-8px_rgba(56,189,248,0.6)] ring-sky/60"
                        : done
                          ? "bg-[#10204a] text-sky ring-sky/40"
                          : "bg-[#0b1630] text-white/45 ring-white/15 group-hover:text-white"
                    }`}
                  >
                    <svg className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={x.i} />
                    </svg>
                  </span>
                  <span className={`hidden text-[13.5px] font-semibold transition sm:block ${on ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>
                    {x.t}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the selected stage */}
      <div className="mt-8 grid gap-4 sm:mt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`t-${i}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="min-w-0 rounded-[24px] bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8"
          >
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-sky">
              Step {i + 1} of {steps.length}
            </p>
            <p className="mt-3 text-[26px] font-semibold tracking-tight sm:text-[30px]">{s.t}</p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-white/65">{s.d}</p>
            {/* progress for this step */}
            <div aria-hidden className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
              {!paused && !reduce && (
                <motion.span
                  key={`p-${i}`}
                  className="block h-full bg-gradient-to-r from-sky to-cobalt"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.2, ease: "linear" }}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="min-w-0 rounded-[24px] bg-gradient-to-br from-[#0f1f4a] to-[#0a1430] p-6 ring-1 ring-sky/20 sm:p-8">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Updated automatically
          </p>
          <ul className="mt-5 space-y-2.5">
            {s.updates.map((u, k) => (
              <motion.li
                key={`${i}-${u}`}
                initial={reduce ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + k * 0.12, duration: 0.4, ease }}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/10"
              >
                <span className="text-[15px] font-medium">{u}</span>
                <svg className="shrink-0 text-emerald-400" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 text-[13.5px] text-white/45">No re-entering the same data in another tool.</p>
        </div>
      </div>
    </div>
  );
}
