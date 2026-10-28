import { useEffect, useState } from "react";
import { Download, FileUp } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";
import { descargarCSV, procesarArchivo, type Perfil, type Resultado } from "../../lib/contableCarga";
import { useFiltroFechas } from "../../lib/contableFechas";
import { AccesoDenegado, ErrorCaja, Kpi, Pestanas, TD, TD_NUM, TH, Tabla, cop, num, usePermisoContable } from "./comunes";

const AYUDA: Record<Perfil, { titulo: string; columnas: string; descripcion: string }> = {
  extracto: {
    titulo: "Extracto bancario",
    columnas: "Fecha · Descripción · Débito · Crédito · Cuenta PUC",
    descripcion: "Movimientos del banco con la cuenta contable asignada (como la pestaña b del archivo del Bancolombia). Resume por mes y por cuenta.",
  },
  facturas: {
    titulo: "Facturas (venta o compra)",
    columnas: "Fecha · Número · Tercero (o NIT) · Total · (opcional) Monto Retefte · Monto Reteica · Monto Reteiva",
    descripcion: "Listado de facturas. Resume por mes, detecta números repetidos y facturas sin tercero, y suma las retenciones si vienen.",
  },
};

export default function ContableCarga() {
  const { tieneAcceso } = usePermisoContable();
  const [perfil, setPerfil] = useState<Perfil>("extracto");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const fechas = useFiltroFechas();

  // El archivo cargado se vuelve a resumir cuando cambia el filtro de fechas (no se vuelve a leer).
  useEffect(() => {
    if (texto) setResultado(procesarArchivo(texto, perfil, { desde: fechas.desde, hasta: fechas.hasta }));
  }, [texto, perfil, fechas.desde, fechas.hasta]);

  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  async function alElegir(archivo: File | undefined) {
    if (!archivo) return;
    setNombre(archivo.name);
    setTexto(await archivo.text());
  }

  const ayuda = AYUDA[perfil];
  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Cargue de archivos"
        description="Sube un CSV y obtén el resumen por mes. El archivo se procesa en tu navegador: no se envía a ningún servidor ni se guarda."
      />
      <Pestanas
        valor={perfil}
        onCambiar={(p) => {
          setPerfil(p);
          setResultado(null);
          setNombre("");
          setTexto("");
        }}
        opciones={[
          { clave: "extracto", etiqueta: "Extracto bancario" },
          { clave: "facturas", etiqueta: "Facturas" },
        ]}
      />
      <Card title={ayuda.titulo}>
        <p className="text-sm text-[var(--text-secondary)]">{ayuda.descripcion}</p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Columnas esperadas: <strong>{ayuda.columnas}</strong>. Si tu archivo es Excel, guárdalo como <strong>CSV UTF-8</strong> (Archivo → Guardar como). Los encabezados se reconocen aunque tengan tildes o mayúsculas.
        </p>
        <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--border-subtle)] px-4 py-8 text-center transition hover:border-accent-500/60">
          <FileUp className="h-6 w-6 text-accent-500" strokeWidth={1.75} />
          <span className="text-sm font-semibold text-[var(--text-primary)]">{nombre || "Elegir archivo CSV"}</span>
          <input type="file" accept=".csv,text/csv,text/plain" className="sr-only" onChange={(e) => void alElegir(e.target.files?.[0])} />
        </label>
      </Card>

      {resultado && "error" in resultado && <ErrorCaja mensaje={resultado.error} />}
      {resultado && "meses" in resultado && resultado.perfil === "extracto" && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Movimientos válidos" valor={num(resultado.filas)} nota={resultado.invalidas.length ? `${resultado.invalidas.length} filas descartadas` : undefined} />
            <Kpi etiqueta="Total débitos (cargos)" valor={cop(resultado.totalDebito)} />
            <Kpi etiqueta="Total créditos (abonos)" valor={cop(resultado.totalCredito)} />
            <Kpi etiqueta="Sin cuenta PUC" valor={num(resultado.sinCuenta)} nota={resultado.sinCuenta ? "Asígnales cuenta antes de contabilizar" : "Todo tiene cuenta"} />
          </div>
          <Card
            title="Resumen por mes"
            actions={
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() => descargarCSV("resumen_extracto_por_mes.csv", [["Mes", "Movimientos", "Débito", "Crédito", "Neto"], ...resultado.meses.map((m) => [m.etiqueta, m.movimientos, m.debito, m.credito, m.neto])])}
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                CSV
              </Button>
            }
          >
            <Tabla>
              <thead>
                <tr>
                  {["Mes", "Movimientos", "Débito", "Crédito", "Neto (crédito − débito)"].map((h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultado.meses.map((m) => (
                  <tr key={m.mes}>
                    <td className={`${TD} capitalize`}>{m.etiqueta}</td>
                    <td className={TD_NUM}>{num(m.movimientos)}</td>
                    <td className={TD_NUM}>{cop(m.debito)}</td>
                    <td className={TD_NUM}>{cop(m.credito)}</td>
                    <td className={TD_NUM}>{cop(m.neto)}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
          </Card>
          <Card title="Por cuenta PUC">
            <Tabla>
              <thead>
                <tr>
                  {["Cuenta", "Total débito", "Total crédito"].map((h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultado.cuentas.map((c) => (
                  <tr key={c.cuenta}>
                    <td className={`${TD} font-semibold`}>{c.cuenta}</td>
                    <td className={TD_NUM}>{cop(c.totalDebito)}</td>
                    <td className={TD_NUM}>{cop(c.totalCredito)}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
          </Card>
        </>
      )}
      {resultado && "meses" in resultado && resultado.perfil === "facturas" && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Facturas válidas" valor={num(resultado.filas)} nota={resultado.invalidas.length ? `${resultado.invalidas.length} filas descartadas` : undefined} />
            <Kpi etiqueta="Total facturado" valor={cop(resultado.total)} />
            <Kpi etiqueta="Números repetidos" valor={num(resultado.duplicadas.length)} nota={resultado.duplicadas.slice(0, 3).join(", ") || undefined} />
            <Kpi etiqueta="Sin tercero" valor={num(resultado.sinTercero)} />
          </div>
          <Card
            title="Resumen por mes"
            actions={
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() =>
                  descargarCSV("resumen_facturas_por_mes.csv", [["Mes", "Facturas", "Total", "Retefuente", "Reteica", "Reteiva"], ...resultado.meses.map((m) => [m.etiqueta, m.facturas, m.total, m.retefuente, m.reteica, m.reteiva])])
                }
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                CSV
              </Button>
            }
          >
            <Tabla>
              <thead>
                <tr>
                  {["Mes", "Facturas", "Total", "Retefuente", "Reteica", "Reteiva"].map((h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultado.meses.map((m) => (
                  <tr key={m.mes}>
                    <td className={`${TD} capitalize`}>{m.etiqueta}</td>
                    <td className={TD_NUM}>{num(m.facturas)}</td>
                    <td className={TD_NUM}>{cop(m.total)}</td>
                    <td className={TD_NUM}>{cop(m.retefuente)}</td>
                    <td className={TD_NUM}>{cop(m.reteica)}</td>
                    <td className={TD_NUM}>{cop(m.reteiva)}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
          </Card>
        </>
      )}
      {resultado && "invalidas" in resultado && resultado.invalidas.length > 0 && (
        <Card title={`Filas descartadas (${resultado.invalidas.length})`}>
          <p className="text-xs text-[var(--text-secondary)]">
            {resultado.invalidas
              .slice(0, 15)
              .map((i) => `fila ${i.fila}: ${i.motivo}`)
              .join(" · ")}
            {resultado.invalidas.length > 15 ? " · …" : ""}
          </p>
        </Card>
      )}
    </div>
  );
}
