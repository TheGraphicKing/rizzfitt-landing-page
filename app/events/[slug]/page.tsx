import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, CTABand } from "@/components/primitives";
import { PageMode } from "@/components/layout/PageMode";
import {
  EventModuleStack,
  CollaborationCTA,
  HeroEvent,
  QuickFacts,
  Sponsors,
  Rules,
  Gallery,
  EventFAQ,
} from "@/components/events/EventModules";
import { TournamentExplorer } from "@/components/events/TournamentExplorer";
import { events, getEvent } from "@/data";
import { getEventContent } from "@/data/event-content";
import { formatEventDate } from "@/lib/format";
import { seedFor } from "@/lib/tournament";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} — ${formatEventDate(event.start, event.end)}`,
    description: `${event.type} · ${event.sport} · ${event.venue}, ${event.city}.`,
  };
}

/** Competitive types get the full fixtures/results explorer; Social & Workshop
 *  keep the module stack (pods, breakfast, collage, etc.). */
const COMPETITIVE = new Set(["Tournament", "League", "Circuit"]);

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const content = getEventContent(event.slug);
  const competitive = COMPETITIVE.has(event.type);
  const has = (m: string) => event.modules.includes(m as never);

  const closing = content?.closing ? (
    <CTABand title={content.closing.text} primary={{ label: content.closing.cta.label, href: content.closing.cta.href }} />
  ) : event.status === "upcoming" ? (
    <CTABand title={`Reserve your spot at ${event.title}.`} primary={{ label: "Register now", href: event.externalUrl ?? "#register" }} />
  ) : (
    <CTABand
      title="Want this for your event?"
      subtitle="Run your next tournament on RizzFitt — website, registrations, scoring and more."
      primary={{ label: "Book a demo", href: "/book-a-demo" }}
      secondary={{ label: "List your tournament", href: "/list-your-tournament" }}
    />
  );

  return (
    <>
      <PageMode mode="live" />

      {competitive ? (
        <>
          <HeroEvent event={event} />
          <QuickFacts event={event} />
          {/* The fixtures + results experience: matches, scores, groups, standings, bracket, winners, leaderboard */}
          <TournamentExplorer event={event} seed={seedFor(event.slug)} />
          {has("sponsors") ? <Sponsors event={event} /> : null}
          {has("rules") ? <Rules event={event} /> : null}
          {has("gallery") ? <Gallery event={event} /> : null}
          {has("faq") ? <EventFAQ event={event} /> : null}
        </>
      ) : (
        <>
          <EventModuleStack event={event} />
          <CollaborationCTA event={event} />
        </>
      )}

      <Section mode="live">{closing}</Section>
    </>
  );
}
