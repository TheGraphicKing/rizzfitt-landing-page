/**
 * Rich, per-event editorial content for event pages. Only events that have a
 * worked-out narrative live here (the rest derive their module content from the
 * event record + sensible defaults). Keyed by slug.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface EventContent {
  hero?: {
    eyebrow: string;
    headline: string;
    sub: string;
    chips: string[];
    motif?: string;
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  timeline?: { title: string; steps: { time: string; label: string }[] };
  valueGrid?: { title: string; items: { title: string; line: string }[] };
  partners?: {
    venue: { name: string; note: string };
    fnb: { name: string; note: string };
    food: string[];
  };
  collage?: { caption: string; food: string[] };
  register?: { steps: string[] };
  faq?: FaqItem[];
  collab?: { eyebrow: string; headline: string; body: string; cta: { label: string; href: string } };
  closing?: { text: string; cta: { label: string; href: string } };
}

const CONTENT: Record<string, EventContent> = {
  "the-morning-community": {
    hero: {
      eyebrow: "June 13, 2026 · PaddleX, Bellandur · Morning session",
      headline: "Pickleball, but make it social.",
      sub: "Rotating pods, rally quests, a healthy breakfast buffet, and a Bangalore crowd that actually wants to meet.",
      chips: ["Beginner friendly", "PaddleX courts", "Breakfast buffet", "Monthly community"],
      motif: "87% match energy",
      primary: { label: "Reserve your spot", href: "#register" },
      secondary: { label: "See the community", href: "#collage" },
    },
    timeline: {
      title: "The social game loop",
      steps: [
        { time: "7:00", label: "Get your alias" },
        { time: "7:15–9:00", label: "Rotate courts" },
        { time: "9:00", label: "Breakfast buffet" },
      ],
    },
    valueGrid: {
      title: "Not just a mixer",
      items: [
        { title: "Curated pods", line: "Small groups matched by vibe and level — you always have people to play with." },
        { title: "Beginner-safe", line: "New to the game? You'll be paired so your first rally feels great." },
        { title: "Prompt cards", line: "Little conversation starters so meeting people isn't awkward." },
        { title: "Breakfast buffet", line: "A proper healthy spread to refuel and hang around for." },
        { title: "Monthly ritual", line: "A morning you can count on — same crew, new faces, every month." },
        { title: "Bangalore mix", line: "A genuinely diverse crowd that actually wants to meet." },
      ],
    },
    partners: {
      venue: { name: "PaddleX", note: "The Pickleball Club, Bellandur" },
      fnb: { name: "Sunkissed", note: "Healthy breakfast buffet" },
      food: ["Acai bowls", "Cold-pressed juice", "Egg white wraps", "Fresh fruit", "Filter coffee", "Protein smoothies"],
    },
    collage: {
      caption: "Last month's morning, in pictures.",
      food: ["Acai bowls", "Cold-pressed juice", "Egg white wraps", "Fresh fruit", "Filter coffee", "Protein smoothies"],
    },
    register: {
      steps: ["Reserve your spot", "Pay securely via Razorpay", "Get your match-morning details"],
    },
    faq: [
      { q: "Do I need experience?", a: "Not at all. Pods are matched by level, so you'll always have a fair, fun game." },
      { q: "What's included?", a: "Court time, rotating play, prompt cards, and the full breakfast buffet." },
      { q: "Is it beginner friendly?", a: "Yes — we deliberately pair first-timers so your opening rally feels great." },
      { q: "Who attends?", a: "A genuinely mixed Bangalore crowd — all ages and backgrounds, there to meet people." },
      { q: "Is breakfast really included?", a: "It is. A healthy spread by Sunkissed, with plenty of reasons to stick around." },
      { q: "Is this recurring?", a: "Monthly. Come once and it becomes the morning you protect on your calendar." },
      { q: "Will there be photos and videos?", a: "Yes — we capture the morning. Tell us on the day if you'd rather not be featured." },
    ],
    collab: {
      eyebrow: "Want in on the next one?",
      headline: "Co-create the next mixer.",
      body: "Brands, cafés and creators: we love co-creating mixers. Gift a product, host a corner, or co-host the morning.",
      cta: { label: "Collaborate on a mixer", href: "/contact" },
    },
    closing: {
      text: "Your Saturday could become a story you keep retelling.",
      cta: { label: "Reserve", href: "#register" },
    },
  },
};

export function getEventContent(slug: string): EventContent | undefined {
  return CONTENT[slug];
}
