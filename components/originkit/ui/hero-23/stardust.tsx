/* eslint-disable */
// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

// Stardust — Originkit
// Using component defaults.

import { useEffect, useRef, type CSSProperties } from "react";

interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
}

function parseColorToRgba(input: string): Rgba {
    if (!input) return { r: 0, g: 0, b: 0, a: 1 };
    const str = input.trim();
    const rgbaMatch = str.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
    );
    if (rgbaMatch) {
        const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
        const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
        const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
        const a =
            rgbaMatch[4] !== undefined
                ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
                : 1;
        return { r, g, b, a };
    }
    const hex = str.replace(/^#/, "");
    if (hex.length === 8) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: parseInt(hex.slice(6, 8), 16) / 255,
        };
    }
    if (hex.length === 6) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: 1,
        };
    }
    if (hex.length === 4) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: parseInt(hex[3] + hex[3], 16) / 255,
        };
    }
    if (hex.length === 3) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: 1,
        };
    }
    return { r: 0, g: 0, b: 0, a: 1 };
}

function rgbaToCanvasColor(rgba: Rgba): string {
    const r = Math.round(rgba.r * 255);
    const g = Math.round(rgba.g * 255);
    const b = Math.round(rgba.b * 255);
    if (rgba.a === 1) return `rgb(${r}, ${g}, ${b})`;
    return `rgba(${r}, ${g}, ${b}, ${rgba.a})`;
}

const DEFAULTS = {
    background: "#000000",
    particleColor: "#FFFFFF",
    particleDensity: 4,
    minSize: 1.5,
    maxSize: 1,
    speed: 10,
    particleSpeed: 1,
    movement: 6,
    angle: 180,
};

// UI 1..10 → internal 0.5..12 (flicker rate)
function mapFlickerUiToInternal(ui: number): number {
    const clamped = Math.max(1, Math.min(10, ui));
    const t = (clamped - 1) / 9;
    return 0.5 + t * 11.5;
}

// UI 1..10 → internal 5..60 (density)
function mapDensityUiToInternal(ui: number): number {
    const clamped = Math.max(1, Math.min(10, ui));
    const t = (clamped - 1) / 9;
    return 5 + t * 55;
}

// Angle (deg) → unit drift vector.
// 0° = up, 90° = right, 180° = down, 270° = left — clockwise from top.
function angleToDrift(angleDeg: number): { vx: number; vy: number } {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { vx: Math.cos(rad), vy: Math.sin(rad) };
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    opacityVel: number;
}

interface SparklesProps {
    background?: string;
    particleColor?: string;
    particleDensity?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleSpeed?: number;
    movement?: number;
    angle?: number;
    style?: CSSProperties;
}

export default function Sparkles({
    background = DEFAULTS.background,
    particleColor = DEFAULTS.particleColor,
    particleDensity = DEFAULTS.particleDensity,
    minSize = DEFAULTS.minSize,
    maxSize = DEFAULTS.maxSize,
    speed = DEFAULTS.speed,
    particleSpeed = DEFAULTS.particleSpeed,
    movement = DEFAULTS.movement,
    angle = DEFAULTS.angle,
    style,
}: SparklesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    const initParticles = (width: number, height: number) => {
        const particles: Particle[] = [];
        const area = width * height;
        const mappedDensity = mapDensityUiToInternal(particleDensity);
        const count = Math.floor((area / 1e4) * mappedDensity);
        const velocityMultiplier = (particleSpeed / 10) * 0.5; // 0-10 → 0-0.5
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * velocityMultiplier,
                vy: (Math.random() - 0.5) * velocityMultiplier,
                size: minSize + Math.random() * (maxSize - minSize),
                opacity: Math.random(),
                opacityVel: (Math.random() - 0.5) * 0.04,
            });
        }
        particlesRef.current = particles;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // Cap the backing store: particles are 1-2px dots, so rendering at
        // 3x on phones triples fill cost for no visible gain.
        const MAX_DPR = 1.5;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            const width = container.clientWidth || container.offsetWidth || 1;
            const height =
                container.clientHeight || container.offsetHeight || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles(width, height);
        };
        resize();

        const mappedSpeed = mapFlickerUiToInternal(speed);

        // Movement 0..10 → 0..1 px/frame drift magnitude
        const driftMag = movement * 0.1;
        const { vx: driftDirX, vy: driftDirY } = angleToDrift(angle);
        const driftVx = driftDirX * driftMag;
        const driftVy = driftDirY * driftMag;

        const backgroundRgba = parseColorToRgba(background);
        const backgroundColor = rgbaToCanvasColor(backgroundRgba);
        const particleColorRgba = parseColorToRgba(particleColor);
        const particleColorBase = rgbaToCanvasColor({
            ...particleColorRgba,
            a: 1,
        });

        // Alpha is quantised into buckets so the whole field draws with a
        // handful of state changes instead of one globalAlpha set + one
        // beginPath/arc/fill per particle.
        const ALPHA_STEPS = 12;
        const buckets: Particle[][] = Array.from(
            { length: ALPHA_STEPS },
            () => []
        );

        const drawParticles = (width: number, height: number) => {
            ctx.globalAlpha = 1;
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = particleColorBase;

            for (const bucket of buckets) bucket.length = 0;
            for (const particle of particlesRef.current) {
                const index = Math.min(
                    ALPHA_STEPS - 1,
                    (particle.opacity * ALPHA_STEPS) | 0
                );
                buckets[index].push(particle);
            }

            for (let i = 0; i < ALPHA_STEPS; i++) {
                const bucket = buckets[i];
                if (bucket.length === 0) continue;
                ctx.globalAlpha =
                    particleColorRgba.a * ((i + 0.5) / ALPHA_STEPS);
                ctx.beginPath();
                for (const particle of bucket) {
                    const size = particle.size;
                    // Sub-2px dots: a rect is indistinguishable from an arc
                    // and far cheaper to rasterise.
                    if (size <= 1) {
                        ctx.rect(
                            particle.x - size,
                            particle.y - size,
                            size * 2,
                            size * 2
                        );
                    } else {
                        ctx.moveTo(particle.x + size, particle.y);
                        ctx.arc(
                            particle.x,
                            particle.y,
                            size,
                            0,
                            Math.PI * 2
                        );
                    }
                }
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const animate = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;

            for (const particle of particlesRef.current) {
                particle.x += particle.vx + driftVx;
                particle.y += particle.vy + driftVy;
                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;
                // Flicker
                particle.opacity += particle.opacityVel * mappedSpeed * 0.5;
                if (particle.opacity <= 0.1 || particle.opacity >= 1) {
                    particle.opacityVel *= -1;
                }
                particle.opacity = Math.max(0.1, Math.min(1, particle.opacity));
            }

            drawParticles(width, height);

            animationRef.current = requestAnimationFrame(animate);
        };
        // Only burn frames while the field is actually on screen and the tab
        // is in the foreground.
        const start = () => {
            if (animationRef.current === null) animate();
        };
        const stop = () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };

        let isVisible = true;
        const sync = () => {
            if (isVisible && !document.hidden) start();
            else stop();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                sync();
            },
            { rootMargin: "128px" }
        );
        observer.observe(container);

        document.addEventListener("visibilitychange", sync);
        window.addEventListener("resize", resize);
        sync();

        return () => {
            stop();
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
            window.removeEventListener("resize", resize);
        };
    }, [
        background,
        particleColor,
        particleDensity,
        minSize,
        maxSize,
        speed,
        particleSpeed,
        movement,
        angle,
    ]);

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />
        </div>
    );
}

Sparkles.displayName = "Sparkles";