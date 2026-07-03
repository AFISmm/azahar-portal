import type { ButtonHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

const VARIANTES: Record<Variant, string> = {
  primary: "bg-brand-800 text-cream-100 hover:bg-brand-900 focus-visible:outline-brand-800",
  secondary: "bg-accent-500 text-brand-900 hover:bg-accent-300 focus-visible:outline-accent-500",
  outline: "border border-brand-800 text-brand-800 hover:bg-cream-200 focus-visible:outline-brand-800",
  danger: "bg-status-rechazada text-cream-100 hover:opacity-90 focus-visible:outline-status-rechazada",
  ghost: "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold font-heading transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANTES[variant]} ${className}`}
      {...props}
    />
  );
}

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] ${props.className ?? ""}`} />;
}

const CONTROL_CLASS =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none transition focus:border-brand-800 focus:ring-2 focus:ring-brand-800/20 disabled:opacity-60";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${CONTROL_CLASS} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${CONTROL_CLASS} ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${CONTROL_CLASS} ${props.className ?? ""}`} />;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
