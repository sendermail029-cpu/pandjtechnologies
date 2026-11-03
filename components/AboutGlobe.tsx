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

// Cobalt-blue dotted globe for white sections: it sways gently around India (never turning to the empty Pacific),
// with our two offices marked in saffron. Drag to look around.
export function AboutGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; phi: number } | null>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const centre = facing(80);
    let t = 0;
    let dragPhi = 0;
    let width = el.offsetWidth;
    const onResize = () => (width = el.offsetWidth);
    window.addEventListener("resize", onResize);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: centre,
      theta: 0.25,
      dark: 1,
      diffuse: 2,
      mapSamples: 22000,
      mapBrightness: 8,
      mapBaseBrightness: 0.12,
      baseColor: [0.2, 0.36, 0.95],
      markerColor: [0.98, 0.68, 0.25],
      glowColor: [0.55, 0.68, 1],
      markers: OFFICES.map((location) => ({ location, size: 0.07 })),
      onRender: (state) => {
        // sway about 35° either side of India
        if (!drag.current && !still) t += 0.004;
        state.phi = centre + Math.sin(t) * 0.6 + dragPhi;
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
      aria-hidden
      className="absolute inset-0 h-full w-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
    />
  );
}
