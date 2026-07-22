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

// Define metadata for all unique routes
const routes = {
  'services': {
    title: "Services | Social Ninja's",
    description: "Explore our premium growth services - AI Lead Automation, Performance Marketing, Creative Studio, Web & SEO, and Growth Consulting."
  },
  'services/ai-automation': {
    title: "AI & Automation Services | Social Ninja's",
    description: "Deploy 24/7 custom AI agents to handle, qualify, and book meetings from your leads instantly."
  },
  'services/performance-marketing': {
    title: "Performance Marketing Services | Social Ninja's",
    description: "Profitable paid advertising campaigns on Meta and Google optimized for ROI and revenue growth."
  },
  'services/creative-studio': {
    title: "Creative Studio Services | Social Ninja's",
    description: "High-converting ad creatives, Reels, short-form videos, and native platform designs built for conversion."
  },
  'services/social-media': {
    title: "Social Media Management Services | Social Ninja's",
    description: "Consistent content planning, trend research, copywriting, community management, and growth strategies."
  },
  'services/web-seo': {
    title: "Web & SEO Services | Social Ninja's",
    description: "Redesign your website for conversion and rank on Google with technical audit, speed optimization, and content SEO."
  },
  'services/growth-consulting': {
    title: "Growth Consulting Services | Social Ninja's",
    description: "A clear 90-day growth roadmap, revenue funnel audit, and marketing strategy blueprint for modern brands."
  },
  'growth-systems': {
    title: "Growth Systems | Social Ninja's",
    description: "Four automated marketing and lead generation systems designed to capture and nurture prospects while you sleep."
  },
  'tools': {
    title: "Growth & SaaS Tools | Social Ninja's",
    description: "Free marketing tools, salary calculators, WhatsApp link builders, and our unified AI content studio."
  },
  'blog': {
    title: "Blog & Industry Insights | Social Ninja's",
    description: "Expert marketing advice, AI agency guides, and B2B growth systems from the Social Ninja's team."
  },
  'about': {
    title: "About Our AI Agency | Social Ninja's",
    description: "Meet the team building premium AI products and revenue growth systems for modern brands."
  },
  'contact': {
    title: "Book a Growth Call | Social Ninja's",
    description: "Schedule a free 30-minute growth blueprint session with our team."
  },
  'careers': {
    title: "Careers | Join Social Ninja's",
    description: "Build the future of AI automation and performance marketing. View our open roles."
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

// Custom parser to extract blog posts from blogPosts.ts directly
function extractBlogPosts() {
  const postsFilePath = path.resolve(__dirname, '../data/blogPosts.ts');
  if (!fs.existsSync(postsFilePath)) return [];
  
  const content = fs.readFileSync(postsFilePath, 'utf8');
  const posts = [];
  
  // Extract id, title, excerpt, color, category, image
  const blockRegex = /id:\s*['"`]([^'"`]+)['"`]/g;
  let match;
  
  while ((match = blockRegex.exec(content)) !== null) {
    const id = match[1];
    
    // Find title and excerpt relative to this id
    const startIndex = match.index;
    const postChunk = content.substring(startIndex, startIndex + 1500);
    
    const titleMatch = postChunk.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const excerptMatch = postChunk.match(/excerpt:\s*['"`]([^'"`]+)['"`]/);
    
    if (titleMatch) {
      posts.push({
        id,
        title: titleMatch[1].replace(/\\'/g, "'"),
        description: excerptMatch ? excerptMatch[1].replace(/\\'/g, "'").substring(0, 155) + '...' : 'Read our latest blog post on Social Ninja\'s.'
      });
    }
  }
  return posts;
}

// Generate static HTML for a given route
function prerenderRoute(route, metadata) {
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

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// ── Execute Prerendering ──
console.log('Starting static route pre-rendering for SPA...');

// 1. Render standard marketing pages
for (const [route, meta] of Object.entries(routes)) {
  try {
    prerenderRoute(route, meta);
    console.log(`✓ Pre-rendered: /${route}`);
  } catch (err) {
    console.error(`✗ Failed to pre-render: /${route}`, err.message);
  }
}

// 2. Render individual blog post pages for rich visual social previews
const blogPosts = extractBlogPosts();
console.log(`Extracted ${blogPosts.length} blog posts to pre-render.`);
blogPosts.forEach(post => {
  try {
    const route = `blog/${post.id}`;
    prerenderRoute(route, {
      title: `${post.title} | Social Ninja's Blog`,
      description: post.description
    });
    console.log(`✓ Pre-rendered: /${route}`);
  } catch (err) {
    console.error(`✗ Failed to pre-render blog post: /blog/${post.id}`, err.message);
  }
});

console.log('SPA SEO static pre-rendering completed successfully!');
