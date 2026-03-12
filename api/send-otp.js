// OTP via 2Factor.in (FREE — 10,000 OTPs/month free tier)
// Sign up: https://2factor.in → get API key → add as TWOFACTOR_API_KEY in Vercel
// If not configured: falls back to dev mode (code 1234)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required.' });

  const apiKey = process.env.TWOFACTOR_API_KEY;

  // ── DEV / NO KEY: skip real OTP ──────────────────────────────────
  if (!apiKey) {
    console.log(`[DEV] OTP for ${phone} — use 1234 to verify`);
    return res.json({ success: true, mode: 'dev', sessionId: 'dev-session' });
  }

  // ── PRODUCTION: 2Factor.in SMS OTP ──────────────────────────────
  // Strip non-digits, remove country code if present
  const clean = phone.replace(/\D/g, '').replace(/^91/, '');

  try {
    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${clean}/AUTOGEN`;
    const r = await fetch(url);
    const data = await r.json();

    if (data.Status === 'Success') {
      return res.json({ success: true, sessionId: data.Details });
    }
    throw new Error(data.Details || '2Factor error');
  } catch (err) {
    console.error('OTP Send Error:', err);
    return res.status(500).json({ error: 'Failed to send OTP. Please check the phone number.' });
  }
}
