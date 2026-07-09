import { type FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, LogIn, ShieldCheck, Sparkles, User } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { Button, Field, Input } from "../components/ui";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

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
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${sidebarBg})` }} aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/85"
        aria-hidden="true"
      />
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-white p-8 shadow-card">
        <div className="mb-7 flex flex-col items-center text-center">
          <img src={logo} alt="Azahar Coffee Company" className="mb-4 h-14 w-auto object-contain" />
          <h1 className="font-heading text-xl font-bold text-brand-900">Portal Azahar</h1>
          <p className="mt-1 text-sm text-brand-600">Autoservicio de talento humano para el equipo Azahar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Correo corporativo">
            <Input
              type="email"
              required
              placeholder="nombre.apellido@azaharcoffee.co"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="username"
            />
          </Field>
          <Field label="Contraseña">
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
            Ingresar
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-brand-600">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-semibold text-brand-800 hover:underline">
            Regístrate
          </Link>
        </p>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-brand-400">
          <div className="h-px flex-1 bg-cream-200" />o entra con una cuenta demo
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
            Demo empleado
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
            Demo administrador
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
              Entrar en modo demo
            </Button>
            <p className="mt-3 text-center text-xs text-brand-400">
              Sin backend configurado: entra como Gerente de Talento Humano con datos de ejemplo, sin necesidad de credenciales reales.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
