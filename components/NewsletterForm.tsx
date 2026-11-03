"use client";

import { useState } from "react";

// Footer newsletter: email + Subscribe, with an inline thank-you
export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState(json.already ? "already" : "done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("idle");
    }
  }

  if (state === "done" || state === "already") {
    return (
      <p role="status" className="mt-5 flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-[14px] text-emerald-300">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
        {state === "done" ? "You're subscribed. Thank you!" : "You're already on the list."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5">
      {/* honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex rounded-full border border-white/15 bg-white/[0.06] p-1 focus-within:border-sky/60">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-4 text-[14.5px] text-white outline-none placeholder:text-white/40"
        />
        <button
          disabled={state === "sending"}
          className="shrink-0 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:bg-[#e0f2fe] disabled:opacity-60"
        >
          {state === "sending" ? "…" : "Subscribe"}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-[13px] text-red-300">{error}</p>}
    </form>
  );
}
