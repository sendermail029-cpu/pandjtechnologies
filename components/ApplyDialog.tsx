"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ApplyForm } from "./ApplyForm";

// "Apply now" button that opens the application form in a pop-up (Esc, Cancel or the backdrop closes it)
export function ApplyDialog({ jobId, jobTitle, className = "" }: { jobId: string; jobTitle: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  // render the pop-up on <body> so no page wrapper (transforms, stacking) can sit above it
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // move focus into the form
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1'])")?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className={className}>
        Apply now
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>

      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-footer-from via-cobalt to-sky" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-cobalt">Apply for</p>
                  <h2 id="apply-title" className="mt-1 text-[24px] font-semibold leading-tight tracking-tight">
                    {jobTitle}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-ink transition hover:bg-mist"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-6">
                <ApplyForm jobId={jobId} jobTitle={jobTitle} onCancel={() => setOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </>
  );
}
