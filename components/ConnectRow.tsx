import { company } from "@/lib/site";

// quiet round outline links, in the same style as the footer socials: directions, chat, email and social profiles
const links = [
  { label: "Directions", href: company.mapsUrl, d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
  { label: "WhatsApp", href: `https://wa.me/${company.whatsapp}`, d: "M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z" },
  { label: "Email", href: `mailto:${company.email}`, d: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { label: "Instagram", href: company.social.instagram, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5v.01" },
  { label: "X", href: company.social.x, d: "M4 4l16 16M20 4 4 20" },
  { label: "Facebook", href: company.social.facebook, d: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" },
  { label: "LinkedIn", href: company.social.linkedin, d: "M6 9v10M6 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10" },
];

export function ConnectRow({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-slate">
        Or connect with us
        <span aria-hidden className="h-px flex-1 bg-line" />
      </p>
      {/* one row of seven, always: the icons share the width evenly and never wrap */}
      <ul className="mt-4 grid max-w-[420px] grid-cols-7 gap-1.5 sm:gap-2.5">
        {links.map((l) => (
          <li key={l.label} className="flex justify-center">
            <a
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={l.label}
              title={l.label}
              className="grid aspect-square w-full max-w-[46px] place-items-center rounded-full border border-line text-ink-2 transition duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={l.d} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
