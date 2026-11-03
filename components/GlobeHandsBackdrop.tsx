import { CareerGlobe } from "./CareerGlobe";

/**
 * Dark studio backdrop: teal lighting, fine louvres, two hands reaching toward a rotating globe.
 * Fills its (relative, isolated) parent; put the content on top.
 */
export function GlobeHandsBackdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_85%_100%,rgb(13_148_168/0.55),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_110%,rgb(39_71_214/0.35),transparent_70%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_46px,rgb(255_255_255/0.045)_46px,rgb(255_255_255/0.045)_47px)] [mask-image:linear-gradient(to_bottom,transparent,black_30%)]" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hands/hand-left.webp"
          alt=""
          className="hand-in-left absolute left-[-18%] top-[10%] w-[60%] max-w-[600px] select-none opacity-80 [mask-image:linear-gradient(to_right,transparent,black_30%)] sm:left-[-8%] md:w-[40%] lg:top-[14%] lg:w-[34%]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hands/hand-right.webp"
          alt=""
          className="hand-in-right absolute bottom-[8%] right-[-18%] w-[56%] max-w-[560px] select-none opacity-80 [mask-image:linear-gradient(to_left,transparent,black_30%)] sm:right-[-8%] md:w-[38%] lg:bottom-[10%] lg:w-[32%]"
        />
      </div>

      {/* globe sits behind the content; it stays draggable */}
      <div className="absolute left-1/2 top-1/2 -z-10 w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-70">
        <div aria-hidden className="absolute inset-[14%] rounded-full bg-sky/25 blur-3xl" />
        <CareerGlobe className="relative" />
      </div>
      {/* dark wash behind the content so text reads clearly over the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[min(100vw,900px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgb(6_13_24/0.75),transparent_70%)]"
      />
    </>
  );
}
