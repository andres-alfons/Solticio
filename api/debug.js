module.exports = function handler(req, res) {
  res.status(200).json({
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseKeyPrefix: (process.env.SUPABASE_SERVICE_ROLE_KEY || '').substring(0, 10) + '...',
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyPrefix: (process.env.RESEND_API_KEY || '').substring(0, 6) + '...',
    supabaseUrl: process.env.SUPABASE_URL || 'not set',
    nodeVersion: process.version
  });
};
