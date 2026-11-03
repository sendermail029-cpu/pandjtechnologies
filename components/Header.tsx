"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import VenomButton from "./originkit/ui/venom-button";
import { company, services, testingPartners } from "@/lib/site";
import { serviceIcons, testCenterIcon } from "@/lib/service-icons";

const companyLinks = [
  { href: "/about", label: "About us", text: "Who we are, our mission and values.", icon: "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
  { href: "/how-we-work", label: "How we work", text: "Our five-stage process and written commitments.", icon: "M4 6h16M4 12h10M4 18h6M17 15l2 2 3-4" },
  { href: "/clients", label: "Clients", text: "Businesses and partners who trust our team.", icon: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7" },
];

const nav = [
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
];

// on pages with a navy hero the header turns navy too (data-dark on the header), so links switch to light colours
const navLink = (active: boolean) =>
  `whitespace-nowrap rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-cobalt group-data-[dark=true]/header:hover:text-white ${
    active ? "text-cobalt group-data-[dark=true]/header:text-sky" : "text-ink-2 group-data-[dark=true]/header:text-white/75"
  }`;

// pages whose first section is deep navy
const darkHero = (path: string) => path === "/" || path === "/contact" || path === "/test-center" || path === "/careers" || path === "/about" || path === "/how-we-work" || path === "/clients" || path.startsWith("/services/") || path === "/faqs" || path === "/privacy-policy" || path === "/terms-and-conditions";

// A top-level menu item that opens a panel on hover (or via its arrow button).
// "nav" panels centre under the whole menu bar; "item" panels sit under their own label.
function NavDropdown({
  label,
  href,
  active,
  anchor = "item",
  panelClassName,
  children,
}: {
  label: string;
  href?: string; // without one, the label just opens the menu
  active: boolean;
  anchor?: "item" | "nav";
  panelClassName: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = () => setOpen(false);
  return (
    <div className={`flex items-center ${anchor === "item" ? "relative" : ""}`} onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      {href ? (
        <Link href={href} aria-current={active ? "page" : undefined} className={`${navLink(active)} pr-1`}>
          {label}
        </Link>
      ) : (
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={`${navLink(active)} pr-1`}>
          {label}
        </button>
      )}
      <button
        className="grid h-8 w-6 place-items-center rounded-md text-ink-2 hover:text-cobalt group-data-[dark=true]/header:text-white/60 group-data-[dark=true]/header:hover:text-white"
        aria-expanded={open}
        aria-label={`Show ${label.toLowerCase()} pages`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute left-1/2 top-full z-50 pt-4 ${panelClassName}`}
            style={{ x: "-50%" }}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_30px_80px_-24px_rgba(15,29,51,0.4)]">
              {children(close)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Line icon used in the menus
const MenuIcon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// One menu row: icon tile, title and a line of text. On hover the tile turns cobalt and an arrow slides in.
function MenuItem({
  href,
  icon,
  title,
  text,
  current,
  onClick,
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
  current?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className="group flex items-start gap-3.5 rounded-2xl p-3 transition-colors hover:bg-[#f3f6ff]"
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 transition duration-300 group-hover:bg-cobalt group-hover:text-white group-hover:ring-cobalt ${
          current ? "bg-cobalt text-white ring-cobalt" : "bg-[#eef3ff] text-cobalt ring-cobalt/10"
        }`}
      >
        <MenuIcon d={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-[14.5px] font-semibold text-ink">
          {title}
          <ArrowRight className="-translate-x-1 text-cobalt opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-slate">{text}</span>
      </span>
    </Link>
  );
}

// short service names for the phone menu
const shortNames: Record<string, string> = {
  "website-design": "Websites",
  "app-development": "Mobile apps",
  "crm-software": "CRM software",
  "erp-software": "ERP software",
  "custom-software": "SaaS & AI",
  "digital-marketing": "Digital marketing",
};

const waIcon =
  "M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.6 3.6 0 0 0-1.1 2.6 6.2 6.2 0 0 0 1.3 3.3 14 14 0 0 0 5.4 4.8c2 .9 2.8.9 3.8.8.6-.1 1.8-.8 2.1-1.5a2.6 2.6 0 0 0 .2-1.5c-.1-.2-.3-.2-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8z";

// Phone menu: a navy full-screen panel. Services as icon tiles, the test center as a feature card,
// company pages as rows, and contact actions kept at the bottom.
function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  // items rise in one after another
  const item = (k: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05 + k * 0.035, ease: [0.22, 1, 0.36, 1] as const } };
  const pages = [{ href: "/", label: "Home" }, ...companyLinks.map((c) => ({ href: c.href, label: c.label })), ...nav];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#060d18] text-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* glows and a faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)]" />
        <div className="footer-glow absolute -right-32 -top-24 h-80 w-80 rounded-full bg-cobalt/40 blur-3xl" />
        <div className="footer-glow absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#7c3aed]/20 blur-3xl [animation-delay:-9s]" />
      </div>

      <div className="relative flex h-[72px] shrink-0 items-center justify-between px-6">
        <Logo badge />
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white hover:text-ink"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-2">
        {/* services */}
        <motion.p {...item(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-sky/80">Services</motion.p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {services.map((sv, k) => {
            const on = pathname === `/services/${sv.slug}`;
            return (
              <motion.li key={sv.slug} {...item(k + 1)}>
                <Link
                  href={`/services/${sv.slug}`}
                  onClick={onClose}
                  aria-current={on ? "page" : undefined}
                  className={`flex h-full items-center gap-2.5 rounded-2xl p-2.5 ring-1 transition active:scale-[0.98] ${
                    on ? "bg-gradient-to-br from-cobalt to-[#1e7fd6] ring-sky/40" : "bg-white/[0.05] ring-white/10 hover:bg-white/[0.09]"
                  }`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${on ? "bg-white/20 text-white" : "bg-sky/15 text-sky"}`}>
                    <MenuIcon d={serviceIcons[sv.slug]} />
                  </span>
                  <span className="text-[14px] font-semibold leading-tight">{shortNames[sv.slug] ?? sv.name.split(" —")[0]}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* test center */}
        <motion.div {...item(8)}>
          <Link
            href="/test-center"
            onClick={onClose}
            className="relative mt-2 flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-saffron/20 to-saffron/5 p-3.5 ring-1 ring-saffron/30 transition active:scale-[0.99]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-saffron/20 text-saffron">
              <MenuIcon d={testCenterIcon} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold">Authorized test center</span>
              <span className="block truncate text-[12.5px] text-white/55">{testingPartners.join(" · ")}</span>
            </span>
            <ArrowRight className="shrink-0 text-saffron" />
          </Link>
        </motion.div>

        {/* pages */}
        <motion.p {...item(9)} className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-sky/80">Company</motion.p>
        <ul className="mt-2">
          {pages.map((p, k) => {
            const on = pathname === p.href;
            return (
              <motion.li key={p.href} {...item(10 + k)} className="border-b border-white/[0.08] last:border-0">
                <Link
                  href={p.href}
                  onClick={onClose}
                  aria-current={on ? "page" : undefined}
                  className={`flex items-center justify-between py-3 text-[16.5px] font-medium transition ${on ? "text-sky" : "text-white/85 hover:text-white"}`}
                >
                  <span className="flex items-center gap-3">
                    {on && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky" />}
                    {p.label}
                  </span>
                  <ArrowRight className={on ? "text-sky" : "text-white/30"} />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* contact actions, always in reach */}
      <motion.div {...item(16)} className="relative shrink-0 border-t border-white/10 bg-[#060d18]/90 px-6 pb-6 pt-4 backdrop-blur">
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[15.5px] font-semibold text-ink transition active:scale-[0.99]"
        >
          Let&apos;s collaborate <ArrowRight />
        </Link>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${company.phones[0].tel}`}
            className="flex items-center justify-center gap-2 rounded-full bg-white/[0.06] py-3 text-[14px] font-semibold ring-1 ring-white/15"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            Call us
          </a>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366]/15 py-3 text-[14px] font-semibold text-[#4ade80] ring-1 ring-[#25D366]/30"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d={waIcon} />
            </svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // the liquid button is hidden on phones, so only load and run it on wider screens
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  const inCompany = companyLinks.some((c) => pathname === c.href);
  const dark = darkHero(pathname);

  return (
    <>
      <header data-dark={dark} className={`group/header relative z-40 ${dark ? "bg-[#060d18]" : "bg-white"}`}>
        <div className="mx-auto flex h-[72px] max-w-[83rem] items-center justify-between px-6">
          <Logo badge={dark} />

          <nav className="relative hidden items-center gap-1 lg:flex" aria-label="Main">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={navLink(pathname === "/")}>
              Home
            </Link>

            <NavDropdown label="Services" active={pathname.startsWith("/services")} anchor="nav" panelClassName="w-[860px]">
              {(close) => (
                <div className="grid grid-cols-[260px_1fr]">
                  {/* navy side panel, like the footer: the test center as one feature link */}
                  <Link
                    href="/test-center"
                    onClick={close}
                    className="group relative isolate flex flex-col overflow-hidden bg-[#060d18] p-6 text-white"
                  >
                    <div aria-hidden className="absolute -bottom-20 -left-16 -z-10 h-56 w-56 rounded-full bg-cobalt/45 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                    <div aria-hidden className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-saffron/0 blur-3xl transition duration-500 group-hover:bg-saffron/25" />
                    <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-saffron/15 text-saffron ring-1 ring-saffron/30 transition duration-300 group-hover:scale-105">
                      <MenuIcon d={testCenterIcon} />
                    </span>
                    <span className="mt-5 text-[17px] font-semibold tracking-tight">Authorized test center</span>
                    <span className="mt-2 text-[13px] leading-relaxed text-white/60">
                      Secure, proctored computer-based exams in Vijayawada.
                    </span>
                    <span className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-[12.5px] text-white/75">
                      {testingPartners.map((t) => (
                        <span key={t} className="flex items-center gap-2">
                          <span aria-hidden className="h-1 w-1 rounded-full bg-saffron" />
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-saffron">
                      Book an exam <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <div className="grid grid-cols-2 gap-1 p-3">
                    {services.map((s) => (
                      <MenuItem
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        icon={serviceIcons[s.slug]}
                        title={s.name.split(" —")[0]}
                        text={s.short}
                        current={pathname === `/services/${s.slug}`}
                        onClick={close}
                      />
                    ))}
                  </div>
                </div>
              )}
            </NavDropdown>

            <Link
              href="/test-center"
              aria-current={pathname === "/test-center" ? "page" : undefined}
              className={`${navLink(pathname === "/test-center")} inline-flex items-center gap-1.5`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron" aria-hidden>
                <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
              </svg>
              Test center
            </Link>

            <NavDropdown label="Company" href="/about" active={inCompany} panelClassName="w-[360px]">
              {(close) => (
                <>
                  <div className="grid gap-0.5 p-3">
                    {companyLinks.map((c) => (
                      <MenuItem key={c.href} href={c.href} icon={c.icon} title={c.label} text={c.text} current={pathname === c.href} onClick={close} />
                    ))}
                  </div>
                  <a
                    href={`tel:${company.phones[0].tel}`}
                    className="group flex items-center justify-between bg-[#060d18] px-6 py-4 text-[13.5px] text-white/70 transition-colors hover:text-white"
                  >
                    <span>
                      Talk to us <span className="ml-1 font-semibold text-white">{company.phones[0].number}</span>
                    </span>
                    <ArrowRight className="text-sky transition-transform group-hover:translate-x-0.5" />
                  </a>
                </>
              )}
            </NavDropdown>

            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? "page" : undefined}
                className={navLink(pathname === n.href)}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* liquid "Venom" button: strands of navy goo reach toward the pointer */}
            <div className="relative hidden h-[72px] w-[250px] sm:block">
              {wide && (
              <VenomButton
                label="Let's collaborate"
                background="transparent"
                gooColor={dark ? "#2747d6" : "#0b2a66"}
                textColor="#FFFFFF"
                size={44}
                strands={6}
                reach={90}
                cursor="native"
                autoplay={false}
                font={{ fontFamily: "inherit", fontSize: 15, fontWeight: 600, letterSpacing: "0" }}
                onClick={() => router.push("/contact")}
                style={{ minWidth: 0, minHeight: 0 }}
              />
              )}
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-ink/[0.05] text-ink ring-1 ring-ink/10 transition hover:bg-ink hover:text-white group-data-[dark=true]/header:bg-white/10 group-data-[dark=true]/header:text-white group-data-[dark=true]/header:ring-white/15 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 8h14M5 12h14M5 16h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
