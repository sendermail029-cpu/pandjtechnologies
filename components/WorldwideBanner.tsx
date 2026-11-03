"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CareerGlobe } from "./CareerGlobe";
import { company } from "@/lib/site";

// "Wherever you are, we deliver": logo at the centre of a turning globe, ringed by orbits; message beside it
export function WorldwideBanner() {
  const reduce = useReducedMotion();
  const spin = (duration: number, dir = 1) =>
    reduce ? {} : { animate: { rotate: 360 * dir }, transition: { duration, repeat: Infinity, ease: "linear" as const } };

  return (
    <section aria-label="Worldwide projects" className="bg-paper px-6 pb-20 sm:pb-24">
      <div
        data-aos="fade-up"
        className="relative isolate mx-auto grid max-w-[83rem] items-center gap-10 overflow-hidden rounded-[32px] bg-[#071a45] p-7 text-white shadow-2xl shadow-ink/20 sm:p-10 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] lg:gap-14 lg:p-12"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_80%_at_0%_50%,rgb(20_184_196/0.35),transparent_60%),radial-gradient(ellipse_50%_70%_at_100%_100%,rgb(240_162_59/0.3),transparent_60%),radial-gradient(ellipse_60%_60%_at_60%_0%,rgb(39_71_214/0.5),transparent_65%)]" />

        {/* the emblem */}
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[300px] lg:max-w-[360px]">
          <div className="absolute inset-0 rounded-full border border-[#5eead4]/40" />
          <div className="absolute inset-[5%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,#0b2a66,#030c22)] shadow-[inset_0_0_60px_rgb(0_0_0/0.6)]">
            {/* the world turning behind the logo */}
            <div className="absolute inset-[-6%] opacity-80">
              <CareerGlobe />
            </div>
          </div>
          <motion.div {...spin(30)} className="absolute inset-[1%] rounded-full border-[1.5px] border-dashed border-sky/40">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_14px_rgb(30_192_242/0.9)]" />
          </motion.div>
          <div className="absolute inset-[-3%] [transform:rotateX(70deg)_rotateZ(-20deg)]">
            <motion.div {...spin(18, -1)} className="h-full w-full rounded-full border border-saffron/50">
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-saffron shadow-[0_0_14px_rgb(240_162_59/0.9)]" />
            </motion.div>
          </div>
          {/* logo in the middle */}
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28%] bg-white shadow-[0_0_0_8px_rgb(255_255_255/0.08),0_20px_50px_rgb(0_0_0/0.5)]"
            {...(reduce ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.webp" alt="" className="h-[68%] w-[68%] object-contain" />
          </motion.div>
        </div>

        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden />
            Worldwide
          </p>
          <h2 className="mt-5 text-[clamp(1.8rem,3.2vw,2.7rem)] font-semibold leading-[1.1] tracking-tight">
            Wherever you are,{" "}
            <span className="bg-gradient-to-r from-[#5eead4] via-sky to-saffron bg-clip-text text-transparent">we deliver.</span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/70">
            We work with businesses in every country, not just India. From {company.offices.map((o) => o.city).join(" and ")}, we
            plan, build and support projects worldwide, with the same process and accountability wherever you are.
          </p>
          <ul className="mt-6 grid max-w-xl gap-2.5 min-[480px]:grid-cols-2">
            {[
              { t: "Clients in every country", d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" },
              { t: "Any time zone", d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" },
              { t: "Weekly progress updates", d: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6" },
              { t: "One accountable team", d: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.4" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-[13.5px] font-medium text-white/85">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#5eead4]" aria-hidden>
                  <path d={x.d} />
                </svg>
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
