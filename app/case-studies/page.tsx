import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Tag, Button, Card } from "@/components/primitives";
import { PageMode } from "@/components/layout/PageMode";
import { InteractiveBracket } from "@/components/illustrations/InteractiveBracket";
import { CASE_STUDIES } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case studies — events we've run end to end",
  description: "A look at what \"RizzFitt runs it\" means in practice — across scales, sports and cities.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageMode mode="live" />

      <Section mode="live">
        <div className="illus-grid" style={{ marginBottom: "var(--space-8)" }}>
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Tag>Proof</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              Events we&apos;ve run end to end.
            </h1>
            <p className="body-l muted">
              A look at what &ldquo;RizzFitt runs it&rdquo; means in practice —
              across scales, sports and cities. Play the bracket: tap a pair to
              advance them and crown a champion.
            </p>
          </div>
          <InteractiveBracket />
        </div>

        <div className="event-grid">
          {CASE_STUDIES.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} aria-label={c.title}>
              <Card as="article">
                <div className="stack" style={{ gap: "var(--space-3)" }}>
                  <div className="cluster" style={{ justifyContent: "space-between" }}>
                    <span className="tag">{c.sport}</span>
                    <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="h3">{c.title}</h3>
                  <span className="data small muted">{c.location}</span>
                  <p className="small muted">{c.summary}</p>
                  <div className="cluster" style={{ gap: "var(--space-4)", marginTop: "var(--space-2)" }}>
                    {c.stats.slice(0, 3).map((s) => (
                      <span key={s.label} className="data" style={{ color: "var(--accent)", fontWeight: 700 }}>
                        {s.value}
                        {s.suffix} <span className="small muted" style={{ fontWeight: 400 }}>{s.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section mode="live">
        <div className="cta-band">
          <h2 className="h1" style={{ marginBottom: "var(--space-6)" }}>
            See what we can run for you.
          </h2>
          <div className="cluster" style={{ justifyContent: "center" }}>
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
