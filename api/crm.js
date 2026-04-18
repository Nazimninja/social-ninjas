// CRM push — ClickUp task creation via MCP + Google Sheets webhook
// Called server-side so API keys stay secure

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { data, listId, sheetsWebhook } = req.body || {};

  if (!data || !listId) return res.status(400).json({ error: 'data and listId required' });

  const results = { clickup: false, sheets: false };

  // ── CLICKUP via Claude MCP ────────────────────────────────────
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

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          tools: [{ type: 'url', url: 'https://mcp.clickup.com/mcp', name: 'clickup-mcp' }],
          messages: [{
            role: 'user',
            content: `Create a task in ClickUp list ${listId} with name "${taskName}" and description:\n${desc}\n\nSet priority to high if plan is Pro or Growth.`
          }]
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        results.clickup = true;
        results.clickupResponse = responseData.content?.[0]?.text?.slice(0, 200);
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
