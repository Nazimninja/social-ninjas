// AI Generation proxy — passes requests to Anthropic Claude API
// Handles multi-turn tool_use (web_search) loops until end_turn

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'AI service not configured.' });

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/models", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      }
    });
    const data = await anthropicRes.json();
    return res.json(data);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: "Failed to communicate with AI provider. Please try again." });
  }
}
