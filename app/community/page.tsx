import { redirect } from "next/navigation";

/**
 * The community/social side now lives at /mixers (a first-class player-facing
 * section, not a spin-off). Preserve any old links/bookmarks by redirecting.
 */
export default function CommunityPage() {
  redirect("/mixers");
}
