import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <As className={cn("container mx-auto", className)}>{children}</As>;
}
