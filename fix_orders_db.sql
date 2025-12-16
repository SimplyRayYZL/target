-- 1. Ensure Orders Table Exists
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'pending',
    total_amount DECIMAL,
    customer_name TEXT,
    phone TEXT,
    shipping_address TEXT,
    city TEXT,
    notes TEXT
);

-- 2. Ensure Order Items Table Exists
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name TEXT,
    quantity INTEGER,
    price_at_time DECIMAL
);

-- 3. Add columns if missing (Idempotent)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount DECIMAL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 4. Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies (Drop first to avoid conflicts)
DROP POLICY IF EXISTS "Authenticated users can insert orders" ON orders;
CREATE POLICY "Authenticated users can insert orders" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can select own orders" ON orders;
CREATE POLICY "Authenticated users can select own orders" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert order items" ON order_items;
CREATE POLICY "Authenticated users can insert order items" ON order_items FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Authenticated users can select own order items" ON order_items;
CREATE POLICY "Authenticated users can select own order items" ON order_items FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
);

-- 6. Grant Permissions
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;
