import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/site";

const promises = ["Reply within one working day", "Fixed-price written proposal", "You own everything we build"];

export function CtaBand({
  title = "Tell us what you want to build.",
  text = "A 30-minute call with our team, then a written proposal with scope, timeline and price within three working days.",
}: {
  title?: string;
  text?: string;
}) {
  const phone = company.phones[0];

  return (
    <section className="px-6 py-20 sm:py-24">
      <div
        data-aos="fade-up"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-footer-from to-footer-to text-white shadow-[0_40px_80px_-40px_rgba(0,10,46,0.7)]"
      >
        {/* decoration: fine grid, a soft glow and the logo mark as a watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
        <Image
          src="/logo-mark.png"
          alt=""
          width={512}
          height={512}
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-10 hidden h-80 w-80 opacity-[0.07] lg:block"
        />

        <div className="relative grid gap-12 px-8 py-14 sm:px-14 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.25em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-saffron" aria-hidden />
              Let&apos;s talk
            </p>
            <h2 className="mt-5 max-w-[18ch] text-h2 font-semibold">{title}</h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/75">{text}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 text-ink transition-transform hover:-translate-y-0.5"
            >
              <span>
                <span className="block text-[16px] font-semibold">Start a project</span>
                <span className="block text-[13.5px] text-slate">Send us your requirements</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-[#25d366]">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.95 1.36-.5.06-1.13.09-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.37-.14-.19-1.17-1.56-1.17-2.98s.74-2.12 1.01-2.41c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.69-.17 1.37Z" />
                </svg>
                <span className="text-[15px] font-semibold">Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${phone.tel}`}
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="shrink-0 text-saffron">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />
                </svg>
                <span className="text-[15px] font-semibold tabular-nums">{phone.number}</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="relative flex flex-col gap-3 border-t border-white/10 px-8 py-6 text-[14px] text-white/70 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:px-14">
          {promises.map((p) => (
            <li key={p} className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0 text-sky">
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
