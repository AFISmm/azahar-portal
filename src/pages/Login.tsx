import { type FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { Button, Field, Input } from "../components/ui";
import logo from "../assets/azahar-logo.png";

export default function Login() {
  const { user, signIn, signInDemo } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
  }

  async function handleDemo() {
    setError(null);
    setCargandoDemo(true);
    const { error: errorDemo } = await signInDemo();
    setCargandoDemo(false);
    if (errorDemo) setError(errorDemo);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
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
