"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ruleEase, viewportOnce } from "@/lib/motion";

/**
 * A1's drawn-rule clause applied to a standalone hairline: scaleX 0→1 on
 * viewport entry, once. Caller supplies height + background classes
 * (e.g. "h-px bg-hairline") plus any positioning.
 */
export function DrawnRule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("block origin-left", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay, ease: ruleEase }}
    />
  );
}
