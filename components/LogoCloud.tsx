import { brandIcons, cloudIcons, moreToolIcons, toolIcons } from "@/lib/brand-icons";

type Logo = { title: string; color?: string; path?: string; img?: string; dark?: boolean };

const pick = (list: { title: string; color: string; path: string }[], title: string): Logo => {
  const i = list.find((x) => x.title === title);
  return i ? { title: i.title, color: i.color, path: i.path } : { title };
};

const logos: Logo[] = [
  pick(toolIcons, "Android Studio"),
  pick(brandIcons, "Google Play"),
  pick(toolIcons, "Flutter"),
  pick(cloudIcons, "Google Cloud"),
  pick(toolIcons, "Railway"),
  pick(cloudIcons, "Vercel"),
  pick(toolIcons, "MongoDB"),
  pick(toolIcons, "Git"),
  pick(toolIcons, "Google"),
  pick(brandIcons, "Meta"),
  pick(brandIcons, "Google Ads"),
  pick(moreToolIcons, "Next.js"),
  pick(moreToolIcons, "Firebase"),
  pick(moreToolIcons, "Premiere Pro"),
];

// where each tile sits (percent of the headline area) and how big it is; kept clear of the text and the help icon
const spots = [
  // a row above the headline (right of the eyebrow label)
  { x: 32, y: -6, s: 46 },
  { x: 42, y: -2, s: 52 },
  { x: 52, y: -7, s: 46 },
  { x: 62, y: -1, s: 50 },
  { x: 72, y: -6, s: 46 },
  { x: 82, y: -2, s: 52 },
  { x: 92, y: -7, s: 46 },
  // between the headline and the help icon
  { x: 64, y: 32, s: 50 },
  { x: 67, y: 58, s: 44 },
  { x: 63, y: 84, s: 50 },
  // along the right edge
  { x: 101, y: 30, s: 46 },
  { x: 102, y: 60, s: 50 },
  { x: 100, y: 92, s: 44 },
  { x: 101, y: 4, s: 44 },
]

// Background of floating brand tiles (tools we build with, ad platforms, test partners) for the contact hero
export function LogoCloud({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {logos.map((l, i) => {
        const p = spots[i % spots.length];
        const wide = !!l.img && !l.dark; // Meazure's logo is a wordmark
        return (
          <span
            key={l.title}
            className={`float-icon absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl shadow-lg shadow-ink/10 ring-1 ${
              l.dark ? "bg-ink ring-ink/20" : "bg-white/90 ring-line backdrop-blur"
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: wide ? p.s * 2 : p.s,
              height: p.s,
              animationDelay: `${(i % 7) * 0.6}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          >
            {l.path ? (
              <svg viewBox="0 0 24 24" fill={l.color} style={{ width: p.s * 0.5, height: p.s * 0.5 }}>
                <path d={l.path} />
              </svg>
            ) : l.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={l.img} alt="" style={{ height: p.s * 0.42 }} className="w-auto" />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
