import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Tag, Button, Card, CourtRule } from "@/components/primitives";
import { PageMode } from "@/components/layout/PageMode";
import { JourneyStrip } from "@/components/about/JourneyStrip";

export const metadata: Metadata = {
  title: "About — we power sports communities and events",
  description: "RizzFitt is the operating system behind tournaments, clubs and communities across India.",
};

const BELIEFS = [
  { title: "Organisers should run the game, not the admin.", line: "Automation is the product." },
  { title: "One source of truth.", line: "No data forks, no paper sheets, no confusion." },
  { title: "Community is the point.", line: "Tech is the means; people are the why." },
  { title: "Show up for the local game.", line: "From a Salem league to a Singapore open." },
];

export default function AboutPage() {
  return (
    <>
      <PageMode mode="live" />

      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem" }}>
          <Tag>Our mission</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            We power sports communities and events.
          </h1>
          <p className="body-l muted">
            RizzFitt is the operating system behind tournaments, clubs and
            communities across India.
          </p>
        </div>
      </Section>

      {/* The story */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem" }}>
          <Tag>Why we exist</Tag>
          <h2 className="h1">It started with one messy tournament.</h2>
          <p className="body-l muted">
            We kept seeing the same thing — passionate organisers buried in
            spreadsheets, players frustrated by slow results, great communities
            held together by one exhausted person and a WhatsApp group. The sport
            was growing faster than the tools around it. So we built the tools.
          </p>
          <p className="body-l muted">
            What began as helping a few pickleball organisers run cleaner events
            became an operating system for the whole ecosystem — tournaments,
            communities, run clubs, and the social mixers that bring people back
            to the court for the people, not just the points.
          </p>
        </div>
      </Section>

      <JourneyStrip />

      {/* What we believe */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Tag>Our principles</Tag>
          <h2 className="h1">What we believe.</h2>
        </div>
        <div className="home-products">
          {BELIEFS.map((b) => (
            <Card key={b.title}>
              <h3 className="h3" style={{ fontSize: "1.125rem" }}>
                {b.title}
              </h3>
              <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
                {b.line}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section mode="live">
        <div className="cluster" style={{ gap: "var(--space-4)" }}>
          <span className="small muted">Trusted by</span>
          <span className="badge-assoc">TNPA</span>
          <span className="badge-assoc">Indian Pickleball Association</span>
          <span className="small muted">across 47 events.</span>
        </div>
      </Section>

      <CourtRule />

      {/* Teasers */}
      <Section mode="live">
        <div className="home-products" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Link href="/products/connect">
            <Card>
              <span className="eyebrow">Coming soon</span>
              <h3 className="h3" style={{ marginBlock: "var(--space-2)" }}>
                RizzFitt Connect
              </h3>
              <p className="small muted">
                Find workout buddies and training partners nearby. The app that
                started it all is being rebuilt.
              </p>
              <span className="cluster" style={{ gap: 6, color: "var(--accent)", marginTop: "var(--space-3)" }}>
                See the teaser <ArrowRight size={16} />
              </span>
            </Card>
          </Link>
          <Link href="/careers">
            <Card>
              <span className="eyebrow">We&apos;re hiring</span>
              <h3 className="h3" style={{ marginBlock: "var(--space-2)" }}>
                Build it with us
              </h3>
              <p className="small muted">We&apos;re building this in public, and we&apos;re hiring.</p>
              <span className="cluster" style={{ gap: 6, color: "var(--accent)", marginTop: "var(--space-3)" }}>
                See open roles <ArrowRight size={16} />
              </span>
            </Card>
          </Link>
        </div>
      </Section>

      <Section mode="live">
        <div className="cta-band">
          <h2 className="h1" style={{ marginBottom: "var(--space-6)" }}>
            Build the next one with us.
          </h2>
          <div className="cluster" style={{ justifyContent: "center" }}>
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="/partner-with-us" variant="ghost">
              Partner with us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
