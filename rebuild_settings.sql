-- ========================================================
-- COMPLETE REBUILD for site_settings
-- This script DROPS the existing table and recreates it
-- Run this ENTIRE script in Supabase SQL Editor
-- ========================================================

-- Step 1: Drop the existing table completely (this removes all policies too)
DROP TABLE IF EXISTS site_settings CASCADE;

-- Step 2: Create fresh table
CREATE TABLE site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Step 4: Create SIMPLE permissive policies

-- Policy 1: Allow ALL users (including anonymous) to SELECT
CREATE POLICY "public_select" 
    ON site_settings 
    FOR SELECT 
    USING (true);

-- Policy 2: Allow authenticated users to INSERT
CREATE POLICY "auth_insert" 
    ON site_settings 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Policy 3: Allow authenticated users to UPDATE
CREATE POLICY "auth_update" 
    ON site_settings 
    FOR UPDATE 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Policy 4: Allow authenticated users to DELETE (optional but useful)
CREATE POLICY "auth_delete" 
    ON site_settings 
    FOR DELETE 
    TO authenticated 
    USING (true);

-- Step 5: Grant permissions explicitly
GRANT SELECT ON site_settings TO anon;
GRANT SELECT ON site_settings TO authenticated;
GRANT INSERT ON site_settings TO authenticated;
GRANT UPDATE ON site_settings TO authenticated;
GRANT DELETE ON site_settings TO authenticated;
GRANT ALL ON site_settings TO service_role;

-- Step 6: Insert the initial row
INSERT INTO site_settings (id, settings, updated_at) 
VALUES ('main', '{}'::jsonb, NOW());

-- Step 7: Verify everything
SELECT 'Table created successfully!' as step1;

SELECT tablename, policyname, cmd, permissive, roles 
FROM pg_policies 
WHERE tablename = 'site_settings';

SELECT * FROM site_settings;
