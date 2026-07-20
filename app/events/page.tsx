import type { Metadata } from "next";
import { Section, Tag, Button } from "@/components/primitives";
import { EventsDirectory } from "@/components/events/EventsDirectory";
import { PageMode } from "@/components/layout/PageMode";
import { MiniFAQ } from "@/components/MiniFAQ";
import { events, sports, cities } from "@/data";

export const metadata: Metadata = {
  title: "Events — every RizzFitt event, in one place",
  description:
    "Tournaments, leagues and mixers we're running and have run — across pickleball, badminton, cricket and football, in 10 cities and counting.",
};

/**
 * Events directory (live). Header + chip filters + animated grid reading from
 * data/events.json, closed by the organiser CTA band.
 *
 * TODO(content): events currently come from a static data/events.json. Ideally
 * this is fetched live from tournament.rizzfitt.com so new events appear here
 * automatically and the homepage counts stay current without a redeploy.
 */
export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sport?: string; city?: string }>;
}) {
  const sp = await searchParams;
  const initialStatus = (["all", "upcoming", "past"].includes(sp.status ?? "")
    ? sp.status
    : "all") as "all" | "upcoming" | "past";
  const initialSport = sp.sport && sports.includes(sp.sport) ? sp.sport : "all";
  const initialCity = sp.city && cities.includes(sp.city) ? sp.city : "all";

  return (
    <>
      <PageMode mode="live" />
      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem", marginBottom: "var(--space-7)" }}>
          <Tag>What&apos;s on</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            Every RizzFitt event, in one place.
          </h1>
          <p className="body-l muted">
            Tournaments, leagues and mixers we&apos;re running and have run —
            across pickleball, badminton, cricket, football and fitness circuits,
            in 10 cities and counting.
          </p>
        </div>

        <EventsDirectory
          events={events}
          sports={sports}
          cities={cities}
          initialStatus={initialStatus}
          initialSport={initialSport}
          initialCity={initialCity}
        />
      </Section>

      <MiniFAQ group="events" mode="live" />

      {/* Organiser CTA */}
      <Section mode="live">
        <div className="organiser-band">
          <Tag>Running something?</Tag>
          <h2 className="h1" style={{ marginBlock: "var(--space-3)" }}>
            Want your event here?
          </h2>
          <p className="body-l muted" style={{ maxWidth: "46rem", marginBottom: "var(--space-6)" }}>
            List your tournament on RizzFitt and get the full stack behind it —
            website, registrations, scoring and more.
          </p>
          <div className="cluster">
            <Button href="/list-your-tournament" variant="primary">
              List your tournament
            </Button>
            <Button href="/book-a-demo" variant="ghost">
              Book a demo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
