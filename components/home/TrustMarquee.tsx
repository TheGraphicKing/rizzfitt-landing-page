import { Section, Marquee, Tag } from "@/components/primitives";
import { BrandBadge } from "@/components/BrandBadge";

const EVENTS = [
  "Bengaluru Open 2025",
  "Indian Pickleball Nationals",
  "WPPL Season 1",
  "Salem Challenger League",
  "KLTR Open, Singapore",
  "Madhya Pradesh Open",
  "Galacticos Supercup",
];

const BADGES = [
  "TNPA",
  "Indian Pickleball Association",
  "PaddleX",
  "Picklers Arena",
  "11 Point Club",
];

/**
 * Trust strip (live / light). Two opposing marquee rows — events scrolling one
 * way, association badges the other — both pausing on hover. Animation is off
 * under reduced motion (the rows simply sit still).
 */
export function TrustMarquee() {
  return (
    <Section mode="live">
      <div className="stack" style={{ gap: "var(--space-6)" }}>
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "60rem" }}>
          <Tag>Trusted on the court</Tag>
          <p className="body-l">
            Trusted by the Tamil Nadu Pickleball Association and the Indian
            Pickleball Association — and by 45+ organisers across 15+ cities, from
            Chennai to Singapore.
          </p>
        </div>

        <div className="stack" style={{ gap: "var(--space-4)" }}>
          <Marquee
            label="Events powered by RizzFitt"
            items={EVENTS.map((e) => <BrandBadge key={e} name={e} />)}
          />
          <Marquee
            label="Associations and partners"
            reverse
            items={BADGES.map((b) => <BrandBadge key={b} name={b} />)}
          />
        </div>
      </div>
    </Section>
  );
}
