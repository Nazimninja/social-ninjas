// Force debug recompile
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.json({
    url: process.env.SUPABASE_CRM_URL ? `Present (length: ${process.env.SUPABASE_CRM_URL.length})` : 'Undefined',
    key: process.env.SUPABASE_CRM_SERVICE_KEY ? `Present (length: ${process.env.SUPABASE_CRM_SERVICE_KEY.length})` : 'Undefined',
    vercelEnv: process.env.VERCEL_ENV || 'unknown'
  });
}
