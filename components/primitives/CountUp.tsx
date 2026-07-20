"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface CountUpProps {
  /** Target value to count to. */
  to: number;
  /** Starting value (default 0). */
  from?: number;
  /** Animation duration in seconds (default 1.6). */
  duration?: number;
  /** Decimal places to show (default 0). */
  decimals?: number;
  /** Group thousands with locale separators (default true). */
  group?: boolean;
  /** Rendered before the number, e.g. "₹". */
  prefix?: string;
  /** Rendered after the number, e.g. "+", "K". */
  suffix?: string;
  className?: string;
}

/**
 * Counts a number up when it scrolls into view. Always rendered in the mono
 * face (Geist Mono) with tabular figures — every meaningful number on the site
 * uses mono per the design system.
 *
 * Reduced motion: skips the animation and renders the final value immediately.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.1,
  decimals = 0,
  group = true,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion() ?? false;
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: group,
  });

  return (
    <span ref={ref} className={cn("data", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
