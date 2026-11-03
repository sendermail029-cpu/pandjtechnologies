type Node = { x: number; y: number; label: string; sub: string; accent?: boolean; delay: number };

const W = 200;
const H = 60;

const nodes: Node[] = [
  { x: 30, y: 30, label: "Meta Ads", sub: "Facebook & Instagram", delay: 0.1 },
  { x: 290, y: 30, label: "Google Ads", sub: "Search & YouTube", delay: 0.2 },
  { x: 160, y: 140, label: "Website", sub: "Landing page + enquiry form", delay: 0.35 },
  { x: 30, y: 250, label: "CRM", sub: "Lead assigned, follow-up set", delay: 0.5 },
  { x: 290, y: 250, label: "ERP", sub: "Order, invoice, stock", delay: 0.65 },
  { x: 160, y: 360, label: "Owner dashboard", sub: "Revenue and conversions", accent: true, delay: 0.8 },
];

const leadPath =
  "M130 90 C130 118 260 112 260 140 L260 200 C260 228 130 222 130 250 L130 280 L390 280 L390 310 C390 338 260 332 260 360 L260 390";

export function HeroFlow() {
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-[28px] bg-ink p-5 sm:p-7 shadow-[0_40px_80px_-30px_rgba(15,29,51,0.55)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <svg viewBox="22 22 476 406" className="relative w-full" role="img" aria-labelledby="flow-title">
          <title id="flow-title">
            How a customer enquiry moves from Meta and Google Ads to your website, CRM, ERP and owner dashboard
          </title>

          {/* connectors */}
          <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="4 5">
            <path d="M130 90 C130 118 260 112 260 140" />
            <path d="M390 90 C390 118 260 112 260 140" />
            <path d="M260 200 C260 228 130 222 130 250" />
            <path d="M230 280 L290 280" />
            <path d="M390 310 C390 338 260 332 260 360" />
          </g>

          {nodes.map((n) => (
            <g key={n.label} className="flow-node" style={{ animationDelay: `${n.delay}s` }}>
              <rect
                x={n.x}
                y={n.y}
                width={W}
                height={H}
                rx="14"
                fill={n.accent ? "#f6f7f9" : "#1c2c47"}
                stroke={n.accent ? "none" : "rgba(255,255,255,0.12)"}
              />
              <circle cx={n.x + 22} cy={n.y + 30} r="5" fill={n.accent ? "#2747d6" : "#f0a23b"} opacity={n.accent ? 1 : 0.9} />
              <text x={n.x + 38} y={n.y + 26} fontSize="15" className="flow-label" fontWeight="600" fill={n.accent ? "#0f1d33" : "#fff"}>
                {n.label}
              </text>
              <text className="flow-sub" x={n.x + 38} y={n.y + 44} fontSize="11.5" fill={n.accent ? "#586479" : "rgba(255,255,255,0.58)"}>
                {n.sub}
              </text>
            </g>
          ))}

          {/* the lead: one orchestrated motion */}
          <g className="flow-lead-wrap">
            <circle r="13" fill="#f0a23b" opacity="0.18">
              <animateMotion dur="6s" begin="1.4s" repeatCount="indefinite" path={leadPath} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".55 .05 .35 .95" />
            </circle>
            <circle r="5.5" fill="#f0a23b">
              <animateMotion dur="6s" begin="1.4s" repeatCount="indefinite" path={leadPath} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".55 .05 .35 .95" />
            </circle>
          </g>
        </svg>
      </div>
      <figcaption className="mt-4 text-[14px] text-slate">
        One enquiry, end to end: every system on this map is something we design, build or run for you.
      </figcaption>
    </figure>
  );
}
