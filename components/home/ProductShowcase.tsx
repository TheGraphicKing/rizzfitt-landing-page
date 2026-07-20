import { Section, Tag } from "@/components/primitives";
import { TournamentOSDemo } from "@/components/demos/TournamentOSDemo";

/**
 * Homepage "see the actual product" band. Sits just under the hero so the first
 * thing visitors see after the pitch is the software itself — a real, working,
 * interactive Tournament OS demo (registrations, self-scoring match, auto-drawing
 * bracket, live dashboard), not a static screenshot.
 */
export function ProductShowcase() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
        <Tag>See it in action</Tag>
        <h2 className="h1" style={{ margin: 0 }}>
          This is the software, not a mockup.
        </h2>
        <p className="body-l muted">
          Registrations, brackets, live scoring and comms — running themselves.
          Switch tabs below and watch a tournament run end to end, live.
        </p>
      </div>
      <TournamentOSDemo view="all" />
    </Section>
  );
}
