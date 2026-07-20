import { Section, Tag, StatBand } from "@/components/primitives";
import type { Stat } from "@/components/primitives/StatBand";
import { MANUAL_STATS } from "@/lib/stats";
import { AttendanceGraph } from "./AttendanceGraph";

/**
 * Engagement / retention (os). The flywheel narrative paired with an animated
 * attendance graph. The stat band only renders once REAL figures are supplied
 * in `MANUAL_STATS` — nothing fabricated ships, and no stat ever reads "0".
 */
const RETENTION_STATS: Stat[] = [
  ...(MANUAL_STATS.avgShowUpRatePct != null
    ? [{ value: MANUAL_STATS.avgShowUpRatePct, suffix: "%", label: "Avg show-up rate" } as Stat]
    : []),
  ...(MANUAL_STATS.retentionLiftPct != null
    ? [{ value: MANUAL_STATS.retentionLiftPct, prefix: "+", suffix: "%", label: "Retention lift" } as Stat]
    : []),
  ...(MANUAL_STATS.moreEventsMultiple != null
    ? [{ value: MANUAL_STATS.moreEventsMultiple, suffix: "×", label: "More events run" } as Stat]
    : []),
];

export function EngagementStats() {
  return (
    <Section mode="os">
      <div className="engage-grid">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "34rem" }}>
          <Tag>Retention</Tag>
          <h2 className="h1">The flywheel that keeps people coming back.</h2>
          <p className="body-l muted">
            Communities live or die on retention. Community OS surfaces who&apos;s
            drifting and helps you bring them back — automated re-engagement,
            milestone nudges, and a calendar people can count on.
          </p>
        </div>
        <AttendanceGraph />
      </div>

      {RETENTION_STATS.length ? (
        <StatBand className="engage-stats" stats={RETENTION_STATS} />
      ) : (
        // TODO(content): supply avgShowUpRatePct / retentionLiftPct /
        // moreEventsMultiple in lib/stats.ts to surface this metric band.
        null
      )}
    </Section>
  );
}
