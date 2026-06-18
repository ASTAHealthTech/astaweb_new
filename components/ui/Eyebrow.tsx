import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "light" | "dark" | "gradient";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-eyebrow uppercase tracking-widest",
        tone === "light" && "text-brand-600 dark:text-cyan-300/85",
        tone === "dark" && "text-brand-700 dark:text-cyan-400/80",
        tone === "gradient" && "text-ink-subtle dark:text-frost-subtle",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-5 flex-none",
          tone === "light" && "bg-brand-400 dark:bg-cyan-300/55",
          tone === "dark" && "bg-brand-500/60 dark:bg-cyan-400/50",
          tone === "gradient" && "bg-ink-subtle dark:bg-frost-subtle"
        )}
        aria-hidden
      />
      {children}
    </div>
  );
}
