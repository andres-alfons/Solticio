/**
 * AUTH SYSTEM - Valentina Niebles
 * Supabase Auth (Email/Password + Google OAuth)
 */

const Auth = (function() {
  'use strict';

  const SESSION_KEY = 'vn_user_session';
  let currentUser = null;
  let supabase = null;

  function init() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Check js/supabase.js');
      return;
    }

    supabase = getSupabase();

    // Check existing session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      }
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        currentUser = null;
        localStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new CustomEvent('auth:change', { detail: { user: null } }));
      }
    });
  }

  async function loadUserProfile(supabaseUser) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) throw error;

      const wasLoggedIn = currentUser !== null;

      currentUser = {
        id: profile.id,
        name: profile.name,
        email: supabaseUser.email,
        phone: profile.phone || '',
        role: profile.role,
        avatar: profile.avatar || supabaseUser.user_metadata?.avatar_url || '',
        loginTime: Date.now()
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));

      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', profile.id);

      const justLoggedIn = !wasLoggedIn && localStorage.getItem('vn_just_logged_in') === 'true';
      if (justLoggedIn) {
        localStorage.removeItem('vn_just_logged_in');
      }

      window.dispatchEvent(new CustomEvent('auth:change', {
        detail: { user: currentUser, justLoggedIn }
      }));
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  }

  return {
    init,

    getCurrentUser() {
      return currentUser;
    },

    isLoggedIn() {
      return currentUser !== null;
    },

    async signInWithEmail(email, password) {
      if (!supabase) return { success: false, error: 'Supabase no configurado' };

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password
        });

        if (error) throw error;

        if (data.user) {
          localStorage.setItem('vn_just_logged_in', 'true');
          await loadUserProfile(data.user);
          return { success: true };
        }

        return { success: false, error: 'Error al iniciar sesión' };
      } catch (err) {
        let message = 'Error al iniciar sesión';
        if (err.message.includes('Invalid login credentials')) {
          message = 'Email o contraseña incorrectos';
        } else if (err.message.includes('Email not confirmed')) {
          message = 'Debes confirmar tu email antes de iniciar sesión';
        }
        return { success: false, error: message };
      }
    },

    async signUp(name, email, password, phone = '') {
      if (!supabase) return { success: false, error: 'Supabase no configurado' };

      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              name: name.trim(),
              avatar: ''
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // Create profile manually if trigger didn't fire
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              name: name.trim(),
              phone,
              role: 'client',
              avatar: ''
            });

          if (profileError && !profileError.message.includes('duplicate')) {
            throw profileError;
          }

          // Add welcome notification
          await supabase
            .from('notifications')
            .insert({
              user_id: data.user.id,
              type: 'promotion',
              title: 'Bienvenida a Valentina Niebles',
              message: 'Usa el código MINOVIA15 para 15% OFF en tu primera compra',
              read: false
            });

          if (data.session) {
            await loadUserProfile(data.user);
            return { success: true };
          } else {
            return { success: true, needsConfirmation: true };
          }
        }

        return { success: false, error: 'Error al crear cuenta' };
      } catch (err) {
        let message = 'Error al crear cuenta';
        if (err.message.includes('User already registered')) {
          message = 'Este email ya está registrado';
        } else if (err.message.includes('Password should be')) {
          message = 'La contraseña debe tener al menos 6 caracteres';
        }
        return { success: false, error: message };
      }
    },

    async signInWithGoogle() {
      if (!supabase) {
        showToast('Google no configurado', 'Supabase no está configurado', 'warning');
        return;
      }

      localStorage.setItem('vn_just_logged_in', 'true');

      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });

        if (error) throw error;
      } catch (err) {
        console.error('Google sign-in error:', err);
        showToast('Error', err.message || 'No se pudo conectar con Google', 'error');
      }
    },

    async signOut() {
      if (supabase) {
        await supabase.auth.signOut();
      }
      currentUser = null;
      localStorage.removeItem(SESSION_KEY);
      window.dispatchEvent(new CustomEvent('auth:change', { detail: { user: null } }));
    },

    async updateProfile(updates) {
      if (!currentUser || !supabase) return false;

      try {
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', currentUser.id);

        if (error) throw error;

        Object.assign(currentUser, updates);
        localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
        return true;
      } catch (err) {
        console.error('Error updating profile:', err);
        return false;
      }
    },

    async resetPassword(email) {
      if (!supabase) return { success: false, error: 'Supabase no configurado' };

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: window.location.origin + '/auth/reset-password.html'
        });

        if (error) throw error;
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    async updatePassword(newPassword) {
      if (!supabase) return { success: false, error: 'Supabase no configurado' };

      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) throw error;
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    getSupabase() {
      return supabase;
    }
  };

})();

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
  Auth.init();
}

// Toast helper
function showToast(title, message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.style.cssText = `background:#1e2130;border:1px solid #2a2d3e;border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:12px;min-width:300px;box-shadow:0 8px 40px rgba(0,0,0,0.4);animation:toastIn 0.3s ease;`;
  const icons = { success: '\u2713', error: '\u2715', warning: '\u26a0', info: '\u2139' };
  const colors = { success: '#34d399', error: '#f87171', warning: '#fb923c', info: '#60a5fa' };
  toast.innerHTML = `
    <div style="width:24px;height:24px;border-radius:50%;background:${colors[type]}20;color:${colors[type]};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">${icons[type]}</div>
    <div style="flex:1;"><div style="font-size:13px;font-weight:600;color:#e8e8ed;">${title}</div><div style="font-size:12px;color:#9496a3;margin-top:2px;">${message}</div></div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `@keyframes toastIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}@keyframes toastOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(100%)}}`;
  document.head.appendChild(style);
}
