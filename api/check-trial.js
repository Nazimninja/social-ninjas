// Cross-device trial duplicate check using Upstash Redis
// Free tier: 10,000 requests/day — https://upstash.com
//
// Setup (2 minutes):
// 1. upstash.com → Sign up free → Create Database
// 2. Name: sn-trials | Type: Regional | Region: AP-South-1 (Mumbai)
// 3. After creation → click the database → scroll to "REST API" section
// 4. Copy "UPSTASH_REDIS_REST_URL" and "UPSTASH_REDIS_REST_TOKEN" shown there
// 5. Add both to Vercel env vars → Redeploy
//
// Without these vars: gracefully falls back to localStorage (same-device only)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, phone, action } = req.body || {};

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // ── No Upstash configured — localStorage fallback ────────────
  if (!url || !token) {
    if (action === 'save') return res.json({ saved: false, mode: 'local-only' });
    return res.json({ exists: false, mode: 'local-only' });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const ONE_YEAR = 31536000; // seconds
  const cleanEmail = email ? email.toLowerCase().trim() : null;
  const cleanPhone = phone ? phone.replace(/\D/g, '') : null;

  try {
    // ── SAVE: record the trial after OTP success ──────────────
    if (action === 'save') {
      if (cleanEmail) {
        await fetch(`${url}/set/trial:email:${cleanEmail}/1/ex/${ONE_YEAR}`, {
          method: 'POST', headers
        });
      }
      if (cleanPhone) {
        await fetch(`${url}/set/trial:phone:${cleanPhone}/1/ex/${ONE_YEAR}`, {
          method: 'POST', headers
        });
      }
      return res.json({ saved: true });
    }

    // ── CHECK: has this email/phone had a trial? ───────────────
    if (!cleanEmail) return res.status(400).json({ error: 'Email required' });

    const emailRes = await fetch(`${url}/get/trial:email:${cleanEmail}`, { headers });
    const emailData = await emailRes.json();
    if (emailData.result) return res.json({ exists: true, reason: 'email' });

    if (cleanPhone) {
      const phoneRes = await fetch(`${url}/get/trial:phone:${cleanPhone}`, { headers });
      const phoneData = await phoneRes.json();
      if (phoneData.result) return res.json({ exists: true, reason: 'phone' });
    }

    return res.json({ exists: false });

  } catch (e) {
    console.error('Upstash error:', e.message);
    return res.json({ exists: false }); // fail open — local check is fallback
  }
}
