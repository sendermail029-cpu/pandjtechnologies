"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// the kinds of websites we build, each with a one-line pitch (Website design page hero only)
const websiteTabs = [
  { t: "Business", d: "A professional company website that explains what you do and turns visitors into enquiries." },
  { t: "Dynamic", d: "Update your blogs, galleries and events yourself, without calling a developer." },
  { t: "E-commerce", d: "An online store with secure payments, order management and delivery tracking." },
  { t: "Integrations", d: "Payments, WhatsApp, CRM and booking systems connected to your website." },
];

// Tabs that switch the line under the hero heading; they cycle on their own until someone picks one
export function WebsiteHeroTabs({ tabs = websiteTabs, label = "Kinds of websites" }: { tabs?: { t: string; d: string }[]; label?: string } = {}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (picked || reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % tabs.length), 3500);
    return () => clearTimeout(t);
  }, [i, picked, reduce, tabs.length]);

  return (
    <div className="mt-7">
      <div role="tablist" aria-label={label} className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/12 bg-white/[0.05] p-1 backdrop-blur [scrollbar-width:none] sm:inline-flex">
        {tabs.map((tab, k) => {
          const on = k === i;
          return (
            <button
              key={tab.t}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="website-kind"
              onClick={() => {
                setI(k);
                setPicked(true);
              }}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] sm:px-4 sm:text-[13.5px] font-medium transition-colors sm:px-4 ${on ? "text-ink" : "text-white/65 hover:text-white"}`}
            >
              {on && <motion.span layoutId={`tab-${label}`} className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{tab.t}</span>
            </button>
          );
        })}
      </div>
      <div id="website-kind" role="tabpanel" className="mt-4 min-h-[3.5rem] max-w-[46ch]">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            className="text-[16.5px] leading-relaxed text-white/70"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {tabs[i].d}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
