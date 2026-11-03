"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ApplyForm } from "./ApplyForm";
import type { Job } from "@/lib/jobs";

const meta = (j: Job) =>
  [
    { v: j.location, d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
    { v: j.type, d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" },
    { v: j.experience, d: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" },
  ].filter((m) => m.v);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="text-[16px] font-semibold tracking-tight text-ink">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((it) => (
      <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
        {it}
      </li>
    ))}
  </ul>
);

const Tags = ({ items, tone }: { items: string[]; tone: string }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((t) => (
      <li key={t} className={`rounded-full border px-3 py-1.5 text-[13.5px] font-medium ${tone}`}>
        {t}
      </li>
    ))}
  </ul>
);

const longDate = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// A job listing that opens in place: the full description first, then the application form, all on the careers page
export function JobCard({ job, posted }: { job: Job; posted: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);
  const panelId = `job-${job.id}`;
  const closes = job.closesAt ? longDate(job.closesAt) : "";
  // the right-hand column only appears when there is something to put in it
  const side = !!job.skills?.length || !!job.niceToHave?.length || !!closes;

  const toggle = () => setOpen((v) => !v);
  const apply = () => {
    setOpen(true);
    // once the panel has opened, bring the form into view
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), open ? 0 : 380);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border bg-white transition duration-300 ${
        open ? "border-cobalt/30 shadow-xl shadow-ink/10" : "border-line hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-xl hover:shadow-ink/10"
      }`}
    >
      {/* accent bar: slides in on hover, stays while open */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-cobalt to-sky transition-transform duration-300 ${open ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`}
      />

      {/* summary row */}
      <div className="flex flex-col gap-5 p-5 sm:p-8 md:flex-row md:items-center md:gap-6">
        <span aria-hidden className={`hidden h-14 w-14 shrink-0 place-items-center rounded-2xl transition sm:grid ${open ? "bg-cobalt text-white" : "bg-[#e6edff] text-cobalt group-hover:bg-cobalt group-hover:text-white"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="w-full text-[19px] font-semibold leading-snug tracking-tight sm:w-auto sm:text-[23px]">
              <button type="button" onClick={toggle} aria-expanded={open} aria-controls={panelId} className="text-left transition-colors hover:text-cobalt">
                {job.title}
              </button>
            </h3>
            <span className="text-[13px] text-slate">
              <span className="hidden sm:inline">· </span>Posted {posted}
            </span>
            {job.massHiring && (
              <span className="rounded-full bg-[#fff1dc] px-2.5 py-0.5 text-[12px] font-semibold text-[#c2620a]">Mass hiring</span>
            )}
            {closes && <span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-semibold text-ink-2">Apply by {closes}</span>}
          </div>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-slate sm:text-[15.5px]">{job.summary}</p>
          <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2 text-[13.5px] font-medium text-ink-2 sm:mt-4 sm:gap-x-5 sm:text-[14px]">
            {meta(job).map((m) => (
              <li key={m.v} className="inline-flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-cobalt" aria-hidden>
                  <path d={m.d} />
                </svg>
                {m.v}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2.5 border-t border-line pt-4 sm:flex sm:items-center sm:gap-3 sm:self-start sm:border-0 sm:pt-0 md:self-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line px-4 py-3 text-[14.5px] font-semibold text-ink-2 transition-colors hover:text-cobalt sm:border-0"
          >
            {open ? "Hide details" : "View details"}
            <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
              <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={apply}
            className="group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-cobalt sm:px-6 sm:text-[15px]"
          >
            Apply now
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="transition-transform group-hover/btn:translate-x-1">
              <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>

      {/* details and application, opened in place */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-6 pb-8 pt-8 sm:px-8">
              {/* job overview, the way large companies list it */}
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { k: "Location", v: job.location },
                  { k: "Employment type", v: job.type },
                  { k: "Experience", v: job.experience || "Not specified" },
                  { k: "Qualification", v: job.qualification || "Any graduate" },
                  { k: "Salary", v: job.salary || "Not disclosed" },
                  { k: "Openings", v: String(job.openings ?? 1) },
                ].map((f) => (
                  <div key={f.k} className="bg-white px-4 py-3.5">
                    <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-slate">{f.k}</dt>
                    <dd className="mt-1 text-[14.5px] font-semibold text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>

              <div className={`mt-8 grid gap-10 ${side ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
                <div className="space-y-8">
                  <Section title="Job description">
                    <p className="text-[15.5px] leading-relaxed text-ink-2">{job.summary}</p>
                  </Section>
                  {job.responsibilities.length > 0 && (
                    <Section title="Key responsibilities">
                      <Bullets items={job.responsibilities} />
                    </Section>
                  )}
                  {job.requirements.length > 0 && (
                    <Section title="Requirements">
                      <Bullets items={job.requirements} />
                    </Section>
                  )}
                </div>

                {side && (
                  <div className="space-y-8">
                    {!!job.skills?.length && (
                      <Section title="Required skills">
                        <Tags items={job.skills} tone="border-cobalt/20 bg-[#eef3ff] text-cobalt" />
                      </Section>
                    )}
                    {!!job.niceToHave?.length && (
                      <Section title="Good to have">
                        <Tags items={job.niceToHave} tone="border-line bg-white text-ink-2" />
                      </Section>
                    )}
                    {closes && (
                      <div className="rounded-2xl border border-saffron/30 bg-[#fff6ea] p-4 text-[14px] text-ink-2">
                        <span className="font-semibold text-ink">Last date to apply:</span> {closes}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div ref={formRef} className="mt-10 scroll-mt-6 rounded-3xl bg-paper p-6 sm:p-8">
                <h4 className="text-[20px] font-semibold tracking-tight">Apply for this role</h4>
                <p className="mt-1 text-[14.5px] text-slate">Takes about 2 minutes. Fields marked * are required.</p>
                <div className="mt-6">
                  <ApplyForm jobId={job.id} jobTitle={job.title} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
