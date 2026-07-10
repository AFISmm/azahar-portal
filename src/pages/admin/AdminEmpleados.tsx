import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Empleado } from "../../lib/types";
import { iniciales } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button, Input, Select } from "../../components/ui";
import { EmpleadoForm, type EmpleadoFormValues } from "../../components/admin/EmpleadoForm";
import { useLanguage } from "../../context/LanguageContext";

const ESTADO_ESTILO: Record<Empleado["estado"], string> = {
  activo: "bg-status-aprobada-bg text-status-aprobada",
  inactivo: "bg-status-rechazada-bg text-status-rechazada",
};

export default function AdminEmpleados() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("todos");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setEmpleados(await dataSource.listEmpleados());
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const departamentos = useMemo(() => Array.from(new Set(empleados.map((e) => e.departamento))).sort(), [empleados]);

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return empleados.filter((e) => {
      const coincideTexto =
        !texto ||
        e.nombre.toLowerCase().includes(texto) ||
        e.correo.toLowerCase().includes(texto) ||
        e.cargo.toLowerCase().includes(texto);
      const coincideDepto = filtroDepartamento === "todos" || e.departamento === filtroDepartamento;
      const coincideRol = filtroRol === "todos" || e.rol === filtroRol;
      return coincideTexto && coincideDepto && coincideRol;
    });
  }, [empleados, busqueda, filtroDepartamento, filtroRol]);

  async function handleCrear(valores: EmpleadoFormValues) {
    setEnviando(true);
    try {
      await dataSource.createEmpleado(valores);
      showToast(`${t("adminEmpleados.toastCreadoPrefijo")}${valores.nombre}${t("adminEmpleados.toastCreadoSufijo")}`, "success");
      setModalOpen(false);
      await cargar();
    } catch {
      showToast(t("adminEmpleados.toastError"), "error");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("adminEmpleados.breadcrumb")} title={t("adminEmpleados.titulo")} description={t("adminEmpleados.descripcion")}>
        <Button onClick={() => setModalOpen(true)}>
          <UserPlus className="h-4 w-4" strokeWidth={1.75} />
          {t("adminEmpleados.botonNuevo")}
        </Button>
      </PageHeader>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={1.75} />
          <Input placeholder={t("adminEmpleados.buscarPlaceholder")} value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="pl-9" />
        </div>
        <Select value={filtroDepartamento} onChange={(e) => setFiltroDepartamento(e.target.value)} className="w-auto">
          <option value="todos">{t("adminEmpleados.todosDepartamentos")}</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className="w-auto">
          <option value="todos">{t("adminEmpleados.todosRoles")}</option>
          <option value="empleado">{t("adminEmpleados.rolEmpleado")}</option>
          <option value="admin">{t("adminEmpleados.rolAdmin")}</option>
        </Select>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("adminEmpleados.cargando")}</p>
        ) : filtrados.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("adminEmpleados.sinResultados")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colEmpleado")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colCargo")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colDepartamento")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colContrato")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colRol")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("adminEmpleados.colEstado")}</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/admin/empleados/${emp.id}`)}
                    className="cursor-pointer border-b border-[var(--border-subtle)] transition last:border-0 hover:bg-[var(--surface-muted)]"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                          {iniciales(emp.nombre)}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{emp.nombre}</p>
                          <p className="text-xs text-[var(--text-muted)]">{emp.correo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.cargo}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.departamento}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.tipoContrato}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full bg-cream-200 px-2.5 py-1 text-xs font-semibold text-brand-800">
                        {emp.rol === "admin" ? t("adminEmpleados.rolAdmin") : t("adminEmpleados.rolEmpleado")}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[emp.estado]}`}>
                        {emp.estado === "activo" ? t("adminEmpleados.estadoActivo") : t("adminEmpleados.estadoInactivo")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t("adminEmpleados.botonNuevo")} widthClassName="max-w-2xl">
        <EmpleadoForm modo="crear" enviando={enviando} onSubmit={(v) => void handleCrear(v)} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
