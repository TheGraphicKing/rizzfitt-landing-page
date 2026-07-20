import type { Metadata } from "next";
import { Section, Tag, StatBand, CTABand, Card } from "@/components/primitives";
import { FormLauncher } from "@/components/forms/FormLauncher";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AudienceField } from "@/components/illustrations/AudienceField";
import type { Stat } from "@/components/primitives/StatBand";
import { getFaqGroup } from "@/data/faq";
import { derivedStats, MANUAL_STATS } from "@/lib/stats";
import type { FormId } from "@/lib/forms";

const PARTNER_STATS: Stat[] = [
  { value: derivedStats.events, suffix: "+", label: "Events" },
  { value: derivedStats.cities, label: "Cities" },
  { value: derivedStats.sports, label: "Sports" },
  ...(MANUAL_STATS.playersReached != null
    ? [{ value: MANUAL_STATS.playersReached, suffix: "+", label: "Players reached" } as Stat]
    : []),
];

export const metadata: Metadata = {
  title: "Partner with us — there's a place for you on the court",
  description:
    "RizzFitt events put you in front of engaged, high-intent sports communities across India. Sponsor, venue, brand, creator or club — start here.",
};

const PATHS: { eyebrow: string; title: string; pitch: string; form: FormId; cta: string }[] = [
  {
    eyebrow: "Sponsors",
    title: "Sponsor an event",
    pitch:
      "Reach players where they're most engaged. We build branded sponsor decks with real audience and reach numbers, place you across the right tournaments and cities, and report on performance after. Tiered packages from single events to full seasons.",
    form: "sponsor",
    cta: "Sponsor an event",
  },
  {
    eyebrow: "Brands",
    title: "Brand collaborations & gifting",
    pitch:
      "Especially for our social mixers: gift products, host a station, or co-create an experience with a community that actually tries what you bring. Great for nutrition, F&B, gear, wellness and lifestyle brands.",
    form: "brand-collab",
    cta: "Collaborate or gift",
  },
  {
    eyebrow: "Venues",
    title: "Venue partners",
    pitch:
      "Have courts? Fill them. We bring organised tournaments and recurring mixers to partner venues, with all the operations handled.",
    form: "venue",
    cta: "Become a venue partner",
  },
  {
    eyebrow: "Creators",
    title: "Creators & influencers",
    pitch:
      "Play, cover, or co-host. If your audience cares about sport, fitness, food or city life, let's create something around an event.",
    form: "creator",
    cta: "Creator collaboration",
  },
  {
    eyebrow: "Academies & clubs",
    title: "Academies & clubs",
    pitch:
      "Run your own events on RizzFitt, cross-promote to our community, or co-host a circuit.",
    form: "academy",
    cta: "Partner as an academy",
  },
];

const REASONS = [
  { title: "High-intent audiences", line: "Engaged, urban, health-minded players — exactly who many brands want to reach." },
  { title: "Multi-city footprint", line: "Events across 10 cities and counting, from a Salem league to a Singapore open." },
  { title: "Full operational support", line: "You show up; we run it. Decks, placement and reporting handled end to end." },
];

export default function PartnerWithUsPage() {
  const partnersFaq = getFaqGroup("partners");
  return (
    <>
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "50rem" }}>
          <Tag>Work with us</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            There&apos;s a place for you on the court.
          </h1>
          <p className="body-l muted">
            RizzFitt events put you in front of engaged, high-intent sports
            communities across India. However you want to be involved — sponsor,
            venue, brand, creator or club — start here.
          </p>
        </div>
      </Section>

      {/* Five paths */}
      <Section mode="os">
        <div className="partner-paths">
          {PATHS.map((p) => (
            <Card as="article" key={p.title}>
              <div className="stack" style={{ gap: "var(--space-3)" }}>
                <span className="eyebrow">{p.eyebrow}</span>
                <h2 className="h2" style={{ margin: 0 }}>
                  {p.title}
                </h2>
                <p className="muted">{p.pitch}</p>
                <div style={{ marginTop: "var(--space-2)" }}>
                  <FormLauncher formId={p.form} label={p.cta} variant="primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why partner */}
      <Section mode="os">
        <div className="illus-grid" style={{ marginBottom: "var(--space-8)" }}>
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Tag>Why us</Tag>
            <h2 className="h1">Real reach, real rooms.</h2>
            <p className="body-l muted">
              Every RizzFitt event is a room full of engaged, high-intent players.
              Move your cursor across the room — that&apos;s who you reach.
            </p>
          </div>
          <AudienceField caption="Every dot is a player in the room." />
        </div>
        <StatBand stats={PARTNER_STATS} />
        <div className="home-products" style={{ marginTop: "var(--space-8)" }}>
          {REASONS.map((r) => (
            <Card key={r.title}>
              <h3 className="h3" style={{ fontSize: "1.125rem" }}>
                {r.title}
              </h3>
              <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
                {r.line}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Partner FAQ */}
      {partnersFaq ? (
        <Section mode="os">
          <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
            <Tag>Partner FAQ</Tag>
            <h2 className="h1">The questions partners ask.</h2>
          </div>
          <div style={{ maxWidth: "52rem" }}>
            <FAQAccordion items={partnersFaq.items} />
          </div>
        </Section>
      ) : null}

      <Section mode="os">
        <CTABand
          title="Let's build something on the court."
          primary={{ label: "Talk to partnerships", href: "/contact" }}
        />
      </Section>
    </>
  );
}
