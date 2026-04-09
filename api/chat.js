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
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: systemPrompt,
            messages: req.body.messages
        })
    });

    if (!anthropicRes.ok) {
        const error = await anthropicRes.json();
        return res.status(anthropicRes.status).json(error);
    }

    const data = await anthropicRes.json();
    res.json({ content: [{ text: data.content[0].text }] });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI chat provider" });
  }
}
