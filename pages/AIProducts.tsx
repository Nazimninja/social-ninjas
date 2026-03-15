import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Bot, Star } from 'lucide-react';
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
    id: 'content-studio',
    badge: '🟢 Live',
    icon: '⚡',
    name: 'AI Content Studio',
    tagline: 'Your brand\'s always-on content team.',
    desc: 'Research what\'s trending in your niche today, then write every caption, script, carousel and hashtag set — platform-native, brand-specific, in 60 seconds. Used by 150+ brands.',
    color: '#5ba4f5',
    href: '/#/app/content-studio?plan=trial',
    hrefLabel: 'Try 3 Posts Free →',
    secondary: '/services',
    secondaryLabel: 'See Agency Plans',
    stats: [['150+','Active Brands'], ['7','Platforms'], ['2.4M+','Posts Generated'], ['60s','Per Generate']],
    features: [
      'Live web trend research before every generation',
      'Word-for-word Reel and YouTube Short scripts',
      'Platform-native captions — different for every platform',
      'Carousel slide copy ready to paste into Canva',
      'Niche hashtag strategy — never generic, never repeated',
      'Thread writer for Twitter/X and Threads',
      'Step-by-step posting checklist with best time',
    ],
    plans: [
      { name: 'Starter', price: '₹2,999', period: '/mo', posts: '15 posts', platforms: '2 platforms' },
      { name: 'Growth',  price: '₹5,499', period: '/mo', posts: '25 posts', platforms: '4 platforms', popular: true },
      { name: 'Pro',     price: '₹8,999', period: '/mo', posts: 'Unlimited', platforms: 'All 7' },
    ],
  },
  {
    id: 'ai-sales-agent',
    badge: '🔜 Coming Soon',
    icon: '🤖',
    name: 'AI Sales Agent',
    tagline: 'Your 24/7 sales team that never sleeps.',
    desc: 'Deploy an intelligent agent that qualifies every inbound lead, books calls directly into your calendar, and follows up automatically — in under 1 second, around the clock.',
    color: '#9b8ef0',
    href: '/contact',
    hrefLabel: 'Join Waitlist →',
    stats: [['0.8s','Avg Response'], ['24/7','Always On'], ['3×','Conversion Lift'], ['7-10','Days to Deploy']],
    features: [
      'Instant lead qualification using custom scoring',
      'Natural language conversation — not robotic scripts',
      'Direct calendar booking for qualified leads',
      'Automated follow-up sequences (email + SMS)',
      'CRM integration — all activity logged automatically',
      'Full conversation analytics and weekly reports',
    ],
  },
  {
    id: 'ad-copy-generator',
    badge: '🔜 Coming Soon',
    icon: '🎯',
    name: 'AI Ad Copy Generator',
    tagline: 'High-converting ad copy in seconds.',
    desc: 'Generate Meta and Google ad copy that converts. Headline variations, body copy, CTAs — all split-test-ready and built on proven performance frameworks.',
    color: '#2fcf8e',
    href: '/contact',
    hrefLabel: 'Join Waitlist →',
    stats: [['A/B','Test Ready'], ['Meta+Google','Platforms'], ['∞','Variations'], ['DM','or Feed']],
    features: [
      'Meta and Google Ads copy generation',
      'Multiple headline + body combinations per brief',
      'Scroll-stopping hooks based on psychology frameworks',
      'CTA variations optimised for objective',
      'Brand voice preservation across all variations',
    ],
  },
  {
    id: 'reporting-assistant',
    badge: '🔜 Coming Soon',
    icon: '📊',
    name: 'AI Reporting Assistant',
    tagline: 'Board-ready reports. Zero effort.',
    desc: 'Connect your ad accounts and get AI-generated weekly insights — what worked, what didn\'t, and exactly what to do next. No more manual reporting.',
    color: '#e8b86d',
    href: '/contact',
    hrefLabel: 'Join Waitlist →',
    stats: [['Weekly','Auto Reports'], ['Meta+Google','Data Pull'], ['AI','Insights'], ['1-Click','Export']],
    features: [
      'Automatic weekly performance reports',
      'Plain-English AI analysis — no jargon',
      'Anomaly detection — flags issues before they cost money',
      'Competitor benchmarking data included',
      'One-click PDF export for client sharing',
    ],
  },
];

const AIProducts: React.FC = () => {
  useReveal();

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="AI Products | Social Ninja's — Built for Brands That Scale"
        description="AI-powered products for modern marketing teams. Content Studio, AI Sales Agent, Ad Copy Generator, Reporting Assistant. Start free."
        keywords="AI marketing tools, AI content generator, AI sales agent, ad copy AI, marketing automation tools India"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}><Zap size={12} /> AI Product Suite</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(40px,6.5vw,82px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
            Marketing tools built<br />
            <span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for how you work in 2026.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 560, margin: '0 auto 40px' }}>
            A growing suite of AI-powered tools that replace the repetitive work in your marketing stack — so you can focus on strategy and growth.
          </p>
          <div className="reveal d3" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#/app/content-studio?plan=trial"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>⚡ Try Content Studio Free</button></a>
            <Link to="/contact"><button className="btn-ghost" style={{ fontSize: 15 }}>Join Product Waitlist →</button></Link>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', display: 'flex', flexDirection: 'column', gap: 80, position: 'relative', zIndex: 1 }}>
        {products.map((p, i) => (
          <div key={p.id} id={p.id} className="product-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Left — product info */}
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}14`, border: `1px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, padding: '4px 11px', borderRadius: 50, background: p.badge.includes('Live') ? 'rgba(47,207,142,0.12)' : 'rgba(255,255,255,0.06)', border: p.badge.includes('Live') ? '1px solid rgba(47,207,142,0.25)' : '1px solid rgba(255,255,255,0.1)', color: p.badge.includes('Live') ? '#2fcf8e' : 'rgba(255,255,255,0.5)' }}>
                  {p.badge}
                </div>
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.06, color: 'rgba(255,255,255,0.97)', marginBottom: 10 }}>{p.name}</h2>
              <div style={{ fontSize: 16, fontWeight: 400, color: p.color, marginBottom: 16, letterSpacing: '-0.2px' }}>{p.tagline}</div>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, marginBottom: 28, maxWidth: 460 }}>{p.desc}</p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 32 }}>
                {p.stats.map(([n,l]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 13, padding: '14px 12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 18, fontWeight: 700, color: p.color, letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4, letterSpacing: '0.04em' }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={p.href}><button className="btn-primary" style={{ fontSize: 14, padding: '13px 24px', background: `linear-gradient(135deg,${p.color}cc,${p.color})` }}>{p.hrefLabel}</button></a>
                {p.secondary && <Link to={p.secondary}><button className="btn-ghost" style={{ fontSize: 14 }}>{p.secondaryLabel}</button></Link>}
              </div>
            </div>

            {/* Right — features + pricing */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div className="glass-card" style={{ borderRadius: 22, padding: 28, borderColor: `${p.color}20` }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.color, marginBottom: 18 }}>What's included</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 'plans' in p ? 28 : 0 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.68)', fontWeight: 400 }}>
                      <CheckCircle2 size={14} color={p.color} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                    </div>
                  ))}
                </div>

                {/* Pricing mini table for live products */}
                {'plans' in p && p.plans && (
                  <>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '24px 0' }} />
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Pricing</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.plans.map((pl: any) => (
                        <div key={pl.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 12, background: pl.popular ? `rgba(91,164,245,0.1)` : 'rgba(255,255,255,0.04)', border: pl.popular ? '1px solid rgba(91,164,245,0.25)' : '1px solid rgba(255,255,255,0.07)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: pl.popular ? 600 : 400, color: pl.popular ? '#5ba4f5' : 'rgba(255,255,255,0.75)' }}>{pl.name}</span>
                            {pl.popular && <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(91,164,245,0.15)', border: '1px solid rgba(91,164,245,0.25)', borderRadius: 20, padding: '2px 7px', color: '#5ba4f5', letterSpacing: '0.06em' }}>POPULAR</span>}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{pl.posts} · {pl.platforms}</span>
                            <span style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 18, fontWeight: 700, color: pl.popular ? '#5ba4f5' : 'rgba(255,255,255,0.88)', letterSpacing: '-0.5px' }}>{pl.price}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{pl.period}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 14, textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>Try 3 posts free · No card required</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 26, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.35),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.06 }}>
            Want early access to new products?
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Join the waitlist and be first to know when AI Sales Agent, Ad Copy Generator and Reporting Assistant launch.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Join Waitlist →</button></Link>
            <a href="/#/app/content-studio?plan=trial"><button className="btn-ghost" style={{ fontSize: 15 }}>Try Content Studio Free</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.product-grid{grid-template-columns:1fr!important;gap:32px!important;} .product-grid > div{order:unset!important;}}
        @media(max-width:640px){.product-grid{gap:24px!important;}}
      `}</style>
    </div>
  );
};

export default AIProducts;
