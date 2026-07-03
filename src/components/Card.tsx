import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, className = "", title, icon, actions, style }: CardProps) {
  return (
    <div
      style={style}
      className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-card ${className}`}
    >
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h3 className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              {icon}
              {title}
            </h3>
          )}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
