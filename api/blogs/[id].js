export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;

  if (req.method === 'GET') {
    // No persistent DB on Vercel — return not found
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  if (req.method === 'DELETE') {
    return res.status(501).json({ error: "Blog deletion requires a database." });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
