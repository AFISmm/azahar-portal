import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { contableApi } from "../../lib/contableApi";
import { formatDate } from "../../lib/format";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, EstadoPill, Notas, useCarga, usePermisoContable } from "./comunes";

export default function ContableDocumentacion() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.bitacora());
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Documentación"
        description={datos ? `Bitácora del trabajo contable en Alegra · actualizada el ${formatDate(datos.actualizado)}` : "Bitácora del trabajo contable en Alegra."}
      />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <Card title="Qué se hizo">
            <ul className="divide-y divide-[var(--border-subtle)]">
              {datos.hitos.map((h) => (
                <li key={h.id} className="space-y-1 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{h.area}</p>
                      <p className="font-semibold text-[var(--text-primary)]">{h.titulo}</p>
                    </div>
                    <EstadoPill estado={h.estado} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{h.detalle}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Pendientes por responsable">
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
