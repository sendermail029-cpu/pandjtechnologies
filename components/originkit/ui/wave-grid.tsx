"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const DEFAULTS = {
    base: "#FFFFFF",
    crest: "#00FFFF",
    grid: 20,
    gap: 2,
    amplitude: 20,
    waveSpeed: 6,
    trail: 9,
    tilt: 4,
    shadows: true,
    sizePercent: 200,
}

const MAX_TRAIL = 128

const CUBE_WIDTH = 0.8
const CUBE_HEIGHT = 3

const WAVE_FREQ = 1.2
const WAVE_WIDTH = 3.12
const JITTER = 0.2
const RIPPLE_STRENGTH = 3.04
const PARALLAX = 0.048

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

type Config = {
    base: string
    crest: string
    grid: number
    gap: number
    amplitude: number
    waveSpeed: number
    trail: number
    tilt: number
    shadows: boolean
    sizePercent: number
}

function settingsFor(cfg: Config) {
    const grid = 2 * Math.round(11 + clamp(cfg.grid, 1, 20, DEFAULTS.grid)) - 1
    const gap = clamp(cfg.gap, 0, 20, DEFAULTS.gap) * 0.025
    return {
        grid,
        gap,

        bounds: grid * (CUBE_WIDTH + gap),

        waveSpeed: 1.0 + clamp(cfg.waveSpeed, 1, 20, DEFAULTS.waveSpeed) * 0.85,

        frequency: WAVE_FREQ,

        waveWidth: WAVE_WIDTH,
        amplitude: clamp(cfg.amplitude, 0, 20, DEFAULTS.amplitude) * 0.075,

        maxHeight: 0.15 + clamp(cfg.amplitude, 0, 20, DEFAULTS.amplitude) * 0.055,

        jitter: JITTER,

        fadeTime: 0.3 + clamp(cfg.trail, 1, 20, DEFAULTS.trail) * 0.22,

        trailSpacing: 0.14,

        rippleStrength: RIPPLE_STRENGTH,

        tilt: clamp(cfg.tilt, 0, 20, DEFAULTS.tilt) * 0.035,
        parallax: PARALLAX,

        span: 0.5 * (100 / clamp(cfg.sizePercent, 20, 200, 100)),
    }
}

function overrideVertex(vertexShader: string): string {
    return vertexShader
        .replace(
            "#include <common>",
             `#include <common>
            #define MAX_TRAIL ${MAX_TRAIL}
            varying float vHeight;
            attribute vec2 aOffset;
            uniform sampler2D uTrailTexture;
            uniform int   uTrailCount;
            uniform float uWaveSpeed;
            uniform float uWaveFreq;
            uniform float uWaveWidth;
            uniform float uFadeTime;
            uniform float uAmplitude;
            uniform float uJitter;
            uniform float uMaxHeight;

            // Depends only on the block's own world position, so it is stable
            // across frames. Anything seeded from gl_VertexID or from time would
            // make each block shiver on the spot.
            vec2 hash2(vec2 p) {
                p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
                return fract(sin(p) * 43758.5453123) - 0.5;
            }`
        )
        .replace(
            "#include <begin_vertex>",
             `#include <begin_vertex>

            vHeight = 0.0;

            // Only the upper half of each box moves. Lifting the whole block
            // would pull its base out of the field and leave gaps underneath;
            // this stretches the block instead, so the bottoms stay planted.
            if (position.y > 0.0) {
                vec2 worldXZ = aOffset + hash2(aOffset) * uJitter;
                float waveHeight = 0.0;
                float totalWeight = 0.0;

                for (int i = 0; i < MAX_TRAIL; i++) {
                    // The live count only shortens the loop; the bound itself
                    // stays constant, which GLSL ES requires and which keeps the
                    // cost proportional to the disturbances actually alive.
                    if (i >= uTrailCount) break;

                    // texel: (worldX, worldZ, age, strength)
                    vec4 td = texture2D(
                        uTrailTexture,
                        vec2((float(i) + 0.5) / float(MAX_TRAIL), 0.5)
                    );

                    float dist = length(worldXZ - td.rg);
                    // Signed distance from the expanding front. Negative means
                    // the crest has already passed this block.
                    float relDist = dist - uWaveSpeed * td.b;

                    /*
                     * A window that rides outward with the front, rather than a
                     * falloff anchored at the origin: this is what makes the
                     * disturbance travel instead of merely pulsing in place.
                     *
                     * Asymmetric, and that is what fixed the three-ring click.
                     * A Gaussian centred on the front is symmetric in relDist,
                     * so the cosine's next crest — a full period out at
                     * 2*PI/uWaveFreq — got picked up on BOTH sides of it: one
                     * ring behind the front, and one AHEAD of it, out in water
                     * the wave had not reached yet. The middle of the three was
                     * the front, so the middle was the tallest and darkest.
                     * Squeezing the leading half of the window kills the ring
                     * ahead, leaving the front outermost and highest with its
                     * wake trailing inside it, which is the way round a real
                     * ripple runs.
                     */
                    float lead = uWaveWidth * (relDist > 0.0 ? 0.3 : 1.0);
                    float window = exp(-(relDist * relDist) / (lead * lead));
                    float fade = exp(-td.b / uFadeTime);
                    float atten = 1.0 / (1.0 + dist * 0.1);
                    float weight = fade * window * atten * td.a;

                    // Raised cosine, so a disturbance can only ever lift a
                    // block. A plain cos swings negative behind the front and
                    // pushes blocks BELOW their neighbours, where they lose
                    // their top light and drop into the shadow the risen blocks
                    // cast — which is why passing the pointer over the field
                    // made some blocks flash darker than rest and others
                    // lighter. Every block the wave touches now brightens.
                    waveHeight += weight * (0.5 + 0.5 * cos(uWaveFreq * relDist));
                    totalWeight += weight;
                }

                /*
                 * Averaged, not summed — and the max() is the whole subtlety.
                 * Dividing by the raw total would normalise a lone weak ripple
                 * up to full height; flooring the divisor at one leaves a single
                 * light touch light, while still collapsing the pile-up when
                 * many disturbances overlap.
                 */
                waveHeight /= max(totalWeight, 1.0);

                // Floored at zero to match: nothing sinks, so the tint ramp
                // below always runs the same way and the field has one resting
                // brightness rather than two.
                float displacement = clamp(waveHeight * uAmplitude, 0.0, uMaxHeight);
                transformed.y += displacement;
                vHeight = displacement;
            }`
        )
}

class WaveGridScene {
    private container: HTMLElement
    private cfg: Config

    private renderer: THREE.WebGLRenderer
    private scene = new THREE.Scene()
    private camera = new THREE.PerspectiveCamera(40, 1, 0.1, 300)

    private material: THREE.MeshPhongMaterial
    private depthMaterial: THREE.MeshDepthMaterial
    private geometry: THREE.BoxGeometry | null = null
    private offsets: THREE.InstancedBufferAttribute | null = null
    private mesh: THREE.InstancedMesh | null = null

    private keyLight: THREE.DirectionalLight
    private fillLight: THREE.DirectionalLight
    private ambient: THREE.AmbientLight

    private waveUniforms = {
        uTrailTexture: { value: null as THREE.DataTexture | null },
        uTrailCount: { value: 0 },
        uFadeTime: { value: 2 },
        uWaveSpeed: { value: 6 },
        uWaveFreq: { value: 1.2 },
        uWaveWidth: { value: 3 },
        uAmplitude: { value: 0.4 },
        uJitter: { value: 0.2 },
        uMaxHeight: { value: 0.4 },
    }
    private colorUniforms = {
        uColorBase: { value: new THREE.Color(DEFAULTS.base) },
        uColorHigh: { value: new THREE.Color(DEFAULTS.crest) },
    }

    private trail: { x: number; z: number; age: number; strength: number }[] = []
    private trailData = new Float32Array(MAX_TRAIL * 4)
    private trailTexture: THREE.DataTexture
    private lastPoint: { x: number; z: number } | null = null
    // auto-ripple (P & J addition): while nobody moves the pointer, an invisible one drifts across the grid
    private lastUserMove = -Infinity
    private autoT = 0
    private autoLast: { x: number; z: number } | null = null

    private raycaster = new THREE.Raycaster()
    private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    private ndc = new THREE.Vector2()
    private hit = new THREE.Vector3()

    private pointer = new THREE.Vector2()
    private easedPointer = new THREE.Vector2()

    private builtGrid = 0
    private builtGap = -1

    private width = 0
    private height = 0
    private frameId = 0
    private lastT = 0
    private disposed = false

    constructor(container: HTMLElement, cfg: Config) {
        this.container = container
        this.cfg = cfg
        const S = settingsFor(cfg)

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        this.renderer.outputColorSpace = THREE.SRGBColorSpace

        this.renderer.setClearColor(0x000000, 0)
        this.renderer.shadowMap.enabled = cfg.shadows !== false
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        const el = this.renderer.domElement
        el.style.position = "absolute"
        el.style.inset = "0"
        el.style.width = "100%"
        el.style.height = "100%"
        el.style.touchAction = "none"
        el.style.cursor = "crosshair"
        container.appendChild(el)

        this.trailTexture = new THREE.DataTexture(
            this.trailData,
            MAX_TRAIL,
            1,
            THREE.RGBAFormat,
            THREE.FloatType
        )
        this.trailTexture.minFilter = THREE.NearestFilter
        this.trailTexture.magFilter = THREE.NearestFilter
        this.trailTexture.needsUpdate = true
        this.waveUniforms.uTrailTexture.value = this.trailTexture

        this.ambient = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambient)

        this.keyLight = new THREE.DirectionalLight(0xffffff, 4.0)
        this.keyLight.position.set(-20, 10, 6)
        this.keyLight.castShadow = true
        this.keyLight.shadow.mapSize.set(1024, 1024)
        this.keyLight.shadow.radius = 6
        this.keyLight.shadow.camera.near = 0.1
        this.keyLight.shadow.camera.far = 80

        this.keyLight.shadow.bias = 0
        this.keyLight.shadow.normalBias = 0.04
        this.scene.add(this.keyLight)

        this.fillLight = new THREE.DirectionalLight(0xffffff, 1.0)
        this.fillLight.position.set(10, 5, -3)
        this.scene.add(this.fillLight)

        this.material = new THREE.MeshPhongMaterial({ color: 0xffffff })
        this.material.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.waveUniforms, this.colorUniforms)
            shader.vertexShader = overrideVertex(shader.vertexShader)
            shader.fragmentShader = shader.fragmentShader
                .replace(
                    "#include <common>",
                     `#include <common>
                    varying float vHeight;
                    uniform vec3 uColorBase;
                    uniform vec3 uColorHigh;
                    uniform float uMaxHeight;`
                )
                .replace(
                    "#include <color_fragment>",
                     `#include <color_fragment>
                    // Tinted by how far this block was lifted, so the crest
                    // colour tracks the wave rather than being painted onto a
                    // fixed part of the field.
                    float lift = clamp(vHeight / uMaxHeight, 0.0, 1.0);
                    diffuseColor.rgb = mix(uColorBase, uColorHigh, lift);`
                )
        }
        this.material.needsUpdate = true

        this.depthMaterial = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking,
        })
        this.depthMaterial.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.waveUniforms)
            shader.vertexShader = overrideVertex(shader.vertexShader)
        }
        this.depthMaterial.needsUpdate = true

        this.buildGrid()
        this.pushUniforms(S)
        this.bindEvents()
    }

    private buildGrid() {
        const S = settingsFor(this.cfg)
        const count = S.grid * S.grid

        this.geometry = new THREE.BoxGeometry(CUBE_WIDTH, CUBE_HEIGHT, CUBE_WIDTH)
        this.offsets = new THREE.InstancedBufferAttribute(
            new Float32Array(count * 2),
            2
        )
        this.geometry.setAttribute("aOffset", this.offsets)

        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, count)
        this.mesh.customDepthMaterial = this.depthMaterial
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        this.mesh.frustumCulled = false
        this.scene.add(this.mesh)

        this.builtGrid = S.grid
        this.builtGap = -1
        this.layoutGrid()
    }

    private layoutGrid() {
        if (!this.mesh || !this.offsets) return
        const S = settingsFor(this.cfg)
        const spacing = CUBE_WIDTH + S.gap
        const origin = ((S.grid - 1) * spacing) / 2
        const dummy = new THREE.Object3D()

        for (let i = 0; i < S.grid; i++) {
            for (let j = 0; j < S.grid; j++) {
                const index = i * S.grid + j
                const x = i * spacing - origin
                const z = j * spacing - origin
                dummy.position.set(x, 0, z)
                dummy.updateMatrix()
                this.mesh.setMatrixAt(index, dummy.matrix)

                this.offsets.setXY(index, x, z)
            }
        }
        this.mesh.instanceMatrix.needsUpdate = true
        this.offsets.needsUpdate = true

        const reach = S.bounds * 0.7
        const sc = this.keyLight.shadow.camera
        sc.left = -reach
        sc.right = reach
        sc.top = reach
        sc.bottom = -reach
        sc.updateProjectionMatrix()

        this.builtGap = S.gap
        this.updateCamera()
    }

    private destroyGrid() {
        if (this.mesh) {
            this.scene.remove(this.mesh)
            this.mesh.dispose()
            this.mesh = null
        }
        if (this.geometry) {
            this.geometry.dispose()
            this.geometry = null
        }
        this.offsets = null
    }

    private updateCamera() {
        if (this.disposed) return
        const S = settingsFor(this.cfg)
        const aspect = Math.max(1, this.width) / Math.max(1, this.height)

        const distance = 14

        const alpha = S.tilt + this.easedPointer.y * S.parallax * 4.0
        const beta = this.easedPointer.x * S.parallax * 6.0

        this.camera.position.set(
            -distance * Math.cos(alpha) * Math.sin(beta),
            distance * Math.cos(alpha) * Math.cos(beta),
            distance * Math.sin(alpha)
        )
        this.camera.up.set(0, 0, -1)
        this.camera.lookAt(0, 0, 0)

        const span = S.bounds * S.span
        const visibleHeight = aspect < 1 ? span / aspect : span
        this.camera.aspect = aspect
        this.camera.fov =
            2 * Math.atan(visibleHeight / 2 / distance) * (180 / Math.PI)
        this.camera.near = 0.1
        this.camera.far = distance + S.bounds * 2 + 20
        this.camera.updateProjectionMatrix()
    }

    private groundAt(e: PointerEvent): THREE.Vector3 | null {
        const rect = this.renderer.domElement.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return null
        this.ndc.set(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        )
        this.raycaster.setFromCamera(this.ndc, this.camera)

        return this.raycaster.ray.intersectPlane(this.groundPlane, this.hit)
    }

    private addPoint(x: number, z: number, strength: number) {
        if (this.trail.length >= MAX_TRAIL) this.trail.shift()
        this.trail.push({ x, z, age: 0, strength })
    }

    private bindEvents() {
        const el = this.renderer.domElement

        const onMove = (e: PointerEvent) => {
            if (this.disposed) return
            this.lastUserMove = performance.now()
            const rect = el.getBoundingClientRect()

            if (rect.width > 0 && rect.height > 0) {
                this.pointer.set(
                    ((e.clientX - rect.left) / rect.width) * 2 - 1,
                    -((e.clientY - rect.top) / rect.height) * 2 + 1
                )
            }

            const p = this.groundAt(e)
            if (!p) return
            const S = settingsFor(this.cfg)

            let strength = 0.35
            if (this.lastPoint) {
                const dx = p.x - this.lastPoint.x
                const dz = p.z - this.lastPoint.z
                const moved = Math.sqrt(dx * dx + dz * dz)
                if (moved < S.trailSpacing) return
                strength = Math.min(moved, 1.2)
            }

            this.addPoint(p.x, p.z, strength)
            this.lastPoint = { x: p.x, z: p.z }
        }

        const onDown = (e: PointerEvent) => {
            if (this.disposed) return
            const S = settingsFor(this.cfg)
            const p = this.groundAt(e)
            if (!p) return

            this.addPoint(p.x, p.z, S.rippleStrength)

            this.lastPoint = { x: p.x, z: p.z }
        }

        const onLeave = () => {
            this.pointer.set(0, 0)
            this.lastPoint = null
        }

        el.addEventListener("pointermove", onMove)
        el.addEventListener("pointerdown", onDown)

        el.addEventListener("pointerleave", onLeave)
        el.addEventListener("pointercancel", onLeave)

        this.unbind = () => {
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerdown", onDown)
            el.removeEventListener("pointerleave", onLeave)
            el.removeEventListener("pointercancel", onLeave)
        }
    }

    private unbind = () => {}

    private pushUniforms(S: ReturnType<typeof settingsFor>) {
        const u = this.waveUniforms
        u.uFadeTime.value = S.fadeTime
        u.uWaveSpeed.value = S.waveSpeed
        u.uWaveFreq.value = S.frequency
        u.uWaveWidth.value = S.waveWidth
        u.uAmplitude.value = S.amplitude
        u.uJitter.value = S.jitter
        u.uMaxHeight.value = S.maxHeight
    }

    start() {
        if (this.frameId) return
        this.lastT = performance.now()
        const loop = () => {
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        loop()
    }

    // pause rendering (e.g. while scrolled out of view); start() resumes
    pause() {
        cancelAnimationFrame(this.frameId)
        this.frameId = 0
    }

    setSize(width: number, height: number) {
        if (this.disposed || width <= 0 || height <= 0) return
        this.width = width
        this.height = height
        this.renderer.setSize(width, height, false)
        this.updateCamera()
    }

    updateConfig(cfg: Config) {
        if (this.disposed) return
        this.cfg = cfg
        const S = settingsFor(cfg)

        if (S.grid !== this.builtGrid) {
            this.destroyGrid()
            this.buildGrid()
        } else if (S.gap !== this.builtGap) {
            this.layoutGrid()
        }

        this.colorUniforms.uColorBase.value.set(cfg.base || DEFAULTS.base)
        this.colorUniforms.uColorHigh.value.set(cfg.crest || DEFAULTS.crest)
        this.pushUniforms(S)

        const shadows = cfg.shadows !== false
        if (this.renderer.shadowMap.enabled !== shadows) {
            this.renderer.shadowMap.enabled = shadows
            this.keyLight.castShadow = shadows
            this.material.needsUpdate = true
            this.depthMaterial.needsUpdate = true
        }

        this.updateCamera()
    }

    private step() {
        if (this.disposed) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0

        if (dt > 0.05) dt = 0.05

        const S = settingsFor(this.cfg)

        if (now - this.lastUserMove > 2000 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.autoT += dt
            // a slow figure-of-eight across the right half of the grid (clear of the heading), in screen space
            this.ndc.set(0.4 + Math.sin(this.autoT * 0.45) * 0.45, Math.sin(this.autoT * 0.9) * 0.35 - 0.1)
            this.raycaster.setFromCamera(this.ndc, this.camera)
            const p = this.raycaster.ray.intersectPlane(this.groundPlane, this.hit)
            if (p) {
                const moved = this.autoLast ? Math.hypot(p.x - this.autoLast.x, p.z - this.autoLast.z) : Infinity
                if (moved >= S.trailSpacing) {
                    this.addPoint(p.x, p.z, 0.45)
                    this.autoLast = { x: p.x, z: p.z }
                }
            }
        }

        const expiry = S.fadeTime * 4
        for (let i = this.trail.length - 1; i >= 0; i--) {
            this.trail[i].age += dt
            if (this.trail[i].age > expiry) this.trail.splice(i, 1)
        }

        const count = Math.min(this.trail.length, MAX_TRAIL)
        if (count > 0 || this.waveUniforms.uTrailCount.value > 0) {
            for (let i = 0; i < count; i++) {
                const t = this.trail[i]
                const o = i * 4
                this.trailData[o] = t.x
                this.trailData[o + 1] = t.z
                this.trailData[o + 2] = t.age
                this.trailData[o + 3] = t.strength
            }
            this.trailTexture.needsUpdate = true
            this.waveUniforms.uTrailCount.value = count
        }

        const k = 1 - Math.exp(-dt * 2.4)
        this.easedPointer.x += (this.pointer.x - this.easedPointer.x) * k
        this.easedPointer.y += (this.pointer.y - this.easedPointer.y) * k
        this.updateCamera()

        this.renderer.render(this.scene, this.camera)
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        this.unbind()
        this.destroyGrid()
        this.material.dispose()
        this.depthMaterial.dispose()
        this.trailTexture.dispose()
        this.renderer.dispose()
        const el = this.renderer.domElement
        if (el.parentNode === this.container) this.container.removeChild(el)
    }
}

export interface WaveGridProps {
    base?: string
    crest?: string
    grid?: number
    gap?: number
    amplitude?: number
    waveSpeed?: number
    trail?: number
    tilt?: number
    shadows?: boolean
    sizePercent?: number
    style?: React.CSSProperties
}

export default function WaveGrid(props: WaveGridProps) {
    const {
        base = DEFAULTS.base,
        crest = DEFAULTS.crest,
        grid = DEFAULTS.grid,
        gap = DEFAULTS.gap,
        amplitude = DEFAULTS.amplitude,
        waveSpeed = DEFAULTS.waveSpeed,
        trail = DEFAULTS.trail,
        tilt = DEFAULTS.tilt,
        shadows = DEFAULTS.shadows,
        sizePercent = DEFAULTS.sizePercent,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<WaveGridScene | null>(null)

    const cfgRef = useRef<Config>(null as any)
    cfgRef.current = {
        base,
        crest,
        grid,
        gap,
        amplitude,
        waveSpeed,
        trail,
        tilt,
        shadows,
        sizePercent,
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let scene: WaveGridScene
        try {
            scene = new WaveGridScene(container, cfgRef.current)
        } catch {
            return
        }
        sceneRef.current = scene
        scene.setSize(container.clientWidth, container.clientHeight)
        scene.start()

        const ro = new ResizeObserver(() => {
            scene.setSize(container.clientWidth, container.clientHeight)
        })
        ro.observe(container)
        // only render while on screen
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) scene.start()
            else scene.pause()
        })
        io.observe(container)
        return () => {
            io.disconnect()
            ro.disconnect()
            scene.dispose()
            sceneRef.current = null
        }
    }, [])

    useEffect(() => {
        sceneRef.current?.updateConfig(cfgRef.current)
    }, [
        base,
        crest,
        grid,
        gap,
        amplitude,
        waveSpeed,
        trail,
        tilt,
        shadows,
        sizePercent,
    ])

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label="A grid of blocks rippling under the pointer"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 160,
                minHeight: 160,
                overflow: "hidden",
                ...style,
            }}
        />
    )
}

WaveGrid.displayName = "Wave Grid"