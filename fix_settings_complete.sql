-- ======================================
-- COMPLETE FIX for site_settings RLS
-- Run this ENTIRE script in Supabase SQL Editor
-- ======================================

-- Step 1: Check if table exists, if not create it
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Drop ALL existing policies (ignore errors if they don't exist)
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can read settings" ON site_settings;
    DROP POLICY IF EXISTS "Authenticated can update settings" ON site_settings;
    DROP POLICY IF EXISTS "Authenticated can insert settings" ON site_settings;
    DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
    DROP POLICY IF EXISTS "authenticated_insert_settings" ON site_settings;
    DROP POLICY IF EXISTS "authenticated_update_settings" ON site_settings;
    DROP POLICY IF EXISTS "allow_all_for_authenticated" ON site_settings;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Some policies did not exist, continuing...';
END $$;

-- Step 3: Completely disable RLS temporarily
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- Step 4: Revoke and re-grant permissions
REVOKE ALL ON site_settings FROM PUBLIC;
REVOKE ALL ON site_settings FROM anon;
REVOKE ALL ON site_settings FROM authenticated;

GRANT SELECT ON site_settings TO anon;
GRANT ALL ON site_settings TO authenticated;

-- Step 5: Re-enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Step 6: Create simple, permissive policies
-- Allow ANYONE to read (for public site)
CREATE POLICY "allow_public_read" ON site_settings
    FOR SELECT
    TO PUBLIC
    USING (true);

-- Allow authenticated users to do ANYTHING
CREATE POLICY "allow_authenticated_all" ON site_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Step 7: Insert default row if not exists
INSERT INTO site_settings (id, settings, updated_at) 
VALUES ('main', '{}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;

-- Step 8: Verify setup
SELECT 'Table and policies created successfully!' as status;

-- Show existing policies
SELECT policyname, cmd, permissive, roles 
FROM pg_policies 
WHERE tablename = 'site_settings';

-- Show table data
SELECT * FROM site_settings;
