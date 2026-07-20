import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  /** Items rendered in the loop (event names, association/venue badges…). */
  items: ReactNode[];
  /** Scroll the opposite direction (use a second, reversed row for the
   *  two-opposing-rows trust strip). */
  reverse?: boolean;
  /** Loop duration in seconds (default 38, matching the CSS). */
  speed?: number;
  /** Accessible label for the strip. */
  label?: string;
  className?: string;
}

/**
 * Infinite horizontal trust strip. Edges are fade-masked and the loop pauses on
 * hover (both CSS-driven). The track is duplicated so the -50% keyframe loops
 * seamlessly; the duplicate is `aria-hidden`. Under `prefers-reduced-motion`
 * the animation is disabled (the strip simply sits still).
 */
export function Marquee({
  items,
  reverse = false,
  speed = 38,
  label,
  className,
}: MarqueeProps) {
  const row = (ariaHidden: boolean) =>
    items.map((item, i) => (
      <div key={i} aria-hidden={ariaHidden || undefined}>
        {item}
      </div>
    ));

  return (
    <div
      className={cn("marquee", className)}
      role="group"
      aria-label={label}
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
