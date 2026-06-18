import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/**
 * Lightweight load-in reveal used across sections.
 * Keeps the wrapper server-renderable and avoids client animation overhead.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  style,
  ...rest
}: Props) {
  return (
    <div
      className={cn("reveal", className)}
      style={{
        ...style,
        ["--reveal-delay" as string]: `${delay}s`,
        ["--reveal-distance" as string]: `${y}px`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
