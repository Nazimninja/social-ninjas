// data.js — Unified API for blogs, history, clients
// Blogs stored in Upstash Redis (same KV already used for trial protection)

const KV_URL   = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const r = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    const d = await r.json();
    return d.result ? JSON.parse(d.result) : null;
  } catch { return null; }
}

async function kvSet(key, value) {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(value) })
    });
    return true;
  } catch { return false; }
}

// Seed blogs — shown until admin creates real ones
const SEED_BLOGS = [
  {
    id: 'seed-1',
    title: 'Why 70% of Your Leads Are Going Cold (And How AI Fixes It in 60 Seconds)',
    excerpt: 'The average company takes 47 hours to respond to a new lead. Your competitor responds in under 1 second. Here\'s how to close that gap with AI.',
    content: `## The Lead Response Problem\n\nEvery day, your sales team is losing deals they don't even know exist.\n\nResearch from Harvard Business Review shows that companies who respond to leads within 1 hour are **7× more likely to qualify** that lead. Yet the average response time across industries is still 47 hours.\n\nThat's 47 hours of your prospect talking to your competition.\n\n## Why Traditional Follow-Up Fails\n\n1. **Human bandwidth is finite.** Your sales team can't be available 24/7.\n2. **Leads come in at unpredictable times.** Most B2C leads submit outside business hours.\n3. **Manual processes create inconsistency.** Not every lead gets the same quality of follow-up.\n\n## The AI Solution\n\nModern AI sales agents solve all three problems simultaneously:\n\n- **Instant response** — Under 1 second, 24/7, 365 days\n- **Consistent qualification** — Every lead gets the same high-quality questions\n- **Automatic booking** — Qualified leads land directly in your calendar\n\n## What This Looks Like in Practice\n\nOne of our clients in the fitness industry was manually following up with 50+ leads per day. Their close rate was 8%. After deploying an AI qualification agent:\n\n- Response time: 47 hours → 0.8 seconds\n- Qualified leads per week: 12 → 34\n- Close rate: 8% → 21%\n\nThe system didn't replace their sales team. It made their sales team 3× more effective by ensuring they only spoke to people who were actually ready to buy.\n\n## How to Get Started\n\nDeploying an AI sales agent doesn't require technical knowledge. The key is:\n\n1. Map your current qualification questions\n2. Define what a "qualified lead" looks like\n3. Set your calendar availability\n4. Let the agent handle the rest\n\nAt Social Ninja's, we build and deploy these systems for brands in 7–10 days. [Book a free demo](#contact) to see exactly how it would work for your business.`,
    author: 'Social Ninja\'s Team',
    category: 'AI & Automation',
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    slug: 'ai-lead-response-speed'
  },
  {
    id: 'seed-2',
    title: 'The Content Trap: Why Posting More Is Killing Your Engagement',
    excerpt: 'Most brands are posting 7 times a week and seeing 0.3% engagement. The solution isn\'t more content — it\'s smarter content backed by live trend data.',
    content: `## The Posting Frequency Myth\n\nEvery social media "guru" tells you to post every day. Multiple times. Consistency is key, they say.\n\nBut here's what the data actually shows:\n\nThe top 10% of Instagram accounts by engagement post an average of **3.2 times per week** — not 7. They win on *quality and timing*, not volume.\n\n## Why More Often = Less Reach\n\nPlatform algorithms are smarter than most marketers give them credit for. They track:\n\n- **Save rate** — Are people bookmarking your content?\n- **Share rate** — Are people sending it to friends?\n- **Watch time** — Are people watching your Reels to the end?\n- **Comment quality** — Are people having real conversations?\n\nWhen you post mediocre content to "stay consistent," you teach the algorithm that your content isn't worth amplifying. Your reach quietly shrinks — and you don't even notice until it's too late.\n\n## What Actually Drives Reach in 2026\n\n### 1. Trend Timing\nPosting about a topic 48 hours after it peaks gets you 60% less reach than posting during the rising phase. This requires live research — not a content calendar built 4 weeks ago.\n\n### 2. Platform-Native Hooks\nInstagram hooks are different from LinkedIn hooks, which are different from YouTube hooks. Generic captions that "work everywhere" actually work nowhere.\n\n### 3. Content Memory\nYour audience follows you because they trust your perspective. If you post the same angle twice, they disengage — and you never get a second chance at that first impression.\n\n## The Better Approach\n\nPost 3 times per week. But:\n\n- Research what's trending in your exact niche **this week**\n- Write platform-native copy with hooks that stop the scroll\n- Track which angles resonate and never repeat them\n\nThis is exactly what our AI Content Studio does — live trend research before every generation, permanent content memory, and platform-specific writing for every format.\n\n[Try 3 posts free, no card required →](/#/app/content-studio?plan=trial)`,
    author: 'Social Ninja\'s Team',
    category: 'Content Strategy',
    readTime: '4 min read',
    publishedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    slug: 'posting-frequency-engagement-trap'
  },
  {
    id: 'seed-3',
    title: 'ROAS is a Vanity Metric (Here\'s What to Track Instead)',
    excerpt: 'A 4× ROAS sounds impressive. But if your margins are 25%, you\'re losing money. Here\'s the metric framework that actually tells you if your ads are working.',
    content: `## The Problem With ROAS\n\nReturn on Ad Spend (ROAS) is the metric every agency reports. "We achieved 4× ROAS this month!" Sounds great.\n\nBut here's the math that most agencies don't show you:\n\n- Ad spend: ₹1,00,000\n- Revenue generated: ₹4,00,000 (4× ROAS ✓)\n- Cost of goods: ₹2,40,000 (60% COGS)\n- **Gross profit: ₹1,60,000**\n- **Net profit after ad spend: ₹60,000**\n\nYou spent ₹1 lakh to make ₹60k net. That's a 60% return on ad spend — not 400%.\n\nThis is why brands with "great ROAS" sometimes feel like they're always broke.\n\n## The Metrics That Actually Matter\n\n### 1. MER (Marketing Efficiency Ratio)\nTotal revenue ÷ Total marketing spend (across all channels). This is the number that matters for business health.\n\n### 2. nCAC (New Customer Acquisition Cost)\nHow much does it cost to acquire one *new* customer? This tells you if your ads are truly growing the business or just recirculating existing demand.\n\n### 3. LTV:CAC Ratio\nIf your customer lifetime value is ₹15,000 and your CAC is ₹3,000, you have a 5:1 ratio — healthy and scalable. Below 3:1 means your business model needs work before scaling ads.\n\n### 4. Contribution Margin per Order\n(Revenue - COGS - Variable shipping - Ad spend) ÷ Orders. This is your true per-order profitability.\n\n## Building a Proper Reporting Dashboard\n\nWe build these dashboards for every client. The key is connecting:\n\n- Your ad platforms (Meta, Google)\n- Your backend revenue data (Shopify, CRM)\n- Your actual COGS and margins\n\nWhen these are connected, you can see the truth — and make decisions that actually grow your business.\n\n**The brands that win at paid media aren't the ones with the highest ROAS. They're the ones who know their real numbers.**\n\n[Book a free revenue audit →](/contact)`,
    author: 'Social Ninja\'s Team',
    category: 'Performance Marketing',
    readTime: '6 min read',
    publishedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    slug: 'roas-vanity-metric-what-to-track'
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const resource = req.query.resource;
  const id       = req.query.id;

  // ── BLOGS ─────────────────────────────────────────────────────
  if (resource === 'blogs') {

    if (req.method === 'GET') {
      // Single post
      if (id) {
        const stored = await kvGet('sn_blogs');
        const all = stored || SEED_BLOGS;
        const post = all.find(b => b.id === id || b.slug === id);
        if (!post) return res.status(404).json({ error: 'Not found' });
        return res.json(post);
      }
      // All posts
      const stored = await kvGet('sn_blogs');
      const all = stored || SEED_BLOGS;
      // Return without full content for list view
      const list = all.map(({ content: _, ...rest }) => rest);
      return res.json(list.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
    }

    if (req.method === 'POST') {
      const body = req.body;
      if (!body.title) return res.status(400).json({ error: 'Title required' });
      const stored = await kvGet('sn_blogs') || [...SEED_BLOGS];
      const newPost = {
        id: body.id || `post-${Date.now()}`,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
        title: body.title,
        excerpt: body.excerpt || body.title,
        content: body.content || '',
        author: body.author || "Social Ninja's Team",
        category: body.category || 'Insights',
        readTime: body.readTime || '3 min read',
        publishedAt: body.publishedAt || new Date().toISOString(),
      };
      // Upsert
      const idx = stored.findIndex(b => b.id === newPost.id);
      if (idx >= 0) stored[idx] = newPost; else stored.unshift(newPost);
      await kvSet('sn_blogs', stored);
      return res.status(201).json(newPost);
    }

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'id required' });
      const stored = await kvGet('sn_blogs') || [...SEED_BLOGS];
      const updated = stored.filter(b => b.id !== id);
      await kvSet('sn_blogs', updated);
      return res.json({ success: true });
    }
  }

  // ── CLIENTS ───────────────────────────────────────────────────
  if (resource === 'clients') {
    if (req.method === 'GET') return res.json([]);
    if (req.method === 'POST') return res.status(201).json({ success: true });
  }

  // ── HISTORY ───────────────────────────────────────────────────
  if (resource === 'history') {
    if (req.method === 'GET') return res.json([]);
    if (req.method === 'POST') return res.status(200).json({ success: true });
  }

  return res.status(404).json({ error: 'Unknown resource' });
}
