-- ============================================================================
-- Permisos por módulo (ver / editar), asignados desde Gestión de usuarios.
-- Reemplaza a empleados.rol (administrador del portal), permisos_trazabilidad y
-- permisos_pos como fuente de verdad. Idempotente.
--
-- Forma: {"pos": "editar", "trazabilidad": "ver", ...}. Módulos: negocio (gestión
-- estratégica/comercial/operativa/información general), rrhh (solicitudes,
-- incapacidades, documentos, empleados, nómina), usuarios, trazabilidad, pos.
-- 'editar' implica 'ver'. Las cuentas @mercurymethods.com tienen 'editar' en todos
-- los módulos siempre (se calcula en el servidor, ver api/_lib/acceso.ts).
-- ============================================================================

alter table empleados add column if not exists permisos_modulos jsonb not null default '{}'::jsonb;

-- Migra lo que ya existía, solo para filas que aún no tienen permisos por módulo.
update empleados set permisos_modulos = jsonb_strip_nulls(jsonb_build_object(
  'negocio', case when rol = 'admin' then 'editar' end,
  'rrhh', case when rol = 'admin' then 'editar' end,
  'usuarios', case when rol = 'admin' then 'editar' end,
  'trazabilidad', case when coalesce(cardinality(permisos_trazabilidad), 0) > 0 then 'editar' end,
  'pos', case when coalesce(cardinality(permisos_pos), 0) > 0 then 'editar' end
))
where permisos_modulos = '{}'::jsonb
  and (rol = 'admin' or coalesce(cardinality(permisos_trazabilidad), 0) > 0 or coalesce(cardinality(permisos_pos), 0) > 0);
