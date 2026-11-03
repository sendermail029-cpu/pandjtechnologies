"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

// Job alerts sign-up card: email on the left, a phone showing a new-role notification rising out of the card on the right
export function JobAlerts({ latestRole }: { latestRole?: string }) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/job-alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus(json.already ? "already" : "done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  const float = (delay: number) => (reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay } });

  return (
    <section aria-labelledby="alerts-title" className="bg-paper px-6 pb-24 pt-28 sm:pt-36">
      <div
        data-aos="fade-up"
        className="relative mx-auto grid max-w-[83rem] items-end gap-10 rounded-[32px] bg-[#071a45] px-7 pb-10 pt-10 text-white shadow-2xl shadow-ink/25 sm:px-12 sm:pb-14 sm:pt-14 lg:grid-cols-[1fr_440px]"
      >
        {/* soft light in the corners */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          {/* logo colours: teal-sky, saffron and navy blended into the card */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgb(20_184_196/0.55),transparent_60%),radial-gradient(ellipse_55%_70%_at_100%_100%,rgb(240_162_59/0.45),transparent_60%),radial-gradient(ellipse_60%_60%_at_70%_10%,rgb(39_71_214/0.6),transparent_65%)]" />
          <div className="footer-glow absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-[#14b8c4]/25 blur-3xl" />
          <div className="footer-glow absolute -bottom-24 right-[20%] h-72 w-72 rounded-full bg-saffron/25 blur-3xl [animation-delay:-6s]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
        </div>

        <div className="relative max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden />
            Job alerts
          </p>
          <h2 id="alerts-title" className="mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-tight">
            Be the first to hear about{" "}
            <span className="bg-gradient-to-r from-[#5eead4] via-sky to-saffron bg-clip-text text-transparent">new roles.</span>
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-white/70">
            Leave your email and we&apos;ll let you know when we post a new opening or a walk-in drive.
          </p>

          {status === "done" || status === "already" ? (
            <p role="status" className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-[15.5px] font-medium">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400 text-ink">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </span>
              {status === "done" ? "You're on the list — we'll email you about new roles." : "You're already on the list. We'll be in touch."}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label htmlFor="alert-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-3 border-b border-white/40 pb-3 transition-colors focus-within:border-white">
                <input
                  id="alert-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent py-2 text-[16px] text-white outline-none placeholder:text-white/55"
                />
                <button
                  disabled={status === "sending"}
                  aria-label="Sign up for job alerts"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#e0f2fe] disabled:opacity-60"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>
              {error && <p role="alert" className="mt-3 text-[14px] font-medium text-[#fecaca]">{error}</p>}
              <p className="mt-3 text-[13px] text-white/50">No spam — only new roles and walk-ins. Unsubscribe any time.</p>
            </form>
          )}
        </div>

        {/* the phone, rising out of the top of the card */}
        <div aria-hidden className="relative hidden h-[300px] lg:block">
          <motion.div {...float(0)} className="absolute bottom-[-56px] left-1/2 w-[250px] -translate-x-1/2 [perspective:1200px]">
            <div className="h-[470px] rounded-[44px] bg-gradient-to-b from-[#1e293b] to-[#0b1222] p-3 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6),inset_0_0_0_2px_rgb(255_255_255/0.08)] [transform:rotateY(-14deg)_rotateX(6deg)]">
              <div className="relative h-full overflow-hidden rounded-[34px] bg-gradient-to-b from-[#d5f5f6] via-[#eef3ff] to-[#fff4e6]">
                <div className="mx-auto mt-3 h-6 w-24 rounded-full bg-[#0b1222]" />
                <p className="mt-8 text-center text-[44px] font-semibold leading-none tracking-tight text-ink">9:41</p>
                <p className="mt-1 text-center text-[12px] font-medium text-slate">Monday</p>
                <div className="relative mx-3 mt-8 overflow-hidden rounded-2xl bg-white/90 p-3 pl-4 shadow-lg shadow-ink/10">
                  <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#14b8c4] to-saffron" />
                  <p className="flex items-center gap-2 text-[11px] font-semibold text-slate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-mark.webp" alt="" className="h-5 w-5 rounded-md bg-white object-contain p-0.5" />
                    P &amp; J Careers · now
                  </p>
                  <p className="mt-1.5 text-[13px] font-semibold text-ink">New role posted</p>
                  <p className="text-[12px] leading-snug text-slate">{latestRole ?? "A new opening is live — tap to apply."}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating notification chips */}
          <motion.div {...float(1.2)} className="absolute -left-6 top-8 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl shadow-black/25">
            <p className="text-[11.5px] font-semibold text-[#0e9aa6]">Walk-in drive</p>
            <p className="text-[13px] font-semibold">Announced here first</p>
          </motion.div>
          <motion.div {...float(2.4)} className="absolute -right-4 top-28 flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-[13px] font-semibold text-ink shadow-xl shadow-black/25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            Alerts on
          </motion.div>
        </div>
      </div>
    </section>
  );
}
