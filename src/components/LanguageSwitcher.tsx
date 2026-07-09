import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { IDIOMAS } from "../i18n/translations";

export function LanguageSwitcher() {
  const { idioma, setIdioma, t } = useLanguage();

  return (
    <div className="relative flex items-center">
      <Languages
        className="pointer-events-none absolute left-2.5 h-4 w-4 text-[var(--text-secondary)]"
        strokeWidth={1.75}
      />
      <select
        value={idioma}
        onChange={(e) => setIdioma(e.target.value as typeof idioma)}
        aria-label={t("header.idioma")}
        title={t("header.idioma")}
        className="appearance-none rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] py-2 pl-8 pr-3 text-xs font-semibold text-[var(--text-secondary)] outline-none transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
      >
        {IDIOMAS.map((op) => (
          <option key={op.value} value={op.value}>
            {op.etiqueta}
          </option>
        ))}
      </select>
    </div>
  );
}
