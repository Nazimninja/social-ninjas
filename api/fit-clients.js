export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.log('[Fit Clients API] Supabase URL or Service Role key not configured. Returning empty array.');
    return res.status(200).json([]);
  }

  try {
    const queryUrl = `${supabaseUrl}/rest/v1/profiles?select=*&order=created_at.desc`;
    const response = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Fit Clients API] Supabase query failed:', errText);
      return res.status(response.status).json({ error: 'Failed to fetch profiles from Supabase' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('[Fit Clients API] Error fetching fit clients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
