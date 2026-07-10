import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] p-2.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
      aria-label={theme === "light" ? t("header.temaOscuro") : t("header.temaClaro")}
      title={theme === "light" ? t("header.temaOscuro") : t("header.temaClaro")}
    >
      {theme === "light" ? <Moon className="h-4 w-4" strokeWidth={1.75} /> : <Sun className="h-4 w-4" strokeWidth={1.75} />}
    </button>
  );
}
