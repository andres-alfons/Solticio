-- ============================================
-- PRODUCT IMAGES TABLE - Valentina Niebles
-- Multiple images per product (max 5)
-- ============================================

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_sort ON product_images(product_id, sort_order);

-- Enable Row Level Security
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert product images"
  ON product_images FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update product images"
  ON product_images FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete product images"
  ON product_images FOR DELETE
  USING (public.is_admin());

-- Constraint: max 5 images per product (enforced via trigger)
CREATE OR REPLACE FUNCTION check_max_product_images()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM product_images WHERE product_id = NEW.product_id) >= 5 THEN
    RAISE EXCEPTION 'Maximum 5 images per product';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_max_product_images ON product_images;
CREATE TRIGGER trg_max_product_images
  BEFORE INSERT ON product_images
  FOR EACH ROW
  EXECUTE FUNCTION check_max_product_images();

-- ============================================
-- DISCOUNTS: Add discount_percentage column to products
-- (if it doesn't already exist)
-- ============================================
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
