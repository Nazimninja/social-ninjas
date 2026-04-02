export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number required" });
  
  const cleanPhone = phone.replace(/\D/g, "");
  
  const apiKey = process.env.TWOFACTOR_API_KEY;
  if (!apiKey) {
    console.warn("No TWOFACTOR_API_KEY set. Using DEV MODE.");
    const devSessionId = "dev-session-" + Date.now();
    return res.status(200).json({ Status: "Success", Details: devSessionId, info: "DEV_MODE" });
  }

  try {
    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${cleanPhone}/AUTOGEN/OTP1`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Status !== "Success") {
      throw new Error(data.Details || "Failed to send OTP via 2Factor");
    }
    
    res.status(200).json(data);
  } catch (err) {
    console.error("2Factor send error:", err);
    res.status(500).json({ error: "Failed to send OTP", details: err.message });
  }
}
