"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppScene, CodeScene, CrmScene, ErpScene, MarketingScene } from "./ServicesHub";

const ease = [0.22, 1, 0.36, 1] as const;

const scenes: Record<string, { scene: () => ReactNode; title: string }> = {
  "app-development": { scene: AppScene, title: "your-app · preview" },
  "crm-software": { scene: CrmScene, title: "sales pipeline" },
  "erp-software": { scene: ErpScene, title: "operations dashboard" },
  "custom-software": { scene: CodeScene, title: "your-system.ts" },
  "digital-marketing": { scene: MarketingScene, title: "campaign results" },
};

const spots = ["left-[-4%] top-[16%]", "right-[-4%] top-[0%]", "bottom-[2%] left-[4%]"];

// The hero picture for a service: a large window playing that service's looping animation, with feature tags around it
export function ServiceHeroVisual({ slug, tags }: { slug: string; tags: { t: string; i: string }[] }) {
  const reduce = useReducedMotion();
  const s = scenes[slug];
  if (!s) return null;
  const Scene = s.scene;

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[600px] pb-10 pt-6">
      <div className="absolute inset-[10%] rounded-full bg-cobalt/40 blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1630] shadow-[0_40px_90px_-30px_rgba(30,192,242,0.55)]"
        initial={reduce ? false : { opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease }}
        style={{ transformPerspective: 1200 }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f1d3d] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-[#0b1630] px-3 font-mono text-[11px] text-white/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {s.title}
          </span>
        </div>
        <svg viewBox="0 0 200 130" className="block w-full">
          <Scene />
        </svg>
      </motion.div>

      {tags.map((tag, k) => (
        <motion.span
          key={tag.t}
          className={`float-icon absolute flex items-center gap-2 rounded-full border border-white/15 bg-[#0f1d3d]/90 px-3.5 py-2 text-[12.5px] font-medium text-white shadow-lg shadow-black/40 backdrop-blur ${spots[k % spots.length]}`}
          style={{ animationDelay: `${k * -1.3}s` }}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + k * 0.2, ease }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={tag.i} />
          </svg>
          {tag.t}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#34d399" strokeWidth="2.4">
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
