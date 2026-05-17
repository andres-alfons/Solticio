-- ============================================
-- FIX RLS POLICIES - Valentina Niebles
-- Run this in Supabase SQL Editor to fix 403 errors
-- ============================================

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Profiles: users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Profiles: users can update their own profile (including last_login)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Profiles: allow insert for new users (used by trigger and manual creation)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

-- Profiles: allow service role to manage all profiles (for triggers)
CREATE POLICY "Service role can manage all profiles"
  ON profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- Fix is_admin function to handle RLS properly
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'manager')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- Ensure notifications policy allows users to create their own notifications
DROP POLICY IF EXISTS "Users can insert own notifications" ON notifications;
CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
