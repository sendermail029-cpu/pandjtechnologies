"use client";

import { TwistLines } from "./TwistLines";
import { GlobeOrbit } from "./HeroKit";
import { LookingEyes } from "./LookingEyes";

// Careers hero: deep navy like the footer, over a twisting ribbon of fine lines in brand blues
export function CareersHero({ apply }: { jobCount?: number; apply: string }) {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-[#060d18] px-6 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:min-h-[calc(100svh-73px)] lg:justify-center lg:pb-16">
      <div className="absolute inset-0 -z-10">
        {/* drifting cobalt glows and a faint grid, like the footer */}
        <div aria-hidden className="footer-glow absolute -left-32 bottom-0 h-[460px] w-[460px] rounded-full bg-cobalt/40 blur-3xl" />
        <div aria-hidden className="footer-glow absolute right-[12%] top-[15%] h-[420px] w-[420px] rounded-full bg-[#7c3aed]/20 blur-3xl [animation-delay:-9s]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
        {/* twisting ribbon of hairlines in brand blues, softly behind the whole hero */}
        <TwistLines className="absolute inset-0 opacity-60" centreY={0.52} thickness={0.24} />
        {/* keep the text side readable; the top matches the navy header so there is no seam */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060d18]/80 via-[#060d18]/30 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060d18] to-transparent" />
      </div>

      {/* desktop: the revolving globe on the right */}
      <GlobeOrbit spin className="absolute right-[4%] top-1/2 hidden h-[min(520px,70vh)] w-[min(520px,70vh)] -translate-y-1/2 lg:block xl:right-[8%]" />

      <div className="pointer-events-none mx-auto w-full max-w-[83rem] [&_a]:pointer-events-auto">
        <div className="min-w-0 max-w-2xl">
          {/* phones and tablets: the globe sits above the heading */}
          <GlobeOrbit spin className="relative mx-auto mb-6 h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:hidden" />
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-[clamp(2.3rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            <span className="sr-only">Looking for your next big step?</span>
            <span aria-hidden>
              L<LookingEyes />king for your{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-sky via-[#a78bfa] to-[#5eead4] bg-clip-text text-transparent">next big step?</span>
            </span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
            Join a growing team in Vijayawada and Hyderabad building websites, apps, business software and digital campaigns
            for clients across India.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a
              href="#openings"
              className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-[14.5px] sm:h-14 sm:gap-2.5 sm:px-8 sm:text-[15.5px] font-semibold text-ink shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] sm:w-auto"
            >
              See open positions
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="transition-transform group-hover:translate-y-0.5">
                <path d="M8 2v11M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </a>
            <a
              href={apply}
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-4 text-[14.5px] sm:h-14 sm:px-8 sm:text-[15.5px] font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              Send your CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
