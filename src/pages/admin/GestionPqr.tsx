import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckCircle2, MessageSquareWarning } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { dataSource } from "../../lib/dataSource";
import type { Pqr } from "../../lib/types";
import { formatDateTime } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";

const ESTADO_ESTILO: Record<Pqr["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  resuelta: "bg-status-aprobada-bg text-status-aprobada",
};

export default function GestionPqr() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const lista = await dataSource.listPqrRecibidas();
      setPqrs(lista);
    } catch {
      showToast("No se pudieron cargar las PQR. Intenta de nuevo.", "error");
    } finally {
      setCargando(false);
    }
  }, [showToast]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  if (empleado && empleado.tipoCuenta !== "desarrollador") {
    return <Navigate to="/inicio" replace />;
  }

  async function marcarComoResuelta(pqr: Pqr) {
    setProcesando(pqr.id);
    try {
      await dataSource.actualizarEstadoPqr(pqr.id, "resuelta");
      showToast("PQR marcada como resuelta.", "success");
      await cargar();
    } catch {
      showToast("No se pudo actualizar la PQR.", "error");
    } finally {
      setProcesando(null);
    }
  }

  const pendientes = pqrs.filter((p) => p.estado === "pendiente").length;

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Portal Azahar"
        title="Gestión PQR"
        description="Peticiones, quejas y reclamos radicadas por el equipo hacia tu cuenta de desarrollador."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-pendiente-bg text-status-pendiente">
            <MessageSquareWarning className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Pendientes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pendientes}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800/10 text-brand-800">
            <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Total recibidas</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pqrs.length}</p>
          </div>
        </Card>
      </div>

      <Card title="PQR recibidas">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : pqrs.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Todavía no has recibido ninguna PQR.</p>
        ) : (
          <ul className="divide-y divide-[var(--border-subtle)]">
            {pqrs.map((p) => (
              <li key={p.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{p.nombre}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {p.correo}
                      {p.cedula ? ` · CC ${p.cedula}` : ""}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">Radicada el {formatDateTime(p.creadoEn)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[p.estado]}`}>
                      {p.estado === "resuelta" ? "Resuelta" : "Pendiente"}
                    </span>
                    {p.estado === "pendiente" && (
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 text-xs"
                        disabled={procesando === p.id}
                        onClick={() => void marcarComoResuelta(p)}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Marcar como resuelta
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-3 rounded-xl bg-[var(--surface-app)] p-3 text-sm text-[var(--text-secondary)]">{p.problema}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
