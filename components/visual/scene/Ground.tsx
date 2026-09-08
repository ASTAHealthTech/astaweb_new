"use client";

import { useRef } from "react";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * The lower page. Claims the fixed "ground" framing so the stars keep
 * drifting behind the text and GroundStage can place its small objects.
 */
export function Ground({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useSceneShot(ref, "ground", { start: "top 80%", end: "bottom top" });
  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}
