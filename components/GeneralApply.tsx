"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ApplyForm } from "./ApplyForm";

// "Don't see a role that fits?": opens a CV form in place, for applications not tied to an open job.
// Links to #send-cv (like the hero's "Send your CV") open it too.
export function GeneralApply() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#send-cv") setOpen(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  return (
    <div id="send-cv" className="mt-6 scroll-mt-8 overflow-hidden rounded-3xl bg-[#e6edff]">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[17px] font-semibold">Don&apos;t see a role that fits?</p>
          <p className="mt-1 text-[15px] text-slate">We hire as projects grow. Send your CV and we&apos;ll reach out when something matches.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="send-cv-form"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/15 bg-white px-6 py-3 text-[15px] font-semibold transition hover:border-ink sm:self-center"
        >
          {open ? "Close" : "Send your CV"}
          <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="send-cv-form"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-4 mb-4 rounded-2xl bg-white p-6 sm:mx-6 sm:mb-6 sm:p-8">
              <h3 className="text-[20px] font-semibold tracking-tight">Send us your CV</h3>
              <p className="mt-1 text-[14.5px] text-slate">Tell us the kind of role you&apos;re looking for in the message. Fields marked * are required.</p>
              <div className="mt-6">
                <ApplyForm jobId="general" jobTitle="a role at P & J Technologies" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
