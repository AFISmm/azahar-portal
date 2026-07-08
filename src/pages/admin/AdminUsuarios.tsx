import { useCallback, useEffect, useState } from "react";
import { ShieldCheck, Trash2 } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Empleado, Rol } from "../../lib/types";
import { formatDate, iniciales } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../auth/AuthContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button, Select } from "../../components/ui";

const ESTADO_ESTILO: Record<Empleado["estado"], string> = {
  activo: "bg-status-aprobada-bg text-status-aprobada",
  inactivo: "bg-status-rechazada-bg text-status-rechazada",
};

export default function AdminUsuarios() {
  const { showToast } = useToast();
  const { empleado: yo } = useAuth();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesandoId, setProcesandoId] = useState<string | null>(null);
  const [porEliminar, setPorEliminar] = useState<Empleado | null>(null);
  const [eliminando, setEliminando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setEmpleados(await dataSource.listEmpleados());
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function handleCambiarRol(emp: Empleado, nuevoRol: Rol) {
    if (nuevoRol === emp.rol) return;
    setProcesandoId(emp.id);
    try {
      const actualizado = await dataSource.updateEmpleado(emp.id, { rol: nuevoRol });
      setEmpleados((actuales) => actuales.map((e) => (e.id === emp.id ? actualizado : e)));
      showToast(
        `${emp.nombre} ahora tiene rol de ${nuevoRol === "admin" ? "administrador" : "empleado"}.`,
        "success",
      );
    } catch {
      showToast("No se pudo cambiar el rol. Intenta de nuevo.", "error");
    } finally {
      setProcesandoId(null);
    }
  }

  async function handleCambiarEstado(emp: Empleado) {
    const nuevoEstado: Empleado["estado"] = emp.estado === "activo" ? "inactivo" : "activo";
    setProcesandoId(emp.id);
    try {
      const actualizado = await dataSource.updateEmpleado(emp.id, { estado: nuevoEstado });
      setEmpleados((actuales) => actuales.map((e) => (e.id === emp.id ? actualizado : e)));
      showToast(
        `El acceso de ${emp.nombre} fue ${nuevoEstado === "activo" ? "activado" : "desactivado"}.`,
        "success",
      );
    } catch {
      showToast("No se pudo cambiar el estado de la cuenta. Intenta de nuevo.", "error");
    } finally {
      setProcesandoId(null);
    }
  }

  async function handleEliminar() {
    if (!porEliminar) return;
    setEliminando(true);
    try {
      await dataSource.deleteEmpleado(porEliminar.id);
      setEmpleados((actuales) => actuales.filter((e) => e.id !== porEliminar.id));
      showToast(`Cuenta de ${porEliminar.nombre} eliminada.`, "success");
      setPorEliminar(null);
    } catch {
      showToast("No se pudo eliminar la cuenta. Intenta de nuevo.", "error");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Portal Azahar"
        title="Gestión de usuarios"
        description="Administra quién tiene acceso al portal: su rol, si su cuenta está activa y desde cuándo está registrada. Para editar datos de personal (cargo, salario, vacaciones, etc.) usa Empleados."
      />

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : empleados.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay cuentas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Usuario</th>
                  <th className="py-2 pr-4 font-semibold">Rol</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                  <th className="py-2 pr-4 font-semibold">Registrado</th>
                  <th className="py-2 pr-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((emp) => {
                  const esMiCuenta = emp.id === yo?.id;
                  const procesando = procesandoId === emp.id;
                  const tituloBloqueo = "No puedes modificar tu propia cuenta desde aquí.";
                  return (
                    <tr key={emp.id} className="border-b border-[var(--border-subtle)] transition last:border-0 hover:bg-[var(--surface-muted)]">
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
                      <td className="py-3 pr-4">
                        <Select
                          className="w-auto min-w-[9.5rem] py-1.5 text-xs"
                          value={emp.rol}
                          disabled={esMiCuenta || procesando}
                          title={esMiCuenta ? tituloBloqueo : undefined}
                          onChange={(e) => void handleCambiarRol(emp, e.target.value as Rol)}
                        >
                          <option value="empleado">Empleado</option>
                          <option value="admin">Administrador</option>
                        </Select>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[emp.estado]}`}>
                          {emp.estado === "activo" ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDate(emp.createdAt)}</td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            className="px-2.5 py-1.5 text-xs"
                            disabled={esMiCuenta || procesando}
                            title={esMiCuenta ? tituloBloqueo : undefined}
                            onClick={() => void handleCambiarEstado(emp)}
                          >
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                            {emp.estado === "activo" ? "Desactivar" : "Activar"}
                          </Button>
                          <Button
                            variant="danger"
                            className="px-2.5 py-1.5 text-xs"
                            disabled={esMiCuenta || procesando}
                            title={esMiCuenta ? tituloBloqueo : undefined}
                            onClick={() => setPorEliminar(emp)}
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={!!porEliminar} onClose={() => setPorEliminar(null)} title="Eliminar cuenta">
        <p className="text-sm text-[var(--text-secondary)]">
          ¿Seguro que deseas eliminar la cuenta de <span className="font-semibold text-[var(--text-primary)]">{porEliminar?.nombre}</span>? Esta acción no
          se puede deshacer y también eliminará sus solicitudes, documentos y nómina asociados.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => setPorEliminar(null)} disabled={eliminando}>
            Cancelar
          </Button>
          <Button type="button" variant="danger" onClick={() => void handleEliminar()} disabled={eliminando}>
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
