import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Users, Wallet } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Empleado, NominaPago } from "../../lib/types";
import { formatCOP, formatDate, iniciales } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";

const ESTADO_ESTILO: Record<NominaPago["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  pagado: "bg-status-aprobada-bg text-status-aprobada",
};

export default function AdminNomina() {
  const { showToast } = useToast();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [emps, nom] = await Promise.all([dataSource.listEmpleados(), dataSource.listNominaPagos()]);
    setEmpleados(emps);
    setPagos(nom);
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);

  // Nómina del "periodo actual": el pago más reciente (mayor fecha de pago)
  // registrado por cada empleado.
  const pagosActuales = useMemo(() => {
    const masReciente = new Map<string, NominaPago>();
    for (const pago of pagos) {
      const actual = masReciente.get(pago.empleadoId);
      if (!actual || pago.fechaPago > actual.fechaPago) {
        masReciente.set(pago.empleadoId, pago);
      }
    }
    return Array.from(masReciente.values()).sort((a, b) => {
      const nombreA = empleadoPorId.get(a.empleadoId)?.nombre ?? "";
      const nombreB = empleadoPorId.get(b.empleadoId)?.nombre ?? "";
      return nombreA.localeCompare(nombreB);
    });
  }, [pagos, empleadoPorId]);

  const totalPeriodo = useMemo(() => pagosActuales.reduce((acc, p) => acc + p.monto, 0), [pagosActuales]);
  const numPendientes = useMemo(() => pagosActuales.filter((p) => p.estado === "pendiente").length, [pagosActuales]);

  async function marcarComoPagado(pago: NominaPago) {
    setProcesando(pago.id);
    try {
      await dataSource.actualizarEstadoNominaPago(pago.id, "pagado");
      showToast("Pago de nómina marcado como pagado.", "success");
      await cargar();
    } catch {
      showToast("No se pudo actualizar el pago.", "error");
    } finally {
      setProcesando(null);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Nómina / Administración"
        title="Nómina"
        description="Nómina administrativa completa de Azahar Coffee Company para el periodo actual."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-300/30 text-accent-500">
            <Wallet className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Total nómina del periodo</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{formatCOP(totalPeriodo)}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800/10 text-brand-800">
            <Users className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Empleados en nómina</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pagosActuales.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-pendiente-bg text-status-pendiente">
            <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Pagos pendientes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{numPendientes}</p>
          </div>
        </Card>
      </div>

      <Card title="Nómina del periodo actual">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Empleado</th>
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Monto</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                  <th className="py-2 pr-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagosActuales.map((pago) => {
                  const emp = empleadoPorId.get(pago.empleadoId);
                  return (
                    <tr key={pago.id} className="border-b border-[var(--border-subtle)] last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                            {emp ? iniciales(emp.nombre) : "?"}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{emp?.nombre ?? "Empleado eliminado"}</p>
                            <p className="text-xs text-[var(--text-muted)]">{emp?.cargo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[var(--text-secondary)]">{pago.periodo}</td>
                      <td className="py-3 pr-4 font-mono font-semibold text-[var(--text-primary)]">{formatCOP(pago.monto)}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[pago.estado]}`}>
                          {pago.estado === "pagado" ? "Pagado" : "Pendiente"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        {pago.estado === "pendiente" ? (
                          <Button
                            variant="outline"
                            className="px-3 py-1.5 text-xs"
                            disabled={procesando === pago.id}
                            onClick={() => void marcarComoPagado(pago)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                            Marcar como pagado
                          </Button>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">Pagado el {formatDate(pago.fechaPago)}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
