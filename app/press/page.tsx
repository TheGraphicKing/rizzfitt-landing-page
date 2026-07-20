import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Section, Tag, Card, Button } from "@/components/primitives";
import { ReachOutForm } from "@/components/forms/ReachOutForm";
import { BrandBadge } from "@/components/BrandBadge";
import { AudienceField } from "@/components/illustrations/AudienceField";
import { PageMode } from "@/components/layout/PageMode";
import { getForm } from "@/lib/forms";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Press & media — RizzFitt in the press",
  description: "Logos, boilerplate, founder bios and a downloadable media kit. For interviews, data, assets or quotes, get in touch.",
};

const LOGOS = ["The Hindu", "YourStory", "Inc42", "Sportskeeda", "ETBrandEquity"];
const FOUNDERS = [
  { name: "Founder One", role: "Co-founder & CEO", bio: "Built RizzFitt after running one too many tournaments on spreadsheets. Leads product and partnerships." },
  { name: "Founder Two", role: "Co-founder & CTO", bio: "Leads engineering on the scoring and automation engine that powers every RizzFitt event." },
];

export default function PressPage() {
  return (
    <>
      <PageMode mode="live" />

      <Section mode="live">
        <div className="illus-grid" style={{ marginBottom: "var(--space-8)" }}>
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Tag>Press</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              RizzFitt in the press.
            </h1>
            <p className="body-l muted">
              The story of an operating system for sport in India — and the
              communities behind every number.
            </p>
          </div>
          <AudienceField caption="The communities behind the headlines." />
        </div>
        <div className="cluster" style={{ gap: "var(--space-3)" }}>
          {LOGOS.map((l) => (
            <BrandBadge key={l} name={l} />
          ))}
        </div>
      </Section>

      {/* Boilerplate */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>Boilerplate</Tag>
          <p className="body-l">
            RizzFitt is the operating system for sports communities and events in
            India. From professional tournaments and leagues to run clubs and
            social mixers, RizzFitt gives organisers one connected system —
            website, registrations, payments, live scoring and communication —
            so they can focus on the game and the people. RizzFitt has powered
            47 events across 10 cities and five sports, including an
            international open in Singapore.
          </p>
        </div>
      </Section>

      {/* Founders */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Tag>Founders</Tag>
          <h2 className="h1">The team.</h2>
        </div>
        <div className="testimonial-grid">
          {FOUNDERS.map((f) => (
            <Card key={f.name}>
              <h3 className="h3" style={{ fontSize: "1.25rem" }}>
                {f.name}
              </h3>
              <span className="data small muted">{f.role}</span>
              <p className="muted" style={{ marginTop: "var(--space-3)" }}>
                {f.bio}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Media kit */}
      <Section mode="live">
        <div className="organiser-band">
          <Tag>Media kit</Tag>
          <h2 className="h1" style={{ marginBlock: "var(--space-3)" }}>
            Logos, photos and brand assets.
          </h2>
          <p className="body-l muted" style={{ maxWidth: "44rem", marginBottom: "var(--space-6)" }}>
            Download our logos, event photography and brand guidelines in one pack.
          </p>
          <Button href="/press-kit.zip" variant="primary" iconLeft={<Download size={16} />}>
            Download media kit
          </Button>
        </div>
      </Section>

      {/* Press form */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
          <Tag>Press contact</Tag>
          <h2 className="h1">Working on a story?</h2>
          <p className="muted">
            For anything time-sensitive, email{" "}
            <a href={`mailto:${CONTACT.pressEmail}`} style={{ color: "var(--accent)" }}>
              {CONTACT.pressEmail}
            </a>
            .
          </p>
        </div>
        <div style={{ maxWidth: "48rem" }}>
          <ReachOutForm config={getForm("press")} />
        </div>
      </Section>
    </>
  );
}
