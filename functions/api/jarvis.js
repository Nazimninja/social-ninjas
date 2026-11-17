/**
 * J.A.R.V.I.S. Executive Dispatcher & Lead Intelligence API
 * Cloudflare Pages Function: /api/jarvis
 * 
 * Capabilities:
 * 1. POST /api/jarvis -> Ingests inbound leads, executes instant AI qualification (Groq Llama-3.3),
 *    scores urgency/budget, crafts personalized WhatsApp/email pitch scripts, updates Supabase CRM,
 *    and dispatches instant notifications (Telegram / Webhook) to Nazim's phone.
 * 2. GET /api/jarvis -> Generates a real-time executive briefing of active pipeline, recent leads,
 *    and content status.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
};

const DEFAULT_SUPABASE_URL = 'https://mocqyvmntemsnmdusjcy.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4OTMwMzAsImV4cCI6MjEwMDQ2OTAzMH0.qt4ty1tjGeXMthhSaDZZo80u_JdPK4klUg3QAIhN0nw';

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  try {
    const env = context.env || {};
    const supabaseUrl = env.SUPABASE_CRM_URL || env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_CRM_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

    // Fetch recent leads
    const leadsRes = await fetch(`${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc&limit=10`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const leads = leadsRes.ok ? await leadsRes.json() : [];

    // Calculate metrics
    const newLeads = leads.filter(l => (l.status || '').toLowerCase().includes('new'));
    const highBudgetLeads = leads.filter(l => (l.message || '').includes('₹2L') || (l.message || '').includes('₹5L') || (l.message || '').includes('$5,000'));

    return new Response(JSON.stringify({
      status: 'online',
      system: "Social Ninja's J.A.R.V.I.S. Core",
      timestamp: new Date().toISOString(),
      pipeline: {
        total_recent_leads: leads.length,
        new_uncontacted: newLeads.length,
        high_priority_deals: highBudgetLeads.length
      },
      recent_leads: leads.slice(0, 5).map(l => ({
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone,
        status: l.status,
        created_at: l.created_at,
        summary: l.follow_up_notes || l.message
      }))
    }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const env = context.env || {};
    const body = await context.request.json().catch(() => ({}));
    
    const lead = {
      name: (body.name || '').trim(),
      email: (body.email || '').trim(),
      phone: (body.phone || '').trim(),
      budget: (body.budget || 'Unspecified').trim(),
      goals: (body.goals || body.message || 'Growth & scale').trim(),
      source: body.source || 'socialninjas.in/contact'
    };

    if (!lead.name && !lead.email) {
      return new Response(JSON.stringify({ error: 'Name or email is required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const groqKey = env.GROQ_API_KEY || '';
    const supabaseUrl = env.SUPABASE_CRM_URL || env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_CRM_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

    // 1. Analyze lead with Groq LLM (sub-second inference)
    let aiAnalysis = {
      priority: 'MEDIUM',
      recommended_service: 'Paid Ads & Lead Automation',
      pitch_script: `Hey ${lead.name}, saw your inquiry about ${lead.goals}. We build custom AI lead systems and run high-ROAS Meta ads at Social Ninja's. Let's do a quick 10-min strategy review.`,
      executive_summary: `${lead.name} inquired for ${lead.goals} with budget ${lead.budget}.`
    };

    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          temperature: 0.2,
          max_tokens: 500,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are J.A.R.V.I.S., the executive AI intelligence for Social Ninja's (socialninjas.in) - an elite performance marketing, lead automation, and content studio agency founded by Nazim.
Analyze the inbound lead and respond strictly with JSON:
{
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "recommended_service": "string",
  "pain_point": "string",
  "pitch_script": "Short, confident 2-3 sentence personalized WhatsApp outreach message ready for Nazim to send",
  "executive_summary": "1 sentence brief for Nazim"
}`
            },
            {
              role: 'user',
              content: `Lead Details:
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'None'}
Budget: ${lead.budget}
Goals: ${lead.goals}
Source: ${lead.source}`
            }
          ]
        })
      });

      if (groqRes.ok) {
        const groqData = await groqRes.json();
        const parsed = JSON.parse(groqData.choices?.[0]?.message?.content || '{}');
        aiAnalysis = { ...aiAnalysis, ...parsed };
      }
    } catch (e) {
      console.warn('Groq J.A.R.V.I.S. analysis error:', e.message);
    }

    // 2. Update Supabase with AI-enriched notes
    const formattedNotes = `[J.A.R.V.I.S. ANALYSIS]
Priority: ${aiAnalysis.priority}
Service: ${aiAnalysis.recommended_service}
Summary: ${aiAnalysis.executive_summary}
Pitch Script: ${aiAnalysis.pitch_script}`;

    try {
      if (body.lead_id) {
        await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${body.lead_id}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            follow_up_notes: formattedNotes,
            status: aiAnalysis.priority === 'HIGH' ? 'Hot Inbound' : 'New Inbound'
          })
        });
      }
    } catch (dbErr) {
      console.warn('Supabase lead update error:', dbErr.message);
    }

    // 3. Optional: Dispatch Telegram Alert to Nazim's phone if configured
    const telegramToken = env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const text = `🚨 *J.A.R.V.I.S. Inbound Alert* 🚨\n\n` +
          `*Name:* ${lead.name}\n` +
          `*Budget:* ${lead.budget}\n` +
          `*Phone:* ${lead.phone || 'N/A'}\n` +
          `*Priority:* *${aiAnalysis.priority}*\n\n` +
          `*Brief:* ${aiAnalysis.executive_summary}\n\n` +
          `*WhatsApp Pitch:* \n\`${aiAnalysis.pitch_script}\``;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: 'Markdown'
          })
        });
      } catch (tgErr) {
        console.warn('Telegram alert dispatch error:', tgErr.message);
      }
    }

    // 4. Dispatch to n8n Webhook on Railway (for Multi-Platform Pipelines)
    const n8nLeadWebhook = env.N8N_LEAD_WEBHOOK || 'https://n8n-production-29f31.up.railway.app/webhook/socialninjas-lead';
    try {
      await fetch(n8nLeadWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'lead.qualified',
          lead,
          analysis: aiAnalysis,
          timestamp: new Date().toISOString()
        })
      });
    } catch (n8nErr) {
      console.warn('n8n lead dispatch note:', n8nErr.message);
    }

    // 5. Direct WhatsApp Alert to Nazim via Evolution API (Live on Railway)
    const evoApiUrl = env.EVOLUTION_API_URL || 'https://evolution-api-production-b3d9.up.railway.app';
    const evoApiKey = env.EVOLUTION_API_KEY || 'NinjaFitSecret2026';
    const evoInstance = env.EVOLUTION_INSTANCE || 'fitninja';
    const adminPhone = env.ADMIN_WHATSAPP_NUMBER || '918147757479';

    try {
      const waAlert = `🚨 *J.A.R.V.I.S. Inbound Lead Alert* 🚨\n\n` +
        `👤 *Name:* ${lead.name}\n` +
        `💰 *Budget:* ${lead.budget}\n` +
        `📞 *Phone:* ${lead.phone || 'N/A'}\n` +
        `✉️ *Email:* ${lead.email}\n` +
        `🔥 *Priority:* *${aiAnalysis.priority}*\n` +
        `🎯 *Service:* ${aiAnalysis.recommended_service}\n\n` +
        `📝 *Summary:*\n${aiAnalysis.executive_summary}\n\n` +
        `💬 *Drafted WhatsApp Pitch:*\n${aiAnalysis.pitch_script}`;

      await fetch(`${evoApiUrl}/message/sendText/${evoInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': evoApiKey
        },
        body: JSON.stringify({
          number: adminPhone,
          text: waAlert
        })
      });
    } catch (evoErr) {
      console.warn('Evolution API WhatsApp alert note:', evoErr.message);
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: aiAnalysis,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}
