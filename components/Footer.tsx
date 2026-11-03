import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { HideOn } from "./HideOn";
import { Logo } from "./Logo";
import { LookingEyes } from "./LookingEyes";
import { OfficeStatus } from "./OfficeStatus";
import { company, services } from "@/lib/site";
import { serviceIcons, testCenterIcon } from "@/lib/service-icons";

// serif accent to echo the wordmark in the logo
const serif = Playfair_Display({ subsets: ["latin"], weight: "600", style: "italic" });

const socials = [
  {
    label: "LinkedIn",
    hover: "hover:bg-[#0A66C2] hover:shadow-[#0A66C2]/50",
    href: company.social.linkedin,
    icon: (
      <>
        <circle cx="6" cy="6.5" r="1.7" fill="currentColor" />
        <path d="M4.5 9.5h3V19h-3zM10 9.5h2.9v1.4c.6-1 1.7-1.6 3.1-1.6 2.6 0 3.9 1.6 3.9 4.6V19h-3v-4.8c0-1.5-.5-2.3-1.7-2.3s-2.2.8-2.2 2.4V19h-3z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Instagram",
    hover: "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:shadow-[#dd2a7b]/50",
    href: company.social.instagram,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Facebook",
    hover: "hover:bg-[#1877F2] hover:shadow-[#1877F2]/50",
    href: company.social.facebook,
    icon: <path d="M13.5 21v-7.5H16l.5-3H13.5V8.8c0-.9.3-1.5 1.5-1.5h1.6V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H8v3h2.5V21z" fill="currentColor" />,
  },
  {
    label: "X",
    hover: "hover:bg-white hover:!text-ink hover:shadow-white/30",
    href: company.social.x,
    icon: (
      <>
        <path d="M4 4h4.6l11.4 16h-4.6z" fill="currentColor" />
        <path d="M19.5 4l-6.6 7.3M4.5 20l6.6-7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
];

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

// short service names for the footer
const short: Record<string, string> = {
  "website-design": "Websites",
  "app-development": "Mobile apps",
  "crm-software": "CRM",
  "erp-software": "ERP",
  "custom-software": "SaaS & AI",
  "digital-marketing": "Digital marketing",
};
const dots = ["bg-sky", "bg-[#a78bfa]", "bg-emerald-400", "bg-saffron", "bg-[#f472b6]", "bg-[#60a5fa]", "bg-[#2dd4bf]"];
const serviceLinks = [
  ...services.map((s) => ({ href: `/services/${s.slug}`, label: short[s.slug] ?? s.name.split(" —")[0] })),
  { href: "/test-center", label: "Test center" },
].map((l, k) => ({ ...l, dot: dots[k % dots.length] }));

// the scrolling ticker: each service as a pill with its own colour
const tick = (t: string, icon: string, tone: string) => ({ t, icon, tone });
const ticker = [
  tick("Websites", serviceIcons["website-design"], "from-sky to-cobalt"),
  tick("Mobile apps", serviceIcons["app-development"], "from-[#a78bfa] to-[#6d28d9]"),
  tick("CRM software", serviceIcons["crm-software"], "from-emerald-400 to-emerald-600"),
  tick("ERP software", serviceIcons["erp-software"], "from-saffron to-[#ea580c]"),
  tick("SaaS products", "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z", "from-[#60a5fa] to-[#2563eb]"),
  tick("AI agents", "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6", "from-[#f472b6] to-[#7c3aed]"),
  tick("Digital marketing", serviceIcons["digital-marketing"], "from-[#fb7185] to-[#db2777]"),
  tick("WhatsApp automation", "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z", "from-[#4ade80] to-[#16a34a]"),
  tick("Authorized test center", testCenterIcon, "from-[#fbbf24] to-[#d97706]"),
];

const colHead = "text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/40";
// underline grows in on hover
const link =
  "relative text-white/65 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-sky after:transition-all after:duration-300 hover:after:w-full";

// A short footer: one-line call to action, then brand, links and contact in one row
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-[#050b16] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="footer-glow absolute -left-40 -top-20 h-[360px] w-[480px] rounded-full bg-cobalt/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="beam-run absolute left-0 top-0 h-px w-[30%] bg-gradient-to-r from-transparent via-sky to-transparent shadow-[0_0_12px_2px_rgba(56,189,248,0.6)]" />
        <div className="footer-glow absolute -right-40 bottom-0 h-[320px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-3xl [animation-delay:-9s]" />
      </div>

      <div className="mx-auto max-w-[83rem] px-6">
        {/* one-line call to action (not needed on the contact and careers pages) */}
        <HideOn paths={["/contact", "/careers"]}>
          <div className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em]">
              <span className="sr-only">Looking to build something together?</span>
              <span aria-hidden>
                L<LookingEyes />king to build something{" "}
                {/* light blue, with a soft light passing through it */}
                <span
                  className={`${serif.className} title-flow bg-clip-text pr-1 font-medium tracking-normal text-transparent`}
                  style={{ backgroundImage: "linear-gradient(90deg, #38bdf8, #38bdf8, #e0f2fe, #38bdf8, #38bdf8)" }}
                >
                  together?
                </span>
              </span>
            </p>
            <Link
              href="/contact"
              className="group relative isolate inline-flex shrink-0 self-start overflow-hidden rounded-full p-[2px] shadow-[0_0_30px_-6px_rgba(56,189,248,0.6)] transition hover:-translate-y-0.5 sm:self-auto"
            >
              {/* the glowing border turns around the button */}
              <span aria-hidden className="orbit-spin absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#38bdf8_70deg,#a78bfa_130deg,#f472b6_170deg,transparent_220deg)] [animation-duration:3.5s]" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14.5px] font-semibold text-ink transition group-hover:bg-[#e0f2fe]">
                Start a project
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </HideOn>

      </div>

      {/* what we do, scrolling past as glossy pills */}
      <div aria-hidden className="marquee overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center [animation-duration:50s]">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0 items-center gap-3 pr-3">
              {ticker.map((x) => (
                <span
                  key={x.t}
                  className="flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-b from-white/[0.09] to-white/[0.03] py-1.5 pl-1.5 pr-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10"
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${x.tone} text-white shadow-lg shadow-black/30`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={x.icon} />
                    </svg>
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight text-white/90 sm:text-[16px]">{x.t}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[83rem] px-6">
        {/* brand, links and contact in one row */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-[1.3fr_1fr_0.8fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-white/50">
              Websites, mobile apps, CRM, ERP, SaaS &amp; AI solutions, digital marketing and an authorized test center, from
              Vijayawada.
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-white/70 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:text-white hover:shadow-lg hover:ring-transparent ${s.hover}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>{s.icon}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={colHead}>Services</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center gap-2.5 text-white/65 transition hover:text-white">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${l.dot} opacity-60 transition duration-300 group-hover:scale-150 group-hover:opacity-100`} />
                    <span className="transition duration-300 group-hover:translate-x-1">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={colHead}>Company</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className={colHead}>Get in touch</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <a href={`mailto:${company.email}`} className={`${link} break-all`}>{company.email}</a>
              </li>
              {company.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className={link}>
                    <span className="text-white/40">{p.label}</span> {p.number}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-white/50">{company.offices.map((o) => o.city).join(" · ")}</li>
              <li className="pt-2">
                <OfficeStatus />
              </li>
            </ul>
          </div>
        </div>

        {/* legal; right padding keeps room for a floating chat assistant in the corner */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
          <p>© {year} P &amp; J Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy policy</Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">Terms &amp; conditions</Link>
            <a href="#" className="group inline-flex items-center gap-1.5 transition-colors hover:text-white">
              Back to top
              <span aria-hidden className="inline-block transition duration-300 group-hover:-translate-y-1 group-hover:text-sky">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
