import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Input, Select } from "../../components/ui";
import { contableApi, type ConciliacionBancolombia } from "../../lib/contableApi";
import { descargarCSV } from "../../lib/contableCarga";
import { formatDate } from "../../lib/format";
import { mesEtiquetaAIso, useFiltroFechas } from "../../lib/contableFechas";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, Notas, Pestanas, TD, TD_NUM, TH, Tabla, cop, num, pesos2, useCarga, usePermisoContable } from "./comunes";

type Vista = "mensual" | "cuentas" | "unificado" | "cobros";

export default function ContableConciliacion() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.conciliacion());
  const [vista, setVista] = useState<Vista>("mensual");

  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Conciliación bancaria"
        description={datos ? `${datos.cuenta} · ${datos.periodo}` : "Extracto bancario contra la contabilidad, por mes y cuenta PUC."}
      />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <Pestanas
            valor={vista}
            onCambiar={setVista}
            opciones={[
              { clave: "mensual", etiqueta: "Por mes" },
              { clave: "cuentas", etiqueta: "Cuentas PUC por mes" },
              { clave: "unificado", etiqueta: "53051501 + 42100501" },
              { clave: "cobros", etiqueta: "Cobros 13050501" },
            ]}
          />
          {vista === "mensual" && <Mensual d={datos} />}
          {vista === "cuentas" && <Cuentas d={datos} />}
          {vista === "unificado" && <Unificado d={datos} />}
          {vista === "cobros" && <Cobros d={datos} />}
          <Notas notas={datos.notas} />
          <p className="text-[11px] text-[var(--text-muted)]">Generado el {formatDate(datos.generado)}.</p>
        </>
      )}
    </div>
  );
}

/** Meses del extracto que caen dentro del filtro de fechas. */
function useMeses(d: ConciliacionBancolombia) {
  const filtro = useFiltroFechas();
  return d.mensual.filter((m) => {
    const iso = mesEtiquetaAIso(m.mes);
    return !iso || filtro.mesDentro(iso);
  });
}

function Mensual({ d }: { d: ConciliacionBancolombia }) {
  const meses = useMeses(d);
  const tot = (k: "abonos" | "cargos" | "movimientos") => meses.reduce((s, m) => s + m[k], 0);
  return (
    <Card title="Saldo calculado contra el extracto de cada mes">
      <Tabla>
        <thead>
          <tr>
            {["Mes", "Saldo anterior", "Abonos", "Cargos", "Saldo calculado", "Saldo extracto", "Diferencia", "Movimientos"].map((h) => (
              <th key={h} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meses.map((m) => (
            <tr key={m.mes}>
              <td className={TD}>{m.mes}</td>
              <td className={TD_NUM}>{pesos2(m.saldoAnterior)}</td>
              <td className={TD_NUM}>{pesos2(m.abonos)}</td>
              <td className={TD_NUM}>{pesos2(m.cargos)}</td>
              <td className={TD_NUM}>{pesos2(m.saldoCalculado)}</td>
              <td className={TD_NUM}>{pesos2(m.saldoExtracto)}</td>
              <td className={`${TD_NUM} font-semibold ${Math.abs(m.diferencia) < 1 ? "text-status-aprobada" : "text-status-rechazada"}`}>{pesos2(m.diferencia)}</td>
              <td className={TD_NUM}>{num(m.movimientos)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className={TD}>Total</td>
            <td className={TD_NUM} />
            <td className={TD_NUM}>{pesos2(tot("abonos"))}</td>
            <td className={TD_NUM}>{pesos2(tot("cargos"))}</td>
            <td className={TD_NUM} />
            <td className={TD_NUM} />
            <td className={TD_NUM} />
            <td className={TD_NUM}>{num(tot("movimientos"))}</td>
          </tr>
        </tbody>
      </Tabla>
    </Card>
  );
}

function Cuentas({ d }: { d: ConciliacionBancolombia }) {
  const meses = useMeses(d).map((m) => m.mes);
  const sumar = (c: ConciliacionBancolombia["cuentas"][number], k: "debito" | "credito") => meses.reduce((s, m) => s + (c.porMes[m]?.[k] ?? 0), 0);
  return (
    <Card
      title="Débitos y créditos por cuenta (columna K de la pestaña b)"
      actions={
        <Button
          variant="outline"
          className="px-3 py-1.5 text-xs"
          onClick={() =>
            descargarCSV("cuentas_puc_por_mes.csv", [
              ["Cuenta", "Nombre", ...meses.flatMap((m) => [`${m} Débito`, `${m} Crédito`]), "Total Débito", "Total Crédito"],
              ...d.cuentas.map((c) => [c.cuenta, c.nombre, ...meses.flatMap((m) => [c.porMes[m]?.debito ?? 0, c.porMes[m]?.credito ?? 0]), sumar(c, "debito"), sumar(c, "credito")]),
            ])
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
            <th className={TH}>Cuenta</th>
            <th className={TH}>Nombre</th>
            {meses.map((m) => (
              <th key={m} className={`${TH} text-right`} colSpan={1}>
                {m.replace(" 2026", "")}
                <span className="block text-[10px] font-normal normal-case">débito / crédito</span>
              </th>
            ))}
            <th className={`${TH} text-right`}>Total D / C</th>
          </tr>
        </thead>
        <tbody>
          {d.cuentas.map((c) => (
            <tr key={c.cuenta}>
              <td className={`${TD} font-semibold`}>{c.cuenta}</td>
              <td className={TD}>{c.nombre}</td>
              {meses.map((m) => (
                <td key={m} className={TD_NUM}>
                  {num(Math.round(c.porMes[m]?.debito ?? 0))} / {num(Math.round(c.porMes[m]?.credito ?? 0))}
                </td>
              ))}
              <td className={`${TD_NUM} font-semibold`}>
                {num(Math.round(sumar(c, "debito")))} / {num(Math.round(sumar(c, "credito")))}
              </td>
            </tr>
          ))}
        </tbody>
      </Tabla>
    </Card>
  );
}

function Unificado({ d }: { d: ConciliacionBancolombia }) {
  const filtro = useFiltroFechas();
  const filas = d.unificado.filter((m) => {
    const iso = mesEtiquetaAIso(m.mes);
    return !iso || filtro.mesDentro(iso);
  });
  const tot = (k: "comisiones" | "intereses" | "neto") => filas.reduce((s, m) => s + m[k], 0);
  return (
    <Card title="Gasto financiero neto: comisiones (53051501) menos intereses (42100501)">
      <Tabla>
        <thead>
          <tr>
            {["Mes", "53051501 Comisiones (débito)", "42100501 Intereses (crédito)", "Monto unificado"].map((h) => (
              <th key={h} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((m) => (
            <tr key={m.mes}>
              <td className={TD}>{m.mes}</td>
              <td className={TD_NUM}>{pesos2(m.comisiones)}</td>
              <td className={TD_NUM}>{pesos2(m.intereses)}</td>
              <td className={`${TD_NUM} font-semibold`}>{pesos2(m.neto)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className={TD}>Total</td>
            <td className={TD_NUM}>{pesos2(tot("comisiones"))}</td>
            <td className={TD_NUM}>{pesos2(tot("intereses"))}</td>
            <td className={TD_NUM}>{pesos2(tot("neto"))}</td>
          </tr>
        </tbody>
      </Tabla>
    </Card>
  );
}

function Cobros({ d }: { d: ConciliacionBancolombia }) {
  const filtro = useFiltroFechas();
  const meses = useMeses(d);
  const [mes, setMes] = useState("");
  const [estado, setEstado] = useState("");
  const [texto, setTexto] = useState("");
  const filtrados = useMemo(
    () => d.cobros.filter((c) => filtro.dentro(c.fecha) && (!mes || c.mes === mes) && (!estado || c.estado === estado) && (!texto || c.descripcion.toLowerCase().includes(texto.toLowerCase()))),
    [d.cobros, filtro, mes, estado, texto],
  );
  const ambiguos = d.cobros.filter((c) => filtro.dentro(c.fecha) && c.estado === "CONCILIADO" && c.candidatas > 1).length;
  return (
    <div className="space-y-4">
      <Card title="Resumen de cobros por mes">
        <Tabla>
          <thead>
            <tr>
              {["Mes", "Pagos individuales", "Valor", "Con factura", "Valor con factura", "Sin factura igual", "Valor sin factura", "Abonos datáfono", "Valor datáfono (neto)", "Ventas con tarjeta"].map((h) => (
                <th key={h} className={TH}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.resumenCobros.filter((m) => meses.some((x) => x.mes === m.mes)).map((m) => (
              <tr key={m.mes}>
                <td className={TD}>{m.mes}</td>
                <td className={TD_NUM}>{num(m.pagos)}</td>
                <td className={TD_NUM}>{cop(m.valor)}</td>
                <td className={TD_NUM}>{num(m.conciliados)}</td>
                <td className={TD_NUM}>{cop(m.valorConciliado)}</td>
                <td className={TD_NUM}>{num(m.sinFactura)}</td>
                <td className={TD_NUM}>{cop(m.valorSinFactura)}</td>
                <td className={TD_NUM}>{num(m.abonosDatafono)}</td>
                <td className={TD_NUM}>{cop(m.valorDatafono)}</td>
                <td className={TD_NUM}>{cop(m.ventasTarjeta)}</td>
              </tr>
            ))}
          </tbody>
        </Tabla>
        <p className="mt-3 text-xs text-[var(--text-secondary)]">
          De los pagos marcados como conciliados, {ambiguos} tenían más de una factura candidata con el mismo valor: el cruce es por valor y fecha, no por número de factura.
        </p>
      </Card>

      <Card
        title={`Detalle de cobros (${filtrados.length})`}
        actions={
          <Button
            variant="outline"
            className="px-3 py-1.5 text-xs"
            onClick={() =>
              descargarCSV("cobros_13050501.csv", [
                ["Mes", "Fecha", "Descripción", "Concepto", "Crédito banco", "Estado", "Factura", "Medio de pago DIAN", "Total factura", "Candidatas"],
                ...filtrados.map((c) => [c.mes, c.fecha, c.descripcion, c.concepto, c.credito, c.estado, c.factura, c.medioPago, c.totalFactura, c.candidatas]),
              ])
            }
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            CSV
          </Button>
        }
      >
        <div className="mb-3 grid gap-3 sm:grid-cols-3">
          <Select value={mes} onChange={(e) => setMes(e.target.value)} aria-label="Mes">
            <option value="">Todos los meses</option>
            {meses.map((m) => (
              <option key={m.mes}>{m.mes}</option>
            ))}
          </Select>
          <Select value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado">
            <option value="">Todos los estados</option>
            <option value="CONCILIADO">Conciliado</option>
            <option value="SIN FACTURA IGUAL">Sin factura igual</option>
          </Select>
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Buscar en la descripción…" aria-label="Buscar" />
        </div>
        <Tabla>
          <thead>
            <tr>
              {["Fecha", "Descripción", "Concepto", "Crédito", "Estado", "Factura", "Medio DIAN", "Candidatas"].map((h) => (
                <th key={h} className={TH}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.slice(0, 300).map((c, i) => (
              <tr key={`${c.fecha}-${c.descripcion}-${i}`}>
                <td className={TD}>{formatDate(c.fecha)}</td>
                <td className={TD}>{c.descripcion}</td>
                <td className={TD}>{c.concepto}</td>
                <td className={TD_NUM}>{cop(c.credito)}</td>
                <td className={`${TD} font-semibold ${c.estado === "CONCILIADO" ? "text-status-aprobada" : "text-status-rechazada"}`}>{c.estado === "CONCILIADO" ? "Conciliado" : "Sin factura igual"}</td>
                <td className={TD}>{c.factura ?? "—"}</td>
                <td className={TD}>{c.medioPago ?? "—"}</td>
                <td className={`${TD_NUM} ${c.candidatas > 1 ? "font-semibold text-status-pendiente" : ""}`}>{c.candidatas || "—"}</td>
              </tr>
            ))}
          </tbody>
        </Tabla>
        {filtrados.length > 300 && <p className="mt-2 text-xs text-[var(--text-muted)]">Se muestran los primeros 300; descarga el CSV para ver todos.</p>}
      </Card>
    </div>
  );
}
