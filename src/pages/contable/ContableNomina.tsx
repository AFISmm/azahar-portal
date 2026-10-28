import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Select } from "../../components/ui";
import { contableApi } from "../../lib/contableApi";
import { descargarCSV } from "../../lib/contableCarga";
import { formatDate } from "../../lib/format";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, Kpi, Notas, TD, TD_NUM, TH, Tabla, cop, num, useCarga, usePermisoContable } from "./comunes";

export default function ContableNomina() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.nomina());
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");

  const filtrados = useMemo(() => (datos?.pagos ?? []).filter((p) => (!estado || p.estado === estado) && (!tipo || p.tipo === tipo)), [datos, estado, tipo]);
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  const suma = (xs: typeof filtrados) => xs.reduce((s, p) => s + p.valor, 0);
  const aSubir = (datos?.pagos ?? []).filter((p) => p.estado === "vista previa");
  const excluidos = (datos?.pagos ?? []).filter((p) => p.estado === "excluido");
  const tipos = [...new Set((datos?.pagos ?? []).map((p) => p.tipo))];

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader breadcrumb="Gestión Contable" title="Pagos de nómina" description={datos ? datos.cuenta : "Pagos dispersados desde el banco y su asiento en Alegra."} />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Pagos del archivo" valor={num(datos.pagos.length)} />
            <Kpi etiqueta="Asientos por subir" valor={num(aSubir.length)} nota={cop(suma(aSubir))} />
            <Kpi etiqueta="Excluidos (ya registrados)" valor={num(excluidos.length)} nota={cop(suma(excluidos))} />
            <Kpi etiqueta="Publicados en Alegra" valor={num(datos.pagos.filter((p) => p.estado === "publicado").length)} />
          </div>
          <Card title="Asiento propuesto">
            <p className="text-sm text-[var(--text-secondary)]">{datos.asiento}</p>
            <div className="mt-3">
              <Notas notas={datos.notas} />
            </div>
          </Card>
          <Card
            title={`Pagos (${filtrados.length})`}
            actions={
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() => descargarCSV("pagos_nomina.csv", [["Fecha", "Valor", "GMF", "Referencia", "Tipo", "Estado", "Comprobante"], ...filtrados.map((p) => [p.fecha, p.valor, p.gmf, p.ref, p.tipo, p.estado, p.comprobante])])}
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                CSV
              </Button>
            }
          >
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <Select value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado">
                <option value="">Todos los estados</option>
                <option value="vista previa">Vista previa</option>
                <option value="publicado">Publicado</option>
                <option value="excluido">Excluido</option>
              </Select>
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Tipo">
                <option value="">Todos los tipos</option>
                {tipos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </div>
            <Tabla>
              <thead>
                <tr>
                  {["Fecha", "Valor", "GMF (no se contabiliza)", "Referencia", "Tipo", "Estado", "Comprobante"].map((h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => (
                  <tr key={`${p.fecha}-${p.ref}`}>
                    <td className={TD}>{formatDate(p.fecha)}</td>
                    <td className={TD_NUM}>{cop(p.valor)}</td>
                    <td className={TD_NUM}>{cop(p.gmf)}</td>
                    <td className={TD}>{p.ref}</td>
                    <td className={TD}>{p.tipo}</td>
                    <td className={`${TD} font-semibold`}>{p.estado}</td>
                    <td className={TD}>{p.comprobante ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
          </Card>
        </>
      )}
    </div>
  );
}
