import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { ContactForm } from "@/components/ContactForm";
import { LookingEyes } from "@/components/LookingEyes";
import { ConnectRow } from "@/components/ConnectRow";
import { ConnectMap } from "@/components/ConnectMap";
import { FadeIn, MaskLine, MotionProvider } from "@/components/Motion";
import { company, services } from "@/lib/site";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export const metadata: Metadata = {
  title: "Contact us",
  description: "Talk to P & J Technologies about your website, app, CRM, ERP, custom software or digital marketing project.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const defaultService = services.some((s) => s.slug === service) ? service : "";

  return (
    <MotionProvider>
      <section className="relative isolate overflow-hidden bg-[#060d18] text-white">
        {/* deep navy, like the footer: drifting cobalt glows and a faint grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
          <div className="footer-glow absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cobalt/40 blur-3xl" />
          <div className="footer-glow absolute right-[10%] top-[10%] h-[380px] w-[380px] rounded-full bg-cobalt/25 blur-3xl [animation-delay:-9s]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
          {/* top edge matches the navy header exactly, so there is no seam */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060d18] to-transparent" />
        </div>
        {/* dotted world map with arcs from our offices, on the right */}
        <FadeIn delay={0.3} className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[72%] items-start justify-end [mask-image:linear-gradient(to_right,transparent,black_35%),linear-gradient(to_bottom,transparent,black_22%)] [mask-composite:intersect] lg:flex">
          <ConnectMap id="contact-map-lg" className="h-auto w-full" />
        </FadeIn>
        {/* phones and tablets: the map fills the whole hero, edge to edge, with India in the upper middle */}
        <FadeIn delay={0.2} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden">
          <ConnectMap
            id="contact-map-sm"
            className="absolute -top-[24%] left-[62%] aspect-[199/100] h-[100%] w-auto max-w-none -translate-x-[73.6%] sm:h-[105%]"
          />
          {/* darken behind the heading so it stays readable, and settle into navy at the bottom */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_20%_70%,rgb(6_13_24/0.8),transparent_80%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-[#060d18]" />
          {/* soft edges: the dots fade in from the header and the sides instead of stopping in a hard line */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060d18] via-[#060d18]/70 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#060d18]/80 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#060d18]/80 to-transparent" />
        </FadeIn>
        <div className="mx-auto flex max-w-[83rem] flex-col justify-center px-6 pb-8 pt-[40vw] sm:pb-10 sm:pt-[30vw] lg:min-h-[470px] lg:py-16">
          <FadeIn x={-16} y={0}>
            <p className="flex items-center gap-3 font-mono text-[11.5px] lg:justify-start uppercase tracking-[0.22em] text-white/60 sm:text-[13px] sm:tracking-[0.25em]">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-saffron" aria-hidden />
              Talk to P &amp; J Technologies
            </p>
          </FadeIn>
          <div className="relative mt-6 sm:mt-8">
            <h1 className="text-[clamp(3rem,13vw,9.5rem)] font-bold leading-[0.92] tracking-[-0.055em] lg:text-[clamp(4.5rem,7.8vw,8rem)]">
              <MaskLine delay={0.1} className="text-white/40">
                Got a project?
              </MaskLine>
              <span className="sr-only">Let&apos;s look.</span>
              <MaskLine delay={0.25} className="text-white">
                <span aria-hidden>
                  Let&apos;s l<LookingEyes />k.
                </span>
              </MaskLine>
            </h1>
            <FadeIn delay={0.3} className="lg:hidden">
              <p className="mt-5 max-w-[34ch] text-[15.5px] leading-relaxed text-white/65">
                From Vijayawada to the world. Tell us what you need and we&apos;ll reply within 24 hours.
              </p>
            </FadeIn>
            {/* phones and tablets: quick actions */}
            <FadeIn delay={0.35} className="mt-7 grid max-w-md grid-cols-2 gap-3 lg:hidden">
              <a
                href="#enquiry-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[14.5px] font-semibold text-ink shadow-lg shadow-black/20"
              >
                Send enquiry <span aria-hidden>↓</span>
              </a>
              <a
                href={`tel:${company.phones[0].tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-3 text-[14.5px] font-semibold text-white backdrop-blur"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
                Call us
              </a>
            </FadeIn>
          </div>

        </div>
      </section>

      <section id="enquiry" className="relative scroll-mt-8 bg-white px-6 pb-20 pt-8 sm:pb-24 sm:pt-10">
        <div className="mx-auto max-w-[83rem]">
          <div className="px-2 pb-6 pt-6 text-center sm:pb-10">
            <FadeIn inView>
              <p className="inline-flex items-center gap-2 rounded-full border border-cobalt/15 bg-white/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-cobalt shadow-sm backdrop-blur">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <g className="globe-turn">
                    <ellipse cx="12" cy="12" rx="4" ry="9" />
                  </g>
                  <path d="M3.5 9h17M3.5 15h17" />
                </svg>
                Worldwide
              </p>
              <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.3rem,5vw,4rem)] lg:max-w-none font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
                We deliver{" "}
                <span className={`${serif.className} bg-gradient-to-r from-cobalt to-sky bg-clip-text pr-2 font-medium italic tracking-normal text-transparent`}>
                  all over the world.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-[60ch] text-[17px] leading-relaxed text-slate">
                For projects, queries and anything else, email us or send the form below.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <span className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-[14px] sm:inline-flex text-white/80 shadow-lg shadow-ink/15">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Reply within <span className="font-semibold text-white">24 hours</span> on working days
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[14px] text-ink-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron" aria-hidden>
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  <span className="font-semibold text-ink">{company.offices.map((o) => o.city).join(" · ")}</span>
                </span>
              </div>
            </FadeIn>
          </div>
          <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* contact details: after the form on phones, beside it on desktop */}
            <FadeIn inView x={-30} y={0} className="order-2 min-w-0 lg:order-1">
              {/* direct lines: a plain list with hairlines */}
              <ul className="divide-y divide-line border-y border-line">
                {[
                  ...company.phones.map((p) => ({ k: p.label, v: p.number, href: `tel:${p.tel}`, d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" })),
                  { k: "Email", v: company.email, href: `mailto:${company.email}`, d: "M4 6h16v12H4zM4 7l8 6 8-6" },
                  ].map((r) => (
                  <li key={r.k}>
                    <a
                      href={r.href}
                        className="group flex items-center gap-4 py-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef3ff] text-cobalt ring-1 ring-cobalt/10 transition duration-300 group-hover:bg-cobalt group-hover:text-white group-hover:ring-cobalt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d={r.d} />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-slate">{r.k}</span>
                        <span className="mt-0.5 block break-all text-[15px] font-semibold text-ink transition-colors group-hover:text-cobalt sm:truncate sm:break-normal sm:text-[16px]">{r.v}</span>
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="shrink-0 -translate-x-1 text-cobalt opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              <ConnectRow className="mt-9" />
            </FadeIn>

            <FadeIn inView x={40} y={0} delay={0.1} className="order-1 min-w-0 lg:order-2">
              <div id="enquiry-form" className="scroll-mt-6">
                <ContactForm defaultService={defaultService} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </MotionProvider>
  );
}
