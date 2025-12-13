-- FreeAir Products Insert Script
-- Run this in Supabase SQL Editor after getting the FreeAir brand ID

-- First, get or create the FreeAir brand
INSERT INTO brands (name, name_ar, logo_url)
VALUES ('FreeAir', 'فري إير', 'https://3b-shop.com/wp-content/uploads/2021/08/free-air-logo.png')
ON CONFLICT (name) DO NOTHING;

-- Delete existing FreeAir products (optional - comment out if you want to keep them)
DELETE FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'FreeAir');

-- Insert FreeAir AS Series (Inverter)
INSERT INTO products (name, brand_id, price, old_price, capacity, type, model, description, features, is_active, stock, image_url)
VALUES 
-- AS-12HR - 1.5 HP
(
  'تكييف فري إير AS-12HR قدرة 1.5 حصان بارد ساخن انفرتر موفر للطاقة',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  14799,
  NULL,
  '1.5 حصان',
  'بارد/ساخن',
  'AS-12HR',
  'تكييف فري إير انفرتر 1.5 حصان بضمان 5 سنوات، يتميز بأقوى توفير للطاقة A+++ Class، مزود بخاصية البلازما، توزيع هوائي ثلاثي الأبعاد، يعمل حتى 60 درجة مئوية',
  ARRAY['ضمان 5 سنوات', 'A+++ Class توفير طاقة', 'تقنية البلازما', 'توزيع هوائي ثلاثي الأبعاد', 'يعمل على ضغط تيار منخفض', 'يعمل حتى 60°C'],
  true,
  10,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060143-7.jpeg'
),
-- AS-18HR - 2.25 HP
(
  'تكييف فري إير AS-18HR قدرة 2.25 حصان بارد ساخن انفرتر موفر للطاقة',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  19250,
  NULL,
  '2.25 حصان',
  'بارد/ساخن',
  'AS-18HR',
  'تكييف فري إير انفرتر 2.25 حصان بضمان 10 سنوات، يتميز بأقوى توفير للطاقة A+++ Class، مزود بخاصية البلازما، توزيع هوائي ثلاثي الأبعاد',
  ARRAY['ضمان 10 سنوات', 'A+++ Class توفير طاقة', 'تقنية البلازما', 'توزيع هوائي ثلاثي الأبعاد', 'يعمل على ضغط تيار منخفض', 'يعمل حتى 60°C'],
  true,
  10,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060143-7.jpeg'
),
-- AS-24HR - 3 HP
(
  'تكييف فري إير AS-24HR قدرة 3 حصان بارد ساخن انفرتر موفر للطاقة',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  22000,
  NULL,
  '3 حصان',
  'بارد/ساخن',
  'AS-24HR',
  'تكييف فري إير انفرتر 3 حصان بضمان شامل، يتميز بأقوى توفير للطاقة، مزود بخاصية البلازما، توزيع هوائي ثلاثي الأبعاد',
  ARRAY['ضمان شامل', 'A+++ Class توفير طاقة', 'تقنية البلازما', 'توزيع هوائي ثلاثي الأبعاد', 'يعمل حتى 60°C'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060143-7.jpeg'
),
-- AS-30HR - 4 HP (Sold Out)
(
  'تكييف فري إير AS-30HR قدرة 4 حصان بارد ساخن انفرتر موفر للطاقة',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  36500,
  38999,
  '4 حصان',
  'بارد/ساخن',
  'AS-30HR',
  'تكييف فري إير انفرتر 4 حصان بضمان شامل، يتميز بأقوى توفير للطاقة، مزود بخاصية البلازما، مثالي للمساحات الكبيرة',
  ARRAY['ضمان شامل', 'A+++ Class توفير طاقة', 'تقنية البلازما', 'للمساحات الكبيرة', 'يعمل حتى 60°C'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060143-7.jpeg'
),
-- AS-36HR - 5 HP (Sold Out)
(
  'تكييف فري إير AS-36HR قدرة 5 حصان بارد ساخن موفر للطاقة',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  92000,
  NULL,
  '5 حصان',
  'بارد/ساخن',
  'AS-36HR',
  'تكييف فري إير 5 حصان بضمان شامل، قوة تبريد عالية للمساحات الكبيرة جداً',
  ARRAY['ضمان شامل', 'للمساحات الكبيرة جداً', 'قوة تبريد عالية'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060143-7.jpeg'
);

-- Insert FreeAir FR Series (New Relax) - Sold Out
INSERT INTO products (name, brand_id, price, capacity, type, model, description, features, is_active, stock, image_url)
VALUES 
-- FR-12CR - 1.5 HP Cold Only
(
  'تكييف فري إير نيو ريلاكس FR-12CR قدرة 1.5 حصان بارد',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '1.5 حصان',
  'بارد فقط',
  'FR-12CR',
  'تكييف فري إير نيو ريلاكس 1.5 حصان بارد فقط',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
),
-- FR-12HR - 1.5 HP Hot/Cold
(
  'تكييف فري إير نيو ريلاكس FR-12HR قدرة 1.5 حصان بارد ساخن',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '1.5 حصان',
  'بارد/ساخن',
  'FR-12HR',
  'تكييف فري إير نيو ريلاكس 1.5 حصان بارد وساخن',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة', 'تدفئة شتوية'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
),
-- FR-18CR - 2.25 HP Cold Only
(
  'تكييف فري إير نيو ريلاكس FR-18CR قدرة 2.25 حصان بارد',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '2.25 حصان',
  'بارد فقط',
  'FR-18CR',
  'تكييف فري إير نيو ريلاكس 2.25 حصان بارد فقط',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
),
-- FR-18HR - 2.25 HP Hot/Cold
(
  'تكييف فري إير نيو ريلاكس FR-18HR قدرة 2.25 حصان بارد ساخن',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '2.25 حصان',
  'بارد/ساخن',
  'FR-18HR',
  'تكييف فري إير نيو ريلاكس 2.25 حصان بارد وساخن',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة', 'تدفئة شتوية'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
),
-- FR-24CR - 3 HP Cold Only
(
  'تكييف فري إير نيو ريلاكس FR-24CR قدرة 3 حصان بارد',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '3 حصان',
  'بارد فقط',
  'FR-24CR',
  'تكييف فري إير نيو ريلاكس 3 حصان بارد فقط',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
),
-- FR-24HR - 3 HP Hot/Cold
(
  'تكييف فري إير نيو ريلاكس FR-24HR قدرة 3 حصان بارد ساخن',
  (SELECT id FROM brands WHERE name = 'FreeAir'),
  0,
  '3 حصان',
  'بارد/ساخن',
  'FR-24HR',
  'تكييف فري إير نيو ريلاكس 3 حصان بارد وساخن',
  ARRAY['تصميم عصري', 'هدوء تام', 'توفير طاقة', 'تدفئة شتوية'],
  false,
  0,
  'https://3b-shop.com/wp-content/uploads/2022/05/15954060802-10.jpeg'
);

-- Verify the insert
SELECT name, price, capacity, type, model, is_active FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'FreeAir');
