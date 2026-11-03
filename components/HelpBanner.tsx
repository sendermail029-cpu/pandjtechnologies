"use client";

import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/lib/site";

// "Still have a question?" banner for the FAQs: contact options on the left, a support chat window rising out of the card
export function HelpBanner() {
  const reduce = useReducedMotion();
  const support = company.phones.find((p) => p.label === "Support") ?? company.phones[0];
  const float = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay } };

  return (
    <section aria-labelledby="help-title" className="bg-paper px-6 pb-24 pt-16 sm:pt-24">
      <div
        data-aos="fade-up"
        className="relative mx-auto grid max-w-7xl items-end gap-10 rounded-[32px] bg-[#071a45] px-7 pb-10 pt-10 text-white shadow-2xl shadow-ink/25 sm:px-12 sm:pb-14 sm:pt-14 lg:grid-cols-[1fr_420px]"
      >
        {/* logo colours: teal-sky, saffron and navy blended into the card */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgb(20_184_196/0.5),transparent_60%),radial-gradient(ellipse_55%_70%_at_100%_100%,rgb(240_162_59/0.4),transparent_60%),radial-gradient(ellipse_60%_60%_at_70%_10%,rgb(39_71_214/0.6),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
        </div>

        <div className="relative max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden />
            We&apos;re here to help
          </p>
          <h2 id="help-title" className="mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-tight">
            Still have a{" "}
            <span className="bg-gradient-to-r from-[#5eead4] via-sky to-saffron bg-clip-text text-transparent">question?</span>
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-white/70">
            A senior team member replies, usually within one working day.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${company.email}`}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-7 text-[15.5px] font-semibold text-ink shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#e0f2fe]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
              Email us
            </a>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 text-[15.5px] font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.2 1.2z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
          <a href={`tel:${support.tel}`} className="mt-4 inline-block text-[14.5px] text-white/65 hover:text-white">
            or call {support.label.toLowerCase()} on <span className="font-semibold text-white">{support.number}</span>
          </a>
        </div>

        {/* support chat window, rising out of the top of the card */}
        <div aria-hidden className="relative hidden h-[280px] lg:block">
          <motion.div {...float(0)} className="absolute bottom-[-40px] left-1/2 w-[360px] -translate-x-1/2 [perspective:1200px]">
            <div className="overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)] [transform:rotateY(-12deg)_rotateX(6deg)]">
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#0e9aa6] via-cobalt to-[#1c36ab] px-5 py-4 text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="" className="h-9 w-9 rounded-xl bg-white object-contain p-1" />
                <div>
                  <p className="text-[14px] font-semibold">P &amp; J Support</p>
                  <p className="flex items-center gap-1.5 text-[11.5px] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Replies within a working day
                  </p>
                </div>
              </div>
              <div className="space-y-3 bg-gradient-to-b from-[#eef6ff] to-white px-5 pb-6 pt-5 text-[13px] leading-snug">
                <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-gradient-to-br from-cobalt to-[#1c36ab] px-3.5 py-2.5 text-white">
                  Can you add online payments to our website?
                </p>
                <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 shadow-md shadow-ink/10">
                  Yes — we integrate payment gateways, bookings and WhatsApp so enquiries reach your team straight away.
                </p>
                <p className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-md shadow-ink/10">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0e9aa6]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cobalt [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-saffron [animation-delay:300ms]" />
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...float(1.2)} className="absolute -left-20 top-[46%] z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl shadow-black/25">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#dff7f8] text-[#0e9aa6]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
            </span>
            <span>
              <span className="block text-[11.5px] font-semibold text-[#0e9aa6]">Email</span>
              <span className="block text-[13px] font-semibold">Senior team replies</span>
            </span>
          </motion.div>
          <motion.div {...float(2.4)} className="absolute -right-6 bottom-[-58px] z-10 flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-[13px] font-semibold text-ink shadow-xl shadow-black/25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
            {company.hours}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
