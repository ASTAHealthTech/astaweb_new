import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

/**
 * The complete interactive vocabulary: a magenta-filled pill and a
 * hairline-outline pill. Sentence case, arrow shifts 4px on hover.
 * No ghosts, no icons buttons, no gradients, no uppercase.
 */
type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  dark?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type AsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    size = "md",
    arrow = true,
    dark = false,
    className,
    children,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const classes = cn(
    "group inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-pill font-body font-medium transition-colors duration-200 active:translate-y-px",
    size === "md" ? "h-12 px-7 text-[15px]" : "h-10 px-5 text-[14px]",
    variant === "primary"
      ? "bg-brand-gradient text-accent-ink shadow-glow-brand [background-size:170%_170%] [background-position:0%_50%] hover:[background-position:85%_50%] transition-[background-position,box-shadow] duration-500 hover:shadow-[0_0_60px_rgba(222,37,136,0.5)]"
      : dark
        ? "border border-panel-hairline bg-transparent text-panel-ink hover:border-panel-hairline-strong hover:bg-panel-surface"
        : "border border-hairline bg-transparent text-ink hover:border-hairline-strong hover:bg-surface",
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href } = props as AsLink;
    const linkRest = rest as Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {inner}
      </Link>
    );
  }
  const btnRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button className={classes} {...btnRest}>
      {inner}
    </button>
  );
}

/** The only sanctioned text link: ink with a magenta underline on hover. */
export function TextLink({
  href,
  children,
  external = false,
  dark = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center gap-1.5 font-body text-body underline-offset-4 decoration-accent decoration-2 hover:underline",
    dark ? "text-panel-ink" : "text-ink",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
