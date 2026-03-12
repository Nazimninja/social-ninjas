// Check if a trial already exists for this email/phone
// Uses Vercel KV if configured, otherwise returns false (local check is fallback)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, phone } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  // ── If Vercel KV is configured, check there ──
  // To enable: add KV_REST_API_URL and KV_REST_API_TOKEN to Vercel env vars
  // and run: vercel env add KV_REST_API_URL + KV_REST_API_TOKEN
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const headers = { Authorization: `Bearer ${kvToken}` };
      const cleanEmail = email.toLowerCase().trim();
      const cleanPhone = phone ? phone.replace(/\D/g, '') : null;

      // Check email
      const emailRes = await fetch(`${kvUrl}/get/trial:${cleanEmail}`, { headers });
      const emailData = await emailRes.json();
      if (emailData.result) return res.json({ exists: true, reason: 'email' });

      // Check phone
      if (cleanPhone) {
        const phoneRes = await fetch(`${kvUrl}/get/trial:phone:${cleanPhone}`, { headers });
        const phoneData = await phoneRes.json();
        if (phoneData.result) return res.json({ exists: true, reason: 'phone' });
      }

      return res.json({ exists: false });
    } catch (e) {
      console.error('KV check error:', e);
      // Fall through to return false — local check is still in place
      return res.json({ exists: false });
    }
  }

  // No KV configured — rely on client-side localStorage check
  return res.json({ exists: false, mode: 'local-only' });
}
