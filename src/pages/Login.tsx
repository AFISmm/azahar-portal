import { type FormEvent, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Loader2, LogIn, Sparkles, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { Button, Field, Input } from "../components/ui";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { leerUsuariosRecordados, olvidarUsuario, recordarUsuario } from "../lib/usuariosRecordados";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

const AVISOS_GOOGLE: Record<string, string> = {
  no_registrado: "Ese correo de Google no está registrado en Azahar Portal. Pide a un administrador que lo agregue.",
  staff: "Las cuentas de Mercury Methods entran con correo y contraseña, no con Google.",
  cancelado: "Cancelaste el acceso con Google.",
  no_disponible: "El acceso con Google aún no está disponible. Entra con tu correo y contraseña.",
  error: "No pudimos validar tu acceso con Google. Inténtalo de nuevo.",
};

export default function Login() {
  const { user, signIn, signInDemo } = useAuth();
  const [params] = useSearchParams();
  const avisoGoogle = AVISOS_GOOGLE[params.get("google") ?? ""] ?? null;
  const { t } = useLanguage();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recordados, setRecordados] = useState<string[]>(() => leerUsuariosRecordados());
  const [recordarme, setRecordarme] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [cargandoDemo, setCargandoDemo] = useState(false);

  if (user) return <Navigate to="/inicio" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const { error: errorIngreso } = await signIn(correo, password);
    setCargando(false);
    if (errorIngreso) setError(errorIngreso);
    else if (recordarme) setRecordados(recordarUsuario(correo));
  }

  async function handleDemo() {
    setError(null);
    setCargandoDemo(true);
    const { error: errorDemo } = await signInDemo();
    setCargandoDemo(false);
    if (errorDemo) setError(errorDemo);
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

      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-cream-100 p-8 shadow-card">

        <div className="mb-7 flex flex-col items-center text-center">
          <img src={logo} alt="Azahar Coffee Company" className="mb-4 h-14 w-auto object-contain" />
          <h1 className="font-heading text-xl font-bold text-brand-900">{t("login.titulo")}</h1>
          <p className="mt-1 text-sm text-brand-600">{t("login.subtitulo")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {recordados.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Usuarios recordados</p>
              <div className="flex flex-wrap gap-2">
                {recordados.map((c) => (
                  <span key={c} className="inline-flex items-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)] text-xs">
                    <button type="button" onClick={() => setCorreo(c)} className="px-3 py-1.5 font-medium text-brand-800 hover:bg-cream-200">
                      {c}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecordados(olvidarUsuario(c))}
                      className="border-l border-[var(--border-subtle)] px-2 py-1.5 text-brand-400 hover:bg-status-rechazada-bg hover:text-status-rechazada"
                      aria-label={`Olvidar ${c}`}
                      title="Olvidar este usuario"
                    >
                      <X className="h-3 w-3" strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
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

          <label className="flex items-center gap-2 text-sm text-brand-600">
            <input type="checkbox" className="h-4 w-4 accent-accent-500" checked={recordarme} onChange={(e) => setRecordarme(e.target.checked)} />
            Recordar mi correo en este equipo
          </label>

          {(error || avisoGoogle) && <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{error ?? avisoGoogle}</p>}

          <Button type="submit" disabled={cargando} className="w-full">
            {cargando ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <LogIn className="h-4 w-4" strokeWidth={1.75} />}
            {t("login.ingresar")}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-brand-400">
          <div className="h-px flex-1 bg-cream-200" />
          o
          <div className="h-px flex-1 bg-cream-200" />
        </div>
        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 hover:bg-cream-200"
        >
          <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
          Continuar con Google
        </a>
        <p className="mt-2 text-center text-xs text-brand-400">Después de Google te pedimos el código de tu app autenticadora (2FA).</p>

        <p className="mt-5 text-center text-sm text-brand-600">
          {t("login.noTienesCuenta")}{" "}
          <Link to="/registro" className="font-semibold text-brand-800 hover:underline">
            {t("login.registrate")}
          </Link>
        </p>

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
