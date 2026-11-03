import { mapSize, officePins, twinkleDots } from "@/lib/world-dots";

// Dotted world map for dark sections: faint dots, a few that twinkle, and pulsing pins on our offices in India
export function WorldMapBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${mapSize.w} ${mapSize.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {/* base dots come from a cached static file to keep the page light */}
      <image href="/world-dots.svg" width={mapSize.w} height={mapSize.h} />
      <g fill="#7dd3fc">
        {twinkleDots.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="0.3"
            className="map-twinkle"
            style={{ animationDelay: `${-((i * 1.37) % 6).toFixed(2)}s` }}
          />
        ))}
      </g>
      {Object.values(officePins).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="0.6" fill="none" stroke="#f0a23b" strokeWidth="0.2" className="map-pulse" style={{ animationDelay: `${i * -1.5}s` }} />
          <circle cx={x} cy={y} r="0.45" fill="#f0a23b" />
        </g>
      ))}
    </svg>
  );
}
