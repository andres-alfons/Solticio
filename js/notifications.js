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
      order_update: '📦',
      delivery_update: '🚚',
      promotion: '🎁',
      appointment_reminder: '📅',
      new_arrival: '✨',
      wishlist_alert: '❤️'
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
        <div class="account-notif-item ${n.read ? '' : 'unread'}" onclick="Notifications.markAsRead(${n.id})">
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
