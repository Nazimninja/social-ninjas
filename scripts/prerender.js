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
    <div style="font-size:16px;font-weight:700;color:#f0f0f0;letter-spacing:-0.3px;"><a href="/" style="color:#ffffff;text-decoration:none;">Social<span style="color:#1F4B99;">Ninja's</span></a></div>
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
      <div style="font-size:16px;font-weight:700;color:#f0f0f0;margin-bottom:16px;">Social<span style="color:#1F4B99;">Ninja's</span></div>
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
          <li><a href="/ai-products" style="color:#707080;text-decoration:none;">AI Content Studio</a></li>
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
    <main style="max-width:960px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Our Digital Growth Services</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">We build automated lead generation engines and scale brands through profit-focused media buying, high-converting creatives, and AI integrations.</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:60px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;">AI & Lead Automation</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Deploy custom conversational AI agents 24/7. Instantly respond, qualify, and schedule meetings from incoming leads over WhatsApp, SMS, and email.</p>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;">Performance Marketing</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Profitable paid advertising campaigns on Meta, Google, and LinkedIn. Bidding and spending managed mathematically to maximize Contribution Margin.</p>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;">Creative Studio</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">High-converting short-form videos, Reels, native ads, and landing page designs built specifically to scale customer acquisition costs.</p>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;">Technical SEO & Web</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Fast-loading, responsive landing pages and technical search engine optimization to capture high-intent buyers organically.</p>
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
            <span style="color:#1F4B99;font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Featured Product</span>
            <h3 style="font-size:26px;color:#ffffff;margin:8px 0 16px;">AI Content Studio</h3>
            <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin-bottom:20px;">Generate a full week of SEO-optimized social media posts in under 60 seconds. Our engine researches live search trends, formats native Hooks, and integrates with major channels automatically.</p>
            <a href="/app/content-studio" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Open Content Studio</a>
          </div>
        </div>
        
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:36px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:24px;">
          <div style="max-width:540px;">
            <span style="color:#2fcf8e;font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Active Product</span>
            <h3 style="font-size:26px;color:#ffffff;margin:8px 0 16px;">Fit Ninja</h3>
            <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin-bottom:20px;">Deploy personalized AI fitness and diet coaching. Delivers tailored daily macros, exercise plans, and motivational guidelines via instant messaging.</p>
            <a href="/contact" style="display:inline-block;border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;background:rgba(255,255,255,0.05);">Request Trial Access</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'contact': `
    <main style="max-width:680px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;text-align:center;">
      <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Book a Strategy Session</h1>
      <p style="font-size:17.5px;color:#a0a0b0;margin-bottom:36px;line-height:1.6;">Let's audit your sales funnel. Schedule a 30-minute growth roadmap consultation with our Bangalore team.</p>
      
      <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:36px;text-align:left;margin-bottom:40px;">
        <h3 style="font-size:20px;color:#ffffff;margin-bottom:20px;">Contact Details</h3>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:12px;line-height:1.6;"><strong>Office:</strong> Social Ninja's Agency, Bangalore, Karnataka, India</p>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:12px;line-height:1.6;"><strong>Email:</strong> team@socialninjas.in</p>
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:24px;line-height:1.6;"><strong>Hours:</strong> Mon - Sat | 10:00 AM - 7:00 PM IST</p>
        <a href="mailto:team@socialninjas.in" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Email Our Team</a>
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

  // CRITICAL: Replace the empty React root div with rich static HTML body for SEO crawlers and AdSense reviewers
  const wrappedHtml = wrapInLayout(contentBodyHtml);
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${wrappedHtml}</div>`
  );

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Dynamic routes list helper for index loop
const routes = {
  'services': {
    title: "Digital Growth & Marketing Services | Social Ninja's Agency Bangalore",
    description: "Explore our premium growth services in Bangalore & worldwide - AI Lead Automation, Performance Marketing, Creative Studio, Web & SEO, and Growth Consulting."
  },
  'about': {
    title: "About Social Ninja's | Top AI Automation & Marketing Agency in Bangalore",
    description: "Meet the team building premium AI products and revenue growth systems for modern brands worldwide."
  },
  'ai-products': {
    title: "AI Products & SaaS Suite | Social Ninja's — Content Studio, Fit Ninja & More",
    description: "Explore our suite of AI products: Content Studio writes a week of social content in 60 seconds, Fit Ninja delivers personalized AI fitness coaching, and more coming soon."
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
    title: "Book a Strategy Session | Social Ninja's Bangalore Marketing Agency",
    description: "Schedule a free 30-minute growth blueprint session with our Bangalore & global marketing team."
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
          <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Case Studies & Growth Proof</h1>
          <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">Real growth results engineered by Social Ninja's using AI lead qualifiers, organic content, and profit-focused Meta & Google media buys.</p>
          
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
          <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Digital Marketing & AI Blog</h1>
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

// 2. Render individual blog post pages with rich, complete static body content for crawlers
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

console.log('SPA SEO static pre-rendering completed successfully with complete body tags!');
