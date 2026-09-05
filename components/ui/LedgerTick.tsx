"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Signature B — the Ledger tick. Parses a decorated value ("98%", "<2s",
 * "100M+", "2025") and counts ONLY the integer core to its final value in
 * 0.8s; prefixes/suffixes/decimals render immediately and never move.
 * Tabular numerals guarantee zero reflow. One rule for start values:
 * max(0, floor(value * 0.88)) — "a plausible neighbor", identical sitewide.
 * Non-numeric values render as-is. Plays once per element.
 */
export function LedgerTick({
  value,
  className,
  startImmediately = false,
}: {
  value: string;
  className?: string;
  startImmediately?: boolean;
}) {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const target = match ? parseInt(match[2], 10) : 0;
  const from = Math.max(0, Math.floor(target * 0.88));
  const width = match ? match[2].length : 0;
  const pad = (n: number) => String(n).padStart(width, "0");
  const [display, setDisplay] = useState(match ? pad(from) : value);

  useEffect(() => {
    if (!match) return;
    if (reduce) {
      setDisplay(match[2]);
      return;
    }
    if (!inView && !startImmediately) return;
    const controls = animate(from, target, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(pad(Math.round(v))),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, startImmediately]);

  if (!match) {
    return (
      <span ref={ref} className={cn("tnum", className)}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={cn("tnum", className)}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
