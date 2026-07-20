import type { Metadata } from "next";
import { Section, Tag, Card } from "@/components/primitives";
import { ReachOutForm } from "@/components/forms/ReachOutForm";
import { AudienceField } from "@/components/illustrations/AudienceField";
import { getForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Careers — help us run the game",
  description: "We're a small team building the operating system for sports in India. If that excites you, so do we.",
};

const ROLES = [
  { title: "Founding full-stack engineer", type: "Full-time", location: "Remote / India" },
  { title: "Product designer", type: "Full-time", location: "Remote / India" },
  { title: "Community & events lead", type: "Full-time", location: "Bengaluru" },
  { title: "Operations associate", type: "Full-time", location: "Chennai" },
];

export default function CareersPage() {
  return (
    <>
      <Section mode="os">
        <div className="illus-grid">
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Tag>Join us</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              Help us run the game.
            </h1>
            <p className="body-l muted">
              We&apos;re a small team building the operating system for sports in
              India. If that excites you, so do we.
            </p>
          </div>
          <AudienceField caption="A small team, a big room to build for." />
        </div>
      </Section>

      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Tag>Open roles</Tag>
          <h2 className="h1">Where you could fit.</h2>
        </div>
        <div className="stack" style={{ gap: "var(--space-4)" }}>
          {ROLES.map((r) => (
            <Card key={r.title}>
              <div className="cluster" style={{ justifyContent: "space-between", gap: "var(--space-4)" }}>
                <h3 className="h3" style={{ fontSize: "1.25rem" }}>
                  {r.title}
                </h3>
                <span className="cluster" style={{ gap: "var(--space-3)" }}>
                  <span className="status-pill status-upcoming">{r.type}</span>
                  <span className="data small muted">{r.location}</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "var(--space-5)" }}>
          No perfect-fit role? Tell us anyway — we read every message.
        </p>
      </Section>

      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
          <Tag>Apply</Tag>
          <h2 className="h1">Tell us about you.</h2>
        </div>
        <div style={{ maxWidth: "48rem" }}>
          <ReachOutForm config={getForm("careers")} />
        </div>
      </Section>
    </>
  );
}
