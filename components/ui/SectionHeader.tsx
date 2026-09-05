"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ruleEase, springSettle, viewportOnce } from "@/lib/motion";
import { LedgerTick } from "./LedgerTick";

/**
 * The protocol-numbering block — every section on every page opens with it.
 * Carries signature animation A (drawn rule & numbered entry): the dash
 * draws, the number ticks 00→NN, the headline rises. One trigger at 30%.
 */
export function SectionHeader({
  number,
  label,
  headline,
  lede,
  dark = false,
  center = false,
  id,
  headlineMax = "max-w-[24ch]",
  as: Tag = "h2",
}: {
  number: string;
  label: string;
  headline: string;
  lede?: string;
  dark?: boolean;
  center?: boolean;
  id?: string;
  headlineMax?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();

  const eyebrow = (
    <div className={cn("flex items-center gap-3", center && "justify-center")}>
      <motion.span
        aria-hidden
        className={cn("block h-px w-6 origin-left", dark ? "bg-panel-hairline-strong" : "bg-hairline-strong")}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: ruleEase }}
      />
      <span className={cn("font-display text-label tnum", dark ? "text-panel-ink-3" : "text-ink-3")}>
        <LedgerTick value={number} />
      </span>
      <span className={cn("font-body text-label", dark ? "text-panel-ink-2" : "text-ink-2")}>
        {label}
      </span>
    </div>
  );

  return (
    <div id={id} className={cn(center && "text-center")}>
      {eyebrow}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ ...springSettle, delay: 0.1 }}
      >
        {Tag === "h1" ? (
          <h1
            className={cn(
              "mt-5 font-display text-display-1 text-balance",
              dark ? "text-panel-ink" : "text-ink",
              headlineMax,
              center && "mx-auto"
            )}
          >
            {headline}
          </h1>
        ) : (
          <h2
            className={cn(
              "mt-5 font-display text-display-2 text-balance",
              dark ? "text-panel-ink" : "text-ink",
              headlineMax,
              center && "mx-auto"
            )}
          >
            {headline}
          </h2>
        )}
        {lede && (
          <p
            className={cn(
              "mt-5 max-w-measure font-body text-body-lg text-pretty",
              dark ? "text-panel-ink-2" : "text-ink-2",
              center && "mx-auto"
            )}
          >
            {lede}
          </p>
        )}
      </motion.div>
    </div>
  );
}

/** Optional closing rule: "End of section 04" — static, used sparingly. */
export function SectionEnd({
  number,
  label = "End of section",
  dark = false,
}: {
  number?: string;
  label?: string;
  dark?: boolean;
}) {
  return (
    <div className="mt-16">
      <div className={cn("h-px w-full", dark ? "bg-panel-hairline" : "bg-hairline")} />
      <div className={cn("mt-2 text-right font-body text-label", dark ? "text-panel-ink-3" : "text-ink-3")}>
        {label}
        {number ? ` ${number}` : ""}
      </div>
    </div>
  );
}
