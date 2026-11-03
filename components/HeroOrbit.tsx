"use client";

import { motion, useReducedMotion } from "framer-motion";
import { serviceIcons, testCenterIcon } from "@/lib/service-icons";

type Node = { slug: string; label: string; color: string };

// The hero's hub: P & J at the centre, every service on a slowly turning ring, joined by lines.
// The service named in the headline (active) lights up and a pulse runs out to it.
export function HeroOrbit({ nodes, active }: { nodes: Node[]; active: number }) {
  const reduce = useReducedMotion();
  const all = [...nodes, { slug: "test-center", label: "Test center", color: "#ffa830" }];
  const spots = all.map((_, k) => {
    const a = (k / all.length) * Math.PI * 2 - Math.PI / 2;
    return { x: +(50 + Math.cos(a) * 43).toFixed(2), y: +(50 + Math.sin(a) * 43).toFixed(2) };
  });
  const lit = all[active] ?? all[0];
  const n = all.length;
  // links between neighbours, and every second service, so it reads as a network
  const links: [number, number][] = [];
  for (let k = 0; k < n; k++) {
    links.push([k, (k + 1) % n]);
    if (k % 2 === 0) links.push([k, (k + 3) % n]);
  }
  // small satellite nodes around the ring, each tied to its nearest service
  const sats = Array.from({ length: 21 }, (_, k) => {
    const a = (k / 21) * Math.PI * 2 + 0.35;
    const r = 47 + ((k * 7) % 5) - (k % 3 === 0 ? 20 : 0);
    const near = Math.round(((a + Math.PI / 2) / (Math.PI * 2)) * n) % n;
    return { x: +(50 + Math.cos(a) * r).toFixed(2), y: +(50 + Math.sin(a) * r).toFixed(2), near, d: (k % 7) * 0.4 };
  });

  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[min(700px,calc(100svh-130px))]">
      {/* glow in the active service's colour */}
      <motion.div
        key={lit.slug}
        className="absolute inset-[14%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${lit.color}55, transparent 70%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* fixed rings */}
      <div className="absolute inset-[10%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[33%] rounded-full border border-white/[0.07]" />
      <div className="orbit-spin absolute inset-[10%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(56,189,248,0.7)_60deg,rgba(167,139,250,0.7)_100deg,transparent_120deg)] [animation-duration:8s] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />

      {/* the turning ring: lines and services rotate together; each tile turns back so it stays upright */}
      <div className={`absolute inset-0 ${reduce ? "" : "orbit-spin"} [animation-duration:50s]`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {/* satellites: faint links and twinkling dots */}
          {sats.map((p, k) => (
            <g key={`s${k}`}>
              <line x1={p.x} y1={p.y} x2={spots[p.near].x} y2={spots[p.near].y} stroke="rgb(125 211 252 / 0.12)" strokeWidth="0.2" />
              <circle cx={p.x} cy={p.y} r={k % 3 === 0 ? 0.9 : 0.55} fill={k % 4 === 0 ? "#a78bfa" : "#7dd3fc"} className={reduce ? "" : "map-twinkle"} style={{ animationDelay: `${p.d}s` }} />
            </g>
          ))}
          {/* service-to-service links */}
          {links.map(([a, b], k) => {
            const hot = a === active || b === active;
            return (
              <line
                key={`l${k}`}
                x1={spots[a].x}
                y1={spots[a].y}
                x2={spots[b].x}
                y2={spots[b].y}
                stroke={hot ? lit.color : "rgb(125 211 252 / 0.16)"}
                strokeOpacity={hot ? 0.55 : 1}
                strokeWidth={hot ? 0.4 : 0.25}
                className="map-flow"
                style={{ transition: "stroke 0.4s" }}
              />
            );
          })}
          {/* data packets running along the links */}
          {!reduce &&
            links.map(([a, b], k) => (
              <motion.circle
                key={`p${k}`}
                r="0.6"
                fill={k % 3 === 0 ? "#a78bfa" : "#7dd3fc"}
                initial={{ cx: spots[a].x, cy: spots[a].y, opacity: 0 }}
                animate={{ cx: [spots[a].x, spots[b].x], cy: [spots[a].y, spots[b].y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4 + (k % 4) * 0.5, repeat: Infinity, delay: k * 0.35, ease: "linear" }}
              />
            ))}
          {/* packets from the core to every service */}
          {!reduce &&
            spots.map((p, k) => (
              <motion.circle
                key={`c${k}`}
                r="0.7"
                fill={all[k].color}
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{ cx: [50, p.x], cy: [50, p.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: k * 0.45, repeatDelay: 1.4, ease: "easeOut" }}
              />
            ))}
          {spots.map((p, k) => (
            <line
              key={k}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={k === active ? all[k].color : "rgb(125 211 252 / 0.22)"}
              strokeWidth={k === active ? 0.6 : 0.3}
              className={k === active ? "" : "map-flow"}
              style={{ transition: "stroke 0.4s" }}
            />
          ))}
          {!reduce && (
            <motion.circle
              key={active}
              r="1.3"
              fill={lit.color}
              style={{ filter: `drop-shadow(0 0 2px ${lit.color})` }}
              initial={{ cx: 50, cy: 50, opacity: 1 }}
              animate={{ cx: spots[active]?.x ?? 50, cy: spots[active]?.y ?? 50, opacity: [1, 1, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
        </svg>

        {all.map((n, k) => {
          const on = k === active;
          return (
            <div key={n.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${spots[k].x}%`, top: `${spots[k].y}%` }}>
              <div className={`${reduce ? "" : "orbit-counter"} flex flex-col items-center gap-1.5 [animation-duration:50s]`}>
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl ring-1 backdrop-blur transition duration-500 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  style={{
                    background: `linear-gradient(145deg, ${n.color}, ${n.color}cc)`,
                    color: "#fff",
                    boxShadow: on
                      ? `0 0 0 4px rgba(255,255,255,0.9), 0 0 0 9px ${n.color}55, 0 0 36px ${n.color}`
                      : "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.18), 0 10px 24px -10px rgba(0,0,0,0.7)",
                    transform: on ? "scale(1.15)" : "scale(1)",
                    opacity: on ? 1 : 0.88,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-[22px] w-[22px] lg:h-7 lg:w-7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={n.slug === "test-center" ? testCenterIcon : serviceIcons[n.slug]} />
                  </svg>
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold transition duration-500 sm:text-[12px] lg:text-[13.5px] ${on ? "bg-white text-ink" : "text-white/60"}`}
                >
                  {n.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* the P & J core */}
      {/* turning gradient halo behind the core */}
      <div className={`absolute left-1/2 top-1/2 h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#a78bfa,#f472b6,#fbbf24,#34d399,#38bdf8)] opacity-90 blur-[2px] ${reduce ? "" : "orbit-spin"} [animation-duration:6s]`} />
      <div className="absolute left-1/2 top-1/2 h-[25.5%] w-[25.5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#060d18]" />
      <div className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_0_70px_-4px_rgba(56,189,248,0.9)]">
        {!reduce && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full border-2 border-sky/40 [animation-duration:3s]" />
            <span className="absolute -inset-4 animate-ping rounded-full border border-sky/20 [animation-delay:1.5s] [animation-duration:3s]" />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.webp" alt="" className="relative h-[56%] w-[56%] object-contain" />
      </div>
    </div>
  );
}
