/**
 * NOTIFICATIONS SYSTEM - Valentina Niebles
 * Supabase-based notification management
 */

const Notifications = (function() {
  'use strict';

  async function getUserNotifications() {
    const user = Auth.getCurrentUser();
    if (!user) return [];
    return await DataStore.getNotifications(user.id);
  }

  async function getUnreadCount() {
    const user = Auth.getCurrentUser();
    if (!user) return 0;
    return await DataStore.getUnreadCount(user.id);
  }

  async function markAsRead(id) {
    await DataStore.markNotificationRead(id);
    render();
  }

  async function openNotif(id, link) {
    await DataStore.markNotificationRead(id);
    render();
    window.location.href = link;
  }

  async function markAllAsRead() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    await DataStore.markAllNotificationsRead(user.id);
    render();
  }

  function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Justo ahora';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} dias`;
    return date.toLocaleDateString('es-CO');
  }

  async function render() {
    const dot = document.getElementById('notifDot');
    const list = document.getElementById('notifList');
    if (!dot || !list) return;

    const notifs = await getUserNotifications();
    const unread = notifs.filter(n => !n.read).length;

    if (dot) dot.style.display = unread > 0 ? 'block' : 'none';

    const icons = {
      order_update: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      delivery_update: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      promotion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 010-5 2.5 2.5 0 015 0"/><path d="M16.5 8a2.5 2.5 0 010-5 2.5 2.5 0 015 0"/></svg>',
      appointment_reminder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      new_arrival: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      wishlist_alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'
    };

    const bgColors = {
      order_update: 'var(--acc-blue-bg)',
      delivery_update: 'var(--acc-gold-bg)',
      promotion: 'var(--acc-green-bg)',
      appointment_reminder: 'var(--acc-purple-bg)',
      new_arrival: 'var(--acc-gold-bg)',
      wishlist_alert: 'var(--acc-red-bg)'
    };

    list.innerHTML = `
      <div style="padding:12px;border-bottom:1px solid var(--acc-border);display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:12px;color:var(--acc-text-muted);">${unread} sin leer</span>
        ${unread > 0 ? '<button onclick="Notifications.markAllRead()" style="background:none;border:none;color:var(--acc-gold);font-size:12px;cursor:pointer;font-weight:600;">Marcar todo como leido</button>' : ''}
      </div>
      ${notifs.length > 0 ? notifs.map(n => `
        <div class="account-notif-item ${n.read ? '' : 'unread'}" onclick="Notifications.openNotif(${n.id}, '${n.link || '/account/mis-pedidos.html'}')">
          <div class="account-notif-item-icon" style="background:${bgColors[n.type] || 'var(--acc-bg-card)'}">${icons[n.type] || '📌'}</div>
          <div class="account-notif-item-content">
            <div class="account-notif-item-title">${n.title}</div>
            <div class="account-notif-item-text">${n.message}</div>
            <div class="account-notif-item-time">${timeAgo(n.created_at || n.date)}</div>
          </div>
        </div>
      `).join('') : '<div style="text-align:center;padding:40px;color:var(--acc-text-muted);font-size:13px;">No tienes notificaciones</div>'}
    `;
  }

  function togglePanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel) return;
    panel.classList.toggle('show');
    if (panel.classList.contains('show')) {
      markAllAsRead();
    }
  }

  return {
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    openNotif,
    markAllAsRead,
    render,
    togglePanel,
    timeAgo
  };
})();

function toggleNotifPanel() {
  Notifications.togglePanel();
}

document.addEventListener('click', function(e) {
  const panel = document.getElementById('notifPanel');
  if (panel && panel.classList.contains('show')) {
    const btn = e.target.closest('.account-header-btn');
    const closeBtn = e.target.closest('.account-notif-close');
    if (!btn && !closeBtn && !panel.contains(e.target)) {
      panel.classList.remove('show');
    }
  }
});
