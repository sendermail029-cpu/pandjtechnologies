import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { WebsiteBuildMockup } from "@/components/WebsiteBuildMockup";
import { ServiceHeroVisual } from "@/components/ServiceHeroVisual";
import { ServiceBody } from "@/components/ServiceBody";
import { WebsitePageBody } from "@/components/WebsitePageBody";
import { AppPageBody } from "@/components/AppPageBody";
import { CrmPageBody } from "@/components/CrmPageBody";
import { ErpPageBody } from "@/components/ErpPageBody";
import { CustomPageBody } from "@/components/CustomPageBody";
import { MarketingPageBody } from "@/components/MarketingPageBody";
import { WebsiteHeroTabs } from "@/components/WebsiteHeroTabs";
import { MarketingHeroVisual } from "@/components/MarketingHeroVisual";
import { services } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";

// hero tabs on the app page
const appTabs = [
  { t: "Booking", d: "Appointments, reminders and payments in your customers' pocket." },
  { t: "E-commerce", d: "Shop, pay and track orders, with your brand on their home screen." },
  { t: "Education", d: "Courses, videos, tests and progress tracking for learners." },
  { t: "Staff apps", d: "Attendance, tasks and field reports for teams on the move." },
];

// hero tabs on the CRM page
const crmTabs = [
  { t: "Capture", d: "Leads from ads, your website and WhatsApp land in one inbox." },
  { t: "Follow up", d: "Reminders and assignments, so no enquiry is forgotten." },
  { t: "Close", d: "GST-ready quotes and a clear pipeline to win more deals." },
  { t: "Report", d: "Live dashboards that show what's really working." },
];

// hero tabs on the ERP page
const erpTabs = [
  { t: "Inventory", d: "Real-time stock across every branch and warehouse." },
  { t: "Billing", d: "GST invoices and e-invoicing straight from each order." },
  { t: "Purchase", d: "Purchase orders, approvals and vendors in one flow." },
  { t: "HR & accounts", d: "Attendance, payroll and accounts, connected to everything else." },
];

// hero tabs on the SaaS, AI & custom software page
const customTabs = [
  { t: "SaaS", d: "Your own product, sold on subscription to customers anywhere." },
  { t: "AI agents", d: "Agents that answer customers, qualify leads and update records." },
  { t: "Hardware + IoT", d: "Sensors, scanners and devices connected to live dashboards." },
  { t: "Custom", d: "Any requirement, built around how your business works." },
];

// hero tabs on the digital marketing page
const marketingTabs = [
  { t: "Meta Ads", d: "Facebook and Instagram ads shown to the people most likely to buy." },
  { t: "Google Ads", d: "Search and YouTube ads that reach customers while they are looking." },
  { t: "WhatsApp", d: "Automatic replies, menus and bookings on WhatsApp, any hour." },
  { t: "AI calling", d: "AI agents that call every new lead within minutes." },
];

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.name, description: s.summary };
}

// Every service page shares one layout: a navy hero with the service's own animated visual, then the shared body
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  const page = servicePages[slug];
  if (!s || !page) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#060d18] px-6 pb-20 pt-14 text-white sm:pt-20 lg:pb-24">
        {/* faint grid and glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="footer-glow absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-cobalt/30 blur-3xl" />
          <div className="footer-glow absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-3xl [animation-delay:-9s]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060d18] to-transparent" />
          {/* ERP and custom software: fade the glows out at the bottom so the hero runs straight into the next navy section */}
          {["erp-software", "custom-software", "digital-marketing"].includes(s.slug) && <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#060d18]" />}
        </div>
        <div className="mx-auto grid max-w-[83rem] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="order-2 min-w-0 lg:order-1">
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-sky">
              <span aria-hidden className="h-px w-8 bg-sky/50" />
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden className="text-white/30">/</span>
              <span className="text-white/60">{page.crumb}</span>
            </nav>
            <h1 data-aos="fade-up" className="mt-5 text-[clamp(2.3rem,5vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.04em] sm:mt-6">
              {page.hero.plain} <span className={`${serif.className} tracking-normal text-sky`}>{page.hero.accent}</span>
            </h1>
            {s.slug === "website-design" ? (
              // website page only: tabs for each kind of website instead of the long description
              <WebsiteHeroTabs />
            ) : s.slug === "app-development" ? (
              <WebsiteHeroTabs label="Kinds of apps" tabs={appTabs} />
            ) : s.slug === "crm-software" ? (
              <WebsiteHeroTabs label="CRM features" tabs={crmTabs} />
            ) : s.slug === "erp-software" ? (
              <WebsiteHeroTabs label="ERP modules" tabs={erpTabs} />
            ) : s.slug === "custom-software" ? (
              <WebsiteHeroTabs label="What we build" tabs={customTabs} />
            ) : s.slug === "digital-marketing" ? (
              <WebsiteHeroTabs label="What we run" tabs={marketingTabs} />
            ) : (
              <p data-aos="fade-up" data-aos-delay="100" className="mt-6 hidden max-w-[54ch] text-[17px] leading-relaxed text-white/65 sm:block">
                {s.summary}
              </p>
            )}

            <div data-aos="fade-up" data-aos-delay="150" className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link
                href={`/contact?service=${s.slug}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-3.5 text-[14.5px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#e0f2fe] sm:px-7 sm:text-[15px]"
              >
                Get a proposal <span aria-hidden>→</span>
              </Link>
              <a
                href="#included"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-3.5 text-[14.5px] font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:px-7 sm:text-[15px]"
              >
                What&apos;s included
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {s.slug === "website-design" ? (
              <WebsiteBuildMockup />
            ) : s.slug === "digital-marketing" ? (
              <MarketingHeroVisual />
            ) : (
              <ServiceHeroVisual slug={s.slug} tags={page.tags} />
            )}
          </div>
        </div>
      </section>

      {/* the website page has its own body so it can be changed on its own */}
      {s.slug === "website-design" ? (
        <WebsitePageBody page={page} slug={s.slug} outcomes={s.outcomes} stack={s.stack} />
      ) : s.slug === "app-development" ? (
        <AppPageBody page={page} slug={s.slug} outcomes={s.outcomes} stack={s.stack} />
      ) : s.slug === "crm-software" ? (
        <CrmPageBody page={page} slug={s.slug} />
      ) : s.slug === "erp-software" ? (
        <ErpPageBody page={page} slug={s.slug} />
      ) : s.slug === "custom-software" ? (
        <CustomPageBody page={page} slug={s.slug} />
      ) : s.slug === "digital-marketing" ? (
        <MarketingPageBody page={page} slug={s.slug} />
      ) : (
        <ServiceBody page={page} slug={s.slug} outcomes={s.outcomes} stack={s.stack} />
      )}
    </>
  );
}
