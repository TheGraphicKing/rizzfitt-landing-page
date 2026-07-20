"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Lazy, mode-agnostic wrapper for the single 3D scene a page is allowed
 * (design system PART 9). It guarantees:
 *
 *  - **Never blocks first paint** — the WebGL canvas is `next/dynamic` with
 *    `ssr: false`; until it loads, the static fallback image shows.
 *  - **Mobile fallback** — below `mobileBreakpoint` (default 768px) it renders
 *    the static still only; no three.js is loaded on phones.
 *  - **Reduced motion** — renders the static still (a single static frame).
 *  - **Offscreen pause + dpr cap** — handled inside the canvas module.
 *
 * Pass R3F scene nodes as `children`; omit them to render the built-in demo
 * object (used on the styleguide).
 */

const CanvasScene = dynamic(() => import("./hero3d/CanvasScene"), {
  ssr: false,
  loading: () => null,
});

interface Hero3DCanvasProps {
  children?: ReactNode;
  /** Static still shown on mobile, under reduced motion, and while loading. */
  fallbackSrc: string;
  fallbackAlt: string;
  /** px width below which the static still replaces the canvas (default 768). */
  mobileBreakpoint?: number;
  className?: string;
  /** Inline height for the stage. Defaults to a responsive clamp. */
  height?: string;
}

function StaticFallback({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={false}
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "contain" }}
    />
  );
}

export function Hero3DCanvas({
  children,
  fallbackSrc,
  fallbackAlt,
  mobileBreakpoint = 768,
  className,
  height = "clamp(280px, 42vw, 520px)",
}: Hero3DCanvasProps) {
  const reduced = useReducedMotion() ?? false;
  // Default to the lightweight path (static) until we confirm we're on a
  // capable, large-enough viewport — avoids any flash of WebGL on mobile.
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    if (reduced) {
      setUse3D(false);
      return;
    }
    const mq = window.matchMedia(`(min-width: ${mobileBreakpoint}px)`);
    const update = () => setUse3D(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced, mobileBreakpoint]);

  return (
    <div
      className={cn(className)}
      style={{ position: "relative", width: "100%", height }}
    >
      {use3D ? (
        <Suspense fallback={<StaticFallback src={fallbackSrc} alt={fallbackAlt} />}>
          <CanvasScene>{children}</CanvasScene>
        </Suspense>
      ) : (
        <StaticFallback src={fallbackSrc} alt={fallbackAlt} />
      )}
    </div>
  );
}
