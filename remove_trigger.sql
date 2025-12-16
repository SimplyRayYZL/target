-- Remove the database trigger if it exists
-- This ensures that the database doesn't try to send emails, 
-- since the Frontend is now doing it directly.

DROP TRIGGER IF EXISTS on_order_created ON orders;
DROP FUNCTION IF EXISTS notify_admin_on_order();

-- Also ensure products are readable/updatable for stock management (Client-side logic)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view products (needed for checkout)
CREATE POLICY "Enable read access for all users" 
ON products FOR SELECT 
TO authenticated, anon 
USING (true);

-- Allow authenticated users to update stock (needed for Checkout.tsx logic)
-- Note: In a stricter app, we would use an RPC function, but this matches the current frontend code.
CREATE POLICY "Enable stock update for authenticated users" 
ON products FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

GRANT ALL ON products TO authenticated;
GRANT ALL ON products TO anon;
