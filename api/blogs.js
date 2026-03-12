export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Blogs are now served from a static JSON in the project.
  // For a fully dynamic blog, upgrade to a database (PlanetScale, Supabase, etc.)
  // For now, return an empty array for GET, and 501 for POST/DELETE
  if (req.method === 'GET') {
    return res.json([]);
  }
  
  return res.status(501).json({ error: "Blog management requires a database. Connect to Supabase or similar." });
}
