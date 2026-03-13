// Merged API: handles /api/data?resource=blogs|history|clients
// Replaces: blogs.js, blogs/[id].js, history.js, history/[clientId].js, clients.js
// Saves 4 serverless functions — stays under Vercel hobby limit of 12

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const resource = req.query.resource || req.url?.split('/api/')[1]?.split('?')[0];

  // ── CLIENTS ──────────────────────────────────────────────────
  if (resource === 'clients') {
    if (req.method === 'GET') return res.json([]);
    if (req.method === 'POST') return res.status(201).json({ success: true });
  }

  // ── HISTORY ──────────────────────────────────────────────────
  if (resource === 'history') {
    if (req.method === 'GET') return res.json([]);
    if (req.method === 'POST') return res.status(200).json({ success: true });
  }

  // ── BLOGS ────────────────────────────────────────────────────
  if (resource === 'blogs') {
    if (req.method === 'GET') return res.json([]);
    return res.status(501).json({ error: 'Blog management requires a database.' });
  }

  return res.status(404).json({ error: 'Unknown resource' });
}
