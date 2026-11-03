"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// the seven service colours from the P & J logo
const dots = ["#0090a8", "#0060a8", "#006030", "#ffc030", "#004878", "#f07818", "#ffa830"];

// Between pages: a navy panel sweeps up, the P & J mark appears in its turning ring with the services orbiting it,
// then the panel lifts away once the next page is in place.
export function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const shownAt = useRef(0);
  const target = useRef<string | null>(null);

  // start on any click to another page of this site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return;
      target.current = url.pathname;
      shownAt.current = performance.now();
      setShow(true);
    };
    // capture phase: Next.js links cancel the native click before it would bubble up
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // finish once the new page is showing, after the loader has played for 1 second
  useEffect(() => {
    if (!show) return;
    if (target.current && pathname !== target.current) return;
    const wait = Math.max(0, 1000 - (performance.now() - shownAt.current));
    const t = setTimeout(() => {
      setShow(false);
      target.current = null;
    }, wait);
    return () => clearTimeout(t);
  }, [pathname, show]);

  // never get stuck if a navigation is cancelled
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(t);
  }, [show]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-transition"
          aria-hidden
          className="pointer-events-auto fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#060d18]"
          initial={{ clipPath: "inset(100% 0% 0% 0% round 40px 40px 0 0)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px 0px 0 0)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0% round 0 0 40px 40px)" }}
          transition={{ duration: 0.55, ease }}
        >
          {/* grid and glows, like the heroes */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt/25 blur-3xl" />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-36 w-36 sm:h-44 sm:w-44">
              {/* the services, orbiting */}
              <div className="orbit-spin absolute inset-0 [animation-duration:2.4s]">
                {dots.map((c, k) => {
                  const a = (k / dots.length) * Math.PI * 2;
                  return (
                    <span
                      key={c}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ left: `${50 + Math.cos(a) * 48}%`, top: `${50 + Math.sin(a) * 48}%`, background: c, boxShadow: `0 0 12px ${c}` }}
                    />
                  );
                })}
              </div>
              {/* turning gradient ring and the mark */}
              <div className="orbit-spin absolute inset-[20%] rounded-full bg-[conic-gradient(from_0deg,#0090a8,#0060a8,#006030,#ffc030,#f07818,#ffa830,#0090a8)] blur-[1px] [animation-duration:1.6s]" />
              <div className="absolute inset-[23%] rounded-full bg-[#060d18]" />
              <div className="absolute inset-[27%] grid place-items-center rounded-full bg-white shadow-[0_0_50px_-4px_rgba(56,189,248,0.8)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="" className="h-[60%] w-[60%] object-contain" />
              </div>
            </div>
            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.32em] text-white/80">
              P <span className="text-[#ffa830]">&amp;</span> J Technologies
            </p>
            {/* loading bar in the logo colours */}
            <div className="mt-4 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full w-1/2 rounded-full bg-gradient-to-r from-[#0090a8] via-[#ffc030] to-[#f07818]"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
