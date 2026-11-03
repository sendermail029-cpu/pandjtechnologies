"use client";

import { useState } from "react";
import { salaryRanges } from "@/lib/salary";

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10";
const label = "mb-1.5 block text-[14px] font-semibold text-ink-2";

export function ApplyForm({ jobId, jobTitle, onCancel }: { jobId: string; jobTitle: string; onCancel?: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
          <svg width="26" height="26" viewBox="0 0 16 16" aria-hidden>
            <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <h3 className="mt-5 text-[22px] font-semibold tracking-tight">Application sent</h3>
        <p className="mt-2 text-[15.5px] text-slate">
          Thanks for applying for {jobTitle}. Our team will review your CV and get in touch if it&apos;s a match.
        </p>
        {onCancel && (
          <button type="button" onClick={onCancel} className="mt-6 rounded-full bg-ink px-7 py-3 text-[15px] font-semibold text-white hover:bg-ink-2">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" encType="multipart/form-data">
      <input type="hidden" name="jobId" value={jobId} />
      {/* honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="sm:col-span-2">
        <label htmlFor="name" className={label}>Full name *</label>
        <input id="name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone *</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="link" className={label}>LinkedIn or portfolio</label>
        <input id="link" name="link" placeholder="https://" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="salary" className={label}>Expected salary *</label>
        <select id="salary" name="salary" required defaultValue="" className={input}>
          <option value="" disabled>
            Select a range (per year)
          </option>
          {salaryRanges.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="resume" className={label}>CV / resume * <span className="font-normal text-slate">(PDF or Word, max 4 MB)</span></label>
        <label
          htmlFor="resume"
          className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-line bg-paper px-5 py-5 transition hover:border-cobalt"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
            </svg>
          </span>
          <span className="text-[15px]">
            <span className="block font-semibold">{fileName || "Choose a file"}</span>
            <span className="text-slate">{fileName ? "Click to change" : "Click to browse"}</span>
          </span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          className="sr-only"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Why this role?</label>
        <textarea id="message" name="message" rows={4} placeholder="A few lines about you and the work you enjoy" className={input} />
      </div>
      <div className="space-y-3 sm:col-span-2">
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">{error}</p>}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={status === "sending"}
              className="rounded-full border border-line bg-white px-8 py-4 text-[15px] font-semibold text-ink transition hover:border-ink disabled:opacity-60"
            >
              Cancel
            </button>
          )}
          <button
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-footer-from to-footer-to px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-ink/25 transition hover:brightness-150 disabled:opacity-60"
          >
            {status === "sending" ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
