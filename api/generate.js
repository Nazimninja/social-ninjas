// AI Generation proxy — single-platform using OpenAI ChatGPT API

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
    
    // If system prompt is provided, prepend it as a system message
    if (req.body.system) {
      messages.unshift({ role: 'system', content: req.body.system });
    }

    const maxTokens = Math.min(req.body.max_tokens || 6000, 6000);

    const body = {
      model: "gpt-4o", // Using ChatGPT 4o
      max_tokens: maxTokens,
      messages: messages,
      temperature: 0.7
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
    console.log(`[generate] OpenAI success, tokens_used=${data.usage?.total_tokens}`);

    // Map OpenAI response format back to the format the frontend expects (which was Anthropic's format)
    // The frontend expects: { content: [{ type: "text", text: "..." }] }
    const finalData = {
      content: [
        { type: "text", text: data.choices[0].message.content }
      ],
      usage: {
        output_tokens: data.usage?.completion_tokens
      }
    };

    return res.json(finalData);

  } catch (err) {
    console.error('[generate] Handler error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error. Please try again.' });
  }
}
