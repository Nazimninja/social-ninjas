import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import twilio from 'twilio';

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
                max_tokens: req.body.max_tokens || 4000,
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
                max_tokens: req.body.max_tokens || 3000,
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
- Contact: If they want to speak to a human or engineer, direct them to email hello@socialninjas.com or use the /contact page.
Do NOT reveal you are an AI from Anthropic, you are 'Social Ninja's AI Assistant'. Provide short, conversational answers.`;

        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 500,
                system: systemPrompt,
                messages: req.body.messages
            })
        });

        if (!anthropicRes.ok) {
            const error = await anthropicRes.json();
            return res.status(anthropicRes.status).json(error);
        }

        const data = await anthropicRes.json();
        res.json(data);
    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ error: "Failed to communicate with AI chat provider" });
    }
});

// ─────────────────────────────────────────────────────────────────
// WHATSAPP OTP (TWILIO)
// ─────────────────────────────────────────────────────────────────
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

app.post('/api/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ error: "Phone number is required." });

        if (!twilioClient || !verifyServiceSid) {
            console.log(`[DEV MODE] OTP requested for ${phone}. Use '1234' to verify.`);
            return res.json({ success: true, mode: "test" });
        }

        // Send via WhatsApp (requires Twilio Verify configured for WhatsApp)
        const verification = await twilioClient.verify.v2.services(verifyServiceSid)
            .verifications.create({ to: `whatsapp:${phone}`, channel: 'whatsapp' });
            
        res.json({ success: true, status: verification.status });
    } catch (error) {
        console.error("OTP Send Error:", error);
        res.status(500).json({ error: "Failed to send OTP. Ensure number includes country code." });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    try {
        const { phone, code } = req.body;
        if (!phone || !code) return res.status(400).json({ error: "Phone and code required." });

        if (!twilioClient || !verifyServiceSid) {
            if (code === "1234") return res.json({ success: true, status: "approved" });
            return res.status(400).json({ error: "Invalid test code. Use 1234." });
        }

        const verification_check = await twilioClient.verify.v2.services(verifyServiceSid)
            .verificationChecks.create({ to: `whatsapp:${phone}`, code });
            
        if (verification_check.status === "approved") {
            res.json({ success: true, status: "approved" });
        } else {
            res.status(400).json({ error: "Invalid or expired verification code." });
        }
    } catch (error) {
        console.error("OTP Verify Error:", error);
        res.status(500).json({ error: "Failed to verify OTP with provider." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
