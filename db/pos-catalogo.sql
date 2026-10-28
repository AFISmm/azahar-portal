-- Catálogo inicial del POS (tomado de azahar-pos/lib/data/catalog.ts). Pesos COP enteros.
-- Idempotente: no pisa lo que ya exista, así que no deshace cambios hechos desde el portal.
-- Los precios son de DEMO (la carta pública de Azahar no los publica): ajústalos antes de operar.

insert into pos_categorias (id, nombre, orden) values
  ('cat-caliente', 'CAFÉ CALIENTE', 1),
  ('cat-frio', 'CAFÉ FRÍO', 2),
  ('cat-grano', 'CAFÉ EN GRANO Y MOLIDO', 3),
  ('cat-suscripciones', 'SUSCRIPCIONES DE CAFÉ', 4),
  ('cat-desayunos', 'DESAYUNOS', 5),
  ('cat-reposteria', 'REPOSTERÍA', 6),
  ('cat-sin-cafe', 'BEBIDAS SIN CAFÉ', 7),
  ('cat-extras', 'EXTRAS Y ADICIONES', 8),
  ('cat-mercancia', 'MERCANCÍA', 9)
on conflict (id) do nothing;

insert into pos_productos (id, categoria_id, nombre, descripcion, precio_base, gravable) values
  ('prod-espresso', 'cat-caliente', 'Espresso', 'Doble shot de espresso, tueste de la casa.', 6000, true),
  ('prod-americano', 'cat-caliente', 'Americano', 'Espresso alargado con agua caliente.', 7000, true),
  ('prod-latte', 'cat-caliente', 'Latte', 'Espresso con leche vaporizada y capa fina de espuma.', 9500, true),
  ('prod-cappuccino', 'cat-caliente', 'Cappuccino', 'Espresso, leche vaporizada y espuma en partes iguales.', 9500, true),
  ('prod-flatwhite', 'cat-caliente', 'Flat White', 'Doble ristretto con leche vaporizada, textura sedosa.', 10000, true),
  ('prod-macchiato', 'cat-caliente', 'Macchiato', 'Espresso ''manchado'' con un toque de espuma de leche.', 8000, true),
  ('prod-coldbrew', 'cat-frio', 'Cold Brew', 'Café de extracción en frío 16 horas, servido sobre hielo.', 10500, true),
  ('prod-latte-helado', 'cat-frio', 'Latte Helado', 'Espresso, leche fría y hielo.', 10500, true),
  ('prod-frappe', 'cat-frio', 'Frappé Azahar', 'Café frappé batido con hielo y leche.', 11500, true),
  ('prod-grano-huila-340', 'cat-grano', 'Edición Especial Huila 340g', 'Café de origen único del Huila, tueste medio. Bolsa 340g.', 32000, true),
  ('prod-grano-huila-500', 'cat-grano', 'Edición Especial Huila 500g', 'Café de origen único del Huila, tueste medio. Bolsa 500g.', 44000, true),
  ('prod-grano-arcoiris-340', 'cat-grano', 'Arcoíris 340g', 'Blend Arcoíris, perfil dulce y equilibrado. Bolsa 340g.', 30000, true),
  ('prod-grano-arcoiris-500', 'cat-grano', 'Arcoíris 500g', 'Blend Arcoíris, perfil dulce y equilibrado. Bolsa 500g.', 41000, true),
  ('prod-grano-fruta-340', 'cat-grano', 'Fruta 340g', 'Perfil frutal y acidez brillante, notas a fruta madura. Bolsa 340g.', 33000, true),
  ('prod-grano-verde-500', 'cat-grano', 'Café Verde 500g', 'Café verde (sin tostar) para tueste casero. Bolsa 500g.', 28000, true),
  ('prod-suscripcion-340', 'cat-suscripciones', 'Suscripción mensual 340g', 'Envío mensual de 340g del café que elijas. Se factura cada ciclo.', 32000, true),
  ('prod-suscripcion-500', 'cat-suscripciones', 'Suscripción mensual 500g', 'Envío mensual de 500g del café que elijas. Se factura cada ciclo.', 44000, true),
  ('prod-desayuno-huevos', 'cat-desayunos', 'Huevos al Gusto con Arepa', 'Huevos al gusto, arepa asada y queso.', 14000, true),
  ('prod-desayuno-sandwich', 'cat-desayunos', 'Sándwich de Jamón y Queso', 'Pan artesanal, jamón y queso fundido, tostado.', 13500, true),
  ('prod-desayuno-tostadas', 'cat-desayunos', 'Tostadas con Aguacate', 'Pan artesanal tostado, aguacate y semillas.', 13000, true),
  ('prod-croissant', 'cat-reposteria', 'Croissant', 'Croissant de mantequilla horneado en el día.', 6500, true),
  ('prod-muffin', 'cat-reposteria', 'Muffin de Arándanos', 'Muffin casero de arándanos.', 6000, true),
  ('prod-brownie', 'cat-reposteria', 'Brownie', 'Brownie de chocolate individual.', 6500, true),
  ('prod-almojabana', 'cat-reposteria', 'Almojábana', 'Almojábana tradicional, recién horneada.', 4500, true),
  ('prod-chocolate', 'cat-sin-cafe', 'Chocolate Caliente', 'Chocolate caliente con leche.', 8500, true),
  ('prod-te', 'cat-sin-cafe', 'Té Caliente', 'Selección de tés e infusiones.', 6500, true),
  ('prod-limonada', 'cat-sin-cafe', 'Limonada de Coco', 'Limonada natural con coco.', 9000, true),
  ('prod-agua', 'cat-sin-cafe', 'Agua Embotellada', 'Agua embotellada.', 3500, true),
  ('prod-extra-shot', 'cat-extras', 'Shot Extra de Espresso', 'Shot adicional de espresso para cualquier bebida.', 3000, true),
  ('prod-extra-jarabe', 'cat-extras', 'Jarabe Saborizante', 'Vainilla, caramelo o avellana.', 2000, true),
  ('prod-empaque-para-llevar', 'cat-extras', 'Empaque para Llevar', 'Servilletas, cubiertos desechables y contenedor — se agrega solo al marcar "para llevar".', 0, false),
  ('prod-merch-vaso', 'cat-mercancia', 'Vaso Reutilizable Azahar', 'Vaso térmico de marca, 350ml.', 38000, true),
  ('prod-merch-bolsa', 'cat-mercancia', 'Bolsa de Tela Azahar', 'Bolsa de tela de marca.', 25000, true)
on conflict (id) do nothing;

-- Tipo de Leche (opcional, máx. 1) en todas las bebidas con leche.
insert into pos_grupos_modificador (id, producto_id, nombre, min_selecciones, max_selecciones, obligatorio)
select 'gm-leche-' || p, p, 'Tipo de Leche', 0, 1, false
from unnest(array['prod-latte', 'prod-cappuccino', 'prod-flatwhite', 'prod-macchiato', 'prod-latte-helado', 'prod-frappe', 'prod-chocolate']) as p
on conflict (id) do nothing;

insert into pos_modificadores (id, grupo_id, nombre, precio_delta, tipo)
select 'mod-leche-' || l.slug || '-' || p || '-' || l.idx, 'gm-leche-' || p, l.nombre, l.delta, 'agregar'
from unnest(array['prod-latte', 'prod-cappuccino', 'prod-flatwhite', 'prod-macchiato', 'prod-latte-helado', 'prod-frappe', 'prod-chocolate']) as p
cross join (values
  (0, 'leche-entera', 'Leche Entera', 0),
  (1, 'leche-deslactosada', 'Leche Deslactosada', 0),
  (2, 'leche-de-almendra', 'Leche de Almendra', 2500),
  (3, 'leche-de-avena', 'Leche de Avena', 2500),
  (4, 'leche-de-coco', 'Leche de Coco', 2500)
) as l (idx, slug, nombre, delta)
on conflict (id) do nothing;

-- Shot Extra (opcional, hasta 2) en todas las bebidas a base de espresso.
insert into pos_grupos_modificador (id, producto_id, nombre, min_selecciones, max_selecciones, obligatorio)
select 'gm-shot-' || p, p, 'Shot Extra de Espresso', 0, 2, false
from unnest(array['prod-espresso', 'prod-americano', 'prod-latte', 'prod-cappuccino', 'prod-flatwhite', 'prod-macchiato', 'prod-coldbrew', 'prod-latte-helado', 'prod-frappe']) as p
on conflict (id) do nothing;

insert into pos_modificadores (id, grupo_id, nombre, precio_delta, tipo)
select 'mod-shot-' || p, 'gm-shot-' || p, 'Shot Extra de Espresso', 3000, 'agregar'
from unnest(array['prod-espresso', 'prod-americano', 'prod-latte', 'prod-cappuccino', 'prod-flatwhite', 'prod-macchiato', 'prod-coldbrew', 'prod-latte-helado', 'prod-frappe']) as p
on conflict (id) do nothing;

-- Tamaño obligatorio del chocolate caliente.
insert into pos_grupos_modificador (id, producto_id, nombre, min_selecciones, max_selecciones, obligatorio)
values ('gm-size-chocolate', 'prod-chocolate', 'Size', 1, 1, true)
on conflict (id) do nothing;

insert into pos_modificadores (id, grupo_id, nombre, precio_delta, tipo) values
  ('mod-size-chocolate-regular', 'gm-size-chocolate', 'Regular', 0, 'agregar'),
  ('mod-size-chocolate-grande', 'gm-size-chocolate', 'Grande', 1500, 'agregar')
on conflict (id) do nothing;
