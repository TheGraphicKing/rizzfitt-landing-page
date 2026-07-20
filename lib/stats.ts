import { events, cities, sports, eventsMeta } from "@/data";

/**
 * Real, programmatically-derived headline numbers. These read from the same
 * `data/events.json` that powers the /events directory, so they can never drift
 * from the archive. Use these everywhere instead of hardcoding a stat.
 */
export const derivedStats = {
  /** Total events run + scheduled (currently 47). */
  events: eventsMeta.counts.total,
  /** Distinct cities across the archive (currently 10). */
  cities: cities.length,
  /** Distinct sports/formats — pickleball, badminton, cricket, football + fitness circuits (currently 5). */
  sports: sports.length,
  upcoming: events.filter((e) => e.status === "upcoming").length,
  completed: eventsMeta.counts.completed,
} as const;

/**
 * Stats that CANNOT be derived from the codebase. They are intentionally `null`
 * so nothing fabricated ships: a `null` stat is simply hidden. Fill in a real
 * number to surface it.
 *
 * TODO(content): supply real figures (or leave null to keep the stat hidden):
 *   - playersReached: cumulative unique players across all events
 *   - retentionLiftPct: measured community retention lift (Community OS)
 *   - avgShowUpRatePct: average mixer show-up rate
 */
export const MANUAL_STATS: {
  playersReached: number | null;
  retentionLiftPct: number | null;
  avgShowUpRatePct: number | null;
  moreEventsMultiple: number | null;
} = {
  playersReached: null, // TODO(content)
  retentionLiftPct: null, // TODO(content)
  avgShowUpRatePct: null, // TODO(content)
  moreEventsMultiple: null, // TODO(content)
};
