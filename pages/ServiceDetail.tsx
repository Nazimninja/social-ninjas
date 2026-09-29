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
  ChevronDown, 
  ShieldCheck, 
  Zap,
  Target
} from 'lucide-react';
import SEO from '../components/SEO';
import NotFound from './NotFound';

interface FAQItem {
  q: string;
  a: string;
}

interface ServiceData {
  title: string;
  h1: string;
  tagline: string;
  Icon: React.ComponentType<{ size?: number; color?: string; className?: string; strokeWidth?: number }>;
  color: string;
  hero: string;
  problem: string;
  solution: string;
  benefits: string[];
  stats: [string, string][];
  faqs: FAQItem[];
  cta: string;
}

const paidAdsData: ServiceData = {
  title: 'Paid Ads & Performance Marketing',
  h1: 'Paid Ads & Performance Marketing',
  tagline: 'Data-driven Meta, Google & LinkedIn campaigns engineered for maximum ROAS.',
  Icon: BarChart2,
  color: '#38bdf8',
  hero: 'Running ads is easy. Running ads that generate real profit and scale predictably is hard. Most businesses waste significant ad budget on fatigued creatives and misaligned targeting. We engineer full-funnel media buying campaigns across Meta, Google, and LinkedIn that acquire high-intent buyers, optimize unit economics, and eliminate wasted spend.',
  problem: 'You have likely tried boosting posts, running ads yourself, or working with agencies that deliver vanity metrics like clicks and impressions while sales stay flat. Rising customer acquisition costs (CAC), uncalibrated tracking, and creative fatigue destroy campaign margins when media buying lacks direct-response discipline.',
  solution: 'We rebuild your entire customer acquisition architecture. Starting with full conversion tracking verification (Meta CAPI & GA4), we design high-converting direct-response creatives, launch disciplined A/B testing matrices, and optimize bids mathematically based on net contribution margin — scaling what generates profit and cutting what does not.',
  benefits: [
    'Full-funnel Meta (Facebook & Instagram) and Google Ads campaign architecture',
    'High-intent keyword and Performance Max campaign management for Google & YouTube',
    'Conversion tracking & server-side attribution with Meta CAPI and Google Enhanced Conversions',
    'Weekly creative matrix testing: static image hooks, carousels, and high-converting video variations',
    'Granular audience segmentation, lookalikes, and dynamic retargeting funnels',
    'Weekly transparent executive reporting focused on CAC, MER, and Contribution Margin',
  ],
  stats: [
    ['4.5x', 'Average Client ROAS'],
    ['₹40Cr+', 'Ad Spend Managed'],
    ['60 Days', 'Avg. Scaling Timeline'],
    ['97%', 'Client Retention Rate'],
  ],
  faqs: [
    {
      q: 'Which advertising platforms do you manage?',
      a: 'We specialize in Meta (Facebook and Instagram), Google Search, Google Performance Max, YouTube, and LinkedIn Ads. We choose platform mixes based on where your high-intent buyers spend their time.'
    },
    {
      q: 'What budget do I need to start?',
      a: 'We typically recommend a minimum monthly ad spend of ₹1,00,000 ($1,500 USD) to ensure sufficient conversion data for rapid creative and audience testing.'
    },
    {
      q: 'How quickly will we see results?',
      a: 'Initial creative testing and pixel calibration take 14 to 21 days. Most clients achieve stabilized customer acquisition costs and profitable scaling within 45 to 60 days.'
    },
    {
      q: 'Who owns the ad accounts and creative assets?',
      a: 'You retain 100% full legal ownership of your Meta Business Manager, Google Ads accounts, pixel data, custom audiences, and all creative assets developed during our engagement.'
    }
  ],
  cta: 'Audit My Ad Campaigns',
};

const contentProductionData: ServiceData = {
  title: 'Content Production & Creative Studio',
  h1: 'Content Production & Creative Studio',
  tagline: 'High-velocity video, Reels, and direct-response creatives that stop the scroll.',
  Icon: Palette,
  color: '#38bdf8',
  hero: 'Most advertising campaigns fail not from poor audience targeting, but from mediocre creative. Audiences scroll past generic stock images and templated corporate videos within a fraction of a second. We produce high-velocity short-form videos, UGC-style creatives, and scroll-stopping visuals engineered specifically to convert cold viewers into paying customers.',
  problem: 'Producing consistent, high-performing content requires videographers, direct-response scriptwriters, motion editors, and performance analysts. In-house production is slow and costly, while typical creative agencies deliver aesthetic art projects with zero conversion focus.',
  solution: 'Our Creative Studio functions as your agile direct-response production team. We research high-performing competitor hooks, write psychologically calibrated scripts, and edit high-velocity creative packages designed for platform algorithms and maximum conversion rate.',
  benefits: [
    'Direct-response vertical short-form video production (Instagram Reels, YouTube Shorts, TikTok)',
    'Paid ad creative packs: static image hooks, value carousels, and motion graphics ads',
    'UGC (User-Generated Content) sourcing, creator briefing, and high-converting video editing',
    'Psychological direct-response copywriting for hooks, scripts, and captions',
    'High-converting landing page graphic visual assets and product mockups',
    'Bi-weekly creative refresh cycles to combat ad fatigue and sustain high ROAS',
  ],
  stats: [
    ['3x', 'Average Engagement Lift'],
    ['48hrs', 'Rapid Creative Turnaround'],
    ['100%', 'Commercial Asset Ownership'],
    ['Data-Led', 'Every Frame Tested'],
  ],
  faqs: [
    {
      q: 'What types of creative assets do you produce?',
      a: 'We produce short-form vertical videos (Reels & Shorts), direct-response paid social ads, multi-slide educational carousels, UGC-style product showcases, and conversion-focused landing page graphics.'
    },
    {
      q: 'How do you determine what creative style works for our brand?',
      a: 'We analyze real engagement data, competitor ad libraries, and emerging algorithmic formats in your niche to build creative briefs with tested emotional hooks and proven conversion angles.'
    },
    {
      q: 'What is your typical turnaround time for new creatives?',
      a: 'Standard creative batches — including scripts, graphic designs, and video cuts — are completed and delivered for review within 48 to 72 hours.'
    },
    {
      q: 'Do we need to supply our own raw video footage?',
      a: 'We offer flexible workflows. You can provide existing product footage, send physical products to our creators, or let our motion design team produce 100% custom graphic and animation assets.'
    }
  ],
  cta: 'Build My Creative Strategy',
};

const emailWhatsappData: ServiceData = {
  title: 'Email & WhatsApp Marketing Automation',
  h1: 'Email & WhatsApp Marketing Automation',
  tagline: 'Automated retention, abandoned cart recovery, and broadcast funnels that drive recurring revenue.',
  Icon: Mail,
  color: '#38bdf8',
  hero: 'Acquiring new customers is expensive, but your existing leads and past buyers are your most profitable asset. We build high-converting automated Email and WhatsApp marketing funnels that engage leads instantly, recover abandoned revenue, and generate consistent repeat purchases on autopilot.',
  problem: 'Most businesses rely solely on paid acquisition and neglect lead nurturing. Inbound leads grow cold within hours, abandoned checkouts are left unrecovered, and manual WhatsApp messaging is impossible to scale across hundreds of prospects.',
  solution: 'We design and deploy automated lifecycle marketing systems. By integrating official WhatsApp Cloud API and Klaviyo/HubSpot email infrastructure, we deliver personalized sub-second messages, segmented broadcast campaigns, and automated sales sequences that nurture leads into loyal buyers.',
  benefits: [
    'Official WhatsApp Cloud API setup with verified green tick brand guidance',
    'Automated high-converting WhatsApp workflows: Welcome flows, abandoned checkout recovery, and post-purchase sequences',
    'Full email marketing infrastructure setup in Klaviyo, HubSpot, or Brevo',
    'Sub-second automated lead follow-up triggered from web forms, Facebook Ads, and landing pages',
    'Behavioral customer segmentation based on purchase frequency, order value, and engagement',
    'Bi-directional CRM synchronization with Supabase, HubSpot, and custom databases',
  ],
  stats: [
    ['98%', 'WhatsApp Open Rate'],
    ['< 1s', 'Automated Response Time'],
    ['25-40%', 'Revenue From Retention'],
    ['4.8x', 'Average Email & WA ROI'],
  ],
  faqs: [
    {
      q: 'Is WhatsApp marketing compliant with Meta policies?',
      a: 'Yes. We deploy exclusively via the official Meta WhatsApp Business Cloud API with pre-approved opt-in templates, ensuring 100% compliance, maximum delivery rates, and zero risk of phone number bans.'
    },
    {
      q: 'Which email marketing platforms do you integrate with?',
      a: 'We work primarily with Klaviyo, HubSpot, ActiveCampaign, and Brevo, integrating them seamlessly with Shopify, WooCommerce, or custom web platforms.'
    },
    {
      q: 'How does automated abandoned cart recovery work?',
      a: 'When an inquiry or checkout is abandoned, an automated personalized WhatsApp message with a one-click checkout or booking link triggers within 15 minutes, recovering up to 30% of lost transactions.'
    },
    {
      q: 'Can our sales team step in to chat with WhatsApp leads manually?',
      a: 'Yes. Automated sequences handle the initial instant response and qualification, and your team can view all conversations and take over live chat anytime from a unified team inbox.'
    }
  ],
  cta: 'Automate My Revenue Funnels',
};

const aiAutomationData: ServiceData = {
  title: 'AI & Lead Automation',
  h1: 'AI & Lead Automation',
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
  h1: 'Social Media Management',
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
  h1: 'Web Design & Technical SEO',
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
        title={`${s.title} | Social Ninja's`} 
        description={s.hero} 
        service={{
          name: s.title,
          description: s.hero,
          providerName: "Social Ninja's"
        }}
        faq={s.faqs}
      />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, width: '100%', boxRendering: 'border-box' } as React.CSSProperties}>
          
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
