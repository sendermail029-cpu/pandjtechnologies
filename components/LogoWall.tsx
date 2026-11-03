import { brandIcons, cloudIcons, moreToolIcons, pearsonPath, toolIcons } from "@/lib/brand-icons";

type Logo = { title: string; color?: string; path?: string; img?: string; dark?: boolean };

const all = [...brandIcons, ...cloudIcons, ...toolIcons, ...moreToolIcons];
const get = (title: string): Logo => {
  const i = all.find((x) => x.title === title);
  return i ? { title, color: i.color, path: i.path } : { title };
};

// grouped so each row reads as a theme
const rows: Logo[][] = [
  // build: code, frameworks, apps
  ["Next.js", "React", "Tailwind CSS", "TypeScript", "JavaScript", "Node.js", "HTML5", "CSS3", "VS Code", "Visual Studio", "Android Studio", "Flutter", "Git", "GitHub"].map(get),
  // ship: cloud, data, stores, CMS
  ["Google Cloud", "Firebase", "Vercel", "Railway", "MongoDB", "PostgreSQL", "Google Play", "App Store", "WordPress", "Shopify", "HubSpot", "Zoho", "SAP", "Odoo"].map(get),
  // grow and create: marketing, SEO, design, video, and our testing partners
  [
    ...["Meta", "Google Ads", "Google", "Search Console (SEO)", "Google Analytics", "Figma", "Canva", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "DaVinci Resolve", "Blender"].map(get),
    { title: "Pearson VUE", color: "#000000", path: pearsonPath },
    { title: "PSI", img: "/partners/psi.svg", dark: true },
    { title: "Meazure Learning", img: "/partners/meazure-learning.svg" },
  ],
];

function Tile({ l }: { l: Logo }) {
  return (
    <li
      className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-2xl px-4 py-3 shadow-md shadow-ink/[0.06] ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        l.dark ? "bg-ink text-white ring-ink" : "bg-white text-ink-2 ring-line"
      }`}
    >
      {l.path ? (
        <svg viewBox="0 0 24 24" fill={l.color} width="26" height="26" aria-hidden>
          <path d={l.path} />
        </svg>
      ) : l.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={l.img} alt="" className="h-6 w-auto" />
      ) : null}
      {!(l.img && !l.dark) && <span className="text-[14.5px] font-semibold">{l.title}</span>}
    </li>
  );
}

// "Tools we work with": three rows of brand tiles drifting in alternate directions (pauses on hover)
export function LogoWall() {
  return (
    <section aria-labelledby="tools-title" className="relative overflow-hidden border-t border-line bg-gradient-to-b from-white to-paper py-14">
      <div className="mx-auto max-w-[83rem] px-6">
        <p id="tools-title" data-aos="fade-up" className="text-center text-[13px] font-semibold uppercase tracking-[0.2em] text-slate">
          Tools, platforms &amp; partners we work with
        </p>
      </div>
      <div className="mt-8 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="marquee overflow-hidden">
            <div className={`marquee-track flex w-max ${r % 2 === 1 ? "marquee-reverse" : ""}`} style={{ animationDuration: `${70 + r * 12}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
                  {row.map((l) => (
                    <Tile key={l.title} l={l} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
