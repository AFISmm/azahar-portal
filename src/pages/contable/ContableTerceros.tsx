import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { contableApi } from "../../lib/contableApi";
import { AccesoDenegado, AvisoDemo, Cargando, ErrorCaja, Kpi, TD, TD_NUM, TH, Tabla, num, useCarga, usePermisoContable } from "./comunes";

export default function ContableTerceros() {
  const { tieneAcceso } = usePermisoContable();
  const { datos, error, cargando } = useCarga(() => contableApi.terceros());
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Terceros"
        description="Estado de los terceros del balance 2025 y de los comprobantes de enero a marzo. Aquí solo hay conteos: no se muestran NIT, correos ni teléfonos."
      />
      <AvisoDemo />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {datos && (
        <>
          <Card title="Balance 2025 (nota contable por tercero)">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Kpi etiqueta="Líneas del comprobante" valor={num(datos.balance2025.lineas)} />
              <Kpi etiqueta="Terceros distintos" valor={num(datos.balance2025.nitDistintos)} />
              <Kpi etiqueta="Faltan en Alegra" valor={num(datos.balance2025.faltantesEnAlegra)} nota={`${num(datos.balance2025.cubiertosPorListadoConsuelo)} con datos · ${num(datos.balance2025.sinDato)} sin dato`} />
              <Kpi etiqueta="Terceros en el listado" valor={num(datos.balance2025.tercerosListado)} />
            </div>
            <p className="mt-3 text-xs text-[var(--text-secondary)]">Fuente: {datos.balance2025.fuente}.</p>
            <p className="mt-1 rounded-lg bg-status-rechazada-bg px-3 py-2 text-xs text-status-rechazada">Bloqueo: {datos.balance2025.bloqueo}</p>
          </Card>

          <Card title="Comprobantes de enero a marzo 2026">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Kpi etiqueta="Comprobantes revisados" valor={num(datos.eneroMarzo.comprobantes)} nota="Ninguno tenía tercero asociado" />
              <Kpi etiqueta="Líneas analizadas" valor={num(datos.eneroMarzo.lineasAnalizadas)} />
              <Kpi etiqueta="Comprobantes a editar" valor={num(datos.eneroMarzo.comprobantesAEditar)} nota={`${num(datos.eneroMarzo.lineasAEditar)} líneas con NIT ya en Alegra`} />
              <Kpi etiqueta="NIT por crear" valor={num(datos.eneroMarzo.nitFaltantes)} nota={`${num(datos.eneroMarzo.nitYaEnAlegra)} de ${num(datos.eneroMarzo.nitInequivocos)} ya existen`} />
            </div>
            <div className="mt-4">
              <Tabla>
                <thead>
                  <tr>
                    <th className={TH}>Cruce con el auxiliar de Siigo</th>
                    <th className={`${TH} text-right`}>Líneas</th>
                    <th className={`${TH} text-right`}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.eneroMarzo.porClasificacion.map((c) => (
                    <tr key={c.clasificacion}>
                      <td className={TD}>{c.clasificacion}</td>
                      <td className={TD_NUM}>{num(c.lineas)}</td>
                      <td className={TD_NUM}>{((c.lineas / datos.eneroMarzo.lineasAnalizadas) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Tabla>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
