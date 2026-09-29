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
      <a href="/tools" style="font-size:14px;color:#a0a0b0;text-decoration:none;font-weight:500;">Free Tools</a>
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
      <div style="margin-top:14px;font-size:12px;color:#808090;line-height:1.5;">
        <span style="color:#a0a0b0;font-weight:600;">HQ:</span> Social Ninja's Agency, Bangalore, Karnataka, India<br>
        <span style="color:#606070;">Global Partner Hub: Business Bay, Dubai, UAE</span>
      </div>
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

  // Replace links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#38bdf8;text-decoration:underline;">$1</a>');

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

    const publishedAtMatch = postSegment.match(/publishedAt:\s*['"`]([^'"`]+)['"`]/);
    const publishedAt = publishedAtMatch ? publishedAtMatch[1].substring(0, 10) : '';

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
      publishedAt,
      readTime,
      author: "Social Ninja's Team",
      content: content.trim()
    });
  }
  return posts;
}

// Render static HTML for marketing pages
const marketingPagesContent = {
  '': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <!-- Hero -->
      <div style="text-align:center;max-width:840px;margin:0 auto 48px;">
        <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;">
          <span style="width:8px;height:8px;border-radius:50%;background:#34d399;display:inline-block;"></span>
          150+ Brands Scaled Globally Since 2022
        </div>
        <h1 style="font-size:clamp(32px,5vw,56px);font-weight:900;color:#ffffff;line-height:1.1;margin:0 0 20px;letter-spacing:-0.03em;">
          AI-Powered Growth Systems <span style="color:#38bdf8;">That Scale Revenue.</span>
        </h1>
        <p style="font-size:18px;color:#a0a0b0;line-height:1.6;margin:0 0 32px;max-width:680px;margin-left:auto;margin-right:auto;">
          We build autonomous <a href="/services/ai-automation" style="color:#38bdf8;text-decoration:underline;">AI lead pipelines</a>, run high-margin <a href="/services/paid-ads" style="color:#38bdf8;text-decoration:underline;">Meta &amp; Google ad campaigns</a>, and deploy automated content systems engineered for repeatable profit. Explore our <a href="/tools" style="color:#38bdf8;text-decoration:underline;">free growth tools</a> to forecast returns and streamline outreach.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">Book Free Audit →</a>
          <a href="/services" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;">Explore Core Systems</a>
        </div>
      </div>

      <!-- Proof Metrics (The Real Stat Numbers) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:60px 0;text-align:center;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 20px;">
          <div style="font-size:38px;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:8px;">4.8×</div>
          <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:4px;">Average Client ROAS</div>
          <div style="font-size:12px;color:#707080;">Across Meta &amp; Google Ads</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 20px;">
          <div style="font-size:38px;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:8px;">₹40Cr+</div>
          <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:4px;">Media Spend Managed</div>
          <div style="font-size:12px;color:#707080;">Data-driven ad campaigns</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 20px;">
          <div style="font-size:38px;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:8px;">150+</div>
          <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:4px;">Active Brand Partners</div>
          <div style="font-size:12px;color:#707080;">Worldwide client base</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 20px;">
          <div style="font-size:38px;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:8px;">97%</div>
          <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:4px;">Client Retention Rate</div>
          <div style="font-size:12px;color:#707080;">Month-over-month stability</div>
        </div>
      </div>

      <!-- Core Growth Systems -->
      <div style="margin-top:80px;">
        <div style="text-align:center;margin-bottom:40px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">CORE GROWTH SYSTEMS</span>
          <h2 style="font-size:36px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">Engineered for Predictable Scale</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
            <div style="font-size:24px;font-weight:800;color:#f97316;margin-bottom:12px;">01</div>
            <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;"><a href="/services/ai-automation" style="color:#ffffff;text-decoration:none;">AI Lead &amp; Sales Automation</a></h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0 0 16px;">Custom AI agents reply to Instagram DMs, WhatsApp, and web forms in under 1 second — qualifying, nurturing, and booking leads into your calendar 24/7 without manual work.</p>
            <a href="/services/ai-automation" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore AI &amp; Lead Automation →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
            <div style="font-size:24px;font-weight:800;color:#38bdf8;margin-bottom:12px;">02</div>
            <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;"><a href="/services/paid-ads" style="color:#ffffff;text-decoration:none;">Performance Paid Ads Engine</a></h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0 0 16px;">Creative-first Meta and Google campaigns engineered on unit economics, not vanity metrics. Average client reaches 4.5× ROAS by month 3 with our automated ad testing system.</p>
            <a href="/services/paid-ads" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Performance Paid Ads →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
            <div style="font-size:24px;font-weight:800;color:#ec4899;margin-bottom:12px;">03</div>
            <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;"><a href="/services/content-production" style="color:#ffffff;text-decoration:none;">Content Creation &amp; Branding</a></h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0 0 16px;">High-converting video scripts, carousel graphics, and social posts generated and scheduled automatically for your target niche.</p>
            <a href="/services/content-production" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Content Production →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
            <div style="font-size:24px;font-weight:800;color:#10b981;margin-bottom:12px;">04</div>
            <h3 style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:12px;"><a href="/services/web-seo" style="color:#ffffff;text-decoration:none;">Full-Funnel CRO &amp; Web Systems</a></h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0 0 16px;">High-speed landing pages and checkout systems optimized for maximum conversion rate, instant speed scores, and zero lead dropoff.</p>
            <a href="/services/web-seo" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore CRO &amp; Web Systems →</a>
          </div>
        </div>
      </div>

      <!-- Free Growth & Finance Tools -->
      <div style="margin-top:80px;padding-top:60px;border-top:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:36px;">
          <div>
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">FREE GROWTH TOOLS</span>
            <h2 style="font-size:32px;font-weight:800;color:#ffffff;margin-top:14px;margin-bottom:8px;">Calculators &amp; Conversion Utilities</h2>
            <p style="font-size:14.5px;color:#94a3b8;margin:0;">100% free client-side tools built by Social Ninja's for founders, marketers, and operators — zero signup required.</p>
          </div>
          <a href="/tools" style="color:#38bdf8;font-weight:700;font-size:14px;text-decoration:none;">Browse All Free Tools →</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px;"><a href="/tools/whatsapp-link-generator" style="color:#ffffff;text-decoration:none;">WhatsApp Link Generator</a></h3>
            <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">Create direct wa.me chat links with custom pre-filled messages and free QR codes.</p>
            <a href="/tools/whatsapp-link-generator" style="color:#34d399;text-decoration:none;font-weight:700;font-size:13px;">Use Tool →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px;"><a href="/tools/us-take-home-pay-calculator" style="color:#ffffff;text-decoration:none;">US Take-Home Pay Calculator</a></h3>
            <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">Estimate net pay after federal, state, and FICA taxes across all 50 US states.</p>
            <a href="/tools/us-take-home-pay-calculator" style="color:#38bdf8;text-decoration:none;font-weight:700;font-size:13px;">Use Tool →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px;"><a href="/tools/hourly-to-salary-calculator" style="color:#ffffff;text-decoration:none;">Hourly to Salary Calculator</a></h3>
            <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">Convert hourly wages to annual salary, monthly, and weekly gross income with overtime.</p>
            <a href="/tools/hourly-to-salary-calculator" style="color:#c084fc;text-decoration:none;font-weight:700;font-size:13px;">Use Tool →</a>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px;"><a href="/tools/mortgage-rate-calculator" style="color:#ffffff;text-decoration:none;">Mortgage Payment Calculator</a></h3>
            <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">Calculate monthly PITI mortgage payments including property taxes, home insurance, and PMI.</p>
            <a href="/tools/mortgage-rate-calculator" style="color:#fbbf24;text-decoration:none;font-weight:700;font-size:13px;">Use Tool →</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'services': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Digital Growth &amp; Marketing Services</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">We build automated lead generation engines and scale brands through profit-focused media buying, high-converting creatives, and AI integrations.</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-bottom:60px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/ai-automation" style="color:#ffffff;text-decoration:none;">AI &amp; Lead Automation</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Deploy custom conversational AI agents 24/7. Instantly respond, qualify, and schedule meetings from incoming leads over WhatsApp, SMS, and email.</p>
          <a href="/services/ai-automation" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore AI &amp; Lead Automation →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/paid-ads" style="color:#ffffff;text-decoration:none;">Meta &amp; Google Ads Agency</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3.</p>
          <a href="/services/paid-ads" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Meta &amp; Google Ads →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/content-production" style="color:#ffffff;text-decoration:none;">Content Production That Converts</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views.</p>
          <a href="/services/content-production" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Content Production That Converts →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/email-whatsapp" style="color:#ffffff;text-decoration:none;">WhatsApp &amp; Email Automation That Sells</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you.</p>
          <a href="/services/email-whatsapp" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore WhatsApp &amp; Email Automation →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/social-media" style="color:#ffffff;text-decoration:none;">Social Media Management</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">End-to-end organic social growth covering copywriting, monthly content calendars, community replies, and viral trend monitoring.</p>
          <a href="/services/social-media" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Social Media Management →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/web-seo" style="color:#ffffff;text-decoration:none;">Web Design &amp; Technical SEO</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Fast-loading, sub-second landing pages and technical search engine optimization to capture high-intent buyers organically.</p>
          <a href="/services/web-seo" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Web Design &amp; Technical SEO →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/geo-agency" style="color:#ffffff;text-decoration:none;">Generative Engine Optimization (GEO)</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Get your brand cited and recommended by ChatGPT Search, Perplexity AI, Google Gemini, and Claude. Entity building and LLM citation frameworks.</p>
          <a href="/services/geo-agency" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore GEO Agency →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/instagram-seo" style="color:#ffffff;text-decoration:none;">Instagram SEO Services</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Turn Instagram into a high-intent search acquisition channel with keyword-optimized bios, captions, reels, and hashtag clusters that non-followers discover.</p>
          <a href="/services/instagram-seo" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore Instagram SEO →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/meta-ads-audit" style="color:#ffffff;text-decoration:none;">Free Meta Ads Audit</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">A forensic, no-fluff audit of your Meta ad account: tracking check, creative fatigue diagnosis, and the 3 high-leverage fixes with the biggest immediate ROAS upside.</p>
          <a href="/services/meta-ads-audit" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Claim Free Meta Ads Audit →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/services/ai-appointment-setter" style="color:#ffffff;text-decoration:none;">AI Appointment Setter</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">An autonomous AI setter that answers every DM, web form, and WhatsApp message in under 1 second, qualifies prospects, and books them into your calendar 24/7.</p>
          <a href="/services/ai-appointment-setter" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Explore AI Appointment Setter →</a>
        </div>
      </div>
    </main>
  `,
  'about': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-bottom:24px;line-height:1.2;">About Social Ninja's</h1>
      <p style="font-size:17.5px;line-height:1.7;color:#a0a0b0;margin-bottom:24px;">Social Ninja's is a premium digital growth partner. Founded in Bangalore in 2022, we engineer automated revenue funnels and manage paid media for high-growth brands worldwide.</p>

      <!-- Proof Numbers -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin:36px 0;text-align:center;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
          <div style="font-size:32px;font-weight:800;color:#38bdf8;">150+</div>
          <div style="font-size:12px;font-weight:700;color:#e2e8f0;margin-top:6px;">Active Brand Partners</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
          <div style="font-size:32px;font-weight:800;color:#38bdf8;">₹40Cr+</div>
          <div style="font-size:12px;font-weight:700;color:#e2e8f0;margin-top:6px;">Ad Spend Managed</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
          <div style="font-size:32px;font-weight:800;color:#38bdf8;">4.8×</div>
          <div style="font-size:12px;font-weight:700;color:#e2e8f0;margin-top:6px;">Average Client ROAS</div>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
          <div style="font-size:32px;font-weight:800;color:#38bdf8;">97%</div>
          <div style="font-size:12px;font-weight:700;color:#e2e8f0;margin-top:6px;">Retention Rate</div>
        </div>
      </div>
      
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
        <p style="color:#a0a0b0;font-size:15px;margin-bottom:8px;line-height:1.6;"><strong>Office Headquarters:</strong> Social Ninja's Agency, Bangalore, Karnataka, India</p>
        <p style="color:#707080;font-size:13.5px;margin-bottom:8px;line-height:1.6;"><strong>Global Partner Hub:</strong> Business Bay, Dubai, UAE</p>
        <p style="margin-bottom:12px;"><a href="https://www.google.com/maps/place/Social+Ninja's/@21.0680074,82.7525294,17z/data=!3m1!4b1!4m6!3m5!1s0x2027c91d5288325f:0xbad4c06d3856e671!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11zyznkfn_" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;font-size:13.5px;font-weight:600;text-decoration:none;">View on Google Maps →</a></p>
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
  `,
  'tools': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Free Tools</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:680px;line-height:1.6;">Free tools from the Social Ninja's team — built for founders, marketers and operators.</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-bottom:60px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/tools/whatsapp-link-generator" style="color:#ffffff;text-decoration:none;">WhatsApp Direct Chat Link Generator</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Generate pre-filled instant WhatsApp chat links and QR codes for your ad campaigns, Instagram bios, and lead funnels.</p>
          <a href="/tools/whatsapp-link-generator" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Open Tool →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/tools/us-take-home-pay-calculator" style="color:#ffffff;text-decoration:none;">US Take-Home Pay &amp; Tax Calculator</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Calculate accurate net take-home pay after federal FICA, state, and local deductions across all 50 US states.</p>
          <a href="/tools/us-take-home-pay-calculator" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Open Tool →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/tools/hourly-to-salary-calculator" style="color:#ffffff;text-decoration:none;">Hourly ↔ Annual Wage Converter</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Convert hourly rates to annual, monthly, bi-weekly, and weekly equivalents in real time.</p>
          <a href="/tools/hourly-to-salary-calculator" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Open Tool →</a>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:12px;"><a href="/tools/mortgage-rate-calculator" style="color:#ffffff;text-decoration:none;">Mortgage Payment Calculator with Taxes &amp; Insurance</a></h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;margin-bottom:16px;">Estimate monthly PITI mortgage payments including principal, interest, taxes, and PMI with full amortization schedule.</p>
          <a href="/tools/mortgage-rate-calculator" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">Open Tool →</a>
        </div>
      </div>

      <div style="max-width:800px;margin:40px auto 0;width:100%;box-sizing:border-box;">
        <div style="text-align:center;margin-bottom:32px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">FREQUENTLY ASKED QUESTIONS</span>
          <h2 style="font-size:30px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">Questions About Our Free Tools</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:17px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:10px;">Is the WhatsApp link generator free?</h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">Yes — free forever, no signup required. You can generate custom WhatsApp direct-chat links and QR codes instantly.</p>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:17px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:10px;">Are the salary and wage calculators accurate for all 50 US states?</h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">Yes. Our take-home pay and salary calculators calculate federal income tax, FICA (Social Security &amp; Medicare), state taxes, and local deductions across all 50 US states.</p>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:17px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:10px;">Do you store any personal, financial, or phone number data?</h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">No. All calculations and link generations run locally in your browser session. We do not store your numbers, salaries, or financial inputs.</p>
          </div>
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <h3 style="font-size:17px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:10px;">Can marketing teams use these tools for client campaigns?</h3>
            <p style="font-size:14.5px;color:#94a3b8;line-height:1.7;margin:0;">Yes. All Social Ninja's growth and financial utilities are 100% free to use for personal projects, client campaigns, and commercial workflows.</p>
          </div>
        </div>
      </div>
    </main>
  `,
  'tools/whatsapp-link-generator': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <div style="text-align:center;max-width:760px;margin:0 auto 40px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#22c55e;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:6px 14px;border-radius:999px;">FREE GROWTH UTILITY</span>
        <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:12px;line-height:1.2;">Free WhatsApp Link Generator</h1>
        <p style="font-size:17px;color:#a0a0b0;line-height:1.6;">Create direct click-to-chat wa.me links with custom pre-filled messages and instant QR codes in seconds. 100% free, no login required.</p>
      </div>

      <!-- Supporting Copy -->
      <div style="max-width:800px;margin:0 auto;line-height:1.75;">
        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">What is a wa.me Link and Why Do Businesses Use It?</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:24px;">A wa.me link is an official short URL protocol developed by WhatsApp that allows anyone to start a direct chat conversation with you or your business without having to manually save your phone number to their contacts first. In traditional sales funnels, forcing prospects to save contacts introduces massive friction and causes up to 60% of potential leads to drop off. A direct wa.me link eliminates this barrier entirely: with a single tap, WhatsApp launches immediately on mobile or desktop with a pre-written message ready to send.</p>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">How to Create and Use Your WhatsApp Link (3 Easy Steps)</h2>
        <ol style="color:#a0a0b0;font-size:15.5px;margin-bottom:24px;padding-left:24px;line-height:1.8;">
          <li><strong>Enter Phone Number with Country Code:</strong> Select your international country code (e.g., +1 for US, +91 for India, +44 for UK, +971 for UAE) and input your WhatsApp number without spaces, brackets, or leading zeros.</li>
          <li><strong>Add an Optional Pre-filled Message:</strong> Craft a welcoming prompt or qualifying question (e.g., &quot;Hi! I&#39;d like to book an audit&quot;). The message will automatically appear in the prospect&#39;s chat box when they click.</li>
          <li><strong>Copy and Share Your Link:</strong> Copy your instant wa.me link or download the generated QR code to paste across your marketing campaigns.</li>
        </ol>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">Where to Use Your WhatsApp Chat Link</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:20px;">Direct-response marketers and brands deploy wa.me links across high-intent channels: Instagram and TikTok bio links, website floating contact buttons, automated email signatures, and printed QR codes on physical product packaging. Works natively with both standard WhatsApp and WhatsApp Business accounts without requiring any registration.</p>

        <!-- FAQ Section -->
        <div style="margin-top:48px;">
          <h2 style="font-size:26px;font-weight:700;color:#ffffff;margin-bottom:24px;">Frequently Asked Questions</h2>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Is the WhatsApp link generator free?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Yes, 100% free with no registration or hidden fees. You can generate unlimited wa.me direct-chat links and download QR codes instantly.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Do I need WhatsApp Business to use wa.me links?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">No. wa.me links work identically on standard personal WhatsApp accounts, WhatsApp Business, and WhatsApp Web.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How do I add a pre-filled message to my WhatsApp link?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Type your desired text into the message box above. Our tool URL-encodes the text into the ?text= parameter automatically so it opens ready to send.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Where can I share my WhatsApp link?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">You can paste your link into your Instagram bio, TikTok profile, YouTube description, email signature, Google Business profile, or embed it behind website buttons.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Will my wa.me link work for international numbers?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Yes. As long as you include the correct country code without leading plus signs or zeros, customers anywhere in the world can reach you instantly.</p>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:48px 32px;text-align:center;margin-top:56px;">
          <h2 style="font-size:28px;font-weight:800;color:#ffffff;margin-bottom:14px;">Need more than a calculator?</h2>
          <p style="font-size:15.5px;color:#94a3b8;margin-bottom:28px;max-width:540px;margin-left:auto;margin-right:auto;line-height:1.6;">Social Ninja&#39;s builds AI growth systems for brands — from autonomous WhatsApp lead qualifiers to full-funnel media buying.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:14.5px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">Book Growth Audit →</a>
            <a href="/services" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14.5px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Explore Services</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'tools/us-take-home-pay-calculator': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <div style="text-align:center;max-width:760px;margin:0 auto 40px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">2026 PAYCHECK ESTIMATOR</span>
        <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:12px;line-height:1.2;">US Take-Home Pay Calculator</h1>
        <p style="font-size:17px;color:#a0a0b0;line-height:1.6;">Calculate your net paycheck after federal, state, and FICA taxes across all 50 US states with bi-weekly, monthly, and annual breakdowns.</p>
      </div>

      <div style="max-width:800px;margin:0 auto;line-height:1.75;">
        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">What Does Take-Home Pay Mean? (Gross vs. Net Pay)</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:24px;">When evaluating compensation or budgeting business operations, understanding the difference between gross salary and net take-home pay is vital. Gross pay is your total contractual salary before any mandatory or voluntary withholdings. Net pay represents the actual cash deposited into your checking account after deducting federal income taxes, mandatory FICA contributions (Social Security and Medicare), and applicable state and municipal taxes.</p>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">How to Use This Paycheck Calculator</h2>
        <ol style="color:#a0a0b0;font-size:15.5px;margin-bottom:24px;padding-left:24px;line-height:1.8;">
          <li><strong>Enter Your Gross Annual Salary:</strong> Input your baseline base salary plus any regular bonuses or commissions.</li>
          <li><strong>Select Pay Frequency &amp; Tax Status:</strong> Choose weekly, bi-weekly, semi-monthly, or monthly pay, and set your IRS filing status.</li>
          <li><strong>Choose Your State of Residence:</strong> Select any of the 50 US states to account for state income tax brackets and standard deductions.</li>
          <li><strong>Review Net Take-Home Breakdown:</strong> View your net paycheck per pay period, annual take-home, and effective tax rates.</li>
        </ol>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">What Gets Deducted from Your US Paycheck?</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:16px;">Every US paycheck is subject to statutory and voluntary deductions:</p>
        <ul style="color:#a0a0b0;font-size:15px;margin-bottom:24px;padding-left:24px;line-height:1.8;">
          <li><strong>Federal Income Tax:</strong> Progressive tax ranging from 10% to 37% based on IRS brackets.</li>
          <li><strong>Social Security Tax:</strong> 6.2% on wages up to the statutory $176,100 wage base limit.</li>
          <li><strong>Medicare Tax:</strong> 1.45% on all earnings, plus an additional 0.9% surtax for high-income earners.</li>
          <li><strong>State Income Tax:</strong> Flat or progressive rates depending on your state (9 states feature 0% state tax).</li>
        </ul>
        <p style="font-size:13.5px;color:#707080;margin-bottom:32px;font-style:italic;">Disclaimer: Calculations provide mathematical estimates based on 2026 IRS federal brackets and general state guidelines. This tool is for educational purposes and does not constitute formal tax or accounting advice.</p>

        <!-- FAQs -->
        <div style="margin-top:40px;">
          <h2 style="font-size:26px;font-weight:700;color:#ffffff;margin-bottom:24px;">Frequently Asked Questions</h2>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How is take-home pay calculated?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Take-home pay is calculated by taking your gross earnings, subtracting pre-tax deductions (like 401k or health insurance), and deducting federal income taxes, FICA taxes (Social Security and Medicare), and state income taxes.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">What&#39;s the difference between gross pay and net pay?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Gross pay is your total agreed compensation before any withholdings or deductions are removed, while net pay is the actual spendable take-home amount deposited into your checking account.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Does this calculator include my state&#39;s income tax?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Yes. Our calculator calculates specific state tax brackets, flat rates, and standard deductions for all 50 US states, including zero-tax states like Texas, Florida, and Washington.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How accurate is this paycheck estimate?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">It is accurate within standard payroll margins based on 2026 IRS federal tax brackets, FICA limits, and state guidelines. Minor variances may occur from local municipal taxes or specific employer benefit packages.</p>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:48px 32px;text-align:center;margin-top:56px;">
          <h2 style="font-size:28px;font-weight:800;color:#ffffff;margin-bottom:14px;">Need more than a calculator?</h2>
          <p style="font-size:15.5px;color:#94a3b8;margin-bottom:28px;max-width:540px;margin-left:auto;margin-right:auto;line-height:1.6;">Social Ninja&#39;s builds AI growth systems for brands — from automated customer funnels to unit-economic media buying.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:14.5px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">Book Growth Audit →</a>
            <a href="/services" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14.5px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Explore Services</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'tools/hourly-to-salary-calculator': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <div style="text-align:center;max-width:760px;margin:0 auto 40px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">WAGE CONVERSION UTILITY</span>
        <h1 style="font-size:40px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:12px;line-height:1.2;">Hourly to Salary Calculator</h1>
        <p style="font-size:17px;color:#a0a0b0;line-height:1.6;">Convert your hourly rate to annual salary, monthly income, and weekly paychecks with overtime options and reference conversion tables.</p>
      </div>

      <div style="max-width:800px;margin:0 auto;line-height:1.75;">
        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">The Conversion Math: How to Calculate Hourly Pay into Annual Salary</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:24px;">Converting an hourly rate into an annual salary is calculated using a standard formula: Hourly Wage × Hours Worked Per Week × 52 Weeks = Gross Annual Salary. For a standard full-time employee working 40 hours per week, this equals Hourly Wage × 2,080 working hours. For example, $25 an hour translates to $25 × 2,080 = $52,000 per year before taxes.</p>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">How to Use This Wage Converter</h2>
        <ol style="color:#a0a0b0;font-size:15.5px;margin-bottom:24px;padding-left:24px;line-height:1.8;">
          <li><strong>Enter Your Base Hourly Rate:</strong> Input your wage in dollars per hour.</li>
          <li><strong>Set Your Weekly Hours:</strong> Adjust your standard weekly working hours (default is 40 hours).</li>
          <li><strong>Toggle Overtime Settings:</strong> Account for hours worked beyond 40 at 1.5× time-and-a-half pay.</li>
          <li><strong>View Equivalent Earnings:</strong> See your gross annual, monthly, bi-weekly, and weekly totals instantly.</li>
        </ol>

        <!-- Reference Table -->
        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:12px;">Hourly to Annual Salary Reference Table</h2>
        <p style="font-size:13px;color:#707080;margin-bottom:16px;">*Based on standard 40 hours per week and 52 weeks per year without overtime or unpaid time off.</p>
        <div style="overflow-x:auto;margin-bottom:32px;">
          <table style="width:100%;text-align:left;border-collapse:collapse;font-size:14.5px;background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.1);color:#a0a0b0;font-size:12px;text-transform:uppercase;">
                <th style="padding:14px 16px;">Hourly Rate</th>
                <th style="padding:14px 16px;">Weekly Pay</th>
                <th style="padding:14px 16px;">Bi-Weekly Pay</th>
                <th style="padding:14px 16px;">Monthly Pay</th>
                <th style="padding:14px 16px;color:#38bdf8;">Annual Salary</th>
              </tr>
            </thead>
            <tbody style="color:#e2e8f0;font-family:monospace;">
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);"><td style="padding:12px 16px;font-weight:700;">$15 / hr</td><td style="padding:12px 16px;">$600</td><td style="padding:12px 16px;">$1,200</td><td style="padding:12px 16px;">$2,600</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$31,200</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);"><td style="padding:12px 16px;font-weight:700;">$20 / hr</td><td style="padding:12px 16px;">$800</td><td style="padding:12px 16px;">$1,600</td><td style="padding:12px 16px;">$3,467</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$41,600</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);"><td style="padding:12px 16px;font-weight:700;">$25 / hr</td><td style="padding:12px 16px;">$1,000</td><td style="padding:12px 16px;">$2,000</td><td style="padding:12px 16px;">$4,333</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$52,000</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);"><td style="padding:12px 16px;font-weight:700;">$30 / hr</td><td style="padding:12px 16px;">$1,200</td><td style="padding:12px 16px;">$2,400</td><td style="padding:12px 16px;">$5,200</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$62,400</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);"><td style="padding:12px 16px;font-weight:700;">$40 / hr</td><td style="padding:12px 16px;">$1,600</td><td style="padding:12px 16px;">$3,200</td><td style="padding:12px 16px;">$6,933</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$83,200</td></tr>
              <tr><td style="padding:12px 16px;font-weight:700;">$50 / hr</td><td style="padding:12px 16px;">$2,000</td><td style="padding:12px 16px;">$4,000</td><td style="padding:12px 16px;">$8,667</td><td style="padding:12px 16px;color:#38bdf8;font-weight:700;">$104,000</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">Overtime, Unpaid Leave &amp; Tax Considerations</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:28px;">Non-exempt hourly workers are entitled to 1.5× time-and-a-half pay for hours worked over 40 under FLSA rules. Taking unpaid time off reduces gross annual pay proportionally, whereas salaried workers typically receive consistent monthly pay regardless of minor hour variations.</p>

        <!-- FAQs -->
        <div style="margin-top:40px;">
          <h2 style="font-size:26px;font-weight:700;color:#ffffff;margin-bottom:24px;">Frequently Asked Questions</h2>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How do you convert hourly wage to annual salary?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Multiply your hourly wage by the number of hours worked per week, then multiply by 52 (weeks in a year). For a standard 40-hour full-time schedule, multiply your hourly wage directly by 2,080 hours.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">What is $25 an hour annually?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Working 40 hours per week, $25 an hour equals $52,000 per year before taxes, which breaks down to $4,333 per month, $2,000 bi-weekly, or $1,000 per week.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Does the calculator include overtime?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Yes. You can toggle the overtime feature to calculate hours worked beyond 40 hours per week at the standard 1.5× time-and-a-half overtime rate.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Is 40 hours a week assumed?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Yes, 40 hours per week across 52 weeks is the standard full-time baseline, but you can adjust your weekly hours to match any part-time, seasonal, or overtime schedule.</p>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:48px 32px;text-align:center;margin-top:56px;">
          <h2 style="font-size:28px;font-weight:800;color:#ffffff;margin-bottom:14px;">Need more than a calculator?</h2>
          <p style="font-size:15.5px;color:#94a3b8;margin-bottom:28px;max-width:540px;margin-left:auto;margin-right:auto;line-height:1.6;">Social Ninja&#39;s builds AI growth systems for brands — from automated customer funnels to unit-economic media buying.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:14.5px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">Book Growth Audit →</a>
            <a href="/services" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14.5px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Explore Services</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'tools/mortgage-rate-calculator': `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <div style="text-align:center;max-width:760px;margin:0 auto 40px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">PITI HOUSING CALCULATOR</span>
        <h1 style="font-size:38px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:12px;line-height:1.2;">Mortgage Payment Calculator with Taxes &amp; Insurance</h1>
        <p style="font-size:17px;color:#a0a0b0;line-height:1.6;">Estimate your all-in monthly mortgage payment including principal, interest, property taxes, homeowners insurance, and PMI with full schedule breakdown.</p>
      </div>

      <div style="max-width:800px;margin:0 auto;line-height:1.75;">
        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">What Does This Mortgage Payment Calculator Estimate?</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:24px;">Most online mortgage tools only calculate Principal &amp; Interest (P&amp;I), leading buyers to underestimate their true monthly housing expense. Our calculator estimates your complete PITI payment: principal and interest on the loan, plus monthly escrow allocations for annual municipal property taxes, homeowners hazard insurance, Private Mortgage Insurance (PMI), and mandatory HOA fees.</p>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">How to Use This Mortgage Calculator (4 Steps)</h2>
        <ol style="color:#a0a0b0;font-size:15.5px;margin-bottom:24px;padding-left:24px;line-height:1.8;">
          <li><strong>Enter Home Price &amp; Down Payment:</strong> Input your target purchase price and the cash you plan to put down.</li>
          <li><strong>Select Loan Term and Rate:</strong> Choose 15-year or 30-year fixed duration and enter current APR interest rates.</li>
          <li><strong>Adjust Property Taxes &amp; Insurance:</strong> Input your local county property tax and homeowners insurance costs.</li>
          <li><strong>Review All-In Monthly Payment:</strong> View your complete PITI monthly payment and lifetime loan interest cost.</li>
        </ol>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">What Factors Affect Your Monthly Mortgage Payment?</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:20px;">Your monthly housing payment is shaped by five core variables: your mortgage interest rate, the loan duration (15 vs 30 years), the down payment percentage (putting down under 20% triggers Private Mortgage Insurance), county property tax assessments, and hazard insurance premiums.</p>

        <h2 style="font-size:24px;font-weight:700;color:#ffffff;margin-top:36px;margin-bottom:16px;">15-Year vs. 30-Year Mortgage: The Strategic Trade-Off</h2>
        <p style="color:#a0a0b0;font-size:16px;margin-bottom:16px;">A 30-year mortgage offers lower required monthly payments, maximizing personal or business cash-flow flexibility. In contrast, a 15-year mortgage features slightly lower interest rates and saves tens of thousands in lifetime interest at the expense of higher required monthly payments.</p>
        <p style="font-size:13.5px;color:#707080;margin-bottom:32px;font-style:italic;">Disclaimer: Mathematical estimates provided for educational scenario planning only. Does not constitute a formal loan offer or commitment to lend.</p>

        <!-- FAQs -->
        <div style="margin-top:40px;">
          <h2 style="font-size:26px;font-weight:700;color:#ffffff;margin-bottom:24px;">Frequently Asked Questions</h2>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How is my monthly mortgage payment calculated?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Your monthly housing payment consists of Principal and Interest (P&amp;I) calculated using standard amortization, plus one-twelfth of your annual property taxes, homeowners insurance, and any applicable private mortgage insurance (PMI) or HOA dues.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">What is PMI and when do I pay it?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">Private Mortgage Insurance (PMI) is required by conventional lenders whenever your down payment is less than 20% of the home&#39;s purchase price. It protects the lender and typically costs 0.5% to 1.5% of the loan amount annually until you reach 20% equity.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">How does a bigger down payment change my payment?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">A larger down payment reduces your loan principal (lowering monthly interest and principal charges) and eliminates private mortgage insurance (PMI) once your down payment reaches at least 20%.</p>
            </div>
            <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;">
              <h3 style="font-size:16.5px;font-weight:700;color:#ffffff;margin-top:0;margin-bottom:8px;">Should I choose a 15-year or 30-year mortgage?</h3>
              <p style="font-size:14.5px;color:#94a3b8;line-height:1.65;margin:0;">A 30-year loan offers lower monthly payments for maximum cash-flow flexibility, while a 15-year loan features slightly lower interest rates and saves tens of thousands in lifetime interest at the cost of higher required monthly payments.</p>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:48px 32px;text-align:center;margin-top:56px;">
          <h2 style="font-size:28px;font-weight:800;color:#ffffff;margin-bottom:14px;">Need more than a calculator?</h2>
          <p style="font-size:15.5px;color:#94a3b8;margin-bottom:28px;max-width:540px;margin-left:auto;margin-right:auto;line-height:1.6;">Social Ninja&#39;s builds AI growth systems for brands — from automated customer funnels to unit-economic media buying.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:14.5px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">Book Growth Audit →</a>
            <a href="/services" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14.5px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Explore Services</a>
          </div>
        </div>
      </div>
    </main>
  `,
  'growth-systems': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Autonomous Growth Systems Engineered for Scale</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:32px;line-height:1.6;">We replace manual sales follow-ups and uncalibrated ad spend with automated, unit-economic growth engines combining AI automation, paid ads, and content systems.</p>
      <a href="/contact" style="display:inline-block;background:#1F4B99;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">Schedule Strategy Audit →</a>
    </main>
  `,
  'careers': `
    <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;">
      <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Build the Future of AI Growth Engineering</h1>
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:40px;line-height:1.6;">We are hiring elite media buyers, AI developers, and creative strategists worldwide.</p>
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:8px;">AI Automation Engineer</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Remote / Global • Full-Time • Build autonomous WhatsApp &amp; web AI lead qualifiers using LLM APIs, Webhooks, and PostgREST databases.</p>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:8px;">Senior Meta Ads Strategist</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Remote / Global • Full-Time • Manage margin-backed paid traffic campaigns with high-scale monthly budgets.</p>
        </div>
        <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;">
          <h3 style="font-size:20px;color:#ffffff;margin-bottom:8px;">Creative Strategist &amp; Motion Designer</h3>
          <p style="color:#a0a0b0;font-size:14.5px;line-height:1.6;">Remote • Full-Time • Design high-converting short-form video ads and carousel assets based on conversion analytics.</p>
        </div>
      </div>
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
    title: "WhatsApp & Email Marketing Automation | Social Ninja's",
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
    title: "Social Media Management Services | Social Ninja's",
    h1: "Social Media Management for Growth",
    tagline: "Consistent brand dominance and organic growth — without manual overhead.",
    description: "Done-for-you social media management: content calendars, creatives and community management that grow pipeline — not just followers.",
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
    title: "AI Lead Generation Agency | AI Sales Automation",
    h1: "AI Lead Generation & Sales Automation",
    tagline: "Your 24/7 sales and qualification engine — powered by AI.",
    description: "AI agents reply to Instagram & WhatsApp DMs in under a second — qualifying leads and booking calls 24/7. Automate your sales pipeline.",
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
    title: "SEO Services & High-Speed Websites | Social Ninja's",
    h1: "SEO Services That Turn Searches Into Customers",
    tagline: "Sub-second load times, technical SEO dominance, and high-converting landing pages.",
    description: "Rank higher and convert more with technical SEO, content systems and sub-second landing pages. SEO services built for revenue, not just traffic.",
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
  },
  'geo-agency': {
    title: "GEO Agency | Get Cited by ChatGPT, Perplexity & Gemini",
    h1: "Be the Brand AI Search Recommends",
    tagline: "Generative Engine Optimization engineered for citation dominance across AI search engines.",
    description: "Generative Engine Optimization: get your brand cited in AI answers. Audits, entity building and content systems for the AI-search era.",
    hero: "Generative Engine Optimization (GEO) is the new frontier of search visibility. Buyers no longer just scroll 10 blue links on Google — they ask ChatGPT, Perplexity, Gemini, and Claude for direct recommendations. If your brand lacks structured entity architecture and citation authority, AI engines will recommend your competitors instead.",
    problem: "Traditional SEO keyword stuffing does not work in LLM answers. AI search engines synthesize answers using semantic entity extraction, retrieval-augmented knowledge bases, and authoritative multi-source consensus. Unstructured websites are invisible to generative AI.",
    solution: "We engineer your brand's digital presence specifically for LLM citation. Through comprehensive AI visibility audits, Knowledge Graph entity building, nested JSON-LD schema architectures, and citation-worthy technical data assets, we position your company as the authoritative answer across all major AI search platforms.",
    stats: [
      ['Top 3', 'Target AI Placement'],
      ['4x', 'Higher Conversion vs Blue Links'],
      ['100%', 'Entity Schema Verification'],
      ['Weekly', 'Prompt Citation Tracking'],
    ],
    process: [
      { step: '01', title: 'AI Visibility Audit', desc: 'Forensic audit across 50+ target commercial prompts in ChatGPT, Perplexity, and Gemini to identify current citation gaps.' },
      { step: '02', title: 'Entity & Schema Architecture', desc: 'Building Wikidata-aligned entity structures, Organization schemas, and verified sameAs authority networks.' },
      { step: '03', title: 'Citation-Dense Content Assets', desc: 'Publishing high-information-gain statistics, technical frameworks, and proprietary data tables that LLMs love to cite.' },
      { step: '04', title: 'Prompt Rank Monitoring', desc: 'Weekly algorithmic tracking of AI model responses to defend brand positioning and expand citation share.' },
    ],
    benefits: [
      'AI-search visibility audit across ChatGPT Search, Perplexity, Google Gemini, and Claude',
      'Knowledge Graph entity building & structured nested JSON-LD schema implementation',
      'Citation-worthy technical content systems & digital PR designed for LLM retrieval (RAG)',
      'Continuous Perplexity, Gemini & ChatGPT prompt tracking & sentiment monitoring',
      'Information gain analysis & multi-source authoritative co-citation engineering',
      'Sub-second crawlable web architecture with semantic markdown & clean HTML rendering',
    ],
    faqs: [
      {
        q: 'What is Generative Engine Optimization (GEO)?',
        a: 'GEO (Generative Engine Optimization) is the process of optimizing digital content and technical entity structures so that generative AI models (such as ChatGPT Search, Perplexity AI, Google Gemini, and Claude) cite and recommend your brand when users ask conversational questions.'
      },
      {
        q: 'How is GEO different from traditional SEO?',
        a: 'Traditional SEO focuses on ranking blue links for exact keyword searches on Google. GEO focuses on entity relationships, semantic knowledge graphs, information gain, and multi-source consensus so AI synthesis engines quote your data as authoritative facts.'
      },
      {
        q: 'How long does it take for AI models like ChatGPT and Perplexity to cite our brand?',
        a: 'Perplexity and ChatGPT Search access live web indexes and can reflect structured entity updates within 2 to 4 weeks. Foundational LLM model weights reflect updates during subsequent crawl and fine-tuning cycles.'
      },
      {
        q: 'How do you measure GEO performance and rankings?',
        a: 'We test and monitor a prioritized matrix of commercial buying prompts across ChatGPT, Perplexity, and Gemini weekly, tracking brand mention frequency, sentiment polarity, and direct referral traffic from AI search engines.'
      }
    ],
    cta: 'Audit My AI Search Visibility'
  },
  'instagram-seo': {
    title: "Instagram SEO Services | Rank Higher on Instagram",
    h1: "Get Discovered on Instagram Search",
    tagline: "Rank at the top of Instagram search and explore feeds for high-intent queries.",
    description: "Instagram SEO that gets your profile and reels discovered in search — keyword-optimized bios, captions and content systems.",
    hero: "Instagram has evolved into a primary search engine for modern consumers. Millions of high-intent buyers search for products, local services, and solutions directly in the Instagram search bar. We optimize your entire profile, reel metadata, and caption systems so your brand ranks at the top when ideal customers search your niche.",
    problem: "Relying exclusively on 30 random hashtags or hoping the algorithm randomly blesses your Reels is a failing strategy. Without deliberate keyword optimization across your profile name, bio, closed captions, and audio tags, your account remains invisible to searchers looking to buy right now.",
    solution: "We turn your Instagram account into a high-intent search engine funnel. By identifying high-volume search terms, structuring your profile metadata, and implementing semantic caption frameworks, we deliver compounding organic discovery from non-followers every single week.",
    stats: [
      ['3.2x', 'Lift in Non-Follower Reach'],
      ['Top 3', 'Target Search Positions'],
      ['100%', 'Organic Search-Driven Intent'],
      ['Weekly', 'Competitor Keyword Audits'],
    ],
    process: [
      { step: '01', title: 'Search Keyword Research', desc: 'Mining Instagram search suggestion data to uncover the exact terms your buyers type into the search bar.' },
      { step: '02', title: 'Profile Architecture Overhaul', desc: 'Optimizing your handle, searchable name field, bio hook, and category tags for algorithmic indexing.' },
      { step: '03', title: 'Searchable Content Framework', desc: 'Writing direct-response captions and Reel video scripts rich in semantic keywords, closed captions, and topic tags.' },
      { step: '04', title: 'Performance & Rank Tracking', desc: 'Monitoring search impression share, explore traffic percentage, and non-follower profile visits.' },
    ],
    benefits: [
      'Profile keyword optimization: Name field, bio, and categorization engineered for search ranking',
      'Searchable caption systems: Natural semantic keyword integration that feeds Instagram\'s recommendation AI',
      'Reel SEO & alt-text optimization: Audio tagging, text overlay keywords, and accessible metadata',
      'Strategic hashtag & topic categorization: Niche cluster tags that signal relevance to the Explore feed',
      'Inbound keyword intent mapping: Targeting high-intent commercial terms your buyers search for',
      'Monthly Instagram search impressions & organic reach growth reporting',
    ],
    faqs: [
      {
        q: 'How does Instagram SEO work?',
        a: 'Instagram uses computer vision, natural language processing, audio transcription, and metadata indexing to rank search results. By optimizing your name field, bio, captions, spoken video keywords, and on-screen text, your content matches user search queries.'
      },
      {
        q: 'Does Instagram SEO replace hashtags?',
        a: 'Instagram\'s leadership has confirmed that descriptive keywords in captions and bios carry significantly higher ranking weight than broad hashtags. Hashtags still assist with topical categorization, but semantic keywords drive core search discovery.'
      },
      {
        q: 'How quickly do Instagram search rankings update?',
        a: 'Profile name and bio optimizations index within 24 to 48 hours. Searchable Reel content begins accumulating non-follower search impressions over 7 to 30 days as engagement metrics validate relevance.'
      },
      {
        q: 'Can Instagram SEO drive direct inbound leads and sales?',
        a: 'Yes. Search traffic is inherently high-intent: users are actively seeking a solution rather than passively scrolling. When paired with our automated DM appointment setters, searchers convert directly into booked calls.'
      }
    ],
    cta: 'Optimize My Instagram for Search'
  },
  'meta-ads-audit': {
    title: "Free Meta Ads Audit | Find Your Wasted Spend",
    h1: "See Exactly What's Wrong With Your Ads",
    tagline: "Forensic account teardown that identifies wasted spend, creative fatigue, and your 3 biggest ROAS levers.",
    description: "A free, no-fluff audit of your Meta ad account: creative diagnosis, targeting gaps and the 3 fixes with the biggest ROAS upside.",
    hero: "Stop burning ad budget on uncalibrated campaigns. Our forensic Meta Ads Audit provides an uncompromising teardown of your ad accounts, creative performance, attribution tracking, and funnel drop-offs — showing you precisely where ad spend is leaking and the 3 high-leverage fixes to unlock profitable scale.",
    problem: "Most ad accounts suffer from hidden leaks: overlapping custom audiences bidding against each other, degraded attribution from broken Conversions API (CAPI) setups, severe creative fatigue, and ad spend poured into campaigns with negative unit contribution margins.",
    solution: "We perform a deep forensic analysis of your last 90 days of Meta advertising. We inspect CAPI match quality, dissect hook and hold rates on your creatives, audit account structure, and deliver an actionable 3-step blueprint to increase ROAS — 100% free with zero obligation.",
    stats: [
      ['₹0', '100% Free Audit'],
      ['48hrs', 'Delivery Turnaround'],
      ['20-40%', 'Wasted Spend Uncovered'],
      ['3', 'Prioritized ROAS Fixes'],
    ],
    process: [
      { step: '01', title: 'View-Only Access', desc: 'Grant secure, view-only analyst access to your Meta Ads Manager (no billing or edit permissions required).' },
      { step: '02', title: 'Forensic Account Teardown', desc: 'Analyzing tracking match rates, audience cannibalization, creative drop-off curves, and bid efficiency.' },
      { step: '03', title: 'Diagnosis & Levers', desc: 'Calculating wasted ad dollars and formulating the exact 3 adjustments needed to unlock scale.' },
      { step: '04', title: 'Video & Blueprint Delivery', desc: 'Receiving a personalized video breakdown and step-by-step PDF roadmap you can implement immediately.' },
    ],
    benefits: [
      'Full account structure teardown: Campaign architecture, budget allocation (CBO/ABO), and bid strategies',
      'Creative fatigue & scoring: Hook rate (<3s), hold rate, and visual fatigue diagnosis across past 90 days',
      'Audience overlap & tracking check: Meta Conversions API (CAPI) event match quality and pixel deduplication',
      '3 prioritized fixes with the highest immediate ROAS and net contribution margin upside',
      'Unit economics breakdown: Realistic CAC vs Contribution Margin benchmarks for your specific industry',
      '30-minute recorded video walk-through and actionable executive PDF summary',
    ],
    faqs: [
      {
        q: 'Is the Meta ads audit genuinely free?',
        a: 'Yes, 100% free with zero catch or obligation. We do not require credit card details or contracts. If you want us to implement the fixes, great; if you implement them in-house, you keep the full blueprint.'
      },
      {
        q: 'Do I need to share passwords or edit access?',
        a: 'No. You simply grant standard view-only analyst permissions to our Meta Business Manager ID. We cannot edit campaigns, change budgets, or access billing information.'
      },
      {
        q: 'What monthly ad spend level qualifies for the audit?',
        a: 'We perform audits for brands currently spending at least ₹50,000 ($600 USD) per month on Meta ads, ensuring sufficient conversion data for forensic analysis.'
      },
      {
        q: 'What happens after the audit is delivered?',
        a: 'You receive a 15–20 minute custom video walk-through and PDF summary. If you want our team to manage your ad operations and execute the strategy, we can discuss a performance partnership.'
      }
    ],
    cta: 'Claim Free Meta Ads Audit'
  },
  'ai-appointment-setter': {
    title: "AI Appointment Setter | Never Miss a Lead Again",
    h1: "Every Lead Answered in Seconds",
    tagline: "Autonomous AI setter that qualifies buyers and books meetings 24/7 across DMs, web forms, and WhatsApp.",
    description: "An AI setter that answers every DM, call and form in seconds, qualifies prospects and books them straight into your calendar — 24/7.",
    hero: "Every minute a prospect waits for a response, their likelihood of booking a call drops by 80%. Human sales reps sleep, take lunch breaks, and take hours to reply. Our AI Appointment Setter answers every Instagram DM, WhatsApp message, and website inquiry in under 1 second, asks rigorous qualifying questions, and books qualified meetings directly into your calendar 24/7.",
    problem: "Inbound leads cost serious money to acquire. When inquiries sit unaddressed for hours or days, high-value prospects hire a competitor. Human SDR teams are expensive to hire, train, and manage, and manual follow-up consistently drops qualified pipeline.",
    solution: "We build and deploy a dedicated conversational AI setter calibrated to your qualification criteria. The AI setter engages inquiries instantly, conversationalizes objection handling, validates budget and timeline, and seamlessly drops a calendar booking link with automated SMS/email reminders.",
    stats: [
      ['< 1s', 'Response Time'],
      ['24/7/365', 'Zero Downtime'],
      ['14x', 'Faster Than Human SDRs'],
      ['3x', 'More Booked Calls'],
    ],
    process: [
      { step: '01', title: 'ICP & Qualification Logic', desc: 'Mapping your target qualification criteria, deal disqualifiers, objection scripts, and booking protocols.' },
      { step: '02', title: 'Agent Configuration', desc: 'Programming conversational flows, tone of voice, RAG knowledge boundaries, and scheduling links.' },
      { step: '03', title: 'Omnichannel Integration', desc: 'Connecting the AI setter to your Instagram Direct, WhatsApp Cloud API, website forms, and CRM.' },
      { step: '04', title: 'Stress-Testing & Launch', desc: 'Conducting live simulation drills across 100+ edge-case scenarios before pushing the agent live.' },
    ],
    benefits: [
      'Sub-second (<1s) conversational response across Instagram DMs, WhatsApp, SMS, and website forms',
      'Custom qualification scripts: Screening budget, timeline, and decision-maker status against your ICP',
      'Direct calendar booking into Google Calendar, Calendly, or Cal.com with automated reminder notifications',
      'Bi-directional CRM sync with HubSpot, GoHighLevel, Supabase, and custom webhook pipelines',
      'Missed-lead & cold database reactivation sequences that revive old pipeline contacts automatically',
      'Strict anti-hallucination bounds: RAG architecture grounded strictly in your verified company knowledge',
    ],
    faqs: [
      {
        q: 'How does the AI appointment setter interact with leads?',
        a: 'The setter responds conversationally and naturally over chat (WhatsApp, Instagram DM, SMS, or web). It greets the prospect, answers product questions, asks your qualification criteria, and sends a booking link once qualified.'
      },
      {
        q: 'What happens if a lead asks a complex question the AI doesn\'t know?',
        a: 'Our systems use strict fallback bounds. If a prospect asks an out-of-scope question, the AI setter politely acknowledges the question and routes the conversation directly to your human sales rep with a notification.'
      },
      {
        q: 'Does the AI appointment setter reduce meeting no-show rates?',
        a: 'Yes. Upon booking, the AI immediately sends calendar invites and triggers automated, conversational WhatsApp and SMS reminders 24 hours and 1 hour before the scheduled call.'
      },
      {
        q: 'Which CRM platforms and calendar tools are supported?',
        a: 'We integrate with Google Calendar, Microsoft Outlook, Calendly, Cal.com, HubSpot, GoHighLevel, Salesforce, and custom Supabase/PostgreSQL databases.'
      }
    ],
    cta: 'Deploy My AI Appointment Setter'
  }
};
// Aliases
servicesPrerenderData['performance-marketing'] = servicesPrerenderData['paid-ads'];
servicesPrerenderData['creative-studio'] = servicesPrerenderData['content-production'];

const serviceToCaseStudiesMap = {
  'paid-ads': [
    { slug: 'zara-skin-co', client: 'Zara Skin Co.', metric: '6.1x', metricLabel: 'ROAS in 90 Days', category: 'E-Commerce D2C' },
    { slug: 'nexvue-technologies', client: 'Nexvue Technologies', metric: '+134%', metricLabel: 'Qualified Pipeline', category: 'B2B Lead Gen' }
  ],
  'performance-marketing': [
    { slug: 'zara-skin-co', client: 'Zara Skin Co.', metric: '6.1x', metricLabel: 'ROAS in 90 Days', category: 'E-Commerce D2C' },
    { slug: 'pocketfit-india', client: 'PocketFit India', metric: '-61%', metricLabel: 'Cost Per Install', category: 'App Growth' }
  ],
  'meta-ads-audit': [
    { slug: 'zara-skin-co', client: 'Zara Skin Co.', metric: '6.1x', metricLabel: 'ROAS in 90 Days', category: 'E-Commerce D2C' },
    { slug: 'nexvue-technologies', client: 'Nexvue Technologies', metric: '+134%', metricLabel: 'Qualified Pipeline', category: 'B2B Lead Gen' }
  ],
  'content-production': [
    { slug: 'the-biryani-house', client: 'The Biryani House', metric: '4.2M+', metricLabel: 'Organic Views in 60 Days', category: 'Hospitality & F&B' },
    { slug: 'zara-skin-co', client: 'Zara Skin Co.', metric: '6.1x', metricLabel: 'ROAS in 90 Days', category: 'UGC & Reels' }
  ],
  'creative-studio': [
    { slug: 'the-biryani-house', client: 'The Biryani House', metric: '4.2M+', metricLabel: 'Organic Views in 60 Days', category: 'Hospitality & F&B' },
    { slug: 'pocketfit-india', client: 'PocketFit India', metric: '-61%', metricLabel: 'Cost Per Install', category: 'App Growth' }
  ],
  'instagram-seo': [
    { slug: 'the-biryani-house', client: 'The Biryani House', metric: '4.2M+', metricLabel: 'Organic Views in 60 Days', category: 'Local Business' }
  ],
  'social-media': [
    { slug: 'the-biryani-house', client: 'The Biryani House', metric: '4.2M+', metricLabel: 'Organic Views in 60 Days', category: 'Local Business' }
  ],
  'ai-appointment-setter': [
    { slug: 'aura-aesthetics-clinic', client: 'Aura Aesthetics & Dental', metric: '₹46L+', metricLabel: 'High-Ticket Revenue', category: 'High-Ticket Healthcare' },
    { slug: 'nexvue-technologies', client: 'Nexvue Technologies', metric: '+134%', metricLabel: 'Qualified Pipeline', category: 'B2B Lead Gen' }
  ],
  'email-whatsapp': [
    { slug: 'cloudscale-logistics', client: 'CloudScale Logistics', metric: '₹3.4Cr+', metricLabel: 'Closed Enterprise Value', category: 'Enterprise Outbound' },
    { slug: 'aura-aesthetics-clinic', client: 'Aura Aesthetics & Dental', metric: '₹46L+', metricLabel: 'High-Ticket Revenue', category: 'WhatsApp Automation' }
  ],
  'ai-automation': [
    { slug: 'nexvue-technologies', client: 'Nexvue Technologies', metric: '+134%', metricLabel: 'Qualified Pipeline', category: 'B2B Lead Gen' },
    { slug: 'cloudscale-logistics', client: 'CloudScale Logistics', metric: '₹3.4Cr+', metricLabel: 'Closed Enterprise Value', category: 'Outbound Automation' }
  ],
  'growth-consulting': [
    { slug: 'pocketfit-india', client: 'PocketFit India', metric: '-61%', metricLabel: 'Cost Per Install', category: 'App Growth' },
    { slug: 'cloudscale-logistics', client: 'CloudScale Logistics', metric: '₹3.4Cr+', metricLabel: 'Closed Enterprise Value', category: 'Enterprise Outbound' }
  ],
  'geo-agency': [
    { slug: 'nexvue-technologies', client: 'Nexvue Technologies', metric: '+134%', metricLabel: 'Qualified Pipeline', category: 'B2B SaaS' }
  ],
  'web-seo': [
    { slug: 'the-biryani-house', client: 'The Biryani House', metric: '4.2M+', metricLabel: 'Organic Views in 60 Days', category: 'Local SEO' }
  ]
};

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

      <!-- Verified Case Study Outcomes -->
      ${serviceToCaseStudiesMap[slug] && serviceToCaseStudiesMap[slug].length > 0 ? `
        <div style="margin-bottom:60px;">
          <div style="text-align:center;margin-bottom:32px;">
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:6px 14px;border-radius:999px;">VERIFIED CLIENT PROOF</span>
            <h2 style="font-size:32px;font-weight:800;color:#ffffff;margin-top:16px;margin-bottom:0;">Real Client Growth Outcomes.</h2>
            <p style="font-size:15px;color:#94a3b8;margin-top:10px;">Transparent revenue metrics and unit economic improvements delivered through our ${data.title} systems.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">
            ${serviceToCaseStudiesMap[slug].map(cs => `
              <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                    <span style="color:#38bdf8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:rgba(56,189,248,0.1);padding:3px 10px;border-radius:999px;">${cs.category}</span>
                    <span style="font-size:11.5px;color:#64748b;">Verified Case Study</span>
                  </div>
                  <h3 style="font-size:20px;color:#ffffff;margin:0 0 10px;font-weight:800;">${cs.client}</h3>
                  <div style="display:flex;align-items:baseline;gap:8px;margin:12px 0;">
                    <span style="font-size:34px;font-weight:900;color:#38bdf8;line-height:1;">${cs.metric}</span>
                    <span style="font-size:13.5px;color:#94a3b8;font-weight:600;">${cs.metricLabel}</span>
                  </div>
                </div>
                <a href="/case-studies/${cs.slug}" style="display:inline-block;text-align:center;background:rgba(255,255,255,0.05);color:#ffffff;border:1px solid rgba(255,255,255,0.12);padding:12px 18px;border-radius:8px;text-decoration:none;font-size:13.5px;font-weight:700;">Read Complete Case Study →</a>
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

const caseStudiesPrerenderData = {
  'zara-skin-co': {
    client: "Zara Skin Co.",
    category: "E-Commerce",
    industry: "D2C Clean Beauty & Skincare",
    location: "Jaipur, Rajasthan",
    timeline: "90-Day Sprint",
    servicesUsed: ["Paid Ads (Meta & Google)", "Creative Studio (UGC & Reels)", "Performance Marketing"],
    mainMetric: "6.1x",
    metricLabel: "ROAS in 90 Days",
    secondaryMetrics: [
      { label: "Monthly Revenue", value: "₹18.4L+" },
      { label: "CPA Reduction", value: "-38%" },
      { label: "Blended MER", value: "4.8x" },
      { label: "Average Order Value", value: "₹1,265" }
    ],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "Zara Skin Co. is an indie Ayurvedic skincare brand crafting active-botanical face serums, gentle clarifying toners, and barrier-repair moisturizers. Founded in 2023, the brand had strong organic word-of-mouth and a 34% repeat customer rate in Rajasthan and Delhi NCR. However, attempts to scale paid customer acquisition across pan-India metros were draining cash flow due to rising CPMs and low conversion rates on cold traffic.",
    challenge: "When Zara Skin Co. approached Social Ninja's, they were spending ₹2,00,000 per month on Meta Ads but were stuck at a dismal 1.4x ROAS — barely breaking even after packaging, shipping, and payment gateway fees. Their internal team was running polished studio packshots with generic 'Shop Now' copy, which caused ad fatigue within 5 days. Furthermore, their tracking relied on standard browser cookies without Meta Conversions API (CAPI), causing up to 30% of purchase signals to drop off due to iOS privacy restrictions and ad blockers.",
    solution: "We engineered a complete overhaul of Zara Skin Co.'s growth architecture across three core layers: rapid creative iteration, full-funnel media architecture, and server-side attribution infrastructure. We deployed a 3-tier UGC pipeline testing 15 new video angles per week, switched to broad demographic targeting with Advantage+ Shopping Campaigns, and integrated Meta CAPI via Cloudflare Workers to restore lost signal fidelity.",
    whatWeDid: [
      { step: "01", title: "Rapid UGC & Hook Testing Pipeline", description: "We dismantled their studio product photography and replaced it with a structured creative sprint. We produced 15 UGC reel concepts weekly across three high-converting formats: Problem-Agitation (acne flareups vs botanical soothing), Ingredient Breakdown (niacinamide + saffron formulation), and Honest 14-Day Micro-Documentaries. Every ad was built with 3 distinct 3-second hook variations to defeat algorithmic creative fatigue." },
      { step: "02", title: "Full-Funnel Advantage+ Shopping Restructuring", description: "We consolidated fragmented ad sets into an Advantage+ Shopping Campaign (ASC) structure. We established clear budget guardrails: 70% budget allocated to cold acquisition testing proven hooks, 20% dedicated to Dynamic Product Ads (DPA) featuring post-purchase cross-sells, and 10% reserved for Google Search brand protection to harvest Meta-generated demand." },
      { step: "03", title: "Server-Side CAPI & Shopify Attribution Fix", description: "We implemented Meta Conversions API (CAPI) with redundant server-side tracking, achieving an Event Quality Match score of 9.2/10. This allowed Meta's machine-learning algorithm to optimize for high-LTV purchasers rather than casual window-shoppers." },
      { step: "04", title: "Post-Click Conversion Rate & AOV Optimization", description: "We replaced single-product destination pages with high-converting bundle landers (e.g., 'The 3-Step Clear Skin Routine'). By introducing smart 1-click order-bump add-ons at checkout, Average Order Value (AOV) increased by 42% from ₹890 to ₹1,265, instantly improving unit economics." }
    ],
    detailedResults: [
      { metric: "Blended Return on Ad Spend (ROAS)", before: "1.4x", after: "6.1x", impact: "+335% ROAS increase" },
      { metric: "Monthly Tracked Revenue", before: "₹3,20,000", after: "₹18,40,000", impact: "+475% revenue scale" },
      { metric: "Cost Per Acquisition (CPA)", before: "₹680", after: "₹421", impact: "38% cheaper customer acquisition" },
      { metric: "Average Order Value (AOV)", before: "₹890", after: "₹1,265", impact: "+₹375 margin per customer" }
    ],
    keyTakeaways: [
      "Creative is the new targeting: UGC reels with strong 3-second hooks outperformed detailed interest targeting by 4.2x.",
      "Attribution fidelity matters: Installing Meta CAPI recovered 28% of unrecorded purchases, allowing the ad algorithm to find higher-value buyers.",
      "Unit economics drive scale: Boosting AOV from ₹890 to ₹1,265 through bundled landers allowed the brand to bid more aggressively while expanding profit margins."
    ],
    testimonial: {
      text: "We went from barely breaking even to our most profitable quarter since inception. The creative sprint system Social Ninja's deployed was unlike any agency we worked with before — they delivered content that felt like real people sharing genuine skin transformations rather than corporate ads.",
      author: "Priya V.",
      role: "Founder & CEO, Zara Skin Co."
    },
    publishedAt: "2026-03-12",
    updatedAt: "2026-09-28",
    relatedService: { name: "Performance Marketing & Paid Ads", path: "/services/paid-ads" }
  },
  'nexvue-technologies': {
    client: "Nexvue Technologies",
    category: "B2B Lead Gen",
    industry: "Enterprise HR Tech & SaaS",
    location: "Pune, Maharashtra",
    timeline: "120-Day Deployment",
    servicesUsed: ["Paid Ads (LinkedIn & Meta)", "AI Automation & Lead Routing", "Growth Consulting"],
    mainMetric: "+134%",
    metricLabel: "Qualified Sales Pipeline",
    secondaryMetrics: [
      { label: "Cost Per Lead (CPL)", value: "-52%" },
      { label: "Demo Show-Up Rate", value: "+31%" },
      { label: "Pipeline Value Added", value: "₹1.2Cr+" },
      { label: "Lead Response Time", value: "<60s" }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "Nexvue Technologies is a mid-market B2B HR SaaS platform that automates attendance tracking, payroll compliance, and employee lifecycle management for organizations with 200 to 2,000 employees. With an average annual contract value (ACV) of ₹3.5L to ₹8L, the leadership team needed predictable enterprise demos for their 6-person sales engineering team.",
    challenge: "Despite an enterprise-ready product, Nexvue's existing LinkedIn campaigns were hemorrhaging budget. They were generating high lead volume, but over 78% of form fills were junior HR interns, students, or small companies under 20 employees with zero software budget. Their Cost Per Lead sat at an unsustainable ₹4,200, demo-to-close rate hovered below 8%, and over 42% of scheduled prospects failed to attend their booked demo calls.",
    solution: "Social Ninja's engineered an Account-Based Marketing (ABM) outbound and paid capture engine. We eliminated open-form lead generation, built a proprietary interactive HR Attrition Calculator, deployed hyper-segmented LinkedIn and Meta retargeting to 800 verified mid-market companies, and integrated an autonomous AI lead-qualification and calendar sync sequence.",
    whatWeDid: [
      { step: "01", title: "ABM Target Account List (TAL) Curation", description: "We extracted and verified a precision list of 800 high-intent enterprise accounts across Indian manufacturing, IT services, and retail sectors. We mapped verified decision-maker titles: CHROs, VP of Human Resources, Head of Payroll, and Chief Operating Officers, eliminating non-decision makers from media delivery." },
      { step: "02", title: "High-Intent Interactive Value Asset", description: "We replaced passive corporate whitepapers with an interactive web tool: 'The Mid-Market Employee Turnover & Compliance Cost Calculator'. Decision-makers entered their headcount and current payroll error rate to receive an instant, personalized audit report. This filtered out unqualified tire-kickers and established undeniable business ROI before sales touchpoints." },
      { step: "03", title: "Omnipresent Founder & Proof Retargeting", description: "Using matched audience custom lists, we surrounded engaged decision-makers with short video snippets from Nexvue's founder explaining regulatory payroll compliance in India, accompanied by enterprise customer video case studies from respected brands." },
      { step: "04", title: "Sub-60s AI Qualification & Calendar Sync", description: "When an executive requested a demo, an automated webhook routed lead data through our AI qualifier. Leads meeting company size criteria received an instant personalized WhatsApp confirmation and 1-click Google/Outlook calendar link with automated SMS reminders, lifting demo show rates from 58% to 89%." }
    ],
    detailedResults: [
      { metric: "Sales Qualified Leads (SQL) Volume", before: "18 / month", after: "44 / month", impact: "+144% qualified pipeline increase" },
      { metric: "Cost Per Qualified Lead (CPL)", before: "₹4,200", after: "₹2,015", impact: "52% reduction in acquisition cost" },
      { metric: "Demo Attendance / Show-Up Rate", before: "58%", after: "89%", impact: "+31% higher pipeline velocity" },
      { metric: "Total Qualified Pipeline Value", before: "₹48L", after: "₹1.68Cr", impact: "Added ₹1.2Cr in active deals" }
    ],
    keyTakeaways: [
      "Stop collecting names, start collecting intent: Calculators and interactive tools self-qualify budget authority far better than gating generic eBooks.",
      "Sub-60-second follow-up closes deals: Automating calendar confirmation via WhatsApp and SMS eliminates no-shows and prevents leads from researching competitors.",
      "ABM lists save media spend: Narrowing audience targeting to 800 verified enterprise accounts lowered CPL by 52% while doubling pipeline quality."
    ],
    testimonial: {
      text: "We wasted nearly six months on marketing agencies that flooded our CRM with unqualified leads who couldn't afford our software. Social Ninja's completely rebuilt our demand engine. In our first full quarter, our account executives closed three enterprise logos directly traced to their ABM funnel.",
      author: "Rohit M.",
      role: "VP Marketing, Nexvue Technologies"
    },
    publishedAt: "2026-04-18",
    updatedAt: "2026-09-28",
    relatedService: { name: "AI Automation & CRM Integration", path: "/services/ai-automation" }
  },
  'the-biryani-house': {
    client: "The Biryani House",
    category: "Local Business",
    industry: "Hospitality & Cloud Kitchen Chain",
    location: "Hyderabad, Telangana",
    timeline: "60-Day Campaign",
    servicesUsed: ["Instagram SEO & Organic Growth", "Creative Studio (Short-Form Reels)", "Local Search Optimization"],
    mainMetric: "4.2M+",
    metricLabel: "Organic Views in 60 Days",
    secondaryMetrics: [
      { label: "Direct WhatsApp Orders", value: "+210%" },
      { label: "New Instagram Followers", value: "62K" },
      { label: "Aggregator Fee Savings", value: "₹4.8L+" },
      { label: "Google Maps Actions", value: "18.5K" }
    ],
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "The Biryani House is an authentic woodfire Hyderabadi dum biryani kitchen operating 3 busy cloud kitchens and one flagship dine-in restaurant in Hyderabad. Known locally for authentic spices and generous meat portions, the business was generating consistent volume but suffering margin compression due to steep 28%–32% commissions charged by delivery platforms like Zomato and Swiggy.",
    challenge: "Despite stellar food quality and a 4.6-star rating, The Biryani House had zero digital brand equity. Their Instagram profile was inactive, posting occasional flyer graphics that averaged fewer than 40 likes. They had no direct ordering channel, leaving them 100% dependent on third-party aggregators. With a major new location launching in Jubilee Hills in 60 days, they needed organic footfall and direct customer relationships without burning millions on paid ads.",
    solution: "Social Ninja's launched a multi-faceted organic dominance strategy focusing on Instagram SEO, sensory 4K food cinematography, micro-influencer launch sprints, and a frictionless direct WhatsApp ordering engine that bypassed third-party aggregator commissions.",
    whatWeDid: [
      { step: "01", title: "Instagram Search (SEO) Architecture", description: "We optimized their Instagram bio, display name, handle keywords, and post alt-text around high-volume local search phrases like 'Best Hyderabadi Biryani', 'Authentic Dum Biryani Jubilee Hills', and 'Late Night Food Hyderabad'. Within 3 weeks, their account ranked in the top 3 results for regional culinary search terms." },
      { step: "02", title: "Sensory ASMR Video Production", description: "We deployed our production team with macro lenses and binaural microphones to shoot authentic culinary storytelling. We produced high-energy, sensory reels: the unsealing of steaming clay pots, slow-motion rice aeration, and chef POV ghee pours. These reels triggered Instagram's recommendation algorithm, generating millions of non-follower impressions." },
      { step: "03", title: "Hyper-Local Micro-Influencer Blitz", description: "Rather than paying high fees to generic lifestyle creators, we curated 12 authentic Hyderabad food vloggers with dedicated local followings. We hosted an exclusive midnight tasting session 5 days before the new branch opening, resulting in synchronized reel drops that dominated Hyderabad explore pages." },
      { step: "04", title: "Direct WhatsApp Commerce Funnel", description: "We created customized smart QR codes on packaging and in-profile link trees directing customers straight into a WhatsApp ordering flow with an exclusive '10% Direct-Order Loyalty Benefit'. Over 2,400 customers converted into direct re-order subscribers in the first two months." }
    ],
    detailedResults: [
      { metric: "Organic Video Impressions", before: "12,000 / mo", after: "4,200,000+", impact: "350x organic reach expansion" },
      { metric: "Direct Customer Orders", before: "140 / mo", after: "434 / mo", impact: "+210% margin-rich orders" },
      { metric: "Instagram Audience Following", before: "1,850", after: "63,850", impact: "+62,000 hyper-local followers" },
      { metric: "Monthly Third-Party Commission Saved", before: "₹0 saved", after: "₹2,40,000 / mo", impact: "₹4.8L preserved in gross margin" }
    ],
    keyTakeaways: [
      "Sensory storytelling beats paid ads: Authentic high-frame-rate food preparation consistently beats static advertising on social feeds.",
      "Instagram is the new search engine: Optimizing post captions, audio tags, and profile metadata captures users actively searching for dining recommendations.",
      "Direct customer data is priceless: Transitioning customers to a direct WhatsApp ordering channel insulates restaurants against aggregator fee hikes."
    ],
    testimonial: {
      text: "62,000 organic followers in two months without spending a single rupee on Meta Ads. On the opening day of our Jubilee Hills branch, we had a 45-minute queue down the street solely because of the viral reel series. Direct WhatsApp ordering has completely shifted our profitability.",
      author: "Azhar K.",
      role: "Co-Founder, The Biryani House"
    },
    publishedAt: "2026-05-04",
    updatedAt: "2026-09-28",
    relatedService: { name: "Instagram SEO & Discovery", path: "/services/instagram-seo" }
  },
  'pocketfit-india': {
    client: "PocketFit India",
    category: "App Growth",
    industry: "Consumer Health & Mobile Apps",
    location: "Mumbai, Maharashtra",
    timeline: "90-Day Sprint",
    servicesUsed: ["Performance Marketing", "Creative Studio (Vernacular Creators)", "App Store Optimization (ASO)"],
    mainMetric: "-61%",
    metricLabel: "Cost Per Install (CPI)",
    secondaryMetrics: [
      { label: "Day-30 Retention", value: "2.8x" },
      { label: "App Store Ranking", value: "Top 12" },
      { label: "Monthly Active Users", value: "180K+" },
      { label: "Paywall Conversion", value: "+44%" }
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "PocketFit India is a mobile fitness app tailored for working professionals and homemakers across tier-2 and tier-3 Indian cities. Offering 15-minute guided bodyweight workouts, regional meal plans, and Hindi/Marathi audio coaching, the app is priced affordably at ₹299 per year or ₹49 per month to drive mass adoption.",
    challenge: "When scaling paid user acquisition via Meta and Google UAC campaigns, PocketFit was hit with an unsustainable Cost Per Install (CPI) of ₹180. With their low annual price point, this resulted in deeply negative unit economics. Furthermore, their generic English-language fitness ads attracted low-intent downloads: Day-1 retention was 24%, and Day-30 retention dropped below 11%, leading to rapid user churn and poor app store visibility.",
    solution: "We re-engineered PocketFit's growth engine around hyper-regional vernacular creator content, App Store Optimization for high-intent search keywords, and an automated onboarding journey that drove immediate product activation within 90 seconds of download.",
    whatWeDid: [
      { step: "01", title: "Vernacular Living-Room Creator Sprints", description: "We stopped running glossy gym ads and contracted 16 regional fitness creators across Indore, Lucknow, Nagpur, and Surat. We produced authentic, unpolished mobile-shot reels in Hindi and Marathi showing relatable workouts in modest living rooms without expensive gym equipment, resonating deeply with tier-2 audiences." },
      { step: "02", title: "App Store Optimization (ASO) Engine", description: "We localized the Google Play and Apple App Store listings with regional keywords, revised screenshots showcasing Hindi audio coaching, and localized video previews. This lifted organic app store conversion rate by 38% and propelled PocketFit into the Top 12 in the Health & Fitness category." },
      { step: "03", title: "Sub-90-Second Onboarding Re-Architecture", description: "We collaborated with their product team to shorten time-to-first-workout. We replaced lengthy 14-screen registration forms with an interactive 3-question fitness assessment ('What is your goal?', 'How many minutes daily?', 'Preferred language?'), dropping drop-off rates by 46%." },
      { step: "04", title: "Push Notification & Habit Retention Triggers", description: "We integrated event-based push notification journeys triggered by user schedule preferences (e.g., 'Your 15-min morning stretch starts in 5 minutes'). Users receiving targeted prompts showed a 2.8x higher Day-30 retention rate." }
    ],
    detailedResults: [
      { metric: "Cost Per Install (CPI)", before: "₹180", after: "₹71", impact: "61% drop in paid acquisition cost" },
      { metric: "Day-30 User Retention", before: "11%", after: "31%", impact: "2.8x increase in product stickiness" },
      { metric: "Play Store Category Ranking", before: "#84", after: "#12", impact: "Top 12 Health & Fitness in India" },
      { metric: "Free-to-Paid Paywall Conversion", before: "3.2%", after: "4.6%", impact: "+44% higher subscription conversion" }
    ],
    keyTakeaways: [
      "Language and relatability conquer CAC: Vernacular creator content in regional languages outperformed English creative assets by 3.4x in tier-2 India.",
      "ASO provides free compounding downloads: Ranking in the top 12 of an App Store category delivers sustained, zero-CAC organic installs every day.",
      "Activation predicts retention: Getting a new user to complete their first 5-minute session on Day 1 is the single greatest predictor of annual subscription renewal."
    ],
    testimonial: {
      text: "Switching from generic fitness ads to vernacular living-room creators changed our entire business trajectory. Our install costs collapsed from ₹180 to ₹71, and because the creators were relatable, the users who downloaded the app actually stuck around past the first month.",
      author: "Sneha P.",
      role: "Head of Growth, PocketFit India"
    },
    publishedAt: "2026-06-14",
    updatedAt: "2026-09-28",
    relatedService: { name: "Performance Marketing & Acquisition", path: "/services/paid-ads" }
  },
  'aura-aesthetics-clinic': {
    client: "Aura Aesthetics & Dental",
    category: "High-Ticket Healthcare",
    industry: "Cosmetic Dermatology & Aesthetic Dentistry",
    location: "Dubai (Jumeirah) & Bangalore",
    timeline: "90-Day Full Deployment",
    servicesUsed: ["AI Appointment Setter", "Paid Ads (Meta & Google Search)", "Email & WhatsApp Automation"],
    mainMetric: "₹46L+",
    metricLabel: "High-Ticket Treatment Revenue",
    secondaryMetrics: [
      { label: "Lead Response Time", value: "<25 Seconds" },
      { label: "Consultation Booking Rate", value: "3.2x" },
      { label: "Clinic Show-Up Rate", value: "84%" },
      { label: "Cost Per Booked Patient", value: "-68%" }
    ],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "Aura Aesthetics & Dental is a luxury cosmetic clinic operating out of Jumeirah (Dubai) and Indiranagar (Bangalore). Specializing in high-ticket treatments including Invisalign aligners, full-mouth dental implants, laser resurfacing, and non-surgical facial rejuvenation, their procedure values range from ₹45,000 to over ₹3,50,000 ($600 to $4,500 USD).",
    challenge: "Aura was spending ₹3,50,000 per month on Google and Meta Ads, generating roughly 250 inbound inquiries monthly. However, their front-desk receptionists were overwhelmed with in-clinic patients and took 4 to 12 hours to call back digital leads. By the time the clinic reached out, over 65% of prospects had already contacted rival clinics or lost interest. Worse, of the consultations actually scheduled, 55% failed to show up, wasting valuable doctor chair time.",
    solution: "Social Ninja's deployed our Autonomous AI Appointment Setter system integrated directly with WhatsApp Business API and Google Calendar. We connected paid advertising directly into conversational AI qualification that contacted every lead in under 25 seconds, vetted treatment budget, scheduled doctor appointments, and ran automated multi-channel pre-visit nurture workflows.",
    whatWeDid: [
      { step: "01", title: "24/7 Sub-30s WhatsApp AI Setter", description: "We implemented an intelligent conversational AI setter trained on Aura's clinical FAQs, pricing tiers, and contraindications. The moment a lead submitted a form on Instagram or Google, the AI initiated a conversational WhatsApp chat within 22 seconds, asking qualifying questions about desired treatment, timeline, and budget." },
      { step: "02", title: "Frictionless 2-Way Calendar Booking", description: "Once qualified, the AI presented available consultation slots based on live doctor schedules and booked appointments directly into the clinic's CRM without human intervention. Confirmation emails and WhatsApp calendar invites were delivered instantaneously." },
      { step: "03", title: "Interactive Pre-Consultation Nurture Cadence", description: "To fix the 55% no-show problem, we built an automated pre-visit sequence: an introductory video from the treating physician, clinic parking and landmark directions via Google Maps, a treatment preparation checklist, and an automated 24-hour WhatsApp confirmation prompt." },
      { step: "04", title: "Doctor-Led Video Ad Creative Revamp", description: "We replaced stock model imagery with doctor-led procedural walk-throughs and patient testimonial journeys explaining clear aligner technology, drastically lifting lead intent and eliminating price objections before the consultation call." }
    ],
    detailedResults: [
      { metric: "Average Speed-to-Lead Response", before: "5.5 Hours", after: "22 Seconds", impact: "99% faster first touchpoint" },
      { metric: "Inquiry to Booked Consultation Rate", before: "9.2%", after: "29.4%", impact: "3.2x higher consultation volume" },
      { metric: "Consultation In-Clinic Show Rate", before: "45%", after: "84%", impact: "+39% higher doctor chair utilization" },
      { metric: "Attributed Treatment Revenue (90 Days)", before: "₹14,20,000", after: "₹46,80,000", impact: "+₹32.6L in closed procedures" }
    ],
    keyTakeaways: [
      "Speed-to-lead is everything in high-ticket services: Inquiring leads called within 60 seconds convert at 391% higher rates than those contacted after 2 hours.",
      "Autonomous AI eliminates human fatigue: Front-desk staff cannot respond to leads at 11 PM on Sunday; an AI setter works 24/7 with zero lag.",
      "Pre-visit nurture destroys no-shows: Sending doctor video introductions and practical directions builds personal trust and reduces cancellation rates to under 16%."
    ],
    testimonial: {
      text: "Our biggest headache wasn't generating leads — it was that our front desk was too busy with patients to respond promptly. Social Ninja's AI setter now books appointments while we sleep. Our consultation attendance jumped from 45% to 84%, generating over ₹46 Lakhs in new patient revenue in our first quarter.",
      author: "Dr. Farhan A.",
      role: "Clinical Director, Aura Aesthetics & Dental"
    },
    publishedAt: "2026-07-20",
    updatedAt: "2026-09-28",
    relatedService: { name: "AI Appointment Setter Systems", path: "/services/ai-appointment-setter" }
  },
  'cloudscale-logistics': {
    client: "CloudScale Logistics",
    category: "Enterprise Outbound",
    industry: "3PL & Cold-Chain Supply Logistics",
    location: "Navi Mumbai, Maharashtra",
    timeline: "90-Day Enterprise Sprint",
    servicesUsed: ["Email & WhatsApp Systems", "AI Automation & Enrichment", "Growth Consulting"],
    mainMetric: "₹3.4Cr+",
    metricLabel: "Closed Enterprise Contract Value",
    secondaryMetrics: [
      { label: "Cold Email Inbox Placement", value: "98.4%" },
      { label: "Positive Executive Reply Rate", value: "14.2%" },
      { label: "Enterprise Sales Calls Booked", value: "38 Meetings" },
      { label: "Average Deal Value", value: "₹28L/Year" }
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    clientBackground: "CloudScale Logistics is a tech-enabled third-party logistics (3PL) and temperature-controlled cold-chain warehousing provider based in Navi Mumbai. Serving enterprise FMCG, pharmaceutical, and rapid-growth D2C brands, CloudScale's contracts average ₹25L to ₹60L in annual recurring logistics fees.",
    challenge: "CloudScale's executive sales team was facing a critical pipeline bottleneck. Inbound search volume for enterprise cold-chain warehousing is notoriously thin, and traditional cold calling was stopped dead by corporate switchboard gatekeepers. To make matters worse, an internal sales rep sent 8,000 unauthenticated cold emails from their primary company domain, ruining their SPF/DKIM records and sending their corporate email straight into Google and Microsoft spam folders.",
    solution: "Social Ninja's engineered an enterprise cold outbound infrastructure. We isolated and warmed 12 dedicated secondary outbound domains with custom tracking domains (CTD), deployed AI web scrapers to enrich target account warehouse pain points, and launched a multi-threaded personalized email and LinkedIn outreach cadence.",
    whatWeDid: [
      { step: "01", title: "Bulletproof Domain Cluster & Inbox Warming", description: "We spun up 12 secondary lookalike domains configured with independent Google Workspace accounts, strict SPF, DKIM, DMARC, and custom tracking domains. Each inbox was warmed systematically over 21 days via automated peer-to-peer engagement, reaching a pristine 98.4% primary inbox placement score." },
      { step: "02", title: "AI Account Research & Trigger-Based Scraping", description: "We built automated scraping workflows that identified enterprise FMCG and pharma brands actively expanding into western India, experiencing warehouse stockouts, or receiving negative customer reviews regarding transit spoilage. This provided acute, timely context for every outreach message." },
      { step: "03", title: "Multi-Threaded Cold Outreach Cadence", description: "We wrote ultra-personalized, short-form 4-touch email sequences focused strictly on solving temperature-logistics compliance, avoiding salesy jargon. If an executive opened an email multiple times without replying, an automated touchpoint was triggered on LinkedIn." },
      { step: "04", title: "HubSpot CRM Synchronization & Lead Routing", description: "When an executive replied positively, an automated webhook routed the conversation into HubSpot, alerted the designated senior Account Executive on Slack, and pushed calendar options via WhatsApp, securing meetings with zero administrative lag." }
    ],
    detailedResults: [
      { metric: "Primary Inbox Placement", before: "22% (Spam-flagged)", after: "98.4%", impact: "Full domain deliverability recovery" },
      { metric: "Positive Executive Reply Rate", before: "0.8%", after: "14.2%", impact: "17.7x higher reply rate" },
      { metric: "Qualified Meetings with Heads of Supply Chain", before: "2 / month", after: "38 in 90 days", impact: "Over 12 qualified enterprise calls/month" },
      { metric: "Closed Multi-Year Logistics Contracts", before: "₹0 outbound", after: "₹3,40,00,000", impact: "₹3.4Cr in new annual contract value" }
    ],
    keyTakeaways: [
      "Never risk the primary domain: Outbound email requires dedicated, warmed secondary domains with isolated DNS records to protect day-to-day corporate operations.",
      "Relevance beats volume: 500 hyper-researched emails sent to the right supply chain heads generated more revenue than 20,000 generic spam blasts.",
      "Speed of reply handoff secures the contract: When an enterprise director replies 'Send details', scheduling a call within 10 minutes increases conversion by 80%."
    ],
    testimonial: {
      text: "Before Social Ninja's, our corporate domain was blacklisted and our sales reps couldn't get a single meeting with enterprise brand directors. Their team built a pristine outbound machine that booked 38 meetings with senior supply chain heads, resulting in ₹3.4 Crores in closed warehousing contracts in three months.",
      author: "Vikram S.",
      role: "Director of Business Development, CloudScale Logistics"
    },
    publishedAt: "2026-08-11",
    updatedAt: "2026-09-28",
    relatedService: { name: "Email & WhatsApp Outbound Systems", path: "/services/email-whatsapp" }
  }
};

function generateCaseStudyHtml(slug, data) {
  return `
    <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
      <a href="/case-studies" style="color:#38bdf8;text-decoration:none;font-size:14px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">← Back to All Case Studies</a>
      
      <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <span style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:5px 12px;border-radius:999px;">${data.category}</span>
        ${data.industry ? `<span style="font-size:12px;color:#a0a0b0;background:#121215;border:1px solid rgba(255,255,255,0.08);padding:5px 12px;border-radius:999px;">${data.industry}</span>` : ''}
        ${data.location ? `<span style="font-size:12px;color:#a0a0b0;background:#121215;border:1px solid rgba(255,255,255,0.08);padding:5px 12px;border-radius:999px;">📍 ${data.location}</span>` : ''}
        ${data.timeline ? `<span style="font-size:12px;color:#a0a0b0;background:#121215;border:1px solid rgba(255,255,255,0.08);padding:5px 12px;border-radius:999px;">⏱ ${data.timeline}</span>` : ''}
      </div>

      <h1 style="font-size:clamp(32px,5vw,52px);font-weight:800;color:#ffffff;line-height:1.15;margin:20px 0 16px;letter-spacing:-0.03em;">
        How We Scaled ${data.client}: <span style="color:#38bdf8;">${data.mainMetric}</span> ${data.metricLabel}
      </h1>
      
      <p style="font-size:18px;color:#a0a0b0;margin-bottom:32px;max-width:820px;line-height:1.6;">
        A comprehensive growth engineering breakdown: How our performance and automation systems eliminated acquisition bottlenecks and unlocked predictable profit margins for ${data.client}.
      </p>

      ${data.servicesUsed ? `
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:48px;">
          <span style="font-size:12px;font-weight:700;color:#707080;text-transform:uppercase;letter-spacing:1px;margin-right:8px;">Services Used:</span>
          ${data.servicesUsed.map(s => `<span style="font-size:12px;color:#d0d0e0;background:#0e121d;border:1px solid rgba(255,255,255,0.08);padding:4px 12px;border-radius:6px;">${s}</span>`).join('')}
        </div>
      ` : ''}

      <!-- Primary Metrics Card -->
      <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:36px;margin-bottom:60px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;align-items:center;">
          <div style="border-right:1px solid rgba(255,255,255,0.08);padding-right:24px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">Primary Outcome Metric</div>
            <div style="font-size:48px;font-weight:900;color:#ffffff;line-height:1;">${data.mainMetric}</div>
            <div style="font-size:14px;color:#94a3b8;margin-top:6px;font-weight:600;">${data.metricLabel}</div>
          </div>
          ${data.secondaryMetrics.map(m => `
            <div>
              <div style="font-size:26px;font-weight:800;color:#ffffff;">${m.value}</div>
              <div style="font-size:12px;color:#707080;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Long-Form Content Container (800px focused reading) -->
      <div style="max-width:800px;margin:0 auto 60px;">
        
        <!-- 01. Client Background -->
        <div style="margin-bottom:48px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;margin-bottom:10px;">01. CLIENT BACKGROUND &amp; BASELINE</div>
          <h2 style="font-size:26px;font-weight:800;color:#ffffff;margin-bottom:14px;">Who Is ${data.client}?</h2>
          <p style="font-size:16px;line-height:1.75;color:#d0d0e0;margin:0;">${data.clientBackground}</p>
        </div>

        <!-- 02. The Core Bottlenecks -->
        <div style="margin-bottom:48px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#f87171;margin-bottom:10px;">02. THE STRATEGIC OBSTACLE</div>
          <h2 style="font-size:26px;font-weight:800;color:#ffffff;margin-bottom:14px;">The Growth Bottlenecks</h2>
          <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-left:3px solid #ef4444;border-radius:12px;padding:24px;color:#d0d0e0;font-size:15.5px;line-height:1.7;">
            ${data.challenge}
          </div>
        </div>

        <!-- 03. Growth Playbook -->
        <div style="margin-bottom:48px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;margin-bottom:10px;">03. GROWTH ENGINEERING PLAYBOOK</div>
          <h2 style="font-size:26px;font-weight:800;color:#ffffff;margin-bottom:14px;">Tactical Execution &amp; Architecture</h2>
          <p style="font-size:15px;color:#94a3b8;line-height:1.6;margin-bottom:24px;">We dismantled ineffective legacy funnels and deployed our structured performance growth framework:</p>
          <div style="display:flex;flex-direction:column;gap:18px;">
            ${data.whatWeDid.map(step => `
              <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                  <span style="font-size:11px;font-weight:700;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:2px 8px;border-radius:4px;font-family:monospace;">${step.step}</span>
                  <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin:0;">${step.title}</h3>
                </div>
                <p style="font-size:14.5px;color:#a0a0b0;line-height:1.7;margin:0;">${step.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 04. Quantitative Impact Data Table -->
        <div style="margin-bottom:48px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;margin-bottom:10px;">04. QUANTITATIVE IMPACT</div>
          <h2 style="font-size:26px;font-weight:800;color:#ffffff;margin-bottom:14px;">Before vs. After Verified Performance Data</h2>
          <div style="overflow-x:auto;border:1px solid rgba(255,255,255,0.08);border-radius:14px;background:#0e121d;">
            <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;">
              <thead>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02);">
                  <th style="padding:14px 18px;color:#a0a0b0;font-weight:700;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Metric</th>
                  <th style="padding:14px 18px;color:#a0a0b0;font-weight:700;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Before Social Ninja's</th>
                  <th style="padding:14px 18px;color:#a0a0b0;font-weight:700;text-transform:uppercase;font-size:11px;letter-spacing:1px;">After Social Ninja's</th>
                  <th style="padding:14px 18px;color:#38bdf8;font-weight:700;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Net Impact</th>
                </tr>
              </thead>
              <tbody>
                ${data.detailedResults.map(r => `
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                    <td style="padding:14px 18px;font-weight:600;color:#ffffff;">${r.metric}</td>
                    <td style="padding:14px 18px;color:#a0a0b0;">${r.before}</td>
                    <td style="padding:14px 18px;color:#ffffff;font-weight:700;">${r.after}</td>
                    <td style="padding:14px 18px;color:#38bdf8;font-weight:700;">${r.impact}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 05. Key Strategic Takeaways -->
        <div style="margin-bottom:48px;">
          <h2 style="font-size:22px;font-weight:800;color:#ffffff;margin-bottom:16px;">Key Strategic Takeaways for Growth Leaders</h2>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${data.keyTakeaways.map(t => `
              <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px 20px;font-size:14.5px;color:#d0d0e0;line-height:1.6;display:flex;gap:12px;">
                <span style="color:#38bdf8;font-weight:700;">✓</span>
                <span>${t}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 06. Verified Client Testimonial -->
        ${data.testimonial ? `
          <div style="background:#0e121d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;margin-bottom:48px;">
            <p style="font-size:16px;color:#e0e0f0;font-style:italic;line-height:1.7;margin-bottom:20px;">"${data.testimonial.text}"</p>
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;">
              <div>
                <div style="font-weight:700;color:#ffffff;font-size:15px;">${data.testimonial.author}</div>
                <div style="color:#707080;font-size:12.5px;">${data.testimonial.role}</div>
              </div>
              <span style="font-size:11px;font-weight:700;color:#34d399;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.25);padding:4px 10px;border-radius:999px;">✓ Verified Client</span>
            </div>
          </div>
        ` : ''}

        <!-- CTA Conversion Card -->
        <div style="background:linear-gradient(135deg,#0e121d 0%,#121826 100%);border:1px solid rgba(56,189,248,0.25);border-radius:20px;padding:48px 32px;text-align:center;">
          <h2 style="font-size:28px;font-weight:800;color:#ffffff;margin-bottom:14px;">Ready to Engineer Predictable Growth?</h2>
          <p style="font-size:15px;color:#94a3b8;margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.6;">Whether you need full-funnel media buying, AI appointment setting, or custom creative pipelines, our team audits your bottlenecks and deploys proven systems.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            ${data.relatedService ? `<a href="${data.relatedService.path}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Explore ${data.relatedService.name} →</a>` : ''}
            <a href="/contact" style="background:#1F4B99;color:#ffffff;font-size:14px;font-weight:700;padding:12px 30px;border-radius:8px;text-decoration:none;">Book Growth Audit Call →</a>
          </div>
        </div>

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

  const url = route ? `https://socialninjas.in/${route}` : 'https://socialninjas.in/';
  
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
  '': {
    title: "AI Performance Marketing Agency | Social Ninja's",
    description: "We build AI lead pipelines, run high-ROAS Meta & Google ads, and automate content for 150+ brands. Book a free strategy session."
  },
  'services': {
    title: "Digital Marketing Services | AI, Ads, Content & SEO",
    description: "Explore Social Ninja's growth services: AI sales automation, Meta & Google ads, content production, SEO and web systems engineered for revenue."
  },
  'about': {
    title: "About Us | AI Growth Agency for Global Brands",
    description: "Social Ninja's is an AI-powered performance marketing agency founded in Bangalore in 2022, scaling 150+ brands across the US, UK, UAE and India."
  },
  'ai-products': {
    title: "AI Products & SaaS | Fit Ninja by Social Ninja's",
    description: "Explore Social Ninja's AI product suite — including Fit Ninja, the AI fitness coach. Request trial access."
  },
  'case-studies': {
    title: "Case Studies | Real Client Growth Results",
    description: "Real growth results from Social Ninja's clients — ROAS, lead volume and revenue outcomes from AI automation and performance marketing."
  },
  'blog': {
    title: "Blog | AI Marketing & Performance Growth Insights",
    description: "Playbooks on AI sales automation, Meta ads, GEO and content systems from the Social Ninja's team. Practical growth insights, no fluff."
  },
  'contact': {
    title: "Book a Free Growth Strategy Session | Social Ninja's",
    description: "Book a 15-minute growth strategy session. We'll audit your funnels and outline an AI-powered action plan for your brand.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Social Ninja's",
        "url": "https://socialninjas.in/",
        "hasMap": "https://www.google.com/maps/place/Social+Ninja's/@21.0680074,82.7525294,17z/data=!3m1!4b1!4m6!3m5!1s0x2027c91d5288325f:0xbad4c06d3856e671!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11zyznkfn_",
        "email": "info@socialninjas.in",
        "telephone": "+918147757479",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Social Ninja's Agency",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹",
        "sameAs": [
          "https://www.linkedin.com/company/social-ninja-s",
          "https://clutch.co/profile/social-ninjas-0"
        ]
      }
    ]
  },
  'privacy': {
    title: "Privacy Policy | Social Ninja's",
    description: "Read our privacy policy regarding data collection and usage."
  },
  'terms': {
    title: "Terms & Conditions | Social Ninja's",
    description: "Read the terms of service and conditions for using our website and products."
  },
  'tools': {
    title: "Free Growth & Finance Tools | Social Ninja's",
    description: "Free tools from Social Ninja's: WhatsApp link generator, take-home pay calculator, hourly-to-salary converter and mortgage calculator.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the WhatsApp link generator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — free forever, no signup required. You can generate custom WhatsApp direct-chat links and QR codes instantly."
            }
          },
          {
            "@type": "Question",
            "name": "Are the salary and wage calculators accurate for all 50 US states?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our take-home pay and salary calculators calculate federal income tax, FICA (Social Security & Medicare), state taxes, and local deductions across all 50 US states."
            }
          },
          {
            "@type": "Question",
            "name": "Do you store any personal, financial, or phone number data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All calculations and link generations run locally in your browser session. We do not store your numbers, salaries, or financial inputs."
            }
          },
          {
            "@type": "Question",
            "name": "Can marketing teams use these tools for client campaigns?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All Social Ninja's growth and financial utilities are 100% free to use for personal projects, client campaigns, and commercial workflows."
            }
          }
        ]
      }
    ]
  },
  'tools/whatsapp-link-generator': {
    title: "WhatsApp Link Generator | Free wa.me Link Creator",
    description: "Create custom WhatsApp direct-chat links with pre-filled messages and free QR codes. Boost conversions on Instagram, ads, and landing pages.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "WhatsApp Link Generator",
        "url": "https://socialninjas.in/tools/whatsapp-link-generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this WhatsApp link generator free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is 100% free with no account or registration required. You can generate unlimited links and download QR codes instantly."
            }
          },
          {
            "@type": "Question",
            "name": "How does the custom pre-filled message work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When someone clicks your generated link, WhatsApp opens with your pre-written text automatically filled in the message box ready to send."
            }
          },
          {
            "@type": "Question",
            "name": "Why should I include the country code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WhatsApp requires full international format (digits only, no '+' or leading zeros) so that users anywhere in the world can reach you seamlessly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I track clicks on my WhatsApp links?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can append UTM campaign parameters to the link, or run it through a link shortener to monitor click-through rates across channels."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between wa.me and api.whatsapp.com?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "wa.me is the official, short, and mobile-friendly URL format provided by WhatsApp. It loads faster and provides better UX."
            }
          }
        ]
      }
    ]
  },
  'tools/us-take-home-pay-calculator': {
    title: "US Take-Home Pay Calculator | 2026 Paycheck Estimator",
    description: "Calculate your exact take-home pay after federal, state, and FICA taxes across all 50 US states. Accurate 2026 tax brackets and deductions.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "US Take-Home Pay Calculator",
        "url": "https://socialninjas.in/tools/us-take-home-pay-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is take-home pay calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Take-home pay equals your gross salary minus pre-tax deductions (401k, health insurance), minus federal income tax, state income tax, and FICA taxes (Social Security and Medicare)."
            }
          },
          {
            "@type": "Question",
            "name": "Which US states have no state income tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Alaska, Florida, Nevada, New Hampshire (no wage tax), South Dakota, Tennessee, Texas, Washington (no wage tax), and Wyoming do not levy personal state income tax on earned wages."
            }
          },
          {
            "@type": "Question",
            "name": "What are the FICA tax rates for 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Social Security tax is 6.2% on wages up to the wage cap ($176,100), and Medicare tax is 1.45% on all earnings, plus an additional 0.9% for high earners over $200k."
            }
          },
          {
            "@type": "Question",
            "name": "Does this calculator support 401(k) and health insurance deductions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can enter annual pre-tax 401(k) contributions and health insurance premiums to see your adjusted taxable income and exact net pay."
            }
          }
        ]
      }
    ]
  },
  'tools/hourly-to-salary-calculator': {
    title: "Hourly to Salary Calculator | Convert Wage to Annual Pay",
    description: "Convert your hourly wage into annual salary, monthly, bi-weekly, and weekly earnings. Factor in overtime, paid time off, and hours worked per week.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Hourly to Salary Calculator",
        "url": "https://socialninjas.in/tools/hourly-to-salary-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you convert an hourly wage to an annual salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiply your hourly wage by the number of hours worked per week (typically 40), then multiply by the number of weeks worked per year (typically 52). For example, $30/hour × 40 hrs × 52 weeks = $62,400/year."
            }
          },
          {
            "@type": "Question",
            "name": "How many working hours are in a year?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard full-time year (40 hours/week × 52 weeks) consists of 2,080 working hours."
            }
          },
          {
            "@type": "Question",
            "name": "How does overtime pay affect my annual earnings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Overtime hours worked over 40 hours per week are generally compensated at 1.5× your base hourly rate under the US Fair Labor Standards Act (FLSA)."
            }
          },
          {
            "@type": "Question",
            "name": "Does this calculation include taxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool calculates gross earnings. To see your net after-tax paycheck, use our US Take-Home Pay Calculator."
            }
          }
        ]
      }
    ]
  },
  'tools/mortgage-rate-calculator': {
    title: "Mortgage Payment Calculator with Taxes & Insurance",
    description: "Estimate your monthly mortgage payments including principal, interest, property taxes, home insurance, and PMI. Free loan comparison tool.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Mortgage Payment Calculator",
        "url": "https://socialninjas.in/tools/mortgage-rate-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is included in a PITI mortgage payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PITI stands for Principal, Interest, Taxes, and Insurance. It represents the total monthly cost of homeownership."
            }
          },
          {
            "@type": "Question",
            "name": "What is Private Mortgage Insurance (PMI) and when does it apply?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PMI is required by conventional lenders if your down payment is less than 20% of the home purchase price. It typically costs between 0.5% and 1.5% of the loan amount annually."
            }
          },
          {
            "@type": "Question",
            "name": "How does loan term affect total interest paid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 15-year fixed mortgage has higher monthly payments than a 30-year mortgage, but you pay substantially less total interest over the life of the loan due to the shorter amortization period and lower interest rates."
            }
          },
          {
            "@type": "Question",
            "name": "Can I include HOA fees in my mortgage calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Enter your monthly HOA fees into the calculator to get an accurate estimate of your complete monthly housing expense."
            }
          }
        ]
      }
    ]
  },
  'growth-systems': {
    title: "Autonomous AI Growth Systems | Social Ninja's",
    description: "See how Social Ninja's autonomous growth systems turn ad spend into booked calls — AI qualification, WhatsApp nurture and CRM sync in seconds."
  },
  'careers': {
    title: "Careers | Social Ninja's",
    description: "Join Social Ninja's team of AI engineers and growth strategists scaling revenue globally."
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
      let caseStudyCardsHtml = '<div style="display:flex;flex-direction:column;gap:32px;">';
      for (const [slug, cs] of Object.entries(caseStudiesPrerenderData)) {
        caseStudyCardsHtml += `
          <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px;display:flex;flex-direction:column;gap:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
              <span style="color:#38bdf8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:4px 12px;border-radius:999px;">${cs.category}</span>
              <span style="font-size:12.5px;color:#808090;">${cs.location || ''} • ${cs.timeline || ''}</span>
            </div>
            <div>
              <h2 style="font-size:26px;color:#ffffff;margin:0 0 10px;font-weight:800;line-height:1.2;">
                <a href="/case-studies/${slug}" style="color:#ffffff;text-decoration:none;">${cs.client}: ${cs.mainMetric} ${cs.metricLabel}</a>
              </h2>
              <p style="color:#a0a0b0;font-size:15px;line-height:1.65;margin:0 0 18px;">${cs.clientBackground}</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 24px;">
              <div>
                <div style="font-size:32px;font-weight:900;color:#38bdf8;line-height:1;">${cs.mainMetric}</div>
                <div style="font-size:12px;color:#808090;margin-top:4px;font-weight:600;text-transform:uppercase;">${cs.metricLabel}</div>
              </div>
              ${cs.secondaryMetrics.slice(0, 2).map(m => `
                <div>
                  <div style="font-size:22px;font-weight:800;color:#ffffff;line-height:1.1;">${m.value}</div>
                  <div style="font-size:11.5px;color:#707080;margin-top:4px;font-weight:600;text-transform:uppercase;">${m.label}</div>
                </div>
              `).join('')}
            </div>
            <div>
              <a href="/case-studies/${slug}" style="display:inline-flex;align-items:center;gap:6px;color:#38bdf8;text-decoration:none;font-weight:700;font-size:14.5px;">Read Full Breakdown &amp; Data →</a>
            </div>
          </div>
        `;
      }
      caseStudyCardsHtml += '</div>';

      pageHtml = `
        <main style="max-width:1140px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
          <h1 style="font-size:clamp(32px,5vw,52px);font-weight:900;color:#ffffff;margin-bottom:16px;line-height:1.15;letter-spacing:-0.03em;">Client Results &amp; Case Studies</h1>
          <p style="font-size:18px;color:#a0a0b0;margin-bottom:48px;max-width:720px;line-height:1.6;">Real growth engineering results with verified metrics: ROAS, lead acquisition costs, pipeline volume, and closed revenue delivered for our partners.</p>
          ${caseStudyCardsHtml}
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
          <h1 style="font-size:42px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.2;">Insights by Social Ninja's</h1>
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

// 2.5. Render individual case study pages with rich complete static body and Article schema
console.log('Pre-rendering case study pages...');
for (const [slug, data] of Object.entries(caseStudiesPrerenderData)) {
  try {
    const route = `case-studies/${slug}`;
    const caseStudyHtml = generateCaseStudyHtml(slug, data);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `How We Scaled ${data.client}: ${data.mainMetric} ${data.metricLabel}`,
      "description": `In-depth case study: How Social Ninja's helped ${data.client} achieve ${data.mainMetric} ${data.metricLabel}. Read the background, core bottlenecks, tactical playbook, and verified results.`,
      "image": data.image,
      "author": {
        "@type": "Organization",
        "name": "Social Ninja's",
        "url": "https://socialninjas.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Social Ninja's",
        "logo": {
          "@type": "ImageObject",
          "url": "https://socialninjas.in/logo.png"
        }
      },
      "datePublished": data.publishedAt || "2026-03-12",
      "dateModified": data.updatedAt || "2026-09-29",
      "mainEntityOfPage": `https://socialninjas.in/case-studies/${slug}`
    };

    prerenderRoute(route, {
      title: `How We Scaled ${data.client}: ${data.mainMetric} ${data.metricLabel} | Social Ninja's`,
      description: `In-depth case study: How Social Ninja's helped ${data.client} achieve ${data.mainMetric} ${data.metricLabel}. Read the background, core bottlenecks, tactical playbook, and verified results.`,
      schemas: [articleSchema]
    }, caseStudyHtml);

    console.log(`✓ Pre-rendered: /${route} (Complete body & Article schema written)`);
  } catch (err) {
    console.error(`✗ Failed to pre-render case study page: /case-studies/${slug}`, err.message);
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
function getBlogServiceCta(post) {
  const cat = (post.category || '').toLowerCase();
  const text = (post.title + ' ' + post.content).toLowerCase();

  if (cat.includes('ai') || cat.includes('automation') || text.includes('sales pipeline') || text.includes('lead qualification')) {
    return {
      title: 'Automate Your Inbound & Sales Pipeline With AI',
      desc: 'Deploy custom AI agents that respond over WhatsApp & Instagram in under a second, qualify buyers, and book meetings directly into your calendar 24/7.',
      cta: 'Explore AI & Lead Automation',
      path: '/services/ai-automation',
      badge: 'AI Automation Service'
    };
  }
  if (cat.includes('paid') || cat.includes('performance') || cat.includes('advertising') || text.includes('roas') || text.includes('meta ads')) {
    return {
      title: 'Scale Paid Media With Proven Unit Economics',
      desc: 'Creative-first Meta and Google ad campaigns engineered on real contribution margin, averaging 4.5× ROAS by month 3.',
      cta: 'Explore Performance Paid Ads',
      path: '/services/paid-ads',
      badge: 'Paid Ads Service'
    };
  }
  if (cat.includes('email') || cat.includes('whatsapp') || text.includes('whatsapp') || text.includes('deliverability')) {
    return {
      title: 'Turn Chats & Inbox Leads Into High-Margin Sales',
      desc: 'Conversational commerce workflows, WhatsApp broadcast automation, and enterprise email nurture sequences built for maximum LTV.',
      cta: 'Explore WhatsApp & Email Automation',
      path: '/services/email-whatsapp',
      badge: 'Conversational Commerce'
    };
  }
  return {
    title: 'Dominate Organic Search & AI Search Engines (GEO)',
    desc: 'Technical SEO, sub-second web architecture, and Generative Engine Optimization engineered to capture high-intent buyers.',
    cta: 'Explore Web Design & SEO',
    path: '/services/web-seo',
    badge: 'Web & SEO Service'
  };
}

blogPosts.forEach(post => {
  try {
    const route = `blog/${post.id}`;
    const serviceCta = getBlogServiceCta(post);

    const categoryPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category);
    const otherPosts = blogPosts.filter(p => p.id !== post.id && p.category !== post.category);
    const relatedPosts = [...categoryPosts, ...otherPosts].slice(0, 3);

    const relatedPostsHtml = relatedPosts.map(r => `
      <div style="background:#0c0f17;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <span style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#38bdf8;">${r.category}</span>
          <h4 style="font-size:18px;font-weight:700;color:#ffffff;line-height:1.35;margin:10px 0 12px;">
            <a href="/blog/${r.id}" style="color:#ffffff;text-decoration:none;">${r.title}</a>
          </h4>
          <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin:0 0 16px;">${r.excerpt}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);font-size:12px;color:#707080;">
          <span>${r.readTime}</span>
          <a href="/blog/${r.id}" style="color:#38bdf8;text-decoration:none;font-weight:600;">Read Article →</a>
        </div>
      </div>
    `).join('');

    const articleHtml = `
      <main style="max-width:800px;margin:120px auto 80px;padding:0 24px;width:100%;font-family:system-ui,sans-serif;box-sizing:border-box;">
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

        <!-- Mapped Service CTA Banner -->
        <div style="margin:56px 0 48px;background:linear-gradient(135deg,rgba(15,23,42,0.8),rgba(14,18,29,0.95));border:1px solid rgba(56,189,248,0.25);border-radius:16px;padding:36px 32px;box-sizing:border-box;">
          <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:4px 12px;border-radius:999px;margin-bottom:14px;">${serviceCta.badge}</span>
          <h3 style="font-size:24px;font-weight:800;color:#ffffff;margin:0 0 10px;line-height:1.3;">${serviceCta.title}</h3>
          <p style="font-size:15px;color:#94a3b8;line-height:1.65;margin:0 0 24px;">${serviceCta.desc}</p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
            <a href="${serviceCta.path}" style="background:#1F4B99;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">${serviceCta.cta} →</a>
            <a href="/contact" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;font-size:14px;font-weight:600;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block;">Book Free Strategy Call</a>
          </div>
        </div>

        <!-- Related Articles & Case Studies -->
        <div style="margin-top:60px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);">
          <div style="margin-bottom:28px;">
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);padding:4px 12px;border-radius:999px;">DEEP-DIVE STRATEGIES</span>
            <h3 style="font-size:26px;font-weight:800;color:#ffffff;margin-top:12px;margin-bottom:6px;">Related Articles &amp; Case Studies</h3>
            <p style="font-size:14px;color:#94a3b8;margin:0;">Explore proven growth systems, automated ad frameworks, and technical marketing guides.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
            ${relatedPostsHtml}
          </div>
        </div>
      </main>
    `;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "author": {
        "@type": "Person",
        "name": post.author || "Social Ninja's Team"
      },
      "datePublished": post.publishedAt ? post.publishedAt.substring(0, 10) : '2026-06-15',
      "dateModified": post.publishedAt ? post.publishedAt.substring(0, 10) : '2026-06-15',
      "publisher": {
        "@type": "Organization",
        "name": "Social Ninja's",
        "logo": {
          "@type": "ImageObject",
          "url": "https://socialninjas.in/logo.png"
        }
      },
      "description": post.excerpt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://socialninjas.in/blog/${post.id}`
      }
    };

    prerenderRoute(route, {
      title: `${post.title} | Social Ninja's Blog`,
      description: post.excerpt,
      schemas: [articleSchema]
    }, articleHtml);
    console.log(`✓ Pre-rendered: /${route} (Complete body & Article schema written)`);
  } catch (err) {
    console.error(`✗ Failed to pre-render blog post: /blog/${post.id}`, err.message);
  }
});

// 5. Generate dynamic, clean sitemap.xml with verified URLs, accurate dates, and proper priorities
function generateSitemap(posts) {
  const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  const distSitemapPath = path.resolve(DIST_PATH, 'sitemap.xml');

  // Find latest blog post date for /blog
  let latestPostDate = '2026-06-28';
  posts.forEach(p => {
    if (p.publishedAt && p.publishedAt > latestPostDate) {
      latestPostDate = p.publishedAt;
    }
  });

  const staticEntries = [
    { loc: 'https://socialninjas.in/', lastmod: '2026-09-29', changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://socialninjas.in/services', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/paid-ads', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/content-production', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/email-whatsapp', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/social-media', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/ai-automation', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/web-seo', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/growth-consulting', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/geo-agency', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/instagram-seo', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/meta-ads-audit', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/ai-appointment-setter', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/performance-marketing', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/services/creative-studio', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/tools', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/tools/whatsapp-link-generator', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/tools/us-take-home-pay-calculator', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/tools/hourly-to-salary-calculator', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/tools/mortgage-rate-calculator', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/about', lastmod: '2026-09-26', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/ai-products', lastmod: '2026-09-26', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/growth-systems', lastmod: '2026-07-27', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies', lastmod: '2026-09-29', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://socialninjas.in/case-studies/zara-skin-co', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies/nexvue-technologies', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies/the-biryani-house', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies/pocketfit-india', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies/aura-aesthetics-clinic', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/case-studies/cloudscale-logistics', lastmod: '2026-09-29', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/contact', lastmod: '2026-09-26', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://socialninjas.in/careers', lastmod: '2026-09-17', changefreq: 'monthly', priority: '0.6' },
    { loc: 'https://socialninjas.in/blog', lastmod: latestPostDate, changefreq: 'weekly', priority: '0.8' },
  ];

  // Blog posts sorted descending by publishedAt
  const sortedPosts = [...posts].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  const blogEntries = sortedPosts.map(p => ({
    loc: `https://socialninjas.in/blog/${p.id}`,
    lastmod: p.publishedAt || '2026-06-28',
    changefreq: 'monthly',
    priority: '0.6'
  }));

  const legalEntries = [
    { loc: 'https://socialninjas.in/privacy', lastmod: '2026-09-26', changefreq: 'yearly', priority: '0.4' },
    { loc: 'https://socialninjas.in/terms', lastmod: '2026-09-26', changefreq: 'yearly', priority: '0.4' },
  ];

  const allEntries = [...staticEntries, ...blogEntries, ...legalEntries];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

  allEntries.forEach(entry => {
    xml += `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>\n`;
  });

  xml += '\n</urlset>\n';

  fs.writeFileSync(publicSitemapPath, xml, 'utf8');
  fs.writeFileSync(distSitemapPath, xml, 'utf8');
  console.log(`✓ Generated sitemap.xml with ${allEntries.length} verified URLs (${posts.length} blog posts).`);
}

generateSitemap(blogPosts);

console.log('SPA SEO static pre-rendering completed successfully with complete body tags and service pages!');
