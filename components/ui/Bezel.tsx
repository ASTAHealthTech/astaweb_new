import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { LiveDot } from "./Card";

/**
 * The dark screen well — frames everything screen-like (walkthrough video,
 * dashboard sims, audit logs) so mockups read as one product family.
 * Chrome strip: neutral status dot + label left, timestamp right, in
 * diegetic 12px lowercase mono (mono is legal ONLY inside a Bezel).
 */
export function Bezel({
  label,
  timestamp,
  live = false,
  children,
  caption,
  className,
}: {
  label: string;
  timestamp?: string;
  live?: boolean;
  children: ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-card border border-panel-hairline bg-panel shadow-[inset_0_1px_0_rgba(242,241,237,0.06)]">
        <div className="flex h-10 items-center justify-between border-b border-panel-hairline px-4">
          <span className="flex items-center gap-2.5">
            {live ? (
              <LiveDot label="" dark className="-mr-1" />
            ) : (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-panel-ink-3" />
            )}
            <MachineLine>{label}</MachineLine>
          </span>
          {timestamp && <MachineLine>{timestamp}</MachineLine>}
        </div>
        <div className="bg-panel">{children}</div>
      </div>
      {caption && (
        <figcaption className="pt-3 font-body text-label text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Machine output line — the only place monospace exists. */
export function MachineLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-machine text-machine lowercase text-panel-ink-2", className)}>
      {children}
    </span>
  );
}
