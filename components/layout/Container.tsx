import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** One max-width sitewide. `wide` is reserved for the hero instrument. */
export function Container({
  children,
  wide = false,
  className,
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        wide ? "max-w-[1280px]" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  );
}
