"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/site";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div role="tablist" aria-label="Our services" aria-orientation="vertical" className="border-t border-line">
        {services.map((svc, i) => {
          const selected = i === active;
          return (
            <button
              key={svc.slug}
              role="tab"
              id={`tab-${svc.slug}`}
              aria-selected={selected}
              aria-controls="service-panel"
              onClick={() => {
                setActive(i);
                if (window.matchMedia("(max-width: 1023px)").matches) {
                  requestAnimationFrame(() =>
                    document.getElementById("service-panel")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  );
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setActive((active + 1) % services.length);
                if (e.key === "ArrowUp") setActive((active - 1 + services.length) % services.length);
              }}
              className={`group relative flex w-full items-start justify-between gap-6 border-b border-line py-5 text-left transition-colors ${
                selected ? "text-ink" : "text-slate hover:text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`absolute -left-4 top-5 bottom-5 w-[3px] rounded-full bg-cobalt transition-opacity lg:-left-6 ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
              />
              <span>
                <span className="block text-[19px] font-semibold tracking-tight sm:text-[21px]">{svc.name}</span>
                <span className={`mt-1 block text-[15px] leading-snug ${selected ? "text-slate" : "text-slate/80"}`}>
                  {svc.short}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`tab-${s.slug}`}
        key={s.slug}
        className="scroll-mt-24 rounded-[24px] border border-line bg-white p-7 sm:p-10 lg:sticky lg:top-8 lg:self-start"
      >
        <h3 className="text-[26px] font-semibold leading-tight tracking-tight">{s.name}</h3>
        <p className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-slate">{s.summary}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="text-[15px] font-semibold">What changes for you</h4>
            <ul className="mt-3 space-y-3">
              {s.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                  <svg className="mt-[3px] shrink-0 text-cobalt" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[15px] font-semibold">What we deliver</h4>
            <ul className="mt-3 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-9 grid gap-5 border-t border-line pt-6 text-[14.5px] sm:grid-cols-3">
          <div>
            <dt className="text-slate">Typical timeline</dt>
            <dd className="mt-1 font-semibold">{s.timeline}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate">Technology</dt>
            <dd className="mt-1 font-semibold">{s.stack.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/services/${s.slug}`}
            className="rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-ink-2"
          >
            Explore {s.name.split(" —")[0].toLowerCase()}
          </Link>
          <Link
            href={`/contact?service=${s.slug}`}
            className="rounded-full border border-line px-5 py-3 text-[15px] font-semibold hover:border-ink"
          >
            Get a proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
