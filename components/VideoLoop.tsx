"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type Clip = { src: string; poster: string };

/**
 * Muted, autoplaying, looping event clips. Respects prefers-reduced-motion:
 * reduced-motion users get a paused poster with a tap-to-play control instead
 * of movement. Videos only start once scrolled into view (saves bandwidth).
 */
export function VideoLoop({ clips, label }: { clips: readonly Clip[]; label?: string }) {
  return (
    <div className="stack" style={{ gap: "var(--space-4)" }}>
      {label ? (
        <span className="data small muted" style={{ letterSpacing: "0.04em" }}>
          {label}
        </span>
      ) : null}
      <div className="video-loop-grid">
        {clips.map((c) => (
          <Clip key={c.src} clip={c} />
        ))}
      </div>
    </div>
  );
}

function Clip({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const manualPlay = () => {
    const el = ref.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div className="video-loop-tile">
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="RizzFitt Socials mixer clip"
      />
      {reduced && !playing ? (
        <button className="video-loop-play" onClick={manualPlay} aria-label="Play clip">
          <Play size={22} />
        </button>
      ) : null}
    </div>
  );
}
