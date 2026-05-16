/**
 * ADMIN DASHBOARD - VALENTINA NIEBLES
 * Complete Admin Panel with Supabase Integration
 */

(function() {
  'use strict';

  // ============================================
  // AUTH CHECK - Supabase based
  // ============================================
  let currentAdmin = null;
  let supabase = null;

  async function checkAuth() {
    if (typeof getSupabase === 'undefined' || !isSupabaseConfigured()) {
      console.warn('Supabase not configured. Check js/supabase.js');
      window.location.href = 'login.html';
      return false;
    }

    supabase = getSupabase();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = 'login.html';
      return false;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !profile || !['admin', 'manager'].includes(profile.role)) {
      window.location.href = 'login.html';
      return false;
    }

    currentAdmin = profile;
    document.getElementById('userName').textContent = profile.name;
    document.getElementById('userAvatar').textContent = profile.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const roleLabels = { admin: 'Administrador', manager: 'Gerente', super_admin: 'Super Admin' };
    document.getElementById('userRole').textContent = roleLabels[profile.role] || profile.role;
    return true;
  }

  // ============================================
  // DATA LOADING FROM SUPABASE
  // ============================================
  let products = [];
  let orders = [];
  let clients = [];
  let appointments = [];
  let invoices = [];
  let notifications = [];
  let activities = [];

  async function loadAllData() {
    await Promise.all([
      loadProducts(),
      loadOrders(),
      loadClients(),
      loadAppointments(),
      loadInvoices(),
      loadNotifications(),
      loadActivities()
    ]);
  }

  async function loadProducts() {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error) products = data || [];
  }

  async function loadOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error) orders = data || [];
  }

  async function loadClients() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, phone, created_at, role')
      .eq('role', 'client')
      .order('created_at', { ascending: false });

    if (!error) {
      clients = (data || []).map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone || '',
        purchases: orders.filter(o => o.user_id === c.id).length,
        totalSpent: orders.filter(o => o.user_id === c.id && o.status !== 'cancelado').reduce((s, o) => s + Number(o.total), 0),
        type: 'Nuevo',
        registered: c.created_at ? c.created_at.split('T')[0] : '',
        status: 'activo'
      }));

      clients.forEach(c => {
        if (c.purchases >= 3) c.type = 'VIP';
        else if (c.purchases >= 2) c.type = 'Frecuente';
      });
    }
  }

  async function loadAppointments() {
    const { data, error } = await supabase.from('appointments').select('*').order('date', { ascending: true });
    if (!error) appointments = data || [];
  }

  async function loadInvoices() {
    const { data, error } = await supabase.from('invoices').select('*').order('created_at', { ascending: false });
    if (!error) invoices = data || [];
  }

  async function loadNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error) notifications = (data || []).map(n => ({
      id: n.id,
      type: n.type,
      text: n.message,
      time: formatTimeAgo(n.created_at),
      unread: !n.read
    }));
  }

  async function loadActivities() {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error) activities = (data || []).map(a => ({
      type: a.type,
      text: a.text,
      time: formatTimeAgo(a.created_at)
    }));
  }

  function formatTimeAgo(dateStr) {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
    return date.toLocaleDateString('es-CO');
  }

  // ============================================
  // DATA SAVING TO SUPABASE
  // ============================================
  async function saveProductToDb(product) {
    if (product.id) {
      const { error } = await supabase.from('products').update(product).eq('id', product.id);
      return !error;
    } else {
      const { data, error } = await supabase.from('products').insert(product).select().single();
      if (!error && data) {
        product.id = data.id;
        return true;
      }
      return false;
    }
  }

  async function updateOrderStatusInDb(id, status) {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    return !error;
  }

  async function updateApptStatusInDb(id, status) {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    return !error;
  }

  async function saveAppointmentToDb(appt) {
    const { data, error } = await supabase.from('appointments').insert(appt).select().single();
    return !error;
  }

  async function updateDeliveryInDb(id, carrier, tracking) {
    const { error } = await supabase.from('orders').update({ carrier, tracking }).eq('id', id);
    return !error;
  }

  async function updateStockInDb(id, stock) {
    const { error } = await supabase.from('products').update({ stock }).eq('id', id);
    return !error;
  }

  async function insertActivity(type, text) {
    if (!supabase || !currentAdmin) return;
    await supabase.from('activities').insert({
      user_id: currentAdmin.id,
      type,
      text
    });
  }

  async function markNotificationsRead() {
    if (!currentAdmin) return;
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', currentAdmin.id)
      .eq('read', false);
  }

  // ============================================
  // NAVIGATION
  // ============================================
  const pageTitles = {
    dashboard: ['Dashboard', 'Panel · Dashboard'],
    products: ['Productos', 'Panel · Productos'],
    orders: ['Pedidos', 'Panel · Pedidos'],
    deliveries: ['Entregas', 'Panel · Entregas'],
    clients: ['Clientes', 'Panel · Clientes'],
    appointments: ['Citas', 'Panel · Citas'],
    inventory: ['Inventario', 'Panel · Inventario'],
    invoices: ['Facturas', 'Panel · Facturas'],
    stats: ['Estadísticas', 'Panel · Estadísticas'],
    reports: ['Reportes', 'Panel · Reportes'],
    settings: ['Configuración', 'Panel · Configuración']
  };

  window.navigateTo = async function(page) {
    document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));

    const pageEl = document.getElementById('page-' + page);
    if (pageEl) pageEl.classList.add('active');

    const navEl = document.querySelector(`.admin-nav-item[data-page="${page}"]`);
    if (navEl) navEl.classList.add('active');

    const titles = pageTitles[page] || ['', ''];
    document.getElementById('pageTitle').textContent = titles[0];
    document.getElementById('breadcrumb').textContent = titles[1];

    switch(page) {
      case 'dashboard': renderDashboard(); break;
      case 'products': renderProducts(); break;
      case 'orders': renderOrders(); break;
      case 'deliveries': renderDeliveries(); break;
      case 'clients': renderClients(); break;
      case 'appointments': renderAppointments(); break;
      case 'inventory': renderInventory(); break;
      case 'invoices': renderInvoices(); break;
      case 'stats': renderStats(); break;
    }
  };

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  window.showToast = function(title, message, type = 'success') {
    const container = document.getElementById('toasts');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    const icons = { success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>', warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' };
    toast.innerHTML = `
      <div class="admin-toast-icon ${type}">${icons[type] || icons.info}</div>
      <div class="admin-toast-content">
        <div class="admin-toast-title">${title}</div>
        <div class="admin-toast-message">${message}</div>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // ============================================
  // DASHBOARD
  // ============================================
  function renderDashboard() {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
    document.getElementById('statRevenue').textContent = '$' + (totalRevenue / 1000000).toFixed(1) + 'M';
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('statClients').textContent = clients.length;
    document.getElementById('statAppointments').textContent = appointments.filter(a => a.status !== 'cancelada').length;

    const tbody = document.getElementById('recentOrdersBody');
    if (tbody) {
      tbody.innerHTML = orders.slice(0, 5).map(o => `
        <tr>
          <td><strong style="color:var(--admin-text)">${o.id}</strong></td>
          <td>${o.client_name}</td>
          <td>$${Number(o.total).toLocaleString('es-CO')}</td>
          <td>${statusBadge(o.status)}</td>
        </tr>
      `).join('');
    }

    const actList = document.getElementById('activityList');
    if (actList) {
      actList.innerHTML = activities.slice(0, 6).map(a => `
        <div class="admin-activity-item">
          <div class="admin-activity-dot ${a.type}"></div>
          <div>
            <div class="admin-activity-text">${a.text}</div>
            <div class="admin-activity-time">${a.time}</div>
          </div>
        </div>
      `).join('');
    }

    renderSalesChart();
    renderCategoryChart();
  }

  function statusBadge(status) {
    const map = {
      'pendiente': 'warning', 'confirmado': 'info', 'en_produccion': 'purple', 'en producción': 'purple',
      'enviado': 'gold', 'entregado': 'success', 'cancelado': 'danger',
      'confirmada': 'success', 'cancelada': 'danger', 'activo': 'success',
      'inactivo': 'warning', 'agotado': 'danger', 'nuevo': 'info'
    };
    const cls = map[status] || 'info';
    return `<span class="admin-badge admin-badge-${cls}">${status.replace('_', ' ')}</span>`;
  }

  // ============================================
  // CHARTS
  // ============================================
  function renderSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width - 40;
    canvas.height = 280;

    const data = [2.1, 3.4, 2.8, 4.2, 3.9, 5.1, 4.8, 6.2, 5.5, 7.1, 6.8, 8.4];
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const max = Math.max(...data) * 1.2;
    const w = canvas.width, h = canvas.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#2a2d3e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
      ctx.fillStyle = '#6b6d7b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('$' + (max - (max / 4) * i).toFixed(1) + 'M', padding.left - 8, y + 4);
    }

    ctx.beginPath();
    ctx.strokeStyle = '#c9a96e';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    data.forEach((d, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - (d / max) * chartH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, 'rgba(201, 169, 110, 0.3)');
    gradient.addColorStop(1, 'rgba(201, 169, 110, 0)');
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - (d / max) * chartH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    data.forEach((d, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - (d / max) * chartH;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#c9a96e'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#0f1117'; ctx.fill();
    });

    ctx.fillStyle = '#6b6d7b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      const x = padding.left + (chartW / (labels.length - 1)) * i;
      ctx.fillText(l, x, h - 10);
    });
  }

  function renderCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 200; canvas.height = 200;

    const data = [
      { label: 'Vestidos', value: 45, color: '#c9a96e' },
      { label: 'Conjuntos', value: 30, color: '#60a5fa' },
      { label: 'Blazers', value: 15, color: '#a78bfa' },
      { label: 'Accesorios', value: 10, color: '#34d399' }
    ];

    const total = data.reduce((s, d) => s + d.value, 0);
    const cx = 100, cy = 100, r = 80, lineWidth = 24;
    let startAngle = -Math.PI / 2;

    data.forEach(d => {
      const sliceAngle = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
      ctx.strokeStyle = d.color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      startAngle += sliceAngle + 0.04;
    });

    ctx.fillStyle = '#e8e8ed'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('$12.4M', cx, cy - 2);
    ctx.fillStyle = '#9496a3'; ctx.font = '12px sans-serif';
    ctx.fillText('Total ventas', cx, cy + 18);

    const legend = document.getElementById('categoryLegend');
    if (legend) {
      legend.innerHTML = data.map(d => `
        <div class="admin-donut-legend-item">
          <span class="admin-donut-legend-label"><span class="admin-donut-legend-color" style="background:${d.color}"></span>${d.label}</span>
          <span class="admin-donut-legend-value">${d.value}%</span>
        </div>
      `).join('');
    }
  }

  function renderTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width - 40;
    canvas.height = 280;

    const data = [8.2, 9.1, 7.8, 10.5, 11.2, 12.4];
    const labels = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May'];
    const max = Math.max(...data) * 1.2;
    const w = canvas.width, h = canvas.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#2a2d3e'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
      ctx.fillStyle = '#6b6d7b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('$' + (max - (max / 4) * i).toFixed(1) + 'M', padding.left - 8, y + 4);
    }

    const barW = chartW / data.length * 0.5;
    data.forEach((d, i) => {
      const x = padding.left + (chartW / data.length) * i + (chartW / data.length - barW) / 2;
      const barH = (d / max) * chartH;
      const y = padding.top + chartH - barH;

      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      gradient.addColorStop(0, '#c9a96e');
      gradient.addColorStop(1, '#a07d3f');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#6b6d7b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, h - 10);
    });
  }

  window.updateChart = function(type, btn) {
    btn.parentElement.querySelectorAll('.admin-table-filter').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderSalesChart();
  };

  // ============================================
  // PRODUCTS
  // ============================================
  let productFilter = 'all';

  function renderProducts() {
    let filtered = [...products];
    if (productFilter === 'active') filtered = filtered.filter(p => p.status === 'activo');
    else if (productFilter === 'inactive') filtered = filtered.filter(p => p.status !== 'activo');
    else if (productFilter !== 'all') filtered = filtered.filter(p => p.category === productFilter);

    document.getElementById('productCount').textContent = filtered.length + ' productos';

    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td>
          <div class="admin-table-product">
            <div class="admin-table-product-img" style="background:linear-gradient(135deg,var(--admin-gold),var(--admin-gold-dark));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">${p.name[0]}</div>
            <div><div class="admin-table-product-name">${p.name}</div><div class="admin-table-product-sku">SKU: VN-${String(p.id).padStart(4, '0')}</div></div>
          </div>
        </td>
        <td>${p.category}</td>
        <td>$${Number(p.price).toLocaleString('es-CO')}${p.discount ? ` <span style="color:var(--admin-green);font-size:11px;">-${p.discount}%</span>` : ''}</td>
        <td><span style="color:${p.stock <= p.min_stock ? 'var(--admin-red)' : 'var(--admin-text)'}">${p.stock}</span></td>
        <td>${statusBadge(p.status)}</td>
        <td>
          <div class="admin-table-actions">
            <button class="admin-table-action" title="Editar" onclick="editProduct(${p.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="admin-table-action" title="Eliminar" onclick="deleteProduct(${p.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.filterProducts = function(filter, btn) {
    productFilter = filter;
    btn.parentElement.querySelectorAll('.admin-table-filter').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
  };

  window.openProductModal = function(id = null) {
    document.getElementById('productModal').classList.add('show');
    document.getElementById('productModalTitle').textContent = id ? 'Editar Producto' : 'Nuevo Producto';
    document.getElementById('productEditId').value = id || '';
    if (id) {
      const p = products.find(pr => pr.id === id);
      if (p) {
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodPrice').value = p.price;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodStock').value = p.stock;
        document.getElementById('prodMinStock').value = p.min_stock;
        document.getElementById('prodDesc').value = p.description;
        document.getElementById('prodColors').value = (p.colors || []).join(', ');
        document.getElementById('prodSizes').value = (p.sizes || []).join(', ');
        document.getElementById('prodTags').value = (p.tags || []).join(', ');
        document.getElementById('prodStatus').value = p.status;
        document.getElementById('prodDiscount').value = p.discount;
      }
    } else {
      ['prodName','prodPrice','prodStock','prodMinStock','prodDesc','prodColors','prodSizes','prodTags','prodDiscount'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('prodCategory').value = 'vestidos';
      document.getElementById('prodStatus').value = 'activo';
    }
  };

  window.closeProductModal = function() { document.getElementById('productModal').classList.remove('show'); };

  window.saveProduct = async function() {
    const name = document.getElementById('prodName').value.trim();
    const price = parseInt(document.getElementById('prodPrice').value) || 0;
    if (!name || !price) { showToast('Error', 'Nombre y precio son obligatorios', 'error'); return; }

    const editId = document.getElementById('productEditId').value;
    const data = {
      name,
      price,
      category: document.getElementById('prodCategory').value,
      stock: parseInt(document.getElementById('prodStock').value) || 0,
      min_stock: parseInt(document.getElementById('prodMinStock').value) || 5,
      description: document.getElementById('prodDesc').value,
      colors: document.getElementById('prodColors').value.split(',').map(s => s.trim()).filter(Boolean),
      sizes: document.getElementById('prodSizes').value.split(',').map(s => s.trim()).filter(Boolean),
      tags: document.getElementById('prodTags').value.split(',').map(s => s.trim()).filter(Boolean),
      status: document.getElementById('prodStatus').value,
      discount: parseInt(document.getElementById('prodDiscount').value) || 0,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    };

    if (editId) {
      data.id = parseInt(editId);
      const success = await saveProductToDb(data);
      if (success) {
        const idx = products.findIndex(p => p.id === data.id);
        if (idx >= 0) products[idx] = { ...products[idx], ...data };
        await insertActivity('gold', `Producto "${name}" actualizado`);
        showToast('Producto actualizado', `"${name}" se guardó correctamente`);
      }
    } else {
      data.created_at = new Date().toISOString();
      const success = await saveProductToDb(data);
      if (success) {
        products.unshift(data);
        await insertActivity('green', `Nuevo producto "${name}" creado`);
        showToast('Producto creado', `"${name}" se agregó al catálogo`);
      }
    }

    closeProductModal();
    renderProducts();
  };

  window.editProduct = function(id) { openProductModal(id); };

  window.deleteProduct = async function(id) {
    const p = products.find(pr => pr.id === id);
    if (p && confirm(`¿Eliminar "${p.name}"?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        products = products.filter(pr => pr.id !== id);
        await insertActivity('red', `Producto "${p.name}" eliminado`);
        renderProducts();
        showToast('Producto eliminado', `"${p.name}" fue removido`, 'warning');
      }
    }
  };

  // ============================================
  // ORDERS
  // ============================================
  let orderFilter = 'all';

  function renderOrders() {
    let filtered = [...orders];
    if (orderFilter !== 'all') filtered = filtered.filter(o => o.status === orderFilter);
    document.getElementById('orderCount').textContent = filtered.length + ' pedidos';

    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = filtered.map(o => {
      const prods = typeof o.products === 'string' ? JSON.parse(o.products) : o.products;
      const prodHtml = Array.isArray(prods) ? prods.map(p => {
        const qty = p.qty || 1;
        return `<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:var(--admin-bg-tertiary);border:1px solid var(--admin-border);border-radius:6px;font-size:12px;"><span style="font-weight:600;color:var(--admin-text);">${p.name || p.nombre || 'Producto'}</span><span style="background:var(--admin-gold-bg);color:var(--admin-gold);font-weight:700;padding:1px 6px;border-radius:4px;font-size:11px;">x${qty}</span></span>`;
      }).join(' ') : '';
      return `
        <tr>
          <td><strong style="color:var(--admin-text)">${o.id}</strong></td>
          <td>${o.client_name}</td>
          <td><div style="display:flex;flex-wrap:wrap;gap:6px;">${prodHtml}</div></td>
          <td>$${Number(o.total).toLocaleString('es-CO')}</td>
          <td>${o.created_at ? new Date(o.created_at).toLocaleDateString('es-CO') : ''}</td>
          <td>${statusBadge(o.status)}</td>
          <td>
            <div class="admin-table-actions">
              <button class="admin-table-action" title="Ver detalle" onclick="viewOrder('${o.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
               <select class="admin-table-filter" style="padding:4px 8px;font-size:11px;" onchange="if(this.value==='cancelado'){openCancelModal('${o.id}');this.value='${o.status}';}else{updateOrderStatus('${o.id}', this.value)}">
                <option value="pendiente" ${o.status==='pendiente'?'selected':''}>Pendiente</option>
                <option value="confirmado" ${o.status==='confirmado'?'selected':''}>Confirmado</option>
                <option value="en_produccion" ${o.status==='en_produccion'?'selected':''}>En producción</option>
                <option value="enviado" ${o.status==='enviado'?'selected':''}>Enviado</option>
                <option value="entregado" ${o.status==='entregado'?'selected':''}>Entregado</option>
                <option value="cancelado" ${o.status==='cancelado'?'selected':''}>Cancelado</option>
              </select>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.filterOrders = function(filter, btn) {
    orderFilter = filter;
    btn.parentElement.querySelectorAll('.admin-table-filter').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderOrders();
  };

  window.updateOrderStatus = async function(id, status, reason, detail) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const oldStatus = order.status;

    if (status === 'cancelado' && !reason) {
      document.getElementById('cancelOrderId').value = id;
      document.getElementById('cancelModal').classList.add('show');
      document.querySelectorAll('input[name="cancelReason"]').forEach(r => r.checked = false);
      document.getElementById('cancelDetail').value = '';
      document.getElementById('cancelDetailGroup').style.display = 'none';
      return;
    }

    const success = await updateOrderStatusInDb(id, status);
    if (!success) return;

    if (status === 'cancelado') {
      await supabase.from('orders').update({
        cancellation_reason: reason || '',
        cancellation_detail: detail || ''
      }).eq('id', id);
      order.cancellation_reason = reason || '';
      order.cancellation_detail = detail || '';
    }

    order.status = status;

    await DataStore.createStatusLog({
      order_id: id,
      old_status: oldStatus,
      new_status: status,
      reason: reason || '',
      detail: detail || '',
      changed_by: currentAdmin?.id || null
    });

    await insertActivity('blue', `Pedido ${id} → ${status.replace('_', ' ')}${reason ? ' (' + reason + ')' : ''}`);

    callStatusUpdateAPI(id, status, reason, detail).catch(e => console.warn('API status update:', e));

    if (status === 'confirmado') {
      await generateInvoiceForOrder(order);
    }

    showToast('Estado actualizado', `Pedido ${id} ahora: "${status.replace('_', ' ')}"`);
    renderOrders();
  };

  window.openCancelModal = function(id) {
    document.getElementById('cancelOrderId').value = id;
    document.getElementById('cancelModal').classList.add('show');
    document.querySelectorAll('input[name="cancelReason"]').forEach(r => r.checked = false);
    document.getElementById('cancelDetail').value = '';
    document.getElementById('cancelDetailGroup').style.display = 'none';

    document.querySelectorAll('input[name="cancelReason"]').forEach(radio => {
      radio.onchange = function() {
        document.getElementById('cancelDetailGroup').style.display = this.value === 'otra' ? 'block' : 'none';
        if (this.value !== 'otra') document.getElementById('cancelDetail').value = '';
      };
    });
  };

  window.closeCancelModal = function() {
    document.getElementById('cancelModal').classList.remove('show');
  };

  window.confirmCancellation = async function() {
    const id = document.getElementById('cancelOrderId').value;
    const selected = document.querySelector('input[name="cancelReason"]:checked');
    if (!selected) { showToast('Error', 'Selecciona un motivo de cancelación', 'error'); return; }

    const reasonLabels = {
      falta_stock: 'Falta de stock',
      intento_estafa: 'Intento de estafa / fraude',
      datos_invalidos: 'Datos de envío inválidos',
      cliente_solicito: 'Cliente solicitó cancelación',
      problema_pago: 'Problema con el pago',
      producto_no_disponible: 'Producto no disponible',
      otra: 'Otra razón'
    };
    const reason = reasonLabels[selected.value] || selected.value;
    const detail = selected.value === 'otra' ? document.getElementById('cancelDetail').value.trim() : '';
    if (selected.value === 'otra' && !detail) { showToast('Error', 'Describe el motivo de cancelación', 'error'); return; }

    closeCancelModal();
    await updateOrderStatus(id, 'cancelado', reason, detail);
  };

  async function generateInvoiceForOrder(order) {
    try {
      const settings = await getSettingsForInvoice();
      const products = order.products || [];
      const subtotal = products.reduce((s, p) => s + ((p.price || 0) * (p.qty || 1)), 0);
      const taxRate = 19;
      const taxTotal = Math.round(subtotal * taxRate / 100);

      const { data: lastInvoice } = await supabase.from('invoices').select('consecutive').order('consecutive', { ascending: false }).limit(1);
      const nextConsecutive = (lastInvoice?.[0]?.consecutive || 0) + 1;
      const prefix = settings.invoice_prefix || 'FAC';
      const invoiceNumber = `${prefix}-001-${String(nextConsecutive).padStart(8, '0')}`;

      const invoice = {
        invoice_number: invoiceNumber,
        order_id: order.id,
        user_id: order.user_id || null,
        client_name: order.client_name,
        client_email: order.client_email,
        client_phone: order.client_phone || '',
        client_doc: order.client_doc || '',
        client_address: order.address || '',
        resolution_number: settings.invoice_resolution || '',
        resolution_date: settings.invoice_resolution_date || '',
        prefix: prefix,
        consecutive: nextConsecutive,
        cufe: '',
        qr_code: '',
        store_nit: settings.store_nit || '',
        store_name: settings.store_name || 'Valentina Niebles',
        store_regime: settings.store_regime || 'comun',
        store_address: settings.store_location || '',
        store_phone: settings.store_phone || '',
        store_email: settings.store_email || '',
        products: products,
        subtotal: subtotal,
        tax_rate: taxRate,
        tax_total: taxTotal,
        discount: 0,
        total: order.total,
        payment_method: order.payment || '',
        payment_status: 'pendiente',
        invoice_status: 'emitida',
        pdf_url: '',
        sent_at: null
      };

      const inv = await DataStore.createInvoice(invoice);
      if (inv) {
        invoices.unshift(inv);
        await insertActivity('gold', `Factura ${invoiceNumber} generada para pedido ${order.id}`);
        showToast('Factura generada', `${invoiceNumber} para ${order.client_name}`);
        callSendInvoiceAPI(inv.id, order.client_email).catch(e => console.warn('Send invoice API:', e));
      }
    } catch (err) {
      console.error('Error generating invoice:', err);
    }
  }

  async function getSettingsForInvoice() {
    const { data } = await supabase.from('settings').select('*');
    if (!data) return {};
    const s = {};
    data.forEach(r => { s[r.key] = r.value; });
    return s;
  }

  window.viewOrder = function(id) {
    const o = orders.find(or => or.id === id);
    if (o) {
      const prods = typeof o.products === 'string' ? JSON.parse(o.products) : o.products;
      const prodList = Array.isArray(prods) ? prods.map(p => `${p.name || p.nombre} x${p.qty || 1}`).join(', ') : '';
      let info = `Pedido: ${o.id}\nCliente: ${o.client_name}\nEmail: ${o.client_email}\nTel: ${o.client_phone}\nDirección: ${o.address}\nProductos: ${prodList}\nTotal: $${Number(o.total).toLocaleString('es-CO')}\nPago: ${o.payment}\nNotas: ${o.notes || 'N/A'}`;
      if (o.cancellation_reason) info += `\n\nCancelado - Motivo: ${o.cancellation_reason}`;
      if (o.cancellation_detail) info += `\nDetalle: ${o.cancellation_detail}`;
      alert(info);
    }
  };

  // ============================================
  // DELIVERIES
  // ============================================
  function renderDeliveries() {
    const shipped = orders.filter(o => ['enviado', 'en_produccion', 'pendiente'].includes(o.status));
    const alerts = document.getElementById('deliveryAlerts');
    const delayed = orders.filter(o => o.status === 'enviado' && o.tracking);

    let alertHtml = '';
    if (delayed.length > 0) {
      alertHtml += `<div class="admin-alert admin-alert-warning"><span class="admin-alert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span><span class="admin-alert-text">${delayed.length} envío(s) en tránsito</span></div>`;
    }

    const lowStock = products.filter(p => p.stock <= p.min_stock && p.stock > 0);
    if (lowStock.length > 0) {
      alertHtml += `<div class="admin-alert admin-alert-danger"><span class="admin-alert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span><span class="admin-alert-text">${lowStock.length} producto(s) con stock bajo</span></div>`;
    }
    alerts.innerHTML = alertHtml;

    const tbody = document.getElementById('deliveriesTableBody');
    tbody.innerHTML = shipped.map(o => `
      <tr>
        <td><strong style="color:var(--admin-text)">${o.id}</strong></td>
        <td>${o.client_name}</td>
        <td>${o.carrier || 'Por asignar'}</td>
        <td>${o.tracking || '—'}</td>
        <td>${statusBadge(o.status)}</td>
        <td>
          <div class="admin-table-actions">
            <button class="admin-table-action" title="Actualizar" onclick="updateDelivery('${o.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.updateDelivery = async function(id) {
    const carrier = prompt('Transportadora:') || '';
    const tracking = prompt('Número de guía:') || '';
    const order = orders.find(o => o.id === id);
    if (order) {
      const success = await updateDeliveryInDb(id, carrier, tracking);
      if (success) {
        order.carrier = carrier;
        order.tracking = tracking;
        if (tracking) order.status = 'enviado';
        await insertActivity('blue', `Entrega ${id} actualizada: ${carrier} - ${tracking}`);
        renderDeliveries();
        showToast('Entrega actualizada', `Pedido ${id} con guía ${tracking}`);
      }
    }
  };

  // ============================================
  // CLIENTS
  // ============================================
  function renderClients() {
    document.getElementById('clientCount').textContent = clients.length + ' clientes';
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = clients.map(c => `
      <tr>
        <td>
          <div class="admin-table-product">
            <div class="admin-table-product-img" style="background:linear-gradient(135deg,var(--admin-gold),var(--admin-gold-dark));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">${c.name.split(' ').map(w=>w[0]).join('').substring(0,2)}</div>
            <div><div class="admin-table-product-name">${c.name}</div><div class="admin-table-product-sku">Desde ${c.registered}</div></div>
          </div>
        </td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.purchases}</td>
        <td>$${c.totalSpent.toLocaleString('es-CO')}</td>
        <td>${statusBadge(c.type.toLowerCase())}</td>
        <td>
          <div class="admin-table-actions">
            <button class="admin-table-action" title="Ver historial" onclick="viewClient('${c.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.viewClient = function(id) {
    const c = clients.find(cl => cl.id === id);
    if (c) {
      const clientOrders = orders.filter(o => o.user_id === id);
      alert(`Cliente: ${c.name}\nEmail: ${c.email}\nTel: ${c.phone}\nCompras: ${c.purchases}\nTotal gastado: $${c.totalSpent.toLocaleString('es-CO')}\nTipo: ${c.type}\n\nPedidos:\n${clientOrders.map(o => `• ${o.id} - $${Number(o.total).toLocaleString('es-CO')} (${o.status})`).join('\n') || 'Sin pedidos'}`);
    }
  };

  window.exportClients = function() {
    const csv = 'Nombre,Email,Teléfono,Compras,Total Gastado,Tipo\n' +
      clients.map(c => `${c.name},${c.email},${c.phone},${c.purchases},${c.totalSpent},${c.type}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'clientes_valentina_niebles.csv'; a.click();
    URL.revokeObjectURL(url);
    showToast('Exportado', 'Archivo CSV de clientes descargado');
  };

  // ============================================
  // APPOINTMENTS
  // ============================================
  let apptFilter = 'all';

  function renderAppointments() {
    let filtered = [...appointments];
    if (apptFilter !== 'all') filtered = filtered.filter(a => a.status === apptFilter);

    const tbody = document.getElementById('appointmentsTableBody');
    tbody.innerHTML = filtered.map(a => `
      <tr>
        <td><strong style="color:var(--admin-text)">${a.client_name}</strong></td>
        <td>${a.type}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${statusBadge(a.status)}</td>
        <td>
          <div class="admin-table-actions">
            <select class="admin-table-filter" style="padding:4px 8px;font-size:11px;" onchange="updateApptStatus(${a.id}, this.value)">
              <option value="confirmada" ${a.status==='confirmada'?'selected':''}>Confirmada</option>
              <option value="pendiente" ${a.status==='pendiente'?'selected':''}>Pendiente</option>
              <option value="cancelada" ${a.status==='cancelada'?'selected':''}>Cancelada</option>
              <option value="completada" ${a.status==='completada'?'selected':''}>Completada</option>
            </select>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.filterAppointments = function(filter, btn) {
    apptFilter = filter;
    btn.parentElement.querySelectorAll('.admin-table-filter').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderAppointments();
  };

  window.openAppointmentModal = function() { document.getElementById('appointmentModal').classList.add('show'); };
  window.closeAppointmentModal = function() { document.getElementById('appointmentModal').classList.remove('show'); };

  window.saveAppointment = async function() {
    const client = document.getElementById('apptClient').value.trim();
    const date = document.getElementById('apptDate').value;
    if (!client || !date) { showToast('Error', 'Cliente y fecha son obligatorios', 'error'); return; }

    const appt = {
      user_id: currentAdmin?.id || null,
      client_name: client,
      type: document.getElementById('apptType').value,
      date,
      time: document.getElementById('apptTime').value,
      status: 'pendiente',
      notes: document.getElementById('apptNotes').value
    };

    const success = await saveAppointmentToDb(appt);
    if (success) {
      await insertActivity('blue', `Nueva cita: ${client} - ${appt.type}`);
      await loadAppointments();
      closeAppointmentModal();
      renderAppointments();
      showToast('Cita agendada', `${client} - ${appt.type} el ${appt.date}`);
      ['apptClient','apptDate','apptNotes'].forEach(id => document.getElementById(id).value = '');
    }
  };

  window.updateApptStatus = async function(id, status) {
    const appt = appointments.find(a => a.id === id);
    if (appt) {
      const success = await updateApptStatusInDb(id, status);
      if (success) {
        appt.status = status;
        await insertActivity('blue', `Cita de ${appt.client_name} → ${status}`);
        renderAppointments();
        showToast('Cita actualizada', `Cita de ${appt.client_name} ahora está "${status}"`);
      }
    }
  };

  // ============================================
  // INVENTORY
  // ============================================
  function renderInventory() {
    const alerts = document.getElementById('inventoryAlerts');
    const outOfStock = products.filter(p => p.stock === 0);
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.min_stock);

    let html = '';
    if (outOfStock.length > 0) {
      html += `<div class="admin-alert admin-alert-danger"><span class="admin-alert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span><span class="admin-alert-text">${outOfStock.length} producto(s) agotado(s): ${outOfStock.map(p => p.name).join(', ')}</span></div>`;
    }
    if (lowStock.length > 0) {
      html += `<div class="admin-alert admin-alert-warning"><span class="admin-alert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span><span class="admin-alert-text">${lowStock.length} producto(s) con stock bajo: ${lowStock.map(p => `${p.name} (${p.stock})`).join(', ')}</span></div>`;
    }
    alerts.innerHTML = html;

    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = products.map(p => {
      const stockStatus = p.stock === 0 ? 'agotado' : p.stock <= p.min_stock ? 'bajo' : 'normal';
      return `
        <tr>
          <td><strong style="color:var(--admin-text)">${p.name}</strong></td>
          <td>VN-${String(p.id).padStart(4, '0')}</td>
          <td style="color:${p.stock <= p.min_stock ? 'var(--admin-red)' : 'var(--admin-text)'};font-weight:600;">${p.stock}</td>
          <td>${p.min_stock}</td>
          <td>${statusBadge(stockStatus)}</td>
          <td>${p.created_at ? p.created_at.split('T')[0] : ''}</td>
          <td>
            <div class="admin-table-actions">
              <button class="admin-table-action" title="Agregar stock" onclick="addStock(${p.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
              <button class="admin-table-action" title="Reducir stock" onclick="removeStock(${p.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.addStock = async function(id) {
    const qty = parseInt(prompt('Cantidad a agregar:'));
    if (qty && qty > 0) {
      const p = products.find(pr => pr.id === id);
      if (p) {
        const newStock = p.stock + qty;
        const success = await updateStockInDb(id, newStock);
        if (success) {
          p.stock = newStock;
          await insertActivity('green', `Stock +${qty} para "${p.name}" (total: ${p.stock})`);
          renderInventory();
          showToast('Stock actualizado', `+${qty} unidades para "${p.name}"`);
        }
      }
    }
  };

  window.removeStock = async function(id) {
    const qty = parseInt(prompt('Cantidad a reducir:'));
    if (qty && qty > 0) {
      const p = products.find(pr => pr.id === id);
      if (p) {
        const newStock = Math.max(0, p.stock - qty);
        const success = await updateStockInDb(id, newStock);
        if (success) {
          p.stock = newStock;
          await insertActivity('red', `Stock -${qty} para "${p.name}" (total: ${p.stock})`);
          renderInventory();
          showToast('Stock actualizado', `-${qty} unidades para "${p.name}"`);
        }
      }
    }
  };

  // ============================================
  // INVOICES
  // ============================================
  let invoiceFilter = 'all';
  let currentViewInvoice = null;

  function renderInvoices() {
    let filtered = [...invoices];
    if (invoiceFilter !== 'all') filtered = filtered.filter(inv => inv.invoice_status === invoiceFilter);
    document.getElementById('invoiceCount').textContent = filtered.length + ' facturas';

    const tbody = document.getElementById('invoicesTableBody');
    tbody.innerHTML = filtered.map(inv => `
      <tr>
        <td><strong style="color:var(--admin-text)">${inv.invoice_number}</strong></td>
        <td>${inv.client_name}</td>
        <td>${inv.order_id}</td>
        <td>$${Number(inv.total).toLocaleString('es-CO')}</td>
        <td>${inv.created_at ? new Date(inv.created_at).toLocaleDateString('es-CO') : ''}</td>
        <td>${statusBadge(inv.invoice_status)}</td>
        <td>
          <div class="admin-table-actions">
            <button class="admin-table-action" title="Ver factura" onclick="viewInvoice(${inv.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            <button class="admin-table-action" title="Reenviar por email" onclick="resendInvoiceById(${inv.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
            ${inv.invoice_status !== 'anulada' ? `<button class="admin-table-action" title="Anular factura" onclick="voidInvoice(${inv.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.filterInvoices = function(filter, btn) {
    invoiceFilter = filter;
    btn.parentElement.querySelectorAll('.admin-table-filter').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderInvoices();
  };

  window.viewInvoice = async function(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) {
      const { data } = await supabase.from('invoices').select('*').eq('id', id).single();
      if (!data) return;
      currentViewInvoice = data;
    } else {
      currentViewInvoice = inv;
    }
    document.getElementById('invoiceViewContent').innerHTML = generateInvoicePreviewHTML(currentViewInvoice);
    document.getElementById('invoiceViewModal').classList.add('show');
  };

  window.closeInvoiceView = function() {
    document.getElementById('invoiceViewModal').classList.remove('show');
    currentViewInvoice = null;
  };

  function generateInvoicePreviewHTML(inv) {
    const products = inv.products || [];
    const rows = products.map(p => {
      const subtotal = (p.price || 0) * (p.qty || 1);
      return `<tr><td>${p.name || 'Producto'}</td><td>${p.qty || 1}</td><td>$${(p.price || 0).toLocaleString('es-CO')}</td><td>$${subtotal.toLocaleString('es-CO')}</td></tr>`;
    }).join('');
    const date = inv.created_at ? new Date(inv.created_at).toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' }) : '';

    return `<div class="invoice-preview" style="font-family:system-ui,sans-serif;background:#fff;padding:24px;border-radius:8px;color:#1a1a2e;">
      <div style="display:flex;justify-content:space-between;border-bottom:3px solid #c9a96e;padding-bottom:16px;margin-bottom:16px;">
        <div><div style="font-size:22px;font-weight:800;color:#c9a96e;letter-spacing:2px;">${inv.store_name||'VALENTINA NIEBLES'}</div>
        ${inv.store_nit?`<div style="font-size:11px;color:#666;">NIT: ${inv.store_nit}</div>`:''}<div style="font-size:11px;color:#666;">Régimen: ${inv.store_regime==='simplificado'?'Simplificado':'Común'}</div></div>
        <div style="text-align:right;"><div style="font-size:12px;font-weight:700;color:#c9a96e;text-transform:uppercase;letter-spacing:2px;">Factura Electrónica</div><div style="font-size:18px;font-weight:700;">${inv.invoice_number}</div><div style="font-size:11px;color:#999;">${date}</div></div>
      </div>
      ${inv.resolution_number?`<div style="background:#fdf6e9;border-left:4px solid #c9a96e;padding:10px 14px;margin-bottom:16px;font-size:11px;color:#856404;"><strong>Res. DIAN:</strong> N° ${inv.resolution_number}${inv.resolution_date?' del '+inv.resolution_date:''}</div>`:''}
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead><tr style="background:#1a1a2e;color:#c9a96e;"><th style="padding:8px;text-align:left;">Producto</th><th style="padding:8px;">Cant</th><th style="padding:8px;text-align:right;">Vr Unit</th><th style="padding:8px;text-align:right;">Subtotal</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-left:auto;max-width:300px;margin-top:12px;">
        <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:12px;"><span>Subtotal</span><span>$${(inv.subtotal||0).toLocaleString('es-CO')}</span></div>
        <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:12px;"><span>IVA (${(inv.tax_rate||19).toFixed(0)}%)</span><span>$${(inv.tax_total||0).toLocaleString('es-CO')}</span></div>
        <div style="display:flex;justify-content:space-between;padding:8px 0 0;border-top:3px double #1a1a2e;font-size:16px;font-weight:700;"><span>Total COP</span><span>$${(inv.total||0).toLocaleString('es-CO')}</span></div>
      </div>
      <div style="text-align:center;margin-top:20px;font-size:10px;color:#999;">Factura electrónica válida según normativa DIAN colombiana</div>
    </div>`;
  }

  window.resendInvoiceById = async function(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    const result = await callSendInvoiceAPI(id, inv.client_email);
    if (result.success) {
      showToast('Reenviada', `Factura ${inv.invoice_number} reenviada a ${inv.client_email}`);
      const idx = invoices.findIndex(i => i.id === id);
      if (idx >= 0) invoices[idx].sent_at = new Date().toISOString();
    } else {
      showToast('Error', 'No se pudo enviar. Verifica RESEND_API_KEY en Vercel.', 'error');
    }
  };

  window.resendInvoice = function() {
    if (currentViewInvoice) resendInvoiceById(currentViewInvoice.id);
  };

  window.downloadInvoicePDF = async function() {
    if (!currentViewInvoice) return;
    const result = await callGeneratePDFAPI(currentViewInvoice.id);
    if (result.pdfUrl) {
      window.open(result.pdfUrl, '_blank');
      showToast('PDF generado', 'Factura descargada');
      const idx = invoices.findIndex(i => i.id === currentViewInvoice.id);
      if (idx >= 0) invoices[idx].pdf_url = result.pdfUrl;
    } else {
      showToast('Info', 'El PDF se genera en producción con puppeteer', 'warning');
    }
  };

  window.voidInvoice = async function(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    if (confirm(`¿Anular la factura ${inv.invoice_number}? Esta acción no se puede deshacer.`)) {
      await DataStore.updateInvoice(id, { invoice_status: 'anulada' });
      inv.invoice_status = 'anulada';
      await insertActivity('red', `Factura ${inv.invoice_number} anulada`);
      renderInvoices();
      showToast('Anulada', `Factura ${inv.invoice_number} anulada`, 'warning');
    }
  };

  // ============================================
  // STATS
  // ============================================
  function renderStats() {
    renderTrendChart();

    const topProducts = document.getElementById('topProducts');
    const sorted = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
    topProducts.innerHTML = sorted.map((p, i) => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;${i < sorted.length - 1 ? 'border-bottom:1px solid var(--admin-border);' : ''}">
        <span style="font-size:14px;font-weight:700;color:var(--admin-gold);width:24px;">#${i + 1}</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:var(--admin-text);">${p.name}</div>
          <div style="font-size:11px;color:var(--admin-text-muted);">${p.category} · ${p.sales} ventas</div>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--admin-text);">$${Number(p.price).toLocaleString('es-CO')}</div>
      </div>
    `).join('');
  }

  // ============================================
  // REPORTS
  // ============================================
  window.generateReport = function(type) {
    const reports = {
      sales: { title: 'Reporte de Ventas', data: orders.map(o => `${o.id},${o.client_name},${o.total},${o.status},${o.created_at}`).join('\n'), headers: 'Pedido,Cliente,Total,Estado,Fecha' },
      clients: { title: 'Reporte de Clientes', data: clients.map(c => `${c.name},${c.email},${c.phone},${c.purchases},${c.totalSpent},${c.type}`).join('\n'), headers: 'Nombre,Email,Teléfono,Compras,Total,Tipo' },
      products: { title: 'Reporte de Productos', data: products.map(p => `${p.name},${p.category},${p.price},${p.stock},${p.status}`).join('\n'), headers: 'Nombre,Categoría,Precio,Stock,Estado' },
      inventory: { title: 'Reporte de Inventario', data: products.map(p => `${p.name},${p.stock},${p.min_stock},${p.stock <= p.min_stock ? 'BAJO' : 'OK'}`).join('\n'), headers: 'Producto,Stock,Mínimo,Estado' }
    };

    const r = reports[type];
    const csv = r.headers + '\n' + r.data;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${r.title.toLowerCase().replace(/ /g, '_')}_valentina_niebles.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('Reporte generado', `${r.title} descargado en CSV`);
  };

  // ============================================
  // NOTIFICATIONS
  // ============================================
  function renderNotifications() {
    const list = document.getElementById('notifList');
    const dot = document.getElementById('notifDot');
    const unread = notifications.filter(n => n.unread).length;
    dot.style.display = unread > 0 ? 'block' : 'none';

    list.innerHTML = notifications.map(n => {
      const icons = { order: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>', stock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', appointment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>', payment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', delivery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' };
      const colors = { order: 'var(--admin-blue-bg)', stock: 'var(--admin-orange-bg)', appointment: 'var(--admin-purple-bg)', payment: 'var(--admin-green-bg)', delivery: 'var(--admin-gold-bg)' };
      return `
        <div class="admin-notif-item ${n.unread ? 'unread' : ''}">
          <div class="admin-notif-item-icon" style="background:${colors[n.type] || 'var(--admin-bg-tertiary)'}">${icons[n.type] || '📌'}</div>
          <div class="admin-notif-item-content">
            <div class="admin-notif-item-text">${n.text}</div>
            <div class="admin-notif-item-time">${n.time}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.toggleNotifPanel = async function() {
    const panel = document.getElementById('notifPanel');
    panel.classList.toggle('show');
    if (panel.classList.contains('show')) {
      notifications.forEach(n => n.unread = false);
      await markNotificationsRead();
      renderNotifications();
    }
  };

  // ============================================
  // SETTINGS
  // ============================================
  window.saveSettings = async function() {
    const settings = {
      store_name: document.getElementById('settingStoreName').value,
      store_email: document.getElementById('settingEmail').value,
      store_phone: document.getElementById('settingPhone').value,
      store_location: document.getElementById('settingLocation').value,
      store_desc: document.getElementById('settingDesc').value
    };

    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('settings').upsert({ key, value: JSON.stringify(value) });
    }
    showToast('Guardado', 'Configuración actualizada correctamente');
  };

  window.changePassword = async function() {
    const newPass = document.getElementById('settingNewPass').value;
    const confirm = document.getElementById('settingConfirmPass').value;
    if (!newPass || newPass.length < 8) { showToast('Error', 'La contraseña debe tener al menos 8 caracteres', 'error'); return; }
    if (newPass !== confirm) { showToast('Error', 'Las contraseñas no coinciden', 'error'); return; }

    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) {
      showToast('Error', error.message, 'error');
    } else {
      document.getElementById('settingNewPass').value = '';
      document.getElementById('settingConfirmPass').value = '';
      showToast('Contraseña actualizada', 'Tu contraseña se cambió correctamente');
    }
  };

  // ============================================
  // UTILITIES
  // ============================================
  async function addActivity(type, text) {
    await insertActivity(type, text);
    activities.unshift({ type, text, time: 'Justo ahora' });
    if (activities.length > 20) activities.pop();
  }

  window.toggleSidebar = function() {
    document.getElementById('sidebar').classList.toggle('open');
  };

  window.toggleUserMenu = function() {};

  window.logout = async function() {
    if (supabase) await supabase.auth.signOut();
    window.location.href = 'login.html';
  };

  // ============================================
  // GLOBAL SEARCH
  // ============================================
  document.getElementById('globalSearch').addEventListener('input', function(e) {
    const q = e.target.value.toLowerCase();
    if (q.length < 2) return;

    const results = [];
    products.forEach(p => { if (p.name.toLowerCase().includes(q)) results.push({ type: 'Producto', name: p.name, page: 'products' }); });
    orders.forEach(o => { if (o.client_name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)) results.push({ type: 'Pedido', name: `${o.id} - ${o.client_name}`, page: 'orders' }); });
    clients.forEach(c => { if (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) results.push({ type: 'Cliente', name: c.name, page: 'clients' }); });

    if (results.length > 0) {
      navigateTo(results[0].page);
    }
  });

  // ============================================
  // INIT
  // ============================================
  async function init() {
    const authenticated = await checkAuth();
    if (!authenticated) return;

    await loadAllData();
    renderDashboard();
    renderNotifications();

    const checkWidth = () => {
      const menuBtn = document.getElementById('menuBtn');
      if (window.innerWidth <= 768) {
        menuBtn.style.display = 'flex';
      } else {
        menuBtn.style.display = 'none';
        document.getElementById('sidebar').classList.remove('open');
      }
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const activePage = document.querySelector('.admin-page.active');
        if (activePage) {
          const page = activePage.id.replace('page-', '');
          if (page === 'dashboard') renderDashboard();
          if (page === 'stats') renderStats();
        }
      }, 250);
    });
  }

  init();

  window.AdminPanel = {
    getData: () => ({ products, orders, clients, appointments, invoices, notifications, activities }),
    addActivity,
    showToast: window.showToast
  };

})();
