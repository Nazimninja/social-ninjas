// AI Generation proxy — passes requests to Anthropic Claude API
// Includes web_search_20250305 tool for live trend research

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'AI service not configured.' });

  try {
    // Always include web_search tool so Claude can actually research live trends
    const webSearchTool = {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 5
    };

    // Merge any tools passed by frontend with web_search
    const frontendTools = req.body.tools || [];
    const tools = [webSearchTool, ...frontendTools.filter(t => t.type !== 'web_search_20250305')];

    const body = {
      model: req.body.model || "claude-sonnet-4-20250514",
      max_tokens: req.body.max_tokens || 8000,
      system: req.body.system,
      messages: req.body.messages,
      tools,
      tool_choice: { type: "auto" },
    };

    // Remove undefined fields
    if (!body.system) delete body.system;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05"
      },
      body: JSON.stringify(body)
    });

    if (!anthropicRes.ok) {
      const error = await anthropicRes.json().catch(() => ({}));
      console.error('Anthropic API error:', error);
      return res.status(anthropicRes.status).json({
        error: error?.error?.message || 'AI service error. Please try again.'
      });
    }

    const data = await anthropicRes.json();
    return res.json(data);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: "Failed to communicate with AI provider. Please try again." });
  }
}
