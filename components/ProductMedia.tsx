import Image from "next/image";
import { hasAsset } from "@/lib/assets";

interface ProductMediaProps {
  /** Path under /public, e.g. /product/live-scoring.png or /product/demo.mp4. */
  src: string;
  /** Meaningful alt text describing the screenshot/video. Required. */
  alt: string;
  /** Poster image for video (also under /public). */
  poster?: string;
  /** Branded fallback shown when the real asset is missing. */
  fallbackSrc?: string;
  /** Above-the-fold hint — eager-load instead of lazy. */
  priority?: boolean;
  /** Optional caption under the media. */
  caption?: string;
  /** CSS aspect-ratio for the frame (default "16 / 10"). */
  ratio?: string;
  className?: string;
}

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

/**
 * Responsive product screenshot / demo-video slot with a graceful fallback:
 * renders the real asset when it exists in the manifest, otherwise the branded
 * SVG placeholder (so nothing 404s pre-launch). Images lazy-load by default and
 * reserve space via the framed aspect-ratio to avoid layout shift.
 *
 * TODO(content): drop real assets under /public/product/ (see each usage) and
 * they appear automatically on the next build (prebuild regenerates the manifest).
 */
export function ProductMedia({
  src,
  alt,
  poster,
  fallbackSrc = "/hero-fallback.svg",
  priority = false,
  caption,
  ratio = "16 / 10",
  className,
}: ProductMediaProps) {
  const hasReal = hasAsset(src);
  const video = isVideo(src);
  const realPoster = poster && hasAsset(poster) ? poster : undefined;

  return (
    <figure className={className} style={{ margin: 0 }}>
      <div className="product-media" style={{ aspectRatio: ratio }}>
        {hasReal && video ? (
          <video
            controls
            playsInline
            preload="none"
            poster={realPoster ?? fallbackSrc}
            aria-label={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : (
          <Image
            src={hasReal ? src : fallbackSrc}
            alt={alt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            style={{ objectFit: hasReal ? "cover" : "contain" }}
          />
        )}
        {!hasReal ? (
          <span className="product-media__badge" aria-hidden>
            Preview coming soon
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="small muted" style={{ marginTop: "var(--space-3)" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
