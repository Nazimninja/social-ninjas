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

const services = [
  { id: 'ai-automation', icon: '🤖', title: 'AI & Automation', color: '#5ba4f5', sub: 'Save Time. Never Miss a Lead.', desc: 'We set up AI that talks to your leads the moment they reach out — 24 hours a day, 7 days a week. It answers questions, qualifies them, and books meetings into your calendar while you sleep.', features: ['AI chatbot live on your website or WhatsApp', 'Replies to leads in under 1 second', 'Qualifies leads and books calls automatically', 'Follows up by email and SMS — no manual work', 'Connects to your CRM so nothing gets lost'], outcome: '14× faster lead response' },
  { id: 'performance-marketing', icon: '🚀', title: 'Performance Marketing', color: '#818cf8', sub: 'More Sales. Better ROI.', desc: 'We run paid ads on Meta and Google that bring in real customers, not just clicks. Every decision is based on data — we test, learn, and double down on what works until your returns keep growing.', features: ['Meta (Facebook & Instagram) ad campaigns', 'Google Search and Shopping ads', 'Creative testing to find what converts', 'Audience targeting based on real purchase intent', 'Weekly reports in plain English'], outcome: 'Average 4.5× ROAS across clients' },
  { id: 'creative-studio', icon: '🎬', title: 'Creative Studio', color: '#34d399', sub: 'Content That Stops the Scroll.', desc: 'We make videos, graphics and ad creatives that actually get people to stop scrolling and take action. Every piece of content is built around performance data — not just what looks nice.', features: ['Short-form video and Reels production', 'Ad creatives for Meta and Google', 'Carousel and story designs', 'Landing page design and copy', 'UGC-style content for authentic reach'], outcome: '3× engagement vs generic content' },
  { id: 'social-media', icon: '📱', title: 'Social Media Management', color: '#f59e0b', sub: 'Grow Your Following. Build Trust.', desc: 'We handle your social media completely — from planning and writing every post to replying to comments and tracking what\'s working. You stay focused on your business. We keep your audience growing.', features: ['Content planning and posting across all platforms', 'Captions and hashtags written for each platform', 'Community management and comment replies', 'Monthly performance reports with real insights', 'Trend research to keep content fresh every week'], outcome: '2× organic reach in 90 days' },
  { id: 'web-seo', icon: '🌐', title: 'Web & SEO', color: '#ec4899', sub: 'Get Found. Get Customers.', desc: 'We build websites that convert visitors into leads, and use SEO strategies to get you showing up when people search for what you offer. Fast, clean, and built to sell.', features: ['Website design focused on converting visitors', 'Technical SEO so Google can find you', 'Content strategy to rank for the right keywords', 'Page speed optimisation for better rankings', 'Lead generation landing pages that convert'], outcome: 'Top-3 Google ranking in 6 months' },
  { id: 'growth-consulting', icon: '📊', title: 'Growth Consulting', color: '#a78bfa', sub: 'Strategy That Actually Makes Sense.', desc: 'Sometimes you just need someone to look at your business with fresh eyes and tell you what\'s working, what\'s wasting money, and what to do next. That\'s what our consulting is.', features: ['Full marketing audit — find what\'s leaking', 'Build a clear 90-day growth plan', 'Revenue funnel review and fixes', 'Team training on tools and strategy', 'Monthly strategy sessions with your team'], outcome: 'Average 40% revenue lift in Q1' },
];

const Services: React.FC = () => {
  useReveal();
  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO title="Services | Social Ninja's" description="AI automation, paid ads, content creation, social media management and SEO — everything your brand needs to grow. Book a free strategy call." keywords="performance marketing India, AI automation, social media management, growth agency" />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>What We Do</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 1.02, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
            Everything your brand needs<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to get more customers.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.72, maxWidth: 560, margin: '0 auto 40px' }}>
            We don't just run ads or post content. We build marketing systems that keep working — bringing in leads, converting sales, and growing your revenue month after month.
          </p>
          <div className="reveal d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 30px' }}>Book a Free Strategy Call</button></Link>
            <a href="/ai-products/content-studio"><button className="btn-ghost" style={{ fontSize: 15 }}>⚡ Try AI Studio Free</button></a>
          </div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="two-cols">
          {services.map((s, i) => (
            <div key={i} className={`glass-card reveal d${(i%3)+1}`} style={{ padding: 36, borderRadius: 24, borderTop: `2px solid ${s.color}30` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22, gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 15, background: `${s.color}12`, border: `1px solid ${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: s.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{s.sub}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.3px', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.2 }}>{s.title}</h3>
                  </div>
                </div>
                <div style={{ fontSize: 10, padding: '4px 11px', borderRadius: 50, background: `${s.color}10`, border: `1px solid ${s.color}20`, color: s.color, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.02em' }}>{s.outcome}</div>
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.68, marginBottom: 22 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.62)', fontWeight: 400 }}>
                    <CheckCircle2 size={14} color={s.color} strokeWidth={2} />{f}
                  </div>
                ))}
              </div>
              <Link to={`/services/${s.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: s.color }}>
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '80px 28px', background: 'rgba(4,8,18,0.5)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>How We Work</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-1.5px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.1 }}>
              From your first call to<br /><span style={{ color: '#5ba4f5' }}>real results in 30 days.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="four-cols">
            {[
              { n: '01', t: 'Free Strategy Call', d: 'We spend 30 minutes understanding your business, your goals, and what\'s not working right now.' },
              { n: '02', t: 'We Audit Everything', d: 'We look at your ads, your website, your content — and find exactly where money is being wasted.' },
              { n: '03', t: 'Build Your Plan', d: 'You get a clear 90-day growth plan with specific targets, timelines, and who\'s responsible for what.' },
              { n: '04', t: 'Launch & Improve', d: 'We go live fast, track everything, and make it better every single week based on real data.' },
            ].map((p, i) => (
              <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 28, borderRadius: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 30, fontWeight: 500, color: 'rgba(91,164,245,0.22)', lineHeight: 1, marginBottom: 16, letterSpacing: '-1px' }}>{p.n}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', marginBottom: 8, fontFamily: "'DM Sans',sans-serif" }}>{p.t}</div>
                <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.06, marginBottom: 14, color: 'rgba(255,255,255,0.96)' }}>
            Ready to build something<br /><span style={{ color: '#5ba4f5' }}>that actually works?</span>
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Book a free 30-minute strategy call. No pressure, no pitch deck. Just an honest look at your marketing and what we'd do differently.
          </p>
          <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>Book My Free Call →</button></Link>
        </div>
      </div>

      <style>{`@media(max-width:900px){.two-cols,.four-cols{grid-template-columns:1fr!important;}} @media(max-width:640px){.two-cols,.four-cols{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};
export default Services;
