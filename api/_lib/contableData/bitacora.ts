// Documentación de la sesión de trabajo contable (20–28 de octubre de 2026): qué se hizo, qué quedó
// pendiente y con qué scripts. Se mantiene a mano; los datos numéricos vienen de los demás módulos generados.

export type EstadoHito = "hecho" | "listo-no-subido" | "bloqueado" | "pendiente";

export const BITACORA = {
  actualizado: "2026-11-09",
  hitos: [
    {
      id: "catalogo-alegra",
      fecha: "2026-10-27",
      area: "Catálogo de productos",
      titulo: "Productos corregidos y creados en Alegra",
      estado: "hecho" as EstadoHito,
      detalle:
        "7 precios corregidos (6 pines y Tote Bag Colombia) y 2 SKU igualados (kits Método 3 y 4). Se crearon 11 productos nuevos (IDs 64 a 74): 4 activos con precio y 7 inactivos sin precio. El Gesha (ID 64) resultó duplicado del ID 54 y está pendiente de eliminar. Cada producto editado tiene copia del original en 05_DATOS_INTERMEDIOS/_backup_items/.",
    },
    {
      id: "sync-martes",
      fecha: "2026-10-27",
      area: "Catálogo de productos",
      titulo: "Sincronización semanal archivo → Alegra (martes 5:00 p. m.)",
      estado: "hecho" as EstadoHito,
      detalle:
        "Tarea de Windows 'Azahar - Actualizar catalogo OneDrive (martes 5pm)'. Lee Archivofinalmm271026.xlsx del OneDrive de felipe.serna@mercurymethods.com y actualiza Alegra (precio, SKU, productos nuevos con IVA 5%). Primera ejecución: 3-nov-2026. Solo corre si el computador está encendido y con OneDrive abierto.",
    },
    {
      id: "cuentas-2025",
      fecha: "2026-10-20",
      area: "Balance 2025",
      titulo: "Cuentas contables creadas en Alegra",
      estado: "hecho" as EstadoHito,
      detalle: "Se crearon 370501 (id 10805), 51159501 (id 10806) y 53152002 (id 10807). La cuenta 2335950101 se mapea a la existente 23359501. Las subcuentas 17102801, 51552001 y 52991001 las creó el equipo.",
    },
    {
      id: "contactos-balance-2025",
      fecha: "2026-11-09",
      area: "Terceros",
      titulo: "Contactos del balance 2025 creados en Alegra",
      estado: "hecho" as EstadoHito,
      detalle:
        "Alegra volvió a permitir crear contactos (el error 502 ya no aparece). Quedaron 2.660 contactos listos: 2.644 creados y 8 que ya existían, cada uno confirmado por Alegra. Faltan 13 NIT de identificación dudosa (85 líneas sin tercero) que debe confirmar Consuelo.",
    },
    {
      id: "balance-2025",
      fecha: "2026-11-09",
      area: "Balance 2025",
      titulo: "Balance 2025 publicado en Alegra (22.591 líneas en 30 comprobantes)",
      estado: "hecho" as EstadoHito,
      detalle:
        "Alegra no aceptó un comprobante único por tamaño, así que se publicó en 30 comprobantes del 31-dic-2025. Débitos y créditos iguales ($45.105.962.947) y saldo por cuenta y tercero igual al archivo en las 21.665 combinaciones. Dos cuentas las asignó Mercury Methods por criterio y requieren visto bueno de Consuelo: costo de ventas 61 en 61010501 y utilidad del ejercicio 3605 en 36050501.",
    },
    {
      id: "terceros-eneromar",
      fecha: "2026-11-09",
      area: "Terceros",
      titulo: "Terceros en comprobantes de enero–marzo 2026",
      estado: "hecho" as EstadoHito,
      detalle:
        "1.378 de 1.382 comprobantes de enero a marzo quedaron con tercero asignado (solo a líneas inequívocas); revisada una muestra de 40 directamente en Alegra. Los 4 restantes (L 020, L 021, L 023 y L 024) no se pudieron editar porque usan la cuenta de costo de ventas, deshabilitada para movimientos: Yuly debe reactivarla un momento o editarlos a mano.",
    },
    {
      id: "nomina",
      fecha: "2026-11-09",
      area: "Nómina",
      titulo: "Pagos de nómina del Banco de Bogotá (47 asientos publicados)",
      estado: "hecho" as EstadoHito,
      detalle:
        "47 asientos publicados por $549.398.130 (abril a septiembre, sin GMF): débito Salarios por pagar / crédito Banco de Bogotá 904. El total en Alegra coincide con lo esperado; diferencia de $0,15 por redondeo. Del total de 51 pagos dispersados, 4 ya estaban registrados como vacaciones y se excluyeron.",
    },
    {
      id: "ventas-modelo-consuelo",
      fecha: "2026-11-09",
      area: "Ventas y comprobantes",
      titulo: "Ventas de tiendas con el modelo de Consuelo: prueba con septiembre",
      estado: "pendiente" as EstadoHito,
      detalle:
        "392 comprobantes nuevos publicados en Alegra para septiembre. Siguen abiertos los 134 comprobantes diarios viejos ($703,4 M): la conexión automática de Alegra no permite anularlos (lista en Excel disponible). Falta que Consuelo valide septiembre y responda 5 dudas (cuenta de ICO, caja general, anular o eliminar), revertir el registro automático de las 6.428 facturas sincronizadas y extender el modelo de abril a agosto.",
    },
    {
      id: "conciliacion",
      fecha: "2026-10-26",
      area: "Conciliaciones",
      titulo: "Conciliación Bancolombia 0590 (abril–septiembre)",
      estado: "listo-no-subido" as EstadoHito,
      detalle:
        "Los 2.301 movimientos cuadran con el extracto en los 6 meses. Monto unificado de 53051501 (comisiones) y 42100501 (intereses) por mes. Cobros de 13050501: 352 pagos individuales (280 con factura del mismo valor, 159 de ellos con varias candidatas) y 510 abonos de datáfono sin cruce 1 a 1.",
    },
    {
      id: "retenciones",
      fecha: "2026-10-23",
      area: "Cargue de facturas",
      titulo: "Retenciones de facturas de compra (TRO RETENCION)",
      estado: "hecho" as EstadoHito,
      detalle:
        "Se copiaron las columnas AJ–AU de la pestaña 'A CONTB' (PUC, base, % y monto de RTEFTE, RTEICA y RTEIVA) a 'HOJA BASE', línea por línea, en las columnas AR–BC. 2.305 líneas; los totales coinciden con el origen (Retefuente $2.695.036, Reteica $312.738, Reteiva $87.649).",
    },
  ],
  /**
   * Línea de tiempo desde diciembre de 2016 hasta hoy: cierres contables históricos, años pendientes y el trabajo de
   * 2026. Los números de comprobante (journal) son los de Alegra; los montos, los publicados en cada comprobante.
   */
  lineaTiempo: [
    { fecha: "2016-12-31", area: "Cierres históricos", titulo: "Cierre 2016: balance de cierre", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114596 (id 114607), 33 líneas, $1.041.677.342 balanceado. Fuente: balance de prueba de diciembre 2016 de Siigo (42 cuentas de nivel más detallado; 9 con saldo $0 se excluyeron). Se crearon 4 cuentas que faltaban en Alegra." },
    { fecha: "2016-12-31", area: "Cierres históricos", titulo: "Cierre 2016: ajuste (segunda pasada)", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114597 (id 114608). Compara el balance de Siigo con el saldo real de Alegra por cuenta. Al publicarse (13-oct-2026) tenía 24 líneas y $1.061.406.203; hoy en Alegra figura con 28 líneas y $1.962.416.793 (fue modificado después)." },
    { fecha: "2017-12-31", area: "Cierres históricos", titulo: "Cierre 2017: ajuste de saldos", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114598 (id 114610), 1.152 líneas (369 cuentas), $3.234.383.154. Una cuenta de $258.577.485 es un control automático de Alegra (ajustes de inventario): se usó una cuenta puente temporal; falta identificar su origen con soporte de Alegra." },
    { fecha: "2018-12-31", area: "Cierres históricos", titulo: "Cierre 2018: ajuste de saldos", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114600 (id 114613), 247 líneas, $3.399.832.395. Mismo tratamiento de cuenta puente para un saldo de $592.471.523." },
    { fecha: "2019-12-31", area: "Cierres históricos", titulo: "Cierre 2019: ajuste de saldos", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114603 (id 114617), 77 líneas, $833.419.835. Se crearon 2 cuentas nuevas." },
    { fecha: "2020-12-31", area: "Cierres históricos", titulo: "Cierres 2020, 2021 y 2022", estado: "pendiente" as EstadoHito, detalle: "Sin cierre publicado en Alegra. Estimado: una jornada de trabajo por año una vez se definan los años a cerrar." },
    { fecha: "2023-12-31", area: "Cierres históricos", titulo: "Cierre 2023: ajuste parcial", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114607 (id 114625). Parcial: solo 8 de 44 líneas (2,1% del valor) porque el archivo trae códigos de Siigo a nivel de grupo; con cuenta puente. Al publicarse tenía 9 líneas y $90.961.763; hoy en Alegra figura con 4 líneas y $26.663.801 (fue modificado después)." },
    { fecha: "2024-12-31", area: "Cierres históricos", titulo: "Cierre 2024: ajuste de saldos", estado: "hecho" as EstadoHito, detalle: "Comprobante AC-114608 (id 114627), 180 líneas, $5.245.904.607, con cuenta puente. Fuente: nc 2024.xlsx (cuentas de Alegra ya asignadas por el equipo de Azahar)." },
    { fecha: "2025-12-31", area: "Balance 2025", titulo: "Balance 2025 publicado (22.591 líneas en 30 comprobantes)", estado: "hecho" as EstadoHito, detalle: "Por cuenta y tercero, $45.105.962.947 en débitos y en créditos. Publicado el 9-nov-2026 tras crear 2.660 contactos; pendiente el visto bueno de Consuelo sobre dos cuentas y 13 NIT dudosos." },
    { fecha: "2026-03-31", area: "Ventas y comprobantes", titulo: "Enero–marzo 2026: ventas diarias y comprobantes de Siigo", estado: "hecho" as EstadoHito, detalle: "2.039 comprobantes en Alegra: 473 de ventas diarias por sede (resumen DIAN), 1.565 del diario de Siigo (tipos P, R, F, G, L, N, J) y 1 de vacaciones. Ninguno tiene tercero asociado; se preparó la asignación (ver Terceros)." },
    { fecha: "2026-09-30", area: "Nómina", titulo: "Nómina abril–septiembre 2026", estado: "hecho" as EstadoHito, detalle: "6 comprobantes mensuales (AC-114541 a AC-114546, ids 114552–114557) con el desglose de BUK, 30 liquidaciones ($113.604.863) y 19 vacaciones ($24.705.360). Nómina electrónica ante la DIAN: no habilitada (403)." },
    { fecha: "2026-10-12", area: "Compras", titulo: "Reclasificación de compras de abril, mayo y julio", estado: "hecho" as EstadoHito, detalle: "761 facturas (2.316 líneas) con el detalle real de Siigo: 743 de 751 reclasificadas; 8 no se pudieron editar (estado cerrado) y 9 con información incompleta. Quedan 479 partidas por clasificar y 24 facturas cerradas." },
    { fecha: "2026-10-13", area: "Conciliaciones", titulo: "Auditoría de conciliación bancaria de las 6 cuentas", estado: "hecho" as EstadoHito, detalle: "30 extractos (Bancolombia, Banco de Bogotá, Davivienda 7043/7050/7999 y Fiducia) contra ventas de enero a septiembre, con control de calidad. En Bancolombia solo el 9,2% de las ventas tiene un depósito identificable." },
  ],
  decisiones: [
    "Cuentas acumulativas: usar la subcuenta de movimiento (aprobado).",
    "Balance 2025: los terceros se piden a la Sra. Consuelo; se suben los que tengan movimiento.",
    "GMF de los pagos de nómina: omitido.",
    "Catálogo: los precios nuevos de pines y Tote Bag fueron confirmados como correctos.",
    "El archivo del OneDrive manda: Alegra se actualiza desde él cada martes a las 5:00 p. m.",
    "Las 7 ediciones rotativas sin precio quedan inactivas (el equipo de Azahar dirá si vuelven).",
    "Método para evitar reprocesos: Consuelo aprueba cada frente en vista previa antes de publicar en Alegra.",
  ],
  pendientes: [
    { responsable: "Equipo Azahar", tarea: "Reporte de ventas del POS con IVA 5% y 19%, ICO y propinas.", bloquea: "Ventas de tiendas con el modelo definitivo" },
    { responsable: "Equipo Azahar", tarea: "Extractos de septiembre (Banco de Bogotá, Davivienda 7043/7050/7999, Fiducia) y reportes de PayU y Rappi.", bloquea: "Conciliación factura por factura" },
    { responsable: "Consuelo", tarea: "Validar septiembre (392 comprobantes nuevos) y responder 5 dudas: cuenta de ICO, caja general y si lo anterior se anula o se elimina.", bloquea: "Extender el modelo de ventas a abril–agosto" },
    { responsable: "Consuelo", tarea: "Confirmar 13 NIT del balance 2025 (85 líneas sin tercero).", bloquea: "Terceros completos del balance 2025" },
    { responsable: "Consuelo", tarea: "Aprobar dos cuentas: costo de ventas 61 en 61010501 y utilidad del ejercicio 3605 en 36050501.", bloquea: "Dar por bueno el balance 2025" },
    { responsable: "Consuelo y Yuly", tarea: "Clasificar 479 partidas de compras y revisar 24 facturas cerradas.", bloquea: "Cierre de compras" },
    { responsable: "Yuly", tarea: "Anular en Alegra los 134 comprobantes diarios viejos de septiembre, o pedir a Alegra que la conexión automática pueda anularlos.", bloquea: "Evitar septiembre duplicado" },
    { responsable: "Yuly", tarea: "Reactivar un momento la cuenta de costo de ventas, o editar a mano los 4 comprobantes L 020, L 021, L 023 y L 024.", bloquea: "Terceros de enero a marzo al 100%" },
    { responsable: "Catalina", tarea: "Aclarar 50 movimientos \"transferencia cta suc virtual\" por $24,1 M (hoy en caja menor).", bloquea: "Clasificación de la conciliación" },
    { responsable: "Azahar y Alegra", tarea: "Nómina electrónica ante la DIAN: Alegra responde error 403.", bloquea: "Cumplimiento tributario" },
    { responsable: "Equipo Azahar", tarea: "Confirmar si alguna de las 7 ediciones rotativas vuelve a venderse.", bloquea: "Precios del catálogo" },
    { responsable: "Felipe", tarea: "Eliminar el Gesha duplicado (ID 64) de Alegra y su fila 48 del archivo.", bloquea: "Limpieza del catálogo" },
    { responsable: "Mercury Methods", tarea: "Cierres contables de 2020, 2021 y 2022; reclasificar las cuentas puente de 2017, 2018, 2023 y 2024.", bloquea: "—" },
    { responsable: "Mercury Methods", tarea: "Revertir el registro automático de las 6.428 facturas sincronizadas (requiere el auxiliar de Alegra de un día).", bloquea: "—" },
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
    "Alegra respondió error 502 al crear contactos del 20-oct al 9-nov-2026 (resuelto el 9-nov).",
    "El cruce de cobros 13050501 con facturas es por valor y fecha: sin número de factura ni cliente en el dataset de ventas.",
    "La tarea de los martes depende de que el computador esté encendido y con OneDrive abierto.",
  ],
};
