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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OpenAI API key not configured.' });

  try {
    let messages = [...(req.body.messages || [])];
    if (req.body.system) {
        messages.unshift({ role: 'system', content: req.body.system });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: req.body.max_tokens || 3000,
        messages: messages,
        temperature: 0.7
      })
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.json();
      return res.status(openaiRes.status).json(error);
    }

    const data = await openaiRes.json();
    
    // Map response back to Anthropic's format so the frontend works without changes
    const finalData = {
      content: [
        { type: "text", text: data.choices[0].message.content }
      ],
      usage: {
        output_tokens: data.usage?.completion_tokens
      }
    };

    res.json(finalData);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
}
