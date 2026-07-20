/**
 * Case studies. Numbers are illustrative (per ASSETS.md §5) — believable for the
 * named events; swap for confirmed figures later. Each links to its event page
 * where one exists.
 */

export interface CaseStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  sport: string;
  /** One-line summary for cards. */
  summary: string;
  /** Longer "what RizzFitt ran" paragraph for the detail page. */
  detail: string;
  stats: CaseStat[];
  /** Linked event slug, if it exists in events.json. */
  eventSlug?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bengaluru-open-2025",
    title: "Bengaluru Open 2025",
    location: "PaddleX & 11 Point Club",
    sport: "Pickleball",
    summary: "One brief → a two-venue tournament, run live across both.",
    detail:
      "One brief became a two-venue website, registrations, payments, live brackets across both venues, and same-day results — coordinated as a single event.",
    stats: [
      { value: 256, label: "Players" },
      { value: 180, suffix: "+", label: "Matches" },
      { value: 8, label: "Categories" },
      { value: 2, label: "Venues" },
      { value: 3, label: "Days" },
    ],
    eventSlug: "bengaluru-open-2025",
  },
  {
    slug: "indian-pickleball-nationals",
    title: "Indian Pickleball Nationals",
    location: "Karnataka",
    sport: "Pickleball",
    summary: "A national-scale draw run on live scoring, zero paper sheets.",
    detail:
      "A national draw run end to end on RizzFitt — live scoring across every court, automatic re-seeding, and results published as they happened, with zero paper sheets.",
    stats: [
      { value: 600, suffix: "+", label: "Players" },
      { value: 400, suffix: "+", label: "Matches" },
      { value: 4, label: "Days" },
    ],
    eventSlug: "indian-pickleball-nationals",
  },
  {
    slug: "kltr-open-singapore",
    title: "KLTR Open — Singapore",
    location: "Balmoral Lifestyle Club, Singapore",
    sport: "Pickleball",
    summary: "RizzFitt's first international event.",
    detail:
      "RizzFitt's first international event — the same stack that runs an Indian open, taken across the border for a clean one-day tournament.",
    stats: [
      { value: 120, label: "Players" },
      { value: 1, label: "Day" },
      { value: 1, label: "First international" },
    ],
    eventSlug: "kltr-open",
  },
  {
    slug: "wppl-season-1",
    title: "WPPL Season 1",
    location: "VGP Panneer Mahal",
    sport: "Pickleball",
    summary: "A 3-day league with standings updating live.",
    detail:
      "A team league run over three days with standings recalculating live after every match, and brackets that re-seeded themselves into the knockouts.",
    stats: [
      { value: 16, label: "Teams" },
      { value: 96, label: "Players" },
      { value: 60, suffix: "+", label: "Matches" },
      { value: 3, label: "Days" },
    ],
    eventSlug: "wppl-season-1",
  },
  {
    slug: "salem-challenger-league",
    title: "Salem Challenger League",
    location: "Salem",
    sport: "Pickleball",
    summary: "Now in Season III — proof that organisers come back.",
    detail:
      "Three seasons run on RizzFitt and counting. The clearest proof of all: organisers who run one event come back to run the next.",
    stats: [
      { value: 3, label: "Seasons" },
      { value: 1, label: "Returning organiser" },
    ],
    eventSlug: "salem-challenger-pickleball-league-season-iii",
  },
  {
    slug: "tn-doctors-badminton",
    title: "TN Doctors Badminton (TNBDG)",
    location: "Chennai",
    sport: "Badminton",
    summary: "Multi-category badminton, auto-scored finals.",
    detail:
      "Proof RizzFitt isn't pickleball-only: a multi-category badminton championship with auto-scored finals on the same engine.",
    stats: [
      { value: 1, label: "Multi-category" },
      { value: 1, label: "Auto-scored finals" },
    ],
    eventSlug: "tnbdg",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
