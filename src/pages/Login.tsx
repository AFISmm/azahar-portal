import { type FormEvent, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Loader2, LogIn, ShieldCheck, Sparkles, User } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { Button, Field, Input } from "../components/ui";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

function IconoGoogle() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

const MENSAJE_ERROR_GOOGLE: Record<string, string> = {
  config_faltante: "El inicio de sesión con Google todavía no está configurado.",
  estado_invalido: "La sesión de Google expiró o no es válida. Intenta de nuevo.",
  token_fallido: "No se pudo confirmar tu cuenta de Google. Intenta de nuevo.",
  token_invalido: "No se pudo confirmar tu cuenta de Google. Intenta de nuevo.",
  sin_cuenta: "No existe una cuenta del portal con ese correo de Google. Pide a un administrador que te cree una cuenta primero.",
  error_inesperado: "Ocurrió un error inesperado iniciando sesión con Google. Intenta de nuevo.",
};

// Cuentas reales (no en memoria) que sirven como acceso rápido de
// demostración desde el botón "DEMO EMPLEADO" / "DEMO ADMINISTRADOR" del
// login. Cualquiera puede ver estas credenciales en el código del cliente a
// propósito: son cuentas de ejemplo, no privilegiadas más allá de su rol.
const CUENTAS_DEMO = {
  empleado: { correo: "carlosandres.perez@azaharcoffee.co", password: "Azahar2026!" },
  admin: { correo: "mariacamila.restrepo@azaharcoffee.co", password: "Azahar2026!" },
} as const;

export default function Login() {
  const { user, signIn, signInDemo } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("google_error") ? MENSAJE_ERROR_GOOGLE[searchParams.get("google_error") ?? ""] ?? null : null,
  );
  const [cargando, setCargando] = useState(false);
  const [cargandoDemo, setCargandoDemo] = useState(false);
  const [cargandoDemoRol, setCargandoDemoRol] = useState<"empleado" | "admin" | null>(null);

  if (user) return <Navigate to="/inicio" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const { error: errorIngreso } = await signIn(correo, password);
    setCargando(false);
    if (errorIngreso) setError(errorIngreso);
  }

  async function handleDemo() {
    setError(null);
    setCargandoDemo(true);
    const { error: errorDemo } = await signInDemo();
    setCargandoDemo(false);
    if (errorDemo) setError(errorDemo);
  }

  async function handleDemoRol(tipo: "empleado" | "admin") {
    setError(null);
    setCargandoDemoRol(tipo);
    const cuenta = CUENTAS_DEMO[tipo];
    const { error: errorIngreso } = await signIn(cuenta.correo, cuenta.password);
    setCargandoDemoRol(null);
    if (errorIngreso) setError(errorIngreso);
  }

  return (
    <div className="azahar-login-light relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${sidebarBg})` }} aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/85"
        aria-hidden="true"
      />
      <div className="absolute right-4 top-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-white p-8 shadow-card">

        <div className="mb-7 flex flex-col items-center text-center">
          <img src={logo} alt="Azahar Coffee Company" className="mb-4 h-14 w-auto object-contain" />
          <h1 className="font-heading text-xl font-bold text-brand-900">{t("login.titulo")}</h1>
          <p className="mt-1 text-sm text-brand-600">{t("login.subtitulo")}</p>
        </div>

        <a
          href="/api/auth/login?google=start"
          className="mb-5 flex w-full items-center justify-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 transition hover:bg-cream-100"
        >
          <IconoGoogle />
          {t("login.continuarConGoogle")}
        </a>
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-wide text-brand-400">
          <div className="h-px flex-1 bg-cream-200" />
          {t("login.oConCorreo")}
          <div className="h-px flex-1 bg-cream-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label={t("login.correoLabel")}>
            <Input
              type="email"
              required
              placeholder="nombre.apellido@azaharcoffee.co"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="username"
            />
          </Field>
          <Field label={t("login.passwordLabel")}>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Field>

          {error && <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{error}</p>}

          <Button type="submit" disabled={cargando} className="w-full">
            {cargando ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <LogIn className="h-4 w-4" strokeWidth={1.75} />}
            {t("login.ingresar")}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-brand-600">
          {t("login.noTienesCuenta")}{" "}
          <Link to="/registro" className="font-semibold text-brand-800 hover:underline">
            {t("login.registrate")}
          </Link>
        </p>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-brand-400">
          <div className="h-px flex-1 bg-cream-200" />
          {t("login.oEntraConDemo")}
          <div className="h-px flex-1 bg-cream-200" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleDemoRol("empleado")}
            disabled={cargandoDemoRol !== null}
            className="w-full"
          >
            {cargandoDemoRol === "empleado" ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
            ) : (
              <User className="h-4 w-4" strokeWidth={1.75} />
            )}
            {t("login.demoEmpleado")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleDemoRol("admin")}
            disabled={cargandoDemoRol !== null}
            className="w-full"
          >
            {cargandoDemoRol === "admin" ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
            ) : (
              <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            )}
            {t("login.demoAdministrador")}
          </Button>
        </div>

        {IS_DEMO_MODE && (
          <>
            <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-brand-400">
              <div className="h-px flex-1 bg-cream-200" />
              o
              <div className="h-px flex-1 bg-cream-200" />
            </div>
            <Button type="button" variant="secondary" onClick={() => void handleDemo()} disabled={cargandoDemo} className="w-full">
              {cargandoDemo ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <Sparkles className="h-4 w-4" strokeWidth={1.75} />}
              {t("login.entrarModoDemo")}
            </Button>
            <p className="mt-3 text-center text-xs text-brand-400">{t("login.modoDemoTexto")}</p>
          </>
        )}
      </div>
    </div>
  );
}
