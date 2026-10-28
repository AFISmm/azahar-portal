import { type FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { Button, Field, Input } from "../components/ui";

/**
 * Pantalla bloqueante: se muestra en vez de <Outlet/> (ver ProtectedRoute)
 * cuando `empleado.debeCambiarPassword` es true — es decir, cuando un admin
 * creó la cuenta y le puso la contraseña él mismo. El usuario no puede
 * navegar al resto del portal hasta elegir su propia contraseña.
 */
export default function CambiarPasswordObligatorio() {
  const { empleado, refreshEmpleado, signOut } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      showToast(t("cambiarPasswordObligatorio.errorCorta"), "error");
      return;
    }
    if (password !== confirmar) {
      showToast(t("cambiarPasswordObligatorio.errorNoCoincide"), "error");
      return;
    }
    setGuardando(true);
    try {
      await dataSource.actualizarPerfilPropio({ password });
      await refreshEmpleado();
      showToast(t("cambiarPasswordObligatorio.toastExito"), "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : t("cambiarPasswordObligatorio.errorGenerico"), "error");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-app)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 text-cream-100">
            <Lock className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{t("cambiarPasswordObligatorio.titulo")}</h1>
            <p className="text-xs text-[var(--text-muted)]">{empleado?.correo}</p>
          </div>
        </div>
        <p className="mb-5 text-sm text-[var(--text-secondary)]">{t("cambiarPasswordObligatorio.descripcion")}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label={t("cambiarPasswordObligatorio.nuevaPassword")}>
            <Input
              required
              type="password"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field label={t("cambiarPasswordObligatorio.confirmarPassword")}>
            <Input
              required
              type="password"
              autoComplete="new-password"
              minLength={6}
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />
          </Field>
          <Button type="submit" className="w-full justify-center" disabled={guardando}>
            {t("cambiarPasswordObligatorio.boton")}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-4 w-full text-center text-xs font-semibold text-[var(--text-muted)] underline hover:text-[var(--text-primary)]"
        >
          {t("cambiarPasswordObligatorio.cerrarSesion")}
        </button>
      </div>
    </div>
  );
}
