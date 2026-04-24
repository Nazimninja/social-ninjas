// AI Generation proxy — single-platform, multi-turn tool_use loop

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
      max_uses: 3  // reduced to 3 — enough for trends, saves tokens
    };

    let messages = [...(req.body.messages || [])];
    // Cap max_tokens at 6000 — enough for 3 full posts, avoids timeout
    const maxTokens = Math.min(req.body.max_tokens || 6000, 6000);

    let finalData = null;
    let loopCount = 0;
    const MAX_LOOPS = 8;

    while (loopCount < MAX_LOOPS) {
      loopCount++;

      const body = {
        model: "claude-sonnet-4-6",   // Corrected working model from models list
        max_tokens: maxTokens,
        messages,
        tools: [webSearchTool],
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
        console.error('[generate] Anthropic error:', JSON.stringify(error));
        return res.status(anthropicRes.status).json({
          error: error?.error?.message || `API error ${anthropicRes.status}. Please try again.`
        });
      }

      const data = await anthropicRes.json();
      console.log(`[Loop ${loopCount}] stop_reason=${data.stop_reason} blocks=${data.content?.length} tokens_used=${data.usage?.output_tokens}`);

      if (data.stop_reason === 'end_turn') {
        finalData = data;
        break;
      }

      if (data.stop_reason === 'tool_use') {
        messages = [...messages, { role: 'assistant', content: data.content }];

        const toolResults = [];
        for (const block of data.content) {
          if (block.type === 'tool_use') {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: block.content || `Search done for: ${JSON.stringify(block.input)}`,
            });
          }
        }

        if (toolResults.length > 0) {
          messages = [...messages, { role: 'user', content: toolResults }];
        }
        continue;
      }

      // max_tokens hit or other stop reason
      if (data.stop_reason === 'max_tokens') {
        // Still try to parse whatever was returned
        finalData = data;
        console.warn('[generate] max_tokens hit — partial response returned');
        break;
      }

      finalData = data;
      break;
    }

    if (!finalData) {
      return res.status(500).json({ error: 'Generation did not complete. Please try again.' });
    }

    return res.json(finalData);

  } catch (err) {
    console.error('[generate] Handler error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error. Please try again.' });
  }
}
