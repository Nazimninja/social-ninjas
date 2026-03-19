import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Clock, ShieldCheck, Plus, Minus } from 'lucide-react';
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

const faqs = [
  { q: 'How quickly will I see results?', a: 'Most clients see meaningful improvements within 30–45 days. We don\'t wait for everything to be perfect before launching — we start fast, measure everything, and improve every week.' },
  { q: 'Do I own everything you create?', a: 'Yes. Every ad, every creative, every strategy document we make is 100% yours. If you leave tomorrow, you take everything with you. No lock-in, ever.' },
  { q: 'What\'s the minimum commitment?', a: 'We work in 90-day growth sprints. That\'s enough time to actually move the needle — not just set things up and call it done.' },
  { q: 'Do you work with small businesses?', a: 'Yes, absolutely. We work with everyone from solo founders to established brands. What matters is your commitment to growing — not the size of your current budget.' },
  { q: 'Will I have a dedicated person looking after my account?', a: 'Yes. You\'ll work directly with experienced people — not get handed off to junior staff after signing. You\'ll always know who\'s responsible for your results.' },
];

const About: React.FC = () => {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO title="About Us | Social Ninja's" description="We're a small, focused team that helps brands grow using AI and performance marketing. Here's who we are and how we work." keywords="about social ninjas, performance marketing team, AI agency India" />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div className="eyebrow reveal">Who We Are</div>
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(38px,5.5vw,68px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.04, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
                We're not a big agency.<br /><span style={{ color: '#5ba4f5' }}>We're your growth team.</span>
              </h1>
              <p className="reveal d2" style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 480, marginBottom: 36, borderLeft: '2px solid rgba(91,164,245,0.3)', paddingLeft: 20 }}>
                We started Social Ninja's because we kept seeing brands spend money on marketing and never really know if it was working. We decided to do things differently — with more honesty, more speed, and AI at the centre of everything.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>Let's Talk →</button></Link>
            </div>
            <div className="reveal-r d2">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['150+', 'Brands we\'ve helped grow'], ['₹40Cr+', 'In ad spend managed'], ['97%', 'Clients who renew every year'], ['4.9★', 'Average client rating']].map(([n, l], i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px 20px', borderRadius: 18, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 30, fontWeight: 700, color: '#5ba4f5', letterSpacing: '-1px', lineHeight: 1, marginBottom: 8 }}>{n}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OUR STORY */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Our Story</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 44, color: 'rgba(255,255,255,0.95)' }}>
          We built what we wished we could hire.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="hero-grid-cols">
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.82 }}>
            Social Ninja's started because we kept seeing the same problem: brands spending money on marketing but not knowing if it was working. Agencies would send fancy reports — but the numbers never seemed to connect to actual sales.<br /><br />We decided to do things differently. We kept the team small and focused, put AI at the centre of everything, and tied every decision to one question: is this making our client more money?
          </p>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.82 }}>
            Today we help brands across India, Dubai, and beyond — from D2C startups to established businesses — grow faster using AI automation, paid advertising, and content that converts.<br /><br />We're small on purpose. Every client works with experienced people who genuinely care about their results. When you grow, we grow. That's not a slogan — that's literally how our business model works.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '80px 28px', background: 'rgba(4,8,18,0.5)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>How We Think</div>
          <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 52, color: 'rgba(255,255,255,0.95)' }}>Three rules we never break.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="three-cols">
            {[
              { Icon: BarChart3, title: 'Revenue over likes', desc: 'We don\'t care how many followers you have. We care how much money your marketing is making. Every strategy starts and ends with that.' },
              { Icon: Clock, title: 'Fast beats perfect', desc: 'We launch quickly, learn from real data, and improve. Waiting weeks for a "perfect" campaign means weeks of losing to competitors who already launched.' },
              { Icon: ShieldCheck, title: 'You own everything', desc: 'Every account, every creative, every piece of content we make belongs to you. If you leave, you walk away with everything. No exceptions, ever.' },
            ].map((item, i) => (
              <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 32, borderRadius: 22 }}>
                <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(91,164,245,0.07)', border: '1px solid rgba(91,164,245,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <item.Icon size={24} color="#5ba4f5" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.68 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Common Questions</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 44, color: 'rgba(255,255,255,0.95)' }}>Things people usually ask us.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="reveal" style={{ background: openFaq === i ? 'rgba(91,164,245,0.06)' : 'rgba(255,255,255,0.04)', border: `1px solid ${openFaq === i ? 'rgba(91,164,245,0.28)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', background: 'none', border: 'none', color: openFaq === i ? '#5ba4f5' : 'rgba(255,255,255,0.85)', textAlign: 'left', cursor: 'pointer', fontSize: 14.5, fontWeight: 400, fontFamily: "'DM Sans',sans-serif", gap: 14 }}>
                {faq.q}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: openFaq === i ? 'rgba(91,164,245,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${openFaq === i ? 'rgba(91,164,245,0.3)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                  {openFaq === i ? <Minus size={14} color="#5ba4f5" /> : <Plus size={14} color="rgba(255,255,255,0.5)" />}
                </div>
              </button>
              {openFaq === i && <div style={{ padding: '0 22px 20px', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, letterSpacing: '-1.5px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.08 }}>Let's grow your business together.</h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>Book a free 30-minute call. We\'ll find what\'s holding your marketing back and show you exactly what we\'d do to fix it.</p>
          <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>Book a Free Call →</button></Link>
        </div>
      </div>
      <style>{`@media(max-width:900px){.hero-grid-cols,.three-cols{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
    </div>
  );
};
export default About;
