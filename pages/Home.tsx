import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
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

const testimonials = [
  { name: 'Priya Mehta', role: 'Skincare brand · Mumbai', impact: '4.2× ROAS', text: 'In 60 days our ROAS went from 1.8 to 4.2. Our old agency gave us pretty charts. Social Ninja\'s gave us actual results.', stars: 5 },
  { name: 'Rahul Sharma', role: 'Fitness coach · Delhi', impact: '2K → 18K followers', text: 'Went from 2,000 to 18,000 followers in 3 months just by being consistent with the scripts they write for me. I just read them on camera.', stars: 5 },
  { name: 'Vikram Singh', role: 'Founder · Velocity Logistics', impact: '$250k Net Profit', text: 'They found leaks in our ad account we didn\'t know existed. Two weeks later our cost per lead dropped 40%. Literally saved our Q4.', stars: 5 },
  { name: 'Fatima Al-Maktoum', role: 'Head of Marketing · Al-Futtaim', impact: '4.5× ROAS', text: 'No jargon, no fluff. Just clear numbers showing what we spent and what we made. They treat our budget like their own money.', stars: 5 },
  { name: 'Mike Ross', role: 'VP of Sales · SaaSify', impact: '2× Close Rate', text: 'My sales team now only talks to people who actually want to buy. Our close rate doubled because we stopped wasting time on bad leads.', stars: 5 },
];

const Home: React.FC = () => {
  useReveal();
  const [currentT, setCurrentT] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setCurrentT(p => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <div className="page-bg overflow-x-hidden" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="Social Ninja's | We Help Brands Get More Customers"
        description="AI automation, paid ads, and content creation that actually works. Book a free strategy call and see exactly how we'd grow your business."
        keywords="performance marketing India, AI automation agency, social media growth agency Dubai, AI marketing tools India, content creation agency, digital marketing for small business, AI ads agency, social media management India, growth marketing agency"
      />

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: 60, overflow: 'hidden' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 50, background: 'rgba(91,164,245,0.08)', border: '1px solid rgba(91,164,245,0.2)', fontSize: 11, fontWeight: 600, color: '#5ba4f5', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                Helping 150+ brands grow since 2022
              </div>
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(42px,6vw,76px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-2.5px', marginBottom: 12, color: 'rgba(255,255,255,0.96)' }}>
                We help your brand<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#a5c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>get more customers.</span>
              </h1>
              <p className="reveal d2" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.72, maxWidth: 480, marginBottom: 40 }}>
                We use <strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>AI automation, paid ads, and content creation</strong> to bring you more leads, more sales, and better return on every rupee you spend on marketing.
              </p>
              <div className="reveal d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Get My Free Audit <ArrowRight size={16} /></button></Link>
                <Link to="/services"><button className="btn-ghost" style={{ fontSize: 15 }}>See What We Do →</button></Link>
              </div>
              <div className="reveal d4" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[['4.8×','Average ROAS'], ['₹40Cr+','Ad Spend Managed'], ['97%','Client Retention']].map(([n,l]) => (
                  <div key={l}><div style={{ fontFamily: "'DM Sans'", fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{l}</div></div>
                ))}
              </div>
            </div>

            {/* RIGHT — Dashboard card */}
            <div className="reveal-r d2 hero-dashboard" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 400, animation: 'float 8s ease-in-out infinite' }}>
                <div className="glass-card" style={{ borderRadius: 24, padding: 0, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} /></div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.3)' }}>Live Results — All Clients</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} /><span style={{ fontSize: 10, color: '#34d399', fontWeight: 600 }}>Live</span></div>
                  </div>
                  <div style={{ padding: '24px 22px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Revenue Generated This Month</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 48, fontWeight: 700, letterSpacing: '-2px', color: '#fff', lineHeight: 1, marginBottom: 24 }}>$4.2M<span style={{ color: '#5ba4f5', fontSize: 28 }}>+</span></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[['🤖','Leads Qualified This Week','2,847','#5ba4f5'],['📈','Avg ROAS Across Clients','4.8×','#34d399'],['⚡','AI Reply Time','0.8 seconds','#818cf8']].map(([ic,l,v,c]) => (
                        <div key={l as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '11px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c}15`, border: `1px solid ${c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{ic}</div>
                            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{l}</span>
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 500, color: c as string }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', overflow: 'hidden', background: 'rgba(8,16,31,0.6)' }}>
        <div className="ticker-track" style={{ display: 'flex', gap: 56, width: 'max-content' }}>
          {['Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants','Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants'].map((b,i) => (
            <span key={i} style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 26, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', fontStyle: 'italic' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow reveal">What We Do</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.08 }}>
              Everything your brand needs<br />to grow faster.
            </h2>
          </div>
          <Link to="/services" className="reveal d2"><button className="btn-ghost">See All Services →</button></Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="services-grid">
          {[
            { icon: '🤖', title: 'AI & Automation', sub: 'Never miss a lead', desc: 'AI that talks to your leads 24/7, qualifies them, and books meetings — while you sleep.', link: '/services/ai-automation', color: '#5ba4f5' },
            { icon: '🚀', title: 'Performance Marketing', sub: 'More sales, better ROI', desc: 'Meta and Google ads that bring real customers. Our clients average 4.5× return on their ad spend.', link: '/services/performance-marketing', color: '#818cf8' },
            { icon: '⚡', title: 'AI Content Studio', sub: 'A week of content in 60 seconds', desc: 'AI researches trending topics in your niche, then writes all your captions, scripts and slides.', link: '/content-studio', color: '#34d399' },
          ].map((s,i) => {
            const isExternal = s.link.startsWith('/content-studio');
            const CardContent = (
              <div className={`glass-card reveal d${i+1}`} style={{ padding: 28, height: '100%', cursor: 'pointer', borderRadius: 22, borderTop: `2px solid ${s.color}30` }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}12`, border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color, marginBottom: 6 }}>{s.sub}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.3px', marginBottom: 10, lineHeight: 1.25, fontFamily: "'DM Sans',sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: s.color }}>Learn More <ArrowRight size={14} /></div>
              </div>
            );
            return isExternal ? (
              <a key={i} href={s.link} style={{ textDecoration: 'none' }}>{CardContent}</a>
            ) : (
              <Link key={i} to={s.link} style={{ textDecoration: 'none' }}>{CardContent}</Link>
            );
          })}
        </div>
      </div>

      {/* AI AGENT */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '80px 28px', background: 'rgba(4,8,18,0.6)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            <div className="reveal-l">
              <div className="eyebrow" style={{ marginBottom: 16 }}>The AI Advantage</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.06, marginBottom: 20, color: 'rgba(255,255,255,0.95)' }}>
                Your competitors sleep.<br /><span style={{ color: '#5ba4f5' }}>Your AI agent doesn't.</span>
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, marginBottom: 32, borderLeft: '2px solid rgba(91,164,245,0.3)', paddingLeft: 20 }}>
                Most companies take 47 hours to reply to a new lead. By then, they've already bought from someone else. Our AI replies in under 1 second — 24/7 — books meetings into your calendar, and your team only gets involved when someone is ready to buy.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Set Up My AI Agent <ArrowRight size={16} /></button></Link>
            </div>
            <div className="reveal-r d2">
              <div className="glass-card" style={{ borderRadius: 22, padding: 28, animation: 'float 9s ease-in-out infinite' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.88)', fontSize: 15 }}>🤖 Your AI Sales Agent</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} /><span style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>ACTIVE 24/7</span></div>
                </div>
                {[['Leads spoken to today','142','rgba(255,255,255,0.75)'],['Meetings booked','18','#5ba4f5'],['Average reply time','0.8 seconds','#34d399'],['Close rate improvement','+3.2×','#818cf8']].map(([l,v,c]) => (
                  <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{l}</span>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, fontWeight: 500, color: c as string }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT STUDIO */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div className="glass-card reveal" style={{ borderRadius: 28, overflow: 'hidden', padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }} className="hero-grid-cols">
            <div style={{ padding: '48px 44px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 50, background: 'rgba(47,207,142,0.1)', border: '1px solid rgba(47,207,142,0.2)', fontSize: 10.5, fontWeight: 700, color: '#34d399', marginBottom: 22 }}>🟢 Live Product</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 14, color: 'rgba(255,255,255,0.95)' }}>
                Stop spending hours<br /><span style={{ color: '#5ba4f5' }}>writing content.</span>
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
                Every week, our AI Content Studio checks what's trending in your niche, then writes your captions, Reel scripts, carousel slides and hashtags — all in 60 seconds. No writing skills needed.
              </p>
              {['Researches live trends before writing — every time','Writes captions, scripts, slides and hashtags','Sounds exactly like your brand, always','Starts completely free. No credit card.'].map((t,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9, fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>
                  <ShieldCheck size={15} color="#5ba4f5" />{t}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <a href="/content-studio"><button className="btn-primary" style={{ fontSize: 14 }}>See How It Works →</button></a>
                <a href="/content-studio"><button className="btn-ghost" style={{ fontSize: 14 }}>⚡ Try 3 Posts Free</button></a>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderLeft: '1px solid rgba(255,255,255,0.07)', padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map((c,i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
                <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.3)' }}>AI researching trends → writing your posts...</span>
              </div>
              {[{n:'POST 01 · INSTAGRAM REEL',t:'Trending Now',w:['92%','78%','63%']},{n:'POST 02 · LINKEDIN',t:'Rising Fast',w:['86%','91%','68%']}].map((p,i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#5ba4f5', letterSpacing: '0.04em' }}>{p.n}</span>
                    <span style={{ fontSize: 8, padding: '2px 8px', borderRadius: 8, background: 'rgba(91,164,245,0.1)', color: '#5ba4f5', border: '1px solid rgba(91,164,245,0.15)' }}>{p.t}</span>
                  </div>
                  {p.w.map((w,j) => <div key={j} style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginBottom: 4, width: w }} />)}
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {['Caption','Script','Slides','Checklist'].map((tab,j) => <span key={j} style={{ fontSize: 8.5, padding: '2px 8px', borderRadius: 14, background: j===0?'rgba(91,164,245,0.12)':'rgba(255,255,255,0.04)', color: j===0?'#5ba4f5':'rgba(255,255,255,0.3)', border: j===0?'1px solid rgba(91,164,245,0.18)':'none' }}>{tab}</span>)}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0', opacity: 0.5 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#5ba4f5', animation: `pulse ${0.8+i*0.15}s ease-in-out infinite` }} />)}
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono'" }}>Writing Post 03 · YouTube Short...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
          <div className="reveal-l">
            <div className="eyebrow">What Clients Say</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 20, color: 'rgba(255,255,255,0.95)' }}>
              Our clients don't just stay.<br /><span style={{ color: '#5ba4f5' }}>They grow.</span>
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>97% of clients renew every year — not because they signed a contract, but because the results speak for themselves.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['4.9★','Client Rating','⭐'],['97%','Renewal Rate','📈'],['150+','Active Brands','🌍'],['₹40Cr+','Ad Spend','💰']].map(([n,l,ic]) => (
                <div key={l} className="glass-card" style={{ padding: '16px 18px', borderRadius: 16 }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{ic}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-r d1" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="glass-card" style={{ borderRadius: 26, padding: 0, overflow: 'hidden', minHeight: 340, position: 'relative' }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ position: i===0?'relative':'absolute', inset: 0, padding: '32px 32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)', opacity: i===currentT?1:0, transform: i===currentT?'translateX(0)':'translateX(32px)', pointerEvents: i===currentT?'auto':'none' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 3 }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={12} fill="#5ba4f5" color="#5ba4f5" />)}</div>
                      <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 50, background: 'rgba(47,207,142,0.12)', border: '1px solid rgba(47,207,142,0.25)', color: '#34d399', fontWeight: 700, letterSpacing: '0.06em' }}>✓ VERIFIED</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#5ba4f5', marginBottom: 10, letterSpacing: '-0.2px' }}>{t.impact}</div>
                    <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.72, marginBottom: 20 }}>"{t.text}"</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#5ba4f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{t.name[0]}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>{t.name}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{t.role}</div></div>
                  </div>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: 20, right: 24, display: 'flex', gap: 6, zIndex: 10 }}>
                {testimonials.map((_,i) => <button key={i} onClick={() => setCurrentT(i)} style={{ height: 4, borderRadius: 2, background: i===currentT?'#5ba4f5':'rgba(255,255,255,0.2)', width: i===currentT?22:7, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.35),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4.5vw,54px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.06, marginBottom: 14, color: 'rgba(255,255,255,0.96)' }}>
            Ready to get more customers?
          </h2>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Book a free 30-minute call. We'll look at your marketing, find what's leaking, and show you exactly what we'd do to fix it. No charge, no obligation.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 16, padding: '17px 40px' }}>Book My Free Strategy Call</button></Link>
            <a href="/content-studio"><button className="btn-ghost" style={{ fontSize: 15 }}>⚡ Try AI Studio Free First</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @media(max-width:900px){ .hero-grid-cols{grid-template-columns:1fr!important;gap:40px!important;} .hero-dashboard{display:none!important;} }
        @media(max-width:768px){ .services-grid{grid-template-columns:1fr!important;} }
        @media(max-width:640px){ .section{padding:60px 18px!important;} }
      `}</style>
    </div>
  );
};
export default Home;
