"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { clientCountries } from "@/lib/client-countries";


// A dotted globe that turns slowly, with a glowing marker on every country we have clients in. Drag to spin.
export function CountriesGlobe({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; phi: number } | null>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phi = 4.2; // start with India in view
    let dragPhi = 0;
    let width = el.offsetWidth;
    const onResize = () => (width = el.offsetWidth);
    window.addEventListener("resize", onResize);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi,
      theta: 0.28,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 20000,
      mapBrightness: 7,
      mapBaseBrightness: 0.04,
      baseColor: [0.2, 0.36, 0.95],
      markerColor: [0.98, 0.68, 0.25],
      glowColor: [0.25, 0.4, 0.95],
      markers: clientCountries.map((c) => ({ location: c.at, size: 0.09 })),
      onRender: (state) => {
        if (!drag.current && !still) phi += 0.003;
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
      aria-label={`Globe marking our client countries: ${clientCountries.map((c) => c.name).join(", ")}`}
      role="img"
      className={`h-full w-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size] ${className}`}
    />
  );
}
