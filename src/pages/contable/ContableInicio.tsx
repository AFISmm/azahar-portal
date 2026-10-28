import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { contableApi } from "../../lib/contableApi";
import { formatDate } from "../../lib/format";
import { useFiltroFechas } from "../../lib/contableFechas";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, EstadoPill, Kpi, cop, num, useCarga, usePermisoContable } from "./comunes";

export default function ContableInicio() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.resumen());
  const filtro = useFiltroFechas();

  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Gestión Contable"
        description="Conciliaciones bancarias, cargue de facturas, terceros, pagos de nómina y catálogo, con la documentación del trabajo hecho en Alegra."
      />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Meses conciliados" valor={`${datos.conciliacion.mesesCuadrados}/${datos.conciliacion.meses}`} nota={`${num(datos.conciliacion.movimientos)} movimientos del extracto`} />
            <Kpi etiqueta="Cobros con factura" valor={`${datos.conciliacion.cobrosConciliados}/${datos.conciliacion.cobrosTotal}`} nota="Pagos individuales de la cuenta 13050501" />
            <Kpi etiqueta="Asientos de nómina por subir" valor={datos.nomina.asientosPendientes} nota={cop(datos.nomina.valorPendiente)} />
            <Kpi etiqueta="Contactos por crear en Alegra" valor={num(datos.terceros.faltantesEnAlegra)} nota={`${num(datos.terceros.cubiertos)} con datos del listado`} />
          </div>

          <Card title="Qué se ha hecho y en qué estado está">
            <ul className="divide-y divide-[var(--border-subtle)] text-sm">
              {datos.hitos.filter((h) => filtro.dentro(h.fecha)).map((h) => (
                <li key={h.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      {h.area} · {formatDate(h.fecha)}
                    </p>
                    <p className="font-semibold text-[var(--text-primary)]">{h.titulo}</p>
                  </div>
                  <EstadoPill estado={h.estado} />
                </li>
              ))}
            </ul>
            {datos.hitos.every((h) => !filtro.dentro(h.fecha)) && <p className="py-2 text-sm text-[var(--text-muted)]">No hay hitos en este período. La línea de tiempo completa (desde diciembre de 2016) está en Documentación.</p>}
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Los indicadores de arriba son acumulados. Actualizado el {formatDate(datos.actualizado)}. Hay {datos.pendientes} pendientes en{" "}
              <Link to="/contable/documentacion" className="font-semibold text-brand-800 underline">
                Documentación
              </Link>
              .
            </p>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/contable/comprobantes", "Comprobantes contables", "Detalle desde noviembre de 2025, cierres desde diciembre de 2016 y los listos para subir."],
              ["/contable/conciliacion", "Conciliación bancaria", "Bancolombia 0590 por mes, cuentas PUC, monto unificado y cobros 13050501."],
              ["/contable/carga", "Cargue de archivos", "Sube un extracto o un listado de facturas (CSV) y obtén el resumen por mes. No sale de tu navegador."],
              ["/contable/nomina", "Pagos de nómina", "Pagos del Banco de Bogotá y el asiento propuesto en Alegra."],
              ["/contable/terceros", "Terceros", "Estado del balance 2025 y de los comprobantes de enero a marzo."],
              ["/contable/catalogo", "Catálogo de productos", "Cambios aplicados y reglas de la actualización de los martes."],
              ["/contable/documentacion", "Documentación", "Bitácora, decisiones, pendientes por responsable y scripts."],
            ].map(([to, titulo, texto]) => (
              <Link key={to} to={to} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 shadow-card transition hover:border-accent-500/50 hover:shadow-lg">
                <p className="font-heading text-sm font-bold text-[var(--text-primary)]">{titulo}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{texto}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
