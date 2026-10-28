import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import { AccesoDenegado, Cargando, ErrorCaja, useCarga, usePermisosTraz } from "./comunes";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

export default function TrazAuditoria() {
  const { editar } = usePermisosTraz();
  const { datos, error, cargando } = useCarga(() => trazabilidadApi.auditoria());

  if (!editar) return <AccesoDenegado etapa="el registro de auditoría" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Trazabilidad"
        title="Registro de auditoría"
        description="Bitácora de solo-anexado: quién registró qué y cuándo. Los registros nunca se editan ni se borran; se corrigen con uno nuevo."
      />
      <Card>
        {cargando && <Cargando />}
        {error && <ErrorCaja mensaje={error} />}
        {datos && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4">Fecha</th>
                  <th className="py-2 pr-4">Usuario</th>
                  <th className="py-2 pr-4">Entidad</th>
                  <th className="py-2">Resumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {datos.map((r) => (
                  <tr key={r.id}>
                    <td className="whitespace-nowrap py-2 pr-4 text-xs text-[var(--text-muted)]">{fmt(r.creadoEn)}</td>
                    <td className="whitespace-nowrap py-2 pr-4 font-semibold">{r.usuarioNombre}</td>
                    <td className="whitespace-nowrap py-2 pr-4 text-xs text-[var(--text-muted)]">{r.entidad}</td>
                    <td className="py-2 text-xs text-[var(--text-secondary)]">{r.resumen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {datos.length === 0 && <p className="py-4 text-sm text-[var(--text-muted)]">Aún no hay registros.</p>}
          </div>
        )}
      </Card>
    </div>
  );
}
