// AI Generation — OpenAI gpt-4o-mini (budget-friendly, great quality)
// No web search tool needed — GPT-4o-mini has training data up to early 2025

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OpenAI API key not configured.' });

  try {
    let messages = [...(req.body.messages || [])];

    if (req.body.system) {
      messages.unshift({ role: 'system', content: req.body.system });
    }

    const body = {
      model: "gpt-4o-mini",      // 80% cheaper than gpt-4o, great for structured content
      max_tokens: Math.min(req.body.max_tokens || 6000, 6000),
      messages,
      temperature: 0.85,         // slightly higher temp for more natural, human-feeling writing
      response_format: { type: "text" }
    };

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.json().catch(() => ({}));
      console.error('[generate] OpenAI error:', JSON.stringify(error));
      return res.status(openaiRes.status).json({
        error: error?.error?.message || `API error ${openaiRes.status}. Please try again.`
      });
    }

    const data = await openaiRes.json();
    const raw = data.choices?.[0]?.message?.content || '';
    console.log(`[generate] tokens=${data.usage?.total_tokens} model=gpt-4o-mini`);

    // Map to Anthropic-compatible format the frontend expects
    return res.json({
      content: [{ type: "text", text: raw }],
      usage: { output_tokens: data.usage?.completion_tokens }
    });

  } catch (err) {
    console.error('[generate] Fatal:', err?.message);
    return res.status(500).json({ error: err?.message || 'Server error. Please try again.' });
  }
}
