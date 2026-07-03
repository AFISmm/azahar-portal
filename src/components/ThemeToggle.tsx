import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      title={theme === "light" ? "Modo oscuro" : "Modo claro"}
    >
      {theme === "light" ? <Moon className="h-4 w-4" strokeWidth={1.75} /> : <Sun className="h-4 w-4" strokeWidth={1.75} />}
    </button>
  );
}
