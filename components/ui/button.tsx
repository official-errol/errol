import { forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "xs" | "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  title?: string;
  onClick?: () => void;
};

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-primary text-text-inverse hover:bg-text-primary/85 disabled:hover:bg-primary",
  secondary:
    "border border-border bg-surface text-text-primary hover:bg-surface-subtle",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-subtle",
  danger: "bg-error text-text-inverse hover:bg-error/85",
  success: "bg-success text-text-inverse hover:bg-success/85",
};

const SIZE: Record<Size, string> = {
  xs: "px-2.5 py-1 text-xs",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading,
      children,
      className = "",
      disabled,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
        {...rest}
      >
        {loading ? "Working…" : children}
      </button>
    );
  },
);

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  target,
  rel,
  title,
  onClick,
}: LinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      title={title}
      onClick={onClick}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
