"use client";

import { useState } from "react";
import { Trophy, RotateCcw } from "lucide-react";

const SEMIS: [string, string][] = [
  ["Aravind / Meera", "Surya / Diya"],
  ["Kiran / Nila", "Rohan / Sara"],
];

/**
 * A playable single-elimination bracket. Click a pair to advance them; pick both
 * finalists and crown a champion. Conveys "we run the whole tournament, live."
 * Pointer-driven and keyboard-operable (each slot is a button). No autonomous
 * motion, so it's reduced-motion safe.
 */
export function InteractiveBracket() {
  const [semi, setSemi] = useState<(string | null)[]>([null, null]);
  const [champ, setChamp] = useState<string | null>(null);

  const pickSemi = (i: number, name: string) => {
    setSemi((s) => {
      const next = [...s];
      next[i] = name;
      return next;
    });
    setChamp(null);
  };
  const reset = () => {
    setSemi([null, null]);
    setChamp(null);
  };
  const finalReady = semi[0] && semi[1];

  return (
    <div className="ib">
      <div className="ib-head">
        <span className="eyebrow">Try it · tap to advance</span>
        <button type="button" className="ib-reset small" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
      <div className="ib-grid">
        {/* Round 1 */}
        <div className="ib-col">
          {SEMIS.map((pair, i) => (
            <div className="ib-match" key={i}>
              {pair.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`ib-slot${semi[i] === p ? " ib-slot--win" : ""}`}
                  aria-pressed={semi[i] === p}
                  onClick={() => pickSemi(i, p)}
                >
                  {p}
                </button>
              ))}
            </div>
          ))}
        </div>
        {/* Final */}
        <div className="ib-col ib-col--final">
          <div className="ib-match">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                className={`ib-slot${champ && champ === semi[i] ? " ib-slot--win" : ""}`}
                disabled={!semi[i]}
                aria-pressed={champ === semi[i]}
                onClick={() => semi[i] && setChamp(semi[i])}
              >
                {semi[i] ?? "—"}
              </button>
            ))}
          </div>
        </div>
        {/* Champion */}
        <div className="ib-col ib-col--champ">
          <div className={`ib-champ${champ ? " ib-champ--set" : ""}`}>
            <Trophy size={18} />
            <span className="data">{champ ?? (finalReady ? "Pick a winner" : "Champion")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
