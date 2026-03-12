export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: "Phone and code required." });

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    if (code === "1234") return res.json({ success: true, status: "approved" });
    return res.status(400).json({ error: "Invalid test code. Use 1234." });
  }

  try {
    const twilioRes = await fetch(
      `https://verify.twilio.com/v2/Services/${verifyServiceSid}/VerificationChecks`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ To: `whatsapp:${phone}`, Code: code })
      }
    );
    const data = await twilioRes.json();
    if (!twilioRes.ok) throw new Error(data.message || 'Twilio error');
    
    if (data.status === "approved") {
      res.json({ success: true, status: "approved" });
    } else {
      res.status(400).json({ error: "Invalid or expired verification code." });
    }
  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({ error: "Failed to verify OTP with provider." });
  }
}
