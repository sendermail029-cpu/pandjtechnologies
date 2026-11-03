import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { process } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons, cloudIcons, moreToolIcons, toolIcons } from "@/lib/brand-icons";

const brands = [...brandIcons, ...cloudIcons, ...toolIcons, ...moreToolIcons];

// sectors we build websites for, with the kind of site each usually needs (3D icons in public/industries, Fluent Emoji, MIT)
const sectors = [
  { t: "Healthcare & clinics", d: "Doctor profiles, appointments and services", img: "healthcare" },
  { t: "Dental clinics", d: "Treatments, before-and-after galleries, bookings", img: "dental" },
  { t: "Schools & colleges", d: "Admissions, notices, galleries and events", img: "education" },
  { t: "Coaching & training institutes", d: "Courses, batches, results and online enrolments", img: "coaching" },
  { t: "Play schools & kindergartens", d: "Programmes, facilities and parent enquiries", img: "kids" },
  { t: "Diagnostic labs", d: "Tests, packages, home collection and reports", img: "lab" },
  { t: "Pharmacies", d: "Products, prescriptions and home delivery", img: "pharmacy" },
  { t: "Real estate", d: "Project listings, floor plans and site-visit enquiries", img: "real-estate" },
  { t: "Construction & infra", d: "Completed projects, capabilities and tenders", img: "construction" },
  { t: "Retail & e-commerce", d: "Online stores with payments and delivery", img: "retail" },
  { t: "Supermarkets & grocery", d: "Product catalogues, offers and online orders", img: "supermarket" },
  { t: "Jewellery stores", d: "Collections, gold rates and showroom visits", img: "jewellery" },
  { t: "Restaurants & cafés", d: "Menus, table bookings and online orders", img: "restaurant" },
  { t: "Hotels & resorts", d: "Rooms, galleries and direct booking enquiries", img: "hotel" },
  { t: "Hostels & PGs", d: "Rooms, facilities, rent and availability", img: "hostel" },
  { t: "Travel & tours", d: "Packages, itineraries and trip enquiries", img: "travel" },
  { t: "Transport & logistics", d: "Fleet, services and quote requests", img: "logistics" },
  { t: "Car rentals & automobile", d: "Vehicles, rates and instant booking", img: "automobile" },
  { t: "Manufacturing", d: "Product catalogues and dealer enquiries", img: "manufacturing" },
  { t: "Agriculture", d: "Produce, farm stories and bulk orders", img: "agriculture" },
  { t: "Finance & fintech", d: "Secure, trustworthy sites for financial services", img: "finance" },
  { t: "Professional services", d: "CAs, consultants and agencies", img: "professional" },
  { t: "IT companies & startups", d: "Products, case studies and careers", img: "it" },
  { t: "Interior & architecture", d: "Portfolios, services and design consultations", img: "interior" },
  { t: "Legal firms", d: "Practice areas, lawyers and consultations", img: "legal" },
  { t: "Fashion & boutiques", d: "Collections, lookbooks and online sales", img: "fashion" },
  { t: "Salons & beauty", d: "Services, prices and appointment booking", img: "salon" },
  { t: "Gyms & fitness", d: "Plans, trainers and membership sign-ups", img: "fitness" },
  { t: "Wellness & spa", d: "Therapies, packages and bookings", img: "wellness" },
  { t: "Churches & ministries", d: "Sermons, events, prayer requests and donations", img: "ministry" },
  { t: "NGOs & trusts", d: "Causes, impact stories and online donations", img: "ngo" },
  { t: "Media & podcasts", d: "Episodes, videos and subscriber growth", img: "podcasts" },
  { t: "Political campaigns", d: "Leaders, manifestos, events and volunteers", img: "political" },
  { t: "Events & weddings", d: "Portfolios, packages and event enquiries", img: "events" },
  { t: "Photography & studios", d: "Portfolios, packages and shoot bookings", img: "photography" },
];

// 3D icons (public/included, Fluent Emoji MIT) and glow colours for the six included cards
const includedIcons = ["domain", "email", "seo", "brand", "analytics", "support"];
// 3D icons for the five project stages
const stageIcons = ["discover", "propose", "build", "launch", "grow"];

const glows = ["bg-cobalt/15", "bg-[#7c3aed]/15", "bg-saffron/20", "bg-[#ec4899]/15", "bg-[#14b8c4]/15", "bg-emerald-400/20"];

// what a website changes for the business
const results = [
  { t: "Open for business 24×7", d: "Customers can find you, see your work and contact you any time, even while you sleep.", i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" },
  { t: "A stronger brand", d: "A polished, professional site builds trust and makes your business look as good as it is.", i: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" },
  { t: "Found on Google", d: "SEO, Search Console and your Google Business Profile help new customers discover you.", i: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" },
  { t: "More enquiries", d: "Clear calls to action, enquiry forms and WhatsApp routed straight to your sales team.", i: "M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z" },
  { t: "Fast on every phone", d: "Mobile-first pages that load in about two seconds, even on a 4G connection.", i: "M13 2 4 14h7l-1 8 9-12h-7z" },
  { t: "Easy to keep up to date", d: "Update your gallery, blog and events yourself, with our team a call away.", i: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4" },
];

// tools we use, as real logos (shared brand icons, plus WooCommerce and Razorpay from Simple Icons, CC0)
const toolNames = [
  ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "Figma", "GitHub", "VS Code"],
  ["WordPress", "Shopify", "WooCommerce", "Razorpay", "Firebase", "MongoDB", "PostgreSQL", "Google Analytics", "Search Console (SEO)", "Cloudflare", "Hostinger", "GoDaddy", "Vercel", "AWS"],
];
const extraLogos = [
  { title: "WooCommerce", color: "#96588A", path: "M.754 9.58a.754.754 0 00-.754.758v2.525c0 .42.339.758.758.758h3.135l1.431.799-.326-.799h2.373a.757.757 0 00.758-.758v-2.525a.757.757 0 00-.758-.758H.754zm2.709.445h.03c.065.001.124.023.179.067a.26.26 0 01.103.19.29.29 0 01-.033.16c-.13.239-.236.64-.322 1.199-.083.541-.114.965-.094 1.267a.392.392 0 01-.039.219.213.213 0 01-.176.12c-.086.006-.177-.034-.263-.124-.31-.316-.555-.788-.735-1.416-.216.425-.375.744-.478.957-.196.376-.363.568-.502.578-.09.007-.166-.069-.233-.228-.17-.436-.352-1.277-.548-2.524a.297.297 0 01.054-.222c.047-.064.116-.095.21-.102.169-.013.265.065.288.238.103.695.217 1.284.336 1.766l.727-1.387c.066-.126.15-.192.25-.199.146-.01.237.083.273.28.083.441.188.817.315 1.136.086-.844.233-1.453.44-1.828a.255.255 0 01.218-.147zm1.293.36c.056 0 .116.006.18.02.232.05.411.177.53.386.107.18.161.395.161.654 0 .343-.087.654-.26.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.158-.659c0-.342.085-.655.258-.937.202-.333.462-.498.78-.498zm2.084 0c.056 0 .116.006.18.02.236.05.411.177.53.386.107.18.16.395.16.654 0 .343-.086.654-.259.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.16-.659c0-.342.087-.655.26-.937.202-.333.462-.498.78-.498zm4.437.047c-.305 0-.546.102-.718.304-.173.203-.256.49-.256.856 0 .395.086.697.256.906.17.21.418.316.744.316.315 0 .559-.107.728-.316.17-.21.256-.504.256-.883s-.087-.673-.26-.879c-.176-.202-.424-.304-.75-.304zm-1.466.002a1.13 1.13 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.505.336.861.336.103 0 .22-.016.346-.052v-.54c-.117.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm12.414 0a1.135 1.135 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.506.336.861.336.103 0 .22-.016.346-.052v-.54c-.116.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm-9.598.06l-.29 2.264h.579l.156-1.559.395 1.559h.412l.379-1.555.164 1.555h.603l-.304-2.264h-.791l-.12.508c-.03.13-.06.264-.087.4l-.067.352a29.97 29.97 0 00-.258-1.26h-.771zm2.768 0l-.29 2.264h.579l.156-1.559.396 1.559h.412l.375-1.555.165 1.555h.603l-.305-2.264h-.789l-.119.508c-.03.13-.06.264-.086.4l-.066.352c-.063-.352-.15-.771-.26-1.26h-.771zm3.988 0v2.264h.611v-1.031h.012l.494 1.03h.645l-.489-1.019a.61.61 0 00.37-.552.598.598 0 00-.25-.506c-.167-.123-.394-.186-.68-.186h-.713zm3.377 0v2.264H24v-.483h-.63v-.414h.54v-.468h-.54v-.416h.626v-.483H22.76zm-4.793.004v2.264h1.24v-.483h-.627v-.416h.541v-.468h-.54v-.415h.622v-.482h-1.236zm2.025.432c.146.003.25.025.313.072.063.046.091.12.091.227 0 .156-.135.236-.404.24v-.54zm-15.22.011c-.104 0-.205.069-.301.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.016-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm2.083 0c-.103 0-.204.069-.3.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.013-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm4.428.006c.233 0 .354.218.354.66-.004.273-.038.46-.098.553a.293.293 0 01-.262.139.266.266 0 01-.242-.139c-.056-.093-.084-.28-.084-.562 0-.436.11-.65.332-.65Z" },
  { title: "Razorpay", color: "#0C2451", path: "M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" },
];
const logoSet = [...extraLogos, ...brands];
// one single row of all the tools
const toolRows = [toolNames.flat()].map((row) =>
  row
    .map((n) => logoSet.find((x) => x.title === n))
    .filter((x): x is { title: string; color: string; path: string } => !!x)
    .map((x) => ({ ...x, name: x.title === "Search Console (SEO)" ? "Search Console" : x.title })),
);

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

const label = "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]";

// tile colours for the four "what we build" cards
const tones = ["bg-[#e6edff] text-cobalt", "bg-[#f1ebff] text-[#7c3aed]", "bg-[#fff1dc] text-[#c2620a]", "bg-[#dcfce7] text-[#047857]", "bg-[#dff7f8] text-[#0e9aa6]", "bg-[#fce7f3] text-[#be185d]"];

// Body of the Website design & development page only (its own copy, so edits here don't change the other service pages): what we build, what's included, what changes for the business, technology and process
export function WebsitePageBody({ page, slug, outcomes, stack }: { page: ServicePage; slug: string; outcomes: string[]; stack: string[] }) {
  const { build, included } = page;
  return (
    <>
      {/* sectors: who we build websites for */}
      <section className="bg-[#f5f7fc] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Industries we build for
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
                A website built for <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>your sector.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16px] leading-relaxed text-slate">
              Every industry has different customers and different goals. We design each website around what yours needs.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-3 lg:grid-cols-5">
            {sectors.map((x, i) => (
              <li
                key={x.t}
                data-aos="fade-up"
                data-aos-delay={(i % 5) * 50}
                className="group rounded-2xl border border-line bg-white p-2.5 text-center transition duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lg hover:shadow-ink/5 sm:p-5 sm:text-left"
              >
                <Image src={`/industries/${x.img}.png`} alt="" width={44} height={44} className="mx-auto h-9 w-9 transition-transform duration-300 group-hover:scale-110 sm:mx-0 sm:h-11 sm:w-11" />
                <span className="mt-2 block text-[12px] font-semibold leading-tight tracking-tight text-ink sm:mt-4 sm:text-[15.5px]">{x.t}</span>
                <span className="mt-1 hidden text-[13px] leading-snug text-slate sm:block">{x.d}</span>
              </li>
            ))}
          </ul>
          <p data-aos="fade-up" className="mt-8 text-center text-[15px] text-slate">
            Don&apos;t see your industry?{" "}
            <Link href={`/contact?service=${slug}`} className="font-semibold text-cobalt hover:underline">
              Tell us about your business →
            </Link>
          </p>
        </div>
      </section>

      {/* what's included: everything set up around the website */}
      <section id="included" className="relative isolate scroll-mt-8 overflow-hidden bg-white px-6 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgb(39_71_214/0.07),transparent_70%)]" />
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              What&apos;s included
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              {included.plain} <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>{included.accent}</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
              {included.intro}
            </p>
          </div>

          {/* hub: the brand preview in the middle, the six items around it */}
          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,400px)_1fr] lg:gap-10">
            {[0, 1].map((side) => (
              <ul key={side} className={`space-y-4 ${side === 0 ? "order-2 lg:order-1" : "order-3"}`}>
                {included.items.slice(side * 3, side * 3 + 3).map((b, k) => {
                  const i = side * 3 + k;
                  return (
                    <li
                      key={b.t}
                      data-aos={side === 0 ? "fade-right" : "fade-left"}
                      data-aos-delay={k * 100}
                      className={`group relative flex items-start gap-4 ${side === 0 ? "lg:flex-row-reverse lg:text-right" : ""}`}
                    >
                      {/* dashed link towards the centre (desktop) */}
                      <span
                        aria-hidden
                        className={`absolute top-7 hidden h-px w-10 border-t border-dashed border-cobalt/30 lg:block ${side === 0 ? "-right-10" : "-left-10"}`}
                      />
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(15,29,51,0.3)] ring-1 ring-line transition duration-300 group-hover:-translate-y-0.5 group-hover:ring-cobalt/30">
                        <Image src={`/included/${includedIcons[i % includedIcons.length]}.png`} alt="" width={34} height={34} className="h-[34px] w-[34px] transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0 pt-1">
                        <span className="block text-[17px] font-semibold tracking-tight text-ink">{b.t}</span>
                        <span className="mt-1 block text-[14.5px] leading-relaxed text-slate">{b.d}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ))}

            {/* the brand we set up, as one preview */}
            <div data-aos="zoom-in" className="relative order-1 mx-auto w-full max-w-[400px] lg:order-2">
              <div aria-hidden className="absolute inset-[-12%] rounded-full bg-cobalt/15 blur-3xl" />
              <div aria-hidden className="absolute inset-[-6%] rounded-full border border-dashed border-cobalt/25" />
              <div className="relative overflow-hidden rounded-[26px] bg-[#060d18] text-white shadow-[0_40px_80px_-30px_rgba(39,71,214,0.6)]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f1d3d] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 flex h-6 flex-1 items-center gap-1.5 rounded-md bg-[#0b1630] px-2.5 font-mono text-[11px] text-white/60">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6" aria-hidden>
                      <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z" />
                    </svg>
                    yourbrand.com
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  {/* the brand */}
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky to-cobalt text-[15px] font-bold">YB</span>
                    <span>
                      <span className="block text-[16px] font-semibold">Your Brand</span>
                      <span className="block text-[12px] text-white/50">Online · Secure · Trusted</span>
                    </span>
                  </div>
                  {/* business email */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5 ring-1 ring-white/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" aria-hidden>
                      <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
                    </svg>
                    <span className="font-mono text-[12.5px] text-white/80">info@yourbrand.com</span>
                  </div>
                  {/* google listing */}
                  <div className="rounded-xl bg-white px-3.5 py-3 text-ink">
                    <span className="flex items-center justify-between">
                      <span className="text-[13.5px] font-semibold text-[#1a0dab]">Your Brand · Official site</span>
                      <span className="text-[11px] text-slate">Google</span>
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-saffron">
                      {"★★★★★".split("").map((s, k) => (
                        <span key={k} className="text-[12px] leading-none">{s}</span>
                      ))}
                      <span className="ml-1 text-[11.5px] text-slate">Open now</span>
                    </span>
                  </div>
                  {/* analytics */}
                  <div className="flex items-end gap-1.5 rounded-xl bg-white/[0.06] px-3.5 pb-2.5 pt-3 ring-1 ring-white/10">
                    {[30, 45, 38, 60, 52, 75, 90].map((h, k) => (
                      <span key={k} className="flex-1 rounded-sm bg-gradient-to-t from-cobalt to-sky" style={{ height: `${h * 0.4}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* launch summary and call to action */}
          <div data-aos="fade-up" className="relative isolate mt-14 flex flex-col gap-6 overflow-hidden rounded-[24px] bg-[#060d18] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div aria-hidden className="absolute -left-16 -top-24 -z-10 h-64 w-64 rounded-full bg-cobalt/40 blur-3xl" />
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30">
                <svg width="26" height="26" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              <div>
                <p className="text-[20px] font-semibold tracking-tight">All {included.items.length} included, set up before you go live.</p>
                <p className="mt-1 text-[14.5px] text-white/60">Written scope and a fixed price before we start. No hidden extras.</p>
              </div>
            </div>
            <Link
              href={`/contact?service=${slug}`}
              className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] lg:self-center"
            >
              Get a proposal <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* the results: what changes for the business */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f5f0ff] to-[#e8f7ff] px-6 py-20 text-ink sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgb(39_71_214/0.08)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-[#c7d2fe]/60 blur-3xl" />
          <div className="footer-glow absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#fbcfe8]/50 blur-3xl [animation-delay:-9s]" />
        </div>
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                The results
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
                What changes for <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>your business.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              A professional website keeps working for you every hour of every day, long after it goes live.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <li key={r.t} data-aos="fade-up" data-aos-delay={(i % 3) * 80} className="h-full">
                <div className="group flex h-full gap-5 rounded-[24px] border border-white bg-white/80 p-6 shadow-[0_18px_40px_-28px_rgba(39,71,214,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_50px_-24px_rgba(39,71,214,0.5)]">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[i % tones.length]} transition group-hover:scale-110`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={r.i} />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[17.5px] font-semibold tracking-tight text-ink">{r.t}</span>
                    <span className="mt-1.5 block text-[14.5px] leading-relaxed text-slate">{r.d}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* reach customers anywhere */}
          <div data-aos="fade-up" className="relative isolate mt-6 overflow-hidden rounded-[28px] bg-[#060d18] p-7 text-white sm:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/world-dots-mask.svg" alt="" aria-hidden className="absolute right-0 top-1/2 -z-10 h-[140%] w-auto max-w-none -translate-y-1/2 opacity-30 [mask-image:linear-gradient(to_right,transparent,black_40%)]" />
            <div aria-hidden className="absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-cobalt/40 blur-3xl" />
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className={`${label} text-sky`}>
                  <span aria-hidden className="h-px w-8 bg-sky/50" />
                  Go global
                </p>
                <h3 className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Reach your business <span className={`${serif.className} tracking-normal text-sky`}>globally.</span>
                </h3>
                <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-white/65">
                  Your website is open to customers in every country, every hour. We build it fast, secure and search-ready so people
                  anywhere can find you, trust you and get in touch.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {["Online 24×7", "Fast worldwide", "Google-ready", "Secure (SSL)", "Mobile-first"].map((x) => (
                  <li key={x} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[13.5px] text-white/85 backdrop-blur">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* technology we use: real logos scrolling past */}
      <section aria-labelledby="web-tools" className="relative isolate overflow-hidden bg-[#060d18] py-16 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-cobalt/30 blur-3xl" />
        </div>
        <div className="mx-auto flex max-w-[83rem] flex-col gap-3 px-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${label} text-sky`}>
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              Technology we use
            </p>
            <h2 id="web-tools" className="mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium tracking-[-0.03em] text-white">
              Built with modern, <span className={`${serif.className} tracking-normal text-sky`}>proven tools.</span>
            </h2>
          </div>
          <Link href={`/contact?service=${slug}`} className="text-[15px] font-semibold text-sky hover:text-white">
            Get a proposal →
          </Link>
        </div>
        <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {toolRows.map((row, r) => (
            <div key={r} className="marquee overflow-hidden">
              <div className={`marquee-track flex w-max ${r % 2 ? "marquee-reverse" : ""}`} style={{ animationDuration: "80s" }}>
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-4 pr-4">
                    {row.map((t) => (
                      <li key={t.title} className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-2xl bg-white px-5 py-3.5 shadow-sm ring-1 ring-line">
                        <svg viewBox="0 0 24 24" width="26" height="26" fill={t.color} aria-hidden>
                          <path d={t.path} />
                        </svg>
                        <span className="text-[15px] font-semibold text-ink-2">{t.name}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* how the project runs */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[360px] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgb(39_71_214/0.07),transparent_70%)]" />
        <div className="mx-auto max-w-[83rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p data-aos="fade-up" className={`${label} justify-center text-cobalt`}>
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
              Our process
              <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            </p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
              How the project <span className={`${serif.className} tracking-normal text-cobalt`}>runs.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
              Five clear stages, the same for every project, so you always know where things stand.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {process.map((p, i) => {
              // every other stage is navy
              const dark = i % 2 === 1;
              return (
              <li key={p.name} data-aos="fade-up" data-aos-delay={i * 90} className="relative h-full">
                <div className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    dark
                      ? "border-white/10 bg-gradient-to-b from-[#0f1d3d] to-[#060d18] text-white shadow-lg shadow-ink/20 hover:shadow-cobalt/30"
                      : "border-line bg-gradient-to-b from-white to-[#f5f7fc] hover:border-cobalt/25 hover:shadow-cobalt/10"
                  }`}>
                  {/* big outlined stage number in the corner */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-1 -top-3 select-none font-mono text-[76px] font-bold leading-none text-transparent opacity-60 transition ${dark ? "[-webkit-text-stroke:1.5px_rgb(125_211_252/0.22)] group-hover:[-webkit-text-stroke:1.5px_rgb(125_211_252/0.5)]" : "[-webkit-text-stroke:1.5px_rgb(39_71_214/0.18)] group-hover:[-webkit-text-stroke:1.5px_rgb(39_71_214/0.4)]"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`relative grid h-14 w-14 place-items-center rounded-2xl shadow-[0_10px_24px_-12px_rgba(15,29,51,0.3)] ring-1 ${dark ? "bg-white/10 ring-white/15" : "bg-white ring-line"}`}>
                    <Image src={`/included/${stageIcons[i]}.png`} alt="" width={34} height={34} className="h-[34px] w-[34px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  </span>
                  <span className={`relative mt-5 font-mono text-[11.5px] uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-cobalt"}`}>Stage {String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`relative mt-1.5 text-[18px] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{p.name}</h3>
                  <p className={`relative mt-2 text-[14.5px] leading-relaxed ${dark ? "text-white/65" : "text-slate"}`}>{p.text}</p>
                </div>
                {/* arrow to the next stage (desktop) */}
                {i < process.length - 1 && (
                  <span aria-hidden className="absolute -right-[13px] top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-cobalt text-white shadow-md lg:grid">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                )}
              </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
