/**
 * J.A.R.V.I.S. 2-Way WhatsApp Conversational Engine
 * Cloudflare Pages Function: /api/jarvis-chat
 * 
 * Handles incoming WhatsApp webhook events from Evolution API (MESSAGES_UPSERT),
 * executes high-speed AI reasoning with live Supabase CRM context, and replies
 * directly back to Nazim on WhatsApp.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_SUPABASE_URL = 'https://mocqyvmntemsnmdusjcy.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4OTMwMzAsImV4cCI6MjEwMDQ2OTAzMH0.qt4ty1tjGeXMthhSaDZZo80u_JdPK4klUg3QAIhN0nw';
const EVOLUTION_API_URL = 'https://evolution-api-production-b3d9.up.railway.app';
const EVOLUTION_API_KEY = 'NinjaFitSecret2026';
const EVOLUTION_INSTANCE = 'fitninja';
const ADMIN_PHONE = '918147757479';

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet() {
  return new Response(JSON.stringify({ status: 'active', system: 'J.A.R.V.I.S. 2-Way WhatsApp Engine' }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  try {
    const env = context.env || {};
    const body = await context.request.json().catch(() => ({}));

    // Evolution API v2 event check
    const eventType = body.event || '';
    if (eventType !== 'messages.upsert') {
      return new Response(JSON.stringify({ status: 'ignored_event', event: eventType }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const data = body.data || {};
    const key = data.key || {};
    const remoteJid = key.remoteJid || '';
    const fromMe = Boolean(key.fromMe);

    // Extract message text
    const messageObj = data.message || {};
    const incomingText = (
      messageObj.conversation ||
      messageObj.extendedTextMessage?.text ||
      ''
    ).trim();

    if (!incomingText) {
      return new Response(JSON.stringify({ status: 'empty_text' }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Loop Prevention: NEVER respond to J.A.R.V.I.S.'s own system outputs
    if (incomingText.startsWith('🤖') || incomingText.startsWith('🚨')) {
      return new Response(JSON.stringify({ status: 'ignored_bot_self_message' }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Sender phone extraction (e.g., 918147757479@s.whatsapp.net -> 918147757479)
    const senderNumber = remoteJid.replace(/@.*$/, '');

    // Authorization & Intent filter:
    // Respond if:
    // A) It is from Nazim's phone (ADMIN_PHONE), OR
    // B) It is a self-chat message from Nazim in WhatsApp ('Message yourself'), OR
    // C) The message explicitly mentions 'jarvis' or 'hey jarvis'
    const isFromAdmin = senderNumber.includes(ADMIN_PHONE) || senderNumber === ADMIN_PHONE;
    const isSelfNote = fromMe && isFromAdmin;
    const mentionsJarvis = incomingText.toLowerCase().includes('jarvis');

    if (!isFromAdmin && !isSelfNote && !mentionsJarvis) {
      return new Response(JSON.stringify({ status: 'unauthorized_sender', senderNumber }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // 1. Fetch current live pipeline stats from Supabase to provide true brain awareness
    const supabaseUrl = env.SUPABASE_CRM_URL || env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_CRM_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

    let pipelineSummary = 'No recent leads found.';
    try {
      const leadsRes = await fetch(`${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc&limit=5`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
      });
      if (leadsRes.ok) {
        const leads = await leadsRes.json();
        const uncontacted = leads.filter(l => (l.status || '').toLowerCase().includes('new') || (l.status || '').toLowerCase().includes('hot')).length;
        pipelineSummary = `Total Recent Leads: ${leads.length}, Uncontacted/Hot: ${uncontacted}. Latest: ${leads[0]?.name || 'None'} (${leads[0]?.status || 'N/A'})`;
      }
    } catch (e) {
      console.warn('Supabase context fetch note:', e.message);
    }

    // 2. High-speed AI Reasoning via Groq (Qwen 3.8 27B)
    const groqKey = env.GROQ_API_KEY || '';
    let replyText = "Sir, I have received your directive. All systems across Social Ninja's and Fit Ninja are running smoothly.";

    if (groqKey) {
      try {
        const systemPrompt = `You are J.A.R.V.I.S., the executive AI intelligence, chief of staff, and second brain for Nazim, founder of Social Ninja's (socialninjas.in) and Fit Ninja (fit.socialninjas.in).
Context:
- Live Pipeline: ${pipelineSummary}
- Active Systems: Railway n8n (Content Distribution at 9:30 AM IST, Fit Ninja Onboarding), Evolution API WhatsApp, Cloudflare Pages, Supabase CRM.
- Style: Crisp, authoritative, highly competent, concise, executive tone.
- WhatsApp format: Keep under 3-4 short paragraphs or bullet points. Use WhatsApp bold formatting like *this*. Always begin with 🤖.
- If asked about leads, report from live pipeline context.
- If asked to brainstorm or draft a hook/script, give an immediate, high-converting draft.`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            temperature: 0.3,
            max_tokens: 600,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: incomingText }
            ]
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          replyText = groqData.choices?.[0]?.message?.content || replyText;
        }
      } catch (aiErr) {
        console.warn('Groq J.A.R.V.I.S. chat error:', aiErr.message);
      }
    }

    // 3. Dispatch Response directly back to WhatsApp
    const evoUrl = env.EVOLUTION_API_URL || EVOLUTION_API_URL;
    const evoKey = env.EVOLUTION_API_KEY || EVOLUTION_API_KEY;
    const evoInstance = env.EVOLUTION_INSTANCE || EVOLUTION_INSTANCE;

    await fetch(`${evoUrl}/message/sendText/${evoInstance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': evoKey
      },
      body: JSON.stringify({
        number: senderNumber || ADMIN_PHONE,
        text: replyText
      })
    });

    return new Response(JSON.stringify({ success: true, replySent: true }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}
