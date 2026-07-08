import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "../context/ToastContext";
import { Button, Field, Input, Select } from "../components/ui";
import { DEPARTAMENTOS, TIPOS_CONTRATO } from "../components/admin/EmpleadoForm";
import logo from "../assets/azahar-logo.png";

type TipoUsuario = "empleado" | "desarrollador";

const DEPARTAMENTO_DESARROLLADOR = "Tecnología y Desarrollo";
const TIPO_CONTRATO_DESARROLLADOR = "Prestación de servicios";

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Registro() {
  const { user, registrar } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("empleado");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState(DEPARTAMENTOS[0]);
  const [tipoContrato, setTipoContrato] = useState(TIPOS_CONTRATO[0]);
  const [fechaIngreso, setFechaIngreso] = useState(hoyISO());
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const esDesarrollador = tipoUsuario === "desarrollador";

  if (user) return <Navigate to="/inicio" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const resultado = await registrar(
        esDesarrollador
          ? {
              nombre,
              correo,
              password,
              cargo,
              departamento: DEPARTAMENTO_DESARROLLADOR,
              tipoContrato: TIPO_CONTRATO_DESARROLLADOR,
              fechaIngreso: hoyISO(),
              rol: "admin",
            }
          : { nombre, correo, password, cargo, departamento, tipoContrato, fechaIngreso, rol: "empleado" },
      );
      if (resultado.modo === "demo") {
        showToast(
          "Modo demo: registro procesado localmente. Se usará la base de datos real cuando se configure Postgres en el despliegue.",
          "info",
        );
      } else {
        showToast(resultado.mensajeBienvenida ?? "¡Registro completado! Bienvenido(a) a Portal Azahar.", "success");
      }
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo completar el registro.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-white p-8 shadow-card">
        <div className="mb-7 flex flex-col items-center text-center">
          <img src={logo} alt="Azahar Coffee Company" className="mb-4 h-14 w-auto object-contain" />
          <h1 className="font-heading text-xl font-bold text-brand-900">Crear cuenta</h1>
          <p className="mt-1 text-sm text-brand-600">Regístrate en el Portal Azahar para el equipo Azahar Coffee Company</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Tipo de usuario">
            <div className="inline-flex w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-1">
              {(["empleado", "desarrollador"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipoUsuario(t)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    tipoUsuario === t ? "bg-brand-800 text-cream-100 shadow-card" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {t === "empleado" ? "Empleado de la empresa" : "Desarrollador de la página"}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Nombre completo">
            <Input required placeholder="Ej. Camila Torres" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
          </Field>
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
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Field>

          <div className={esDesarrollador ? "" : "grid grid-cols-1 gap-4 sm:grid-cols-2"}>
            <Field label="Cargo">
              <Input
                required
                placeholder={esDesarrollador ? "Ej. Desarrollador Full Stack" : "Ej. Barista"}
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
            </Field>
            {!esDesarrollador && (
              <>
                <Field label="Departamento">
                  <Select value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                    {DEPARTAMENTOS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Tipo de contrato">
                  <Select value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
                    {TIPOS_CONTRATO.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Fecha de ingreso">
                  <Input required type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
                </Field>
              </>
            )}
          </div>

          {esDesarrollador && (
            <p className="rounded-lg bg-accent-300/20 px-3 py-2 text-xs text-brand-800">
              Tu cuenta se creará con acceso de administrador para que puedas revisar y probar todos los módulos del portal.
            </p>
          )}

          {error && <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{error}</p>}

          <Button type="submit" disabled={cargando} className="w-full">
            {cargando ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <UserPlus className="h-4 w-4" strokeWidth={1.75} />}
            Crear cuenta
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-brand-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-brand-800 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
