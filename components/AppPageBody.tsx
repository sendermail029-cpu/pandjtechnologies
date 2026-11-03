import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { process } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";
import { brandIcons, cloudIcons, moreToolIcons, toolIcons } from "@/lib/brand-icons";

const brands = [...brandIcons, ...cloudIcons, ...toolIcons, ...moreToolIcons];

// sectors we build apps for, with the kind of app each usually needs (3D icons in public/industries, Fluent Emoji, MIT)
const sectors = [
  { t: "Healthcare & clinics", d: "Appointments, reports and teleconsults", img: "healthcare" },
  { t: "Diagnostic labs", d: "Test booking, home collection and reports", img: "lab" },
  { t: "Schools & colleges", d: "Parent apps, attendance, fees and notices", img: "education" },
  { t: "Coaching & e-learning", d: "Courses, live classes, tests and progress", img: "coaching" },
  { t: "Retail & e-commerce", d: "Shopping, payments and order tracking", img: "retail" },
  { t: "Supermarkets & grocery", d: "Quick orders, offers and home delivery", img: "supermarket" },
  { t: "Restaurants & food", d: "Menus, online orders and table bookings", img: "restaurant" },
  { t: "Hotels & resorts", d: "Room booking, check-in and guest services", img: "hotel" },
  { t: "Travel & tours", d: "Packages, bookings and trip updates", img: "travel" },
  { t: "Transport & logistics", d: "Live tracking, drivers and deliveries", img: "logistics" },
  { t: "Car rentals & taxis", d: "Ride booking, fares and driver apps", img: "automobile" },
  { t: "Real estate", d: "Property listings, site visits and enquiries", img: "real-estate" },
  { t: "Finance & fintech", d: "Secure payments, wallets and loan apps", img: "finance" },
  { t: "Manufacturing", d: "Dealer orders, stock and service requests", img: "manufacturing" },
  { t: "Agriculture", d: "Farmer apps, produce orders and advisories", img: "agriculture" },
  { t: "Gyms & fitness", d: "Memberships, classes and workout plans", img: "fitness" },
  { t: "Salons & wellness", d: "Appointments, packages and loyalty", img: "salon" },
  { t: "Churches & ministries", d: "Sermons, events, prayer requests and giving", img: "ministry" },
  { t: "Media & podcasts", d: "Streaming, episodes and subscriptions", img: "podcasts" },
  { t: "Field & staff teams", d: "Attendance, tasks, visits and reports", img: "professional" },
];

// 3D icons (public/included, Fluent Emoji MIT) and glow colours for the six included cards
const includedIcons = ["app-design", "app-phone", "app-admin", "app-cloud", "app-bell", "app-store"];
// 3D icons for the five project stages
const stageIcons = ["discover", "propose", "build", "launch", "grow"];

const glows = ["bg-cobalt/15", "bg-[#7c3aed]/15", "bg-saffron/20", "bg-[#ec4899]/15", "bg-[#14b8c4]/15", "bg-emerald-400/20"];

// what an app changes for the business
const results = [
  { t: "Always in their pocket", d: "Your business is one tap away on your customers' phones, every hour of every day.", i: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" },
  { t: "Customers come back", d: "Push notifications, offers and reminders bring people back without paying for ads.", i: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" },
  { t: "A stronger brand", d: "Your own app on the Play Store and App Store builds trust and sets you apart.", i: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" },
  { t: "Faster payments", d: "UPI, cards and wallets built in, so customers can pay in seconds.", i: "M3 6h18v12H3zM3 10h18M7 15h3" },
  { t: "Smoother operations", d: "Bookings, orders and staff tasks handled in the app instead of by phone and paper.", i: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6" },
  { t: "Built to grow", d: "One codebase for Android and iOS, so new features reach every user together.", i: "M13 2 4 14h7l-1 8 9-12h-7z" },
];

// tools we use, as real logos (shared brand icons, plus Kotlin, Swift, Xcode, Dart and Razorpay from Simple Icons, CC0)
const toolNames = [
  ["Flutter", "Dart", "Kotlin", "Swift", "React", "Android Studio", "Xcode", "Figma", "Firebase", "Node.js", "MongoDB", "PostgreSQL", "Razorpay", "Google Play", "App Store", "Google Cloud", "AWS", "GitHub", "VS Code"],
];
const extraLogos = [
  { title: "Kotlin", color: "#7F52FF", path: "M24 24H0V0h24L12 12Z" },
  { title: "Swift", color: "#F05138", path: "M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.003-.263.009-.395.015A9.154 9.154 0 0 0 4.348.15 5.492 5.492 0 0 0 2.85.645 5.04 5.04 0 0 0 .645 2.848c-.245.48-.4.972-.495 1.5-.093.52-.122 1.05-.136 1.576a35.2 35.2 0 0 0-.012.724C0 6.935 0 7.221 0 7.508v8.984c0 .287 0 .575.002.862.002.24.005.481.012.722.014.526.043 1.057.136 1.576.095.528.25 1.02.495 1.5a5.03 5.03 0 0 0 2.205 2.203c.48.244.97.4 1.498.495.52.093 1.05.124 1.576.138.241.007.483.009.724.01.287.002.573.002.86.002h8.984c.287 0 .573 0 .86-.002.241-.001.483-.003.724-.01a10.523 10.523 0 0 0 1.578-.138 5.322 5.322 0 0 0 1.498-.495 5.035 5.035 0 0 0 2.203-2.203c.245-.48.4-.972.495-1.5.093-.52.124-1.05.138-1.576.007-.241.009-.481.01-.722.002-.287.002-.575.002-.862V7.508c0-.287 0-.573-.002-.86a33.662 33.662 0 0 0-.01-.724 10.5 10.5 0 0 0-.138-1.576 5.328 5.328 0 0 0-.495-1.5A5.039 5.039 0 0 0 21.152.645 5.32 5.32 0 0 0 19.654.15a10.493 10.493 0 0 0-1.578-.138 34.98 34.98 0 0 0-.722-.01C17.067 0 16.779 0 16.492 0H7.508zm6.035 3.41c4.114 2.47 6.545 7.162 5.549 11.131-.024.093-.05.181-.076.272l.002.001c2.062 2.538 1.5 5.258 1.236 4.745-1.072-2.086-3.066-1.568-4.088-1.043a6.803 6.803 0 0 1-.281.158l-.02.012-.002.002c-2.115 1.123-4.957 1.205-7.812-.022a12.568 12.568 0 0 1-5.64-4.838c.649.48 1.35.902 2.097 1.252 3.019 1.414 6.051 1.311 8.197-.002C9.651 12.73 7.101 9.67 5.146 7.191a10.628 10.628 0 0 1-1.005-1.384c2.34 2.142 6.038 4.83 7.365 5.576C8.69 8.408 6.208 4.743 6.324 4.86c4.436 4.47 8.528 6.996 8.528 6.996.154.085.27.154.36.213.085-.215.16-.437.224-.668.708-2.588-.09-5.548-1.893-7.992z" },
  { title: "Xcode", color: "#147EFB", path: "M19.06 5.3327c.4517-.1936.7744-.2581 1.097-.1936.5163.1291.7744.5163.968.7098.1936.3872.9034.7744 1.2261.8389.2581.0645.7098-.6453 1.0325-1.2906.3227-.5808.5163-1.3552.4517-1.5488-.0645-.1936-.968-.5808-1.1616-.5808-.1291 0-.3872.1291-.8389.0645-.4517-.0645-.9034-.5808-1.1616-.968-.4517-.6453-1.097-1.0325-1.6778-1.3552-.6453-.3227-1.3552-.5163-2.065-.6453-1.0325-.2581-2.065-.4517-3.0975-.3227-.5808.0645-1.2906.1291-1.8069.3227-.0645 0-.1936.1936-.0645.1936s.5808.0645.5808.0645-.5807.1292-.5807.2583c0 .1291.0645.1291.1291.1291.0645 0 1.4842-.0645 2.065 0 .6453.1291 1.3552.4517 1.8069 1.2261.7744 1.4197.4517 2.7749.2581 3.2266-.968 2.1295-8.6472 15.2294-9.0344 16.1328-.3873.9034-.5163 1.4842.5807 2.065s1.6778.3227 2.0005-.0645c.3872-.5163 7.0339-17.1654 9.2925-18.2624zm-3.6138 8.7117h1.5488c1.0325 0 1.2261.5163 1.2261.7098.0645.5163-.1936 1.1616-1.2261 1.1616h-.968l.7744 1.2906c.4517.7744.2581 1.1616 0 1.4197-.3872.3872-1.2261.3872-1.6778-.4517l-.9034-1.5488c-.6453 1.4197-1.2906 2.9684-2.065 4.7753h4.0009c1.9359 0 3.5492-1.6133 3.5492-3.5492V6.5588c-.0645-.1291-.1936-.0645-.2581 0-.3872.4517-1.4842 2.0004-4.001 7.4856zm-9.8087 8.0019h-.3227c-2.3231 0-4.1945-1.8714-4.1945-4.1945V7.0105c0-2.3231 1.8714-4.1945 4.1945-4.1945h9.3571c-.1936-.1936-.968-.5163-1.7423-.4517-.3227 0-.968.1291-1.3552-.1291-.3872-.3227-.3227-.5163-.9034-.5163H4.9277c-2.6458 0-4.7753 2.1295-4.7753 4.7753v11.7447c0 2.6458 2.1295 4.7753 4.4527 4.7108.6452 0 .8388-.5162 1.0324-.9034zM20.4152 6.9459v10.9058c0 2.3231-1.8714 4.1945-4.1945 4.1945H11.897s-.3872 1.0325.8389 1.0325h3.8719c2.6458 0 4.7753-2.1295 4.7753-4.7753V8.8173c.0646-.9034-.7098-1.4842-.9679-1.8714zm-18.5851.0646v10.8413c0 1.9359 1.6133 3.5492 3.5492 3.5492h.5808c0-.0645.7744-1.4197 2.4522-4.2591.1936-.3872.4517-.7744.7098-1.2261H4.4114c-.5808 0-.9034-.3872-.968-.7098-.1291-.5163.1936-1.1616.9034-1.1616h2.3877l3.033-5.2916s-.7098-1.2906-.9034-1.6133c-.2582-.4517-.1291-.9034.129-1.1615.3872-.3872 1.0325-.5808 1.6778.4517l.2581.3872.2581-.3872c.5808-.8389.968-.7744 1.2906-.7098.5163.1291.8389.7098.3872 1.6133L8.864 14.0444h1.3552c.4517-.7744.9034-1.5488 1.3552-2.3877-.0645-.3227-.1291-.7098-.0645-1.0325.0645-.5163.3227-.968.6453-1.3552l.3872.6453c1.2261-2.1295 2.1295-3.9364 2.3877-4.6463.1291-.3872.3227-1.1616.1291-1.8069H5.3794c-2.0005.0001-3.5493 1.6134-3.5493 3.5494zM4.605 17.7872c0-.0645.7744-1.4197.7744-1.4197 1.2261-.3227 1.8069.4517 1.8714.5163 0 0-.8389 1.4842-1.097 1.7423s-.5808.3227-.9034.2581c-.5164-.129-.839-.6453-.6454-1.097z" },
  { title: "Dart", color: "#0175C2", path: "M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z" },
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

// Body of the Mobile app development page only (its own copy, so edits here don't change the other service pages): what we build, what's included, what changes for the business, technology and process
export function AppPageBody({ page, slug, outcomes, stack }: { page: ServicePage; slug: string; outcomes: string[]; stack: string[] }) {
  const { build, included } = page;
  return (
    <>
      {/* sectors: who we build apps for */}
      <section className="bg-[#f5f7fc] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[83rem]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-aos="fade-up" className={`${label} text-cobalt`}>
                <span aria-hidden className="h-px w-8 bg-cobalt/40" />
                Industries we build for
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink">
                An app built for <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>your sector.</span>
              </h2>
            </div>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-[46ch] text-[16px] leading-relaxed text-slate">
              Every industry works differently. We design each app around how your customers and team actually use it.
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

      {/* what's included: everything around the app */}
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

          {/* hub: the app preview in the middle, the six items around it */}
          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,300px)_1fr] lg:gap-10">
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

            {/* the app we deliver, as one phone preview */}
            <div data-aos="zoom-in" className="relative order-1 mx-auto w-full max-w-[300px] lg:order-2">
              <div aria-hidden className="absolute inset-[-14%] rounded-full bg-cobalt/15 blur-3xl" />
              <div aria-hidden className="absolute inset-[-8%] rounded-full border border-dashed border-cobalt/25" />
              <div className="relative mx-auto w-[260px] overflow-hidden rounded-[40px] border-[6px] border-[#1c2c55] bg-[#060d18] text-white shadow-[0_40px_80px_-30px_rgba(39,71,214,0.6)]">
                <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-black" />
                <div className="space-y-3 p-4 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-sky to-cobalt text-[11px] font-bold">YB</span>
                      <span className="text-[14px] font-semibold">Your App</span>
                    </span>
                    <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
                      </svg>
                      <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#ef4444]" />
                    </span>
                  </div>
                  {/* notification */}
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.08] px-3 py-2 ring-1 ring-white/10">
                    <span className="h-2 w-2 rounded-full bg-saffron" />
                    <span className="text-[11.5px] text-white/80">Your order is on the way</span>
                  </div>
                  {/* banner */}
                  <div className="h-20 rounded-2xl bg-gradient-to-br from-cobalt to-[#7c3aed] p-3">
                    <span className="block h-2 w-20 rounded-full bg-white/80" />
                    <span className="mt-1.5 block h-1.5 w-14 rounded-full bg-white/40" />
                  </div>
                  {/* product grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((k) => (
                      <span key={k} className="space-y-1.5 rounded-xl bg-white/[0.06] p-2 ring-1 ring-white/10">
                        <span className="block h-9 rounded-lg bg-gradient-to-br from-sky/50 to-cobalt/60" />
                        <span className="block h-1.5 w-[80%] rounded-full bg-white/40" />
                      </span>
                    ))}
                  </div>
                  {/* pay button */}
                  <span className="flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[12.5px] font-semibold text-ink">
                    Pay with UPI <span aria-hidden>→</span>
                  </span>
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
                <p className="text-[20px] font-semibold tracking-tight">All {included.items.length} included, from first design to the app stores.</p>
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

      {/* the results: what an app changes for the business */}
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
              A well-built app keeps your business in your customers' hands, every hour of every day.
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
                  Reach customers <span className={`${serif.className} tracking-normal text-sky`}>worldwide.</span>
                </h3>
                <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-white/65">
                  Publish once on the Play Store and App Store and your app is available to customers in every country. We build it
                  fast, secure and ready to scale as your users grow.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {["Play Store", "App Store", "Secure payments", "Push notifications", "Scales with you"].map((x) => (
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
