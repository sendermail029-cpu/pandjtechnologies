"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { accents } from "@/lib/accents";

export type Feature = { t: string; d: string; i: string };

// glow colour behind each card's icon, in the same order as the accents
const glows = ["bg-cobalt/30", "bg-saffron/35", "bg-[#8b5cf6]/30", "bg-[#10b981]/30"];
const rings = ["border-cobalt/40", "border-[#c2620a]/40", "border-[#6d28d9]/40", "border-[#047857]/40"];

// Animated feature cards: spring in one after another, tilt in 3D under the pointer, icon with a turning ring
export function FeatureCards({ items }: { items: Feature[] }) {
  const reduce = useReducedMotion();

  return (
    <ul className="mt-10 grid gap-3 sm:mt-12 sm:gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f, i) => {
        const a = accents[i % accents.length];
        // cards 2 and 4 are deep blue with a moving light; 1 and 3 stay white
        const blue = i % 2 === 1;
        return (
          <motion.li
            key={f.t}
            initial={reduce ? false : { opacity: 0, y: 40, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.12 }}
          >
            <TiltCard className="rounded-3xl" max={7}>
              <div
                className={`group relative flex h-full items-start gap-5 overflow-hidden rounded-3xl p-5 transition-shadow sm:block sm:p-6 duration-300 ${
                  blue
                    ? "border border-white/10 bg-[#060d18] text-white shadow-lg shadow-ink/30 hover:shadow-2xl hover:shadow-ink/40"
                    : "border border-white bg-white shadow-sm hover:shadow-2xl hover:shadow-ink/10"
                }`}
              >
                {blue && !reduce && (
                  <>
                    {/* footer-style navy: faint grid and a slow cobalt glow */}
                    <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
                    <motion.span
                      aria-hidden
                      className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-cobalt/45 blur-3xl"
                      animate={{ x: [0, 70, 0], y: [0, -50, 0] }}
                      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                    />
                    {/* light that sweeps across now and then */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                      animate={{ x: ["0%", "400%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: 1 + i * 0.5 }}
                    />
                  </>
                )}
                {/* top stripe that sweeps across on hover */}
                <span aria-hidden className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.35] bg-gradient-to-r ${blue ? "from-sky to-saffron" : a.bar} transition-transform duration-500 group-hover:scale-x-100`} />
                {/* soft colour wash that rises on hover */}
                {!blue && <span aria-hidden className={`absolute -bottom-24 -right-16 h-48 w-48 rounded-full ${glows[i % glows.length]} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`} />}

                <span className="relative ml-1.5 mt-1.5 grid h-12 w-12 shrink-0 place-items-center sm:m-0 sm:h-14 sm:w-14">
                  <motion.span
                    aria-hidden
                    className={`absolute inset-[-6px] rounded-[20px] border border-dashed ${blue ? "border-sky/35" : rings[i % rings.length]}`}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.span
                    className={`relative grid h-12 w-12 place-items-center rounded-2xl sm:h-14 sm:w-14 ${blue ? "bg-sky/15 text-sky ring-1 ring-sky/30" : a.tag} transition duration-300 group-hover:scale-110`}
                    animate={reduce ? undefined : { y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <motion.path
                        d={f.i}
                        initial={reduce ? false : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 + i * 0.12 }}
                      />
                    </svg>
                  </motion.span>
                </span>

                <span className="relative block min-w-0 flex-1">
                <span className={`block font-mono sm:mt-6 text-[12px] font-semibold ${blue ? "text-white/60" : "text-slate/70"}`}>0{i + 1}</span>
                <h3 className="relative mt-1 text-[18px] font-semibold tracking-tight">{f.t}</h3>
                <p className={`relative mt-1.5 text-[14.5px] leading-relaxed ${blue ? "text-white/65" : "text-slate"}`}>{f.d}</p>
                </span>
              </div>
            </TiltCard>
          </motion.li>
        );
      })}
    </ul>
  );
}
