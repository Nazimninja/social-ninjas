import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, ShieldCheck, Star, Rocket, BarChart3, Zap, Bot, Cpu, Activity } from 'lucide-react';
import SEO from '../components/SEO';

/* ── Scroll Reveal Hook ── */
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

const Home: React.FC = () => {
  useReveal();
  const [currentT, setCurrentT] = useState(0);
  const [hovered, setHovered] = useState(false);

  const testimonials = [
    { name: "Gordy Hirsch",    role: "Director of Creative",   company: "CareRev",            impact: "300% Lead Volume", text: "We didn't just get 'leads' — we got actual qualified sales calls. Volume tripled in a month. It's rare to find partners who care this much.", stars: 5 },
    { name: "Fatima Al-Maktoum", role: "Head of Marketing",   company: "Al-Futtaim",         impact: "4.5× ROAS",        text: "No fluff reports. Just 'here's what we spent, here's what we made'. They treat our budget like it's their own money. The ROI speaks for itself.", stars: 5 },
    { name: "Vikram Singh",    role: "Founder",                company: "Velocity Logistics",  impact: "$250k Net Profit", text: "Two weeks later, our CPA dropped by 40%. They literally saved our Q4 targets.", stars: 5 },
    { name: "Sarah Jenkins",   role: "Founder",                company: "Lumina Skin",         impact: "4.2× ROAS",        text: "Their creative team produced videos that actually stopped the scroll. ROAS went from 1.8 to 4.2 in just 60 days.", stars: 5 },
    { name: "Mike Ross",       role: "VP of Sales",            company: "SaaSify",             impact: "Auto-Booked Demos", text: "Now my sales team only talks to people who actually want to buy. Game changer.", stars: 5 },
  ];

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setCurrentT(p => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [hovered, currentT]);

  return (
    <div className="page-bg overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" /><div className="amb-4" />
      <SEO title="Social Ninja's | AI-Powered Growth Agency" description="We scale brands through elite creative production, AI automation, and mathematical media buying." keywords="performance marketing agency, AI automation, social media management" />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: 60, overflow: 'hidden' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">

            {/* LEFT */}
            <div>
              <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 50, background: 'rgba(91,164,245,0.08)', border: '1px solid rgba(91,164,245,0.2)', fontSize: 11, fontWeight: 600, color: '#5ba4f5', marginBottom: 28, letterSpacing: '0.03em' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                AI-First Marketing Agency
              </div>

              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-1px', marginBottom: 10, color: 'rgba(255,255,255,0.96)' }}>
                The AI-Powered
              </h1>
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-1px', marginBottom: 24, background: 'linear-gradient(135deg, #5ba4f5, #a5c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <em>Growth Engine.</em>
              </h1>

              <p className="reveal d2" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, maxWidth: 480, marginBottom: 40 }}>
                While your competitors chase vanity metrics, we engineer <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>systems that print money</strong> — AI-powered ads, 24/7 sales agents, and content that converts at 3–10× ROAS.
              </p>

              <div className="reveal d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Get My Free Audit <ArrowRight size={16} /></button></Link>
                <Link to="/services"><button className="btn-ghost" style={{ fontSize: 15 }}>See How It Works →</button></Link>
              </div>

              <div className="reveal d4" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[['4.8×','Avg ROAS'], ['$40M+','Ad Spend Managed'], ['97%','Retention Rate']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 26, fontWeight: 600, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Dashboard card */}
            <div className="reveal-r d2" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 400, animation: 'float 8s ease-in-out infinite' }}>
                <div className="glass-card" style={{ borderRadius: 24, padding: 0, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(91,164,245,0.08)' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} /></div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.3)' }}>AI System Active</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} /><span style={{ fontSize: 10, color: '#34d399', fontWeight: 600 }}>Live</span></div>
                  </div>
                  <div style={{ padding: '24px 22px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI-Attributed Revenue</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 48, fontWeight: 600, letterSpacing: '-2px', color: '#fff', lineHeight: 1, marginBottom: 24 }}>$4.2M<span style={{ color: '#5ba4f5', fontSize: 28 }}>+</span></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[['🤖','Leads Qualified','14,203','#5ba4f5'], ['📈','Growth Rate','+128%','#34d399'], ['⚡','Avg Response','0.8s','#818cf8']].map(([ic,l,v,c]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '11px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c}15`, border: `1px solid ${c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{ic}</div>
                            <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>{l}</span>
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, fontWeight: 500, color: c as string }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 20, padding: '12px 14px', background: 'rgba(91,164,245,0.06)', border: '1px solid rgba(91,164,245,0.14)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', gap: -8 }}>
                        {['#ff6b6b','#5ba4f5','#34d399'].map((c,i) => <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid rgba(8,16,31,0.9)', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{String.fromCharCode(65+i)}</div>)}
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(91,164,245,0.3)', border: '2px solid rgba(8,16,31,0.9)', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#5ba4f5' }}>50+</div>
                      </div>
                      <div><div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>Active Clients</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Worldwide</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', overflow: 'hidden', background: 'rgba(8,16,31,0.6)', position: 'relative', zIndex: 1 }}>
        <div className="ticker-track" style={{ display: 'flex', gap: 56, width: 'max-content' }}>
          {['AcmeCorp','Nebula','BoxInc','GlobalTech','Velocity','Fusion','Vertex','Oasis','Horizon','Pulse','AcmeCorp','Nebula','BoxInc','GlobalTech','Velocity','Fusion','Vertex','Oasis','Horizon','Pulse'].map((b,i) => (
            <span key={i} style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 28, fontWeight: 400, color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap', fontStyle: 'italic' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow reveal">Our Expertise</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, letterSpacing: '-1px', color: 'rgba(255,255,255,0.95)', marginBottom: 0, lineHeight: 1.08 }}>AI-First Growth Systems</h2>
          </div>
          <Link to="/services" className="reveal d2"><button className="btn-ghost">View All Services →</button></Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {[
            { icon: '🤖', title: 'AI & Automation',       sub: 'Efficiency & Speed',  desc: '24/7 AI agents that qualify leads, book calls, and follow up automatically. You wake up to a full calendar.', d: 'd1' },
            { icon: '🚀', title: 'Performance Marketing', sub: 'Revenue & ROAS',       desc: 'Meta & Google campaigns built on creative intelligence and data. Average 4.5× ROAS across our client portfolio.', d: 'd2' },
            { icon: '⚡', title: 'Creative Studio',       sub: 'Authority & Retention', desc: 'Scroll-stopping video content and ads, powered by real performance data. Not gut feelings — results.', d: 'd3' },
          ].map((s, i) => (
            <Link key={i} to="/services" style={{ textDecoration: 'none' }}>
              <div className={`glass-card reveal ${s.d}`} style={{ padding: 28, height: '100%', cursor: 'pointer', borderRadius: 22 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{s.icon}</div>
                <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{s.sub}</div>
                <h3 style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.3px', marginBottom: 10, lineHeight: 1.25, fontFamily: "'DM Sans',sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#5ba4f5' }}>Learn More <ArrowRight size={14} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── AI SPOTLIGHT ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '88px 28px', position: 'relative', zIndex: 1, background: 'rgba(4,8,18,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            <div className="reveal-l">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: 'rgba(91,164,245,0.08)', border: '1px solid rgba(91,164,245,0.18)', fontSize: 11, fontWeight: 600, color: '#5ba4f5', marginBottom: 24 }}>
                <Bot size={13} /> The AI Advantage
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(32px,5vw,58px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.05, marginBottom: 20, color: 'rgba(255,255,255,0.95)' }}>
                Your competitors sleep.<br /><em style={{ color: '#5ba4f5' }}>Your AI Agent doesn't.</em>
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: 32, borderLeft: '2px solid rgba(91,164,245,0.3)', paddingLeft: 20 }}>
                The average company takes 47 hours to respond to a lead. We deploy AI agents that respond in under 1 second — qualifying, nurturing, and booking calls around the clock.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Deploy My AI Agent <ArrowRight size={16} /></button></Link>
            </div>
            <div className="reveal-r d2">
              <div className="glass-card" style={{ borderRadius: 22, padding: 28, animation: 'float 9s ease-in-out infinite' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Cpu size={20} color="#5ba4f5" /><span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>Neural Core</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} /><span style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>ACTIVE</span></div>
                </div>
                {[['Leads Processed Today','142','rgba(255,255,255,0.7)'], ['Meetings Booked','18','#5ba4f5'], ['Avg. Response Time','0.8s','#34d399']].map(([l,v,c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>{l}</span>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 15, fontWeight: 500, color: c as string }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 6, textAlign: 'center', fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.22)' }}>SYSTEM OPERATIONAL · V2.4</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT STUDIO PROMO ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 28px', position: 'relative', zIndex: 1 }}>
        <div className="glass-card reveal" style={{ borderRadius: 28, padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'stretch' }} className="hero-grid-cols">
            <div style={{ padding: '48px 44px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 50, background: 'rgba(91,164,245,0.1)', border: '1px solid rgba(91,164,245,0.2)', fontSize: 10.5, fontWeight: 600, color: '#5ba4f5', marginBottom: 22, letterSpacing: '0.04em' }}>New Release</div>
              <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: 16, color: 'rgba(255,255,255,0.95)' }}>
                Social Ninja's<br /><em style={{ color: '#5ba4f5' }}>AI Content Studio</em>
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
                Stop staring at a blank screen. Our AI researches live trends in your exact niche, then writes Reel scripts, carousel hooks, and captions in 60 seconds.
              </p>
              {['Live platform trend research (Insta, YT, LinkedIn)', 'Content memory — AI never repeats angles', 'Platform-native hooks & hashtag strategies'].map((t,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.68)', fontWeight: 400 }}>
                  <ShieldCheck size={16} color="#5ba4f5" />{t}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <a href="/#/app/content-studio?plan=trial"><button className="btn-primary" style={{ fontSize: 14, padding: '13px 24px' }}>Explore The Studio</button></a>
                <a href="/#/app/content-studio?plan=trial"><button className="btn-ghost" style={{ fontSize: 14 }}>⚡ Try 3 Posts Free</button></a>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderLeft: '1px solid rgba(255,255,255,0.07)', padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map((c,i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
                <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.3)' }}>socialninjas.in/app · Generating posts...</span>
              </div>
              {[{n:'POST 01 · REEL',t:'Trending',w:['92%','78%','62%']},{n:'POST 02 · LINKEDIN',t:'Rising',w:['85%','90%','68%']}].map((p,i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, animation: `fadeUp .5s ease ${i*0.12}s both` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 600, color: '#5ba4f5', letterSpacing: '0.04em' }}>{p.n}</span>
                    <span style={{ fontSize: 7.5, padding: '2px 7px', borderRadius: 8, background: 'rgba(91,164,245,0.1)', color: '#5ba4f5', border: '1px solid rgba(91,164,245,0.15)' }}>{p.t}</span>
                  </div>
                  {p.w.map((w,j) => <div key={j} style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginBottom: 4, width: w }} />)}
                  <div style={{ display: 'flex', gap: 4, marginTop: 7 }}>
                    {['Caption','Script','Slides','Checklist'].map((tab,j) => <span key={j} style={{ fontSize: 8.5, padding: '2px 7px', borderRadius: 14, background: j===0?'rgba(91,164,245,0.12)':'rgba(255,255,255,0.04)', color: j===0?'#5ba4f5':'rgba(255,255,255,0.3)', border: j===0?'1px solid rgba(91,164,245,0.18)':'1px solid transparent' }}>{tab}</span>)}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', opacity: 0.55 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#5ba4f5', animation: `pulse ${0.8 + i*0.15}s ease-in-out infinite` }} />)}
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono'" }}>Writing Post 03 · YouTube Short...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
          <div className="reveal-l">
            <div className="eyebrow">Market Validation</div>
            <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.08, marginBottom: 20, color: 'rgba(255,255,255,0.95)' }}>
              Our clients don't<br /> renew contracts.<br /><em>They expand them.</em>
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>97% client retention. Average 4.9-star rating. Not because we're nice — because we deliver results that move the needle.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['4.9/5','Client Rating','⭐'], ['97%','Retention Rate','📈'], ['150+','Active Brands','🌍'], ['$40M+','Ad Spend','💰']].map(([n,l,ic]) => (
                <div key={l} className="glass-card" style={{ padding: '18px 20px', borderRadius: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{ic}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3, letterSpacing: '0.04em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-r d1" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="glass-card" style={{ borderRadius: 26, padding: 0, overflow: 'hidden', minHeight: 360, position: 'relative' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ position: i === 0 ? 'relative' : 'absolute', inset: 0, padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)', opacity: i === currentT ? 1 : 0, transform: i === currentT ? 'translateX(0)' : 'translateX(40px)', pointerEvents: i === currentT ? 'auto' : 'none', zIndex: i === currentT ? 2 : 1 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{ display: 'flex', gap: 3 }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={13} fill="#5ba4f5" color="#5ba4f5" />)}</div>
                      <div style={{ fontSize: 10, padding: '3px 10px', borderRadius: 50, background: 'rgba(91,164,245,0.1)', border: '1px solid rgba(91,164,245,0.2)', color: '#5ba4f5', fontWeight: 600 }}>{t.impact}</div>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7,  marginBottom: 24 }}>"{t.text}"</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#5ba4f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, flexShrink: 0 }}>{t.name[0]}</div>
                    <div><div style={{ fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>{t.name}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{t.role}, {t.company}</div></div>
                  </div>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: 22, right: 28, display: 'flex', gap: 6, zIndex: 10 }}>
                {testimonials.map((_,i) => <button key={i} onClick={() => setCurrentT(i)} style={{ height: 4, borderRadius: 2, background: i === currentT ? '#5ba4f5' : 'rgba(255,255,255,0.2)', width: i === currentT ? 24 : 8, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '88px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 0 80px rgba(91,164,245,0.05)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,164,245,0.35), transparent)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 280, background: 'radial-gradient(ellipse, rgba(91,164,245,0.09), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(30px,5vw,58px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.06, marginBottom: 14, color: 'rgba(255,255,255,0.96)' }}>
              Ready to <em style={{ color: '#5ba4f5' }}>dominate?</em>
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>Most brands are one breakthrough strategy away from 3× revenue. Book a free 30-minute audit and find out exactly where your growth is leaking.</p>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 16, padding: '17px 40px' }}>Get My Free Revenue Audit</button></Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @media(max-width:900px){ .hero-grid-cols{grid-template-columns:1fr!important;gap:40px!important;} }
        @media(max-width:640px){ .section{padding:60px 18px!important;} }
      `}</style>
    </div>
  );
};

export default Home;
