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

const CLIENTS_FILE = path.join(__dirname, 'data', 'clients.json');

// Helper to read clients
const readClients = () => {
    try {
        if (!fs.existsSync(CLIENTS_FILE)) {
            fs.writeFileSync(CLIENTS_FILE, JSON.stringify({}, null, 2));
        }
        const data = fs.readFileSync(CLIENTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading clients:', error);
        return {};
    }
};

// Helper to write clients
const writeClients = (data) => {
    try {
        fs.writeFileSync(CLIENTS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing clients:', error);
    }
};

const HISTORY_FILE = path.join(__dirname, 'data', 'history.json');

// Helper to read history
const readHistory = () => {
    try {
        if (!fs.existsSync(HISTORY_FILE)) {
            fs.writeFileSync(HISTORY_FILE, JSON.stringify({}, null, 2));
        }
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading history:', error);
        return {};
    }
};

// Helper to write history
const writeHistory = (data) => {
    try {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing history:', error);
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

// GET all clients
app.get('/api/clients', (req, res) => {
    const clients = readClients();
    res.json(Object.values(clients));
});

// POST or UPDATE a client
app.post('/api/clients', (req, res) => {
    const clients = readClients();
    const incomingData = req.body;
    
    // Attempt to match by ID first, then by email
    const existingId = incomingData.id || Object.keys(clients).find(k => 
        clients[k].email && clients[k].email.toLowerCase() === incomingData.email?.toLowerCase()
    );

    const clientId = existingId || `client_${Date.now()}`;
    const existingClient = clients[clientId] || {};

    // Merge logic: preserve joinDate if exists, overwrite everything else with incoming
    clients[clientId] = {
        ...existingClient,
        ...incomingData,
        id: clientId,
        updatedAt: new Date().toISOString()
    };
    
    // Ensure joinDate is captured even for early leads
    if (!clients[clientId].joinDate) {
        clients[clientId].joinDate = new Date().toLocaleDateString("en-US");
    }

    writeClients(clients);
    res.status(201).json(clients[clientId]);
});

// GET client history
app.get('/api/history/:clientId', (req, res) => {
    const history = readHistory();
    const clientHistory = history[req.params.clientId] || [];
    res.json(clientHistory);
});

// POST to update client history
app.post('/api/history/:clientId', (req, res) => {
    const history = readHistory();
    const clientId = req.params.clientId;
    const incomingHistory = req.body; // Expecting an array of generated posts
    
    // Merge or overwrite history completely for that client
    history[clientId] = incomingHistory;
    
    writeHistory(history);
    res.status(200).json({ success: true, count: history[clientId].length });
});

// ─────────────────────────────────────────────────────────────────
// AI SECURE PROXIES
// ─────────────────────────────────────────────────────────────────

// AI Content Generation Proxy
app.post('/api/generate', async (req, res) => {
    try {
        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: req.body.max_tokens || 8192,
                system: req.body.system,
                messages: req.body.messages,
                tools: req.body.tools
            })
        });

        if (!anthropicRes.ok) {
            const error = await anthropicRes.json();
            return res.status(anthropicRes.status).json(error);
        }

        const data = await anthropicRes.json();
        res.json(data);
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to communicate with AI provider" });
    }
});

// AI Weekly Analysis Proxy
app.post('/api/analysis', async (req, res) => {
    try {
        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: req.body.max_tokens || 8192,
                system: req.body.system,
                messages: req.body.messages,
                tools: req.body.tools
            })
        });

        if (!anthropicRes.ok) {
            const error = await anthropicRes.json();
            return res.status(anthropicRes.status).json(error);
        }

        const data = await anthropicRes.json();
        res.json(data);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ error: "Failed to analyze profile" });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const systemPrompt = `You are the official AI Support Agent for Social Ninja's, a premium digital growth & performance marketing agency.
Your goal is to be helpful, concise, authoritative, and friendly. Answer questions about the agency's services.
Key Info:
- Services: Content Studio (AI content generation), Lead Automation (Custom chatbots & CRM), Paid Ads (Meta/Google).
- Pricing (Content Studio): Starter ₹2,999/mo, Growth ₹5,499/mo, Pro ₹8,999/mo.
- Contact: If they want to speak to a human or engineer, direct them to email info@socialninjas.in or use the /contact page.
Do NOT reveal you are an AI, you are 'Social Ninja's AI Assistant'. Provide short, conversational answers.`;

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
});

// ─────────────────────────────────────────────────────────────────
// SMS OTP (2Factor.in)
// ─────────────────────────────────────────────────────────────────
app.post('/api/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ error: "Phone number is required." });

        const apiKey = process.env.TWOFACTOR_API_KEY;

        if (!apiKey) {
            console.log(`[DEV MODE] OTP requested for ${phone}. Use '1234' to verify.`);
            return res.json({ success: true, mode: "test", sessionId: "dev-session" });
        }

        const digits = phone.replace(/\D/g, '');
        let clean;
        if (digits.startsWith('91') && digits.length === 12) {
            clean = digits.slice(2);
        } else if (digits.length === 10) {
            clean = digits;
        } else {
            clean = digits;
        }

        console.log(`[OTP] Sending to: ${clean}`);

        const url = `https://2factor.in/API/V1/${apiKey}/SMS/${clean}/AUTOGEN`;
        const r = await fetch(url);
        const data = await r.json();

        if (data.Status === 'Success') {
            return res.json({ success: true, sessionId: data.Details });
        }
        res.status(400).json({ error: data.Details || 'Failed to send OTP' });
    } catch (error) {
        console.error("OTP Send Error:", error);
        res.status(500).json({ error: "Failed to send OTP. Please check the phone number." });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    try {
        const { phone, code, sessionId } = req.body;
        if (!phone || !code) return res.status(400).json({ error: "Phone and code required." });

        const apiKey = process.env.TWOFACTOR_API_KEY;

        if (!apiKey) {
            if (code === "1234") return res.json({ success: true, status: "approved" });
            return res.status(400).json({ error: "Invalid test code. Use 1234." });
        }

        const sid = sessionId || 'missing';
        const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sid}/${code}`;
        const r = await fetch(url);
        const data = await r.json();

        if (data.Status === 'Success' && data.Details === 'OTP Matched') {
            return res.json({ success: true, status: "approved" });
        }
        res.status(400).json({ error: "Invalid or expired code. Please try again." });
    } catch (error) {
        console.error("OTP Verify Error:", error);
        res.status(500).json({ error: "Failed to verify OTP with provider." });
    }
});

// ─────────────────────────────────────────────────────────────────
// PAYMENT VERIFICATION
// ─────────────────────────────────────────────────────────────────
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { paymentId, planId } = req.body;
        if (!paymentId) return res.status(400).json({ error: 'Payment ID required.' });

        // ✅ SECRET TEST BYPASS — owner only, never shown in UI
        if (paymentId === 'SN_TEST_2026') {
            console.log('[DEV/TEST] Test payment bypass accepted.');
            return res.json({ verified: true, mode: 'test', paymentId, message: 'Test bypass accepted' });
        }

        if (!paymentId.startsWith('pay_') || paymentId.length < 14) {
            return res.status(400).json({ verified: false, error: 'Invalid payment ID format.' });
        }

        const keyId     = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        // Dev mode — no Razorpay keys configured
        if (!keyId || !keySecret) {
            console.log(`[DEV MODE] Payment accepted without verification: ${paymentId}`);
            return res.json({ verified: true, mode: 'dev', paymentId });
        }

        // Production — verify with Razorpay
        const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const rzRes = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
            headers: { Authorization: `Basic ${credentials}` }
        });

        if (!rzRes.ok) {
            const err = await rzRes.json();
            return res.status(400).json({ verified: false, error: err.error?.description || 'Payment not found.' });
        }

        const payment = await rzRes.json();
        if (payment.status !== 'captured') {
            return res.status(400).json({ verified: false, error: `Payment status is "${payment.status}". Only captured payments accepted.` });
        }

        console.log(`✅ Payment verified: ${paymentId} | ₹${payment.amount / 100}`);
        return res.json({ verified: true, paymentId, amount: payment.amount / 100, status: payment.status });

    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({ error: 'Failed to verify payment.' });
    }
});

// ─────────────────────────────────────────────────────────────────
// TRIAL CHECK (local JSON fallback since no Upstash in dev)
// ─────────────────────────────────────────────────────────────────
const TRIALS_FILE = path.join(__dirname, 'data', 'trials.json');
const readTrials = () => {
    try {
        if (!fs.existsSync(TRIALS_FILE)) fs.writeFileSync(TRIALS_FILE, JSON.stringify({}, null, 2));
        return JSON.parse(fs.readFileSync(TRIALS_FILE, 'utf8'));
    } catch { return {}; }
};
const writeTrials = (data) => {
    try { fs.writeFileSync(TRIALS_FILE, JSON.stringify(data, null, 2)); } catch (e) { console.error(e); }
};

app.post('/api/check-trial', (req, res) => {
    const { email, phone, action } = req.body || {};
    const trials = readTrials();
    const cleanEmail = email ? email.toLowerCase().trim() : null;
    const cleanPhone = phone ? phone.replace(/\D/g, '') : null;

    if (action === 'save') {
        if (cleanEmail) trials[`email:${cleanEmail}`] = 1;
        if (cleanPhone) trials[`phone:${cleanPhone}`] = 1;
        writeTrials(trials);
        return res.json({ saved: true });
    }
    if (cleanEmail && trials[`email:${cleanEmail}`]) return res.json({ exists: true, reason: 'email' });
    if (cleanPhone && trials[`phone:${cleanPhone}`]) return res.json({ exists: true, reason: 'phone' });
    return res.json({ exists: false });
});

// ─────────────────────────────────────────────────────────────────
// UNIFIED /api/data — clients, history, blogs
// ─────────────────────────────────────────────────────────────────
app.all('/api/data', async (req, res) => {
    const resource = req.query.resource;
    const id       = req.query.id || req.query.clientId;

    // CLIENTS
    if (resource === 'clients') {
        if (req.method === 'GET') {
            return res.json(Object.values(readClients()));
        }
        if (req.method === 'POST') {
            const clients = readClients();
            const body    = req.body;
            const eid     = body.id || Object.keys(clients).find(k =>
                clients[k].email && clients[k].email.toLowerCase() === body.email?.toLowerCase()
            );
            const clientId = eid || `client_${Date.now()}`;
            clients[clientId] = { ...clients[clientId], ...body, id: clientId, updatedAt: new Date().toISOString() };
            if (!clients[clientId].joinDate) clients[clientId].joinDate = new Date().toLocaleDateString('en-IN');
            writeClients(clients);
            return res.status(201).json(clients[clientId]);
        }
    }

    // HISTORY
    if (resource === 'history') {
        const HISTORY_FILE2 = path.join(__dirname, 'data', 'history.json');
        const hist = readHistory();
        if (req.method === 'GET') {
            if (!id) return res.status(400).json({ error: 'Client ID required' });
            return res.json(hist[id] || []);
        }
        if (req.method === 'POST') {
            if (!id) return res.status(400).json({ error: 'Client ID required' });
            hist[id] = req.body;
            writeHistory(hist);
            return res.status(200).json({ success: true });
        }
    }

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

    return res.status(404).json({ error: 'Unknown resource' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
