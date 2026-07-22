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
  { id: 'ai-automation', icon: '🤖', title: 'AI & Automation', color: '#0065ff', sub: 'Save Time. Never Miss a Lead.', desc: 'We set up AI that talks to your leads the moment they reach out — 24 hours a day, 7 days a week. It answers questions, qualifies them, and books meetings into your calendar while you sleep.', features: ['AI chatbot live on your website or WhatsApp', 'Replies to leads in under 1 second', 'Qualifies leads and books calls automatically', 'Follows up by email and SMS — no manual work', 'Connects to your CRM so nothing gets lost'], outcome: '14× faster lead response' },
  { id: 'performance-marketing', icon: '🚀', title: 'Performance Marketing', color: '#818cf8', sub: 'More Sales. Better ROI.', desc: 'We run paid ads on Meta and Google that bring in real customers, not just clicks. Every decision is based on data — we test, learn, and double down on what works until your returns keep growing.', features: ['Meta (Facebook & Instagram) ad campaigns', 'Google Search and Shopping ads', 'Creative testing to find what converts', 'Audience targeting based on real purchase intent', 'Weekly reports in plain English'], outcome: 'Average 4.5× ROAS across clients' },
  { id: 'creative-studio', icon: '🎬', title: 'Creative Studio', color: '#34d399', sub: 'Content That Stops the Scroll.', desc: 'We make videos, graphics and ad creatives that actually get people to stop scrolling and take action. Every piece of content is built around performance data — not just what looks nice.', features: ['Short-form video and Reels production', 'Ad creatives for Meta and Google', 'Carousel and story designs', 'Landing page design and copy', 'UGC-style content for authentic reach'], outcome: '3× engagement vs generic content' },
  { id: 'social-media', icon: '📱', title: 'Social Media Management', color: '#f59e0b', sub: 'Grow Your Following. Build Trust.', desc: 'We handle your social media completely — from planning and writing every post to replying to comments and tracking what\'s working. You stay focused on your business. We keep your audience growing.', features: ['Content planning and posting across all platforms', 'Captions and hashtags written for each platform', 'Community management and comment replies', 'Monthly performance reports with real insights', 'Trend research to keep content fresh every week'], outcome: '2× organic reach in 90 days' },
  { id: 'web-seo', icon: '🌐', title: 'Web & SEO', color: '#ec4899', sub: 'Get Found. Get Customers.', desc: 'We build websites that convert visitors into leads, and use SEO strategies to get you showing up when people search for what you offer. Fast, clean, and built to sell.', features: ['Website design focused on converting visitors', 'Technical SEO so Google can find you', 'Content strategy to rank for the right keywords', 'Page speed optimisation for better rankings', 'Lead generation landing pages that convert'], outcome: 'Top-3 Google ranking in 6 months' },
  { id: 'growth-consulting', icon: '📊', title: 'Growth Consulting', color: '#a78bfa', sub: 'Strategy That Actually Makes Sense.', desc: 'Sometimes you just need someone to look at your business with fresh eyes and tell you what\'s working, what\'s wasting money, and what to do next. That\'s what our consulting is.', features: ['Full marketing audit — find what\'s leaking', 'Build a clear 90-day growth plan', 'Revenue funnel review and fixes', 'Team training on tools and strategy', 'Monthly strategy sessions with your team'], outcome: 'Average 40% revenue lift in Q1' },
];

const Services: React.FC = () => {
  useReveal();
  return (
    <div className="page-wrap" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      
      <SEO
        title="Services | Social Ninja's"
        description="AI automation, paid ads, content creation, social media management and SEO — everything your brand needs to grow. Book a free strategy call."
        keywords="performance marketing India, AI automation, social media management, growth agency, paid ads India, content creation agency, SEO agency India, digital marketing services, email marketing WhatsApp marketing"
      />

      {/* HERO WITH MESH GLOW & GRID PATTERN */}
      <div className="hero-glow grid-pattern" style={{ position: 'relative', paddingTop: 160, paddingBottom: 100, overflow: 'hidden', borderBottom: '1px solid #ededed' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="pill reveal" style={{ justifyContent: 'center', margin: '0 auto 20px' }}>What We Do</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(44px,6.5vw,84px)', fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 1.02, marginBottom: 24, color: '#141414' }}>
            Everything your brand needs<br /><span style={{ background: 'linear-gradient(135deg,#0065ff,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to get more customers.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(16px,1.8vw,19px)', fontWeight: 300, color: '#666', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 44px' }}>
            We don't just run ads or post content. We build marketing systems that keep working — bringing in leads, converting sales, and growing your revenue month after month.
          </p>
          <div className="reveal d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Book a Free Strategy Call</button></Link>
            <a href="/content-studio"><button className="btn-ghost" style={{ fontSize: 15 }}>⚡ Try AI Studio Free</button></a>
          </div>
        </div>
      </div>

      {/* SERVICES GRID WITH DYNAMIC GLOW CARDS */}
      <div className="section-wrap-white grid-pattern" style={{ borderBottom: '1px solid #ededed' }}>
        <div className="section" style={{ padding: '100px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }} className="two-cols">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`service-card reveal d${(i%3)+1}`} 
                style={{ 
                  '--theme-color': s.color, 
                  '--shadow-color': `${s.color}15` 
                } as React.CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12, position: 'relative', zIndex: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div className="service-icon-box" style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}12`, border: `1px solid ${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 9.5, fontWeight: 700, color: s.color, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{s.sub}</div>
                      <h3 style={{ fontSize: 21, fontWeight: 700, color: '#141414', letterSpacing: '-0.3px', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.2 }}>{s.title}</h3>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, padding: '5px 12px', borderRadius: 50, background: `${s.color}10`, border: `1px solid ${s.color}20`, color: s.color, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.03em' }}>{s.outcome}</div>
                </div>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 24, position: 'relative', zIndex: 3 }}>{s.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, position: 'relative', zIndex: 3 }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#4a4a4a', fontWeight: 400 }}>
                      <CheckCircle2 size={15} color={s.color} strokeWidth={2} style={{ flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
                <Link to={`/services/${s.id}`} style={{ textDecoration: 'none', position: 'relative', zIndex: 3 }}>
                  <div className="service-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700, color: s.color }}>
                    Learn More <ArrowRight size={14} style={{ transition: 'transform 0.2s' }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="section-wrap-alt grid-pattern" style={{ borderBottom: '1px solid #ededed', background: '#fafafa' }}>
        <section className="section" style={{ padding: '100px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="pill reveal" style={{ justifyContent: 'center', margin: '0 auto 20px' }}>How We Work</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#141414', lineHeight: 1.1 }}>
              From your first call to<br /><span style={{ color: '#0065ff' }}>real results in 30 days.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }} className="four-cols">
            {[
              { n: '01', t: 'Free Strategy Call', d: 'We spend 30 minutes understanding your business, your goals, and what\'s not working right now.' },
              { n: '02', t: 'We Audit Everything', d: 'We look at your ads, your website, your content — and find exactly where money is being wasted.' },
              { n: '03', t: 'Build Your Plan', d: 'You get a clear 90-day growth plan with specific targets, timelines, and who\'s responsible for what.' },
              { n: '04', t: 'Launch & Improve', d: 'We go live fast, track everything, and make it better every single week based on real data.' },
            ].map((p, i) => (
              <div key={i} className="step-card reveal d${i+1}">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 32, fontWeight: 700, color: 'rgba(91,164,245,0.25)', lineHeight: 1, marginBottom: 20, letterSpacing: '-1px' }}>{p.n}</div>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: '#141414', marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.t}</div>
                <div style={{ fontSize: 13.5, color: '#666', lineHeight: 1.7 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="section-wrap-white" style={{ background: '#ffffff' }}>
        <section className="section" style={{ padding: '100px 0' }}>
          <div className="reveal" style={{ background: 'linear-gradient(135deg, #ffffff, #fafafa)', border: '1px solid #ededed', borderRadius: 32, padding: '90px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#0065ff,#2fcf8e,transparent)' }} />
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.06, marginBottom: 16, color: '#141414' }}>
              Ready to build something<br /><span style={{ color: '#0065ff' }}>that actually works?</span>
            </h2>
            <p style={{ fontSize: 16.5, color: '#666', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Book a free 30-minute strategy call. No pressure, no pitch deck. Just an honest look at your marketing and what we'd do differently.
            </p>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '16px 40px' }}>Book My Free Call →</button></Link>
          </div>
        </section>
      </div>

      <style>{`
        .hero-glow {
          background: radial-gradient(circle at 75% 25%, rgba(91,164,245,0.07), transparent 600px), 
                      radial-gradient(circle at 25% 75%, rgba(47,207,142,0.05), transparent 600px);
        }
        .grid-pattern {
          background-image: radial-gradient(rgba(0, 0, 0, 0.035) 1.2px, transparent 1.2px);
          background-size: 24px 24px;
        }
        .service-card {
          background: #ffffff;
          border: 1px solid #ededed;
          border-top: 4px solid var(--theme-color);
          border-radius: 24px;
          padding: 36px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.01);
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, var(--shadow-color), transparent 280px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px -12px var(--shadow-color);
          border-color: var(--theme-color);
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-icon-box {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card:hover .service-icon-box {
          transform: scale(1.12) rotate(4deg);
        }
        .service-link {
          transition: gap 0.3s ease;
        }
        .service-card:hover .service-link {
          gap: 12px !important;
        }
        .service-card:hover .service-link svg {
          transform: translateX(4px);
        }
        .step-card {
          background: #ffffff;
          border: 1px solid #ededed;
          border-radius: 20px;
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 12px rgba(0,0,0,0.005);
        }
        .step-card:hover {
          transform: translateY(-5px);
          border-color: rgba(91, 164, 245, 0.3);
          box-shadow: 0 16px 36px rgba(91, 164, 245, 0.05);
        }
        @media(max-width:900px){
          .two-cols, .four-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default Services;
