import { pearsonPath } from "@/lib/brand-icons";

// "Authorized test center for" strip with the three exam partners, shown in full
export function TestPartners({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[13px] sm:tracking-[0.16em]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cobalt" aria-hidden>
          <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
        </svg>
        Authorized test center for
      </span>
      <ul className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5">
        <li className="flex h-12 items-center justify-center gap-1 rounded-2xl bg-white px-1.5 shadow-md shadow-ink/[0.07] ring-1 ring-line sm:gap-2 sm:px-4">
          <svg viewBox="0 0 24 24" width="24" height="24" className="h-[18px] w-[18px] shrink-0 sm:h-6 sm:w-6" aria-hidden>
            <path d={pearsonPath} fill="#000" />
          </svg>
          <span className="whitespace-nowrap text-[11.5px] font-semibold text-ink min-[400px]:text-[12.5px] sm:text-[15px]">Pearson VUE</span>
        </li>
        <li className="flex h-12 items-center justify-center rounded-2xl bg-ink px-3 shadow-md shadow-ink/20 sm:px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/partners/psi.svg" alt="PSI" className="h-6 w-auto" />
        </li>
        <li className="flex h-12 items-center justify-center rounded-2xl bg-white px-2 shadow-md shadow-ink/[0.07] ring-1 ring-line sm:px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/partners/meazure-learning.svg" alt="Meazure Learning" className="h-auto max-h-7 w-full max-w-[110px] sm:h-7 sm:w-auto" />
        </li>
      </ul>
    </div>
  );
}
