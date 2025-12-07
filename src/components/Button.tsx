import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href: string;
}

const buttonVariants = {
  primary: `
    bg-gradient-to-br from-blue-600 to-blue-700 
    text-white 
    hover:from-blue-700 hover:to-blue-800 
    hover:shadow-lg hover:shadow-blue-600/25 
    hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
    active:transform active:scale-95
  `,
  secondary: `
    bg-slate-100 text-slate-900 border-2 border-transparent
    hover:bg-slate-200 hover:border-blue-600 hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
    active:transform active:scale-95
    dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600
  `,
};

// Variant classes to use when the button is disabled (no hover effects)
const buttonVariantsNoHover: Record<string, string> = {
  primary: `
    bg-gradient-to-br from-blue-600 to-blue-700
    text-white
    focus:outline-none
  `,
  secondary: `
    bg-slate-100 text-slate-900 border-2 border-transparent
    focus:outline-none
    dark:bg-slate-700 dark:text-white
  `,
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-lg
  transition-all duration-200 ease-in-out
  transform will-change-transform
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
  disabled:active:transform-none disabled:active:scale-100 disabled:active:translate-y-0 disabled:pointer-events-none
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = disabled
      ? buttonVariantsNoHover[variant]
      : buttonVariants[variant];

    return (
      <button
        className={cn(baseStyles, variantClasses, buttonSizes[size], className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <a
        className={cn(
          baseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          "no-underline",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
