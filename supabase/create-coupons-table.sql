-- Create user_coupons table to track coupon usage
CREATE TABLE IF NOT EXISTS user_coupons (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL,
  discount_percentage INT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_coupons ENABLE ROW LEVEL SECURITY;

-- Users can only see their own coupons
CREATE POLICY "Users can view own coupons" ON user_coupons
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own coupons
CREATE POLICY "Users can insert own coupons" ON user_coupons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own coupons
CREATE POLICY "Users can update own coupons" ON user_coupons
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role can manage all coupons
CREATE POLICY "Service role can manage all coupons" ON user_coupons
  USING (true) WITH CHECK (true);

-- Create function to check if user has unused coupon
CREATE OR REPLACE FUNCTION get_user_unused_coupon(p_user_id UUID)
RETURNS TABLE (
  coupon_code TEXT,
  discount_percentage INT
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT uc.coupon_code, uc.discount_percentage
  FROM user_coupons uc
  WHERE uc.user_id = p_user_id AND uc.used = FALSE
  LIMIT 1;
END;
$$;

-- Create function to mark coupon as used
CREATE OR REPLACE FUNCTION mark_coupon_used(p_user_id UUID, p_order_id TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_coupon_id BIGINT;
BEGIN
  SELECT id INTO v_coupon_id
  FROM user_coupons
  WHERE user_id = p_user_id AND used = FALSE
  LIMIT 1;

  IF v_coupon_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE user_coupons
  SET used = TRUE, used_at = NOW(), order_id = p_order_id
  WHERE id = v_coupon_id;

  RETURN TRUE;
END;
$$;

-- Grant anonymous access to the functions (for checking before login)
GRANT EXECUTE ON FUNCTION get_user_unused_coupon(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION mark_coupon_used(UUID, TEXT) TO anon, authenticated;
