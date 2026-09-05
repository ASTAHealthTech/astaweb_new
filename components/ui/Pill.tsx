import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The card recipe miniaturized. Never colored, no hover lift — inert. */
export function Pill({
  children,
  dark = false,
  small = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-card border font-body transition-colors duration-200",
        small ? "px-2.5 py-1 text-[12px]" : "px-3.5 py-2 text-[14px]",
        dark
          ? "border-panel-hairline bg-panel-surface text-panel-ink hover:border-panel-hairline-strong"
          : "border-hairline bg-surface text-ink hover:border-hairline-strong",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Hairline tabular token for claims that carry proof: "98% CV", "ISO 13485". */
export function EvidenceChip({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-card border px-2 py-1 font-display text-[12px] tnum",
        dark
          ? "border-panel-hairline text-panel-ink-2"
          : "border-hairline text-ink-2",
        className
      )}
    >
      {children}
    </span>
  );
}
