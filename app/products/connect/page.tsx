import type { Metadata } from "next";
import { Section, Tag, Hero3DCanvas } from "@/components/primitives";
import { PhoneScene } from "@/components/products/PhoneScene";
import { WaitlistForm } from "@/components/products/WaitlistForm";

export const metadata: Metadata = {
  title: "RizzFitt Connect — coming soon",
  description: "The RizzFitt app — workout buddies, training partners and communities near you — is being rebuilt.",
};

export default function ConnectPage() {
  return (
    <Section mode="os">
      <div className="tos-hero-grid">
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "34rem" }}>
          <Tag>Coming soon</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            Find your people. Find your game.
          </h1>
          <p className="body-l muted">
            The RizzFitt app — workout buddies, training partners and communities
            near you — is being rebuilt. Join the waitlist and we&apos;ll tell you
            the moment it opens in your city.
          </p>
          <div style={{ maxWidth: "28rem" }}>
            <WaitlistForm />
          </div>
        </div>

        <div className="tos-hero-visual">
          <Hero3DCanvas
            fallbackSrc="/hero-fallback.svg"
            fallbackAlt="RizzFitt Connect app preview"
            height="clamp(360px, 50vw, 600px)"
          >
            <PhoneScene />
          </Hero3DCanvas>
        </div>
      </div>
    </Section>
  );
}
