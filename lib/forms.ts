/**
 * The reach-out system: one typed form, eleven configurations. Every page that
 * needs a form references a config by id, so validation, success states, and the
 * WhatsApp shortcut behave identically everywhere.
 */

export type FieldType = "text" | "email" | "tel" | "textarea" | "select";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  /** Options for `select` fields. */
  options?: string[];
}

export type FormId =
  | "tournament-demo"
  | "community-demo"
  | "sponsor"
  | "brand-collab"
  | "venue"
  | "creator"
  | "quote"
  | "academy"
  | "general"
  | "careers"
  | "press";

export interface FormConfig {
  id: FormId;
  title: string;
  intro: string;
  fields: FormField[];
  submitLabel: string;
  /** Shown after a successful submit. */
  success: string;
  /** Show the WhatsApp shortcut under the form. */
  whatsapp?: boolean;
}

const NAME: FormField = { name: "name", label: "Your name", type: "text", required: true };
const EMAIL: FormField = { name: "email", label: "Email", type: "email", required: true };
const PHONE: FormField = { name: "phone", label: "Phone / WhatsApp", type: "tel" };
const CITY: FormField = { name: "city", label: "City", type: "text" };

export const FORMS: Record<FormId, FormConfig> = {
  "tournament-demo": {
    id: "tournament-demo",
    title: "Book a Tournament OS demo",
    intro: "See how RizzFitt runs a tournament end to end. Tell us a little and we'll set up a walkthrough — usually within one business day.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "org", label: "Organisation / event", type: "text" },
      { name: "sport", label: "Sport", type: "select", options: ["Pickleball", "Badminton", "Cricket", "Football", "Other"] },
      { name: "message", label: "What are you planning?", type: "textarea", placeholder: "One-day open, multi-city league, ~200 players…" },
    ],
    submitLabel: "Request demo",
    success: "Thanks! We'll be in touch within one business day to set up your walkthrough.",
    whatsapp: true,
  },
  "community-demo": {
    id: "community-demo",
    title: "Book a Community / Run Club demo",
    intro: "Run a club or community? See how members, attendance, events and comms live in one place.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "community", label: "Community / club name", type: "text" },
      { name: "size", label: "Roughly how many members?", type: "text" },
      { name: "message", label: "What do you need help with?", type: "textarea" },
    ],
    submitLabel: "Request demo",
    success: "Thanks! We'll reach out within one business day to show you around.",
    whatsapp: true,
  },
  sponsor: {
    id: "sponsor",
    title: "Sponsor an event",
    intro: "Reach players where they're most engaged. Tell us your goals and we'll come back with packages, cities and reach numbers.",
    fields: [
      NAME,
      EMAIL,
      { name: "brand", label: "Brand / company", type: "text", required: true },
      { name: "budget", label: "Rough budget or scale", type: "select", options: ["Single event", "Multiple events", "A full season / circuit", "Not sure yet"] },
      { name: "message", label: "What are you hoping to achieve?", type: "textarea" },
    ],
    submitLabel: "Talk sponsorship",
    success: "Thanks! Our partnerships team will send packages and options shortly.",
    whatsapp: true,
  },
  "brand-collab": {
    id: "brand-collab",
    title: "Brand collaboration & gifting",
    intro: "Gift products, host a station, or co-create a mixer with a community that actually tries what you bring.",
    fields: [
      NAME,
      EMAIL,
      { name: "brand", label: "Brand / company", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Nutrition", "F&B", "Gear", "Wellness", "Lifestyle", "Other"] },
      { name: "idea", label: "What did you have in mind?", type: "textarea", placeholder: "Gift a product, host a smoothie bar, co-host a morning…" },
    ],
    submitLabel: "Collaborate or gift",
    success: "Thanks! We'll be in touch about co-creating the next mixer.",
    whatsapp: true,
  },
  venue: {
    id: "venue",
    title: "Become a venue partner",
    intro: "Have courts? Fill them. We bring organised tournaments and recurring mixers to partner venues, with the operations handled.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "venue", label: "Venue name", type: "text", required: true },
      CITY,
      { name: "courts", label: "Number / type of courts", type: "text" },
    ],
    submitLabel: "Partner your venue",
    success: "Thanks! We'll reach out to explore bringing events to your venue.",
    whatsapp: true,
  },
  creator: {
    id: "creator",
    title: "Creator & influencer collaboration",
    intro: "Play, cover, or co-host. If your audience cares about sport, fitness, food or city life, let's create something around an event.",
    fields: [
      NAME,
      EMAIL,
      { name: "handle", label: "Instagram / YouTube handle", type: "text", required: true },
      CITY,
      { name: "idea", label: "How would you like to be involved?", type: "textarea" },
    ],
    submitLabel: "Let's collaborate",
    success: "Thanks! We'll be in touch about the next event near you.",
    whatsapp: true,
  },
  quote: {
    id: "quote",
    title: "List your tournament",
    intro: "Get the full RizzFitt stack behind your event — website, registrations, payments, scoring and comms. Tell us about it for a quote.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "event", label: "Event name", type: "text", required: true },
      CITY,
      { name: "sport", label: "Sport", type: "select", options: ["Pickleball", "Badminton", "Cricket", "Football", "Other"] },
      { name: "dates", label: "Dates (rough is fine)", type: "text" },
      { name: "scale", label: "Expected players / format", type: "textarea" },
    ],
    submitLabel: "Get a quote",
    success: "Thanks! We'll send a quote and next steps within one business day.",
    whatsapp: true,
  },
  academy: {
    id: "academy",
    title: "Partner as an academy or club",
    intro: "Run your own events on RizzFitt, cross-promote to our community, or co-host a circuit.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "org", label: "Academy / club name", type: "text", required: true },
      CITY,
      { name: "message", label: "How would you like to partner?", type: "textarea" },
    ],
    submitLabel: "Partner with us",
    success: "Thanks! We'll reach out to explore working together.",
    whatsapp: true,
  },
  general: {
    id: "general",
    title: "General enquiry",
    intro: "Not sure where you fit? Ask us anything — we'll route you to the right person.",
    fields: [NAME, EMAIL, { name: "message", label: "How can we help?", type: "textarea", required: true }],
    submitLabel: "Send message",
    success: "Thanks! We'll get back to you within one business day.",
    whatsapp: true,
  },
  careers: {
    id: "careers",
    title: "Join the team",
    intro: "We're a small team building the operating system for sports in India. Tell us about you — even if there's no perfect-fit role.",
    fields: [
      NAME,
      EMAIL,
      { name: "role", label: "Role you're interested in", type: "text" },
      { name: "links", label: "Portfolio / LinkedIn / GitHub", type: "text" },
      { name: "message", label: "Why RizzFitt?", type: "textarea" },
    ],
    submitLabel: "Apply / express interest",
    success: "Thanks for reaching out — we read every message and will be in touch.",
  },
  press: {
    id: "press",
    title: "Press & media",
    intro: "For interviews, data, assets or quotes, tell us what you're working on and your deadline.",
    fields: [
      NAME,
      EMAIL,
      { name: "outlet", label: "Outlet / publication", type: "text", required: true },
      { name: "deadline", label: "Deadline", type: "text" },
      { name: "message", label: "What do you need?", type: "textarea", required: true },
    ],
    submitLabel: "Send press request",
    success: "Thanks! Our team will respond as quickly as we can.",
  },
};

export function getForm(id: FormId): FormConfig {
  return FORMS[id];
}
