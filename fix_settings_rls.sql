-- Fix site_settings RLS policies
-- Run this in Supabase SQL Editor

-- First, drop existing policies
DROP POLICY IF EXISTS "Anyone can read settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated can update settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated can insert settings" ON site_settings;

-- Disable and re-enable RLS to reset
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create proper policies
-- Allow anyone to read
CREATE POLICY "public_read_settings" ON site_settings
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert (for first-time setup)
CREATE POLICY "authenticated_insert_settings" ON site_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "authenticated_update_settings" ON site_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Grant full permissions to authenticated users
GRANT ALL ON site_settings TO authenticated;
GRANT SELECT ON site_settings TO anon;

-- Make sure the main settings row exists with empty settings
INSERT INTO site_settings (id, settings, updated_at) 
VALUES ('main', '{}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify the policies
SELECT 
    policyname, 
    cmd, 
    permissive
FROM pg_policies 
WHERE tablename = 'site_settings';

SELECT 'RLS policies fixed!' as message;
