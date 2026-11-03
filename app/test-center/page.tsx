import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { FeatureCards } from "@/components/FeatureCards";
import { RevealTitle } from "@/components/RevealTitle";
import { pearsonPath } from "@/lib/brand-icons";
import { company, faqCategories, partnersText } from "@/lib/site";

// tuned for searches like "Pearson VUE test center in Vijayawada"
export const metadata: Metadata = {
  title: "Pearson VUE, PSI & Meazure Learning Test Center in Vijayawada",
  description: `Authorized Pearson VUE, PSI and Meazure Learning test center in Vijayawada, Andhra Pradesh. Book your computer-based exam at P & J Technologies, Opp. Vidyuth Soudha. Secure, proctored testing, Mon–Sat.`,
  keywords: [
    "Pearson VUE test center Vijayawada",
    "Pearson VUE exam center Vijayawada",
    "PSI exam center Vijayawada",
    "PSI test center Vijayawada",
    "Meazure Learning test center Vijayawada",
    "computer based test center Vijayawada",
    "online exam center Vijayawada",
    "authorized test center Andhra Pradesh",
  ],
  alternates: { canonical: "/test-center" },
  openGraph: {
    title: "Pearson VUE, PSI & Meazure Learning Test Center in Vijayawada | P & J Technologies",
    description: "Authorized, proctored computer-based exam center in Vijayawada, Andhra Pradesh.",
    url: "/test-center",
    images: ["/test-center-exam-back.jpg"],
  },
};

// tells search engines this is a real test center at a real address
const testCenterJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": "https://www.pandjtechnologies.com/test-center#testcenter",
  name: "P & J Technologies – Authorized Test Center (Pearson VUE, PSI, Meazure Learning)",
  description: `Authorized test center for ${partnersText} in Vijayawada, Andhra Pradesh, delivering secure, proctored computer-based exams.`,
  url: "https://www.pandjtechnologies.com/test-center",
  image: "https://www.pandjtechnologies.com/test-center-exam-back.jpg",
  telephone: "+91-8497976017",
  email: "contact@pandjtechnologies.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "49-1-126, 2nd Floor, Opp. Vidyuth Soudha",
    addressLocality: "Vijayawada",
    addressRegion: "Andhra Pradesh",
    postalCode: "520004",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 16.52405399641806, longitude: 80.6726894424868 },
  hasMap: company.mapsUrl,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "19:00" },
  ],
  parentOrganization: { "@id": "https://www.pandjtechnologies.com/#business" },
  knowsAbout: ["Pearson VUE exams", "PSI exams", "Meazure Learning exams", "Computer-based testing", "Proctored exams"],
};

const bookingSteps = [
  { name: "Sign in with your provider", text: `Create or sign in to your account on the official ${partnersText} website.` },
  { name: "Choose your exam", text: "Select your exam, and request any approved accommodations before you book." },
  { name: "Pick our center", text: "Select P & J Technologies, Vijayawada as your test center, then an available date and time." },
];

const examDay = [
  "Bring the original, valid government-issued photo ID your provider requires — the name must match your registration.",
  "Arrive at the time in your confirmation email, usually 15–30 minutes early for check-in.",
  "Phones, smartwatches, bags, notes and food are stored before you enter the testing room.",
];

const testCenterFaqs = faqCategories.find((c) => c.id === "test-center")?.items ?? [];

// serif italic accent for headings, as in the footer
const serif = Playfair_Display({ subsets: ["latin"], weight: "600", style: "italic" });

export default function TestCenterPage() {
  return (
    <>
      {/* hero: full-width photo, heading only */}
      <section className="relative isolate flex min-h-[340px] items-end overflow-hidden px-6 pb-10 pt-16 sm:min-h-[380px] sm:pb-12 lg:min-h-[430px]">
        <Image
          src="/test-center-exam-back.jpg"
          alt="A candidate, seen from behind, taking a computer-based exam"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[60%_center]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071a45]/90 via-[#071a45]/45 to-[#071a45]/10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a45]/70 via-[#071a45]/20 to-transparent" />
        {/* fade the top into the navy header */}
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[#060d18] via-[#060d18]/60 to-transparent" />
        <div className="mx-auto w-full max-w-[83rem] text-white">
          <span data-aos="fade-up" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-medium backdrop-blur">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron" aria-hidden>
              <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
            </svg>
            Computer-based testing · Vijayawada
          </span>
          <RevealTitle
            plain="Authorized"
            accent="test center"
            className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.03] tracking-[-0.03em]"
          />
          {/* the words people search for, said plainly */}
          <p data-aos="fade-up" data-aos-delay="150" className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
            Pearson VUE, PSI and Meazure Learning exams in Vijayawada, Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* intro: what the center offers */}
      <section className="relative isolate overflow-hidden bg-paper px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-cobalt/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[340px] w-[340px] rounded-full bg-saffron/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-0">
            <div className="lg:pr-16">
              <p data-aos="fade-up" className="flex items-center gap-3 text-[12.5px] font-medium uppercase tracking-[0.24em] text-slate">
                <span aria-hidden className="h-px w-10 bg-ink/30" />
                Secure exam delivery
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                A properly equipped,
                <br />
                <span className={`${serif.className} font-medium italic tracking-normal text-cobalt`}>secure exam center.</span>
              </h2>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="lg:border-l lg:border-ink/10 lg:pb-1 lg:pl-16">
              <p className="max-w-[46ch] text-[17px] leading-[1.7] text-slate">
                We deliver computer-based exams for {partnersText}, run to the strict security, privacy and process that
                international testing demands.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={`tel:${company.phones[0].tel}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-cobalt"
                >
                  Call {company.phones[0].number}
                </a>
                <a
                  href="#faqs"
                  className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  Candidate FAQs
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          <FeatureCards
            items={[
              { t: "Dedicated testing room", d: "Computer-based workstations set up only for exams.", i: "M4 5h16v11H4zM8 20h8M12 16v4" },
              { t: "Proctored sessions", d: "Every exam is supervised and monitored from start to finish.", i: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
              { t: "Secure check-in", d: "Candidate ID checks and secure storage for personal items.", i: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16c.6-1.6 1.8-2.5 3-2.5s2.4.9 3 2.5M15 9h3M15 13h3" },
              { t: "Distraction-free setup", d: "A quiet, controlled environment so candidates can focus.", i: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" },
            ]}
          />
        </div>
      </section>

      {/* testing partners, with their logos */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className="flex items-center justify-center gap-3">
              <span aria-hidden className="hidden h-px w-10 bg-gradient-to-r sm:block from-transparent to-cobalt/50" />
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cobalt/15 bg-[#eef3ff] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
                </svg>
                Our testing partners
              </span>
              <span aria-hidden className="hidden h-px w-10 bg-gradient-to-l sm:block from-transparent to-cobalt/50" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
              Authorized by{" "}
              <span className={`${serif.className} bg-gradient-to-r from-[#0e9aa6] via-cobalt to-saffron bg-clip-text pr-1 font-semibold tracking-normal text-transparent`}>
                global exam providers
              </span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-relaxed text-slate">
              Three international testing organisations trust our center to deliver their exams securely.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
            {[
              {
                name: "Pearson VUE",
                text: "Computer-based certification and licensure exams from one of the world's largest test providers.",
                logo: (
                  <span className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden>
                      <path d={pearsonPath} fill="#000" />
                    </svg>
                    <span className="text-[21px] font-semibold tracking-tight text-ink sm:text-[24px]">Pearson VUE</span>
                  </span>
                ),
                panel: "bg-white",
              },
              {
                name: "PSI",
                text: "Professional licensing, certification and workforce exams delivered to PSI's security standards.",
                // eslint-disable-next-line @next/next/no-img-element
                logo: <img src="/partners/psi.svg" alt="PSI" className="h-10 w-auto sm:h-12" />,
                panel: "bg-ink",
              },
              {
                name: "Meazure Learning",
                text: "Secure, proctored exams for Meazure Learning's certification and assessment programmes.",
                // eslint-disable-next-line @next/next/no-img-element
                logo: <img src="/partners/meazure-learning.svg" alt="Meazure Learning" className="h-10 w-auto sm:h-12" />,
                panel: "bg-white",
              },
            ].map((p, i) => (
              <li
                key={p.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm sm:flex-row lg:flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                <span className={`grid h-28 shrink-0 place-items-center border-b border-line sm:h-auto sm:w-60 sm:border-b-0 sm:border-r lg:h-36 lg:w-auto lg:border-b lg:border-r-0 ${p.panel}`}>{p.logo}</span>
                <span className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[19px] font-semibold tracking-tight text-ink">{p.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                      <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden>
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                      </svg>
                      Authorized
                    </span>
                  </span>
                  <span className="mt-2.5 text-[15px] leading-relaxed text-slate">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* partnership invite */}
          <div
            data-aos="fade-up"
            className="relative isolate mt-8 flex flex-col gap-6 overflow-hidden rounded-3xl bg-[#071a45] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgb(20_184_196/0.4),transparent_60%),radial-gradient(ellipse_50%_70%_at_100%_100%,rgb(240_162_59/0.35),transparent_60%)]" />
            <div>
              <h3 className="text-[20px] font-semibold tracking-tight sm:text-[22px]">Planning an exam or testing project?</h3>
              <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-white/70">
                Exam bodies, institutions and organisations can partner with us to host exams at our center.
              </p>
            </div>
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent("Exam center project enquiry")}`}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink hover:bg-[#e0f2fe] sm:self-center"
            >
              Contact us <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:gap-14">
          <div data-aos="fade-up">
            <h2 className="text-[28px] font-semibold tracking-tight">How to book</h2>
            <ol className="mt-8 space-y-7">
              {bookingSteps.map((b, i) => (
                <li key={b.name} className="flex gap-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold">{b.name}</h3>
                    <p className="mt-1 text-[15.5px] leading-relaxed text-slate">{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-[28px] font-semibold tracking-tight">On exam day</h2>
            <ul className="mt-6 border-t border-line">
              {examDay.map((d) => (
                <li key={d} className="flex gap-4 border-b border-line py-5 text-[16.5px] leading-snug">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-saffron" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faqs" className="scroll-mt-24 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 data-aos="fade-up" className="text-h2 font-semibold">Candidate questions</h2>
          <div className="mt-10">
            <Faq items={testCenterFaqs} />
          </div>
          <p className="mt-8 text-[15.5px] text-slate">
            More questions? See all <Link href="/faqs" className="font-semibold text-ink underline underline-offset-4">FAQs</Link>.
          </p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(testCenterJsonLd) }} />
    </>
  );
}
