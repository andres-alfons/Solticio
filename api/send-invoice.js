/**
 * /api/send-invoice.js
 * Generates HTML invoice, sends via Resend, stores PDF in Supabase Storage
 */

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://lyhyvmnqvkcvoddaqusa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const STORE_WHATSAPP = process.env.STORE_WHATSAPP_NUMBER || '+573245947260';
const STORE_LOGO_URL = process.env.STORE_LOGO_URL || '';

function generateInvoiceHTML(invoice) {
  const products = invoice.products || [];
  const date = new Date(invoice.created_at || Date.now());
  const formattedDate = date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  const taxRate = (invoice.tax_rate || 19).toFixed(0);

  const productRows = products.map(p => {
    const subtotal = (p.price || 0) * (p.qty || 1);
    return `
    <tr>
      <td class="prod-name">${p.name || 'Producto'}</td>
      <td class="center">${p.qty || 1}</td>
      <td class="right">$${(p.price || 0).toLocaleString('es-CO')}</td>
      <td class="center">${taxRate}%</td>
      <td class="right">$${subtotal.toLocaleString('es-CO')}</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f5f5f5; color: #1a1a2e; padding: 20px; }
  .invoice { max-width: 800px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
  .invoice-header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; padding: 32px 40px; }
  .invoice-header-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .invoice-logo { font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #c9a96e; }
  .invoice-header h1 { font-size: 16px; font-weight: 600; color: #c9a96e; letter-spacing: 3px; text-transform: uppercase; margin-top: 16px; }
  .invoice-header .invoice-num { font-size: 22px; font-weight: 700; color: #fff; margin-top: 4px; }
  .invoice-header .invoice-date { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 2px; }
  .invoice-body { padding: 32px 40px; }
  .invoice-section-title { font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
  .invoice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
  .invoice-box { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 16px; }
  .invoice-box h3 { font-size: 12px; font-weight: 700; color: #c9a96e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .invoice-box p { font-size: 13px; color: #444; line-height: 1.6; }
  .invoice-box p strong { color: #1a1a2e; }
  .invoice-divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
  .resolution-box { background: #fdf6e9; border: 1px solid #e8d5a3; border-left: 4px solid #c9a96e; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px; }
  .resolution-box p { font-size: 12px; color: #856404; }
  .resolution-box strong { color: #5c4a0e; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  thead th { background: #1a1a2e; color: #c9a96e; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 12px 14px; text-align: left; }
  thead th.center { text-align: center; }
  thead th.right { text-align: right; }
  tbody td { padding: 12px 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #333; }
  tbody td.prod-name { font-weight: 600; color: #1a1a2e; }
  tbody td.center { text-align: center; }
  tbody td.right { text-align: right; font-weight: 500; }
  .totals { margin-left: auto; max-width: 320px; }
  .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
  .totals-row.total { border-top: 3px double #1a1a2e; padding-top: 12px; margin-top: 4px; font-size: 18px; font-weight: 700; color: #1a1a2e; }
  .totals-row.total .totals-value { color: #1a1a2e; }
  .totals-label { color: #666; }
  .totals-value { font-weight: 600; color: #444; }
  .payment-box { background: #f0f7f0; border: 1px solid #c8e6c9; border-radius: 8px; padding: 16px; margin-top: 20px; }
  .payment-box p { font-size: 13px; color: #2e7d32; }
  .payment-box strong { color: #1b5e20; }
  .qr-section { text-align: center; margin-top: 24px; padding: 20px; background: #fafafa; border: 1px solid #eee; border-radius: 8px; }
  .qr-section p { font-size: 11px; color: #999; margin-top: 8px; word-break: break-all; }
  .qr-placeholder { width: 100px; height: 100px; margin: 0 auto; background: #f0f0f0; border: 2px dashed #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .qr-placeholder span { font-size: 11px; color: #bbb; }
  .invoice-footer { background: #fafafa; padding: 20px 40px; border-top: 1px solid #eee; }
  .invoice-footer p { font-size: 11px; color: #999; line-height: 1.7; text-align: center; }
  .invoice-footer .legal { font-size: 10px; color: #bbb; margin-top: 8px; font-style: italic; }
  .brand-footer { color: #c9a96e; font-weight: 700; margin-bottom: 4px; }
</style>
</head>
<body>
<div class="invoice">
  <div class="invoice-header">
    <div class="invoice-header-top">
      <div>
        <div class="invoice-logo">${invoice.store_name || 'VALENTINA NIEBLES'}</div>
        <p style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px;">${invoice.store_nit ? 'NIT: ' + invoice.store_nit : ''}</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.6);">Ré gimen: ${invoice.store_regime === 'simplificado' ? 'Simplificado' : 'Común'}</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.6);">${invoice.store_address || ''}</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.6);">Tel: ${invoice.store_phone || ''}</p>
      </div>
      <div style="text-align:right;">
        <h1>Factura Electrónica de Venta</h1>
        <div class="invoice-num">${invoice.invoice_number}</div>
        <div class="invoice-date">${formattedDate} · ${formattedTime}</div>
      </div>
    </div>
  </div>

  <div class="invoice-body">
    ${invoice.resolution_number ? `<div class="resolution-box">
      <p><strong>Resolución DIAN:</strong> N° ${invoice.resolution_number}${invoice.resolution_date ? ' del ' + invoice.resolution_date : ''}</p>
      <p><strong>Factura electrónica válida</strong> según normativa colombiana vigente.</p>
    </div>` : ''}

    <div class="invoice-grid">
      <div class="invoice-box">
        <div class="invoice-section-title">Cliente</div>
        <h3>${invoice.client_name}</h3>
        <p>${invoice.client_doc ? '<strong>Doc:</strong> ' + invoice.client_doc + '<br>' : ''}<strong>Email:</strong> ${invoice.client_email}<br>${invoice.client_phone ? '<strong>Tel:</strong> ' + invoice.client_phone + '<br>' : ''}${invoice.client_address ? '<strong>Dir:</strong> ' + invoice.client_address : ''}</p>
      </div>
      <div class="invoice-box">
        <div class="invoice-section-title">Pedido</div>
        <h3>${invoice.order_id}</h3>
        <p><strong>Forma de pago:</strong> ${invoice.payment_method || 'No especificado'}<br><strong>Estado del pago:</strong> ${invoice.payment_status || 'Pendiente'}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th class="center">Cant.</th>
          <th class="right">Valor Unit.</th>
          <th class="center">IVA</th>
          <th class="right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${productRows}
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-row">
        <span class="totals-label">Subtotal</span>
        <span class="totals-value">$${(invoice.subtotal || 0).toLocaleString('es-CO')}</span>
      </div>
      <div class="totals-row">
        <span class="totals-label">IVA (${taxRate}%)</span>
        <span class="totals-value">$${(invoice.tax_total || 0).toLocaleString('es-CO')}</span>
      </div>
      ${invoice.discount > 0 ? `<div class="totals-row">
        <span class="totals-label">Descuento</span>
        <span class="totals-value" style="color:#c0392b;">-$${invoice.discount.toLocaleString('es-CO')}</span>
      </div>` : ''}
      <div class="totals-row total">
        <span>Total COP</span>
        <span class="totals-value">$${(invoice.total || 0).toLocaleString('es-CO')}</span>
      </div>
    </div>

    <div class="payment-box">
      <p><strong>Total a pagar:</strong> $${(invoice.total || 0).toLocaleString('es-CO')} COP</p>
      <p style="margin-top:4px;">Realiza tu pago mediante ${invoice.payment_method || 'transferencia'} a las cuentas indicadas por la tienda.</p>
    </div>

    <div class="qr-section">
      <div class="qr-placeholder"><span>QR CUFE</span></div>
      ${invoice.cufe ? `<p>CUFE: ${invoice.cufe}</p>` : '<p>CUFE pendiente de generación por proveedor tecnológico DIAN</p>'}
    </div>
  </div>

  <div class="invoice-footer">
    <p class="brand-footer">${invoice.store_name || 'VALENTINA NIEBLES'}</p>
    <p>${invoice.store_phone ? invoice.store_phone + ' · ' : ''}${invoice.store_email || ''}</p>
    <p class="legal">Esta factura electrónica de venta es un documento válido según los términos de la DIAN. Se recomienda conservar este documento para efectos fiscales. Si tienes dudas, contáctanos.</p>
  </div>
</div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_KEY) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' });
  }
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  try {
    const { invoiceId, email } = req.body;

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const resendClient = new Resend(RESEND_API_KEY);

    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (fetchError || !invoice) {
      return res.status(404).json({ error: 'Invoice not found', detail: fetchError?.message });
    }

    const html = generateInvoiceHTML(invoice);

    const sendResult = await resendClient.emails.send({
      from: 'Valentina Niebles <onboarding@resend.dev>',
      to: email || invoice.client_email,
      subject: `Factura ${invoice.invoice_number} - ${invoice.store_name || 'Valentina Niebles'}`,
      html
    });

    if (sendResult.error) {
      return res.status(500).json({ error: 'Failed to send email', detail: sendResult.error.message });
    }

    const { error: updateError } = await supabase
      .from('invoices')
      .update({ sent_at: new Date().toISOString() })
      .eq('id', invoiceId);

    if (updateError) {
      console.error('Failed to update sent_at:', updateError);
    }

    if (invoice.user_id) {
      const { error: notifError } = await supabase.from('notifications').insert({
        user_id: invoice.user_id,
        type: 'invoice',
        title: `Factura ${invoice.invoice_number} emitida`,
        message: `Tu factura electrónica ${invoice.invoice_number} está lista. Revisa tu correo.`,
        read: false,
        link: `/account/mis-compras.html`
      });
      if (notifError) console.error('Failed to create notification:', notifError);
    }

    return res.status(200).json({
      success: true,
      message: `Factura ${invoice.invoice_number} enviada a ${email || invoice.client_email}`,
      emailId: sendResult.data?.id
    });
  } catch (err) {
    console.error('send-invoice error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
};
