import Image from "next/image";
import { Section, Tag } from "@/components/primitives";
import { hasAsset } from "@/lib/assets";

type Integration = { name: string; note: string; logo: string };

/*
 * "Works with" credibility strip. Logos render only when the real asset exists
 * (else a clean text pill) — we never hotlink or fake a logo.
 *
 * TODO(content):
 *   - Add /public/brand/dupr.svg and /public/brand/razorpay.svg (official logos,
 *     used per each brand's guidelines).
 *   - VERIFY the DUPR relationship. The copy below says "DUPR-friendly — results
 *     exportable", NOT "integrated". If there is a real DUPR integration, tell me
 *     and I'll upgrade the wording; otherwise keep it as-is.
 */
const INTEGRATIONS: Integration[] = [
  {
    name: "DUPR",
    note: "DUPR-friendly — match results are exportable for the global pickleball rating.",
    logo: "/brand/dupr.svg",
  },
  {
    name: "Razorpay",
    note: "Payments on the Indian rail — UPI, cards & net-banking via Razorpay.",
    logo: "/brand/razorpay.svg",
  },
];

export function IntegrationsStrip({
  mode = "os",
  heading = "Works with the tools your sport already uses.",
}: {
  mode?: "os" | "live";
  heading?: string;
}) {
  return (
    <Section mode={mode}>
      <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)", maxWidth: "48rem" }}>
        <Tag>Integrations</Tag>
        <h2 className="h2" style={{ margin: 0 }}>
          {heading}
        </h2>
      </div>
      <div className="integrations-grid">
        {INTEGRATIONS.map((it) => (
          <div className="integration-card" key={it.name}>
            {hasAsset(it.logo) ? (
              <Image src={it.logo} alt={`${it.name} logo`} width={120} height={32} style={{ height: 28, width: "auto" }} />
            ) : (
              <span className="integration-name data" aria-label={it.name}>
                {it.name}
              </span>
            )}
            <p className="small muted" style={{ margin: 0 }}>
              {it.note}
            </p>
          </div>
        ))}
      </div>
      <p className="small muted" style={{ marginTop: "var(--space-4)" }}>
        DUPR is a trademark of its owner and used here for reference only.
      </p>
    </Section>
  );
}
