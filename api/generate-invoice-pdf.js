/**
 * /api/generate-invoice-pdf.js - Generates PDF from invoice HTML using puppeteer
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://lyhyvmnqvkcvoddaqusa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!SUPABASE_KEY) return res.status(500).json({ error: 'SUPABASE_KEY not configured' });

  try {
    const { invoiceId } = req.body;
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data: invoice, error: fetchError } = await supabase.from('invoices').select('*').eq('id', invoiceId).single();
    if (fetchError || !invoice) return res.status(404).json({ error: 'Invoice not found' });

    let pdfBuffer;
    try {
      const puppeteer = require('puppeteer-core');
      const chromium = require('@sparticuz/chromium-min');
      const browser = await puppeteer.launch({ args: chromium.args, defaultViewport: chromium.defaultViewport, executablePath: await chromium.executablePath(), headless: chromium.headless });
      const page = await browser.newPage();
      await page.setContent(generateSimpleHTML(invoice), { waitUntil: 'networkidle0' });
      pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' } });
      await browser.close();
    } catch (puppErr) {
      return res.status(200).json({ success: false, reason: 'PDF generation skipped (optional)', detail: puppErr.message });
    }

    const fileName = `${invoice.invoice_number.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    const { error: uploadError, data: uploadData } = await supabase.storage.from('invoices').upload(fileName, pdfBuffer, { contentType: 'application/pdf', upsert: true });
    if (uploadError) return res.status(500).json({ error: 'Storage upload failed', detail: uploadError.message });

    const { data: publicUrl } = supabase.storage.from('invoices').getPublicUrl(fileName);
    await supabase.from('invoices').update({ pdf_url: publicUrl.publicUrl }).eq('id', invoiceId);

    return res.status(200).json({ success: true, pdfUrl: publicUrl.publicUrl });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', detail: err.message });
  }
};

function generateSimpleHTML(invoice) {
  const products = (invoice.products || []).map(p => `
    <tr><td>${p.name}</td><td>${p.qty}</td><td>$${(p.price||0).toLocaleString('es-CO')}</td><td>$${((p.price||0)*(p.qty||1)).toLocaleString('es-CO')}</td></tr>`).join('');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><style>
    body{font-family:sans-serif;color:#1a1a2e;padding:10px} .h{display:flex;justify-content:space-between;border-bottom:3px solid #c9a96e;padding-bottom:16px;margin-bottom:16px}
    .h-left{font-size:20px;font-weight:800;color:#c9a96e} .h-right{text-align:right} .h-right h1{font-size:14px;color:#c9a96e;text-transform:uppercase}
    table{width:100%;border-collapse:collapse;margin:16px 0} th{background:#1a1a2e;color:#c9a96e;padding:10px;text-align:left;font-size:11px} td{padding:10px;border-bottom:1px solid #eee;font-size:12px}
    .totals{margin-left:auto;width:300px} .totals div{display:flex;justify-content:space-between;padding:6px 0;font-size:13px}
    .totals .grand{border-top:3px double #1a1a2e;padding-top:8px;font-size:16px;font-weight:700}
    .footer{border-top:1px solid #eee;padding-top:12px;text-align:center;font-size:10px;color:#999;margin-top:24px}
  </style></head><body>
  <div class="h"><div class="h-left">${invoice.store_name||'VALENTINA NIEBLES'}</div><div class="h-right"><h1>Factura Electrónica</h1><div style="font-size:18px;font-weight:700">${invoice.invoice_number}</div><div style="font-size:11px;color:#999">${new Date(invoice.created_at).toLocaleDateString('es-CO')}</div></div></div>
  <div style="display:flex;gap:24px;margin-bottom:16px"><div style="flex:1"><strong style="font-size:10px;color:#c9a96e">CLIENTE</strong><p>${invoice.client_name}<br>${invoice.client_doc||''}<br>${invoice.client_email}<br>${invoice.client_phone||''}</p></div><div style="flex:1"><strong style="font-size:10px;color:#c9a96e">DATOS FISCALES</strong><p>${invoice.store_nit?'NIT: '+invoice.store_nit+'<br>':''}Régimen: ${invoice.store_regime||'Común'}<br>${invoice.resolution_number?'Res. DIAN: '+invoice.resolution_number:''}</p></div></div>
  <table><thead><tr><th>Producto</th><th>Cant</th><th>Vr Unit</th><th>Subtotal</th></tr></thead><tbody>${products}</tbody></table>
  <div class="totals"><div><span>Subtotal</span><span>$${(invoice.subtotal||0).toLocaleString('es-CO')}</span></div><div><span>IVA (${(invoice.tax_rate||19).toFixed(0)}%)</span><span>$${(invoice.tax_total||0).toLocaleString('es-CO')}</span></div><div class="grand"><span>Total COP</span><span>$${(invoice.total||0).toLocaleString('es-CO')}</span></div></div>
  ${invoice.cufe?`<p style="font-size:10px;color:#999;margin-top:12px">CUFE: ${invoice.cufe}</p>`:''}
  <div class="footer">${invoice.store_name||'VALENTINA NIEBLES'} · Factura electrónica válida según normativa DIAN</div>
  </body></html>`;
}
