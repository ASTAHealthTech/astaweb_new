import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Align = "left" | "center";
type Surface = "light" | "dark";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  surface = "light",
  className,
  maxWidth = "max-w-3xl",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: Align;
  surface?: Surface;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={cn(
        maxWidth,
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow
            tone={surface === "dark" ? "dark" : "light"}
            className={cn(align === "center" && "justify-center")}
          >
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 text-h2 md:text-h2-lg text-balance",
            surface === "dark"
              ? "text-ink dark:text-frost"
              : "text-ink dark:text-frost"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-body-lg text-pretty",
              surface === "dark"
                ? "text-ink-muted dark:text-frost-muted"
                : "text-ink-muted dark:text-frost-muted"
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
