import { mapSize, officePins } from "@/lib/world-dots";

// map positions (same projection as public/world-dots.svg) of cities our arcs reach
const cities: [number, number][] = [
  [99, 25.11], // London
  [104.5, 25.98], // Frankfurt
  [55, 33.77], // New York
  [131.5, 45.03], // Dubai
  [160, 59.76], // Singapore
  [181.5, 38.11], // Tokyo
  [188.5, 81.41], // Sydney
];

const [ox, oy] = officePins.vijayawada;

// a curved arc from our office to a city, bowed upwards
const arc = ([x, y]: [number, number]) => {
  const mx = (ox + x) / 2;
  const my = (oy + y) / 2 - Math.hypot(x - ox, y - oy) * 0.32;
  return `M${ox} ${oy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${y}`;
};

// Dotted world map for dark backgrounds: glowing gradient dots, arcs that flow from our India offices to the world, with travelling lights
export function ConnectMap({ id, className = "" }: { id: string; className?: string }) {
  // ids must differ when the map appears twice on a page
  const ref = (name: string) => `${id}-${name}`;
  return (
    <svg aria-hidden viewBox={`0 0 ${mapSize.w} ${mapSize.h}`} className={`pointer-events-none ${className}`}>
      <defs>
        <linearGradient id={ref("dots")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="0.5" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#a5b4fc" />
        </linearGradient>
        <linearGradient id={ref("arc")} x1="0" x2="1">
          <stop offset="0" stopColor="#f0a23b" />
          <stop offset="1" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id={ref("glow")}>
          <stop offset="0" stopColor="#1ec0f2" stopOpacity="0.45" />
          <stop offset="1" stopColor="#1ec0f2" stopOpacity="0" />
        </radialGradient>
        <mask id={ref("mask")} maskUnits="userSpaceOnUse" x="0" y="0" width={mapSize.w} height={mapSize.h}>
          <image href="/world-dots-mask.svg" width={mapSize.w} height={mapSize.h} />
        </mask>
      </defs>

      {/* dots, coloured by a soft gradient */}
      <rect width={mapSize.w} height={mapSize.h} fill={`url(#${ref("dots")})`} mask={`url(#${ref("mask")})`} opacity="0.5" />

      {/* glow around India */}
      <circle cx={ox} cy={oy} r="22" fill={`url(#${ref("glow")})`} />

      {cities.map((c, i) => {
        const d = arc(c);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={`url(#${ref("arc")})`} strokeOpacity="0.3" strokeWidth="0.35" />
            <path d={d} fill="none" stroke={`url(#${ref("arc")})`} strokeWidth="0.45" strokeLinecap="round" className="map-flow" style={{ animationDelay: `${i * -0.7}s` }} />
            {/* a light travelling from the office to the city */}
            <circle r="0.7" fill="#f0a23b" className="map-comet">
              <animateMotion dur="4.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
            </circle>
            <circle cx={c[0]} cy={c[1]} r="0.6" fill="none" stroke="#7dd3fc" strokeWidth="0.2" className="map-pulse" style={{ animationDelay: `${i * -0.45}s` }} />
            <circle cx={c[0]} cy={c[1]} r="0.55" fill="#7dd3fc" />
          </g>
        );
      })}

      {/* our offices */}
      {Object.values(officePins).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="0.6" fill="none" stroke="#f0a23b" strokeWidth="0.25" className="map-pulse" style={{ animationDelay: `${i * -1.5}s` }} />
          <circle cx={x} cy={y} r="0.75" fill="#f0a23b" />
        </g>
      ))}
    </svg>
  );
}
