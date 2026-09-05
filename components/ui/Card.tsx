import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The ONE card recipe. Fixed anatomy via subcomponents so pages can't
 * improvise: Meta → Title → Body (flex-1) → Footer (mt-auto, hairline-top).
 * Equal heights are mechanical: use inside `grid auto-rows-fr items-stretch`.
 * `featured` (max ONE per page): 2px accent top rule. `dark`: instrument-
 * panel variant — surface-shift hover, no lift, no shadow.
 */
export function Card({
  children,
  dark = false,
  featured = false,
  interactive = true,
  padded = true,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  featured?: boolean;
  interactive?: boolean;
  padded?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "spot-target relative flex h-full flex-col overflow-hidden rounded-card border",
        padded && "p-8 max-md:p-6",
        dark
          ? cn(
              "border-panel-hairline bg-panel-surface",
              interactive && "transition-colors duration-200 hover:border-panel-hairline-strong hover:bg-panel-surface-hover"
            )
          : cn(
              "border-hairline bg-surface",
              interactive &&
                "transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-card-hover"
            ),
        className
      )}
    >
      {featured && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
      )}
      {children}
    </div>
  );
}

export function CardMeta({
  number,
  label,
  dark = false,
  children,
  className,
}: {
  number?: string;
  label?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-3", className)}>
      {number && (
        <span className={cn("font-display text-label tnum", dark ? "text-panel-ink-3" : "text-ink-3")}>
          {number}
        </span>
      )}
      {label && (
        <span className={cn("font-body text-label", dark ? "text-panel-ink-2" : "text-ink-2")}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function CardTitle({
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
    <h3
      className={cn(
        "font-display",
        small ? "text-title-sm" : "text-title",
        dark ? "text-panel-ink" : "text-ink",
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
    <div className={cn("mt-3 flex-1 font-body text-body", dark ? "text-panel-ink-2" : "text-ink-2", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 border-t pt-4", dark ? "border-panel-hairline" : "border-hairline", className)}>
      {children}
    </div>
  );
}

/**
 * The live indicator — ONE per page maximum, always paired with text,
 * reserved for things that are genuinely live. Accent magenta (the brand's
 * sanctioned pulse), never a second color.
 */
export function LiveDot({
  label = "Live",
  dark = false,
  className,
}: {
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-live-ping rounded-full bg-accent" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className={cn("font-body text-label", dark ? "text-panel-ink-2" : "text-ink-2")}>
        {label}
      </span>
    </span>
  );
}
