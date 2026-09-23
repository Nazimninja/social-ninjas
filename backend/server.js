import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { GoogleGenAI } from '@google/genai';

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
// UNIFIED /api/data — blogs
// ─────────────────────────────────────────────────────────────────
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
            if (!id) return res.status(400).json({ error: 'id required' });
            data.blogs = data.blogs.filter(b => b.id !== id);
            writeBlogs(data);
            return res.json({ success: true });
        }
    }

    // LEADS (Supabase CRM)
    if (resource === 'leads') {
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDg5MzAzMCwiZXhwIjoyMTAwNDY5MDMwfQ.3D1lYMhzIql9On42MvLq2B0iKAebqtdUKJvOxF1uxpE';

        if (req.method === 'GET') {
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
            try {
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
        const CRM_URL = process.env.SUPABASE_CRM_URL || process.env.SUPABASE_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
        const CRM_KEY = process.env.SUPABASE_CRM_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDg5MzAzMCwiZXhwIjoyMTAwNDY5MDMwfQ.3D1lYMhzIql9On42MvLq2B0iKAebqtdUKJvOxF1uxpE';

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
