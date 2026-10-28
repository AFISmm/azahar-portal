import { useCallback, useEffect, useState } from "react";
import { ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import { MODULOS_INFO, type Empleado, type Modulo, type NivelModulo, type PermisosModulos } from "../../lib/types";
import { formatDate, iniciales } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../auth/AuthContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/ui";
import { EmpleadoForm, type EmpleadoFormValues } from "../../components/admin/EmpleadoForm";

const ESTADO_ESTILO: Record<Empleado["estado"], string> = {
  activo: "bg-status-aprobada-bg text-status-aprobada",
  inactivo: "bg-status-rechazada-bg text-status-rechazada",
};

// Encabezados cortos para que la matriz entre sin scroll horizontal en pantallas normales.
const ENCABEZADO_CORTO: Record<Modulo, string> = {
  negocio: "Negocio",
  rrhh: "RRHH",
  usuarios: "Usuarios",
  trazabilidad: "Trazab.",
  pos: "POS",
};

/** Aplica un cambio de la casilla "Ver" o "Editar" ('editar' implica 'ver'). */
function siguientePermiso(actual: NivelModulo | undefined, casilla: NivelModulo, marcada: boolean): NivelModulo | undefined {
  if (casilla === "editar") return marcada ? "editar" : "ver"; // quitar "Editar" deja solo "Ver"
  return marcada ? (actual ?? "ver") : undefined; // quitar "Ver" quita todo
}

export default function AdminUsuarios() {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const { empleado: yo } = useAuth();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesandoId, setProcesandoId] = useState<string | null>(null);
  const [porEliminar, setPorEliminar] = useState<Empleado | null>(null);
  const [eliminando, setEliminando] = useState(false);
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [creando, setCreando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setEmpleados(await dataSource.listEmpleados());
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  function reemplazar(actualizado: Empleado) {
    setEmpleados((actuales) => actuales.map((e) => (e.id === actualizado.id ? actualizado : e)));
  }

  async function handleCambiarPermiso(emp: Empleado, modulo: Modulo, casilla: NivelModulo, marcada: boolean) {
    const nuevoNivel = siguientePermiso(emp.permisosModulos[modulo], casilla, marcada);
    const nuevos: PermisosModulos = { ...emp.permisosModulos };
    if (nuevoNivel) nuevos[modulo] = nuevoNivel;
    else delete nuevos[modulo];

    reemplazar({ ...emp, permisosModulos: nuevos }); // optimista: se revierte si el servidor lo rechaza
    setProcesandoId(emp.id);
    try {
      reemplazar(await dataSource.updateEmpleado(emp.id, { permisosModulos: nuevos }));
    } catch (e) {
      reemplazar(emp);
      showToast(e instanceof Error && e.message ? e.message : "No se pudo actualizar el permiso.", "error");
    } finally {
      setProcesandoId(null);
    }
  }

  async function handleCambiarEstado(emp: Empleado) {
    const nuevoEstado: Empleado["estado"] = emp.estado === "activo" ? "inactivo" : "activo";
    setProcesandoId(emp.id);
    try {
      reemplazar(await dataSource.updateEmpleado(emp.id, { estado: nuevoEstado }));
      showToast(
        `${t("adminUsuarios.accesoPrefix")} ${emp.nombre} ${t("adminUsuarios.accesoFue")} ${nuevoEstado === "activo" ? t("adminUsuarios.accesoActivado") : t("adminUsuarios.accesoDesactivado")}.`,
        "success",
      );
    } catch {
      showToast(t("adminUsuarios.errorCambiarEstado"), "error");
    } finally {
      setProcesandoId(null);
    }
  }

  async function handleCrear(valores: EmpleadoFormValues) {
    setCreando(true);
    try {
      await dataSource.createEmpleado(valores);
      showToast(`${t("adminUsuarios.toastCreadoPrefijo")}${valores.nombre}${t("adminUsuarios.toastCreadoSufijo")}`, "success");
      setModalCrearOpen(false);
      await cargar();
    } catch {
      showToast(t("adminUsuarios.toastError"), "error");
    } finally {
      setCreando(false);
    }
  }

  async function handleEliminar() {
    if (!porEliminar) return;
    setEliminando(true);
    try {
      await dataSource.deleteEmpleado(porEliminar.id);
      setEmpleados((actuales) => actuales.filter((e) => e.id !== porEliminar.id));
      showToast(`${t("adminUsuarios.cuentaDePrefix")} ${porEliminar.nombre} ${t("adminUsuarios.cuentaEliminadaSufijo")}`, "success");
      setPorEliminar(null);
    } catch {
      showToast(t("adminUsuarios.errorEliminarCuenta"), "error");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb={t("adminUsuarios.breadcrumb")}
        title={t("adminUsuarios.titulo")}
        description="Marca en cada módulo si la persona puede verlo, o verlo y también editarlo. Los cambios se guardan al instante."
      >
        <Button onClick={() => setModalCrearOpen(true)}>
          <UserPlus className="h-4 w-4" strokeWidth={1.75} />
          {t("adminUsuarios.botonNuevo")}
        </Button>
      </PageHeader>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("adminUsuarios.cargando")}</p>
        ) : empleados.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("adminUsuarios.sinCuentas")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th rowSpan={2} className="py-2 pr-4 align-bottom font-semibold">{t("adminUsuarios.colUsuario")}</th>
                  {MODULOS_INFO.map((m) => (
                    <th key={m.clave} colSpan={2} title={`${m.nombre}: ${m.descripcion}`} className="cursor-help border-l border-[var(--border-subtle)] px-2 pt-2 text-center font-semibold">
                      {ENCABEZADO_CORTO[m.clave]}
                    </th>
                  ))}
                  <th rowSpan={2} className="border-l border-[var(--border-subtle)] px-3 align-bottom font-semibold">{t("adminUsuarios.colEstado")}</th>
                  <th rowSpan={2} className="py-2 pr-2 align-bottom font-semibold">{t("adminUsuarios.colAcciones")}</th>
                </tr>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                  {MODULOS_INFO.map((m) => (
                    <th key={m.clave} colSpan={2} className="border-l border-[var(--border-subtle)] px-1 pb-1.5 text-center font-medium">
                      <span className="inline-block w-1/2">Ver</span>
                      <span className="inline-block w-1/2">Editar</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {empleados.map((emp) => {
                  const esMiCuenta = emp.id === yo?.id;
                  const procesando = procesandoId === emp.id;
                  const bloqueada = !!emp.accesoTotal || esMiCuenta;
                  const motivoBloqueo = emp.accesoTotal
                    ? "Cuenta @mercurymethods.com: acceso total fijo a todos los módulos"
                    : esMiCuenta
                      ? "No puedes cambiar tus propios permisos: pídeselo a otro administrador"
                      : undefined;
                  return (
                    <tr key={emp.id} className="border-b border-[var(--border-subtle)] transition last:border-0 hover:bg-[var(--surface-muted)]">
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                            {iniciales(emp.nombre)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-[var(--text-primary)]">{emp.nombre}</p>
                            <p className="truncate text-xs text-[var(--text-muted)]">
                              {emp.correo}
                              {emp.accesoTotal && (
                                <span title={motivoBloqueo} className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-accent-300/30 px-1.5 py-0.5 text-[10px] font-semibold text-brand-800">
                                  <ShieldCheck className="h-3 w-3" strokeWidth={1.75} /> Acceso total
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      {MODULOS_INFO.map((m) => {
                        const nivel = emp.permisosModulos[m.clave];
                        return (
                          <td key={m.clave} colSpan={2} className="border-l border-[var(--border-subtle)] px-1 py-2">
                            <div className="flex">
                              {(["ver", "editar"] as const).map((casilla) => (
                                <label key={casilla} className="flex w-1/2 cursor-pointer justify-center" title={motivoBloqueo ?? `${m.nombre}: ${casilla === "ver" ? "puede ver" : "puede ver y editar"}`}>
                                  <input
                                    type="checkbox"
                                    aria-label={`${emp.nombre} — ${m.nombre}: ${casilla}`}
                                    className="h-4 w-4 accent-brand-800 disabled:cursor-not-allowed"
                                    checked={casilla === "ver" ? !!nivel : nivel === "editar"}
                                    disabled={bloqueada || procesando}
                                    onChange={(e) => void handleCambiarPermiso(emp, m.clave, casilla, e.target.checked)}
                                  />
                                </label>
                              ))}
                            </div>
                          </td>
                        );
                      })}
                      <td className="border-l border-[var(--border-subtle)] px-3 py-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${ESTADO_ESTILO[emp.estado]}`}>
                          {emp.estado === "activo" ? t("adminUsuarios.estadoActivo") : t("adminUsuarios.estadoInactivo")}
                        </span>
                        <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{formatDate(emp.createdAt)}</p>
                      </td>
                      <td className="py-2 pr-2">
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            className="px-2 py-1.5 text-xs"
                            disabled={esMiCuenta || procesando}
                            title={esMiCuenta ? t("adminUsuarios.bloqueoPropiaCuenta") : undefined}
                            onClick={() => void handleCambiarEstado(emp)}
                          >
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                            {emp.estado === "activo" ? t("adminUsuarios.accionDesactivar") : t("adminUsuarios.accionActivar")}
                          </Button>
                          <Button
                            variant="danger"
                            className="px-2 py-1.5 text-xs"
                            disabled={esMiCuenta || procesando}
                            title={esMiCuenta ? t("adminUsuarios.bloqueoPropiaCuenta") : t("adminUsuarios.eliminar")}
                            aria-label={t("adminUsuarios.eliminar")}
                            onClick={() => setPorEliminar(emp)}
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
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
        <p className="mt-3 text-[11px] text-[var(--text-muted)]">
          «Editar» incluye «Ver». Pasa el cursor sobre el nombre de un módulo para ver qué abarca. En el POS, aplicar descuentos, marcar agotados y cancelar cobros exige además editar algún módulo de administración (Negocio, RRHH o Usuarios).
        </p>
      </Card>

      <Modal open={modalCrearOpen} onClose={() => setModalCrearOpen(false)} title={t("adminUsuarios.botonNuevo")} fullScreen>
        <EmpleadoForm
          modo="crear"
          soloAccesoPortal
          enviando={creando}
          onSubmit={(v) => void handleCrear(v)}
          onCancel={() => setModalCrearOpen(false)}
        />
      </Modal>

      <Modal open={!!porEliminar} onClose={() => setPorEliminar(null)} title={t("adminUsuarios.modalEliminarTitulo")}>
        <p className="text-sm text-[var(--text-secondary)]">
          {t("adminUsuarios.confirmEliminarPrefix")} <span className="font-semibold text-[var(--text-primary)]">{porEliminar?.nombre}</span>
          {t("adminUsuarios.confirmEliminarSufijo")}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => setPorEliminar(null)} disabled={eliminando}>
            {t("adminUsuarios.cancelar")}
          </Button>
          <Button type="button" variant="danger" onClick={() => void handleEliminar()} disabled={eliminando}>
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            {t("adminUsuarios.eliminar")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
