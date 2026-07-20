import type { RizzEvent } from "@/lib/types";
import { upcomingEvents, pastEvents } from "@/data";

/** Base of the live registration / scoring app. */
export const TOURNAMENT_APP = "https://tournament.rizzfitt.com";

/**
 * The canonical link for a "register / view event" action.
 *
 * Live registration + scoring lives on the tournament app, so we link there
 * whenever we know the event's real tournament URL (`externalUrl`). We do NOT
 * fabricate `${TOURNAMENT_APP}/event/${slug}` because the tournament app's IDs
 * don't match our marketing slugs (e.g. `the-morning-community` → `smpickleball`),
 * and a guessed URL would 404. Events without a known tournament URL fall back
 * to their marketing/storytelling page on this site.
 *
 * TODO(content): populate `externalUrl` for every event in data/events.json with
 * its real tournament.rizzfitt.com URL so ALL registration standardises on the
 * tournament app. Currently only 1 of 47 events has it.
 */
export function canonicalEventUrl(event: RizzEvent): { href: string; external: boolean } {
  if (event.externalUrl) return { href: event.externalUrl, external: true };
  return { href: `/events/${event.slug}`, external: false };
}

/** Events for the homepage strip: the next upcoming, then the most recent past. */
export function eventsStripSelection(limit = 6): RizzEvent[] {
  const combined = [...upcomingEvents, ...pastEvents];
  return combined.slice(0, limit);
}
