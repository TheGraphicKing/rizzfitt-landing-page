/** Shared contact details + social links. Single source of truth for every
 *  contact CTA, footer, and the WhatsApp deep links across the site. */
export const CONTACT = {
  email: "hello@rizzfitt.com",
  partnersEmail: "partners@rizzfitt.com",
  pressEmail: "press@rizzfitt.com",
  /** Human-readable phone, for display. */
  phone: "+91 78450 45444",
  /** `tel:` href form — no spaces, leading +. */
  phoneTel: "tel:+917845045444",
  /** Human-readable WhatsApp number, for display. */
  whatsappNumber: "+91 78450 45444",
  /** Base WhatsApp deep link (no message). */
  whatsappUrl: "https://wa.me/917845045444",
  instagram: "https://instagram.com/rizzfitt",
  linkedin: "https://linkedin.com/company/rizzfitt",
  location: "Based in India · events across 10 cities",
} as const;

/** Build a WhatsApp deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
