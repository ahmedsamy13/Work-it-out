import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:  "bg-surface-hover text-text-subtle",
  success:  "bg-status-success-bg text-status-success-text border border-status-success-border",
  warning:  "bg-status-warning-bg text-status-warning-text border border-status-warning-border",
  danger:   "bg-status-danger-bg text-status-danger-text border border-status-danger-border",
  info:     "bg-status-info-bg text-status-info-text border border-status-info-border",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
