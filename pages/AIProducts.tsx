import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

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

const products = [
  {
    id: 'content-studio', badge: '🟢 Live Now', icon: '⚡', name: 'AI Content Studio',
    tagline: 'Your whole week of content — written in 60 seconds.',
    desc: 'Tell the AI about your brand once. Every week it looks up what\'s trending in your niche, then writes your captions, Reel scripts, carousel slides, and hashtags. All platform-specific. All ready to copy and post.',
    color: '#5ba4f5',
    tryLink: '/standalone-landing/',
    learnLink: '/standalone-landing/',
    stats: [['150+','Brands Using It'], ['2.4M+','Posts Generated'], ['7','Platforms'], ['60s','Per Generate']],
    features: ['Researches live trends before writing — every time','Word-for-word scripts for Reels and YouTube Shorts','Captions written specifically for each platform','Carousel slide copy — paste straight into Canva','Real hashtag research — never generic or repeated','Thread writer for Twitter/X and Threads','Posting checklist with the best time to post'],
    plans: [
      { name: 'Starter', price: '₹2,999', note: '15 posts/mo · 2 platforms' },
      { name: 'Growth',  price: '₹5,499', note: '25 posts/mo · 4 platforms', popular: true },
      { name: 'Pro',     price: '₹8,999', note: 'Unlimited posts · All 7 platforms' },
    ],
  },
  {
    id: 'ai-sales-agent', badge: '🔜 Coming Soon', icon: '🤖', name: 'AI Sales Agent',
    tagline: 'Never miss a lead again. Even at 3am.',
    desc: 'An AI that replies to every new lead in under 1 second — any time of day or night. It answers their questions, figures out if they\'re a good fit, and books them straight into your calendar. Your sales team only talks to people who are ready to buy.',
    color: '#9b8ef0',
    tryLink: '/contact',
    learnLink: '/ai-products/ai-sales-agent',
    stats: [['0.8s','Avg Reply Time'], ['24/7','Never Offline'], ['3×','More Conversions'], ['7–10','Days to Launch']],
    features: ['Responds to leads instantly — before your competitors','Qualifies each lead with smart questions','Books meetings directly into your calendar','Sends follow-up emails and SMS automatically','Logs everything to your CRM — no manual work','Full weekly report of all conversations'],
  },
  {
    id: 'ad-copy-generator', badge: '🔜 Coming Soon', icon: '🎯', name: 'AI Ad Copy Generator',
    tagline: 'High-converting ad copy in seconds, not days.',
    desc: 'Stop spending hours writing Facebook and Google ads. Describe what you\'re selling, and the AI writes multiple versions of your headline, body copy, and CTA — all based on proven frameworks that actually convert. Test 10 variations before breakfast.',
    color: '#2fcf8e',
    tryLink: '/contact',
    learnLink: '/ai-products/ad-copy-generator',
    stats: [['Meta+Google','Both Platforms'], ['∞','Copy Variations'], ['A/B','Test Ready'], ['Seconds','Not Days']],
    features: ['Headlines and body copy for Meta and Google ads','Multiple variations ready to A/B test','Hooks based on psychology frameworks that convert','CTA options tuned to your campaign goal','Keeps your brand voice consistent across all ads'],
  },
  {
    id: 'reporting-assistant', badge: '🔜 Coming Soon', icon: '📊', name: 'AI Reporting Assistant',
    tagline: 'Know exactly what\'s working — without the spreadsheets.',
    desc: 'Connect your ad accounts and every week the AI sends you a plain-English summary of what worked, what didn\'t, and what to do about it. No more spending Mondays building reports — just clear answers and next steps.',
    color: '#e8b86d',
    tryLink: '/contact',
    learnLink: '/ai-products/reporting-assistant',
    stats: [['Weekly','Auto Reports'], ['Meta+Google','Data Connected'], ['Plain English','No Jargon'], ['1-Click','PDF Export']],
    features: ['Automatic weekly performance summaries','Written in plain English — no marketing jargon','Spots problems before they cost you more money','Compares your performance to industry benchmarks','Export as PDF to share with your team or clients'],
  },
];

const AIProducts: React.FC = () => {
  useReveal();
  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="AI Products | Social Ninja's"
        description="AI tools built for brands that want to grow — Content Studio, AI Sales Agent, Ad Copy Generator, Reporting Assistant. Try free."
        keywords="AI content generator India, AI marketing tools, AI sales agent, ad copy AI, marketing automation, AI social media tool, content studio AI, AI tools for brands, AI SaaS India"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>AI Products</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
            Tools that do the work<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>you don't have time for.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 560, margin: '0 auto 40px' }}>
            We're building a suite of AI tools that handle the repetitive parts of marketing — so you can spend your time on the things that actually need you.
          </p>
          <div className="reveal d3" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/standalone-landing/"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>⚡ Try Content Studio Free</button></a>
            <Link to="/contact"><button className="btn-ghost" style={{ fontSize: 15 }}>Join Waitlist for New Tools →</button></Link>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', display: 'flex', flexDirection: 'column', gap: 72, position: 'relative', zIndex: 1 }}>
        {products.map((p, i) => (
          <div key={p.id} className="product-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}14`, border: `1px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, background: p.badge.includes('Live') ? 'rgba(47,207,142,0.12)' : 'rgba(255,255,255,0.06)', border: p.badge.includes('Live') ? '1px solid rgba(47,207,142,0.25)' : '1px solid rgba(255,255,255,0.1)', color: p.badge.includes('Live') ? '#2fcf8e' : 'rgba(255,255,255,0.5)' }}>{p.badge}</div>
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.06, color: 'rgba(255,255,255,0.97)', marginBottom: 8 }}>{p.name}</h2>
              <div style={{ fontSize: 16, fontWeight: 500, color: p.color, marginBottom: 16, letterSpacing: '-0.2px' }}>{p.tagline}</div>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, marginBottom: 28, maxWidth: 460 }}>{p.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 32 }}>
                {p.stats.map(([n,l]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 13, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 17, fontWeight: 700, color: p.color, letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4, lineHeight: 1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={p.tryLink}><button className="btn-primary" style={{ fontSize: 14, padding: '13px 24px', background: `linear-gradient(135deg,${p.color}cc,${p.color})` }}>{p.badge.includes('Live') ? '⚡ Try Free →' : 'Join Waitlist →'}</button></a>
                {p.learnLink.startsWith('/standalone-landing/') ? (
                  <a href={p.learnLink}><button className="btn-ghost" style={{ fontSize: 14 }}>See Full Details</button></a>
                ) : (
                  <Link to={p.learnLink}><button className="btn-ghost" style={{ fontSize: 14 }}>See Full Details</button></Link>
                )}
              </div>
            </div>
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div className="glass-card" style={{ borderRadius: 22, padding: 28, borderColor: `${p.color}20` }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.color, marginBottom: 18 }}>What's included</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: p.plans ? 28 : 0 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.68)' }}>
                      <CheckCircle2 size={14} color={p.color} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                    </div>
                  ))}
                </div>
                {p.plans && (
                  <>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '24px 0' }} />
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Pricing</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.plans.map((pl: any) => (
                        <div key={pl.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, background: pl.popular ? 'rgba(91,164,245,0.1)' : 'rgba(255,255,255,0.04)', border: pl.popular ? '1px solid rgba(91,164,245,0.25)' : '1px solid rgba(255,255,255,0.07)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: pl.popular ? 700 : 400, color: pl.popular ? '#5ba4f5' : 'rgba(255,255,255,0.75)' }}>{pl.name}</span>
                            {pl.popular && <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(91,164,245,0.15)', border: '1px solid rgba(91,164,245,0.25)', borderRadius: 20, padding: '2px 7px', color: '#5ba4f5' }}>POPULAR</span>}
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 18, fontWeight: 700, color: pl.popular ? '#5ba4f5' : 'rgba(255,255,255,0.88)', letterSpacing: '-0.5px' }}>{pl.price}<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{pl.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 14, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>First 3 posts completely free · No card needed</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 26, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.35),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 700, letterSpacing: '-2px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.06 }}>
            Want to know when new<br />tools launch?
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Join the waitlist and be the first to get access when AI Sales Agent, Ad Copy Generator and Reporting Assistant go live.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Join the Waitlist →</button></Link>
            <a href="/standalone-landing/"><button className="btn-ghost" style={{ fontSize: 15 }}>⚡ Try Content Studio Free</button></a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.product-grid{grid-template-columns:1fr!important;gap:32px!important;} .product-grid>div{order:unset!important;}}`}</style>
    </div>
  );
};
export default AIProducts;
