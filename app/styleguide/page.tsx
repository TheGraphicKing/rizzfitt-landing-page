import type { Metadata } from "next";
import { Activity, MapPin } from "lucide-react";
import {
  Section,
  Tag,
  Button,
  Card,
  CourtRule,
  Reveal,
  RevealItem,
  CountUp,
  StatBand,
  Marquee,
  CTABand,
  Hero3DCanvas,
} from "@/components/primitives";
import type { Mode } from "@/lib/types";
import { events, partners, EVENTS_RUN_COUNT } from "@/data";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Every RizzFitt primitive, rendered in both surface modes.",
};

/** Small labelled group within the showcase. */
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="stack" style={{ gap: "var(--space-4)" }}>
      <span className="eyebrow">{title}</span>
      {children}
    </div>
  );
}

/** The full primitive showcase. Rendered once per mode so each can be verified. */
function Showcase({ mode }: { mode: Mode }) {
  const sample = events[0];
  return (
    <div className="stack" style={{ gap: "var(--space-8)" }}>
      <Reveal>
        <RevealItem>
          <Tag icon={<Activity size={14} />}>{mode === "os" ? "OS · dark" : "Live · light"}</Tag>
        </RevealItem>
        <RevealItem as="h2" className="display-l">
          The {mode} surface
        </RevealItem>
        <RevealItem as="p" className="body-l muted">
          One palette, two modes. Components read only semantic tokens, so the
          same markup adapts unchanged.
        </RevealItem>
      </Reveal>

      {/* Typography */}
      <Group title="Typography">
        <div className="stack" style={{ gap: "var(--space-2)" }}>
          <span className="display-xl">Display xl</span>
          <span className="display-l">Display l</span>
          <span className="h1">Heading 1</span>
          <span className="h2">Heading 2</span>
          <span className="h3">Heading 3 (card)</span>
          <span className="body-l">Body lead — General workhorse copy.</span>
          <span>Body — the default reading size.</span>
          <span className="small muted">Small / muted caption.</span>
          <span className="data">Mono data · 11 – 8 · 12:04:33 · ₹1,499</span>
        </div>
      </Group>

      {/* Buttons */}
      <Group title="Buttons">
        <div className="cluster">
          <Button variant="primary">Book a demo</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="primary" iconLeft={<MapPin size={16} />}>
            Find an event
          </Button>
        </div>
      </Group>

      {/* Tags + status pills */}
      <Group title="Tags & status pills">
        <div className="cluster">
          <Tag>Pickleball</Tag>
          <Tag>Badminton</Tag>
          <span className="status-pill status-upcoming">Upcoming</span>
          <span className="status-pill status-completed">Completed</span>
          <span className="status-pill status-soldout">Sold out</span>
          <span className="pill">
            <span className="live-dot" aria-hidden /> Live
          </span>
        </div>
      </Group>

      {/* Cards */}
      <Group title="Cards">
        <div
          style={{
            display: "grid",
            gap: "var(--space-5)",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <Card>
            <h3 className="h3">Tournament OS</h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
              Auto fixtures, auto scoring, auto re-seeding.
            </p>
          </Card>
          <Card>
            <h3 className="h3">Community OS</h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
              Turn players into a community.
            </p>
          </Card>
        </div>
      </Group>

      {/* Court rule */}
      <Group title="Court-rule divider">
        <CourtRule label="example divider" />
      </Group>

      {/* Stat band + CountUp */}
      <Group title="Stat band (count-up)">
        <StatBand
          stats={[
            { value: EVENTS_RUN_COUNT, suffix: "+", label: "Events run" },
            { value: 12000, label: "Players", suffix: "+" },
            { value: 98, suffix: "%", label: "Auto-scored" },
            { value: 1499, prefix: "₹", label: "Avg entry" },
          ]}
        />
        <p className="muted">
          Inline count-up: <CountUp to={45} suffix="+" /> events, scored live.
        </p>
      </Group>

      {/* Event card sample (reads from events.json) */}
      <Group title="Event card (data-driven)">
        <article className="event-card" style={{ maxWidth: 360 }}>
          <div className="media" />
          <div className="meta stack" style={{ gap: "var(--space-3)" }}>
            <div className="cluster" style={{ justifyContent: "space-between" }}>
              <span className="date">{sample.start}</span>
              <span className="status-pill status-upcoming">{sample.status}</span>
            </div>
            <Tag>{sample.sport}</Tag>
            <h3 className="h3">{sample.title}</h3>
            <span className="small muted">
              {sample.venue} · {sample.city}
            </span>
          </div>
        </article>
      </Group>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      {/* Intro (live) */}
      <Section mode="live">
        <div className="stack" style={{ maxWidth: "48rem" }}>
          <Tag>Styleguide</Tag>
          <h1 className="display-l">Every primitive, both modes.</h1>
          <p className="body-l muted">
            This route renders the RizzFitt primitive library so the system can
            be verified end to end. Below: the live (light) surface, then the os
            (dark) surface, then the marquee, CTA band, and the single 3D scene.
          </p>
        </div>
      </Section>

      {/* Live showcase */}
      <Section mode="live">
        <Showcase mode="live" />
      </Section>

      {/* OS showcase */}
      <Section mode="os">
        <Showcase mode="os" />
      </Section>

      {/* Marquee — two opposing rows (live) */}
      <Section mode="live">
        <Group title="Marquee / trust strip">
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Marquee
              label="Partners (row 1)"
              items={partners.map((p) => (
                <span key={p.id} className="badge-assoc">
                  {p.name}
                </span>
              ))}
            />
            <Marquee
              label="Events (row 2)"
              reverse
              items={events.map((e) => (
                <span key={e.slug} className="badge-assoc">
                  {e.title}
                </span>
              ))}
            />
          </div>
        </Group>
      </Section>

      {/* CTA band (os) */}
      <Section mode="os">
        <CTABand
          title="Run your next tournament like a broadcast."
          subtitle="Auto fixtures, live scoring, payments — your referees just watch."
          primary={{ label: "Book a demo", href: "/book-a-demo" }}
          secondary={{ label: "See events", href: "/events" }}
        />
      </Section>

      {/* The single 3D scene for this page (os) */}
      <Section mode="os">
        <Group title="Hero 3D canvas (lazy · mobile + reduced-motion fallback)">
          <div style={{ maxWidth: 560 }}>
            <Hero3DCanvas
              fallbackSrc="/hero-fallback.svg"
              fallbackAlt="RizzFitt floating paddle and ball"
            />
          </div>
        </Group>
      </Section>
    </>
  );
}
