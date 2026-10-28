import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { contableApi } from "../../lib/contableApi";
import { mesIsoAEtiqueta, useFiltroFechas } from "../../lib/contableFechas";
import { formatDate } from "../../lib/format";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, EstadoPill, Notas, TD, TD_NUM, TH, Tabla, cop, num, useCarga, usePermisoContable } from "./comunes";

export default function ContableDocumentacion() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.bitacora());
  const filtro = useFiltroFechas();
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  const linea = (datos?.lineaTiempo ?? []).filter((h) => filtro.dentro(h.fecha)).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  const hitos = (datos?.hitos ?? []).filter((h) => filtro.dentro(h.fecha));
  const actividad = (datos?.actividad ?? []).filter((m) => filtro.mesDentro(m.mes)).sort((a, b) => (a.mes < b.mes ? 1 : -1));

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Documentación"
        description={datos ? `Bitácora del trabajo contable en Alegra desde diciembre de 2016 · actualizada el ${formatDate(datos.actualizado)}` : "Bitácora del trabajo contable en Alegra."}
      />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <Card title={`Línea de tiempo desde diciembre de 2016 (${linea.length})`}>
            {linea.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No hay eventos en este período.</p>
            ) : (
              <ol className="relative space-y-4 border-l-2 border-[var(--border-subtle)] pl-5">
                {linea.map((h) => (
                  <li key={`${h.fecha}-${h.titulo}`} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--surface-card)] bg-accent-500" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                          {formatDate(h.fecha)} · {h.area}
                        </p>
                        <p className="font-semibold text-[var(--text-primary)]">{h.titulo}</p>
                      </div>
                      <EstadoPill estado={h.estado} />
                    </div>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{h.detalle}</p>
                  </li>
                ))}
              </ol>
            )}
          </Card>

          <Card title="Comprobantes destacados por mes (cierres y nómina; no es el listado completo)">
            <div className="max-h-80 overflow-y-auto">
              <Tabla>
                <thead>
                  <tr>
                    {["Mes", "Comprobantes", "Valor", "Líneas", "Con tercero"].map((h) => (
                      <th key={h} className={TH}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {actividad.map((m) => (
                    <tr key={m.mes}>
                      <td className={`${TD} capitalize`}>{mesIsoAEtiqueta(m.mes)}</td>
                      <td className={TD_NUM}>{num(m.n)}</td>
                      <td className={TD_NUM}>{cop(m.total)}</td>
                      <td className={TD_NUM}>{num(m.lineas)}</td>
                      <td className={TD_NUM}>{num(m.conTercero)}</td>
                    </tr>
                  ))}
                  {actividad.length === 0 && (
                    <tr>
                      <td className={TD} colSpan={5}>
                        Sin comprobantes en este período.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Tabla>
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)]">Solo se muestran los comprobantes destacados cargados al portal; los demás meses pueden tener comprobantes en Alegra que aún no se listan aquí.</p>
          </Card>

          <Card title={`Trabajo de octubre de 2026 en detalle (${hitos.length})`}>
            {hitos.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No hay trabajo registrado en este período.</p>
            ) : (
              <ul className="divide-y divide-[var(--border-subtle)]">
                {hitos.map((h) => (
                  <li key={h.id} className="space-y-1 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                          {formatDate(h.fecha)} · {h.area}
                        </p>
                        <p className="font-semibold text-[var(--text-primary)]">{h.titulo}</p>
                      </div>
                      <EstadoPill estado={h.estado} />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{h.detalle}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Pendientes por responsable (vigentes hoy)">
            <ul className="divide-y divide-[var(--border-subtle)] text-sm">
              {datos.pendientes.map((p) => (
                <li key={p.tarea} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:gap-4">
                  <span className="w-36 shrink-0 text-xs font-bold uppercase tracking-wide text-accent-500">{p.responsable}</span>
                  <div>
                    <p className="text-[var(--text-primary)]">{p.tarea}</p>
                    {p.bloquea !== "—" && <p className="text-xs text-[var(--text-muted)]">Bloquea: {p.bloquea}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Decisiones tomadas">
            <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
              {datos.decisiones.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Card>

          <Card title="Scripts">
            <ul className="divide-y divide-[var(--border-subtle)] text-sm">
              {datos.scripts.map((s) => (
                <li key={s.archivo} className="py-2.5">
                  <p className="break-all font-mono text-xs font-semibold text-brand-800">{s.archivo}</p>
                  <p className="text-[var(--text-secondary)]">{s.uso}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Archivos del proyecto">
            <ul className="divide-y divide-[var(--border-subtle)] text-sm">
              {datos.archivos.map((a) => (
                <li key={a.archivo} className="py-2.5">
                  <p className="break-all font-mono text-xs font-semibold text-brand-800">{a.archivo}</p>
                  <p className="text-[var(--text-secondary)]">{a.descripcion}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Limitaciones actuales">
            <Notas notas={datos.limitaciones} />
          </Card>
        </>
      )}
    </div>
  );
}
