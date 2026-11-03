import type { FaqItem } from "@/lib/site";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform group-open:rotate-45 group-open:border-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </summary>
          <p className="max-w-[68ch] pb-7 pr-12 text-[16px] leading-relaxed text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
