import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { JARVIS_CORP_INTEL } from '../functions/api/jarvis-brain-data.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'blogs.json');

// Helper to read blogs
const readBlogs = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify({ blogs: [] }, null, 2));
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading blogs:', error);
        return { blogs: [] };
    }
};

// Helper to write blogs
const writeBlogs = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing blogs:', error);
    }
};

// GET all blogs
app.get('/api/blogs', (req, res) => {
    const data = readBlogs();
    res.json(data.blogs);
});

// GET single blog by slug or ID
app.get('/api/blogs/:id', (req, res) => {
    const data = readBlogs();
    const blog = data.blogs.find(b => b.id === req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
});

// POST new blog
app.post('/api/blogs', (req, res) => {
    const data = readBlogs();
    const newBlog = {
        id: Date.now().toString(), // Simple ID generation
        title: req.body.title,
        slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: req.body.content,
        excerpt: req.body.excerpt || req.body.content.substring(0, 150) + '...',
        author: req.body.author || 'Admin',
        date: new Date().toISOString(),
        tags: req.body.tags || []
    };
    
    data.blogs.push(newBlog);
    writeBlogs(data);
    
    res.status(201).json(newBlog);
});

// DELETE a blog
app.delete('/api/blogs/:id', (req, res) => {
    const data = readBlogs();
    const initialLength = data.blogs.length;
    data.blogs = data.blogs.filter(b => b.id !== req.params.id);
    
    if (data.blogs.length < initialLength) {
        writeBlogs(data);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const systemPrompt = `You are the official AI Support Agent for Social Ninja's, a premium digital growth & performance marketing agency.
            Key Info:
            - Services: Lead Automation (Custom chatbots & CRM), Paid Ads (Meta/Google), Growth Systems, Web & SEO.
            - Contact: If they want to speak to our team or book an audit call, direct them to email info@socialninjas.in or use the /contact page.
            Do NOT reveal you are an AI, you are 'Social Ninja's AI Assistant'. Provide short, conversational answers.`;

        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
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
});

// ─────────────────────────────────────────────────────────────────
// UNIFIED /api/data — blogs, leads, scripts
// ─────────────────────────────────────────────────────────────────
const ADMIN_KEY = process.env.ADMIN_API_KEY || process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'sn@admin2026';

function isAuthorizedAdmin(req) {
    if (!ADMIN_KEY) return false;
    const authHeader = req.headers.authorization || req.headers.Authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
    const customHeader = req.headers['x-admin-key'] || req.headers['x-admin-password'];
    const token = bearerToken || customHeader;
    if (!token) return false;

    try {
        const bufToken = Buffer.from(token, 'utf8');
        const bufKey = Buffer.from(ADMIN_KEY, 'utf8');
        return bufToken.length === bufKey.length && crypto.timingSafeEqual(bufToken, bufKey);
    } catch (_) {
        return false;
    }
}

app.all('/api/data', async (req, res) => {
    const resource = req.query.resource;
    const id       = req.query.id;

    // BLOGS
    if (resource === 'blogs') {
        const data = readBlogs();
        if (req.method === 'GET') {
            if (id) {
                const post = data.blogs.find(b => b.id === id || b.slug === id);
                if (!post) return res.status(404).json({ error: 'Not found' });
                return res.json(post);
            }
            return res.json(data.blogs.sort((a,b) => new Date(b.publishedAt||b.date) - new Date(a.publishedAt||a.date)));
        }
        if (req.method === 'POST') {
            if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
            const body = req.body;
            const newPost = {
                id: body.id || `post-${Date.now()}`,
                slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
                title: body.title, excerpt: body.excerpt || body.title,
                content: body.content || '', author: body.author || "Social Ninja's Team",
                category: body.category || 'Insights', readTime: body.readTime || '3 min read',
                publishedAt: body.publishedAt || new Date().toISOString(),
            };
            const idx = data.blogs.findIndex(b => b.id === newPost.id);
            if (idx >= 0) data.blogs[idx] = newPost; else data.blogs.unshift(newPost);
            writeBlogs(data);
            return res.status(201).json(newPost);
        }
        if (req.method === 'DELETE') {
            if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
            if (!id) return res.status(400).json({ error: 'id required' });
            data.blogs = data.blogs.filter(b => b.id !== id);
            writeBlogs(data);
            return res.json({ success: true });
        }
    }

    // LEADS (Supabase CRM)
    if (resource === 'leads') {
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!CRM_KEY) return res.status(500).json({ error: 'Supabase service key is unconfigured' });

        if (req.method === 'GET') {
            if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
            try {
                const r = await fetch(`${CRM_URL}/rest/v1/leads?select=*&order=created_at.desc`, {
                    headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                });
                if (!r.ok) return res.status(r.status).json({ error: 'Supabase error' });
                const rows = await r.json();
                return res.json(rows || []);
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error fetching leads' });
            }
        }

        if (req.method === 'PATCH' || (req.method === 'POST' && (req.body?._action === 'update' || (id || req.body?.id && !req.body?.name)))) {
            if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
            const targetId = id || req.body?.id;
            if (!targetId) return res.status(400).json({ error: 'id required for update' });
            const allowedFields = ['status', 'notes', 'next_follow_up', 'follow_up_notes', 'message', 'company', 'website', 'phone', 'email', 'name', 'source'];
            const updates = {};
            for (const f of allowedFields) {
                if (req.body && req.body[f] !== undefined) updates[f] = req.body[f];
            }
            if (req.body?.nextFollowUp !== undefined && updates.next_follow_up === undefined) updates.next_follow_up = req.body.nextFollowUp;
            if (req.body?.followUpNotes !== undefined && updates.follow_up_notes === undefined) updates.follow_up_notes = req.body.followUpNotes;

            try {
                const r = await fetch(`${CRM_URL}/rest/v1/leads?id=eq.${targetId}`, {
                    method: 'PATCH',
                    headers: {
                        'apikey': CRM_KEY,
                        'Authorization': `Bearer ${CRM_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify(updates)
                });
                if (!r.ok) return res.status(r.status).json({ error: await r.text() });
                const updated = await r.json();
                return res.json({ success: true, updated: updated[0] || true });
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error updating lead' });
            }
        }

        if (req.method === 'POST') {
            const body = req.body || {};
            try {
                // Check for existing lead by website, email, or name
                let existingLead = null;
                if (body.website) {
                    const r = await fetch(`${CRM_URL}/rest/v1/leads?website=eq.${encodeURIComponent(body.website)}&limit=1`, {
                        headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                    });
                    if (r.ok) {
                        const rows = await r.json();
                        if (rows && rows.length > 0) existingLead = rows[0];
                    }
                }
                if (!existingLead && body.email && !body.email.includes('@instagram.lead') && !body.email.includes('@reddit.lead')) {
                    const r = await fetch(`${CRM_URL}/rest/v1/leads?email=eq.${encodeURIComponent(body.email)}&limit=1`, {
                        headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                    });
                    if (r.ok) {
                        const rows = await r.json();
                        if (rows && rows.length > 0) existingLead = rows[0];
                    }
                }
                if (!existingLead && body.name) {
                    const r = await fetch(`${CRM_URL}/rest/v1/leads?name=eq.${encodeURIComponent(body.name)}&limit=1`, {
                        headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                    });
                    if (r.ok) {
                        const rows = await r.json();
                        if (rows && rows.length > 0) existingLead = rows[0];
                    }
                }

                if (existingLead) {
                    // PRESERVE progressed status: do not overwrite touched/progressed status with 'New Inbound'
                    const existingStatus = existingLead.status;
                    const incomingStatus = body.status || 'New Inbound';
                    const isProgressed = existingStatus && !['new inbound', 'new lead', 'new'].includes(existingStatus.toLowerCase());

                    let mergedNotes = existingLead.notes || '';
                    if (body.notes && (!mergedNotes || !mergedNotes.includes(body.notes))) {
                        mergedNotes = mergedNotes ? `${mergedNotes}\n\n${body.notes}` : body.notes;
                    }

                    const updates = {
                        status: isProgressed ? existingStatus : incomingStatus,
                        notes: mergedNotes || body.notes || existingLead.notes,
                        next_follow_up: existingLead.next_follow_up || body.nextFollowUp || body.next_follow_up || null,
                        follow_up_notes: existingLead.follow_up_notes || body.followUpNotes || body.follow_up_notes || null,
                        phone: body.phone || existingLead.phone,
                        company: body.company || existingLead.company,
                        message: body.message || existingLead.message,
                    };

                    const patchRes = await fetch(`${CRM_URL}/rest/v1/leads?id=eq.${existingLead.id}`, {
                        method: 'PATCH',
                        headers: {
                            'apikey': CRM_KEY,
                            'Authorization': `Bearer ${CRM_KEY}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=representation'
                        },
                        body: JSON.stringify(updates)
                    });
                    if (!patchRes.ok) return res.status(patchRes.status).json({ error: await patchRes.text() });
                    const updated = await patchRes.json();
                    return res.json({ success: true, updated: updated[0] || true, deduped: true, id: existingLead.id });
                }

                const leadRow = {
                    id: body.id || `lead_${Date.now()}`,
                    name: body.name || 'Anonymous Prospect',
                    email: body.email || 'lead@socialninjas.in',
                    phone: body.phone || null,
                    company: body.company || null,
                    website: body.website || null,
                    message: body.message || null,
                    source: body.source || 'main-contact-page',
                    status: body.status || 'New Inbound',
                    next_follow_up: body.nextFollowUp || body.next_follow_up || null,
                    follow_up_notes: body.followUpNotes || body.follow_up_notes || null,
                    notes: body.notes || null
                };

                const r = await fetch(`${CRM_URL}/rest/v1/leads?on_conflict=id`, {
                    method: 'POST',
                    headers: {
                        'apikey': CRM_KEY,
                        'Authorization': `Bearer ${CRM_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    body: JSON.stringify(leadRow)
                });
                if (!r.ok) return res.status(r.status).json({ error: await r.text() });
                return res.status(201).json({ success: true, lead: leadRow });
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error saving lead' });
            }
        }

        if (req.method === 'DELETE') {
            if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
            if (!id) return res.status(400).json({ error: 'id required' });
            try {
                const r = await fetch(`${CRM_URL}/rest/v1/leads?id=eq.${id}`, {
                    method: 'DELETE',
                    headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                });
                if (!r.ok) return res.status(r.status).json({ error: await r.text() });
                return res.json({ success: true });
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error deleting lead' });
            }
        }
    }

    // SCRIPTS (Supabase CRM)
    if (resource === 'scripts') {
        if (!isAuthorizedAdmin(req)) return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!CRM_KEY) return res.status(500).json({ error: 'Supabase service key is unconfigured' });

        if (req.method === 'GET') {
            try {
                const r = await fetch(`${CRM_URL}/rest/v1/scripts?select=*&order=created_at.desc`, {
                    headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                });
                if (!r.ok) return res.status(r.status).json({ error: 'Supabase error' });
                const rows = await r.json();
                return res.json(rows || []);
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error fetching scripts' });
            }
        }

        if (req.method === 'POST') {
            const body = req.body || {};
            const scriptRow = {
                id: body.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `sc_${Date.now()}`),
                profile: body.profile || body.brand || 'Social Ninjas',
                topic: body.topic || 'Untitled Script',
                yt_title: body.yt_title || body.ytTitle || body.title || '',
                hook: body.hook || '',
                section1: body.section1 || '',
                section2: body.section2 || '',
                section3: body.section3 || '',
                cta: body.cta || '',
                caption: body.caption || '',
                status: body.status || 'ready',
                created_at: body.created_at || new Date().toISOString()
            };
            try {
                const r = await fetch(`${CRM_URL}/rest/v1/scripts?on_conflict=id`, {
                    method: 'POST',
                    headers: {
                        'apikey': CRM_KEY,
                        'Authorization': `Bearer ${CRM_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    body: JSON.stringify(scriptRow)
                });
                if (!r.ok) return res.status(r.status).json({ error: await r.text() });
                return res.status(201).json({ success: true, script: scriptRow });
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error saving script' });
            }
        }

        if (req.method === 'DELETE') {
            if (!id) return res.status(400).json({ error: 'id required' });
            try {
                const r = await fetch(`${CRM_URL}/rest/v1/scripts?id=eq.${id}`, {
                    method: 'DELETE',
                    headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
                });
                if (!r.ok) return res.status(r.status).json({ error: await r.text() });
                return res.json({ success: true });
            } catch (e) {
                return res.status(500).json({ error: (e && e.message) || 'Error deleting script' });
            }
        }
    }

    return res.status(404).json({ error: 'Unknown resource' });
});

// ─────────────────────────────────────────────────────────────────
// J.A.R.V.I.S. Executive Dispatcher & Lead Intelligence API
// ─────────────────────────────────────────────────────────────────
const DEFAULT_SUPABASE_URL = 'https://mocqyvmntemsnmdusjcy.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4OTMwMzAsImV4cCI6MjEwMDQ2OTAzMH0.qt4ty1tjGeXMthhSaDZZo80u_JdPK4klUg3QAIhN0nw';

app.get('/api/jarvis', async (req, res) => {
    try {
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

        const leadsRes = await fetch(`${CRM_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=10`, {
            headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
        });
        const leads = leadsRes.ok ? await leadsRes.json() : [];

        res.json({
            status: 'online',
            system: "Social Ninja's J.A.R.V.I.S. Core",
            timestamp: new Date().toISOString(),
            pipeline: {
                total_recent_leads: leads.length,
                new_uncontacted: leads.filter(l => (l.status || '').toLowerCase().includes('new')).length
            },
            recent_leads: leads.slice(0, 5)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/jarvis', async (req, res) => {
    try {
        const body = req.body || {};
        const lead = {
            name: (body.name || '').trim(),
            email: (body.email || '').trim(),
            phone: (body.phone || '').trim(),
            budget: (body.budget || 'Unspecified').trim(),
            goals: (body.goals || body.message || 'Growth & scale').trim(),
            source: body.source || 'socialninjas.in/contact'
        };

        if (!lead.name && !lead.email) {
            return res.status(400).json({ error: 'Name or email is required' });
        }

        const groqKey = process.env.GROQ_API_KEY || '';
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

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
                            content: `You are J.A.R.V.I.S., the executive AI intelligence for Social Ninja's and Fit Ninja, founded by Nazim.

${JARVIS_CORP_INTEL}

Analyze the inbound lead and respond strictly with JSON:
{
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "recommended_service": "One of the 6 exact agency services",
  "pain_point": "Specific diagnostic of their business bottleneck",
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

        // Optional Telegram Alert
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;
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

        // Dispatch to n8n Webhook on Railway (for Multi-Platform Pipelines)
        const n8nLeadWebhook = process.env.N8N_LEAD_WEBHOOK || 'https://n8n-production-29f31.up.railway.app/webhook/socialninjas-lead';
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

        // Direct WhatsApp Alert to Nazim via Evolution API (Live on Railway)
        const evoApiUrl = process.env.EVOLUTION_API_URL || 'https://evolution-api-production-b3d9.up.railway.app';
        const evoApiKey = process.env.EVOLUTION_API_KEY || 'NinjaFitSecret2026';
        const evoInstance = process.env.EVOLUTION_INSTANCE || 'fitninja';
        const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || '918147757479';

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

        res.json({ success: true, analysis: aiAnalysis });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ─────────────────────────────────────────────────────────────────
// J.A.R.V.I.S. 2-Way Conversational WhatsApp Engine
// ─────────────────────────────────────────────────────────────────
app.post('/api/jarvis-chat', async (req, res) => {
    try {
        const body = req.body || {};
        const data = body.data || {};
        const key = data.key || {};
        const remoteJid = key.remoteJid || '';
        const fromMe = Boolean(key.fromMe);

        const messageObj = data.message || {};
        const incomingText = (messageObj.conversation || messageObj.extendedTextMessage?.text || '').trim();

        if (!incomingText || incomingText.startsWith('🤖') || incomingText.startsWith('🚨')) {
            return res.json({ status: 'ignored' });
        }

        const senderNumber = remoteJid.replace(/@.*$/, '');
        const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || '918147757479';
        const isFromAdmin = senderNumber.includes(adminPhone) || senderNumber === adminPhone || (fromMe && senderNumber.includes(adminPhone));
        const mentionsJarvis = incomingText.toLowerCase().includes('jarvis');

        if (!isFromAdmin && !mentionsJarvis) {
            return res.json({ status: 'unauthorized_sender', senderNumber });
        }

        // Live pipeline context from Supabase
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;

        let pipelineSummary = 'No recent leads found.';
        try {
            const leadsRes = await fetch(`${CRM_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=5`, {
                headers: { 'apikey': CRM_KEY, 'Authorization': `Bearer ${CRM_KEY}` }
            });
            if (leadsRes.ok) {
                const leads = await leadsRes.json();
                const uncontacted = leads.filter(l => (l.status || '').toLowerCase().includes('new') || (l.status || '').toLowerCase().includes('hot')).length;
                pipelineSummary = `Total Recent Leads: ${leads.length}, Uncontacted/Hot: ${uncontacted}. Latest: ${leads[0]?.name || 'None'}`;
            }
        } catch (_) {}

        // AI Reasoning via Groq Qwen 3.8
        const groqKey = process.env.GROQ_API_KEY || '';
        let replyText = "Sir, I have received your directive. All systems across Social Ninja's and Fit Ninja are running smoothly.";

        if (groqKey) {
            try {
                const systemPrompt = `You are J.A.R.V.I.S., the executive AI intelligence, chief of staff, and second brain for Nazim, founder of Social Ninja's and Fit Ninja.

${JARVIS_CORP_INTEL}

LIVE PIPELINE CONTEXT:
${pipelineSummary}

BEHAVIORAL DIRECTIVES:
- Style: Crisp, authoritative, highly competent, concise, executive tone (Iron Man's J.A.R.V.I.S.).
- WhatsApp format: Keep under 3-4 short paragraphs or bullet points. Use WhatsApp bold formatting like *this*. Always begin with 🤖.
- Product Rules: Never claim Fit Ninja works offline. Never use cheesy AI buzzwords. Enforce ₹99 intro / ₹399/mo renewal pricing.
- Lead Diagnostics: Always map lead budgets (<₹50K, ₹50K-₹2L, ₹2L-₹5L, ₹5L+) to their precise agency services.
- Content Generation: When asked for scripts/hooks/carousels, generate immediately ready-to-publish drafts tailored for luxury real estate, clinics, or B2B SaaS.`;

                const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
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
            } catch (_) {}
        }

        // Send reply back via Evolution API
        const evoApiUrl = process.env.EVOLUTION_API_URL || 'https://evolution-api-production-b3d9.up.railway.app';
        const evoApiKey = process.env.EVOLUTION_API_KEY || 'NinjaFitSecret2026';
        const evoInstance = process.env.EVOLUTION_INSTANCE || 'fitninja';

        await fetch(`${evoApiUrl}/message/sendText/${evoInstance}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': evoApiKey },
            body: JSON.stringify({ number: senderNumber || adminPhone, text: replyText })
        });

        res.json({ success: true, replySent: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
