import { useState } from "react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificacionesDrawer } from "./NotificacionesDrawer";
import { useNotificaciones } from "../hooks/useNotificaciones";
import { useLanguage } from "../context/LanguageContext";

/**
 * Controles globales del portal (idioma + notificaciones + tema): viven en
 * una esquina fija de la pantalla (ver AppShell.tsx) en vez de dentro de
 * cada PageHeader, para que estén siempre visibles sin importar el scroll o
 * el ancho del contenido de la página.
 */
export function HeaderControles() {
  const [abierto, setAbierto] = useState(false);
  const { notificaciones, cargando, eliminar } = useNotificaciones();
  const { t } = useLanguage();

  return (
    <>
      <LanguageSwitcher />
      <button
        onClick={() => setAbierto(true)}
        className="relative rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] p-2.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
        aria-label={t("header.notificaciones")}
        title={t("header.notificaciones")}
      >
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        {notificaciones.length > 0 && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-500" />}
      </button>
      <ThemeToggle />

      <NotificacionesDrawer
        open={abierto}
        onClose={() => setAbierto(false)}
        notificaciones={notificaciones}
        cargando={cargando}
        onEliminar={eliminar}
      />
    </>
  );
}
