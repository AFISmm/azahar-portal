import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Input, Select } from "../../components/ui";
import { contableApi, type RespuestaComprobantes } from "../../lib/contableApi";
import { descargarCSV } from "../../lib/contableCarga";
import { mesIsoAEtiqueta, useFiltroFechas } from "../../lib/contableFechas";
import { formatDate } from "../../lib/format";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, Kpi, TD, TD_NUM, TH, Tabla, cop, num, usePermisoContable } from "./comunes";

const ESTADOS: Record<string, string> = { open: "Abierto", void: "Anulado", "vista previa": "Vista previa (sin subir)" };

/** Comprobantes contables de Alegra desde diciembre de 2016, más los que están listos pero sin subir. */
export default function ContableComprobantes() {
  const { tieneAcceso } = usePermisoContable();
  const filtro = useFiltroFechas();
  const [q, setQ] = useState("");
  const [consulta, setConsulta] = useState("");
  const [estado, setEstado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [datos, setDatos] = useState<RespuestaComprobantes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // el texto se aplica con retardo para no consultar en cada tecla
  useEffect(() => {
    const t = setTimeout(() => {
      setConsulta(q);
      setPagina(1);
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setPagina(1);
  }, [filtro.desde, filtro.hasta, estado]);

  useEffect(() => {
    if (!tieneAcceso) return;
    let vigente = true;
    setCargando(true);
    contableApi
      .comprobantes({ desde: filtro.desde, hasta: filtro.hasta, q: consulta, estado, pagina })
      .then((d) => {
        if (!vigente) return;
        setDatos(d);
        setError(null);
      })
      .catch((e) => vigente && setError(e instanceof Error ? e.message : "No se pudo cargar."))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [tieneAcceso, filtro.desde, filtro.hasta, consulta, estado, pagina]);

  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Comprobantes contables"
        description="Detalle de los comprobantes de Alegra desde noviembre de 2025, los cierres contables destacados desde diciembre de 2016 y los que están listos para subir. Alegra tiene unos 114.000 comprobantes; los anteriores a noviembre de 2025 aún no se listan uno a uno. Usa el filtro de fechas de arriba."
      />
      <AvisoDemo />
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Comprobantes en el período" valor={num(datos.resumen.n)} nota={`de ${num(datos.totalGeneral)} en total`} />
            <Kpi etiqueta="Valor total" valor={cop(datos.resumen.total)} />
            <Kpi etiqueta="Líneas contables" valor={num(datos.resumen.lineas)} />
            <Kpi etiqueta="Líneas con tercero" valor={num(datos.resumen.conTercero)} nota={datos.resumen.lineas ? `${((datos.resumen.conTercero / datos.resumen.lineas) * 100).toFixed(1)}% de las líneas` : undefined} />
          </div>

          <Card title="Comprobantes por mes">
            <div className="max-h-64 overflow-y-auto">
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
                  {datos.porMes.map((m) => (
                    <tr key={m.mes}>
                      <td className={`${TD} capitalize`}>{mesIsoAEtiqueta(m.mes)}</td>
                      <td className={TD_NUM}>{num(m.n)}</td>
                      <td className={TD_NUM}>{cop(m.total)}</td>
                      <td className={TD_NUM}>{num(m.lineas)}</td>
                      <td className={TD_NUM}>{num(m.conTercero)}</td>
                    </tr>
                  ))}
                  {datos.porMes.length === 0 && (
                    <tr>
                      <td className={TD} colSpan={5}>
                        No hay comprobantes en este período.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Tabla>
            </div>
          </Card>

          <Card
            title={`Listado (${num(datos.filtrados)})`}
            actions={
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() =>
                  descargarCSV("comprobantes_pagina.csv", [
                    ["Fecha", "Número", "Observaciones", "Total", "Estado", "Líneas", "Líneas con tercero"],
                    ...datos.filas.map((c) => [c.fecha, c.numero, c.obs, c.total, ESTADOS[c.estado] ?? c.estado, c.lineas, c.conTercero]),
                  ])
                }
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                CSV de esta página
              </Button>
            }
          >
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por número u observaciones…" aria-label="Buscar" />
              <Select value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado">
                <option value="">Todos los estados</option>
                <option value="open">Abierto</option>
                <option value="void">Anulado</option>
                <option value="vista previa">Vista previa (sin subir)</option>
              </Select>
            </div>
            {cargando && <Cargando />}
            {!cargando && (
              <Tabla>
                <thead>
                  <tr>
                    {["Fecha", "Número", "Observaciones", "Total", "Estado", "Líneas", "Con tercero"].map((h) => (
                      <th key={h} className={TH}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datos.filas.map((c, i) => (
                    <tr key={`${c.id ?? c.numero ?? "p"}-${c.fecha}-${i}`}>
                      <td className={TD}>{formatDate(c.fecha)}</td>
                      <td className={`${TD} font-semibold`}>{c.numero ?? "—"}</td>
                      <td className={`${TD} max-w-md truncate`} title={c.obs}>
                        {c.obs || "—"}
                      </td>
                      <td className={TD_NUM}>{cop(c.total)}</td>
                      <td className={`${TD} font-semibold ${c.estado === "vista previa" ? "text-status-pendiente" : ""}`}>{ESTADOS[c.estado] ?? c.estado}</td>
                      <td className={TD_NUM}>{num(c.lineas)}</td>
                      <td className={`${TD_NUM} ${c.lineas > 0 && c.conTercero === 0 ? "text-[var(--text-muted)]" : ""}`}>{num(c.conTercero)}</td>
                    </tr>
                  ))}
                </tbody>
              </Tabla>
            )}
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>
                Página {datos.pagina} de {datos.paginas}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" className="px-2.5 py-1.5" disabled={datos.pagina <= 1} onClick={() => setPagina(datos.pagina - 1)} aria-label="Página anterior">
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                </Button>
                <Button variant="outline" className="px-2.5 py-1.5" disabled={datos.pagina >= datos.paginas} onClick={() => setPagina(datos.pagina + 1)} aria-label="Página siguiente">
                  <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
      {cargando && !datos && <Cargando />}
    </div>
  );
}
