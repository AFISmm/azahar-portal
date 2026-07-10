import { type FormEvent, useState } from "react";
import { UserPlus, Save } from "lucide-react";
import type { Empleado, NuevoEmpleadoInput } from "../../lib/types";
import { Button, Field, Input, Select } from "../ui";
import { useLanguage } from "../../context/LanguageContext";

export const DEPARTAMENTOS = ["Talento Humano", "Operaciones de Tienda", "Logística y Abastecimiento", "Finanzas", "Mercadeo", "Producción y Calidad", "Tecnología y Desarrollo"];
export const TIPOS_CONTRATO = ["Término indefinido", "Término fijo", "Aprendizaje SENA", "Prestación de servicios"];

export interface EmpleadoFormValues extends NuevoEmpleadoInput {
  estado: "activo" | "inactivo";
}

interface Props {
  valoresIniciales?: Partial<Empleado>;
  modo: "crear" | "editar";
  enviando: boolean;
  onSubmit: (valores: EmpleadoFormValues) => void;
  onCancel: () => void;
}

export function EmpleadoForm({ valoresIniciales, modo, enviando, onSubmit, onCancel }: Props) {
  const { t } = useLanguage();
  const [nombre, setNombre] = useState(valoresIniciales?.nombre ?? "");
  const [correo, setCorreo] = useState(valoresIniciales?.correo ?? "");
  const [cargo, setCargo] = useState(valoresIniciales?.cargo ?? "");
  const [departamento, setDepartamento] = useState(valoresIniciales?.departamento ?? DEPARTAMENTOS[0]);
  const [tipoContrato, setTipoContrato] = useState(valoresIniciales?.tipoContrato ?? TIPOS_CONTRATO[0]);
  const [fechaIngreso, setFechaIngreso] = useState(valoresIniciales?.fechaIngreso ?? "");
  const [diasVacaciones, setDiasVacaciones] = useState(valoresIniciales?.diasVacacionesDisponibles ?? 15);
  const [rol, setRol] = useState<"empleado" | "admin">(valoresIniciales?.rol ?? "empleado");
  const [estado, setEstado] = useState<"activo" | "inactivo">(valoresIniciales?.estado ?? "activo");
  const [telefono, setTelefono] = useState(valoresIniciales?.telefono ?? "");
  const [salario, setSalario] = useState(valoresIniciales?.salario ?? undefined);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      nombre,
      correo,
      cargo,
      departamento,
      tipoContrato,
      fechaIngreso,
      diasVacacionesDisponibles: Number(diasVacaciones),
      rol,
      estado,
      telefono: telefono || null,
      salario: salario ? Number(salario) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={t("empleadoForm.nombreCompleto")}>
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("empleadoForm.nombrePlaceholder")} />
        </Field>
        <Field label={t("empleadoForm.correoCorporativo")}>
          <Input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder={t("empleadoForm.correoPlaceholder")} />
        </Field>
        <Field label={t("empleadoForm.cargo")}>
          <Input required value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder={t("empleadoForm.cargoPlaceholder")} />
        </Field>
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
        <Field label={t("empleadoForm.rolPortal")}>
          <Select value={rol} onChange={(e) => setRol(e.target.value as "empleado" | "admin")}>
            <option value="empleado">{t("empleadoForm.rolEmpleado")}</option>
            <option value="admin">{t("empleadoForm.rolAdmin")}</option>
          </Select>
        </Field>
        {modo === "editar" && (
          <Field label={t("empleadoForm.estado")}>
            <Select value={estado} onChange={(e) => setEstado(e.target.value as "activo" | "inactivo")}>
              <option value="activo">{t("empleadoForm.estadoActivo")}</option>
              <option value="inactivo">{t("empleadoForm.estadoInactivo")}</option>
            </Select>
          </Field>
        )}
      </div>

      {modo === "crear" && (
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
          {modo === "crear" ? t("empleadoForm.crearEmpleado") : t("empleadoForm.guardarCambios")}
        </Button>
      </div>
    </form>
  );
}
