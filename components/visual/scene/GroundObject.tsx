"use client";

import { useEffect, useRef } from "react";
import { registerAnchor, type GroundKind } from "@/lib/scene/anchors";
import { cn } from "@/lib/cn";

/**
 * An empty box in the page that a small 3D object fills. Square by default.
 * The object is drawn by GroundStage in the shared canvas behind the page,
 * so this element must sit over a transparent background.
 */
export function GroundObject({ kind, className, label }: { kind: GroundKind; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return registerAnchor(ref.current, kind);
  }, [kind]);
  return (
    <div className={cn("relative", className)} aria-hidden>
      <div ref={ref} className="aspect-square w-full" />
      {label ? <div className="machine mt-2 text-center text-ink-3">{label}</div> : null}
    </div>
  );
}
