import type { Metadata } from "next";
import { Activity, RefreshCw, Users, Coffee, Heart, type LucideIcon } from "lucide-react";
import { Section, Tag, Button, Card, CTABand } from "@/components/primitives";
import { FormLauncher } from "@/components/forms/FormLauncher";
import { PageMode } from "@/components/layout/PageMode";
import { EventCard } from "@/components/events/EventCard";
import { Collage } from "@/components/Collage";
import { VideoLoop } from "@/components/VideoLoop";
import { communityGalleryItems, COMMUNITY_CLIPS } from "@/lib/gallery";
import { MiniFAQ } from "@/components/MiniFAQ";
import { events } from "@/data";

export const metadata: Metadata = {
  title: "RizzFitt Socials — meet people through movement",
  description:
    "Curated pickleball mixers where a game is the icebreaker and breakfast is the reason to stay. Beginner-friendly, monthly, and unmistakably Bangalore.",
};

const WHAT: { icon: LucideIcon; label: string; line: string }[] = [
  { icon: Activity, label: "Play", line: "A game is the icebreaker." },
  { icon: RefreshCw, label: "Rotate", line: "New courts, new pods, new faces." },
  { icon: Users, label: "Connect", line: "Prompt cards make it easy." },
  { icon: Coffee, label: "Breakfast", line: "A reason to stay and talk." },
  { icon: Heart, label: "Community", line: "Come back every month." },
];

const TESTIMONIALS = [
  { quote: "I came alone and left with a WhatsApp group of new friends. The pod rotation makes it impossible to stay a stranger.", who: "Priya · Bengaluru" },
  { quote: "Best Saturday morning habit I've picked up in years. Play, then filter coffee with the crew — I never miss one now.", who: "Karan · Bengaluru" },
  { quote: "Genuinely beginner-friendly. I'd never held a paddle and my first rally felt great — nobody made it weird.", who: "Ananya · Bengaluru" },
  { quote: "It's the one thing on my calendar that isn't work or a dating app. Real people, real conversations, over breakfast.", who: "Rohan · Bengaluru" },
  { quote: "New to the city and this was how I found my people. Two mixers in and I already have plans every weekend.", who: "Meghana · Bengaluru" },
  { quote: "The prompt cards are genius — you skip the awkward small talk and get to the good stuff fast.", who: "Aditya · Bengaluru" },
];

const COLLAB = [
  { title: "Gift a product", line: "Sample your nutrition, gear or F&B to every attendee." },
  { title: "Host a corner", line: "A smoothie bar, a recovery station, a photo wall." },
  { title: "Co-host the morning", line: "Co-brand a mixer in your city." },
  { title: "Creators & influencers", line: "Come play, cover it, or co-host." },
];

export default function CommunityPage() {
  const mixers = events.filter((e) => e.type === "Social");

  return (
    <>
      <PageMode mode="live" />

      {/* Hero */}
      <section className="event-hero" data-mode="live">
        <div className="event-hero-bg" aria-hidden />
        <div className="container event-hero-inner">
          <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "44rem" }}>
            <Tag>RizzFitt Socials</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              Meet people through movement.
            </h1>
            <p className="body-l">
              Our community side — curated pickleball mixers where a game is the
              icebreaker and breakfast is the reason to stay. Beginner-friendly,
              monthly, and unmistakably Bangalore (for now).
            </p>
            <div className="cluster">
              <Button href="/events/the-morning-community" variant="primary">
                Reserve a spot
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What happens */}
      <Section mode="live">
        <div className="what-row">
          {WHAT.map(({ icon: Icon, label, line }) => (
            <div className="what-step" key={label}>
              <span className="what-ic" aria-hidden>
                <Icon size={22} />
              </span>
              <span className="h3" style={{ fontSize: "1.25rem" }}>
                {label}
              </span>
              <span className="small muted">{line}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Why it works */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem" }}>
          <Tag>The idea</Tag>
          <h2 className="h1">A recurring circle for better weekends.</h2>
          <p className="body-l muted">
            Apps made meeting people transactional. Mixers make it real. A game
            gives everyone something to do; the table gives everyone a reason to
            stay. Curated pods, prompt cards and a beginner-safe format mean you
            leave with names, not just a workout.
          </p>
        </div>
      </Section>

      {/* Upcoming mixers */}
      {mixers.length ? (
        <Section mode="live">
          <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
            <Tag>Upcoming mixers</Tag>
            <h2 className="h1">Come to the next one.</h2>
          </div>
          <div className="event-grid">
            {mixers.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Gallery + moments + testimonials */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Tag>From past mornings</Tag>
          <h2 className="h1">The Bangalore mixer, in the flesh.</h2>
          <p className="body-l muted" style={{ maxWidth: "44rem" }}>
            Real photos and clips from our PaddleX morning — games, pods and a
            long table over filter coffee. This is what a Saturday can look like.
          </p>
        </div>
        <div style={{ marginBottom: "var(--space-7)" }}>
          <Collage label="Photos from the Bangalore mixer" items={communityGalleryItems()} />
        </div>
        <div style={{ marginBottom: "var(--space-7)" }}>
          <VideoLoop clips={COMMUNITY_CLIPS} label="Moments from the morning" />
        </div>
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Tag>In their words</Tag>
          <h2 className="h1">What regulars say.</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <Card key={t.who}>
              <p className="body-l">&ldquo;{t.quote}&rdquo;</p>
              <span className="data small muted" style={{ marginTop: "var(--space-3)", display: "block" }}>
                {t.who}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Collaborate with us */}
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "50rem", marginBottom: "var(--space-6)" }}>
          <Tag>Co-create a mixer</Tag>
          <h2 className="h1">Bring your brand to the morning.</h2>
          <p className="body-l muted">
            Our mixers are intimate rooms of high-intent, urban, health-minded
            people — exactly who many brands want to reach authentically. We
            partner in a few ways:
          </p>
        </div>
        <div className="collab-grid">
          {COLLAB.map((c) => (
            <div className="feature-tile" key={c.title}>
              <h3 className="h3" style={{ fontSize: "1.125rem" }}>
                {c.title}
              </h3>
              <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
                {c.line}
              </p>
            </div>
          ))}
        </div>
        <div className="cluster" style={{ marginTop: "var(--space-6)" }}>
          <FormLauncher formId="brand-collab" label="Brand collaboration & gifting" variant="primary" />
          <FormLauncher formId="creator" label="Creator collaboration" variant="ghost" />
          <FormLauncher formId="venue" label="Become a venue partner" variant="ghost" />
        </div>
      </Section>

      <MiniFAQ group="events" mode="live" />

      <Section mode="live">
        <CTABand title="Find your Bangalore crowd." primary={{ label: "Reserve a spot", href: "/events/the-morning-community" }} />
      </Section>
    </>
  );
}
