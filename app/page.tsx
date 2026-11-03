import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { connection } from "next/server";
import { ContactPaths } from "@/components/ContactPaths";
import { HeroFlow } from "@/components/HeroFlow";
import { HomeHero } from "@/components/HomeHero";
import { HomeServices } from "@/components/HomeServices";
import { HomeHub } from "@/components/HomeHub";
import { IndustriesMarquee } from "@/components/IndustriesMarquee";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { commitments, process, testingPartners } from "@/lib/site";
import { clientCountries } from "@/lib/client-countries";
import { getClients } from "@/lib/clients";
import { getPublishedReviews } from "@/lib/reviews";
import { pearsonPath } from "@/lib/brand-icons";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });
const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";
const h2 = "mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.04em]";

// the journey a customer takes through the systems we build
const journey = [
  { t: "Ads bring the enquiry", d: "Meta and Google Ads reach the right people." },
  { t: "Website & WhatsApp capture it", d: "Forms and instant replies, any hour." },
  { t: "AI agent follows up", d: "A call back within minutes, visit booked." },
  { t: "CRM tracks the deal", d: "Every lead, reminder and quote in one place." },
  { t: "ERP bills and delivers", d: "GST invoices, stock and accounts, updated." },
  { t: "You see it all", d: "One dashboard from first click to final invoice." },
];

const explore = [
  { href: "/about", t: "About us", d: "Who we are, our mission and values.", tone: "from-[#e6edff] to-[#f3f6ff]", i: "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
  { href: "/clients", t: "Clients & reviews", d: "The businesses and partners who trust us.", tone: "from-[#fde2ef] to-[#fdf2f8]", i: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" },
  { href: "/careers", t: "Careers", d: "Open roles and walk-ins. Grow with our team.", tone: "from-[#dcfce7] to-[#f0fdf4]", i: "M4 8h16v12H4zM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M4 13h16" },
  { href: "/faqs", t: "FAQs", d: "Costs, ownership, timelines and support.", tone: "from-[#fff1e6] to-[#fff8f2]", i: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5v.7M12 17h.01" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="transition-transform group-hover:translate-x-1">
    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default async function Home() {
  // clients and reviews are managed from the admin panel
  await connection();
  const [clients, reviews] = await Promise.all([getClients(), getPublishedReviews()]);
  const logos = clients.filter((c) => c.logo);

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 pb-14 pt-8 text-white sm:pt-12 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:pb-16 lg:pt-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_75%)]" />
          <div className="footer-glow absolute -left-40 bottom-0 h-[480px] w-[520px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute -right-32 top-24 h-[460px] w-[480px] rounded-full bg-[#7c3aed]/20 blur-3xl [animation-delay:-9s]" />
          {/* fade the top into the navy header so there is no seam */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060d18] via-[#060d18]/80 to-transparent" />
        </div>

        <HomeHero />
      </section>

      {/* clients */}
      <section aria-label="Clients and partners" className="border-b border-line bg-white py-8">
        <div className="mx-auto flex max-w-[83rem] flex-col gap-5 px-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-slate">Trusted by businesses in {clientCountries.length} countries</p>
          <div className="marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track flex w-max items-center [animation-duration:40s]">
              {[0, 1].map((half) => (
                <ul key={half} aria-hidden={half === 1} className="flex shrink-0 items-center gap-12 pr-12">
                  {(logos.length >= 4 ? logos : clients).map((c) => (
                    <li key={c.id} className="flex h-12 items-center">
                      {c.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/api/client-logo/${c.logo}`} alt={half ? "" : c.name} className="max-h-12 max-w-[140px] object-contain transition duration-300 hover:scale-105" />
                      ) : (
                        <span className="whitespace-nowrap text-[16px] font-semibold tracking-tight text-ink-2">{c.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section id="services" className="relative isolate scroll-mt-6 overflow-hidden bg-[#060d18] px-6 py-16 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-cobalt/25 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-sky`}>
                <span aria-hidden className="h-px w-8 bg-sky/50" />
                What we do
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={h2}>
                Everything your business needs, <span className={`${serif.className} tracking-normal text-sky`}>from one team.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-white/60">
              Six services and an authorized test center. Pick one to see what we build.
            </p>
          </div>
          <HomeServices />
        </div>
      </section>

      {/* one connected system */}
      <section className="bg-gradient-to-br from-[#eef2ff] via-[#f5f0ff] to-[#e8f7ff] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p data-aos="fade-up" className={`${label} text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              One connected system
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
              From first click <span className={`${serif.className} tracking-normal text-cobalt`}>to final invoice.</span>
            </h2>
            <ol className="mt-8 grid grid-cols-2 gap-2 sm:gap-2.5">
              {journey.map((j, k) => (
                <li key={j.t} data-aos="fade-up" data-aos-delay={k * 50} className="flex flex-col gap-2 rounded-2xl border border-white bg-white/75 p-3 shadow sm:flex-row sm:gap-3 sm:p-4-[0_10px_30px_-20px_rgba(39,71,214,0.5)]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cobalt to-[#7c3aed] font-mono text-[11px] font-semibold text-white">{k + 1}</span>
                  <span>
                    <span className="block text-[13px] font-semibold leading-snug text-ink sm:text-[14.5px]">{j.t}</span>
                    <span className="mt-0.5 hidden text-[13px] leading-snug text-slate sm:block">{j.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div data-aos="fade-left" data-aos-delay="150" className="min-w-0">
            <HeroFlow />
          </div>
        </div>
      </section>

      <IndustriesMarquee />

      {/* how we work: the five stages on one line, and the promises as chips */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-14 text-white sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="footer-glow absolute -left-40 top-0 h-[360px] w-[420px] rounded-full bg-cobalt/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 data-aos="fade-up" className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight tracking-[-0.035em]">
              Five clear stages. <span className={`${serif.className} tracking-normal text-sky`}>Zero surprises.</span>
            </h2>
            <Link href="/how-we-work" className="group inline-flex shrink-0 items-center gap-2 text-[14.5px] font-semibold text-sky">
              See our full process <Arrow />
            </Link>
          </div>

          {/* stages: names only; hover for the detail */}
          <ol data-aos="fade-up" className="relative mt-9 grid grid-cols-5 gap-1">
            <span aria-hidden className="absolute left-[10%] right-[10%] top-[18px] h-px bg-gradient-to-r from-sky via-[#a78bfa] to-emerald-400 opacity-50" />
            {process.map((p, k) => (
              <li key={p.name} title={p.text} className="group relative flex flex-col items-center text-center">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#0a1430] font-mono text-[12px] font-semibold text-sky ring-1 ring-sky/40 transition duration-300 group-hover:bg-sky group-hover:text-ink">
                  {k + 1}
                </span>
                <span className="mt-3 text-[12.5px] font-semibold leading-tight sm:text-[15px]">{p.name}</span>
              </li>
            ))}
          </ol>

          {/* promises */}
          <ul data-aos="fade-up" className="mt-9 flex flex-wrap justify-center gap-2">
            {commitments.map((c) => (
              <li key={c.title} title={c.text} className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-2 text-[13px] font-medium text-white/85 ring-1 ring-white/10 sm:text-[14px]">
                <svg className="shrink-0 text-emerald-400" width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                </svg>
                {c.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* reviews (only real, published ones) */}
      {reviews.length > 0 && (
        <section className="bg-white px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[83rem] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Client reviews
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
                In our clients&apos; <span className={`${serif.className} tracking-normal text-cobalt`}>own words.</span>
              </h2>
              <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-slate">
                Businesses in {clientCountries.map((c) => c.name).join(", ").replace(/, ([^,]*)$/, " & $1")} on working with our team.
              </p>
              <Link href="/clients" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14.5px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cobalt">
                Meet our clients <Arrow />
              </Link>
            </div>
            <div data-aos="fade-up" className="min-w-0 rounded-[30px] bg-[#060d18] p-4 sm:p-6">
              <ReviewsCarousel reviews={reviews} />
            </div>
          </div>
        </section>
      )}

      {/* test center */}
      <section className="bg-[#f5f7fc] px-6 py-16 sm:py-20">
        <div data-aos="fade-up" className="relative isolate mx-auto grid max-w-[83rem] items-center gap-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#fff4e0] via-[#fff8ee] to-[#fdf2f8] p-6 ring-1 ring-[#f6dcb0] sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:p-12">
          <Image src="/services-3d/test-center.png" alt="" width={140} height={140} className="float-icon h-24 w-24 sm:h-32 sm:w-32" />
          <div>
            <p className={`${label} text-[#c2620a]`}>
              <span aria-hidden className="h-px w-8 bg-saffron/60" />
              Authorized test center
            </p>
            <p className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Take your exam with us <span className={`${serif.className} tracking-normal text-[#c2620a]`}>in Vijayawada.</span>
            </p>
            {/* the three exam partners, as their own logos */}
            <ul aria-label="Exam partners" className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <li className="flex h-14 items-center justify-center rounded-2xl bg-white px-3 shadow-md shadow-ink/[0.07] ring-1 ring-[#f6dcb0] sm:px-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/partners/meazure-learning.svg" alt="Meazure Learning" className="h-auto max-h-8 w-full max-w-[120px] sm:h-8 sm:w-auto" />
              </li>
              <li className="flex h-14 items-center justify-center gap-1.5 rounded-2xl bg-white px-2 shadow-md shadow-ink/[0.07] ring-1 ring-[#f6dcb0] sm:gap-2 sm:px-5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" aria-hidden>
                  <path d={pearsonPath} fill="#000" />
                </svg>
                <span className="whitespace-nowrap text-[12.5px] font-semibold text-ink sm:text-[16px]">Pearson VUE</span>
              </li>
              <li className="flex h-14 items-center justify-center rounded-2xl bg-ink px-4 shadow-md shadow-ink/20 sm:px-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/partners/psi.svg" alt="PSI" className="h-7 w-auto" />
              </li>
            </ul>
          </div>
          <Link href="/test-center" className="group inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c2620a] lg:self-center">
            Book an exam <Arrow />
          </Link>
        </div>
      </section>

      {/* get to know us */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f5f7fc] to-white px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[83rem] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* P & J at the centre of every service */}
          <div data-aos="zoom-in" className="order-2 min-w-0 lg:order-1">
            <HomeHub />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
          <p data-aos="fade-up" className={`${label} text-cobalt`}>
            <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            Get to know us
          </p>
          <h2 data-aos="fade-up" data-aos-delay="100" className={`${h2} text-ink`}>
            More about{" "}
            <span className="bg-gradient-to-r from-cobalt via-[#3b82f6] to-sky bg-clip-text font-semibold text-transparent">P &amp; J Technologies</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="150" className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-slate">
            Every service connects back to one team, based in Vijayawada. Get to know who we are, who we work with and how to
            join us.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {explore.map((e, k) => (
              <li key={e.href} data-aos="fade-up" data-aos-delay={k * 80}>
                <Link
                  href={e.href}
                  className={`group flex h-full flex-col rounded-[24px] bg-gradient-to-br ${e.tone} p-5 ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 sm:p-6`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-cobalt shadow-sm transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={e.i} />
                    </svg>
                  </span>
                  <span className="mt-5 block text-[17px] font-semibold tracking-tight text-ink sm:text-[19px]">{e.t}</span>
                  <span className="mt-1.5 block flex-1 text-[13px] leading-relaxed text-slate sm:text-[14.5px]">{e.d}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt">
                    Open <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      <ContactPaths />
    </>
  );
}
