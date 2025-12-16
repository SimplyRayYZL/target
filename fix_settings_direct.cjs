const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mqbhwuuftchurkybrykk.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYmh3dXVmdGNodXJreWJyeWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI3MDQyMSwiZXhwIjoyMDgwODQ2NDIxfQ.w6Rzroe2j2EQZIoArkx2PXa7se9gtwno-3uucPl3Q_I';

const supabase = createClient(supabaseUrl, serviceKey);

async function fixSettings() {
    console.log("1. Connecting to Supabase with Service Key...");

    const DEFAULT_SETTINGS = {
        store_name: "تارجت لأعمال التكييف",
        store_name_en: "Target Air Conditioning",
        store_logo: "/logo.png",
        store_description: "تارجت - أفضل خدمة تكييفات في مصر",
        store_slogan: "جودة... ثقة... خدمة",
        store_address: "القاهرة، مصر",
        store_phone: "01208000550",
        store_email: "info@target-ac.com",
        store_whatsapp: "201208000550",
        whatsapp_message: "مرحباً، أريد الاستفسار عن منتجاتكم",
        shipping_areas: [
            { id: "cairo", name: "القاهرة", fee: 50, isActive: true },
            { id: "giza", name: "الجيزة", fee: 50, isActive: true }
        ],
        banners: [],
        footer_text: "شركة تارجت لأعمال التكييف"
    };

    console.log("2. Upserting 'main' row into site_settings...");

    // Using upsert with the service key bypasses RLS
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({
            id: 'main',
            settings: DEFAULT_SETTINGS,
            updated_at: new Date().toISOString()
        })
        .select();

    if (error) {
        console.error("❌ Error fixing settings:", error);
    } else {
        console.log("✅ Successfully initialized settings row:", data);
    }
}

fixSettings();
