-- ============================================
-- SETUP COMPLETO: Storage + Tablas + Datos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. CREAR BUCKET DE STORAGE (product-images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. POLÍTICAS DE STORAGE (permitir uploads públicos)
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
CREATE POLICY "Allow public uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
CREATE POLICY "Allow public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;
CREATE POLICY "Allow public delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');

-- 3. DESACTIVAR RLS EN product_images PARA MIGRACIÓN
-- (Se puede reactivar después si se desea)
ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;

-- 4. INSERTAR TODOS LOS PRODUCTOS FALTANTES
INSERT INTO products (name, slug, category, price, stock, min_stock, status, description, discount_percentage)
VALUES
  ('Gardenia', 'gardenia', 'vestidos', 410000, 10, 2, 'activo', 'Vestido midi con estampado floral y mangas abullonadas.', 0),
  ('Imperio', 'imperio', 'conjuntos', 390000, 10, 2, 'activo', 'Conjunto elegante con pantalón palazzo y top con pedrería.', 0),
  ('Marfil', 'marfil', 'gala', 650000, 5, 1, 'activo', 'Vestido de alta costura en tono marfil con cristales Swarovski.', 0),
  ('Bohemia', 'bohemia', 'casual', 260000, 15, 3, 'activo', 'Conjunto casual con inspiración boho y tejidos artesanales.', 0),
  ('Medianoche', 'medianoche', 'gala', 780000, 5, 1, 'activo', 'Vestido de gala en chiffon negro con bordados dorados.', 0),
  ('Amanecer', 'amanecer', 'vestidos', 430000, 10, 2, 'activo', 'Vestido cóctel con degradé de colores cálidos y vuelo elegante.', 0),
  ('Clemencia', 'clemencia', 'alta-costura', 890000, 3, 1, 'activo', 'Vestido de alta costura confeccionado completamente a mano.', 0),
  ('Serena', 'serena', 'casual', 280000, 15, 3, 'activo', 'Conjunto casual elegante en lino con detalles de encaje.', 0),
  ('Ópalo', 'opalo', 'gala', 560000, 8, 2, 'activo', 'Vestido de fiesta con detalles iridiscentes y transparencias.', 0),
  ('Eclipse', 'eclipse', 'conjuntos', 420000, 10, 2, 'activo', 'Conjunto monocromático con juego de texturas y cortes asimétricos.', 0),
  ('Coral', 'coral', 'vestidos', 350000, 12, 2, 'activo', 'Vestido veraniego con estampado tropical y escote corazón.', 0),
  ('Dalia', 'dalia', 'alta-costura', 950000, 3, 1, 'activo', 'Vestido de novia en encaje francés con velo de tul bordado.', 0),
  ('Atardecer', 'atardecer', 'casual', 310000, 15, 3, 'activo', 'Conjunto casual chic con pantalón wide leg y blusa fluida.', 0),
  ('Azalea', 'azalea', 'vestidos', 370000, 10, 2, 'activo', 'Vestido cóctel con apliques florales y falda plisada.', 0),
  ('Carmín', 'carmin', 'gala', 620000, 8, 2, 'activo', 'Vestido de fiesta en rojo intenso con escote drapeado.', 0),
  ('Magnolia', 'magnolia', 'alta-costura', 820000, 3, 1, 'activo', 'Vestido de alta costura con corset y falda de tul en capas.', 0),
  ('Valentina', 'valentina', 'conjuntos', 550000, 8, 2, 'activo', 'Conjunto insignia de la marca con detalles artesanales únicos.', 0),
  ('Primavera', 'primavera', 'vestidos', 330000, 12, 2, 'activo', 'Vestido primaveral en colores vibrantes con vuelo romántico.', 0),
  ('Nieves', 'nieves', 'gala', 720000, 5, 1, 'activo', 'Vestido de gala en blanco roto con bordados de hilo dorado.', 0),
  ('Gala Platinum', 'gala-platinum', 'alta-costura', 1200000, 2, 1, 'activo', 'Vestido de alta costura en tonos metálicos.', 0)
ON CONFLICT (slug) DO NOTHING;

-- 5. VERIFICAR
SELECT COUNT(*) as total_productos FROM products;
