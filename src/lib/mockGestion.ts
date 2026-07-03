// ---------------------------------------------------------------------------
// Datos de ejemplo para los módulos de "Gestión del negocio" (solo admin):
// Gestión Estratégica, Gestión Comercial e Información General. Gestión
// Operativa (nómina administrativa completa) usa datos reales de
// `dataSource`, no este archivo.
//
// Estos valores son ilustrativos para Azahar Coffee Company y no representan
// cifras financieras reales de ninguna compañía.
// ---------------------------------------------------------------------------

// ---- Gestión Estratégica ---------------------------------------------------

export interface KpiEstrategico {
  label: string;
  valor: string;
  detalle: string;
}

export const kpisEstrategicos: KpiEstrategico[] = [
  { label: "Crecimiento de ventas interanual", valor: "+18%", detalle: "vs. mismo periodo del año anterior" },
  { label: "Tiendas activas", valor: "6", detalle: "en 4 ciudades de Colombia" },
  { label: "NPS de clientes", valor: "72", detalle: "encuesta trimestral en tienda" },
  { label: "Retención de talento", valor: "91%", detalle: "personal activo a 12 meses" },
];

export interface IniciativaEstrategica {
  id: string;
  titulo: string;
  descripcion: string;
  responsable: string;
  progreso: number; // 0-100
}

export const iniciativasEstrategicas: IniciativaEstrategica[] = [
  {
    id: "okr-1",
    titulo: "Expansión a una nueva ciudad",
    descripcion: "Abrir la primera tienda Azahar en Bucaramanga, incluyendo estudio de ubicación y contratación local.",
    responsable: "Andrés Felipe Muñoz",
    progreso: 45,
  },
  {
    id: "okr-2",
    titulo: "Programa de fidelización digital",
    descripcion: "Lanzar una app de puntos y recompensas para clientes frecuentes en las 6 tiendas actuales.",
    responsable: "Daniela Sofía Ramírez",
    progreso: 68,
  },
  {
    id: "okr-3",
    titulo: "Certificación de origen sostenible",
    descripcion: "Obtener certificación de comercio justo para el 100% del café de las fincas proveedoras.",
    responsable: "María Camila Restrepo",
    progreso: 30,
  },
  {
    id: "okr-4",
    titulo: "Estandarización de la experiencia en tienda",
    descripcion: "Implementar un manual único de servicio y capacitación de barismo en todas las tiendas.",
    responsable: "Laura Valentina Torres",
    progreso: 82,
  },
  {
    id: "okr-5",
    titulo: "Automatización de reportes financieros",
    descripcion: "Migrar el cierre contable mensual a un tablero automatizado con menor intervención manual.",
    responsable: "Daniela Sofía Ramírez",
    progreso: 55,
  },
];

// ---- Gestión Comercial ------------------------------------------------------

export interface KpiComercial {
  label: string;
  valor: string;
  detalle: string;
}

export const kpisComerciales: KpiComercial[] = [
  { label: "Ventas del mes", valor: "$742.500.000", detalle: "todas las tiendas" },
  { label: "Ticket promedio", valor: "$28.400", detalle: "por transacción" },
  { label: "Producto más vendido", valor: "Café de origen Huila", detalle: "libra x 500g" },
  { label: "Tiendas activas", valor: "6", detalle: "0 cierres este mes" },
];

export type EstadoTienda = "activa" | "en remodelación";

export interface TiendaComercial {
  id: string;
  nombre: string;
  ciudad: string;
  ventasMes: number;
  estado: EstadoTienda;
}

export const tiendasComerciales: TiendaComercial[] = [
  { id: "tienda-1", nombre: "Azahar Poblado", ciudad: "Medellín", ventasMes: 168000000, estado: "activa" },
  { id: "tienda-2", nombre: "Azahar Parque Lleras", ciudad: "Medellín", ventasMes: 142500000, estado: "activa" },
  { id: "tienda-3", nombre: "Azahar Zona Rosa", ciudad: "Bogotá", ventasMes: 189300000, estado: "activa" },
  { id: "tienda-4", nombre: "Azahar Cali Norte", ciudad: "Cali", ventasMes: 98700000, estado: "activa" },
  { id: "tienda-5", nombre: "Azahar Manizales Centro", ciudad: "Manizales", ventasMes: 76400000, estado: "en remodelación" },
  { id: "tienda-6", nombre: "Azahar Pereira Plaza", ciudad: "Pereira", ventasMes: 67600000, estado: "activa" },
];

export interface ProductoTop {
  nombre: string;
  unidades: number;
}

export const productosTop: ProductoTop[] = [
  { nombre: "Café de origen Huila (libra)", unidades: 2140 },
  { nombre: "Cappuccino clásico", unidades: 1875 },
  { nombre: "Cold brew Azahar", unidades: 1320 },
];

// ---- Información General ---------------------------------------------------

export interface FechaCumplimiento {
  concepto: string;
  fecha: string;
  detalle: string;
}

export const calendarioFiscal: FechaCumplimiento[] = [
  { concepto: "Pago de parafiscales y seguridad social", fecha: "2026-07-15", detalle: "Aportes de julio, según los dos últimos dígitos del NIT." },
  { concepto: "Presentación de información exógena", fecha: "2026-07-31", detalle: "Reporte anual a la DIAN, según calendario por NIT." },
  { concepto: "Declaración y pago de IVA bimestral", fecha: "2026-08-11", detalle: "Bimestre 4 (julio-agosto) para responsables de IVA." },
  { concepto: "Declaración de renta de personas jurídicas", fecha: "2026-04-30", detalle: "Plazo general según los dos últimos dígitos del NIT (referencia año fiscal)." },
  { concepto: "Pago de prima de servicios", fecha: "2026-07-30", detalle: "Segunda prima legal del año para todos los empleados." },
];

export interface IndicadorEconomico {
  label: string;
  valor: string;
  detalle: string;
}

export const indicadoresEconomicos: IndicadorEconomico[] = [
  { label: "UVT vigente", valor: "$52.000", detalle: "Unidad de Valor Tributario, cifra de referencia 2026." },
  { label: "Salario mínimo legal vigente", valor: "$1.500.000", detalle: "Más auxilio de transporte, cifra de referencia 2026." },
  { label: "Tasa de cambio USD/COP", valor: "$4.050", detalle: "Tasa representativa del mercado, valor de referencia." },
  { label: "IPC anual", valor: "5,2%", detalle: "Variación anual del Índice de Precios al Consumidor." },
];
