"use client";

import { useLayoutEffect } from "react";
import type { Mode } from "@/lib/types";

/**
 * Sets the page-level surface mode on <body> so the sticky nav (which reads
 * `--nav-text` from the nearest `data-mode` ancestor) stays legible on light
 * pages. The app defaults to `os`; mount this on `live` routes. Restores `os`
 * on unmount. Renders nothing.
 */
export function PageMode({ mode }: { mode: Mode }) {
  useLayoutEffect(() => {
    const prev = document.body.dataset.mode ?? "os";
    document.body.dataset.mode = mode;
    return () => {
      document.body.dataset.mode = prev;
    };
  }, [mode]);
  return null;
}
