/**
 * /api/helper.js - Shared helper for calling API endpoints from frontend
 */
const API_BASE = '/api';

async function callStatusUpdateAPI(orderId, newStatus, reason, detail) {
  try {
    const res = await fetch(`${API_BASE}/send-status-update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, newStatus, reason, detail })
    });
    return await res.json();
  } catch (err) {
    console.error('Status update API error:', err);
    return { error: err.message };
  }
}

async function callSendInvoiceAPI(invoiceId, email) {
  try {
    const res = await fetch(`${API_BASE}/send-invoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId, email })
    });
    return await res.json();
  } catch (err) {
    console.error('Send invoice API error:', err);
    return { error: err.message };
  }
}

async function callGeneratePDFAPI(invoiceId) {
  try {
    const res = await fetch(`${API_BASE}/generate-invoice-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId })
    });
    return await res.json();
  } catch (err) {
    console.error('Generate PDF API error:', err);
    return { error: err.message };
  }
}
