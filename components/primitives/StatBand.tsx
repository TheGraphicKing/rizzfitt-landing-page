import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { Reveal, RevealItem } from "./Reveal";

export interface Stat {
  /** The number to count to, e.g. 45. */
  value: number;
  label: string;
  prefix?: string;
  /** e.g. "+", "K", "%". */
  suffix?: string;
  decimals?: number;
}

interface StatBandProps {
  stats: Stat[];
  className?: string;
}

/**
 * Four-up band of count-up metrics (collapses 4 → 2 → 1 with the grid). Each
 * number is the hero: large mono, accent-colored, with a small-caps label
 * beneath. Animates up on scroll and staggers across the row. Reduced-motion
 * safe via `<CountUp>` and `<Reveal>`.
 */
export function StatBand({ stats, className }: StatBandProps) {
  return (
    <Reveal as="div" className={cn("stat-band", className)} stagger={0.08}>
      {stats.map((s) => (
        <RevealItem as="div" className="stat" key={s.label}>
          <div className="num">
            <CountUp
              to={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals}
            />
          </div>
          <div className="label">{s.label}</div>
        </RevealItem>
      ))}
    </Reveal>
  );
}
