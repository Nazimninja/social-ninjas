export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // On Vercel, there is no persistent filesystem.
  // Clients data is stored in localStorage on the browser (ContentStudioApp handles this).
  // This endpoint gracefully acknowledges the request without persisting to a file.
  if (req.method === 'GET') {
    return res.json([]);
  }
  
  if (req.method === 'POST') {
    // Acknowledge the sync request — the real source of truth is localStorage
    return res.status(201).json({ success: true, message: "Client synced (serverless mode)" });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
