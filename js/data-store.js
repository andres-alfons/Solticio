/**
 * DATA STORE - Valentina Niebles
 * Supabase database layer with async operations
 * v2 - Includes invoices and status log
 */

const DataStore = (function() {
  'use strict';

  let supabase = null;

  function getDb() {
    if (!supabase) { supabase = getSupabase(); }
    return supabase;
  }

  // ============================================
  // PRODUCTS
  // ============================================
  async function getProducts(filter = {}) {
    let query = getDb().from('products').select('*');
    if (filter.category) query = query.eq('category', filter.category);
    if (filter.status) query = query.eq('status', filter.status);
    if (filter.featured) query = query.eq('featured', true);
    if (filter.search) query = query.ilike('name', `%${filter.search}%`);
    if (filter.tag) query = query.contains('tags', [filter.tag]);
    query = query.order('created_at', { ascending: false });
    const { data, error } = await query;
    if (error) { console.error('Error fetching products:', error); return []; }
    return data || [];
  }

  async function getProduct(id) {
    const { data, error } = await getDb().from('products').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async function getProductBySlug(slug) {
    const { data, error } = await getDb().from('products').select('*').eq('slug', slug).single();
    if (error) return null;
    return data;
  }

  async function createProduct(product) {
    const { data, error } = await getDb().from('products').insert(product).select().single();
    if (error) { console.error('Error creating product:', error); return null; }
    return data;
  }

  async function updateProduct(id, updates) {
    const { data, error } = await getDb().from('products').update(updates).eq('id', id).select().single();
    if (error) { console.error('Error updating product:', error); return null; }
    return data;
  }

  async function deleteProduct(id) {
    const { error } = await getDb().from('products').delete().eq('id', id);
    return !error;
  }

  // ============================================
  // ORDERS
  // ============================================
  async function getOrders(filter = {}) {
    let query = getDb().from('orders').select('*');
    if (filter.userId) query = query.eq('user_id', filter.userId);
    if (filter.status) query = query.eq('status', filter.status);
    query = query.order('created_at', { ascending: false });
    const { data, error } = await query;
    if (error) { console.error('Error fetching orders:', error); return []; }
    return data || [];
  }

  async function getOrder(id) {
    const { data, error } = await getDb().from('orders').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async function createOrder(order) {
    const dbOrder = {
      id: order.id,
      user_id: order.userId || null,
      client_name: order.client,
      client_email: order.email,
      client_phone: order.phone || '',
      client_doc: order.doc || '',
      products: order.products,
      total: order.total,
      status: order.status || 'pendiente',
      payment: order.payment,
      address: order.address,
      notes: order.notes || '',
      tracking: order.tracking || '',
      carrier: order.carrier || '',
      cancellation_reason: '',
      cancellation_detail: ''
    };
    const { data, error } = await getDb().from('orders').insert(dbOrder).select().single();
    if (error) { console.error('Error creating order:', error); return null; }
    return data;
  }

  async function updateOrder(id, updates) {
    const dbUpdates = {};
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.tracking !== undefined) dbUpdates.tracking = updates.tracking;
    if (updates.carrier !== undefined) dbUpdates.carrier = updates.carrier;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.cancellation_reason !== undefined) dbUpdates.cancellation_reason = updates.cancellation_reason;
    if (updates.cancellation_detail !== undefined) dbUpdates.cancellation_detail = updates.cancellation_detail;
    const { data, error } = await getDb().from('orders').update(dbUpdates).eq('id', id).select().single();
    if (error) { console.error('Error updating order:', error); return null; }
    return data;
  }

  // ============================================
  // INVOICES
  // ============================================
  async function getInvoices(filter = {}) {
    let query = getDb().from('invoices').select('*');
    if (filter.userId) query = query.eq('user_id', filter.userId);
    if (filter.status) query = query.eq('invoice_status', filter.status);
    query = query.order('created_at', { ascending: false });
    const { data, error } = await query;
    if (error) { console.error('Error fetching invoices:', error); return []; }
    return data || [];
  }

  async function getInvoice(id) {
    const { data, error } = await getDb().from('invoices').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async function createInvoice(invoice) {
    const dbInvoice = {
      invoice_number: invoice.invoice_number,
      order_id: invoice.order_id,
      user_id: invoice.user_id || null,
      client_name: invoice.client_name,
      client_email: invoice.client_email,
      client_phone: invoice.client_phone || '',
      client_doc: invoice.client_doc || '',
      client_address: invoice.client_address || '',
      resolution_number: invoice.resolution_number || '',
      resolution_date: invoice.resolution_date || '',
      prefix: invoice.prefix || 'FAC',
      consecutive: invoice.consecutive,
      cufe: invoice.cufe || '',
      qr_code: invoice.qr_code || '',
      store_nit: invoice.store_nit || '',
      store_name: invoice.store_name || 'Valentina Niebles',
      store_regime: invoice.store_regime || 'comun',
      store_address: invoice.store_address || '',
      store_phone: invoice.store_phone || '',
      store_email: invoice.store_email || '',
      products: invoice.products,
      subtotal: invoice.subtotal || 0,
      tax_rate: invoice.tax_rate || 19,
      tax_total: invoice.tax_total || 0,
      discount: invoice.discount || 0,
      total: invoice.total,
      payment_method: invoice.payment_method || '',
      payment_status: invoice.payment_status || 'pendiente',
      invoice_status: invoice.invoice_status || 'emitida',
      pdf_url: '',
      sent_at: null
    };
    const { data, error } = await getDb().from('invoices').insert(dbInvoice).select().single();
    if (error) { console.error('Error creating invoice:', error); return null; }
    return data;
  }

  async function updateInvoice(id, updates) {
    const { data, error } = await getDb().from('invoices').update(updates).eq('id', id).select().single();
    if (error) { console.error('Error updating invoice:', error); return null; }
    return data;
  }

  // ============================================
  // ORDER STATUS LOG
  // ============================================
  async function createStatusLog(log) {
    const { data, error } = await getDb().from('order_status_log').insert({
      order_id: log.order_id,
      old_status: log.old_status || '',
      new_status: log.new_status,
      reason: log.reason || '',
      detail: log.detail || '',
      changed_by: log.changed_by || null
    }).select().single();
    if (error) { console.error('Error creating status log:', error); return null; }
    return data;
  }

  async function getStatusLogs(orderId) {
    const { data, error } = await getDb().from('order_status_log').select('*').eq('order_id', orderId).order('created_at', { ascending: false });
    if (error) { console.error('Error fetching status logs:', error); return []; }
    return data || [];
  }

  // ============================================
  // APPOINTMENTS
  // ============================================
  async function getAppointments(filter = {}) {
    let query = getDb().from('appointments').select('*');
    if (filter.userId) query = query.eq('user_id', filter.userId);
    if (filter.status) query = query.eq('status', filter.status);
    query = query.order('date', { ascending: true });
    const { data, error } = await query;
    if (error) { console.error('Error fetching appointments:', error); return []; }
    return data || [];
  }

  async function createAppointment(appt) {
    const dbAppt = { user_id: appt.userId || null, client_name: appt.client, type: appt.type, date: appt.date, time: appt.time, status: appt.status || 'pendiente', notes: appt.notes || '' };
    const { data, error } = await getDb().from('appointments').insert(dbAppt).select().single();
    if (error) { console.error('Error creating appointment:', error); return null; }
    return data;
  }

  async function updateAppointment(id, updates) {
    const { data, error } = await getDb().from('appointments').update(updates).eq('id', id).select().single();
    if (error) { console.error('Error updating appointment:', error); return null; }
    return data;
  }

  async function deleteAppointment(id) {
    const { error } = await getDb().from('appointments').delete().eq('id', id);
    return !error;
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================
  async function getNotifications(userId) {
    const { data, error } = await getDb().from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) { console.error('Error fetching notifications:', error); return []; }
    return data || [];
  }

  async function createNotification(notif) {
    const dbNotif = { user_id: notif.userId || null, type: notif.type, title: notif.title, message: notif.message, read: notif.read || false, link: notif.link || '' };
    const { data, error } = await getDb().from('notifications').insert(dbNotif).select().single();
    if (error) { console.error('Error creating notification:', error); return null; }
    return data;
  }

  async function markNotificationRead(id) {
    const { error } = await getDb().from('notifications').update({ read: true }).eq('id', id);
    return !error;
  }

  async function markAllNotificationsRead(userId) {
    const { error } = await getDb().from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
    return !error;
  }

  async function getUnreadCount(userId) {
    const { count, error } = await getDb().from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('read', false);
    if (error) return 0;
    return count || 0;
  }

  // ============================================
  // PROFILES
  // ============================================
  async function getProfile(userId) {
    const { data, error } = await getDb().from('profiles').select('*').eq('id', userId).single();
    if (error) return null;
    return data;
  }

  async function getAllProfiles() {
    const { data, error } = await getDb().from('profiles').select('*').order('created_at', { ascending: false });
    if (error) { console.error('Error fetching profiles:', error); return []; }
    return data || [];
  }

  async function updateProfile(userId, updates) {
    const { data, error } = await getDb().from('profiles').update(updates).eq('id', userId).select().single();
    if (error) { console.error('Error updating profile:', error); return null; }
    return data;
  }

  // ============================================
  // SETTINGS
  // ============================================
  async function getSettings() {
    const { data, error } = await getDb().from('settings').select('*');
    if (error) return {};
    const settings = {};
    data.forEach(row => { settings[row.key] = row.value; });
    return settings;
  }

  async function updateSetting(key, value) {
    const { error } = await getDb().from('settings').upsert({ key, value, updated_at: new Date().toISOString() });
    return !error;
  }

  // ============================================
  // STATS
  // ============================================
  async function getStats() {
    const [orders, products, profiles, appointments] = await Promise.all([
      getDb().from('orders').select('id, total, status, created_at'),
      getDb().from('products').select('id, stock, status, views, sales'),
      getDb().from('profiles').select('id, role'),
      getDb().from('appointments').select('id, status, date')
    ]);
    const totalRevenue = (orders.data || []).reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = (orders.data || []).filter(o => o.status === 'pendiente').length;
    const lowStock = (products.data || []).filter(p => p.stock <= p.min_stock && p.status === 'activo').length;
    const activeClients = (profiles.data || []).filter(p => p.role === 'client').length;
    return { totalRevenue, totalOrders: (orders.data || []).length, pendingOrders, totalProducts: (products.data || []).length, lowStock, activeClients, totalAppointments: (appointments.data || []).length };
  }

  // ============================================
  // PUBLIC API
  // ============================================
  return {
    getProducts, getProduct, getProductBySlug, createProduct, updateProduct, deleteProduct,
    getOrders, getOrder, createOrder, updateOrder,
    getInvoices, getInvoice, createInvoice, updateInvoice,
    createStatusLog, getStatusLogs,
    getAppointments, createAppointment, updateAppointment, deleteAppointment,
    getNotifications, createNotification, markNotificationRead, markAllNotificationsRead, getUnreadCount,
    getProfile, getAllProfiles, updateProfile,
    getSettings, updateSetting,
    getStats
  };
})();
