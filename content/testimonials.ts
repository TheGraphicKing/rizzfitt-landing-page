/**
 * Testimonials data. IMPORTANT: every entry below is a PLACEHOLDER
 * (`isPlaceholder: true`) with obviously-fake attribution — nothing here is a
 * real endorsement. Placeholders are shown only in development (with a visible
 * amber badge) and are excluded from production builds by default, so no
 * fabricated review can ship accidentally.
 *
 * To go live: replace an entry's fields with a REAL, permissioned quote and set
 * `isPlaceholder: false`.
 *
 * TODO(content): collect real quotes (with permission + name/role/org) from:
 *   1. Salem Challenger — the Season III returning organiser (retention story).
 *   2. Bengaluru Open — organiser on live scoring / broadcast overlays.
 *   3. Indian Pickleball Nationals — on running a national at scale.
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
  city: string;
  sport: string;
  /** Path under /public, or null (never use a stock/fake face). */
  avatarUrl: string | null;
  /** Where the quote came from, for your own tracking. */
  source: string;
  /** True = not a real endorsement; hidden in production. */
  isPlaceholder: boolean;
  /** Which surfaces this belongs on. */
  tags?: string[];
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "salem-challenger",
    quote:
      "[PLACEHOLDER — real quote from the Salem Challenger organiser about coming back for Season III and how much time live scoring saved.]",
    name: "TODO — Organiser name",
    role: "Tournament organiser",
    org: "Salem Challenger",
    city: "Salem",
    sport: "Pickleball",
    avatarUrl: null,
    source: "TODO(content): Salem Challenger Season III",
    isPlaceholder: true,
    tags: ["tournament-os", "home"],
  },
  {
    id: "bengaluru-open",
    quote:
      "[PLACEHOLDER — real quote from the Bengaluru Open organiser about brackets that draw themselves and the broadcast-style scoreboard.]",
    name: "TODO — Organiser name",
    role: "Event director",
    org: "Bengaluru Open",
    city: "Bengaluru",
    sport: "Pickleball",
    avatarUrl: null,
    source: "TODO(content): Bengaluru Open",
    isPlaceholder: true,
    tags: ["tournament-os", "home"],
  },
  {
    id: "indian-nationals",
    quote:
      "[PLACEHOLDER — real quote from the Indian Pickleball Nationals team about running a national championship end to end on RizzFitt.]",
    name: "TODO — Organiser name",
    role: "Championship lead",
    org: "Indian Pickleball Nationals",
    city: "Chennai",
    sport: "Pickleball",
    avatarUrl: null,
    source: "TODO(content): Indian Pickleball Nationals",
    isPlaceholder: true,
    tags: ["tournament-os", "home"],
  },
  {
    id: "community-os-club",
    quote:
      "[PLACEHOLDER — real quote from a community/club admin about members showing up more often and retention improving.]",
    name: "TODO — Community admin name",
    role: "Community manager",
    org: "TODO — Club name",
    city: "TODO — City",
    sport: "Pickleball",
    avatarUrl: null,
    source: "TODO(content): Community OS customer",
    isPlaceholder: true,
    tags: ["community-os", "home"],
  },
  {
    id: "run-club-lead",
    quote:
      "[PLACEHOLDER — real quote from a run-club organiser about pace groups, weekly RSVPs and streaks keeping runners coming back.]",
    name: "TODO — Run club lead name",
    role: "Run club organiser",
    org: "TODO — Run club name",
    city: "TODO — City",
    sport: "Running",
    avatarUrl: null,
    source: "TODO(content): Run Club OS customer",
    isPlaceholder: true,
    tags: ["run-club-os", "home"],
  },
];

/**
 * Whether placeholder testimonials should render. True in development, or when
 * SHOW_PLACEHOLDER_TESTIMONIALS=true. Always false in a normal production build.
 */
export function showPlaceholders(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.SHOW_PLACEHOLDER_TESTIMONIALS === "true"
  );
}

/**
 * Testimonials to actually render on a given surface. Placeholders are dropped
 * unless `showPlaceholders()`. Returns [] when there's nothing real yet, so the
 * section can hide itself entirely.
 */
export function getVisibleTestimonials(tag?: string): Testimonial[] {
  const allowPlaceholders = showPlaceholders();
  return TESTIMONIALS.filter((t) => {
    if (t.isPlaceholder && !allowPlaceholders) return false;
    if (tag && t.tags && !t.tags.includes(tag)) return false;
    return true;
  });
}
