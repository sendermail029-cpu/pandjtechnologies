import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ClientNetwork } from "@/components/ClientNetwork";
import { CountriesGlobe } from "@/components/CountriesGlobe";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { clientCountries } from "@/lib/client-countries";
import { pearsonPath } from "@/lib/brand-icons";
import { connection } from "next/server";
import { company, partnersText } from "@/lib/site";
import { getPublishedReviews } from "@/lib/reviews";
import { getClients } from "@/lib/clients";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export const metadata: Metadata = {
  title: "Clients",
  description: `Businesses that work with P & J Technologies, and our role as an authorized test center for ${partnersText}.`,
};

// a colour for each client's monogram tile
const tones = ["from-[#10b981] to-[#047857]", "from-[#1ec0f2] to-[#2747d6]", "from-[#f0a23b] to-[#c2620a]", "from-[#6d8bff] to-[#2747d6]"];
const initials = (name: string) =>
  name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const partners = [
  {
    name: "Pearson VUE",
    logo: (
      <span className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
          <path d={pearsonPath} fill="#000" />
        </svg>
        <span className="text-[19px] font-semibold tracking-tight text-ink">Pearson VUE</span>
      </span>
    ),
    panel: "bg-white",
  },
  // eslint-disable-next-line @next/next/no-img-element
  { name: "PSI", logo: <img src="/partners/psi.svg" alt="PSI" className="h-9 w-auto" />, panel: "bg-ink" },
  // eslint-disable-next-line @next/next/no-img-element
  { name: "Meazure Learning", logo: <img src="/partners/meazure-learning.svg" alt="Meazure Learning" className="h-9 w-auto" />, panel: "bg-white" },
];

const Stars = ({ n }: { n: number }) => (
  <span className="flex gap-0.5 text-saffron" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
      </svg>
    ))}
  </span>
);

export default async function ClientsPage() {
  // the client list is managed from the admin panel, so read it on every visit
  await connection();
  const [clients, reviews] = await Promise.all([getClients(), getPublishedReviews()]);
  // split into two rows that scroll in opposite directions
  const rows = [clients.filter((_, i) => i % 2 === 0), clients.filter((_, i) => i % 2 === 1)].filter((r) => r.length);

  return (
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[400px] items-end overflow-hidden bg-[#060d18] px-6 pb-16 pt-24 sm:min-h-[460px] sm:pb-20 sm:pt-32">
        {/* a network of connected nodes: the businesses we work with */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="footer-glow absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-cobalt/35 blur-3xl" />
          <div className="footer-glow absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full bg-saffron/10 blur-3xl [animation-delay:-9s]" />
          {/* dotted world map behind the network */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-[url(/world-dots.svg)] bg-contain bg-right bg-no-repeat opacity-90 [filter:brightness(1.6)_saturate(1.4)] [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:w-[78%]"
          />
          <ClientNetwork className="absolute inset-0 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d18]/85 via-[#060d18]/30 via-45% to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060d18] to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-[83rem]">
          <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
            <span aria-hidden className="h-px w-8 bg-sky/50" />
            Our clients
          </p>
          <h1 data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-[20ch] text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
            Trusted by businesses{" "}
            <span className={`${serif.className} whitespace-nowrap tracking-normal text-sky`}>across industries.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-[56ch] text-[16.5px] leading-relaxed text-white/60">
            As an authorized test center for {partnersText}, we work to strict standards of security, privacy and process, and we bring the
            same discipline to every website, app and system we build.
          </p>
        </div>
      </section>

      {/* clients */}
      <section className="relative isolate overflow-hidden bg-[#f5f7fc] py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(39_71_214/0.09)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="mx-auto max-w-[83rem] px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cobalt">
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Businesses we work with
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                Our <span className={`${serif.className} tracking-normal text-cobalt`}>clients.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16.5px] leading-relaxed text-slate lg:justify-self-end">
              From healthcare and education to fintech, travel and ministries, businesses rely on us for their websites, software and marketing.
            </p>
          </div>

          {/* headline figure, then the logos drifting past in rows */}
          <div data-aos="fade-up" className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-line py-6">
            <p className="flex items-baseline gap-3">
              <span className="text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-tight text-ink">200+</span>
              <span className="text-[15px] font-medium text-slate">projects delivered</span>
            </p>
            <span aria-hidden className="hidden h-10 w-px bg-line sm:block" />
            <p className="text-[15px] leading-relaxed text-slate">
              Businesses in healthcare, education, travel, real estate, fintech, media, fashion and more.
            </p>
          </div>
        </div>

        {/* the logo rows run edge to edge, in opposite directions; hovering pauses a row */}
        <div className="mt-10 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {rows.map((row, r) => (
            <div key={r} className="marquee overflow-hidden">
              <div className={`marquee-track flex w-max ${r % 2 ? "marquee-reverse" : ""}`} style={{ animationDuration: `${55 + r * 10}s` }}>
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-4 pr-4">
                    {row.map((c, i) => (
                      <li
                        key={c.id}
                        title={`${c.name} · ${c.sector}`}
                        className="group grid h-28 w-[200px] shrink-0 place-items-center rounded-2xl border border-line bg-white px-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10 sm:h-32 sm:w-[230px]"
                      >
                        {c.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={`/api/client-logo/${c.logo}`} alt={copy ? "" : `${c.name} logo`} className="max-h-20 max-w-full object-contain transition duration-300 group-hover:scale-105 sm:max-h-24" />
                        ) : (
                          <span className="flex flex-col items-center gap-2 text-center">
                            <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-[16px] font-bold text-white ${tones[i % tones.length]}`}>{initials(c.name)}</span>
                            <span className="text-[13px] font-semibold text-ink">{c.name}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-[83rem] px-6">
          <p data-aos="fade-up" className="mt-8 text-center text-[15px] text-slate">
            <b className="font-semibold text-ink">And many more businesses</b> across India and abroad.
          </p>

          {/* testing partners */}
          <p data-aos="fade-up" className="mt-14 flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-slate">
            <span aria-hidden className="h-px w-8 bg-ink/25" />
            Authorized testing partners
          </p>
          <ul className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-3">
            {partners.map((p, i) => (
              <li key={p.name} data-aos="fade-up" data-aos-delay={i * 100} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                <span className={`grid h-20 place-items-center border-b border-line sm:h-28 ${p.panel}`}>{p.logo}</span>
                <span className="flex items-center justify-between px-6 py-4">
                  <span className="text-[16px] font-semibold text-ink">{p.name}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                    <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                    </svg>
                    Authorized
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* reviews */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-14 text-white sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-saffron/10 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className="flex items-center justify-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              Client reviews
              <span aria-hidden className="h-px w-8 bg-sky/50" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              In our <span className={`${serif.className} tracking-normal text-sky`}>clients&apos; words.</span>
            </h2>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            {/* globe marking the countries our clients are in */}
            <div data-aos="fade-up" className="relative mx-auto w-[78%] min-w-0 max-w-[340px] sm:w-full lg:order-2">
              <div aria-hidden className="absolute inset-[12%] rounded-full bg-cobalt/30 blur-3xl" />
              <div className="relative aspect-square">
                {/* thin dashed orbit ring */}
                <div aria-hidden className="orbit-spin absolute -inset-[8%] rounded-full border border-dashed border-white/15" />
                <CountriesGlobe />
              </div>
              <p className="mx-auto mt-7 flex w-fit max-w-[calc(100vw-3rem)] items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 text-[13px] leading-snug text-white/80 sm:rounded-full sm:text-[13.5px]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-saffron" aria-hidden>
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                Clients in {clientCountries.map((c) => c.name).join(", ").replace(/, ([^,]*)$/, " & $1")}
              </p>
            </div>

            {reviews.length > 0 ? (
              <div data-aos="fade-up" className="min-w-0 lg:order-1">
                <ReviewsCarousel reviews={reviews} />
              </div>
            ) : (
              // until real reviews are added (from the admin panel): a review-style invitation, never placeholder quotes
              <div data-aos="fade-up" className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-8 lg:order-1">
                <span aria-hidden className="absolute -left-2 -top-8 font-serif text-[160px] leading-none text-sky/15">&ldquo;</span>
                <Stars n={5} />
                <p className="relative mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-snug tracking-tight">
                  Your review could be the first one here.
                </p>
                <p className="relative mt-3 max-w-[46ch] text-[16px] leading-relaxed text-white/65">
                  Worked with us on a website, app, CRM or campaign? Share a few words about your project and we&apos;ll feature
                  your review here, with your permission.
                </p>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent("My review of P & J Technologies")}`}
                  className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-[#e0f2fe]"
                >
                  Share your experience <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </div>

          <p data-aos="fade-up" className="mt-8 text-center text-[15px] text-white/55">
            Want to know more about how we work?{" "}
            <Link href="/how-we-work" className="font-semibold text-sky hover:text-white">
              See our process →
            </Link>
          </p>

          {/* short call to action to close the page */}
          <div data-aos="fade-up" className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-5 pr-3 backdrop-blur sm:gap-4 sm:rounded-full sm:py-4 sm:pl-8 sm:pr-4">
            <p className="min-w-0 text-[14.5px] font-medium leading-snug text-white sm:text-[16px]">
              Want results like these<span className="hidden sm:inline"> for your business</span>?
            </p>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition hover:bg-[#e0f2fe] sm:px-5 sm:text-[14.5px]">
              Start a project <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
