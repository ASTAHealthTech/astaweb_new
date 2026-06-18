import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

// ─── Card variants ──────────────────────────────────────────────────────────

/** Light surface premium card */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-line bg-white p-6 shadow-xs",
        "dark:border-line-dark dark:bg-night-panel dark:shadow-glass-sm",
        "transition-all duration-300 ease-premium",
        interactive && "card-premium cursor-default",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Dark glass card — for use on night backgrounds */
export function DarkCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl p-6",
        "glass-2",
        interactive && "cursor-default",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Featured card — larger, editorial, with subtle glow */
export function FeaturedCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-8 md:p-10",
        "glass-3",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

export function CardIcon({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md",
        dark
          ? "bg-white/[0.07] text-cyan-300 ring-1 ring-white/10"
          : "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-h3",
        dark ? "text-frost" : "text-ink",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardBody({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2.5 text-body text-pretty",
        dark ? "text-frost-muted" : "text-ink-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
