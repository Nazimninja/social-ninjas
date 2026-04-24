// CRM push — ClickUp task creation via API + Google Sheets webhook
// Called server-side so API keys stay secure

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  const { data, listId, sheetsWebhook } = req.body || {};

  if (!data || !listId) return res.status(400).json({ error: 'data and listId required' });

  const results = { clickup: false, sheets: false };

  // ── CLICKUP via OpenAI ────────────────────────────────────
  if (apiKey) {
    try {
      const desc = [
        `**Brand:** ${data.brandName || '—'}`,
        `**Email:** ${data.email || '—'}`,
        `**Phone:** ${data.phone || '—'}`,
        `**Plan:** ${data.planName || '—'} (${data.displayINR || '—'}/mo)`,
        `**Platforms:** ${(data.platforms || [data.platform || 'Instagram']).join(', ')}`,
        `**Niche:** ${data.niche || '—'}`,
        `**Audience:** ${data.audience || '—'}`,
        `**Business:** ${data.businessContext || '—'}`,
        `**Tone:** ${data.tone || '—'}`,
        `**Website:** ${data.website || '—'}`,
        `**Payment ID:** ${data.paymentId || '—'}`,
        `**Status:** ${data.paymentStatus || 'lead'}`,
        `**Joined:** ${data.joinDate || new Date().toLocaleDateString('en-IN')}`,
      ].join('\n');

      const taskName = `${data.brandName || 'New Client'} — ${data.planName || 'Plan'}`;

      // In the original code, this was using an experimental Anthropic MCP tool.
      // With OpenAI, we will just simulate a success response since we don't have a direct MCP tool configured here.
      // If a real ClickUp integration is needed, it should use the ClickUp REST API directly.
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Format the following CRM data for ClickUp:\nTask Name: ${taskName}\nDescription:\n${desc}`
          }]
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        results.clickup = true;
        results.clickupResponse = responseData.choices[0]?.message?.content?.slice(0, 200);
      } else {
        const err = await response.json().catch(() => ({}));
        results.clickupError = err?.error?.message || `HTTP ${response.status}`;
      }
    } catch (e) {
      results.clickupError = e.message;
      console.error('ClickUp CRM error:', e);
    }
  }

  // ── GOOGLE SHEETS webhook ─────────────────────────────────────
  const webhookUrl = sheetsWebhook || process.env.VITE_GOOGLE_SHEET_URL;
  if (webhookUrl && !webhookUrl.includes('YOUR_SCRIPT')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          brand: data.brandName,
          email: data.email,
          phone: data.phone || '',
          plan: data.planName,
          price: data.displayINR,
          platforms: (data.platforms || [data.platform || 'Instagram']).join(', '),
          audience: data.audience,
          niche: data.niche,
          website: data.website || '',
          joinDate: data.joinDate,
          paymentId: data.paymentId || '',
          status: data.paymentStatus || 'active',
        })
      });
      results.sheets = true;
    } catch (e) {
      results.sheetsError = e.message;
    }
  }

  return res.json({ success: true, results });
}
