import { useMemo, useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Input, Select } from "../../components/ui";
import { contableApi } from "../../lib/contableApi";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, Kpi, TD, TD_NUM, TH, Tabla, cop, num, useCarga, usePermisoContable } from "./comunes";

export default function ContableCatalogo() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.catalogo());
  const [situacion, setSituacion] = useState("");
  const [texto, setTexto] = useState("");

  const productos = useMemo(() => datos?.productos ?? [], [datos]);
  const situaciones = useMemo(() => [...new Set(productos.map((p) => p.situacion).filter(Boolean))], [productos]);
  const filtrados = useMemo(
    () => productos.filter((p) => (!situacion || p.situacion === situacion) && (!texto || `${p.nombre} ${p.sku ?? ""}`.toLowerCase().includes(texto.toLowerCase()))),
    [productos, situacion, texto],
  );
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader breadcrumb="Gestión Contable" title="Catálogo de productos" description="Productos de café en Alegra, cambios aplicados y reglas de la actualización semanal." />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi etiqueta="Productos en el archivo" valor={num(productos.length)} />
            <Kpi etiqueta="A la venta" valor={num(productos.filter((p) => p.situacion === "A la venta").length)} />
            <Kpi etiqueta="Sin ID en Alegra" valor={num(productos.filter((p) => p.id === null).length)} />
            <Kpi etiqueta="Cambios aplicados" valor={num(datos.cambiosAplicados.length)} />
          </div>

          <Card title="Actualización semanal">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {datos.sincronizacion.programacion} · {datos.sincronizacion.sentido}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Archivo fuente: {datos.archivo}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
              {datos.sincronizacion.reglas.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>

          <Card title="Cambios aplicados en Alegra">
            <ul className="divide-y divide-[var(--border-subtle)] text-sm">
              {datos.cambiosAplicados.map((c) => (
                <li key={c.detalle} className="flex gap-3 py-2">
                  <span className="w-14 shrink-0 text-xs font-bold uppercase text-accent-500">{c.tipo}</span>
                  <span>{c.detalle}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={`Productos (${filtrados.length})`}>
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Buscar por nombre o SKU…" aria-label="Buscar" />
              <Select value={situacion} onChange={(e) => setSituacion(e.target.value)} aria-label="Situación">
                <option value="">Todas las situaciones</option>
                {situaciones.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </div>
            <Tabla>
              <thead>
                <tr>
                  {["ID Alegra", "Producto", "SKU", "Situación", "Precio base", "Precio total"].map((h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p, i) => (
                  <tr key={`${p.id}-${p.nombre}-${i}`}>
                    <td className={TD}>{p.id ?? "—"}</td>
                    <td className={TD}>{p.nombre}</td>
                    <td className={TD}>{p.sku ?? "—"}</td>
                    <td className={TD}>{p.situacion || "—"}</td>
                    <td className={TD_NUM}>{p.precioBase === null ? "—" : cop(p.precioBase)}</td>
                    <td className={TD_NUM}>{p.precioTotal === null ? "—" : cop(p.precioTotal)}</td>
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
