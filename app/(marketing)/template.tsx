"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { springSettle } from "@/lib/motion";

/** Page transition — a re-statement of the numbered-entry signature. */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSettle, delay: 0.02 }}
    >
      {children}
    </motion.div>
  );
}
