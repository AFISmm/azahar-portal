import { type FormEvent, useState } from "react";
import { UserPlus, Save } from "lucide-react";
import type { Empleado, NuevoEmpleadoInput } from "../../lib/types";
import { Button, Field, Input, Select } from "../ui";
import { useLanguage } from "../../context/LanguageContext";
import { IS_DEMO_MODE } from "../../lib/backendMode";

export const DEPARTAMENTOS = ["Talento Humano", "Operaciones de Tienda", "Logística y Abastecimiento", "Finanzas", "Mercadeo", "Producción y Calidad", "Tecnología y Desarrollo"];
export const TIPOS_CONTRATO = ["Término indefinido", "Término fijo", "Aprendizaje SENA", "Prestación de servicios"];

// Las cuentas de @mercurymethods.com son del equipo externo de desarrollo,
// no empleados reales de Azahar — no tiene sentido pedirles departamento,
// tipo de contrato, fecha de ingreso, vacaciones o salario. Para esas
// cuentas el formulario se reduce a nombre, correo, cargo y rol; el resto
// se completa con valores fijos al enviar (ver handleSubmit).
function esCuentaExterna(correo: string): boolean {
  return correo.trim().toLowerCase().endsWith("@mercurymethods.com");
}

const DEPARTAMENTO_EXTERNO = "Externo — Mercury Methods";
const TIPO_CONTRATO_EXTERNO = "Prestación de servicios (externo)";

export interface EmpleadoFormValues extends NuevoEmpleadoInput {
  estado: "activo" | "inactivo";
}

interface Props {
  valoresIniciales?: Partial<Empleado>;
  modo: "crear" | "editar";
  enviando: boolean;
  onSubmit: (valores: EmpleadoFormValues) => void;
  onCancel: () => void;
  /** Modo "Gestión de Usuarios": solo pide nombre, correo, cargo, rol y contraseña — nada de datos de nómina. */
  soloAccesoPortal?: boolean;
}

export function EmpleadoForm({ valoresIniciales, modo, enviando, onSubmit, onCancel, soloAccesoPortal = false }: Props) {
  const { t } = useLanguage();
  const [nombre, setNombre] = useState(valoresIniciales?.nombre ?? "");
  const [correo, setCorreo] = useState(valoresIniciales?.correo ?? "");
  const [cargo, setCargo] = useState(valoresIniciales?.cargo ?? "");
  const [departamento, setDepartamento] = useState(valoresIniciales?.departamento ?? DEPARTAMENTOS[0]);
  const [tipoContrato, setTipoContrato] = useState(valoresIniciales?.tipoContrato ?? TIPOS_CONTRATO[0]);
  const [fechaIngreso, setFechaIngreso] = useState(valoresIniciales?.fechaIngreso ?? "");
  const [diasVacaciones, setDiasVacaciones] = useState(valoresIniciales?.diasVacacionesDisponibles ?? 15);
  const rol = valoresIniciales?.rol ?? "empleado"; // heredado: ya no otorga acceso (ver permisosModulos)
  const [estado, setEstado] = useState<"activo" | "inactivo">(valoresIniciales?.estado ?? "activo");
  const [telefono, setTelefono] = useState(valoresIniciales?.telefono ?? "");
  const [salario, setSalario] = useState(valoresIniciales?.salario ?? undefined);
  const [password, setPassword] = useState("");

  const esExterna = esCuentaExterna(correo);
  const ocultarCamposHR = soloAccesoPortal || esExterna;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      nombre,
      correo,
      cargo,
      departamento: ocultarCamposHR ? DEPARTAMENTO_EXTERNO : departamento,
      tipoContrato: ocultarCamposHR ? TIPO_CONTRATO_EXTERNO : tipoContrato,
      fechaIngreso: ocultarCamposHR ? new Date().toISOString().slice(0, 10) : fechaIngreso,
      diasVacacionesDisponibles: ocultarCamposHR ? 0 : Number(diasVacaciones),
      rol,
      estado,
      telefono: ocultarCamposHR ? null : telefono || null,
      salario: ocultarCamposHR ? null : salario ? Number(salario) : null,
      passwordTemporal: soloAccesoPortal ? password : undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={t("empleadoForm.nombreCompleto")}>
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("empleadoForm.nombrePlaceholder")} />
        </Field>
        <Field label={t("empleadoForm.correoCorporativo")}>
          <Input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder={t("empleadoForm.correoPlaceholder")} />
        </Field>
        <Field label={t("empleadoForm.cargo")}>
          <Input required value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder={t("empleadoForm.cargoPlaceholder")} />
        </Field>
        {!ocultarCamposHR && (
          <>
            <Field label={t("empleadoForm.departamento")}>
              <Select value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("empleadoForm.tipoContrato")}>
              <Select value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
                {TIPOS_CONTRATO.map((tc) => (
                  <option key={tc} value={tc}>
                    {tc}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("empleadoForm.fechaIngreso")}>
              <Input required type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
            </Field>
            <Field label={t("empleadoForm.diasVacaciones")}>
              <Input required type="number" min={0} value={diasVacaciones} onChange={(e) => setDiasVacaciones(Number(e.target.value))} />
            </Field>
            <Field label={t("empleadoForm.salario")}>
              <Input type="number" min={0} value={salario ?? ""} onChange={(e) => setSalario(e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <Field label={t("empleadoForm.telefono")}>
              <Input value={telefono ?? ""} onChange={(e) => setTelefono(e.target.value)} placeholder="300 000 0000" />
            </Field>
          </>
        )}
        {/* El rol del portal ya no se elige aquí: el acceso se asigna por módulo (Ver / Editar) en Gestión de usuarios. */}
        {soloAccesoPortal && modo === "crear" && (
          <Field label={t("empleadoForm.contrasena")}>
            <Input
              required
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("empleadoForm.contrasenaPlaceholder")}
            />
          </Field>
        )}
        {modo === "editar" && (
          <Field label={t("empleadoForm.estado")}>
            <Select value={estado} onChange={(e) => setEstado(e.target.value as "activo" | "inactivo")}>
              <option value="activo">{t("empleadoForm.estadoActivo")}</option>
              <option value="inactivo">{t("empleadoForm.estadoInactivo")}</option>
            </Select>
          </Field>
        )}
      </div>

      {esExterna && !soloAccesoPortal && (
        <p className="rounded-lg bg-accent-300/20 px-3 py-2 text-xs text-brand-800">
          Correo de <strong>Mercury Methods</strong> detectado: esta cuenta se crea como externa, sin datos de nómina
          (departamento, contrato, vacaciones, salario) — solo nombre, correo, cargo y rol.
        </p>
      )}

      {soloAccesoPortal && modo === "crear" && (
        <p className="rounded-lg bg-cream-200 px-3 py-2 text-xs text-brand-800">{t("empleadoForm.contrasenaAyuda")}</p>
      )}

      {modo === "crear" && !soloAccesoPortal && IS_DEMO_MODE && (
        <p className="rounded-lg bg-cream-200 px-3 py-2 text-xs text-brand-800">
          {t("empleadoForm.demoParte1")}{" "}
          <code className="font-mono">/api/empleados-crear</code>{t("empleadoForm.demoParte2")}{" "}
          <code className="font-mono">empleados</code> {t("empleadoForm.demoParte3")}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          {t("empleadoForm.cancelar")}
        </Button>
        <Button type="submit" disabled={enviando}>
          {modo === "crear" ? <UserPlus className="h-4 w-4" strokeWidth={1.75} /> : <Save className="h-4 w-4" strokeWidth={1.75} />}
          {modo === "crear"
            ? soloAccesoPortal
              ? t("empleadoForm.crearUsuario")
              : t("empleadoForm.crearEmpleado")
            : t("empleadoForm.guardarCambios")}
        </Button>
      </div>
    </form>
  );
}
