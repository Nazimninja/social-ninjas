export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const isAllowed = !origin || origin.includes('socialninjas.in') || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('vercel.app');

  if (isAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI chat service temporarily unavailable' });
  }

  // Prevent token abuse / large body attacks
  const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages.slice(-6) : [];

  const systemPrompt = `You are the official Growth Assistant for Social Ninja's, an elite digital growth, content studio & performance marketing agency.
Your goal is to be helpful, concise, authoritative, and friendly. Answer questions about the agency's scaling systems and services.
Key Info:
- Services: Lead Automation (Custom conversational workflows & CRM sync), Paid Ads (Meta/Google performance), Content Studio (high-retention video assets), Web & SEO.
- Contact: Direct inquiries to email info@socialninjas.in or the /contact page.
Provide short, punchy, conversational answers.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            max_tokens: 512,
            messages: [
                { role: "system", content: systemPrompt },
                ...rawMessages
            ]
        })
    });

    if (!openaiRes.ok) {
        const error = await openaiRes.json().catch(() => ({}));
        return res.status(openaiRes.status).json(error);
    }

    const data = await openaiRes.json();
    res.json({ content: [{ text: data.choices[0].message.content }] });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI chat provider" });
  }
}
