import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import { AccesoDenegado, Cargando, ErrorCaja, useCarga, usePermisosTraz } from "./comunes";

export default function TrazLoteEmpaqueDetalle() {
  const { id = "" } = useParams();
  const { tieneAcceso } = usePermisosTraz();
  const { datos: lote, error, cargando } = useCarga(() => trazabilidadApi.loteEmpaque(id));

  if (!tieneAcceso) return <AccesoDenegado etapa="el módulo de trazabilidad" />;
  if (cargando) return <Cargando />;
  if (error || !lote) return <ErrorCaja mensaje={error ?? "Lote no encontrado."} />;

  return (
    <Card className="azahar-fade-in mx-auto max-w-md text-center">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-status-aprobada">Lote de empaque</p>
      <h1 className="mb-4 font-heading text-lg font-bold">{lote.loteComercial ?? "Lote de empaque"}</h1>

      {lote.qrDataUrl && <img src={lote.qrDataUrl} alt="Código QR del lote" className="mx-auto mb-4 h-56 w-56 rounded-xl border border-[var(--border-subtle)]" />}

      <p className="mb-1 text-xs text-[var(--text-secondary)]">Este QR apunta a:</p>
      <p className="mb-4 break-all rounded-lg bg-[var(--surface-muted)] px-3 py-2 font-mono text-xs">/lote/{lote.id}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to={`/lote/${lote.id}`} target="_blank">
          <Button variant="outline">Ver ficha pública</Button>
        </Link>
        <Link to="/trazabilidad/lote-empaque">
          <Button>Registrar otro lote</Button>
        </Link>
      </div>
    </Card>
  );
}
