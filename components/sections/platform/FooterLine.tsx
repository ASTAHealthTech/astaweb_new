import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section footer sentence: a 24px hairline dash either side of a centered
 * one-line summary. Static — no motion beyond the parent Reveal.
 */
export function FooterLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span aria-hidden className="h-px w-6 shrink-0 bg-hairline-strong" />
      <p className="max-w-measure text-center font-body text-body text-pretty text-ink-2">
        {children}
      </p>
      <span aria-hidden className="h-px w-6 shrink-0 bg-hairline-strong" />
    </div>
  );
}
