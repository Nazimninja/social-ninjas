export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: req.body.max_tokens || 6000,
        system: req.body.system,
        messages: req.body.messages,
        tools: req.body.tools
      })
    });

    if (!anthropicRes.ok) {
      const error = await anthropicRes.json();
      return res.status(anthropicRes.status).json(error);
    }

    const data = await anthropicRes.json();
    res.json(data);
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI provider" });
  }
}
