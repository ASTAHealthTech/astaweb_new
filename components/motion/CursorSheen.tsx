"use client";

import { useEffect } from "react";

/**
 * Mounted once per page: delegated pointer tracking so every .spot-target
 * glass surface catches the light under the cursor (painted in CSS via
 * --spot-x/--spot-y). No per-card client components.
 */
export function CursorSheen() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(".spot-target") as
        | HTMLElement
        | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      t.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
