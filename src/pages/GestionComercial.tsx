import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Plus, Store, Trash2, Trophy } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Button, Field, Input, Select } from "../components/ui";
import { formatCOP } from "../lib/format";
import { kpisComerciales, productosTop, tiendasComerciales } from "../lib/mockGestion";
import { ESTADOS_TIENDA, negocioApi, type EstadoTiendaApi, type TiendaApi } from "../lib/negocioApi";
import { IS_DEMO_MODE } from "../lib/backendMode";
import { useAcceso } from "../auth/acceso";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";

const ESTADO_ESTILO: Record<EstadoTiendaApi, string> = {
  activa: "bg-status-aprobada-bg text-status-aprobada",
  "en remodelación": "bg-status-pendiente-bg text-status-pendiente",
  cerrada: "bg-status-rechazada-bg text-status-rechazada",
};

const ETIQUETA_ESTADO = Object.fromEntries(ESTADOS_TIENDA.map((e) => [e.valor, e.etiqueta])) as Record<EstadoTiendaApi, string>;

// Modo demo (sin backend): las tiendas viven solo en memoria de esta sesión.
const TIENDAS_DEMO: TiendaApi[] = tiendasComerciales.map((t) => ({ ...t, estado: t.estado as EstadoTiendaApi }));

export default function GestionComercial() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const puedeEditar = useAcceso().editar("comercial");

  const [tiendas, setTiendas] = useState<TiendaApi[]>(IS_DEMO_MODE ? TIENDAS_DEMO : []);
  const [cargando, setCargando] = useState(!IS_DEMO_MODE);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [porEliminar, setPorEliminar] = useState<TiendaApi | null>(null);
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [ventasMes, setVentasMes] = useState("");
  const [estado, setEstado] = useState<EstadoTiendaApi>("activa");

  const cargar = useCallback(async () => {
    if (IS_DEMO_MODE) return;
    try {
      setTiendas(await negocioApi.tiendas());
    } catch (e) {
      showToast(e instanceof Error ? e.message : "No se pudieron cargar las tiendas.", "error");
    } finally {
      setCargando(false);
    }
  }, [showToast]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const totalVentas = tiendas.filter((x) => x.estado !== "cerrada").reduce((acc, tienda) => acc + tienda.ventasMes, 0);
  const maxUnidades = Math.max(...productosTop.map((p) => p.unidades));

  async function agregar(e: FormEvent) {
    e.preventDefault();
    setGuardando(true);
    try {
      const datos = { nombre: nombre.trim(), ciudad: ciudad.trim(), ventasMes: Number(ventasMes) || 0, estado };
      const nueva = IS_DEMO_MODE ? { id: `demo-${Date.now()}`, ...datos } : await negocioApi.crearTienda(datos);
      setTiendas((lista) => [...lista, nueva].sort((a, b) => a.nombre.localeCompare(b.nombre)));
      showToast(`Tienda «${nueva.nombre}» agregada.`, "success");
      setModalAbierto(false);
      setNombre("");
      setCiudad("");
      setVentasMes("");
      setEstado("activa");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "No se pudo agregar la tienda.", "error");
    } finally {
      setGuardando(false);
    }
  }

  async function cambiarEstado(tienda: TiendaApi, nuevo: EstadoTiendaApi) {
    if (nuevo === tienda.estado) return;
    const anterior = tienda;
    setTiendas((lista) => lista.map((x) => (x.id === tienda.id ? { ...x, estado: nuevo } : x)));
    try {
      if (!IS_DEMO_MODE) await negocioApi.cambiarEstado(tienda.id, nuevo);
      showToast(`«${tienda.nombre}» ahora está ${ETIQUETA_ESTADO[nuevo].toLowerCase()}.`, "success");
    } catch (err) {
      setTiendas((lista) => lista.map((x) => (x.id === tienda.id ? anterior : x)));
      showToast(err instanceof Error ? err.message : "No se pudo cambiar el estado.", "error");
    }
  }

  async function eliminar() {
    if (!porEliminar) return;
    setGuardando(true);
    try {
      if (!IS_DEMO_MODE) await negocioApi.eliminarTienda(porEliminar.id);
      setTiendas((lista) => lista.filter((x) => x.id !== porEliminar.id));
      showToast(`Tienda «${porEliminar.nombre}» eliminada.`, "success");
      setPorEliminar(null);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "No se pudo eliminar la tienda.", "error");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("gestionComercial.breadcrumb")} title={t("gestionComercial.titulo")} description={t("gestionComercial.descripcion")} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpisComerciales.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{kpi.label}</p>
            <p className="mt-1.5 font-mono text-xl font-bold text-[var(--text-primary)] sm:text-2xl">{kpi.valor}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{kpi.detalle}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <Card
          title={t("gestionComercial.tiendasTitulo")}
          icon={<Store className="h-4 w-4" strokeWidth={1.75} />}
          actions={
            puedeEditar ? (
              <Button className="px-3 py-1.5 text-xs" onClick={() => setModalAbierto(true)}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.75} /> Agregar tienda
              </Button>
            ) : undefined
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">{t("gestionComercial.colTienda")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("gestionComercial.colCiudad")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("gestionComercial.colVentasMes")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("gestionComercial.colEstado")}</th>
                  {puedeEditar && <th className="py-2 font-semibold" />}
                </tr>
              </thead>
              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-[var(--text-muted)]">Cargando tiendas…</td>
                  </tr>
                )}
                {!cargando && tiendas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-[var(--text-muted)]">No hay tiendas registradas.{puedeEditar && " Agrega la primera con el botón de arriba."}</td>
                  </tr>
                )}
                {tiendas.map((tienda) => (
                  <tr key={tienda.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{tienda.nombre}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{tienda.ciudad}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatCOP(tienda.ventasMes)}</td>
                    <td className="py-3 pr-4">
                      {puedeEditar ? (
                        <Select
                          aria-label={`Estado de ${tienda.nombre}`}
                          value={tienda.estado}
                          onChange={(e) => void cambiarEstado(tienda, e.target.value as EstadoTiendaApi)}
                          className={`w-auto min-w-[9.5rem] py-1.5 text-xs font-semibold ${ESTADO_ESTILO[tienda.estado]}`}
                        >
                          {ESTADOS_TIENDA.map((e) => (
                            <option key={e.valor} value={e.valor}>{e.etiqueta}</option>
                          ))}
                        </Select>
                      ) : (
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[tienda.estado]}`}>{ETIQUETA_ESTADO[tienda.estado]}</span>
                      )}
                    </td>
                    {puedeEditar && (
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setPorEliminar(tienda)}
                          className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
                          title="Eliminar tienda"
                          aria-label={`Eliminar ${tienda.nombre}`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pt-3 pr-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]" colSpan={2}>
                    {t("gestionComercial.totalMes")} <span className="font-normal normal-case">(sin tiendas cerradas)</span>
                  </td>
                  <td className="pt-3 pr-4 font-mono text-sm font-bold text-[var(--text-primary)]" colSpan={3}>
                    {formatCOP(totalVentas)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        <Card title={t("gestionComercial.productoTopTitulo")} icon={<Trophy className="h-4 w-4" strokeWidth={1.75} />}>
          <ul className="space-y-3">
            {productosTop.map((producto, idx) => (
              <li key={producto.nombre} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 font-heading text-xs font-bold text-brand-900">{idx + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">{producto.nombre}</p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <div className="h-full rounded-full bg-accent-500" style={{ width: `${(producto.unidades / maxUnidades) * 100}%` }} />
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {producto.unidades.toLocaleString("es-CO")} {t("gestionComercial.unidadSufijo")}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)} title="Agregar tienda">
        <form onSubmit={agregar} className="space-y-4">
          <Field label="Nombre de la tienda">
            <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Azahar Chapinero" />
          </Field>
          <Field label="Ciudad">
            <Input required value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Bogotá" />
          </Field>
          <Field label="Ventas del mes (COP)">
            <Input type="number" min={0} inputMode="numeric" value={ventasMes} onChange={(e) => setVentasMes(e.target.value)} placeholder="0" />
          </Field>
          <Field label="Estado">
            <Select value={estado} onChange={(e) => setEstado(e.target.value as EstadoTiendaApi)}>
              {ESTADOS_TIENDA.map((e) => (
                <option key={e.valor} value={e.valor}>{e.etiqueta}</option>
              ))}
            </Select>
          </Field>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={() => setModalAbierto(false)} disabled={guardando}>Cancelar</Button>
            <Button type="submit" disabled={guardando}>Agregar tienda</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!porEliminar} onClose={() => setPorEliminar(null)} title="Eliminar tienda">
        <p className="text-sm text-[var(--text-secondary)]">
          ¿Eliminar la tienda <span className="font-semibold text-[var(--text-primary)]">{porEliminar?.nombre}</span>? Esta acción no se puede deshacer. Si solo
          quieres sacarla de operación por un tiempo, cambia su estado a «Cerrada».
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => setPorEliminar(null)} disabled={guardando}>Cancelar</Button>
          <Button type="button" variant="danger" onClick={() => void eliminar()} disabled={guardando}>
            <Trash2 className="h-4 w-4" strokeWidth={1.75} /> Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
