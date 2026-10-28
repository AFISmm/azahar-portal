// Documentación de la sesión de trabajo contable (20–28 de octubre de 2026): qué se hizo, qué quedó
// pendiente y con qué scripts. Se mantiene a mano; los datos numéricos vienen de los demás módulos generados.

export type EstadoHito = "hecho" | "listo-no-subido" | "bloqueado";

export const BITACORA = {
  actualizado: "2026-10-28",
  hitos: [
    {
      id: "catalogo-alegra",
      area: "Catálogo de productos",
      titulo: "Productos corregidos y creados en Alegra",
      estado: "hecho" as EstadoHito,
      detalle:
        "7 precios corregidos (6 pines y Tote Bag Colombia) y 2 SKU igualados (kits Método 3 y 4). Se crearon 11 productos nuevos (IDs 64 a 74): 4 activos con precio y 7 inactivos sin precio. El Gesha (ID 64) resultó duplicado del ID 54 y está pendiente de eliminar. Cada producto editado tiene copia del original en 05_DATOS_INTERMEDIOS/_backup_items/.",
    },
    {
      id: "sync-martes",
      area: "Catálogo de productos",
      titulo: "Sincronización semanal archivo → Alegra (martes 5:00 p. m.)",
      estado: "hecho" as EstadoHito,
      detalle:
        "Tarea de Windows 'Azahar - Actualizar catalogo OneDrive (martes 5pm)'. Lee Archivofinalmm271026.xlsx del OneDrive de felipe.serna@mercurymethods.com y actualiza Alegra (precio, SKU, productos nuevos con IVA 5%). Primera ejecución: 3-nov-2026. Solo corre si el computador está encendido y con OneDrive abierto.",
    },
    {
      id: "cuentas-2025",
      area: "Balance 2025",
      titulo: "Cuentas contables creadas en Alegra",
      estado: "hecho" as EstadoHito,
      detalle: "Se crearon 370501 (id 10805), 51159501 (id 10806) y 53152002 (id 10807). La cuenta 2335950101 se mapea a la existente 23359501. Las subcuentas 17102801, 51552001 y 52991001 las creó el equipo.",
    },
    {
      id: "balance-2025",
      area: "Balance 2025",
      titulo: "Nota contable NC-002 (22.591 líneas) lista, sin subir",
      estado: "bloqueado" as EstadoHito,
      detalle:
        "Débitos − créditos = $0,11 → línea de crédito de $0,11 en 42958105 'Ajuste al peso'. Cuentas acumulativas se llevan a su subcuenta de movimiento (nombre idéntico; si hay empate, menor código). Faltan 2.673 contactos en Alegra; el archivo de la Sra. Consuelo cubre 2.346. Bloqueo: Alegra responde error 502 al crear contactos.",
    },
    {
      id: "terceros-eneromar",
      area: "Terceros",
      titulo: "Terceros en comprobantes de enero–marzo 2026",
      estado: "listo-no-subido" as EstadoHito,
      detalle:
        "Ninguno de los 2.039 comprobantes tenía tercero. Cruzados con el auxiliar de Siigo, el 75% de las líneas (4.233) se puede asignar con certeza. Script listo: 1.114 comprobantes / 2.615 líneas con NIT ya existentes en Alegra. Los 110 NIT que faltan esperan la creación de contactos.",
    },
    {
      id: "nomina",
      area: "Nómina",
      titulo: "Pagos de nómina del Banco de Bogotá (47 asientos)",
      estado: "listo-no-subido" as EstadoHito,
      detalle:
        "De 51 pagos dispersados: 4 ya estaban registrados como vacaciones (excluidos), 21 coinciden con liquidaciones y 26 son nómina mensual. Asiento: débito Salarios por pagar / crédito Banco de Bogotá 904, sin GMF. Causación mensual (abr–sep), 30 liquidaciones y 19 vacaciones ya estaban publicadas.",
    },
    {
      id: "conciliacion",
      area: "Conciliaciones",
      titulo: "Conciliación Bancolombia 0590 (abril–septiembre)",
      estado: "listo-no-subido" as EstadoHito,
      detalle:
        "Los 2.301 movimientos cuadran con el extracto en los 6 meses. Monto unificado de 53051501 (comisiones) y 42100501 (intereses) por mes. Cobros de 13050501: 352 pagos individuales (280 con factura del mismo valor, 159 de ellos con varias candidatas) y 510 abonos de datáfono sin cruce 1 a 1.",
    },
    {
      id: "retenciones",
      area: "Cargue de facturas",
      titulo: "Retenciones de facturas de compra (TRO RETENCION)",
      estado: "hecho" as EstadoHito,
      detalle:
        "Se copiaron las columnas AJ–AU de la pestaña 'A CONTB' (PUC, base, % y monto de RTEFTE, RTEICA y RTEIVA) a 'HOJA BASE', línea por línea, en las columnas AR–BC. 2.305 líneas; los totales coinciden con el origen (Retefuente $2.695.036, Reteica $312.738, Reteiva $87.649).",
    },
  ],
  decisiones: [
    "Cuentas acumulativas: usar la subcuenta de movimiento (aprobado).",
    "Balance 2025: los terceros se piden a la Sra. Consuelo; se suben los que tengan movimiento.",
    "GMF de los pagos de nómina: omitido.",
    "Catálogo: los precios nuevos de pines y Tote Bag fueron confirmados como correctos.",
    "El archivo del OneDrive manda: Alegra se actualiza desde él cada martes a las 5:00 p. m.",
    "Las 7 ediciones rotativas sin precio quedan inactivas (el equipo de Azahar dirá si vuelven).",
  ],
  pendientes: [
    { responsable: "Yuly", tarea: "Llamar a soporte de Alegra por el error 502 al crear contactos.", bloquea: "Balance 2025 y terceros de enero–marzo" },
    { responsable: "Equipo Azahar", tarea: "Confirmar si alguna de las 7 ediciones rotativas vuelve a venderse.", bloquea: "Precios del catálogo" },
    { responsable: "Equipo Azahar", tarea: "Extractos de septiembre (Banco de Bogotá, Davivienda 7043/7050/7999, Fiducia) y reportes de PayU y Rappi.", bloquea: "Conciliación factura por factura" },
    { responsable: "Equipo Azahar", tarea: "Confirmar si las 50 transferencias a caja menor ($24,1 M) son entre cuentas propias.", bloquea: "Clasificación de la conciliación" },
    { responsable: "Felipe", tarea: "Eliminar el Gesha duplicado (ID 64) de Alegra y su fila 48 del archivo.", bloquea: "Limpieza del catálogo" },
    { responsable: "Felipe", tarea: "Autorizar la publicación de los 47 asientos de nómina del Banco de Bogotá.", bloquea: "Pago de salarios por pagar" },
    { responsable: "Felipe", tarea: "Compartir el archivo del catálogo en OneDrive con el equipo de Azahar.", bloquea: "Edición del catálogo por Azahar" },
    { responsable: "Mercury Methods", tarea: "Crear 2.673 contactos y subir el balance 2025 cuando Alegra resuelva el 502.", bloquea: "—" },
    { responsable: "Mercury Methods", tarea: "Cierres contables de 2020 en adelante, 479 partidas de compras por clasificar y 24 facturas cerradas.", bloquea: "—" },
    { responsable: "Mercury Methods", tarea: "Nómina electrónica ante la DIAN (Alegra no tiene el módulo habilitado, 403).", bloquea: "—" },
  ],
  scripts: [
    { archivo: "04_SCRIPTS_MIGRACION/asignar_terceros_eneromar2026.py", uso: "Asigna el tercero a las líneas de los comprobantes de enero–marzo (--plan, --test <id>, --lote N). Hace copia y verifica cada edición." },
    { archivo: "04_SCRIPTS_MIGRACION/publicar_pago_nomina_bcobta.py", uso: "Publica los 47 asientos de pago de nómina (--lote N). Reanudable." },
    { archivo: "04_SCRIPTS_MIGRACION/actualizar_catalogo_alegra.py", uso: "Corrección de precios/SKU y creación de los 11 productos (una sola vez)." },
    { archivo: "04_SCRIPTS_MIGRACION/sincronizar_onedrive_a_alegra.py", uso: "Sincronización semanal archivo → Alegra (--plan para simular)." },
    { archivo: "04_SCRIPTS_MIGRACION/actualizar_archivo_catalogo_semanal.py", uso: "Versión anterior (Alegra → archivo). Sin uso." },
    { archivo: "04_SCRIPTS_MIGRACION/exportar_datos_portal_contable.py", uso: "Regenera los datos de este módulo a partir de los archivos del proyecto." },
  ],
  archivos: [
    { archivo: "Conciliacion_Bancolombia_0590_Abr-Sep2026.xlsx", descripcion: "Conciliación mensual, cuentas PUC por mes, unificado 53051501+42100501 y detalle de cobros 13050501." },
    { archivo: "TRO RETENCION_con_retenciones.xlsx", descripcion: "Facturas de compra con retenciones copiadas a HOJA BASE." },
    { archivo: "Archivofinalmm271026.xlsx", descripcion: "Catálogo de productos y mapeo de IDs de Alegra (fuente de la sincronización semanal)." },
    { archivo: "05_DATOS_INTERMEDIOS/_asientos_pago_nomina_bcobta_PREVIEW.json", descripcion: "Vista previa de los 47 asientos de pago de nómina." },
    { archivo: "05_DATOS_INTERMEDIOS/_cruce_terceros_eneromar2026.json", descripcion: "Cruce línea por línea de los comprobantes de enero–marzo con el auxiliar de Siigo." },
    { archivo: "05_DATOS_INTERMEDIOS/_terceros_siigo2025_consuelo.json", descripcion: "Datos de terceros del balance 2025 (contiene datos personales: no compartir)." },
  ],
  limitaciones: [
    "El portal muestra instantáneas de los resultados; no se conecta aún a Alegra en vivo.",
    "Alegra responde error 502 al crear contactos desde el 20-oct-2026.",
    "El cruce de cobros 13050501 con facturas es por valor y fecha: sin número de factura ni cliente en el dataset de ventas.",
    "La tarea de los martes depende de que el computador esté encendido y con OneDrive abierto.",
  ],
};
