export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const systemPrompt = `You are the official AI Support Agent for Social Ninja's, a premium digital growth & performance marketing agency.
Your goal is to be helpful, concise, authoritative, and friendly. Answer questions about the agency's services.
Key Info:
- Services: Content Studio (AI content generation), Lead Automation (Custom chatbots & CRM), Paid Ads (Meta/Google).
- Pricing (Content Studio): Starter ₹2,999/mo, Growth ₹5,499/mo, Pro ₹8,999/mo.
- Contact: If they want to speak to a human or engineer, direct them to email info@socialninjas.in or use the /contact page.
Do NOT reveal you are an AI, you are 'Social Ninja's AI Assistant'. Provide short, conversational answers.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini", // Use mini for support chat for faster, cheaper responses
            max_tokens: 1024,
            messages: [
                { role: "system", content: systemPrompt },
                ...(req.body.messages || [])
            ]
        })
    });

    if (!openaiRes.ok) {
        const error = await openaiRes.json();
        return res.status(openaiRes.status).json(error);
    }

    const data = await openaiRes.json();
    res.json({ content: [{ text: data.choices[0].message.content }] });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI chat provider" });
  }
}
