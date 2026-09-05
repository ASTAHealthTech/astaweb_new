"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { springSettle, viewportOnce } from "@/lib/motion";

/**
 * The single scroll entrance (signature A). Wraps a section body or card
 * grid: fades up 16px on a settle spring, once. With `stagger`, children
 * rise as one unit with a ≤60ms internal stagger — never per-card triggers.
 */
export function Reveal({
  children,
  stagger = false,
  delay = 0,
  className,
  style,
  id,
}: {
  children: ReactNode;
  stagger?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className} style={style}>
        {children}
      </div>
    );
  }

  if (stagger) {
    return (
      <motion.div
        id={id}
        className={className}
        style={style}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...springSettle, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for a staggered Reveal grid. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: springSettle },
      }}
    >
      {children}
    </motion.div>
  );
}
