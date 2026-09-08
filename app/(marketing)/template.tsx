import type { ReactNode } from "react";

/**
 * Page transition.
 *
 * Deliberately CSS, not Framer Motion. The previous version branched on
 * useReducedMotion(), which is false during server rendering and true on the
 * client for anyone with reduced motion switched on — so the server sent a
 * wrapper element the client then decided not to render, hydration failed, and
 * React threw away and rebuilt the whole page tree on every load.
 *
 * A keyframe has no such problem: the markup is identical either way, the
 * content is in the HTML at full opacity if CSS never arrives, and the
 * prefers-reduced-motion rule already in globals.css neutralises it for free.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
