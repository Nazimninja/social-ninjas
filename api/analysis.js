export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'AI service not configured.' });

  try {
    // Include web search so analysis can look up actual social accounts
    const webSearchTool = {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 3
    };
    const tools = [webSearchTool, ...(req.body.tools || []).filter(t => t.type !== 'web_search_20250305')];

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: req.body.max_tokens || 3000,
        system: req.body.system,
        messages: req.body.messages,
        tools,
        tool_choice: { type: "auto" },
      })
    });

    if (!anthropicRes.ok) {
      const error = await anthropicRes.json();
      return res.status(anthropicRes.status).json(error);
    }

    const data = await anthropicRes.json();
    res.json(data);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
}
