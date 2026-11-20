// Catálogo de «Cotiza tu plan». Precios de REFERENCIA (COP por mes, antes de IVA): no son tarifas
// comerciales confirmadas. El servidor de Metis Nexa recalcula SIEMPRE con su propio catálogo:
// aquí solo se muestra la estimación; al enviar solo viajan los ids elegidos.

export interface ProductoPlan {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

export const PRODUCTOS_PLAN: ProductoPlan[] = [
  { id: "pos", nombre: "Sistema POS", descripcion: "Ventas, caja, pagos y pedidos por sucursal.", precio: 890000 },
  { id: "kds", nombre: "Cocina (KDS)", descripcion: "Pantalla de cocina y enrutamiento por estación.", precio: 290000 },
  { id: "inventario", nombre: "Inventario y recetas", descripcion: "Insumos, recetas, menú y productos.", precio: 390000 },
  { id: "nomina", nombre: "Nómina", descripcion: "Corrida y desprendibles a partir de las horas del POS.", precio: 650000 },
  { id: "rrhh", nombre: "Recursos humanos", descripcion: "Empleados, marcaje (time clock) y horarios.", precio: 350000 },
  { id: "reportes", nombre: "Reportes y dashboards", descripcion: "Ventas por sucursal, periodo y producto.", precio: 320000 },
  { id: "analisis", nombre: "Análisis y asistente", descripcion: "Indicadores y consultas en lenguaje natural.", precio: 450000 },
  { id: "contabilidad", nombre: "Contabilidad (Alegra)", descripcion: "Sincronización de ventas con la contabilidad.", precio: 280000 },
  { id: "quickbooks", nombre: "Cheques QuickBooks", descripcion: "Consulta de cheques de nómina emitidos.", precio: 240000 },
  { id: "portal", nombre: "Portal de clientes", descripcion: "Subestación de datos, equipo y soporte por organización.", precio: 180000 },
];

export interface ServicioPlan {
  id: "mantenimiento" | "mesa";
  nombre: string;
  descripcion: string;
  /** Mantenimiento: porcentaje sobre las apps elegidas. Mesa de ayuda: valor fijo por mes. */
  tipo: "porcentaje" | "fijo";
  valor: number;
}

export const SERVICIOS_PLAN: ServicioPlan[] = [
  { id: "mantenimiento", nombre: "Mantenimiento de apps", descripcion: "Actualizaciones, ajustes y copias de seguridad. 12 % del valor de las apps elegidas.", tipo: "porcentaje", valor: 0.12 },
  { id: "mesa", nombre: "Mesa de ayuda 24/7", descripcion: "Atención todos los días, a toda hora, con respuesta prioritaria.", tipo: "fijo", valor: 590000 },
];

export const IVA_PLAN = 0.19;

export const IDS_PLAN_VALIDOS = new Set<string>([...PRODUCTOS_PLAN.map((p) => p.id), ...SERVICIOS_PLAN.map((s) => s.id)]);
