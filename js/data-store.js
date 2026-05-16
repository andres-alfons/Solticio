/**
 * DATA STORE - Valentina Niebles
 * Supabase database layer with async operations
 */

const DataStore = (function() {
  'use strict';

  let supabase = null;

  function getDb() {
    if (!supabase) {
      supabase = getSupabase();
    }
    return supabase;
  }

  // ============================================
  // PRODUCTS
  // ============================================

  async function getProducts(filter = {}) {
    let query = getDb().from('products').select('*');

    if (filter.category) {
      query = query.eq('category', filter.category);
    }
    if (filter.status) {
      query = query.eq('status', filter.status);
    }
    if (filter.featured) {
      query = query.eq('featured', true);
    }
    if (filter.search) {
      query = query.ilike('name', `%${filter.search}%`);
    }
    if (filter.tag) {
      query = query.contains('tags', [filter.tag]);
    }

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

    if (filter.userId) {
      query = query.eq('user_id', filter.userId);
    }
    if (filter.status) {
      query = query.eq('status', filter.status);
    }

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
      products: order.products,
      total: order.total,
      status: order.status || 'pendiente',
      payment: order.payment,
      address: order.address,
      notes: order.notes || '',
      tracking: order.tracking || '',
      carrier: order.carrier || ''
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

    const { data, error } = await getDb().from('orders').update(dbUpdates).eq('id', id).select().single();
    if (error) { console.error('Error updating order:', error); return null; }
    return data;
  }

  // ============================================
  // APPOINTMENTS
  // ============================================

  async function getAppointments(filter = {}) {
    let query = getDb().from('appointments').select('*');

    if (filter.userId) {
      query = query.eq('user_id', filter.userId);
    }
    if (filter.status) {
      query = query.eq('status', filter.status);
    }

    query = query.order('date', { ascending: true });

    const { data, error } = await query;
    if (error) { console.error('Error fetching appointments:', error); return []; }
    return data || [];
  }

  async function createAppointment(appt) {
    const dbAppt = {
      user_id: appt.userId || null,
      client_name: appt.client,
      type: appt.type,
      date: appt.date,
      time: appt.time,
      status: appt.status || 'pendiente',
      notes: appt.notes || ''
    };

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
    const { data, error } = await getDb()
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) { console.error('Error fetching notifications:', error); return []; }
    return data || [];
  }

  async function createNotification(notif) {
    const dbNotif = {
      user_id: notif.userId || null,
      type: notif.type,
      title: notif.title,
      message: notif.message,
      read: notif.read || false,
      link: notif.link || ''
    };

    const { data, error } = await getDb().from('notifications').insert(dbNotif).select().single();
    if (error) { console.error('Error creating notification:', error); return null; }
    return data;
  }

  async function markNotificationRead(id) {
    const { error } = await getDb().from('notifications').update({ read: true }).eq('id', id);
    return !error;
  }

  async function markAllNotificationsRead(userId) {
    const { error } = await getDb()
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    return !error;
  }

  async function getUnreadCount(userId) {
    const { count, error } = await getDb()
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

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
    data.forEach(row => {
      settings[row.key] = row.value;
    });
    return settings;
  }

  async function updateSetting(key, value) {
    const { error } = await getDb()
      .from('settings')
      .upsert({ key, value, updated_at: new Date().toISOString() });
    return !error;
  }

  // ============================================
  // STATS (for admin dashboard)
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

    return {
      totalRevenue,
      totalOrders: (orders.data || []).length,
      pendingOrders,
      totalProducts: (products.data || []).length,
      lowStock,
      activeClients,
      totalAppointments: (appointments.data || []).length
    };
  }

  // ============================================
  // PUBLIC API
  // ============================================

  return {
    // Products
    getProducts,
    getProduct,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,

    // Orders
    getOrders,
    getOrder,
    createOrder,
    updateOrder,

    // Appointments
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,

    // Notifications
    getNotifications,
    createNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadCount,

    // Profiles
    getProfile,
    getAllProfiles,
    updateProfile,

    // Settings
    getSettings,
    updateSetting,

    // Stats
    getStats
  };

})();
