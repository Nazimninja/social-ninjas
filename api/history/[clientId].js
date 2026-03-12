export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { clientId } = req.query;

  if (req.method === 'GET') {
    // History is stored in localStorage — return empty on serverless
    return res.json([]);
  }
  
  if (req.method === 'POST') {
    // Acknowledge the history sync — no persistent storage on Vercel
    return res.status(200).json({ success: true, count: Array.isArray(req.body) ? req.body.length : 0 });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
