/** Shared contact details + social links. Swap in real values before launch. */
export const CONTACT = {
  email: "hello@rizzfitt.com",
  partnersEmail: "partners@rizzfitt.com",
  pressEmail: "press@rizzfitt.com",
  whatsappNumber: "+91 00000 00000",
  whatsappUrl: "https://wa.me/910000000000",
  instagram: "https://instagram.com/rizzfitt",
  linkedin: "https://linkedin.com/company/rizzfitt",
  location: "Based in India · operating across 15+ cities",
} as const;

/** Build a WhatsApp deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
