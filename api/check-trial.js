// Cross-device trial duplicate check
// Uses Upstash Redis (free: 10,000 req/day) — https://upstash.com
// Env vars needed: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
// Without these: falls back to localStorage-only (same browser check)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, phone, action } = req.body || {};

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // ── No Upstash configured — rely on localStorage only ────────────
  if (!url || !token) {
    if (action === 'save') return res.json({ saved: false, mode: 'local-only' });
    return res.json({ exists: false, mode: 'local-only' });
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const cleanEmail = email ? email.toLowerCase().trim() : null;
  const cleanPhone = phone ? phone.replace(/\D/g, '') : null;

  try {
    // ── SAVE: called after successful OTP to record the trial ───────
    if (action === 'save') {
      if (cleanEmail) {
        await fetch(`${url}/set/trial:${cleanEmail}/1/EX/31536000`, { method: 'POST', headers });
      }
      if (cleanPhone) {
        await fetch(`${url}/set/trial:phone:${cleanPhone}/1/EX/31536000`, { method: 'POST', headers });
      }
      return res.json({ saved: true });
    }

    // ── CHECK: does this email/phone already have a trial? ──────────
    if (!cleanEmail) return res.status(400).json({ error: 'Email required' });

    const emailRes = await fetch(`${url}/get/trial:${cleanEmail}`, { headers });
    const emailData = await emailRes.json();
    if (emailData.result) return res.json({ exists: true, reason: 'email' });

    if (cleanPhone) {
      const phoneRes = await fetch(`${url}/get/trial:phone:${cleanPhone}`, { headers });
      const phoneData = await phoneRes.json();
      if (phoneData.result) return res.json({ exists: true, reason: 'phone' });
    }

    return res.json({ exists: false });

  } catch (e) {
    console.error('Upstash error:', e);
    return res.json({ exists: false }); // fail open — local check is fallback
  }
}
