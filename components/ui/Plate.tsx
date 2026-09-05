import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Engineering-drawing frame: white surface, hairline border, chart-paper
 * grid inside only, figure caption below. All artwork inside a Plate is
 * single-weight ink line work — no fills, no gradients.
 */
export function Plate({
  children,
  caption,
  className,
  bodyClassName,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "chart-paper relative overflow-hidden rounded-card border border-hairline bg-surface p-8 max-md:p-5",
          bodyClassName
        )}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="pt-3 font-body text-label text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
