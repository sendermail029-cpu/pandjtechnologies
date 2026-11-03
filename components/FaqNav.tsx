"use client";

import { useEffect, useRef, useState } from "react";

// Category menu for the FAQ page: highlights the section currently being read
export function FaqNav({ categories }: { categories: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const chips = useRef<HTMLUListElement>(null);

  // keep the current chip visible in the swipeable row
  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (row && chip && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  return (
    <nav aria-label="FAQ categories">
      {/* phones and tablets: a row of chips you can swipe */}
      <ul ref={chips} className="relative -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:hidden">
        {categories.map((c) => (
          <li key={c.id} data-id={c.id} className="shrink-0">
            <a
              href={`#${c.id}`}
              className={`block rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                active === c.id ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2"
              }`}
            >
              {c.title}
            </a>
          </li>
        ))}
      </ul>

      {/* desktop: a list that stays in view beside the questions */}
      <ul className="hidden border-l border-line lg:block">
        {categories.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={`-ml-px flex items-center justify-between gap-4 border-l-2 py-2.5 pl-5 pr-2 text-[15px] transition-colors ${
                active === c.id ? "border-cobalt font-semibold text-cobalt" : "border-transparent text-slate hover:text-ink"
              }`}
            >
              {c.title}
              <span className="text-[13px] tabular-nums text-slate/70">{c.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
