import type { CollageItem } from "@/components/Collage";

/**
 * Real RizzFitt photography (the user's own assets, per ASSETS.md). The
 * on-the-ground selfie with a public figure is deliberately excluded from public
 * galleries to avoid implying an endorsement (ASSETS.md §4).
 */

/** Tournament / proof photos — used on tournament + case-study galleries. */
export const EVENT_PHOTOS = {
  nightFinal1: "/photos/proof/night-final-01.jpg",
  nightFinal2: "/photos/proof/night-final-02.jpg",
  badminton: "/photos/proof/badminton-tndoctors.jpg",
  scorecard: "/photos/product/scorecard-before-after.jpg",
} as const;

/** Bangalore RizzFitt Socials mixer photos (PaddleX). */
export const COMMUNITY_PHOTOS: string[] = Array.from(
  { length: 7 },
  (_, i) => `/photos/community/community-${String(i + 1).padStart(2, "0")}.jpg`,
);

/** Looping event clips (muted, web mp4 + poster). */
export const COMMUNITY_CLIPS = [
  { src: "/photos/community/clip-1.mp4", poster: "/photos/community/clip-1.jpg" },
  { src: "/photos/community/clip-2.mp4", poster: "/photos/community/clip-2.jpg" },
] as const;

/** Tournament/case-study gallery items (real photos + branded fillers). */
export function galleryItems(sport: string): CollageItem[] {
  return [
    { src: EVENT_PHOTOS.nightFinal1, sport, alt: "RizzFitt tournament — prize ceremony" },
    { src: EVENT_PHOTOS.badminton, sport, alt: "TN Doctors badminton" },
    { src: EVENT_PHOTOS.scorecard, sport, alt: "RizzFitt live scorecard" },
    { src: EVENT_PHOTOS.nightFinal2, sport, alt: "RizzFitt tournament — winners" },
    { sport },
    { sport },
  ];
}

/** Community / social-mixer gallery items — the real Bangalore mixer photos. */
export function communityGalleryItems(): CollageItem[] {
  return COMMUNITY_PHOTOS.map((src, i) => ({
    src,
    sport: "Pickleball",
    alt: `RizzFitt Socials mixer at PaddleX, Bengaluru (${i + 1})`,
  }));
}
