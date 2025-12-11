// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const ADMIN_EMAIL = "ahmedhossa20008@gmail.com"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  phone: string
  address: string
  city: string
  notes?: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const orderData: OrderEmailData = await req.json()

    const itemsHtml = orderData.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: left;">${item.price.toLocaleString()} ج.م</td>
          </tr>`
      )
      .join("")

    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e3a5f, #2c5282); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .order-id { background: #f0f7ff; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .order-id span { font-size: 24px; font-weight: bold; color: #1e3a5f; }
          .info-box { background: #fafafa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .info-box h3 { margin-top: 0; color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #1e3a5f; color: white; padding: 12px; text-align: right; }
          .total-row { background: #f59e0b; color: white; font-size: 18px; }
          .total-row td { padding: 15px; font-weight: bold; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 طلب جديد!</h1>
            <p style="margin: 10px 0 0;">Dream For Trade</p>
          </div>
          
          <div class="content">
            <div class="order-id">
              <p style="margin: 0 0 5px; color: #666;">رقم الطلب</p>
              <span>#${orderData.orderId.slice(0, 8).toUpperCase()}</span>
            </div>
            
            <div class="info-box">
              <h3>👤 معلومات العميل</h3>
              <p><strong>الاسم:</strong> ${orderData.customerName}</p>
              <p><strong>الهاتف:</strong> <a href="tel:${orderData.phone}">${orderData.phone}</a></p>
              <p><strong>الإيميل:</strong> ${orderData.customerEmail || "غير متوفر"}</p>
            </div>
            
            <div class="info-box">
              <h3>📍 عنوان التوصيل</h3>
              <p>${orderData.address}, ${orderData.city}</p>
              ${orderData.notes ? `<p style="background: #fff3cd; padding: 10px; border-radius: 5px;">📝 ملاحظات: ${orderData.notes}</p>` : ""}
            </div>
            
            <div class="info-box">
              <h3>📦 المنتجات</h3>
              <table>
                <thead>
                  <tr>
                    <th>المنتج</th>
                    <th style="text-align: center;">الكمية</th>
                    <th style="text-align: left;">السعر</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="2">الإجمالي</td>
                    <td style="text-align: left;">${orderData.total.toLocaleString()} ج.م</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div class="footer">
            <p>تم الطلب في ${new Date().toLocaleString("ar-EG")}</p>
            <p>Dream For Trade - الوكيل المعتمد للتكييفات</p>
          </div>
        </div>
      </body>
      </html>
    `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dream For Trade <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `🛒 طلب جديد #${orderData.orderId.slice(0, 8).toUpperCase()} - ${orderData.customerName}`,
        html: emailHtml,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Resend error:", data)
      return new Response(JSON.stringify({ error: data }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
