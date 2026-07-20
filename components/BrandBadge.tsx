import Image from "next/image";
import { cn } from "@/lib/cn";

/** Two-letter monogram from a name (decorative mark, not exact). */
function monogram(name: string): string {
  const words = name.replace(/[—–\-|]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    const w = words[0];
    const caps = w.replace(/[^A-Z0-9]/g, "");
    return (caps.length >= 2 ? caps.slice(0, 2) : w.slice(0, 2)).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Stable 0/1 from a string, so a name always gets the same mark variant. */
function variant(name: string): 0 | 1 {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return (Math.abs(h) % 2) as 0 | 1;
}

interface BrandBadgeProps {
  name: string;
  /**
   * Optional real logo (drop a file at /public/brand/logos/<x>.svg|png and pass
   * the path). When set, it renders instead of the designed monogram lockup.
   */
  src?: string;
  className?: string;
}

/**
 * Designed logo-style lockup: a monogram mark tile + the name as a wordmark —
 * so partner/event walls read like real logos, not plain text. Token-driven, so
 * it works on both surface modes. Drop in a real logo via `src` to override.
 */
export function BrandBadge({ name, src, className }: BrandBadgeProps) {
  return (
    <span className={cn("brand-badge", className)}>
      {src ? (
        <Image src={src} alt={name} width={120} height={28} className="brand-img" />
      ) : (
        <>
          <span className={cn("brand-mark", variant(name) === 1 && "brand-mark--alt")} aria-hidden>
            {monogram(name)}
          </span>
          <span className="brand-name">{name}</span>
        </>
      )}
    </span>
  );
}
