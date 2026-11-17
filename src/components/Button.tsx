import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
}

/** The loom button. Primary is the accent; ghost is a hairline outline. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "loom-btn",
        variant === "ghost" && "loom-btn--ghost",
        size === "sm" && "loom-btn--sm",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
