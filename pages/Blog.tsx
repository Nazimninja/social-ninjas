import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag, Rss, TrendingUp, Bot, BarChart3, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

/* ── Reveal hook ── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Static blog posts ── */
const POSTS = [
  {
    id: 'ai-lead-response',
    category: 'AI & Automation',
    color: '#5ba4f5',
    icon: <Bot size={18} />,
    readTime: '5 min',
    date: 'Mar 8, 2026',
    title: 'Why 70% of Your Leads Go Cold — And How AI Fixes It in 60 Seconds',
    excerpt: 'The average company takes 47 hours to respond to a lead. Your competitor responds in 0.8 seconds. Here\'s the math behind why that\'s costing you millions.',
    stat: { value: '47hrs', label: 'Avg response time across industries' },
    sections: [
      {
        heading: 'The $1M Problem Nobody Talks About',
        body: 'Every day, leads fill out your form, click your ad, or DM your page. Then they wait. And while they wait, they Google your competitors. Research from Harvard Business Review is brutal: companies who respond within 1 hour are 7× more likely to qualify a lead than those who respond after 2 hours — and 60× more likely than those who wait 24+ hours.',
        highlight: '60× more likely to qualify — within 1 hour vs 24 hours.',
        highlightColor: '#5ba4f5',
      },
      {
        heading: 'The Human Bandwidth Problem',
        body: 'Your sales team is excellent. But they\'re human. They have lunch breaks, client calls, and off-days. Most leads arrive outside business hours. Most follow-up happens during business hours. The gap between those two facts is where revenue dies.',
        list: ['68% of leads submit forms outside 9–5', '83% expect a response within 10 minutes', 'Average actual response: 47 hours', 'Revenue lost in that gap: significant'],
      },
      {
        heading: 'What an AI Agent Actually Does',
        body: 'An AI sales agent sits on every entry point — your website, WhatsApp, Instagram DM, Facebook ad — and responds instantly, 24/7. But it doesn\'t just say "thanks for your message." It qualifies. It asks the right questions. It determines budget, timeline, intent. And for qualified leads, it books directly into your sales team\'s calendar.',
        highlight: 'One client: response time 47hrs → 0.8s. Close rate: 8% → 21%.',
        highlightColor: '#2fcf8e',
      },
    ],
    cta: 'Deploy AI in 7 Days →',
    ctaHref: '/contact',
  },
  {
    id: 'posting-frequency-myth',
    category: 'Content Strategy',
    color: '#2fcf8e',
    icon: <TrendingUp size={18} />,
    readTime: '4 min',
    date: 'Mar 1, 2026',
    title: 'The Posting Frequency Myth: Why Posting More Is Killing Your Reach',
    excerpt: 'Most brands post 7× a week and get 0.3% engagement. The top 10% post 3× a week and dominate. The difference isn\'t effort — it\'s intelligence.',
    stat: { value: '3.2×', label: 'Posts/week by top 10% of accounts' },
    sections: [
      {
        heading: 'How Algorithms Actually Work in 2026',
        body: 'Every platform — Instagram, LinkedIn, YouTube, TikTok — runs the same core logic: show content that people engage with deeply to more people. They track save rate, share rate, watch-through percentage, and comment quality. When you post mediocre content to "stay consistent," you train the algorithm that your content isn\'t worth amplifying. Your reach shrinks quietly — and you don\'t notice until it\'s too late.',
        highlight: 'Posting mediocre content consistently = teaching the algorithm to suppress you.',
        highlightColor: '#2fcf8e',
      },
      {
        heading: 'The Trend Timing Window',
        body: 'There\'s a 48-72 hour window where posting about a trending topic gets massive organic lift. Post before the window: too early, nobody searches it. Post inside it: algorithm amplifies you because you\'re relevant. Post after: 60% less reach. This window requires live research — not a content calendar built 4 weeks ago.',
        list: ['48h before peak: low search volume', '0–48h during peak: maximum reach', '48h after peak: −60% reach vs peak', 'AI tools scan this in real-time'],
      },
      {
        heading: 'What Actually Works: The 3×/week System',
        body: 'Post 3 high-quality, trend-timed pieces per week instead of 7 generic ones. Each piece should use a platform-native hook (Instagram hooks are different from LinkedIn hooks), reference something that\'s happening this week in your niche, and never repeat an angle you\'ve used before. Our AI Content Studio does the live research before every generation — so every post is timed to trend momentum.',
        highlight: 'Quality + timing beats volume every single time. The data is not ambiguous.',
        highlightColor: '#5ba4f5',
      },
    ],
    cta: 'Try 3 AI Posts Free →',
    ctaHref: '/#/app/content-studio?plan=trial',
  },
  {
    id: 'roas-myth',
    category: 'Performance Marketing',
    color: '#9b8ef0',
    icon: <BarChart3 size={18} />,
    readTime: '6 min',
    date: 'Feb 22, 2026',
    title: 'ROAS Is a Vanity Metric. Here\'s the Framework That Actually Tells You If Ads Are Working.',
    excerpt: 'A 4× ROAS sounds incredible. But if your margins are 25%, you\'re losing money on every sale. Here\'s the metric stack that actually predicts business health.',
    stat: { value: '4×', label: 'ROAS that actually loses money (25% margins)' },
    sections: [
      {
        heading: 'The ROAS Illusion',
        body: 'Your agency reports 4× ROAS. You feel good. But run the actual math: ₹1L spend → ₹4L revenue → ₹2.4L COGS (60%) → ₹1.6L gross profit → minus ₹1L ad spend → ₹60k net. You spent ₹1 lakh to make ₹60k. That\'s not 400% return — it\'s 60%. Agencies report ROAS because it looks good. It rarely tells you if the campaign is actually profitable.',
        highlight: '4× ROAS with 60% COGS = 60% net return. Not 400%.',
        highlightColor: '#9b8ef0',
      },
      {
        heading: 'The Metrics That Actually Matter',
        body: 'Three numbers should run your paid media decisions:',
        list: [
          'MER (Marketing Efficiency Ratio) — Total revenue ÷ total marketing spend across all channels',
          'nCAC (New Customer Acquisition Cost) — Cost to acquire one net-new customer',
          'LTV:CAC Ratio — Should be 3:1 minimum, 5:1 means you can scale aggressively',
          'Contribution Margin per Order — Revenue minus COGS minus shipping minus ad cost',
        ],
      },
      {
        heading: 'Building a Real Performance Dashboard',
        body: 'The brands that dominate paid media connect three data streams: their ad platform data (Meta, Google), their backend revenue data (Shopify, CRM), and their actual margins. When these three are live in one dashboard, you can see the real number — and make decisions that grow the business instead of just the reporting slide. We build these dashboards for every client in the first 2 weeks.',
        highlight: 'The brands that win ads aren\'t the ones with highest ROAS. They know their real numbers.',
        highlightColor: '#e8b86d',
      },
    ],
    cta: 'Get a Free Revenue Audit →',
    ctaHref: '/contact',
  },
];

const categoryColors: Record<string, string> = {
  'AI & Automation': '#5ba4f5',
  'Content Strategy': '#2fcf8e',
  'Performance Marketing': '#9b8ef0',
};

/* ── Interactive Blog Card Component ── */
const BlogCard: React.FC<{ post: typeof POSTS[0]; index: number; featured?: boolean }> = ({ post, index, featured }) => {
  const [expanded, setExpanded] = useState(featured ? true : false);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!expanded) return;
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActiveSection(s => (s + 1) % post.sections.length);
          return 0;
        }
        return p + 1;
      });
    }, 60);
    return () => clearInterval(timerRef.current);
  }, [expanded, activeSection, post.sections.length]);

  const sec = post.sections[activeSection];

  return (
    <div
      className={`glass-card reveal d${index + 1}`}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        border: expanded ? `1px solid ${post.color}30` : '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s',
        boxShadow: expanded ? `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${post.color}18` : undefined,
      }}
    >
      {/* Header — always visible */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          padding: '28px 30px 24px',
          cursor: 'pointer',
          background: expanded ? `linear-gradient(135deg, ${post.color}10, transparent)` : 'transparent',
          transition: 'background 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {/* Category + meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${post.color}14`, border: `1px solid ${post.color}28`, borderRadius: 50, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: post.color }}>
                {post.icon}{post.category}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>
                <Clock size={11} />{post.readTime} read
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)' }}>{post.date}</div>
            </div>
            {/* Title */}
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              fontSize: featured ? 'clamp(20px,2.8vw,28px)' : 'clamp(17px,2.2vw,22px)',
              fontWeight: 800, letterSpacing: '-0.8px', lineHeight: 1.18,
              color: 'rgba(255,255,255,0.96)', marginBottom: 12,
            }}>{post.title}</h2>
            {/* Excerpt */}
            <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65 }}>{post.excerpt}</p>
          </div>
          {/* Stat badge */}
          <div style={{ flexShrink: 0, textAlign: 'center', background: `${post.color}10`, border: `1px solid ${post.color}22`, borderRadius: 16, padding: '14px 18px', minWidth: 80 }}>
            <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 22, fontWeight: 800, color: post.color, letterSpacing: '-1px', lineHeight: 1 }}>{post.stat.value}</div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', marginTop: 5, lineHeight: 1.4 }}>{post.stat.label}</div>
          </div>
        </div>

        {/* Expand toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: 12.5, fontWeight: 500, color: expanded ? post.color : 'rgba(255,255,255,0.4)', transition: 'color .2s' }}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {expanded ? 'Close' : 'Read full breakdown'}
        </div>
      </div>

      {/* Expandable content */}
      <div style={{
        maxHeight: expanded ? 1000 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ borderTop: `1px solid ${post.color}18`, background: 'rgba(0,0,0,0.2)' }}>

          {/* Section tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {post.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveSection(i); setProgress(0); }}
                style={{
                  flex: 1, minWidth: 100, padding: '12px 16px', border: 'none', cursor: 'pointer',
                  background: activeSection === i ? `${post.color}12` : 'transparent',
                  color: activeSection === i ? post.color : 'rgba(255,255,255,0.38)',
                  fontSize: 12, fontWeight: activeSection === i ? 600 : 400,
                  fontFamily: "'DM Sans',system-ui",
                  borderBottom: `2px solid ${activeSection === i ? post.color : 'transparent'}`,
                  transition: 'all .2s', whiteSpace: 'nowrap',
                }}
              >
                {String(i + 1).padStart(2, '0')} {s.heading.split(':')[0].split('—')[0].trim().substring(0, 20)}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: post.color, transition: 'width 0.1s linear', borderRadius: 2 }} />
          </div>

          {/* Section content */}
          <div style={{ padding: '28px 30px' }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: 14, letterSpacing: '-0.4px' }}>{sec.heading}</h3>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: sec.list || sec.highlight ? 18 : 0 }}>{sec.body}</p>

            {sec.list && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: sec.highlight ? 18 : 0 }}>
                {sec.list.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: '10px 14px' }}>
                    <span style={{ color: post.color, fontWeight: 700, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {sec.highlight && (
              <div style={{ background: `${sec.highlightColor}10`, border: `1px solid ${sec.highlightColor}25`, borderRadius: 13, padding: '14px 18px', borderLeft: `3px solid ${sec.highlightColor}` }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: sec.highlightColor, lineHeight: 1.6, margin: 0 }}>💡 {sec.highlight}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ padding: '0 30px 28px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href={post.ctaHref} style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: `linear-gradient(135deg, ${post.color}cc, ${post.color})`,
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '11px 22px', fontSize: 13.5, fontWeight: 500,
                cursor: 'pointer', fontFamily: "'DM Sans',system-ui",
                boxShadow: `0 6px 20px ${post.color}30`,
                transition: 'all .2s',
              }}>
                {post.cta} <ArrowRight size={14} />
              </button>
            </a>
            <div style={{ display: 'flex', gap: 6, fontSize: 11.5, color: 'rgba(255,255,255,0.3)' }}>
              {post.sections.map((_, i) => (
                <span key={i} style={{ width: i === activeSection ? 20 : 6, height: 6, borderRadius: 3, background: i === activeSection ? post.color : 'rgba(255,255,255,0.18)', transition: 'all .3s', cursor: 'pointer' }} onClick={() => { setActiveSection(i); setProgress(0); }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Blog Page ── */
const Blog: React.FC = () => {
  useReveal();
  const [apiPosts, setApiPosts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/data?resource=blogs')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setApiPosts(d); })
      .catch(() => {});
  }, []);

  const cats = ['All', 'AI & Automation', 'Content Strategy', 'Performance Marketing'];

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="Blog | Social Ninja's — AI, Marketing & Growth Intelligence"
        description="Weekly breakdowns on AI automation, performance marketing, content strategy and social media growth. Real tactics, real numbers."
        keywords="marketing blog India, AI automation guide, social media strategy 2026, performance marketing tips, content creation AI, ROAS optimization, lead generation"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 64, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div className="eyebrow reveal"><Rss size={12} />Intelligence Feed · Weekly</div>
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui,sans-serif", fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 18, color: 'rgba(255,255,255,0.96)' }}>
                Marketing<br />intelligence,<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>no fluff.</span>
              </h1>
              <p className="reveal d2" style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.72, maxWidth: 400, marginBottom: 32 }}>
                Real numbers, real case studies, and the exact frameworks we use to scale brands from ₹5L to ₹50L monthly revenue.
              </p>
              <div className="reveal d3" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {cats.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                    fontFamily: "'DM Sans',system-ui", fontSize: 12.5, fontWeight: activeFilter === cat ? 600 : 400,
                    padding: '7px 16px', borderRadius: 50, cursor: 'pointer', transition: 'all .2s',
                    background: activeFilter === cat ? 'rgba(91,164,245,0.15)' : 'rgba(255,255,255,0.05)',
                    border: activeFilter === cat ? '1px solid rgba(91,164,245,0.35)' : '1px solid rgba(255,255,255,0.09)',
                    color: activeFilter === cat ? '#5ba4f5' : 'rgba(255,255,255,0.5)',
                  }}>{cat}</button>
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="reveal-r d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['3', 'Posts per week'], ['150+', 'Brands scaled'], ['₹40M+', 'Ad spend managed'], ['4.9★', 'Client rating']].map(([n, l]) => (
                <div key={l} className="glass-card" style={{ padding: '22px 18px', textAlign: 'center', borderRadius: 18 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 28, fontWeight: 800, color: '#5ba4f5', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE POSTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 28px 88px', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Latest dispatches — {POSTS.filter(p => activeFilter === 'All' || p.category === activeFilter).length} posts
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Click any post to expand</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {POSTS
            .filter(p => activeFilter === 'All' || p.category === activeFilter)
            .map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} featured={i === 0} />
            ))}
        </div>

        {/* Admin-created posts from API */}
        {apiPosts.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>More from the feed</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="api-grid">
              {apiPosts.map((post: any, i: number) => {
                const col = Object.values(categoryColors)[i % 3] as string;
                return (
                  <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-card" style={{ padding: 24, borderRadius: 18, height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${col}14`, border: `1px solid ${col}28`, borderRadius: 50, padding: '3px 10px', fontSize: 10.5, fontWeight: 600, color: col, marginBottom: 14, width: 'fit-content' }}>
                        <Tag size={9} />{post.category || 'Insights'}
                      </div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.28, marginBottom: 10, letterSpacing: '-0.4px', flex: 1 }}>{post.title}</h3>
                      <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.62 }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 12.5, fontWeight: 500, color: col }}>
                        Read <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.75)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.38),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(22px,4vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 12, color: 'rgba(255,255,255,0.96)', lineHeight: 1.1 }}>
            Want these strategies working for your brand?
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Book a free 30-minute audit and we'll show you exactly where your biggest growth leaks are.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px' }}>Book Free Audit →</button></Link>
            <a href="/#/app/content-studio?plan=trial"><button className="btn-ghost" style={{ fontSize: 14 }}>Try AI Content Free →</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .hero-grid-cols{grid-template-columns:1fr!important;gap:36px!important;} .hero-grid-cols>div:last-child{display:none;} }
        @media(max-width:640px){ .api-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </div>
  );
};

export default Blog;
