import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { process } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons, cloudIcons, moreToolIcons, toolIcons } from "@/lib/brand-icons";

const brands = [...brandIcons, ...cloudIcons, ...toolIcons, ...moreToolIcons];

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";

// tile colours for the four "what we build" cards
const tones = ["bg-[#e6edff] text-cobalt", "bg-[#f1ebff] text-[#7c3aed]", "bg-[#fff1dc] text-[#c2620a]", "bg-[#dcfce7] text-[#047857]"];

// Body of every service page: what we build, what's included, what changes for the business, technology and process
export function ServiceBody({ page, slug, outcomes, stack }: { page: ServicePage; slug: string; outcomes: string[]; stack: string[] }) {
  const { build, included } = page;
  return (
    <>
      {/* what we build */}
      <section className="bg-[#f5f7fc] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                {build.label}
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                {build.plain} <span className={`${serif.className} tracking-normal text-cobalt`}>{build.accent}</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16.5px] leading-relaxed text-slate lg:justify-self-end">
              {build.intro}
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {build.items.map((k, i) => (
              <li
                key={k.t}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group rounded-3xl border border-line bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                {(() => {
                  const brand = k.logo ? brands.find((x) => x.title === k.logo) : undefined;
                  return brand ? (
                    // the real brand logo, on a white tile
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white shadow-sm transition group-hover:scale-110">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill={brand.color} aria-label={brand.title} role="img">
                        <path d={brand.path} />
                      </svg>
                    </span>
                  ) : (
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[i % tones.length]} transition group-hover:scale-110`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d={k.i} />
                      </svg>
                    </span>
                  );
                })()}
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">{k.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{k.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* what's included: laid out like the scope section of a proposal */}
      <section id="included" className="scroll-mt-8 border-y border-line bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p data-aos="fade-up" className="text-[13px] font-semibold uppercase tracking-[0.16em] text-cobalt">What&apos;s included</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              {included.plain} {included.accent}
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-slate">
              {included.intro}
            </p>
            <div data-aos="fade-up" data-aos-delay="200" className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <Link
                href={`/contact?service=${slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-cobalt"
              >
                Get a proposal <span aria-hidden>→</span>
              </Link>
              <span className="text-[14px] text-slate">Written scope and fixed price before we start.</span>
            </div>
          </div>

          <ol className="border-t border-line">
            {included.items.map((b, i) => (
              <li key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60} className="grid grid-cols-[2.5rem_1fr_auto] gap-4 border-b border-line py-6 sm:gap-6">
                <span className="pt-0.5 font-mono text-[13px] text-slate">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[17px] font-semibold tracking-tight text-ink">{b.t}</span>
                  <span className="mt-1.5 block max-w-[60ch] text-[15px] leading-relaxed text-slate">{b.d}</span>
                </span>
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600" aria-label="Included">
                  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* results and technology */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              The results
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              What changes for <span className={`${serif.className} tracking-normal text-cobalt`}>your business.</span>
            </h2>
            <ul className="mt-8 space-y-3">
              {outcomes.map((o, i) => (
                <li key={o} data-aos="fade-up" data-aos-delay={i * 80} className="flex items-start gap-4 rounded-2xl border border-line bg-[#f7f9ff] p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                    </svg>
                  </span>
                  <span className="pt-1 text-[16px] leading-snug text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-24">
            <div data-aos="fade-up" className="rounded-3xl border border-line bg-[#f7f9ff] p-7 sm:p-8">
              <h3 className="text-[18px] font-semibold tracking-tight text-ink">Technology we use</h3>
              <p className="mt-1.5 text-[14.5px] text-slate">Modern, proven tools chosen for speed, security and easy updates.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?service=${slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-cobalt"
              >
                Get a proposal <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* how the project runs: a simple timeline */}
      <section className="bg-[#f5f7fc] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className="text-[13px] font-semibold uppercase tracking-[0.16em] text-cobalt">Our process</p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                How the project runs
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              Five clear stages, the same for every project, so you always know where things stand.
            </p>
          </div>

          <ol className="mt-12 grid gap-0 md:grid-cols-5 md:gap-8">
            {process.map((p, i) => (
              <li key={p.name} data-aos="fade-up" data-aos-delay={i * 80} className="relative flex gap-5 pb-8 md:block md:pb-0">
                {/* the line: down the left on phones, across the top on wider screens */}
                {i < process.length - 1 && (
                  <span aria-hidden className="absolute left-[15px] top-8 h-full w-px bg-cobalt/20 md:left-8 md:top-[15px] md:h-px md:w-[calc(100%+2rem)]" />
                )}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-cobalt bg-white font-mono text-[12px] font-semibold text-cobalt">
                  {i + 1}
                </span>
                <span className="block md:mt-6">
                  <span className="block font-mono text-[11.5px] uppercase tracking-[0.16em] text-slate">Stage {String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1.5 block text-[17px] font-semibold tracking-tight text-ink">{p.name}</span>
                  <span className="mt-2 block text-[14.5px] leading-relaxed text-slate">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
