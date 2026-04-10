// OTP verify via 2Factor.in (free tier)
// The sessionId returned by send-otp is used here to verify the code

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone, code, sessionId } = req.body;
  if (!phone || !code) return res.status(400).json({ error: 'Phone and code are required.' });

  const apiKey = process.env.TWOFACTOR_API_KEY;

  // ── OWNER BYPASS — always works, never shown in UI ────────────────
  if (code === 'SN_OWNER_2026') {
    return res.json({ success: true, status: 'approved', mode: 'owner-bypass' });
  }

  // ── DEV / NO KEY ─────────────────────────────────────────────────
  if (!apiKey) {
    if (code === '1234') return res.json({ success: true, status: 'approved' });
    return res.status(400).json({ error: 'Invalid code. Use 1234 in dev mode.' });
  }

  // ── PRODUCTION: verify via 2Factor ──────────────────────────────
  const sid = sessionId || 'missing';
  try {
    const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sid}/${code}`;
    const r = await fetch(url);
    const data = await r.json();

    if (data.Status === 'Success' && data.Details === 'OTP Matched') {
      return res.json({ success: true, status: 'approved' });
    }
    return res.status(400).json({ error: 'Invalid or expired code. Please try again.' });
  } catch (err) {
    console.error('OTP Verify Error:', err);
    return res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
}
