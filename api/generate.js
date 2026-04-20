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
    const webSearchTool = {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 5
    };

    const frontendTools = req.body.tools || [];
    const tools = [webSearchTool, ...frontendTools.filter(t => t.type !== 'web_search_20250305')];

    let messages = [...(req.body.messages || [])];
    let finalData = null;
    let loopCount = 0;
    const MAX_LOOPS = 10;

    while (loopCount < MAX_LOOPS) {
      loopCount++;

      const body = {
        model: req.body.model || "claude-3-7-sonnet-20250219",
        max_tokens: req.body.max_tokens || 8192,
        messages,
        tools,
        tool_choice: { type: "auto" },
      };

      if (req.body.system) body.system = req.body.system;

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
        console.error('Anthropic API error:', JSON.stringify(error));
        return res.status(anthropicRes.status).json({
          error: error?.error?.message || 'AI service error. Please try again.'
        });
      }

      const data = await anthropicRes.json();
      console.log(`[Loop ${loopCount}] stop_reason: ${data.stop_reason}, blocks: ${data.content?.length}`);

      // DONE — Claude finished, return final response
      if (data.stop_reason === 'end_turn') {
        finalData = data;
        break;
      }

      // TOOL USE — Claude ran web search, send results back
      if (data.stop_reason === 'tool_use') {
        messages = [...messages, { role: 'assistant', content: data.content }];

        const toolResultContent = [];
        for (const block of data.content) {
          if (block.type === 'tool_use') {
            toolResultContent.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: block.content || `Search completed for: ${JSON.stringify(block.input)}`,
            });
          }
        }

        messages = [...messages, { role: 'user', content: toolResultContent }];
        continue;
      }

      // Any other stop_reason — return as-is
      finalData = data;
      break;
    }

    if (!finalData) {
      return res.status(500).json({ error: 'Generation loop exceeded. Please try again.' });
    }

    return res.json(finalData);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: "Failed to communicate with AI provider. Please try again." });
  }
}
