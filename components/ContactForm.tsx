"use client";

import { useEffect, useState } from "react";
import { company, services } from "@/lib/site";
import { EnquirySent } from "./EnquirySent";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

// underlined, boxless fields
const label = "text-[14px] font-semibold text-ink";
const line =
  "mt-2 w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-1 text-[16px] text-ink transition placeholder:text-slate/55 focus:border-cobalt focus:shadow-[0_1px_0_0_var(--color-cobalt)] focus:outline-none focus:ring-0";

export function ContactForm() {
  // the service picked on a service page arrives as ?service=… (read here, so the page itself can be pre-built)
  const [defaultService, setDefaultService] = useState("");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service") ?? "";
    if (services.some((x) => x.slug === q)) setDefaultService(q);
  }, []);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [sender, setSender] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const serviceName = services.find((s) => s.slug === data.service)?.name ?? "General enquiry";
    data.service = serviceName;
    setSender(data.name ?? "");
    setDraft(
      `Hi P & J Technologies, I'm ${data.name}${data.company ? ` from ${data.company}` : ""}. ` +
        `I'm interested in ${serviceName}. ${data.message} — Phone: ${data.phone}`
    );
    setStatus("sending");
    setError("");
    try {
      // sent straight to Formspree, which emails it to our inbox
      const res = await fetch(company.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `New enquiry: ${serviceName} — ${data.name}` }),
      });
      if (res.ok) return setStatus("sent");
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 || res.status === 400) {
        setError(json.errors?.[0]?.message ?? "Check the highlighted fields and try again.");
        return setStatus("error");
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return <EnquirySent name={sender} onReset={() => setStatus("idle")} />;
  }

  if (status === "fallback") {
    return (
      <div className="rounded-[24px] border border-line bg-white p-10">
        <h3 className="text-[24px] font-semibold tracking-tight">Send your enquiry directly</h3>
        <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-slate">
          Your message is ready. Send it on WhatsApp or by email and our team will reply within one working day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(draft)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1fa855] px-5 py-3 text-[15px] font-semibold text-white"
          >
            Send on WhatsApp
          </a>
          <a
            href={`mailto:${company.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(draft)}`}
            className="rounded-full border border-line px-5 py-3 text-[15px] font-semibold"
          >
            Send by email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" required autoComplete="name" className={line} placeholder="Your full name" />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" className={line} placeholder="+91" />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>
            Email
          </span>
          <input name="email" required type="email" autoComplete="email" className={line} placeholder="you@company.com" />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Your project</span>
          <textarea name="message" required rows={3} className={`${line} resize-none`} placeholder="What do you need, and by when?" />
        </label>
        <input type="hidden" name="service" value={defaultService} />
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>

      {status === "error" && <p className="mt-4 text-[15px] font-medium text-[#b42318]" role="alert">{error}</p>}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0e9aa6] via-cobalt to-[#1c36ab] px-8 text-[15.5px] font-semibold text-white shadow-lg shadow-cobalt/25 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="transition-transform group-hover:translate-x-1">
            <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
        <p className="text-[14px] text-slate">We reply within 24 hours on working days.</p>
      </div>
    </form>
  );
}
