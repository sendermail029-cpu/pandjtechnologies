import type { Metadata } from "next";
import Link from "next/link";
import { TechCircuit } from "@/components/TechCircuit";
import { AboutGlobe } from "@/components/AboutGlobe";
import { IndustriesMarquee } from "@/components/IndustriesMarquee";
import { PurposeSection } from "@/components/PurposeSection";
import { ValuesShowcase } from "@/components/ValuesShowcase";
import { ServicesHub } from "@/components/ServicesHub";
import { Playfair_Display } from "next/font/google";
import { accents } from "@/lib/accents";
import { partnersText } from "@/lib/site";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export const metadata: Metadata = {
  title: "About us",
  description: `Since 2023, P & J Technologies has delivered 200+ projects in websites, apps, CRM, ERP, custom software and digital marketing, and is an authorized test center for ${partnersText}.`,
};

const stats = [
  { v: "2023", k: "Founded" },
  { v: "200+", k: "Projects delivered" },
  { v: "3", k: "Global exam partners" },
  { v: "2", k: "Offices in India" },
];

// where each number floats around the globe: two above, two below
const statSpots = ["left-0 top-[4%]", "right-0 top-[10%]", "bottom-[10%] left-0", "bottom-[4%] right-0"];
const statDots = ["bg-[#14b8c4]", "bg-cobalt", "bg-saffron", "bg-[#8b5cf6]"];

const offerings = [
  { slug: "website-design", t: "Websites", d: "Business, e-commerce, booking and education websites that are fast, secure and built to bring in enquiries.", i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" },
  { slug: "app-development", t: "Android & iOS apps", d: "Apps published on the Play Store and App Store, from customer and education apps to tools for your staff.", i: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" },
  { slug: "crm-software", t: "CRM software", d: "Every lead, follow-up and deal in one place, so your sales team never loses an enquiry.", i: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6" },
  { slug: "erp-software", t: "ERP & billing software", d: "Inventory, billing, purchase, HR and accounts connected, with GST-ready invoices and reports.", i: "M12 3 3 8l9 5 9-5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" },
  { slug: "custom-software", t: "SaaS, AI & custom software", d: "SaaS products, AI agents and software that connects with hardware, built to your exact requirements.", i: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" },
  { slug: "digital-marketing", t: "Digital marketing", d: "Meta Ads and Google Ads campaigns measured on real enquiries and sales, not just likes.", i: "M3 10v4h3l7 4V6L6 10H3zM17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" },
  { slug: "test-center", href: "/test-center", t: "Authorized test center", d: `Secure, proctored computer-based exams for ${partnersText}, run to international testing standards.`, i: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" },
];

const values = [
  { name: "Integrity first", text: "Honest advice, transparent pricing and written commitments. The same standards our exam center is held to.", i: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" },
  { name: "Automation with purpose", text: "We build software that removes manual work, so your team spends time on what grows the business.", i: "M13 2 4 14h7l-1 8 9-12h-7z" },
  { name: "Reliability, 24×7", text: "Systems designed to stay available around the clock, with backups and monitoring that keep risk low.", i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" },
  { name: "Security by default", text: "Encrypted connections, controlled access and careful data handling in everything we build and run.", i: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2" },
  { name: "Customer partnership", text: "One accountable team from first call to long-term support. Your goals become our measure of success.", i: "M8 11l3 3 5-5M7 20H5a2 2 0 0 1-2-2v-3l4-4 3 3M17 20h2a2 2 0 0 0 2-2v-3l-4-4-3 3" },
  { name: "Always improving", text: "Our team keeps learning new tools and platforms, so the technology we deliver stays current.", i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[400px] items-end overflow-hidden bg-[#060d18] px-6 pb-16 pt-24 sm:min-h-[460px] sm:pb-20 sm:pt-32">
        {/* circuit board with data pulses, behind a soft cobalt glow */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="footer-glow absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute right-[8%] top-[5%] h-[380px] w-[380px] rounded-full bg-sky/15 blur-3xl [animation-delay:-9s]" />
          <TechCircuit className="absolute inset-0" />
          {/* keep the heading side calm and the top seamless with the navy header */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d18]/85 via-[#060d18]/25 via-45% to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060d18] to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-[83rem]">
          <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
            <span aria-hidden className="h-px w-8 bg-sky/50" />
            About P &amp; J Technologies
          </p>
          <h1 data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-[20ch] text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
            Complete digital solutions,{" "}
            <span className={`${serif.className} whitespace-nowrap tracking-normal text-sky`}>under one roof.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-white/60">
            Websites, apps, business software, digital marketing and an authorized test center, delivered by one team.
          </p>
        </div>
      </section>

      {/* our story */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-[#14b8c4]/12 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-saffron/12 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p data-aos="fade-up" className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.22em] text-cobalt sm:text-[12.5px]">
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Innovation <span aria-hidden className="text-saffron">·</span> Technology <span aria-hidden className="text-saffron">·</span> Global delivery
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.2rem,4.2vw,3.7rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
                Innovation-driven technology that turns your business into a{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className={`${serif.className} font-medium italic tracking-normal text-cobalt`}>brand.</span>
                  {/* soft saffron highlight under the accent word */}
                  <span aria-hidden className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.28em] rounded-full bg-saffron/35" />
                </span>
              </h2>

              <p data-aos="fade-up" data-aos-delay="150" className="mt-7 max-w-[54ch] text-[18px] leading-[1.7] text-ink-2">
                We are a technology partner for businesses in India and around the world. We engineer modern websites, mobile apps,
                business software and automation, and run data-driven digital marketing, so your business runs smarter and stands
                out as a brand.
              </p>

              {/* what that covers */}
              <ul data-aos="fade-up" data-aos-delay="200" className="mt-7 flex flex-wrap gap-2">
                {["Web development", "iOS & Android apps", "CRM & ERP platforms", "Custom software", "Business automation", "Performance marketing"].map((t) => (
                  <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink-2 shadow-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* globe with the four numbers floating around it: two above, two below */}
            <div data-aos="fade-left" data-aos-delay="200" className="relative mx-auto w-full max-w-[520px]">
              <div className="relative mx-auto aspect-square w-[78%] sm:w-[82%]">
                <div aria-hidden className="absolute inset-[6%] rounded-full bg-cobalt/20 blur-3xl" />
                {/* dashed orbit ring around the globe */}
                <div aria-hidden className="absolute -inset-[7%] rounded-full border border-dashed border-cobalt/25" />
                <AboutGlobe />
              </div>

              <dl>
                {stats.map((x, i) => (
                  <div
                    key={x.k}
                    className={`float-icon absolute flex flex-col-reverse items-start rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-[0_18px_40px_-18px_rgba(15,29,51,0.35)] backdrop-blur sm:rounded-2xl sm:px-5 sm:py-3.5 ${statSpots[i]}`}
                    style={{ animationDelay: `${i * -1.1}s` }}
                  >
                    <dt className="mt-1 max-w-[13ch] text-[11.5px] leading-snug text-slate sm:text-[12.5px]">{x.k}</dt>
                    <dd className="flex items-center gap-2 text-[22px] font-semibold leading-none tracking-tight text-ink sm:text-[28px]">
                      <span aria-hidden className={`h-2 w-2 rounded-full ${statDots[i]}`} />
                      {x.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 py-20 text-white sm:py-28">
        {/* faint engineering grid and slow glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
                <span aria-hidden className="h-px w-8 bg-sky/50" />
                What we do
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Technology for every part of <span className="text-sky">your business.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16.5px] leading-relaxed text-white/60 lg:justify-self-end">
              One engineering team plans, builds and supports it all, so your website, apps, software and marketing work as one
              connected system.
            </p>
          </div>

          {/* services as one connected system */}
          <ServicesHub items={offerings} />


        </div>
      </section>

      <IndustriesMarquee />

      <PurposeSection />

      {/* core values */}
      <section className="relative isolate overflow-hidden bg-[#f5f7fc] px-6 py-20 sm:py-28">
        {/* faint dot grid, fading out towards the bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(39_71_214/0.09)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p data-aos="fade-up" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cobalt">
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Core values
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                The principles behind <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>everything we build.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16.5px] leading-relaxed text-slate lg:justify-self-end">
              Six commitments that guide every project, from the first call to long-term support. Select one to explore.
            </p>
          </div>

          <ValuesShowcase values={values} />
        </div>
      </section>

    </>
  );
}
