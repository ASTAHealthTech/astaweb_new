import Link from "next/link";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant =
  | "primary"
  | "secondary"
  | "outline-white"
  | "ghost"
  | "ghost-white"
  | "glow"
  | "dark-solid";

type Size = "sm" | "md" | "lg" | "xl";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  trailingIcon?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type AsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;
type Props = AsLink | AsButton;

const base =
  "inline-flex items-center justify-center gap-2 font-medium leading-none select-none whitespace-nowrap " +
  "transition-all duration-200 ease-premium " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 " +
  "disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-offset-white dark:focus-visible:ring-offset-night-deep",

  secondary:
    "border border-line bg-white text-ink hover:border-brand-200 hover:shadow-sm dark:border-line-dark dark:bg-white/[0.05] dark:text-frost dark:hover:border-line-dark-md dark:hover:bg-white/[0.08]",

  "outline-white":
    "border border-line bg-white/70 text-ink hover:border-brand-200 hover:bg-white dark:border-line-dark dark:bg-transparent dark:text-frost dark:hover:border-line-dark-md dark:hover:bg-white/5",

  ghost:
    "bg-transparent text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-frost-muted dark:hover:bg-white/[0.06] dark:hover:text-frost",

  "ghost-white":
    "bg-transparent text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-frost-muted dark:hover:bg-white/[0.06] dark:hover:text-frost",

  glow:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-glow-brand hover:shadow-[0_0_80px_12px_rgba(79,107,255,0.4)]",

  "dark-solid":
    "border border-ink/10 bg-ink text-white hover:bg-ink/90 dark:border-line-dark dark:bg-night-mid dark:text-frost dark:hover:border-line-dark-md",
};

const sizes: Record<Size, string> = {
  sm: "h-8  px-4  text-[0.8125rem] rounded-md",
  md: "h-10 px-5  text-[0.9rem]    rounded-lg",
  lg: "h-12 px-6  text-[0.975rem]  rounded-lg",
  xl: "h-14 px-8  text-[1.0625rem] rounded-xl",
};

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  function Button(
    { variant = "primary", size = "md", trailingIcon, className, children, ...props },
    ref
  ) {
    const classes = cn(base, variants[variant], sizes[size], className);
    const inner = (
      <>
        <span>{children}</span>
        {trailingIcon && (
          <Icon
            name="arrow-right"
            className="h-[15px] w-[15px] transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
          />
        )}
      </>
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as AsLink;
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cn(classes, "group")} {...rest}>
          {inner}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={cn(classes, "group")} {...(props as AsButton)}>
        {inner}
      </button>
    );
  }
);
