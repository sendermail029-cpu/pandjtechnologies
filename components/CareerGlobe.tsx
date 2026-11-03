"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// [lat, lng]
const OFFICES: [number, number][] = [
  [16.5062, 80.648], // Vijayawada
  [17.459, 78.3983], // Hyderabad
];

// rotation that puts a longitude at the front of the globe
const facing = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);

// A dotted WebGL globe that turns slowly, starting over India; drag to spin it
export function CareerGlobe({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; phi: number } | null>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phi = facing(80);
    let dragPhi = 0;
    let width = el.offsetWidth;
    const onResize = () => (width = el.offsetWidth);
    window.addEventListener("resize", onResize);

    // cobe sizes the canvas as on-screen width × dpr, so the globe's own width/height must match that exactly
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi,
      theta: 0.3,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 7,
      mapBaseBrightness: 0.02,
      baseColor: [0.12, 0.55, 0.75],
      markerColor: [0.94, 0.64, 0.23],
      glowColor: [0.08, 0.45, 0.6],
      markers: OFFICES.map((location) => ({ location, size: 0.06 })),
      onRender: (state) => {
        if (!drag.current && !still) phi += 0.0025;
        state.phi = phi + dragPhi;
        state.width = width * dpr;
        state.height = width * dpr;
      },
    });
    requestAnimationFrame(() => (el.style.opacity = "1"));

    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, phi: dragPhi };
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (drag.current) dragPhi = drag.current.phi + (e.clientX - drag.current.x) / 200;
    };
    const up = () => {
      drag.current = null;
      el.style.cursor = "grab";
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-label="Globe showing our offices in Vijayawada and Hyderabad"
      role="img"
      className={`aspect-square w-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
