import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  BarChart2, 
  Palette, 
  Share2, 
  Globe, 
  TrendingUp, 
  Mail, 
  ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import NotFound from './NotFound';

interface FAQItem {
  q: string;
  a: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface ServiceData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  Icon: React.ComponentType<{ size?: number; color?: string; className?: string; strokeWidth?: number }>;
  color: string;
  hero: string;
  problem: string;
  solution: string;
  benefits: string[];
  stats: [string, string][];
  process: ProcessStep[];
  faqs: FAQItem[];
  cta: string;
}

const paidAdsData: ServiceData = {
  title: 'Paid Ads & Performance Marketing',
  metaTitle: 'Meta & Google Ads Agency | 4.5x Average ROAS',
  metaDescription: 'Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3. Get a free Meta & Google ads audit.',
  h1: 'Meta & Google Ads Engineered for Profit',
  tagline: 'Creative-first campaigns run on unit economics, not vanity metrics.',
  Icon: BarChart2,
  color: '#38bdf8',
  hero: 'Performance marketing engineered on unit economics: creative testing systems averaging 4.5x ROAS by month 3. We engineer full-funnel media buying campaigns across Meta, Google, and LinkedIn that target high-intent buyers, optimize unit economics, and eliminate wasted spend.',
  problem: 'You have likely tried boosting posts, running ads yourself, or working with agencies that deliver vanity metrics like clicks and impressions while sales stay flat. Rising customer acquisition costs (CAC), uncalibrated attribution, and ad fatigue destroy campaign margins when media buying lacks direct-response discipline.',
  solution: 'We rebuild your entire customer acquisition architecture. Starting with full conversion tracking verification (Meta CAPI & GA4), we design high-converting direct-response creatives, launch disciplined A/B testing matrices, and optimize bids mathematically based on net contribution margin — scaling what generates profit and cutting what does not.',
  benefits: [
    'Meta ads management across Facebook, Instagram & Audience Network',
    'Google ads management across Search, YouTube & Performance Max',
    'Creative matrix testing with weekly direct-response variations',
    'Landing page CRO & offer architecture to maximize conversion rate',
    'Weekly transparent executive reporting focused on CAC & ROAS',
    'Full-funnel dynamic retargeting & custom audience segmentation',
  ],
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
    },
    {
      q: 'How much does Meta and Google ads management cost in India?',
      a: 'Professional performance agency retainers in India typically range from ₹40,000 to ₹1,50,000/month or 10–15% of ad spend depending on creative volume and attribution complexity. Read our full breakdown: Meta Ads Agency Pricing in India (2026) for transparent market benchmarks.'
    }
  ],
  cta: 'Get a Free Meta & Google Ads Audit',
};

const contentProductionData: ServiceData = {
  title: 'Content Production & Creative Studio',
  metaTitle: "Content Production Services for Brands | Social Ninja's",
  metaDescription: 'Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views.',
  h1: 'Content Production That Converts',
  tagline: 'High-converting video scripts, carousel graphics and social posts, generated and scheduled for your niche.',
  Icon: Palette,
  color: '#38bdf8',
  hero: 'Scroll-stopping video scripts, carousels and branded content systems produced for your niche — engineered to convert, not just get views. We produce high-velocity short-form videos, UGC-style creatives, and scroll-stopping visuals built specifically to turn cold viewers into paying customers.',
  problem: 'Producing consistent, high-performing content requires videographers, direct-response scriptwriters, motion editors, and performance analysts. In-house production is slow and costly, while typical creative agencies deliver aesthetic art projects with zero conversion focus.',
  solution: 'Our Creative Studio functions as your agile direct-response production team. We research high-performing competitor hooks, write psychologically calibrated scripts, and edit high-velocity creative packages designed for platform algorithms and maximum conversion rate.',
  benefits: [
    'Viral script writing tailored to your niche and market sophistication',
    'Short-form video production direction for Reels, Shorts & TikTok',
    'Carousel & graphic design engineered for high click-through rates',
    'Content calendar planning & automated multi-platform scheduling',
    'Niche audio models & trending sound curation for algorithmic reach',
    'Bi-weekly creative refresh cycles to combat ad fatigue and sustain scale',
  ],
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
  cta: 'Build My Creative Strategy',
};

const emailWhatsappData: ServiceData = {
  title: 'WhatsApp Marketing & Email Automation Services',
  metaTitle: "WhatsApp & Email Marketing Automation | Social Ninja's",
  metaDescription: 'Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you.',
  h1: 'WhatsApp & Email Automation That Sells',
  tagline: 'AI agents and automation sequences that qualify, nurture and close leads inside the apps your customers actually open.',
  Icon: Mail,
  color: '#38bdf8',
  hero: 'Turn chats into revenue with WhatsApp broadcast automation, AI follow-ups and email nurture sequences. Conversational commerce, done for you. We build high-converting automated Email and WhatsApp marketing funnels that engage leads instantly, recover abandoned revenue, and generate consistent repeat purchases on autopilot.',
  problem: 'Most businesses rely solely on paid acquisition and neglect lead nurturing. Inbound leads grow cold within hours, abandoned checkouts are left unrecovered, and manual WhatsApp messaging is impossible to scale across hundreds of prospects.',
  solution: 'We design and deploy automated lifecycle marketing systems. By integrating official WhatsApp Cloud API and Klaviyo/HubSpot email infrastructure, we deliver personalized sub-second messages, segmented broadcast campaigns, and automated sales sequences that nurture leads into loyal buyers.',
  benefits: [
    'WhatsApp broadcast & drip campaigns using official Cloud API',
    'AI DM & chat qualifier with sub-second intelligent response',
    'Email nurture sequences engineered for high open and click rates',
    'Automated abandoned-cart & abandoned-inquiry recovery flows',
    'CRM + calendar sync with HubSpot, Supabase, and Google Calendar',
    'Strict deliverability optimization & Meta template compliance verification',
  ],
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
  cta: 'Automate My Revenue Funnels',
};

const aiAutomationData: ServiceData = {
  title: 'AI & Lead Automation',
  metaTitle: 'AI Lead Generation Agency | AI Sales Automation',
  metaDescription: 'AI agents reply to Instagram & WhatsApp DMs in under a second — qualifying leads and booking calls 24/7. Automate your sales pipeline.',
  h1: 'AI Lead Generation & Sales Automation',
  tagline: 'Your 24/7 sales and qualification engine — powered by AI.',
  Icon: Bot,
  color: '#38bdf8',
  hero: 'Most businesses lose qualified prospects simply because they respond too slowly. The average company takes 47 hours to follow up with an inbound inquiry. By then, the buyer has already purchased from a competitor. We deploy autonomous conversational AI agents that engage, qualify, and book meetings in under 1 second.',
  problem: 'Your sales team cannot be online 24/7. Leads inquire late at night, on weekends, and during meetings. Every hour without an immediate response causes conversion rates to plummet.',
  solution: 'We engineer and deploy custom AI sales agents trained on your specific product offerings, objection handling, and qualification criteria. The agent engages every inquiry instantly, answers questions conversationally, and books appointments directly into your calendar.',
  benefits: [
    'Sub-second conversational response to every incoming lead day or night',
    'Automated lead qualification matching your specific Ideal Customer Profile (ICP)',
    'Direct calendar booking into Google Calendar, Outlook, and Calendly',
    'Multi-channel deployment: Website live chat, WhatsApp Cloud API, Instagram DMs',
    'Automated multi-channel follow-up sequences across SMS and email',
    'Real-time CRM logging to Supabase, HubSpot, and custom sales pipelines',
  ],
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
  cta: 'Set Up My AI Agent',
};

const socialMediaData: ServiceData = {
  title: 'Social Media Management',
  metaTitle: "Social Media Management Services | Social Ninja's",
  metaDescription: 'Done-for-you social media management: content calendars, creatives and community management that grow pipeline — not just followers.',
  h1: 'Social Media Management for Growth',
  tagline: 'Consistent brand dominance and organic growth — without manual overhead.',
  Icon: Share2,
  color: '#38bdf8',
  hero: 'Social media growth requires relentless consistency and algorithmic resonance. Finding time to research trending formats, write engaging copy, produce graphics, post daily, and reply to comments is nearly impossible while managing core business operations. We take over your social media presence end-to-end.',
  problem: 'Sporadic posting fails to build momentum. Platform algorithms heavily favor active accounts that post high-retention content consistently. Posting generic updates once a week gets swallowed by the feed while your competitors capture market attention.',
  solution: 'We manage your social media channels completely. Our team builds a custom monthly content calendar, writes platform-specific copy, creates carousels and reels, schedules posts at peak engagement windows, and engages with your community in real time.',
  benefits: [
    'Data-driven monthly content strategy aligned with your target audience and brand voice',
    'Platform-optimized copywriting, visual carousels, and hashtag strategy',
    'Consistent posting schedule scheduled during highest-activity audience windows',
    'Community management: Active replies to inbound comments, mentions, and questions',
    'Real-time trend and algorithm monitoring to capitalize on viral opportunities',
    'Monthly performance reviews tracking organic impressions, follower growth, and click-throughs',
  ],
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
  cta: 'Manage My Social Media',
};

const webSeoData: ServiceData = {
  title: 'Web Design & Technical SEO',
  metaTitle: "SEO Services & High-Speed Websites | Social Ninja's",
  metaDescription: 'Rank higher and convert more with technical SEO, content systems and sub-second landing pages. SEO services built for revenue, not just traffic.',
  h1: 'SEO Services That Turn Searches Into Customers',
  tagline: 'Sub-second load times, technical SEO dominance, and high-converting landing pages.',
  Icon: Globe,
  color: '#38bdf8',
  hero: 'Your website should be an automated sales machine that ranks on Google and turns visitors into paying clients around the clock. If your site is slow, poorly indexed, or fails to convert traffic, revenue is leaking. We engineer sub-second websites and technical SEO architectures that dominate search results and maximize conversions.',
  problem: 'Most agency websites look aesthetically pleasing but convert poorly. Slow loading times, bloated code, poor mobile responsiveness, missing schema markup, and weak search intent targeting prevent websites from ranking on page 1 of Google.',
  solution: 'We conduct comprehensive audits across technical speed, keyword search intent, and user conversion funnels. We optimize Core Web Vitals, implement rich JSON-LD structured data, write keyword-rich content, and rebuild page architectures to maximize lead generation.',
  benefits: [
    'Comprehensive technical SEO audit and architectural optimization',
    'High-intent keyword research targeting buyers actively searching for your solutions',
    'Sub-second website engineering with optimized Core Web Vitals (LCP, FID, CLS)',
    'Rich JSON-LD structured data markup (Organization, Service, FAQ, Product schemas)',
    'Conversion-rate-optimized (CRO) landing pages with clear CTAs and friction-free lead forms',
    'Monthly keyword ranking and organic traffic analytics reporting',
  ],
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
  cta: 'Audit My Website & SEO',
};

const growthConsultingData: ServiceData = {
  title: 'Revenue Growth Consulting',
  metaTitle: "Revenue Growth Consulting | Social Ninja's",
  metaDescription: 'Strategic marketing audits, unit economic analysis, and 90-day execution roadmaps for founders and marketing teams ready to scale predictably.',
  h1: 'Revenue Growth Consulting',
  tagline: 'A data-driven 90-day scaling roadmap — and rigorous accountability.',
  Icon: TrendingUp,
  color: '#38bdf8',
  hero: 'Sometimes scaling does not require more random marketing tactics. It requires an objective, data-driven audit of your entire revenue funnel to identify where margins are leaking, what channels are working, and what clear priorities will accelerate bottom-line profit.',
  problem: 'Founders and marketing teams often operate too close to day-to-day operations to pinpoint structural bottlenecks. Budget is wasted across fragmented initiatives with no clear attribution, while team execution lacks focus.',
  solution: 'We conduct an exhaustive audit of your revenue engine — customer unit economics, acquisition funnels, conversion rates, and retention loops. We deliver an actionable 90-day growth roadmap and hold weekly strategy check-ins to ensure rigorous execution.',
  benefits: [
    'Comprehensive marketing and sales funnel audit across all touchpoints',
    'Unit economics and Contribution Margin analysis (CAC, LTV, payback period)',
    'Clear 90-day prioritized execution roadmap with defined milestones',
    'Conversion Rate Optimization (CRO) review for landing pages and checkout flows',
    'Weekly executive advisory sessions and progress tracking',
    'Full documentation, SOPs, and marketing playbooks owned entirely by your team',
  ],
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
  cta: 'Book a Strategy Session',
};

const geoAgencyData: ServiceData = {
  title: 'Generative Engine Optimization (GEO) Agency',
  metaTitle: 'GEO Agency | Get Cited by ChatGPT, Perplexity & Gemini',
  metaDescription: 'Generative Engine Optimization: get your brand cited in AI answers. Audits, entity building and content systems for the AI-search era.',
  h1: 'Be the Brand AI Search Recommends',
  tagline: 'Generative Engine Optimization engineered for citation dominance across AI search engines.',
  Icon: Globe,
  color: '#38bdf8',
  hero: 'Generative Engine Optimization (GEO) is the new frontier of search visibility. Buyers no longer just scroll 10 blue links on Google — they ask ChatGPT, Perplexity, Gemini, and Claude for direct recommendations. If your brand lacks structured entity architecture and citation authority, AI engines will recommend your competitors instead.',
  problem: 'Traditional SEO keyword stuffing does not work in LLM answers. AI search engines synthesize answers using semantic entity extraction, retrieval-augmented knowledge bases, and authoritative multi-source consensus. Unstructured websites are invisible to generative AI.',
  solution: 'We engineer your brand\'s digital presence specifically for LLM citation. Through comprehensive AI visibility audits, Knowledge Graph entity building, nested JSON-LD schema architectures, and citation-worthy technical data assets, we position your company as the authoritative answer across all major AI search platforms.',
  benefits: [
    'AI-search visibility audit across ChatGPT Search, Perplexity, Google Gemini, and Claude',
    'Knowledge Graph entity building & structured nested JSON-LD schema implementation',
    'Citation-worthy technical content systems & digital PR designed for LLM retrieval (RAG)',
    'Continuous Perplexity, Gemini & ChatGPT prompt tracking & sentiment monitoring',
    'Information gain analysis & multi-source authoritative co-citation engineering',
    'Sub-second crawlable web architecture with semantic markdown & clean HTML rendering',
  ],
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
  cta: 'Audit My AI Search Visibility',
};

const instagramSeoData: ServiceData = {
  title: 'Instagram SEO Services',
  metaTitle: 'Instagram SEO Services | Rank Higher on Instagram',
  metaDescription: 'Instagram SEO that gets your profile and reels discovered in search — keyword-optimized bios, captions and content systems.',
  h1: 'Get Discovered on Instagram Search',
  tagline: 'Rank at the top of Instagram search and explore feeds for high-intent queries.',
  Icon: Share2,
  color: '#38bdf8',
  hero: 'Instagram has evolved into a primary search engine for modern consumers. Millions of high-intent buyers search for products, local services, and solutions directly in the Instagram search bar. We optimize your entire profile, reel metadata, and caption systems so your brand ranks at the top when ideal customers search your niche.',
  problem: 'Relying exclusively on 30 random hashtags or hoping the algorithm randomly blesses your Reels is a failing strategy. Without deliberate keyword optimization across your profile name, bio, closed captions, and audio tags, your account remains invisible to searchers looking to buy right now.',
  solution: 'We turn your Instagram account into a high-intent search engine funnel. By identifying high-volume search terms, structuring your profile metadata, and implementing semantic caption frameworks, we deliver compounding organic discovery from non-followers every single week.',
  benefits: [
    'Profile keyword optimization: Name field, bio, and categorization engineered for search ranking',
    'Searchable caption systems: Natural semantic keyword integration that feeds Instagram\'s recommendation AI',
    'Reel SEO & alt-text optimization: Audio tagging, text overlay keywords, and accessible metadata',
    'Strategic hashtag & topic categorization: Niche cluster tags that signal relevance to the Explore feed',
    'Inbound keyword intent mapping: Targeting high-intent commercial terms your buyers search for',
    'Monthly Instagram search impressions & organic reach growth reporting',
  ],
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
  cta: 'Optimize My Instagram for Search',
};

const metaAdsAuditData: ServiceData = {
  title: 'Free Meta Ads Audit',
  metaTitle: 'Free Meta Ads Audit | Find Your Wasted Spend',
  metaDescription: 'A free, no-fluff audit of your Meta ad account: creative diagnosis, targeting gaps and the 3 fixes with the biggest ROAS upside.',
  h1: 'See Exactly What\'s Wrong With Your Ads',
  tagline: 'Forensic account teardown that identifies wasted spend, creative fatigue, and your 3 biggest ROAS levers.',
  Icon: BarChart2,
  color: '#38bdf8',
  hero: 'Stop burning ad budget on uncalibrated campaigns. Our forensic Meta Ads Audit provides an uncompromising teardown of your ad accounts, creative performance, attribution tracking, and funnel drop-offs — showing you precisely where ad spend is leaking and the 3 high-leverage fixes to unlock profitable scale.',
  problem: 'Most ad accounts suffer from hidden leaks: overlapping custom audiences bidding against each other, degraded attribution from broken Conversions API (CAPI) setups, severe creative fatigue, and ad spend poured into campaigns with negative unit contribution margins.',
  solution: 'We perform a deep forensic analysis of your last 90 days of Meta advertising. We inspect CAPI match quality, dissect hook and hold rates on your creatives, audit account structure, and deliver an actionable 3-step blueprint to increase ROAS — 100% free with zero obligation.',
  benefits: [
    'Full account structure teardown: Campaign architecture, budget allocation (CBO/ABO), and bid strategies',
    'Creative fatigue & scoring: Hook rate (<3s), hold rate, and visual fatigue diagnosis across past 90 days',
    'Audience overlap & tracking check: Meta Conversions API (CAPI) event match quality and pixel deduplication',
    '3 prioritized fixes with the highest immediate ROAS and net contribution margin upside',
    'Unit economics breakdown: Realistic CAC vs Contribution Margin benchmarks for your specific industry',
    '30-minute recorded video walk-through and actionable executive PDF summary',
  ],
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
  cta: 'Claim Free Meta Ads Audit',
};

const aiAppointmentSetterData: ServiceData = {
  title: 'AI Appointment Setter',
  metaTitle: 'AI Appointment Setter | Never Miss a Lead Again',
  metaDescription: 'An AI setter that answers every DM, call and form in seconds, qualifies prospects and books them straight into your calendar — 24/7.',
  h1: 'Every Lead Answered in Seconds',
  tagline: 'Autonomous AI setter that qualifies buyers and books meetings 24/7 across DMs, web forms, and WhatsApp.',
  Icon: Bot,
  color: '#38bdf8',
  hero: 'Every minute a prospect waits for a response, their likelihood of booking a call drops by 80%. Human sales reps sleep, take lunch breaks, and take hours to reply. Our AI Appointment Setter answers every Instagram DM, WhatsApp message, and website inquiry in under 1 second, asks rigorous qualifying questions, and books qualified meetings directly into your calendar 24/7.',
  problem: 'Inbound leads cost serious money to acquire. When inquiries sit unaddressed for hours or days, high-value prospects hire a competitor. Human SDR teams are expensive to hire, train, and manage, and manual follow-up consistently drops qualified pipeline.',
  solution: 'We build and deploy a dedicated conversational AI setter calibrated to your qualification criteria. The AI setter engages inquiries instantly, conversationalizes objection handling, validates budget and timeline, and seamlessly drops a calendar booking link with automated SMS/email reminders.',
  benefits: [
    'Sub-second (<1s) conversational response across Instagram DMs, WhatsApp, SMS, and website forms',
    'Custom qualification scripts: Screening budget, timeline, and decision-maker status against your ICP',
    'Direct calendar booking into Google Calendar, Calendly, or Cal.com with automated reminder notifications',
    'Bi-directional CRM sync with HubSpot, GoHighLevel, Supabase, and custom webhook pipelines',
    'Missed-lead & cold database reactivation sequences that revive old pipeline contacts automatically',
    'Strict anti-hallucination bounds: RAG architecture grounded strictly in your verified company knowledge',
  ],
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
  cta: 'Deploy My AI Appointment Setter',
};

const servicesData: Record<string, ServiceData> = {
  'paid-ads': paidAdsData,
  'performance-marketing': paidAdsData,
  'content-production': contentProductionData,
  'creative-studio': contentProductionData,
  'email-whatsapp': emailWhatsappData,
  'ai-automation': aiAutomationData,
  'social-media': socialMediaData,
  'web-seo': webSeoData,
  'growth-consulting': growthConsultingData,
  'geo-agency': geoAgencyData,
  'instagram-seo': instagramSeoData,
  'meta-ads-audit': metaAdsAuditData,
  'ai-appointment-setter': aiAppointmentSetterData,
};

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const ServiceDetail: React.FC = () => {
  useReveal();
  const { id } = useParams<{ id: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const s = id ? servicesData[id] : null;

  if (!s) {
    return <NotFound />;
  }

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="page-wrap bg-[#07090e] text-white selection:bg-[#38bdf8] selection:text-[#07090e]" style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      
      <SEO 
        title={s.metaTitle} 
        description={s.metaDescription} 
        service={{
          name: s.title,
          description: s.metaDescription || s.hero,
          providerName: "Social Ninja's"
        }}
        faq={s.faqs}
      />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, width: '100%', boxSizing: 'border-box' }}>
          
          <Link 
            to="/services" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              color: '#94a3b8', 
              textDecoration: 'none', 
              fontSize: 13, 
              marginBottom: 32, 
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
          >
            <ArrowLeft size={15} /> Back to All Services
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 56, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 14, 
                  background: 'rgba(56, 189, 248, 0.1)', 
                  border: '1px solid rgba(56, 189, 248, 0.25)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#38bdf8',
                  flexShrink: 0 
                }}>
                  {s.Icon && <s.Icon size={26} strokeWidth={1.75} />}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold tracking-wide">
                  Social Ninja's Flagship Capability
                </div>
              </div>

              <h1 className="reveal" style={{ fontFamily: "'Bricolage Grotesque','Plus Jakarta Sans',system-ui", fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16, color: '#ffffff' }}>
                {s.h1}
              </h1>

              <div className="reveal d1" style={{ fontSize: 18, fontWeight: 500, color: '#38bdf8', marginBottom: 20, lineHeight: 1.4 }}>
                {s.tagline}
              </div>

              <p className="reveal d2" style={{ fontSize: 15.5, fontWeight: 400, color: '#94a3b8', lineHeight: 1.75, marginBottom: 36, borderLeft: '2px solid rgba(56, 189, 248, 0.4)', paddingLeft: 20 }}>
                {s.hero}
              </p>

              <div className="reveal d3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/contact">
                  <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px', background: '#1F4B99', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {s.cta} <ArrowRight size={16} />
                  </button>
                </Link>
                <Link to="/case-studies">
                  <button className="btn-ghost" style={{ fontSize: 15, padding: '14px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}>
                    View Case Studies
                  </button>
                </Link>
              </div>
            </div>

            {/* STATS BENTO */}
            <div className="reveal-r d2">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {s.stats.map(([num, label]: [string, string]) => (
                  <div 
                    key={label} 
                    style={{ 
                      background: '#0e121d', 
                      padding: '28px 20px', 
                      borderRadius: 16, 
                      textAlign: 'center', 
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderTop: '2px solid rgba(56, 189, 248, 0.4)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 32, fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                      {num}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.4, fontWeight: 500 }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 80 }} className="hero-grid-cols">
          <div style={{ background: '#0e121d', border: '1px solid rgba(255, 255, 255, 0.08)', borderTop: '2px solid rgba(239, 68, 68, 0.5)', padding: 36, borderRadius: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f87171', marginBottom: 16 }}>
              The Cost of Inaction
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12, lineHeight: 1.3 }}>
              Why typical strategies stall growth
            </h3>
            <p style={{ fontSize: 14.5, fontWeight: 400, color: '#94a3b8', lineHeight: 1.75, margin: 0 }}>
              {s.problem}
            </p>
          </div>

          <div style={{ background: '#0e121d', border: '1px solid rgba(255, 255, 255, 0.08)', borderTop: '2px solid rgba(56, 189, 248, 0.6)', padding: 36, borderRadius: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: 16 }}>
              The Engineered Solution
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12, lineHeight: 1.3 }}>
              How our system scales predictably
            </h3>
            <p style={{ fontSize: 14.5, fontWeight: 400, color: '#94a3b8', lineHeight: 1.75, margin: 0 }}>
              {s.solution}
            </p>
          </div>
        </div>

        {/* WHAT'S INCLUDED */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            WHAT'S INCLUDED
          </div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
            Everything included in your engagement.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 80 }}>
          {s.benefits.map((benefit: string, idx: number) => (
            <div 
              key={idx} 
              style={{ 
                background: '#0e121d', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                padding: '20px 24px', 
                borderRadius: 16, 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 14,
                transition: 'border-color 0.2s, transform 0.2s'
              }}
            >
              <CheckCircle2 size={18} color="#38bdf8" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14.5, fontWeight: 400, color: '#cbd5e1', lineHeight: 1.6 }}>{benefit}</span>
            </div>
          ))}
        </div>

        {/* PROCESS SECTION */}
        {s.process && s.process.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
                THE PROCESS
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
                How we execute and scale.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {s.process.map((p, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#0e121d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 18,
                    padding: '28px 24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 24, fontWeight: 800, color: '#38bdf8', marginBottom: 12 }}>
                    {p.step}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 10 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING GUIDE CALLOUT (FOR PAID ADS) */}
        {(id === 'paid-ads' || id === 'performance-marketing') && (
          <div style={{ maxWidth: 800, margin: '0 auto 60px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(31, 75, 153, 0.2) 0%, rgba(14, 18, 29, 0.95) 100%)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 16, padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8' }}>
                  TRANSPARENT AGENCY BENCHMARKS
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', margin: '6px 0 4px' }}>
                  What Does Meta Ads Management Actually Cost in India?
                </h3>
                <p style={{ fontSize: 13.5, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Compare retainer bands, % of spend models, red flags in cheap agency quotes, and our 5-question hiring checklist.
                </p>
              </div>
              <Link to="/blog/meta-ads-agency-pricing-india-2026" style={{ textDecoration: 'none' }}>
                <button style={{ background: '#1F4B99', color: '#ffffff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Read Pricing Guide <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* FAQ ACCORDION SECTION */}
        <div style={{ maxWidth: 800, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
              Questions about this service.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {s.faqs.map((faq: FAQItem, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#0e121d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: 15.5,
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={18} 
                      color="#38bdf8" 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.2s ease', 
                        flexShrink: 0 
                      }} 
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: 14.5, color: '#94a3b8', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 16 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA CARD */}
        <div style={{ background: 'linear-gradient(135deg, #0e121d 0%, #121826 100%)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 24, padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: 16, lineHeight: 1.15 }}>
            Ready to engineer predictable growth?
          </h2>
          <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Schedule a confidential 30-minute growth roadmap session. We will audit your current acquisition funnels and present a concrete execution strategy.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px', background: '#1F4B99', fontWeight: 600 }}>
                {s.cta} <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/services">
              <button className="btn-ghost" style={{ fontSize: 15, padding: '15px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}>
                Explore Other Services
              </button>
            </Link>
          </div>
        </div>

      </section>

      <style>{`
        @media(max-width:900px){
          .hero-grid-cols{grid-template-columns:1fr!important;gap:36px!important;}
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
