"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Pieces of a countdown, zero-padded. */
function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    mins: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    secs: String(s % 60).padStart(2, "0"),
    done: ms === 0,
  };
}

/**
 * Mono countdown to an event's start. Computed client-side only (avoids
 * hydration mismatch); renders a stable placeholder until mounted. Functional
 * information, so it ticks regardless of reduced-motion.
 */
export function EventCountdown({
  start,
  startTime = "09:00",
  className,
}: {
  start: string;
  startTime?: string;
  className?: string;
}) {
  const [now, setNow] = useState<number | null>(null);
  const target = new Date(`${start}T${startTime}:00`).getTime();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <span className={cn("data countdown", className)} aria-hidden>
        --d 00:00:00
      </span>
    );
  }

  const t = diff(target, now);
  if (t.done) {
    return <span className={cn("data countdown", className)}>Happening now</span>;
  }

  return (
    <span className={cn("data countdown", className)} aria-label={`${t.days} days until start`}>
      {t.days}d {t.hours}:{t.mins}:{t.secs}
    </span>
  );
}
