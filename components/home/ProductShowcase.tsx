import { Section, Tag } from "@/components/primitives";
import { ProductMedia } from "@/components/ProductMedia";

/**
 * Homepage "see the actual product" band. Sits just under the hero so the first
 * thing visitors see after the pitch is the software itself. Uses a demo video
 * when available, falling back to the branded placeholder pre-launch.
 *
 * TODO(content): provide /public/product/demo.mp4 + /public/product/demo-poster.jpg
 * (a 20–40s screen recording of a tournament running end to end).
 */
export function ProductShowcase() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
        <Tag>See it in action</Tag>
        <h2 className="h1" style={{ margin: 0 }}>
          This is the software, not a mockup.
        </h2>
        <p className="body-l muted">
          Registrations, brackets, live scoring and comms — running end to end on
          real events. Watch a tournament come together in under a minute.
        </p>
      </div>
      <ProductMedia
        src="/product/demo.mp4"
        poster="/product/demo-poster.jpg"
        alt="RizzFitt Tournament OS demo — registrations, live bracket and scoreboard running end to end"
        caption="A tournament running end to end on RizzFitt Tournament OS."
      />
    </Section>
  );
}
