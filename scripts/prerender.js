import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_PATH = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_PATH, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Build template not found at:', TEMPLATE_PATH);
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// HTML Layout templates for crawlers / SEO bots
const NAV_HTML = `
<nav style="position:fixed;top:0;width:100%;z-index:50;height:60px;background:rgba(7,9,14,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;">
  <div style="max-width:1120px;margin:0 auto;padding:0 28px;width:100%;display:flex;align-items:center;justify-content:space-between;font-family:system-ui,sans-serif;">
    <div style="font-size:16px;font-weight:700;color:#f0f0f0;letter-spacing:-0.3px;"><a href="/" style="color:#ffffff;text-decoration:none;">Social<span style="color:#3B82F6;">Ninja's</span></a></div>
    <div style="display:flex;align-items:center;gap:32px;">
      <a href="/services" style="font-size:14px;color:#a0a0b0;text-decoration:none;font-weight:500;">Services</a>
      <a href="/ai-products" style="font-size:14px;color:#a0a0b0;text-decoration:none;font-weight:500;">AI Products</a>
      <a href="/blog" style="font-size:14px;color:#a0a0b0;text-decoration:none;font-weight:500;">Blog</a>
      <a href="/about" style="font-size:14px;color:#a0a0b0;text-decoration:none;font-weight:500;">About</a>
      <a href="/contact" style="font-size:13.5px;font-weight:600;color:#fff;background:#1F4B99;border:none;border-radius:8px;padding:9px 20px;text-decoration:none;">Book a Call</a>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer style="background:#04060a;border-top:1px solid rgba(255,255,255,0.06);padding:60px 0;margin-top:auto;width:100%;font-family:system-ui,sans-serif;">
  <div style="max-width:1120px;margin:0 auto;padding:0 28px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;">
    <div style="max-width:280px;">
      <div style="font-size:16px;font-weight:700;color:#f0f0f0;margin-bottom:16px;">Social<span style="color:#3B82F6;">Ninja's</span></div>
      <p style="font-size:13.5px;color:#707080;line-height:1.6;">Automated growth systems and premium performance marketing partnerships for digital brands.</p>
    </div>
    <div style="display:flex;gap:60px;">
      <div>
        <h4 style="font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Agency</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;font-size:13.5px;">
          <li><a href="/services" style="color:#707080;text-decoration:none;">Services</a></li>
          <li><a href="/case-studies" style="color:#707080;text-decoration:none;">Case Studies</a></li>
          <li><a href="/about" style="color:#707080;text-decoration:none;">About Us</a></li>
          <li><a href="/contact" style="color:#707080;text-decoration:none;">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 style="font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Products</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;font-size:13.5px;">
          <li><a href="/ai-products" style="color:#707080;text-decoration:none;">Fit Ninja</a></li>
          <li><a href="/tools" style="color:#707080;text-decoration:none;">Free Business Tools</a></li>
        </ul>
      </div>
      <div>
        <h4 style="font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Legal</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;font-size:13.5px;">
          <li><a href="/privacy" style="color:#707080;text-decoration:none;">Privacy Policy</a></li>
          <li><a href="/terms" style="color:#707080;text-decoration:none;">Terms of Service</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div style="max-width:1120px;margin:40px auto 0;padding:24px 28px 0;border-top:1px solid rgba(255,255,255,0.04);font-size:13px;color:#505060;display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;">
    <span>© 2026 Social Ninja's Agency. All rights reserved.</span>
    <span>Made in Bangalore for the world.</span>
  </div>
</footer>
`;

// Helper to wrap body content in nav/footer structure
function wrapInLayout(contentHtml) {
  return `
    <div style="min-height:100vh;background:#07090e;color:#f0f0f0;font-family:'Plus Jakarta Sans',system-ui,sans-serif;display:flex;flex-direction:column;">
      ${NAV_HTML}
      ${contentHtml}
      ${FOOTER_HTML}
    </div>
  `;
}

// Convert markdown text to clean HTML
function markdownToHtml(md) {
  let html = md.trim();
  html = html.replace(/\r\n/g, '\n');
  
  // Replace headers
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 style="font-size:32px;font-weight:800;color:#ffffff;margin-top:40px;margin-bottom:20px;">$1</h1>');
  
  // Replace bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ffffff;">$1</strong>');
  
  // Replace list items
  html = html.replace(/^\-\s+(.+)$/gm, '<li style="margin-bottom:10px;color:#a0a0b0;line-height:1.6;">$1</li>');
  html = html.replace(/^\*\s+(.+)$/gm, '<li style="margin-bottom:10px;color:#a0a0b0;line-height:1.6;">$1</li>');
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li style="margin-bottom:10px;color:#a0a0b0;line-height:1.6;">$1</li>');
  
  // Group list items
  html = html.replace(/(<li.*?>[\s\S]*?<\/li>)/g, '<ul style="margin-bottom:24px;padding-left:24px;list-style-type:disc;">$1</ul>');
  html = html.replace(/<\/ul>\s*<ul style="margin-bottom:24px;padding-left:24px;list-style-type:disc;">/g, '');
  
  // Format paragraphs
  const lines = html.split('\n\n');
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li')) return trimmed;
    return `<p style="font-size:16px;line-height:1.75;color:#a0a0b0;margin-bottom:24px;">${trimmed}</p>`;
  });
  
  return formattedLines.join('\n');
}

// Custom parser to extract blog posts fully
function extractBlogPostsFull() {
  const postsFilePath = path.resolve(__dirname, '../data/blogPosts.ts');
  if (!fs.existsSync(postsFilePath)) return [];
  
  const fileContent = fs.readFileSync(postsFilePath, 'utf8');
  const posts = [];
  
  const idRegex = /id:\s*['"`]([^'"`]+)['"`]/g;
  let match;
  const matches = [];
  while ((match = idRegex.exec(fileContent)) !== null) {
    matches.push({ id: match[1], index: match.index });
  }
  
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const nextIndex = i < matches.length - 1 ? matches[i+1].index : fileContent.length;
    const postSegment = fileContent.substring(current.index, nextIndex);
    
    const titleMatch = postSegment.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : '';
    
    const excerptMatch = postSegment.match(/excerpt:\s*['"`]([^'"`]+)['"`]/);
    const excerpt = excerptMatch ? excerptMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : '';
    
    const categoryMatch = postSegment.match(/category:\s*['"`]([^'"`]+)['"`]/);
    const category = categoryMatch ? categoryMatch[1] : 'Growth';
    
    const dateMatch = postSegment.match(/date:\s*['"`]([^'"`]+)['"`]/);
    const date = dateMatch ? dateMatch[1] : '';

    const readTimeMatch = postSegment.match(/readTime:\s*['"`]([^'"`]+)['"`]/);
    const readTime = readTimeMatch ? readTimeMatch[1] : '5 min';
    
    let content = '';
    const contentStart = postSegment.indexOf('content: `');
    if (contentStart !== -1) {
      const contentEnd = postSegment.indexOf('`', contentStart + 10);
      if (contentEnd !== -1) {
        content = postSegment.substring(contentStart + 10, contentEnd);
      }
    }
    
    posts.push({
      id: current.id,
      title,
      excerpt,
      category,
      date,
      readTime,
      author: "Social Ninja's Team",
      content: content.trim()
    });
  }
  return posts;
}

// Render static HTML for marketing pages
const marketingPagesContent = {
  'services': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Everything Your Brand Needs To Scale Revenue &amp; Leads</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">We build automated lead generation engines and scale brands through profit-focused media buying, high-converting creatives, and AI integrations.</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-bottom:60px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/ai-automation" style="color:#ffffff;text-decoration:none;">AI &amp; Lead Automation</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Deploy custom conversational AI agents 24/7. Instantly respond, qualify, and schedule meetings from incoming leads over WhatsApp, SMS, and email.</p>
          <a href="/services/ai-automation" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/paid-ads" style="color:#ffffff;text-decoration:none;">Meta &amp; Google Ads Agency</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3.</p>
          <a href="/services/paid-ads" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/content-production" style="color:#ffffff;text-decoration:none;">Content Production That Converts</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views.</p>
          <a href="/services/content-production" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/email-whatsapp" style="color:#ffffff;text-decoration:none;">WhatsApp &amp; Email Automation That Sells</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you.</p>
          <a href="/services/email-whatsapp" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/social-media" style="color:#ffffff;text-decoration:none;">Social Media Management</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">End-to-end organic social growth covering copywriting, monthly content calendars, community replies, and viral trend monitoring.</p>
          <a href="/services/social-media" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/web-seo" style="color:#ffffff;text-decoration:none;">Web Design &amp; Technical SEO</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Fast-loading, sub-second landing pages and technical search engine optimization to capture high-intent buyers organically.</p>
          <a href="/services/web-seo" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Learn More →</a>
        </div>
      </div>
    </main>
  `,
  'about': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-bottom:24px;line-height:1.2;">About Social Ninja's</h1>
      <p style="font-size:17.5px;line-height:1.7;color:#a0a0b0;margin-bottom:24px;">Social Ninja's is a premium digital growth partner. Founded in Bangalore in 2022, we engineer automated revenue funnels and manage paid media for high-growth brands worldwide.</p>
      
      <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:40px;margin-bottom:16px;">Our Core Philosophy</h2>
      <p style="font-size:16px;line-height:1.75;color:#a0a0b0;margin-bottom:20px;">We reject vanity metrics like clicks and impressions. Our media buyers focus on unit economics and Contribution Margin (net profit after ad spend, COGS, and shipping). By combining AI automation with conversion-focused design, we help D2C and B2B brands achieve predictable scale.</p>
      
      <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:40px;margin-bottom:16px;">Our Experience</h2>
      <p style="font-size:16px;line-height:1.75;color:#a0a0b0;margin-bottom:20px;">Since 2022, we have partnered with over 150 companies. Our engineers deploy custom LLM pipelines, HubSpot integrations, and outbound sales tools. We run advertising operations out of Bangalore and support clients across India, North America, and the GCC region.</p>
    </main>
  `,
  'ai-products': `
    <main style="max-width:960px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Our AI Product Suite</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">Automated SaaS products engineered by Social Ninja's to handle marketing tasks, lead nurturing, and business operations.</p>
      
      <div style="display:flex;flex-direction:column;gap:36px;margin-bottom:60px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:36px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:24px;">
          <div style="max-width:540px;">
            <span style="color:#2fcf8e;font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Active Product</span>
            <h3 style="font-size:26px;color:#ffffff;margin:8px 0 16px;">Fit Ninja</h3>
            <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin-bottom:20px;">Deploy personalized fitness and workout tracking. Delivers structured training splits, progressive overload logging, rest timers, and exercise guides.</p>
            <a href="/contact" style="display:inline-block;border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;background:rgba(255,255,255,0.05);">Request Trial Access</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'contact': `
    <main style="max-width:680px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;text-align:center;">
      <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Book a Strategy Session</h1>
      <p style="font-size:17.5px;color:#a0a0b0;margin-bottom:36px;line-height:1.6;">Let's audit your sales funnel. Schedule a 30-minute growth roadmap consultation with our global strategy team.</p>
      
      <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:36px;text-align:left;margin-bottom:40px;">
        <h3 style="font-size:20px;color:#ffffff;margin-bottom:20px;">Contact Details</h3>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:12px;line-height:1.6;"><strong>Office:</strong> Social Ninja's Agency, Bangalore, Karnataka, India</p>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:12px;line-height:1.6;"><strong>Email:</strong> info@socialninjas.in</p>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:24px;line-height:1.6;"><strong>Hours:</strong> Mon - Sat | 10:00 AM - 7:00 PM IST</p>
        <a href="mailto:info@socialninjas.in" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Email Our Team</a>
      </div>
    </main>
  `,
  'privacy': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;line-height:1.7;">
      <h1 style="font-size:36px;font-weight:800;color:#ffffff;margin-bottom:24px;">Privacy Policy</h1>
      <p style="color:#a0a0b0;margin-bottom:20px;">Last updated: August 10, 2026</p>
      <p style="color:#a0a0b0;margin-bottom:20px;">Social Ninja's ("we", "our", or "us") is committed to protecting your privacy. This policy describes how we collect, use, and share personal information when you use our website (socialninjas.in) and our marketing products.</p>
      
      <h2 style="font-size:22px;color:#ffffff;margin-top:32px;margin-bottom:16px;">1. Information We Collect</h2>
      <p style="color:#a0a0b0;margin-bottom:20px;">We collect information that you provide directly to us, such as when you fill out contact forms, book consultations, or subscribe to our AI content tools. This includes name, email address, phone number, and business details.</p>
      
      <h2 style="font-size:22px;color:#ffffff;margin-top:32px;margin-bottom:16px;">2. Cookies and Tracking</h2>
      <p style="color:#a0a0b0;margin-bottom:20px;">We use essential cookies and tracking tags (like Google Analytics) to measure site traffic and improve performance. You can disable cookies in your browser settings if preferred.</p>
    </main>
  `,
  'terms': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;line-height:1.7;">
      <h1 style="font-size:36px;font-weight:800;color:#ffffff;margin-bottom:24px;">Terms of Service</h1>
      <p style="color:#a0a0b0;margin-bottom:20px;">Last updated: August 10, 2026</p>
      <p style="color:#a0a0b0;margin-bottom:20px;">Please read these Terms of Service ("Terms") carefully before using the socialninjas.in website operated by Social Ninja's Agency Bangalore.</p>
      
      <h2 style="font-size:22px;color:#ffffff;margin-top:32px;margin-bottom:16px;">1. Acceptance of Terms</h2>
      <p style="color:#a0a0b0;margin-bottom:20px;">By accessing our site or using our automated business tools, you agree to comply with and be bound by these Terms and our Privacy Policy.</p>
    </main>
  `
};

// Prerender individual service pages with exact 1.1A copy spec
const servicesPrerenderData = {
  'paid-ads': {
    title: "Meta & Google Ads Agency | 4.5x Average ROAS",
    h1: "Meta & Google Ads Engineered for Profit",
    tagline: "Creative-first campaigns run on unit economics, not vanity metrics.",
    description: "Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3. Get a free Meta & Google ads audit.",
    hero: "Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3. We engineer full-funnel media buying campaigns across Meta, Google, and LinkedIn that target high-intent buyers, optimize unit economics, and eliminate wasted spend.",
    problem: "You have likely tried boosting posts, running ads yourself, or working with agencies that deliver vanity metrics like clicks and impressions while sales stay flat. Rising customer acquisition costs (CAC), uncalibrated attribution, and ad fatigue destroy campaign margins when media buying lacks direct-response discipline.",
    solution: "We rebuild your entire customer acquisition architecture. Starting with full conversion tracking verification (Meta CAPI & GA4), we design high-converting direct-response creatives, launch disciplined A/B testing matrices, and optimize bids mathematically based on net contribution margin — scaling what generates profit and cutting what does not.",
    stats: [
      ['4.5x', 'Avg ROAS by month 3'],
      ['150+', 'Brands Scaled'],
      ['₹40Cr+', 'Media Spend Managed'],
      ['97%', 'Client Retention Rate'],
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'Deep forensic audit of past ad accounts, tracking architecture (Meta CAPI & GA4), and baseline unit economics.' },
      { step: '02', title: 'Creative Testing', desc: 'Deploying direct-response hook matrices across static ads, value carousels, and high-retention video variations.' },
      { step: '03', title: 'Scale', desc: 'Mathematical bid and budget scaling focused on winning ad sets that produce profitable Contribution Margin.' },
      { step: '04', title: 'CRO Loop', desc: 'Continuous landing page optimization and post-click offer testing to steadily reduce acquisition costs.' },
    ],
    benefits: [
      'Meta ads management across Facebook, Instagram & Audience Network',
      'Google ads management across Search, YouTube & Performance Max',
      'Creative matrix testing with weekly direct-response variations',
      'Landing page CRO & offer architecture to maximize conversion rate',
      'Weekly transparent executive reporting focused on CAC & ROAS',
      'Full-funnel dynamic retargeting & custom audience segmentation',
    ],
    faqs: [
      {
        q: 'How fast until results?',
        a: 'Initial creative testing and pixel calibration take 14 to 21 days. Most clients achieve stabilized customer acquisition costs and profitable scaling within 45 to 60 days.'
      },
      {
        q: 'What budget do I need?',
        a: 'We typically recommend a minimum monthly ad spend of ₹1,00,000 ($1,500 USD) to ensure sufficient conversion data for rapid creative and audience testing.'
      },
      {
        q: 'Do you require creative from us?',
        a: 'We offer flexible workflows: you can share raw product footage/assets, or our creative studio can script, design, and produce high-converting direct-response static and video creatives from scratch.'
      },
      {
        q: 'What makes you different from other ad agencies?',
        a: 'We reject vanity metrics like impressions and cheap clicks. We manage media buying on unit economics and Contribution Margin (net profit after ad spend, COGS, and shipping), scaling winning campaigns with relentless direct-response creative testing.'
      }
    ],
    cta: 'Get a Free Meta & Google Ads Audit'
  },
  'content-production': {
    title: "Content Production Services for Brands | Social Ninja's",
    h1: "Content Production That Converts",
    tagline: "High-converting video scripts, carousel graphics and social posts, generated and scheduled for your niche.",
    description: "Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views.",
    hero: "Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views. We produce high-velocity short-form videos, UGC-style creatives, and scroll-stopping visuals built specifically to turn cold viewers into paying customers.",
    problem: "Producing consistent, high-performing content requires videographers, direct-response scriptwriters, motion editors, and performance analysts. In-house production is slow and costly, while typical creative agencies deliver aesthetic art projects with zero conversion focus.",
    solution: "Our Creative Studio functions as your agile direct-response production team. We research high-performing competitor hooks, write psychologically calibrated scripts, and edit high-velocity creative packages designed for platform algorithms and maximum conversion rate.",
    stats: [
      ['3x', 'Average Engagement Lift'],
      ['48hrs', 'Rapid Creative Turnaround'],
      ['100%', 'Commercial Asset Ownership'],
      ['Data-Led', 'Every Frame Tested'],
    ],
    process: [
      { step: '01', title: 'Niche Research', desc: 'Algorithmic competitor teardown and viral hook discovery tailored to your industry.' },
      { step: '02', title: 'Script & Storyboard', desc: 'Direct-response scriptwriting with high-retention visual hooks and persuasive psychological framing.' },
      { step: '03', title: 'Production & Editing', desc: 'High-velocity video cutting, motion graphics, audio calibration, and formatting for vertical feeds.' },
      { step: '04', title: 'Review & Schedule', desc: 'Pre-scheduled calendar approvals and continuous performance iteration based on conversion metrics.' },
    ],
    benefits: [
      'Viral script writing tailored to your niche and market sophistication',
      'Short-form video production direction for Reels, Shorts & TikTok',
      'Carousel & graphic design engineered for high click-through rates',
      'Content calendar planning & automated multi-platform scheduling',
      'Niche audio models & trending sound curation for algorithmic reach',
      'Bi-weekly creative refresh cycles to combat ad fatigue and sustain scale',
    ],
    faqs: [
      {
        q: 'Who owns the content?',
        a: 'You own 100% of all scripts, video assets, graphics, and source files. All commercial rights belong to your brand permanently.'
      },
      {
        q: 'How many assets per month?',
        a: 'Packages typically range from 15 to 30 custom assets per month, combining vertical short-form videos (Reels/Shorts), multi-slide carousels, and high-CTR static ad graphics.'
      },
      {
        q: 'Can you match our brand voice?',
        a: 'Yes. During onboarding, we conduct a comprehensive brand audit and build a custom style guide, vocabulary matrix, and visual playbook to ensure every script and graphic feels native to your brand.'
      }
    ],
    cta: 'Build My Creative Strategy'
  },
  'email-whatsapp': {
    title: "WhatsApp Marketing & Email Automation Services",
    h1: "WhatsApp & Email Automation That Sells",
    tagline: "AI agents and automation sequences that qualify, nurture and close leads inside the apps your customers actually open.",
    description: "Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you.",
    hero: "Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you. We build high-converting automated Email and WhatsApp marketing funnels that engage leads instantly, recover abandoned revenue, and generate consistent repeat purchases on autopilot.",
    problem: "Most businesses rely solely on paid acquisition and neglect lead nurturing. Inbound leads grow cold within hours, abandoned checkouts are left unrecovered, and manual WhatsApp messaging is impossible to scale across hundreds of prospects.",
    solution: "We design and deploy automated lifecycle marketing systems. By integrating official WhatsApp Cloud API and Klaviyo/HubSpot email infrastructure, we deliver personalized sub-second messages, segmented broadcast campaigns, and automated sales sequences that nurture leads into loyal buyers.",
    stats: [
      ['< 1s', 'Response Time'],
      ['24/7', 'Always Online'],
      ['98%', 'WhatsApp Open Rate'],
      ['25-40%', 'Revenue From Retention'],
    ],
    process: [
      { step: '01', title: 'Infrastructure & API Setup', desc: 'Official WhatsApp Cloud API verification and email domain authentication (SPF, DKIM, DMARC).' },
      { step: '02', title: 'Flow Mapping & Copy', desc: 'Engineering high-converting welcome, abandoned checkout, and post-purchase conversational pathways.' },
      { step: '03', title: 'CRM Integration', desc: 'Bi-directional data syncing between WhatsApp, web forms, and your core sales CRM pipelines.' },
      { step: '04', title: 'Automated Scaling', desc: 'Deploying behavioral broadcast drops, automated re-engagement triggers, and VIP retention offers.' },
    ],
    benefits: [
      'WhatsApp broadcast & drip campaigns using official Cloud API',
      'AI DM & chat qualifier with sub-second intelligent response',
      'Email nurture sequences engineered for high open and click rates',
      'Automated abandoned-cart & abandoned-inquiry recovery flows',
      'CRM + calendar sync with HubSpot, Supabase, and Google Calendar',
      'Strict deliverability optimization & Meta template compliance verification',
    ],
    faqs: [
      {
        q: "Is WhatsApp automation compliant with Meta's policies?",
        a: "Yes. We deploy exclusively via the official Meta WhatsApp Business Cloud API with pre-approved opt-in templates, ensuring 100% compliance, zero risk of bans, and highest delivery rates."
      },
      {
        q: 'Do I need WhatsApp Business API?',
        a: 'Yes, scaling automated broadcasts and multi-agent inboxes requires the official WhatsApp Business API. We manage the entire verification and setup process for your business phone number.'
      },
      {
        q: 'How do you avoid spam filters?',
        a: 'We implement strict opt-in verification, warm up sender domains, configure SPF/DKIM/DMARC for email, and use behavioral segmenting so prospects only receive relevant, high-value communications.'
      }
    ],
    cta: 'Automate My Revenue Funnels'
  },
  'social-media': {
    title: "Social Media Management & Organic Growth | Social Ninja's",
    h1: "Social Media Management",
    tagline: "Consistent brand dominance and organic growth — without manual overhead.",
    description: "End-to-end social media management for modern brands. Content strategy, daily posting, copywriting, trend research, and community engagement.",
    hero: "Social media growth requires relentless consistency and algorithmic resonance. Finding time to research trending formats, write engaging copy, produce graphics, post daily, and reply to comments is nearly impossible while managing core business operations. We take over your social media presence end-to-end.",
    problem: "Sporadic posting fails to build momentum. Platform algorithms heavily favor active accounts that post high-retention content consistently. Posting generic updates once a week gets swallowed by the feed while your competitors capture market attention.",
    solution: "We manage your social media channels completely. Our team builds a custom monthly content calendar, writes platform-specific copy, creates carousels and reels, schedules posts at peak engagement windows, and engages with your community in real time.",
    stats: [
      ['2x', 'Organic Reach In 90 Days'],
      ['Daily', 'Consistent Posting Schedule'],
      ['All Channels', 'Instagram, LinkedIn, X, Meta'],
      ['Monthly', 'Clear Transparent Reports'],
    ],
    process: [
      { step: '01', title: 'Brand & Niche Audit', desc: 'Analyzing current profile performance, competitor engagement gaps, and audience demographics.' },
      { step: '02', title: 'Content Blueprint', desc: 'Crafting monthly pillars: educational carousels, authority builder posts, and engagement reels.' },
      { step: '03', title: 'Design & Copywriting', desc: 'Writing punchy, platform-native copy paired with clean, on-brand graphic design.' },
      { step: '04', title: 'Publishing & Community', desc: 'Deploying at peak times, managing incoming comments, and reviewing monthly performance reports.' },
    ],
    benefits: [
      'Data-driven monthly content strategy aligned with your target audience and brand voice',
      'Platform-optimized copywriting, visual carousels, and hashtag strategy',
      'Consistent posting schedule scheduled during highest-activity audience windows',
      'Community management: Active replies to inbound comments, mentions, and questions',
      'Real-time trend and algorithm monitoring to capitalize on viral opportunities',
      'Monthly performance reviews tracking organic impressions, follower growth, and click-throughs',
    ],
    faqs: [
      {
        q: 'Which social platforms do you manage?',
        a: 'We manage Instagram, LinkedIn, X (Twitter), Facebook, and YouTube channels, with strategies tailored for B2B authority or B2C engagement.'
      },
      {
        q: 'Do I get to review and approve posts before they go live?',
        a: 'Yes. You receive a monthly content calendar in advance with all copy, designs, and scheduling dates for review and approval.'
      },
      {
        q: 'How do you capture our unique brand tone?',
        a: 'We conduct an onboarding brand audit and interview your team to establish brand guidelines, preferred vocabulary, and positioning rules.'
      },
      {
        q: 'Does organic social media replace paid advertising?',
        a: 'Organic social media builds brand credibility, trust, and search equity that makes your paid advertising perform significantly better by improving conversion rates.'
      }
    ],
    cta: 'Manage My Social Media'
  },
  'ai-automation': {
    title: "AI & Lead Automation Agency | Social Ninja's",
    h1: "AI & Lead Automation",
    tagline: "Your 24/7 sales and qualification engine — powered by AI.",
    description: "Deploy autonomous conversational AI agents that reply to leads in under 1 second, qualify buyers, and book meetings 24/7 across WhatsApp, web, and CRM.",
    hero: "Most businesses lose qualified prospects simply because they respond too slowly. The average company takes 47 hours to follow up with an inbound inquiry. By then, the buyer has already purchased from a competitor. We deploy autonomous conversational AI agents that engage, qualify, and book meetings in under 1 second.",
    problem: "Your sales team cannot be online 24/7. Leads inquire late at night, on weekends, and during meetings. Every hour without an immediate response causes conversion rates to plummet.",
    solution: "We engineer and deploy custom AI sales agents trained on your specific product offerings, objection handling, and qualification criteria. The agent engages every inquiry instantly, answers questions conversationally, and books appointments directly into your calendar.",
    stats: [
      ['0.8s', 'Average Reply Time'],
      ['14x', 'Faster Than Human Teams'],
      ['24/7', 'Always Available'],
      ['3x', 'Lead Conversion Lift'],
    ],
    process: [
      { step: '01', title: 'Knowledge Base Curation', desc: 'Structuring your product docs, objection handling playbooks, and qualification criteria.' },
      { step: '02', title: 'Custom Agent Training', desc: 'Building prompt architecture, retrieval boundaries (RAG), and deterministic fallback rules.' },
      { step: '03', title: 'Omnichannel Integration', desc: 'Deploying web chat widgets, WhatsApp Cloud API, and calendar booking webhooks.' },
      { step: '04', title: 'Live Optimization', desc: 'Continuous transcript auditing, objection tuning, and conversion rate optimization.' },
    ],
    benefits: [
      'Sub-second conversational response to every incoming lead day or night',
      'Automated lead qualification matching your specific Ideal Customer Profile (ICP)',
      'Direct calendar booking into Google Calendar, Outlook, and Calendly',
      'Multi-channel deployment: Website live chat, WhatsApp Cloud API, Instagram DMs',
      'Automated multi-channel follow-up sequences across SMS and email',
      'Real-time CRM logging to Supabase, HubSpot, and custom sales pipelines',
    ],
    faqs: [
      {
        q: 'Does the AI hallucinate or give false information to clients?',
        a: 'No. Our agents use Retrieval-Augmented Generation (RAG) strictly bounded by your approved knowledge base, FAQs, and pricing documentation. If an unknown question arises, it seamlessly flags a human rep.'
      },
      {
        q: 'How long does it take to build and deploy our AI agent?',
        a: 'Our engineering team configures, tests, and deploys your custom agent within 7 to 10 business days.'
      },
      {
        q: 'Can the agent book appointments directly into my team\'s calendar?',
        a: 'Yes. The agent connects directly to Calendly, Cal.com, or Google Calendar, checking real-time availability and booking slots without double-booking.'
      },
      {
        q: 'Which channels does the AI agent support?',
        a: 'We deploy across your website, WhatsApp Business API, Instagram Direct Messages, and email.'
      }
    ],
    cta: 'Set Up My AI Agent'
  },
  'web-seo': {
    title: "Web Design & Technical SEO Agency | Social Ninja's",
    h1: "Web Design & Technical SEO",
    tagline: "Sub-second load times, technical SEO dominance, and high-converting landing pages.",
    description: "High-performance website development and technical SEO engineering. Sub-second load times, structured schema markup, and top Google rankings.",
    hero: "Your website should be an automated sales machine that ranks on Google and turns visitors into paying clients around the clock. If your site is slow, poorly indexed, or fails to convert traffic, revenue is leaking. We engineer sub-second websites and technical SEO architectures that dominate search results and maximize conversions.",
    problem: "Most agency websites look aesthetically pleasing but convert poorly. Slow loading times, bloated code, poor mobile responsiveness, missing schema markup, and weak search intent targeting prevent websites from ranking on page 1 of Google.",
    solution: "We conduct comprehensive audits across technical speed, keyword search intent, and user conversion funnels. We optimize Core Web Vitals, implement rich JSON-LD structured data, write keyword-rich content, and rebuild page architectures to maximize lead generation.",
    stats: [
      ['Top 3', 'Average Google Ranking In 6 Months'],
      ['< 1s', 'Sub-Second Load Times'],
      ['100%', 'Google PageSpeed Score'],
      ['2.5x', 'Average Conversion Rate Lift'],
    ],
    process: [
      { step: '01', title: 'Technical Audit', desc: 'Full architectural scan covering indexing, Core Web Vitals, crawl errors, and backlink health.' },
      { step: '02', title: 'Architecture & Code Optimization', desc: 'Refactoring page speed, implementing static pre-rendering, and embedding JSON-LD schemas.' },
      { step: '03', title: 'High-Intent Content Strategy', desc: 'Publishing targeted service guides and articles addressing high-intent buyer searches.' },
      { step: '04', title: 'Rankings & CRO Monitoring', desc: 'Tracking search console positions, optimizing internal links, and fine-tuning lead capture funnels.' },
    ],
    benefits: [
      'Comprehensive technical SEO audit and architectural optimization',
      'High-intent keyword research targeting buyers actively searching for your solutions',
      'Sub-second website engineering with optimized Core Web Vitals (LCP, FID, CLS)',
      'Rich JSON-LD structured data markup (Organization, Service, FAQ, Product schemas)',
      'Conversion-rate-optimized (CRO) landing pages with clear CTAs and friction-free lead forms',
      'Monthly keyword ranking and organic traffic analytics reporting',
    ],
    faqs: [
      {
        q: 'How long does SEO take to produce measurable traffic and rankings?',
        a: 'Technical SEO fixes and indexation updates typically show improvements within 30 to 45 days. Competitive keyword rankings and sustained organic traffic growth usually compound between 3 to 6 months.'
      },
      {
        q: 'What is Generative Engine Optimization (GEO)?',
        a: 'GEO optimizes your brand\'s digital footprint so AI search engines like ChatGPT, Google AI Overviews, and Perplexity cite and recommend your business when users search for your solutions.'
      },
      {
        q: 'Will you redesign our existing website or build from scratch?',
        a: 'We can optimize and speed up your existing website or build a brand-new, lightning-fast custom web application depending on your architecture and growth goals.'
      },
      {
        q: 'Do you provide website hosting and maintenance?',
        a: 'Yes. We deploy on global edge CDN infrastructure (like Cloudflare) ensuring 99.99% uptime, enterprise SSL, and global sub-second delivery.'
      }
    ],
    cta: 'Audit My Website & SEO'
  },
  'growth-consulting': {
    title: "Revenue Growth Consulting | Social Ninja's",
    h1: "Revenue Growth Consulting",
    tagline: "A data-driven 90-day scaling roadmap — and rigorous accountability.",
    description: "Strategic marketing audits, unit economic analysis, and 90-day execution roadmaps for founders and marketing teams ready to scale predictably.",
    hero: "Sometimes scaling does not require more random marketing tactics. It requires an objective, data-driven audit of your entire revenue funnel to identify where margins are leaking, what channels are working, and what clear priorities will accelerate bottom-line profit.",
    problem: "Founders and marketing teams often operate too close to day-to-day operations to pinpoint structural bottlenecks. Budget is wasted across fragmented initiatives with no clear attribution, while team execution lacks focus.",
    solution: "We conduct an exhaustive audit of your revenue engine — customer unit economics, acquisition funnels, conversion rates, and retention loops. We deliver an actionable 90-day growth roadmap and hold weekly strategy check-ins to ensure rigorous execution.",
    stats: [
      ['40%', 'Average Revenue Lift In Q1'],
      ['90 Days', 'From Audit To Scaled Execution'],
      ['Weekly', 'Executive Strategy Check-ins'],
      ['100%', 'You Own Every Strategy & Doc'],
    ],
    process: [
      { step: '01', title: 'Data Diagnostic', desc: 'Forensic review of revenue streams, CAC/LTV dynamics, churn, and team workflows.' },
      { step: '02', title: 'Bottleneck Mapping', desc: 'Isolating conversion leaks across media buying, landing pages, and lead follow-up.' },
      { step: '03', title: '90-Day Execution Roadmap', desc: 'Delivering an uncompromising, step-by-step master plan with prioritized milestones.' },
      { step: '04', title: 'Weekly Strategy Sprints', desc: 'Weekly 60-minute executive check-ins and asynchronous guidance to keep execution on track.' },
    ],
    benefits: [
      'Comprehensive marketing and sales funnel audit across all touchpoints',
      'Unit economics and Contribution Margin analysis (CAC, LTV, payback period)',
      'Clear 90-day prioritized execution roadmap with defined milestones',
      'Conversion Rate Optimization (CRO) review for landing pages and checkout flows',
      'Weekly executive advisory sessions and progress tracking',
      'Full documentation, SOPs, and marketing playbooks owned entirely by your team',
    ],
    faqs: [
      {
        q: 'Who is Revenue Growth Consulting best suited for?',
        a: 'It is built for founders, CEOs, and marketing leaders running businesses doing at least ₹25L–₹1Cr+ ($30K–$120K+) monthly revenue who need strategic clarity and scalable growth systems.'
      },
      {
        q: 'What is included in the 90-day growth roadmap?',
        a: 'A prioritized step-by-step master plan covering channel economics, creative strategy, conversion bottlenecks, automated follow-up systems, and weekly KPI benchmarks.'
      },
      {
        q: 'How frequently do we meet during the consulting engagement?',
        a: 'We conduct a weekly 60-minute strategy sprint and provide continuous asynchronous support via private Slack or WhatsApp channels.'
      }
    ],
    cta: 'Book a Strategy Session'
  }
};
// Aliases
servicesPrerenderData['performance-marketing'] = servicesPrerenderData['paid-ads'];
servicesPrerenderData['creative-studio'] = servicesPrerenderData['content-production'];

function generateServiceHtml(slug, data) {
  return `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <a href="/services" style="color:#38bdf8;text-decoration:none;font-size:14px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">← Back to Services</a>
      <div style="margin-top:24px;margin-bottom:12px;color:#38bdf8;font-size:12.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Social Ninja's Flagship Capability</div>
      <h1 style="font-size:clamp(32px,5vw,54px);font-weight:800;color:#ffffff;line-height:1.15;margin-bottom:16px;letter-spacing:-0.03em;">${data.h1}</h1>
      <p style="font-size:19px;color:#38bdf8;font-weight:500;margin-bottom:20px;line-height:1.4;">${data.tagline}</p>
      <p style="font-size:16px;line-height:1.75;color:#a0a0b0;margin-bottom:40px;max-width:820px;border-left:2px solid rgba(56,189,248,0.4);padding-left:20px;">${data.hero}</p>
      
      <!-- Stats -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:60px;">
        ${data.stats.map(([num, label]) => `
          <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-top:2px solid #38bdf8;border-radius:14px;padding:24px 20px;text-align:center;">
            <div style="font-size:32px;font-weight:800;color:#38bdf8;margin-bottom:6px;line-height:1;">${num}</div>
            <div style="font-size:13px;color:#94a3b8;font-weight:500;">${label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Problem & Solution -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-bottom:60px;">
        <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-top:2px solid #ef4444;border-radius:16px;padding:32px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#f87171;margin-bottom:12px;">The Cost of Inaction</div>
          <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;">Why typical strategies stall growth</h3>
          <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">${data.problem}</p>
        </div>
        <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-top:2px solid #38bdf8;border-radius:16px;padding:32px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;margin-bottom:12px;">The Engineered Solution</div>
          <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;">How our system scales predictably</h3>
          <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">${data.solution}</p>
        </div>
      </div>

      <!-- What's Included -->
      <div style="margin-bottom:60px;">
        <div style="text-align:center;margin-bottom:32px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">WHAT'S INCLUDED</span>
          <h2 style="font-size:32px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">Everything included in your engagement.</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;">
          ${data.benefits.map(b => `
            <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px 22px;color:#d0d0e0;font-size:14.5px;line-height:1.5;display:flex;align-items:flex-start;gap:12px;">
              <span style="color:#38bdf8;font-weight:700;font-size:16px;">✓</span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Process -->
      ${data.process && data.process.length > 0 ? `
        <div style="margin-bottom:60px;">
          <div style="text-align:center;margin-bottom:32px;">
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">THE PROCESS</span>
            <h2 style="font-size:32px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">How we execute and scale.</h2>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
            ${data.process.map(p => `
              <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
                <div style="font-size:24px;font-weight:800;color:#38bdf8;margin-bottom:10px;">${p.step}</div>
                <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px;margin-top:0;">${p.title}</h3>
                <p style="font-size:14px;color:#94a3b8;line-height:1.6;margin:0;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- FAQ Section -->
      <div style="max-width:800px;margin:0 auto 60px;width:100%;">
        <div style="text-align:center;margin-bottom:32px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">FREQUENTLY ASKED QUESTIONS</span>
          <h2 style="font-size:30px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">Common questions about this service.</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${data.faqs.map(faq => `
            <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
              <h3 style="font-size:17px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:10px;">${faq.q}</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- CTA -->
      <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:56px 32px;text-align:center;">
        <h2 style="font-size:32px;font-weight:800;color:#ffffff;margin-bottom:16px;">Ready to engineer predictable growth?</h2>
        <p style="font-size:16px;color:#94a3b8;margin-bottom:28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.6;">Schedule a confidential 30-minute growth roadmap session. We will audit your current acquisition funnels and present a concrete execution strategy.</p>
        <a href="/contact" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;">${data.cta} →</a>
      </div>
    </main>
  `;
}

// Generate static HTML for a given route
function prerenderRoute(route, metadata, contentBodyHtml) {
  const targetDir = path.join(DIST_PATH, route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const url = `https://socialninjas.in/${route}`;
  
  let html = template;
  
  // Replace Title
  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${metadata.title}</title>`
  );
  
  // Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${metadata.description}" />`
  );
  
  // Replace Open Graph metadata
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${metadata.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${metadata.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`
  );

  // Replace Twitter metadata
  html = html.replace(
    /<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:title" content="${metadata.title}" />`
  );
  html = html.replace(
    /<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:description" content="${metadata.description}" />`
  );

  // Inject JSON-LD structured schemas if provided
  if (metadata.schemas && Array.isArray(metadata.schemas)) {
    const schemasHtml = metadata.schemas
      .map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
      .join('\n');
    html = html.replace('</head>', `${schemasHtml}\n</head>`);
  }

  // CRITICAL: Replace the empty React root div with rich static HTML body for SEO crawlers and AdSense reviewers
  const wrappedHtml = wrapInLayout(contentBodyHtml);
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${wrappedHtml}</div>`);
  } else {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>(?=\s*<script)/i,
      `<div id="root">${wrappedHtml}</div>`
    );
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Dynamic routes list helper for index loop
const routes = {
  'services': {
    title: "Digital Growth & Marketing Services | Social Ninja's Agency",
    description: "Explore our premium growth services worldwide - AI Lead Automation, Paid Ads, Creative Studio, Email & WhatsApp Automation, and Technical SEO."
  },
  'about': {
    title: "About Social Ninja's | Global AI Automation & Performance Marketing Agency",
    description: "Meet the team building premium AI products and revenue growth systems for modern brands worldwide."
  },
  'ai-products': {
    title: "Products & SaaS Suite | Social Ninja's — Fit Ninja & More",
    description: "Explore our suite of SaaS products: Fit Ninja delivers personalized fitness coaching, alongside AI sales agents, and more."
  },
  'case-studies': {
    title: "Case Studies | Real Growth Results | Social Ninja's",
    description: "See the proof. Real client results — 6.1x ROAS for D2C skincare, +134% B2B pipeline growth, 4.2M organic views for a food brand. No fluff, just data."
  },
  'blog': {
    title: "Digital Marketing & AI Agency Blog | Insights by Social Ninja's",
    description: "Expert performance marketing advice, AI agency guides, and B2B growth systems from the Social Ninja's team."
  },
  'contact': {
    title: "Book a Strategy Session | Social Ninja's Global Growth Agency",
    description: "Schedule a free 30-minute growth blueprint session with our global marketing team."
  },
  'privacy': {
    title: "Privacy Policy | Social Ninja's",
    description: "Read our privacy policy regarding data collection and usage."
  },
  'terms': {
    title: "Terms & Conditions | Social Ninja's",
    description: "Read the terms of service and conditions for using our website and products."
  }
};

// ── Execute Prerendering ──
console.log('Starting static route pre-rendering for SPA...');

const blogPosts = extractBlogPostsFull();
console.log(`Extracted ${blogPosts.length} blog posts to pre-render.`);

// 1. Render standard marketing pages
for (const [route, meta] of Object.entries(routes)) {
  try {
    let pageHtml = marketingPagesContent[route] || `
      <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
        <h1 style="color:#ffffff;font-size:32px;margin-bottom:16px;">${meta.title}</h1>
        <p style="color:#a0a0b0;font-size:16px;line-height:1.6;">${meta.description}</p>
      </main>
    `;

    // Dynamic case-studies page body
    if (route === 'case-studies') {
      pageHtml = `
        <main style="max-width:960px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
          <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Case Studies &amp; Growth Proof</h1>
          <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">Real growth results engineered by Social Ninja's using AI lead qualifiers, organic content, and profit-focused Meta &amp; Google media buys.</p>
          
          <div style="display:flex;flex-direction:column;gap:32px;">
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:32px;">
              <span style="color:#1F4B99;font-size:13px;font-weight:600;text-transform:uppercase;">D2C Skincare Brand</span>
              <h3 style="font-size:24px;color:#ffffff;margin:8px 0 16px;">6.1x Return on Ad Spend (ROAS) Scaling</h3>
              <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin-bottom:0;">How we audited COGS and shipping timelines, rebuilt conversion funnels, and optimized creative velocity to achieve 6.1x MER at scale.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:32px;">
              <span style="color:#2fcf8e;font-size:13px;font-weight:600;text-transform:uppercase;">International B2B SaaS</span>
              <h3 style="font-size:24px;color:#ffffff;margin:8px 0 16px;">+134% Sales Pipeline Growth</h3>
              <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin-bottom:0;">Connecting custom Hubspot webhooks to LangChain AI agents to scrape prospect domains and follow up instantly over WhatsApp.</p>
            </div>
          </div>
        </main>
      `;
    }

    // Dynamic blog list page body
    if (route === 'blog') {
      let postListHtml = '<div style="display:flex;flex-direction:column;gap:28px;">';
      blogPosts.forEach(post => {
        postListHtml += `
          <article style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
            <span style="color:#1F4B99;font-size:13px;font-weight:600;text-transform:uppercase;">${post.category}</span>
            <h3 style="font-size:22px;color:#ffffff;margin:8px 0 12px;"><a href="/blog/${post.id}" style="color:#ffffff;text-decoration:none;">${post.title}</a></h3>
            <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">${post.excerpt}</p>
            <a href="/blog/${post.id}" style="color:#1F4B99;text-decoration:none;font-weight:600;font-size:14.5px;">Read Article →</a>
          </article>
        `;
      });
      postListHtml += '</div>';

      pageHtml = `
        <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
          <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Digital Marketing &amp; AI Blog</h1>
          <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;line-height:1.6;">Performance marketing playbooks, outbound sales automations, and B2B scaling blueprints written by Social Ninja's.</p>
          ${postListHtml}
        </main>
      `;
    }

    prerenderRoute(route, meta, pageHtml);
    console.log(`✓ Pre-rendered: /${route}`);
  } catch (err) {
    console.error(`✗ Failed to pre-render: /${route}`, err.message);
  }
}

// 2. Render individual service pages with rich complete static body and schema markup
console.log('Pre-rendering service pages...');
for (const [slug, data] of Object.entries(servicesPrerenderData)) {
  try {
    const route = `services/${slug}`;
    const serviceHtml = generateServiceHtml(slug, data);

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.description,
      "provider": {
        "@type": "Organization",
        "name": "Social Ninja's",
        "url": "https://socialninjas.in"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    prerenderRoute(route, {
      title: data.title,
      description: data.description,
      schemas: [serviceSchema, faqSchema]
    }, serviceHtml);

    console.log(`✓ Pre-rendered: /${route} (Complete body & schemas written)`);
  } catch (err) {
    console.error(`✗ Failed to pre-render service page: /services/${slug}`, err.message);
  }
}

// 3. Render static 404 page
try {
  const notFoundHtml = `
    <main style="max-width:800px;margin:140px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;text-align:center;">
      <div style="font-size:72px;font-weight:800;color:#38bdf8;margin-bottom:16px;">404</div>
      <h1 style="font-size:32px;font-weight:800;color:#ffffff;margin-bottom:16px;">Page Not Found</h1>
      <p style="color:#a0a0b0;font-size:16px;line-height:1.6;margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto;">The page you are looking for does not exist or may have been relocated.</p>
      <a href="/" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">Back to Home</a>
    </main>
  `;
  prerenderRoute('404', {
    title: "404: Page Not Found | Social Ninja's",
    description: "The requested page does not exist."
  }, notFoundHtml);

  // Also copy directly to dist/404.html for Cloudflare Pages native 404 handling
  const dist404 = path.join(DIST_PATH, '404.html');
  const dist404Index = path.join(DIST_PATH, '404/index.html');
  if (fs.existsSync(dist404Index)) {
    fs.copyFileSync(dist404Index, dist404);
  }
  console.log(`✓ Pre-rendered: /404 and generated dist/404.html`);
} catch (err) {
  console.error(`✗ Failed to pre-render 404 page`, err.message);
}

// 4. Render individual blog post pages with rich, complete static body content for crawlers
blogPosts.forEach(post => {
  try {
    const route = `blog/${post.id}`;
    const articleHtml = `
      <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
        <span style="color:#1F4B99;font-weight:600;font-size:13.5px;text-transform:uppercase;letter-spacing:1px;">${post.category}</span>
        <h1 style="font-size:clamp(28px,5vw,44px);font-weight:800;color:#ffffff;line-height:1.25;margin:12px 0 24px;letter-spacing:-0.5px;">${post.title}</h1>
        
        <div style="display:flex;align-items:center;gap:16px;color:#707080;font-size:13.5px;margin-bottom:40px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <span>By ${post.author}</span>
          <span>•</span>
          <span>${post.date}</span>
          <span>•</span>
          <span>${post.readTime} read</span>
        </div>
        
        <div class="article-content" style="color:#a0a0b0;line-height:1.75;">
          ${markdownToHtml(post.content)}
        </div>
      </main>
    `;

    prerenderRoute(route, {
      title: `${post.title} | Social Ninja's Blog`,
      description: post.excerpt
    }, articleHtml);
    console.log(`✓ Pre-rendered: /${route} (Complete body written)`);
  } catch (err) {
    console.error(`✗ Failed to pre-render blog post: /blog/${post.id}`, err.message);
  }
});

console.log('SPA SEO static pre-rendering completed successfully with complete body tags and service pages!');
