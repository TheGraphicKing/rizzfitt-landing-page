/**
 * Master FAQ — grouped. Powers the dedicated /faq page and the per-page
 * mini-FAQs (which pull one or more groups). Each group ends with a relevant CTA.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export type FaqGroupId = "general" | "tournament-os" | "community-os" | "events" | "partners";

export interface FaqGroup {
  id: FaqGroupId;
  title: string;
  items: FaqItem[];
  cta: { label: string; href: string };
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "general",
    title: "General",
    cta: { label: "Book a demo", href: "/book-a-demo" },
    items: [
      { q: "What is RizzFitt?", a: "RizzFitt is the operating system for sports communities and events — software that runs tournaments, leagues, clubs and mixers end to end, from registrations and payments to live scoring and communication." },
      { q: "Which sports and cities do you cover?", a: "We've run events across pickleball, badminton, cricket and football, in 10 cities from Chennai to Singapore — and we're adding more. Tell us where you are." },
      { q: "Is this software or a service?", a: "Both — software you can run yourself, with our team behind it when you'd rather have the event handled for you." },
    ],
  },
  {
    id: "tournament-os",
    title: "Tournament OS",
    cta: { label: "Book a demo", href: "/book-a-demo" },
    items: [
      { q: "How quickly can we actually go live?", a: "Same day for the site and registrations; full automation within 24–48 hours of your brief." },
      { q: "Can players register as teams?", a: "Yes — individual and team modes, with category selection and automatic waitlists." },
      { q: "How do payments and refunds work?", a: "Collected via Razorpay (UPI/cards). You set refund and cancellation rules; invoices are automatic." },
      { q: "Does live scoring work for badminton, cricket and football too?", a: "Yes. Pickleball is our deepest vertical, but the scoring and bracket engine supports multiple racket and team sports." },
      { q: "Can we use our own domain and branding?", a: "Yes — your logo, colours and domain on Pro and above." },
      { q: "What happens to our data after the event?", a: "It's yours. You get a full export and a post-event report; we never share organiser data." },
      { q: "What does it cost?", a: "Pay per event, or run a season on a plan. Every tier includes the website, registrations, payments, brackets, live scoring and comms." },
    ],
  },
  {
    id: "community-os",
    title: "Community & Run Club OS",
    cta: { label: "Book a demo", href: "/book-a-demo" },
    items: [
      { q: "Can I run paid memberships and free events together?", a: "Yes — mix paid and free, recurring and one-off, in the same community." },
      { q: "Does it work over WhatsApp?", a: "Yes — announcements, reminders and confirmations go out over WhatsApp, email and SMS." },
      { q: "Can I manage multiple communities from one account?", a: "Yes — run several communities or clubs from a single dashboard." },
      { q: "Can members self-register?", a: "Yes — members register themselves, pick categories and RSVP for specific events." },
    ],
  },
  {
    id: "events",
    title: "Events & mixers",
    cta: { label: "Reserve a spot", href: "/events" },
    items: [
      { q: "How do I register?", a: "Pick your spot or category and pay securely via Razorpay — you get instant confirmation." },
      { q: "What's the refund policy?", a: "Refund and cancellation rules are set per event; reach out and we'll help." },
      { q: "Are mixers beginner-friendly?", a: "Very — pods are matched by level and we deliberately pair first-timers so your first rally feels great." },
      { q: "Who attends?", a: "A genuinely mixed, high-intent crowd — all levels, there to play and to meet people." },
      { q: "Are they recurring?", a: "Our social mixers run monthly; come once and it becomes a morning you protect on your calendar." },
    ],
  },
  {
    id: "partners",
    title: "Partners",
    cta: { label: "Partner with us", href: "/partner-with-us" },
    items: [
      { q: "What sponsorship packages exist?", a: "Tiered packages from single events to full seasons, each with a branded deck and real reach numbers." },
      { q: "Can we gift products at mixers?", a: "Yes — sample your product to every attendee, host a station, or co-create the morning." },
      { q: "Do you offer exclusive category sponsorships?", a: "Yes — category exclusivity is available on larger packages." },
      { q: "How are results reported?", a: "You get a post-event report with audience, reach and performance numbers." },
      { q: "How do we become a venue partner?", a: "Tell us about your courts — we bring organised tournaments and recurring mixers, with the operations handled." },
    ],
  },
];

export function getFaqGroup(id: FaqGroupId): FaqGroup | undefined {
  return FAQ_GROUPS.find((g) => g.id === id);
}
