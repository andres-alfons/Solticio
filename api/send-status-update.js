/**
 * /api/send-status-update.js
 * Sends order status update emails via Resend + generates WhatsApp link
 */

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://lyhyvmnqvkcvoddaqusa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const STORE_WHATSAPP = process.env.STORE_WHATSAPP_NUMBER || '+573245947260';

const STATUS_CONFIG = {
  confirmado: {
    title: 'Pedido Confirmado',
    emoji: '✅',
    color: '#2e7d32',
    intro: 'Tu pedido ha sido confirmado y está siendo preparado.',
    body: 'Nuestro equipo de diseño está trabajando en tu pedido. Pronto recibirás una factura electrónica con los detalles de tu compra.',
    cta: 'Ver mis pedidos',
    bg: '#e8f5e9',
    border: '#c8e6c9'
  },
  en_produccion: {
    title: 'Tu pedido está en producción',
    emoji: '✂️',
    color: '#5c3d99',
    intro: 'Tu pedido ha entrado en proceso de confección.',
    body: 'Nuestras artesanas están creando tu prenda con el máximo cuidado y atención al detalle. Te notificaremos cuando esté lista para envío.',
    cta: 'Ver mis pedidos',
    bg: '#ede7f6',
    border: '#d1c4e9'
  },
  enviado: {
    title: 'Tu pedido ha sido enviado',
    emoji: '📦',
    color: '#e65100',
    intro: 'Tu pedido va en camino.',
    body: 'Tu prenda ha sido cuidadosamente empacada y enviada a la dirección registrada. Revisa los detalles de seguimiento a continuación.',
    cta: 'Ver mis pedidos',
    bg: '#fff3e0',
    border: '#ffe0b2'
  },
  entregado: {
    title: 'Pedido Entregado',
    emoji: '🏠',
    color: '#1a1a2e',
    intro: 'Tu pedido ha sido entregado exitosamente.',
    body: 'Esperamos que disfrutes tu nueva prenda Valentina Niebles. Nos encantaría conocer tu experiencia.',
    cta: 'Ver mis pedidos',
    bg: '#f5f5f5',
    border: '#e0e0e0'
  },
  cancelado: {
    title: 'Pedido Cancelado',
    emoji: '❌',
    color: '#c62828',
    intro: 'Tu pedido ha sido cancelado.',
    body: 'Lamentamos informarte que tu pedido ha sido cancelado. A continuación te explicamos los detalles.',
    cta: 'Ver mis pedidos',
    bg: '#fce4ec',
    border: '#f8bbd0'
  }
};

function generateStatusHTML(order, statusInfo, reason, detail) {
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.confirmado;
  const products = order.products || [];
  const productList = products.map(p => `${p.name || 'Producto'} x${p.qty || 1}`).join(', ');

  let reasonHTML = '';
  if (order.status === 'cancelado') {
    reasonHTML = `
    <div style="background:#fff0f0;border:1px solid #ffcdd2;border-radius:8px;padding:16px;margin-top:16px;">
      <p style="font-size:13px;color:#c62828;font-weight:700;margin-bottom:4px;">Motivo de cancelación</p>
      <p style="font-size:13px;color:#b71c1c;margin-bottom:${detail ? '8px' : '0'};">${reason || 'No especificado'}</p>
      ${detail ? `<p style="font-size:12px;color:#d32f2f;font-style:italic;">"${detail}"</p>` : ''}
    </div>`;
  }

  let trackingHTML = '';
  if (order.status === 'enviado' && (order.tracking || order.carrier)) {
    trackingHTML = `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-top:16px;">
      <p style="font-size:13px;color:#e65100;font-weight:700;">Seguimiento de envío</p>
      <p style="font-size:13px;color:#bf360c;">${order.carrier ? 'Transportadora: <strong>' + order.carrier + '</strong>' : ''}${order.tracking ? (order.carrier ? '<br>' : '') + 'Guía: <strong>' + order.tracking + '</strong>' : ''}</p>
    </div>`;
  }

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f5f5f5; color: #1a1a2e; padding: 20px; }
  .email-wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .email-header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; padding: 24px 32px; text-align: center; }
  .email-logo { font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #c9a96e; }
  .email-status { padding: 32px; text-align: center; background: ${config.bg}; border-bottom: 4px solid ${config.border}; }
  .email-status-icon { font-size: 48px; margin-bottom: 12px; }
  .email-status h2 { font-size: 22px; font-weight: 700; color: ${config.color}; margin-bottom: 8px; }
  .email-status p { font-size: 14px; color: #555; line-height: 1.7; }
  .email-body { padding: 24px 32px; }
  .email-order-box { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
  .email-order-box p { font-size: 13px; color: #444; line-height: 1.7; }
  .email-order-box strong { color: #1a1a2e; }
  .email-order-box .order-id { font-size: 14px; font-weight: 700; color: #c9a96e; }
  .email-total { font-size: 18px; font-weight: 700; color: #1a1a2e; }
  .email-cta { display: inline-block; background: #c9a96e; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 16px; }
  .email-footer { background: #fafafa; padding: 16px 32px; text-align: center; border-top: 1px solid #eee; }
  .email-footer p { font-size: 11px; color: #999; }
  .email-footer .brand { color: #c9a96e; font-weight: 700; }
  .whatsapp-link { color: #25d366; text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
<div class="email-wrapper">
  <div class="email-header">
    <div class="email-logo">VALENTINA NIEBLES</div>
  </div>
  <div class="email-status">
    <div class="email-status-icon">${config.emoji}</div>
    <h2>${config.title}</h2>
    <p>${config.intro}<br>${config.body}</p>
  </div>
  <div class="email-body">
    <div class="email-order-box">
      <p class="order-id">${order.id}</p>
      <p>${order.client_name}</p>
      <p>${productList}</p>
      <p style="margin-top:8px;"><strong>Estado:</strong> ${order.status.replace('_', ' ')}</p>
      <p class="email-total" style="margin-top:4px;">$${(order.total || 0).toLocaleString('es-CO')} COP</p>
    </div>
    ${reasonHTML}
    ${trackingHTML}
    <div style="text-align:center;">
      <a href="https://tudominio.com/account/mis-pedidos.html" class="email-cta">${config.cta}</a>
      <p style="margin-top:12px;font-size:12px;color:#888;">
        ¿Tienes dudas? Escríbenos por <a href="https://wa.me/${STORE_WHATSAPP}?text=Hola%20Valentina,%20tengo%20una%20duda%20sobre%20mi%20pedido%20${order.id}" class="whatsapp-link">WhatsApp</a>
      </p>
    </div>
  </div>
  <div class="email-footer">
    <p class="brand">VALENTINA NIEBLES</p>
    <p>Alta Costura · Elegancia y exclusividad</p>
    <p style="margin-top:4px;">Este es un correo automático, por favor no respondas a este mensaje.</p>
  </div>
</div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_KEY || !RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const { orderId, newStatus, reason, detail } = req.body;

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const resendClient = new Resend(RESEND_API_KEY);

    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!order.client_email) {
      return res.status(400).json({ error: 'Order has no client email' });
    }

    const statusInfo = STATUS_CONFIG[newStatus] || STATUS_CONFIG.confirmado;

    const html = generateStatusHTML({ ...order, status: newStatus }, statusInfo, reason, detail);

    const sendResult = await resendClient.emails.send({
      from: 'Valentina Niebles <onboarding@resend.dev>',
      to: order.client_email,
      subject: `${statusInfo.emoji} ${statusInfo.title} - Pedido ${orderId}`,
      html
    });

    if (sendResult.error) {
      return res.status(500).json({ error: 'Failed to send email', detail: sendResult.error.message });
    }

    const whatsappMsg = `Hola ${order.client_name}! Tu pedido *${orderId}* ahora está: *${newStatus.replace('_', ' ')}*${newStatus === 'enviado' && order.tracking ? '. Guía: ' + order.tracking : ''}${newStatus === 'cancelado' ? '. Motivo: ' + (reason || 'No especificado') : ''}`;
    const phoneRaw = (order.client_phone || '').replace(/[^0-9+]/g, '').replace(/^\+/, '');
    const customerWA = phoneRaw ? `https://wa.me/${phoneRaw}?text=${encodeURIComponent(whatsappMsg)}` : `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

    if (order.user_id) {
      await supabase.from('notifications').insert({
        user_id: order.user_id,
        type: 'order_update',
        title: `${statusInfo.title}: ${orderId}`,
        message: statusInfo.intro,
        read: false,
        link: '/account/mis-pedidos.html'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Status update sent for order ${orderId}`,
      emailId: sendResult.data?.id,
      whatsappLink: customerWA
    });
  } catch (err) {
    console.error('send-status-update error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
};
