import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Save, ShieldCheck, Trash2, Undo2, UserPlus } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import { MODULOS_INFO, type Empleado, type Modulo, type NivelModulo, type PermisosModulos } from "../../lib/types";
import { ROLES_PREDEFINIDOS, ROL_ACCESO_TOTAL, ROL_PERSONALIZADO, compararPorPermisos, igualPermisos, normalizar, rolDe } from "../../lib/roles";
import { formatDate, iniciales } from "../../lib/format";

import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../auth/AuthContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/ui";
import { EmpleadoForm, type EmpleadoFormValues } from "../../components/admin/EmpleadoForm";

/** Nombre y primer apellido pegados, cada uno con inicial mayúscula: "felipe serna" → "FelipeSerna". */
function apodo(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toLocaleUpperCase() + p.slice(1).toLocaleLowerCase())
    .join("");
}

const ESTADO_ESTILO: Record<Empleado["estado"], string> = {
  activo: "bg-status-aprobada-bg text-status-aprobada",
  inactivo: "bg-status-rechazada-bg text-status-rechazada",
};

const ESTILO_ROL: Record<string, string> = {
  [ROL_ACCESO_TOTAL]: "border-accent-500/60 bg-accent-300/30 text-[var(--text-primary)]",
  Administrador: "border-brand-800 bg-brand-800 text-cream-100",
  Gerencia: "border-status-pendiente/50 bg-status-pendiente-bg text-status-pendiente",
  "Calidad y trazabilidad": "border-status-aprobada/50 bg-status-aprobada-bg text-status-aprobada",
  "Operador POS": "border-[var(--border-subtle)] bg-[var(--surface-muted)] text-[var(--text-primary)]",
  Empleado: "border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)]",
  [ROL_PERSONALIZADO]: "border-dashed border-[var(--text-muted)] bg-transparent text-[var(--text-secondary)]",
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
  const [guardandoIds, setGuardandoIds] = useState<string[]>([]);
  // Cambios de permisos pendientes por persona: no se aplican hasta pulsar "Guardar".
  const [borradores, setBorradores] = useState<Record<string, PermisosModulos>>({});
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

  // Acceso total primero y luego por cantidad de permisos guardados (no por los cambios sin guardar, para que las filas no salten mientras se editan).
  const ordenados = useMemo(() => [...empleados].sort(compararPorPermisos), [empleados]);

  const pendientes = useMemo(
    () => empleados.filter((e) => !!borradores[e.id] && !igualPermisos(borradores[e.id], e.permisosModulos)).map((e) => e.id),
    [empleados, borradores],
  );

  // Aviso del navegador si se intenta salir con cambios sin guardar.
  useEffect(() => {
    if (pendientes.length === 0) return;
    const avisar = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [pendientes.length]);

  function reemplazar(actualizado: Empleado) {
    setEmpleados((actuales) => actuales.map((e) => (e.id === actualizado.id ? actualizado : e)));
  }

  const vista = (emp: Empleado): PermisosModulos => borradores[emp.id] ?? emp.permisosModulos;

  function editarBorrador(emp: Empleado, nuevos: PermisosModulos) {
    setBorradores((b) => ({ ...b, [emp.id]: normalizar(nuevos) }));
  }

  function handleCambiarPermiso(emp: Empleado, modulo: Modulo, casilla: NivelModulo, marcada: boolean) {
    const nuevos: PermisosModulos = { ...vista(emp) };
    const nivel = siguientePermiso(nuevos[modulo], casilla, marcada);
    if (nivel) nuevos[modulo] = nivel;
    else delete nuevos[modulo];
    editarBorrador(emp, nuevos);
  }

  function handleElegirRol(emp: Empleado, clave: string) {
    const rol = ROLES_PREDEFINIDOS.find((r) => r.clave === clave);
    if (rol) editarBorrador(emp, rol.permisos);
  }

  function descartar(emp: Empleado) {
    setBorradores((b) => {
      const { [emp.id]: _descartado, ...resto } = b;
      void _descartado;
      return resto;
    });
  }

  async function guardar(emp: Empleado): Promise<boolean> {
    const permisos = borradores[emp.id];
    if (!permisos) return true;
    setGuardandoIds((ids) => [...ids, emp.id]);
    try {
      reemplazar(await dataSource.updateEmpleado(emp.id, { permisosModulos: permisos }));
      descartar(emp);
      return true;
    } catch (e) {
      showToast(e instanceof Error && e.message ? e.message : `No se pudieron guardar los permisos de ${emp.nombre}.`, "error");
      return false;
    } finally {
      setGuardandoIds((ids) => ids.filter((x) => x !== emp.id));
    }
  }

  async function handleGuardar(emp: Empleado) {
    if (await guardar(emp)) showToast(`Permisos de ${emp.nombre} guardados.`, "success");
  }

  async function handleGuardarTodos() {
    let guardados = 0;
    for (const id of pendientes) {
      const emp = empleados.find((e) => e.id === id);
      if (emp && (await guardar(emp))) guardados += 1;
    }
    if (guardados > 0) showToast(`${guardados} ${guardados === 1 ? "persona guardada" : "personas guardadas"}.`, "success");
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
      descartar(porEliminar);
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
        description="Elige el rol de cada persona o marca, en cada módulo del menú, si puede Ver o también Editar. Los cambios solo se aplican al pulsar Guardar junto a su nombre."
      >
        {pendientes.length > 0 && (
          <Button variant="secondary" onClick={() => void handleGuardarTodos()} disabled={guardandoIds.length > 0}>
            <Save className="h-4 w-4" strokeWidth={1.75} />
            Guardar todos ({pendientes.length})
          </Button>
        )}
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
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th rowSpan={2} className="py-2 pr-3 align-bottom font-semibold">{t("adminUsuarios.colUsuario")}</th>
                  <th rowSpan={2} className="px-2 align-bottom font-semibold" title="Guardar los cambios de cada persona"><Save className="mx-auto h-4 w-4" strokeWidth={1.75} aria-label="Guardar" /></th>
                  <th rowSpan={2} className="border-l border-[var(--border-subtle)] px-3 align-bottom font-semibold">Rol</th>
                  {MODULOS_INFO.map((m) => (
                    <th
                      key={m.clave}
                      colSpan={2}
                      title={`${m.nombre}: ${m.descripcion}`}
                      className="w-[4.25rem] cursor-help border-l border-[var(--border-subtle)] px-1 pt-2 text-center align-bottom text-[10px] font-semibold normal-case leading-tight tracking-normal text-[var(--text-secondary)]"
                    >
                      {m.nombre}
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
                {ordenados.map((emp) => {
                  const esMiCuenta = emp.id === yo?.id;
                  const procesando = procesandoId === emp.id;
                  const guardando = guardandoIds.includes(emp.id);
                  const bloqueada = !!emp.accesoTotal || esMiCuenta;
                  const permisos = vista(emp);
                  const cambiado = pendientes.includes(emp.id);
                  const rol = rolDe(permisos, !!emp.accesoTotal);
                  const motivoBloqueo = emp.accesoTotal
                    ? "Cuenta @mercurymethods.com: acceso total fijo a todos los módulos"
                    : esMiCuenta
                      ? "No puedes cambiar tus propios permisos: pídeselo a otro administrador"
                      : undefined;
                  return (
                    <tr key={emp.id} className={`border-b border-[var(--border-subtle)] transition last:border-0 ${cambiado ? "bg-accent-300/15" : "hover:bg-[var(--surface-muted)]"}`}>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                            {iniciales(emp.nombre)}
                          </div>
                          <p className="min-w-0 max-w-[9rem] truncate font-medium text-[var(--text-primary)]" title={`${emp.nombre} — ${emp.correo}`}>
                            {apodo(emp.nombre)}
                          </p>
                        </div>
                      </td>

                      {/* Guardar / deshacer, junto al nombre de cada persona */}
                      <td className="px-2 py-2">
                        {bloqueada ? (
                          <span className="text-[11px] text-[var(--text-muted)]" title={motivoBloqueo}>—</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Button
                              variant={cambiado ? "secondary" : "outline"}
                              className="p-2"
                              disabled={!cambiado || guardando}
                              onClick={() => void handleGuardar(emp)}
                              title={cambiado ? "Guardar los cambios de permisos de esta persona" : "No hay cambios por guardar"}
                              aria-label={`Guardar los cambios de ${emp.nombre}`}
                            >
                              {guardando ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <Save className="h-4 w-4" strokeWidth={1.75} />}
                            </Button>
                            {cambiado && !guardando && (
                              <button
                                type="button"
                                onClick={() => descartar(emp)}
                                className="rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                                title="Descartar los cambios"
                                aria-label={`Descartar los cambios de ${emp.nombre}`}
                              >
                                <Undo2 className="h-4 w-4" strokeWidth={1.75} />
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Rol: se elige de una lista (marca las casillas) y se recalcula si se cambian las casillas a mano */}
                      <td className="border-l border-[var(--border-subtle)] px-3 py-2">
                        {bloqueada ? (
                          <span
                            title={motivoBloqueo}
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${ESTILO_ROL[rol] ?? ESTILO_ROL[ROL_PERSONALIZADO]}`}
                          >
                            {emp.accesoTotal && <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />}
                            {rol}
                          </span>
                        ) : (
                          <select
                            aria-label={`Rol de ${emp.nombre}`}
                            value={rol === ROL_PERSONALIZADO ? "personalizado" : (ROLES_PREDEFINIDOS.find((r) => r.nombre === rol)?.clave ?? "personalizado")}
                            disabled={procesando || guardando}
                            onChange={(e) => handleElegirRol(emp, e.target.value)}
                            title={ROLES_PREDEFINIDOS.find((r) => r.nombre === rol)?.descripcion ?? "Combinación de permisos que no corresponde a un rol predefinido."}
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold outline-none ${ESTILO_ROL[rol] ?? ESTILO_ROL[ROL_PERSONALIZADO]}`}
                          >
                            {rol === ROL_PERSONALIZADO && <option value="personalizado" disabled>{ROL_PERSONALIZADO}</option>}
                            {ROLES_PREDEFINIDOS.map((r) => (
                              <option key={r.clave} value={r.clave} className="bg-[var(--surface-card)] text-[var(--text-primary)]">
                                {r.nombre}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>

                      {MODULOS_INFO.map((m) => {
                        const nivel = permisos[m.clave];
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
                                    disabled={bloqueada || guardando}
                                    onChange={(e) => handleCambiarPermiso(emp, m.clave, casilla, e.target.checked)}
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
                            title={esMiCuenta ? t("adminUsuarios.bloqueoPropiaCuenta") : emp.estado === "activo" ? t("adminUsuarios.accionDesactivar") : t("adminUsuarios.accionActivar")}
                            onClick={() => void handleCambiarEstado(emp)}
                          >
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                            <span className="sr-only">{emp.estado === "activo" ? t("adminUsuarios.accionDesactivar") : t("adminUsuarios.accionActivar")}</span>
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
          Los módulos llevan el nombre que tienen en el menú lateral; Inicio, Nómina (autoservicio) y Mi Perfil están disponibles para todos, y la columna Nómina controla su administración. Orden: primero quienes tienen acceso total y luego por cantidad de permisos. «Editar» incluye «Ver». Elegir un rol marca sus casillas; si las cambias a mano, el rol pasa a «Personalizado» (o al que corresponda). En el POS, aplicar descuentos, marcar agotados y cancelar
          cobros exige además editar algún módulo de administración (las Gestiones, Información General, Nómina o Gestión de usuarios).
        </p>
      </Card>

      <Modal open={modalCrearOpen} onClose={() => setModalCrearOpen(false)} title={t("adminUsuarios.botonNuevo")} fullScreen>
        <EmpleadoForm modo="crear" soloAccesoPortal enviando={creando} onSubmit={(v) => void handleCrear(v)} onCancel={() => setModalCrearOpen(false)} />
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
