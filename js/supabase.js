/**
 * SUPABASE CLIENT - Valentina Niebles
 * Database + Authentication
 * 
 * SETUP:
 * 1. Create project at https://supabase.com
 * 2. Copy Project URL and anon key from Settings > API
 * 3. Paste them below
 * 4. Run the SQL migration from supabase-schema.sql in Supabase SQL Editor
 */

const SUPABASE_CONFIG = {
  url: 'https://lyhyvmnqvkcvoddaqusa.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aHl2bW5xdmtjdm9kZGFxdXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTY2MDIsImV4cCI6MjA5MTU5MjYwMn0.tizFP1oF85bmxT3Ss_dPO2DJilix7wmiVIpyDuykmhI'
};

let supabaseClient = null;

function getSupabase() {
  if (supabaseClient) return supabaseClient;

  if (typeof window.supabase === 'undefined') {
    throw new Error('Supabase SDK not loaded. Include the CDN script in your HTML.');
  }

  supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  });

  return supabaseClient;
}

function isSupabaseConfigured() {
  return SUPABASE_CONFIG.url !== 'TU_SUPABASE_URL' && SUPABASE_CONFIG.anonKey !== 'TU_SUPABASE_ANON_KEY';
}
