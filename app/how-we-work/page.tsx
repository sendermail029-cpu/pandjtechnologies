import type { Metadata } from "next";
import { commitments, process } from "@/lib/site";
import { ToolsWall } from "@/components/ToolsWall";
import { ProcessPipeline } from "@/components/ProcessPipeline";
import { CommitmentsContract } from "@/components/CommitmentsContract";
import WaveGrid from "@/components/originkit/ui/wave-grid";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export const metadata: Metadata = {
  title: "How we work",
  description:
    "A five-stage delivery process and four written commitments behind every P & J Technologies project.",
};

export default function HowWeWorkPage() {
  return (
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[400px] items-end overflow-hidden bg-[#060d18] px-6 pb-16 pt-24 sm:min-h-[460px] sm:pb-20 sm:pt-32">
        {/* 3D field of blocks rippling in waves (it also ripples under the pointer) */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0">
            <WaveGrid base="#2747d6" crest="#38bdf8" grid={18} gap={2} amplitude={14} waveSpeed={6} tilt={12} style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }} />
          </div>
          {/* keep the heading readable and the top seamless with the navy header */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060d18]/90 via-[#060d18]/40 via-40% to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060d18] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060d18]/70 to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-[83rem]">
          <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
            <span aria-hidden className="h-px w-8 bg-sky/50" />
            How we work
          </p>
          <h1 data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-[20ch] text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
            A delivery process you can{" "}
            <span className={`${serif.className} whitespace-nowrap tracking-normal text-sky`}>see every week.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-white/60">
            Five stages, the same for a website or a 20-week ERP rollout. You always know which stage you&apos;re in and what comes next.
          </p>
        </div>
      </section>

      {/* the five stages */}
      <section className="relative isolate overflow-hidden bg-[#f5f7fc] px-6 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(39_71_214/0.09)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cobalt">
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Our process
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                Five stages, <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>zero surprises.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16.5px] leading-relaxed text-slate lg:justify-self-end">
              Every project moves through the same pipeline. Select a stage to see exactly what happens in it.
            </p>
          </div>
          <ProcessPipeline stages={process} />
        </div>
      </section>

      {/* written commitments, shown as the agreement itself */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-14 text-white sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto grid max-w-[83rem] items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              Our standards
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              The standards we hold ourselves to, <span className={`${serif.className} whitespace-nowrap tracking-normal text-sky`}>in writing.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-white/65">
              Trust is built in the contract, not the brochure. These four commitments are part of every engagement we sign.
            </p>
            <ul data-aos="fade-up" data-aos-delay="200" className="mt-8 flex flex-wrap gap-2">
              {["Fixed scope", "Your code, your accounts", "One point of contact", "Data protected"].map((t) => (
                <li key={t} className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-white/80">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <CommitmentsContract items={commitments} />
        </div>
      </section>

      <ToolsWall />

    </>
  );
}
