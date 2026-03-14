import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Clock, ShieldCheck, Users, Trophy, Heart, Plus, Minus, Activity } from 'lucide-react';
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

const About: React.FC = () => {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "How is Social Ninja's different from a traditional agency?", a: "Traditional agencies sell hours and posts. We build revenue infrastructure — combining high-fidelity creative with algorithmic media buying. We sell measurable outcomes: ROAS, CAC, Net Margin. Not deliverables." },
    { q: "Do you work with startups or established brands?", a: "Brands that have achieved product-market fit and are ready to scale. Typically generating $30k–$50k/mo, though we make exceptions for well-funded startups with exceptional unit economics." },
    { q: "What does your pricing structure look like?", a: "A hybrid model: a flat base fee for our premium talent and infrastructure, plus a performance incentive tied to revenue or qualified leads we generate. If we win, you win." },
    { q: "How long does it take to see results?", a: "We launch initial campaigns within 7–10 days of onboarding. Most clients see significant trend reversal in lead quality and CPA within 30–45 days. We operate in 90-day sprints." },
    { q: "Do I own the data and creative assets?", a: "100%. You retain full ownership of your Ad Manager accounts, creative assets, and data. We are building your infrastructure, not ours." },
  ];

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO title="About Social Ninja's | Premium Digital Growth Partner" description="A tactical revenue strike team engineering growth infrastructure for the world's most ambitious brands." keywords="growth agency, performance marketing specialists, brand scaling" />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 88, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: 'rgba(79,158,255,0.08)', border: '1px solid rgba(79,158,255,0.18)', fontSize: 11, fontWeight: 600, color: '#4f9eff', marginBottom: 28, letterSpacing: '0.03em' }}>
                <Activity size={12} style={{ animation: 'pulse 2s infinite' }} /> System Status: Optimal
              </div>
              <h1 className="reveal d1" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(48px,7vw,96px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 0.96, marginBottom: 24, color: 'rgba(255,255,255,0.96)' }}>
                Revenue<br /><em style={{ background: 'linear-gradient(135deg,#4f9eff,#a5c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dominance.</em>
              </h1>
              <p className="reveal d2" style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 480, marginBottom: 36, borderLeft: '2px solid rgba(79,158,255,0.3)', paddingLeft: 20 }}>
                We are the antidote to the bloated, slow-moving agency. A tactical strike team engineering growth infrastructure for the world's most ambitious brands.
              </p>
              <div className="reveal d3" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[['4.8×','Avg ROAS'], ['$40M+','Ad Spend Managed']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-r d2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 320, height: 320, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(79,158,255,0.15)', animation: 'spin 25s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.08)', animation: 'spin 18s linear infinite reverse' }} />
                <div style={{ position: 'absolute', inset: 80, borderRadius: '50%', border: '1px solid rgba(79,158,255,0.08)' }} />
                {[['🌍', 0.2, 0.15, '#4f9eff', '8px'], ['🚀', 0.78, 0.22, '#818cf8', '7px'], ['⚡', 0.15, 0.72, '#34d399', '6px']].map(([ic, lp, tp, c, s], i) => (
                  <div key={i} style={{ position: 'absolute', left: `${Number(lp)*100}%`, top: `${Number(tp)*100}%`, width: 40, height: 40, borderRadius: '50%', background: `radial-gradient(circle, ${c}20, transparent)`, border: `1px solid ${c}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: `0 0 16px ${c}40` }}>{ic}</div>
                ))}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Instrument Serif'", fontSize: 52, fontWeight: 400, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>150<span style={{ color: '#4f9eff' }}>+</span></div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginTop: 4 }}>BRANDS WORLDWIDE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE PROTOCOLS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 28px', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Core Protocols</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, letterSpacing: '-1px', textAlign: 'center', marginBottom: 56, lineHeight: 1.08, color: 'rgba(255,255,255,0.95)' }}>The operating system that <em>drives our decisions.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="three-cols">
          {[
            { icon: BarChart3, title: 'Profit > Popularity', desc: "Vanity metrics are for influencers. We optimise for CAC, LTV, and Net Margin — the numbers that actually appear on your P&L." },
            { icon: Clock,     title: 'Speed as Standard',  desc: "The market penalises slowness. We launch, test, and pivot campaigns faster than your internal team can schedule a meeting." },
            { icon: ShieldCheck, title: 'Extreme Ownership', desc: "No excuses. If the needle isn't moving, we fix it. You retain full ownership of all data and creative assets." },
          ].map((item, i) => (
            <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 32, borderRadius: 22 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(79,158,255,0.07)', border: '1px solid rgba(79,158,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 20px rgba(79,158,255,0.08)' }}>
                <item.icon size={24} color="#4f9eff" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 500, color: 'rgba(255,255,255,0.92)', marginBottom: 10, letterSpacing: '-0.3px', fontFamily: "'DM Sans',sans-serif" }}>{item.title}</h3>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CULTURE */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '88px 28px', position: 'relative', zIndex: 1, background: 'rgba(4,8,18,0.5)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow reveal">Inside The Dojo</div>
              <h2 className="reveal d1" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, letterSpacing: '-1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.08 }}>Culture &amp; People</h2>
              <p className="reveal d2" style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginTop: 12, maxWidth: 420, lineHeight: 1.7 }}>Great systems need great operators. We've built a culture of radical autonomy and high performance.</p>
            </div>
            <Link to="/careers" className="reveal d3"><button className="btn-ghost">Join the Team →</button></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="three-cols">
            {[
              { icon: Users,  title: 'Zero Politics',      desc: 'Best idea wins. We don\'t care about tenure or titles. We care about data and outcomes.' },
              { icon: Trophy, title: 'Meritocracy',        desc: 'Compensation and promotion are tied directly to the value you create, not hours worked.' },
              { icon: Heart,  title: 'Obsessive Growth',   desc: 'We invest heavily in upskilling. If you aren\'t growing 50% YoY personally, you\'re in the wrong place.' },
            ].map((c, i) => (
              <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 32, borderRadius: 22, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <c.icon size={26} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 500, color: 'rgba(255,255,255,0.92)', marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>{c.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '88px 28px', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Briefing Room</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 400, letterSpacing: '-1px', textAlign: 'center', marginBottom: 48, lineHeight: 1.1, color: 'rgba(255,255,255,0.95)' }}>Common <em>tactical inquiries.</em></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="reveal" style={{ background: openFaq === i ? 'rgba(79,158,255,0.06)' : 'rgba(255,255,255,0.04)', border: `1px solid ${openFaq === i ? 'rgba(79,158,255,0.28)' : 'rgba(255,255,255,0.08)'}`, backdropFilter: 'blur(20px)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s', boxShadow: openFaq === i ? '0 0 24px rgba(79,158,255,0.08)' : 'none' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', background: 'none', border: 'none', color: openFaq === i ? '#4f9eff' : 'rgba(255,255,255,0.85)', textAlign: 'left', cursor: 'pointer', fontSize: 14.5, fontWeight: 400, letterSpacing: '-0.1px', fontFamily: "'DM Sans',sans-serif", gap: 14 }}>
                {faq.q}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: openFaq === i ? 'rgba(79,158,255,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${openFaq === i ? 'rgba(79,158,255,0.3)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                  {openFaq === i ? <Minus size={14} color="#4f9eff" /> : <Plus size={14} color="rgba(255,255,255,0.5)" />}
                </div>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: openFaq === i ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '0 22px 20px', fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.72, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,158,255,0.32),transparent)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 280, background: 'radial-gradient(ellipse,rgba(79,158,255,0.08),transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,5vw,54px)', fontWeight: 400, letterSpacing: '-1.5px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.06 }}>Ready to <em style={{ color: '#4f9eff' }}>mobilise?</em></h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32 }}>We are currently accepting new partners. Initiate your audit request today.</p>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>Initiate Protocol</button></Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:900px){.hero-grid-cols,.three-cols{grid-template-columns:1fr!important;gap:24px!important;}}
      `}</style>
    </div>
  );
};

export default About;