import { Section, Tag, StatBand } from "@/components/primitives";
import { AttendanceGraph } from "./AttendanceGraph";

/**
 * Engagement / retention (os). The flywheel narrative paired with an animated
 * attendance graph and a count-up stat band. Figures are illustrative.
 */
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

      <StatBand
        className="engage-stats"
        stats={[
          { value: 92, suffix: "%", label: "Avg show-up rate" },
          { value: 38, prefix: "+", suffix: "%", label: "Retention lift" },
          { value: 3, suffix: "×", label: "More events run" },
          { value: 0, label: "Spreadsheets" },
        ]}
      />
    </Section>
  );
}
