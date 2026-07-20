"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import type { RizzEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

type StatusFilter = "all" | "upcoming" | "past";

interface Props {
  events: RizzEvent[];
  sports: string[];
  cities: string[];
  /** Initial filter values (e.g. deep-linked from /events?city=Bengaluru). */
  initialStatus?: StatusFilter;
  initialSport?: string;
  initialCity?: string;
}

/**
 * Events directory grid with chip filters (status / sport / city). Filtering
 * uses Framer's `layout` animation so cards reflow smoothly with no jump.
 * Reduced motion: layout animation + scale are disabled (instant reflow).
 */
export function EventsDirectory({
  events,
  sports,
  cities,
  initialStatus = "all",
  initialSport = "all",
  initialCity = "all",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const [status, setStatus] = useState<StatusFilter>(initialStatus);
  const [sport, setSport] = useState<string>(initialSport);
  const [city, setCity] = useState<string>(initialCity);

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        if (status === "upcoming" && e.status !== "upcoming") return false;
        if (status === "past" && e.status !== "completed") return false;
        if (sport !== "all" && e.sport !== sport) return false;
        if (city !== "all" && e.city !== city) return false;
        return true;
      }),
    [events, status, sport, city],
  );

  return (
    <div className="stack" style={{ gap: "var(--space-6)" }}>
      {/* Filters */}
      <div className="stack" style={{ gap: "var(--space-4)" }}>
        <div className="cluster" role="group" aria-label="Filter by status">
          {([
            ["all", "All"],
            ["upcoming", "Upcoming"],
            ["past", "Past"],
          ] as [StatusFilter, string][]).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn("filter-chip", status === value && "filter-chip--active")}
              aria-pressed={status === value}
              onClick={() => setStatus(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="cluster" role="group" aria-label="Filter by sport">
          <button
            type="button"
            className={cn("filter-chip", sport === "all" && "filter-chip--active")}
            aria-pressed={sport === "all"}
            onClick={() => setSport("all")}
          >
            All sports
          </button>
          {sports.map((s) => (
            <button
              key={s}
              type="button"
              className={cn("filter-chip", sport === s && "filter-chip--active")}
              aria-pressed={sport === s}
              onClick={() => setSport(s)}
            >
              {s}
            </button>
          ))}
          <label className="filter-select">
            <span className="sr-only">Filter by city</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by city">
              <option value="all">By city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <span className="data small muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "event" : "events"}
        </span>
      </div>

      {/* Grid */}
      <motion.div layout={!reduced} className="event-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((e) => (
            <motion.div
              key={e.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
            >
              <EventCard event={e} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="muted" style={{ textAlign: "center", paddingBlock: "var(--space-7)" }}>
          No events match these filters yet — try clearing one.
        </p>
      ) : null}
    </div>
  );
}
