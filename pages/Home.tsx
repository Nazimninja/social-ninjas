import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Star, Check, Bot, Send, Sliders, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

/* ─── SCROLL-REVEAL HOOK ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── DATA ───────────────────────────────────────────────── */
const STATS = [
  { num: '4.8×',   label: 'Average client ROAS' },
  { num: '₹40Cr+', label: 'Media spend managed' },
  { num: '150+',   label: 'Active brand partners' },
  { num: '97%',    label: 'Month-over-month retention' },
];

const SERVICES = [
  {
    num: '01',
    title: 'AI Lead Automation',
    desc: 'Custom AI agents reply to Instagram DMs, WhatsApp, and web forms in under 1 second — qualifying, nurturing, and booking leads into your calendar without any manual work.',
    tags: ['24/7 Response', 'CRM Sync', 'WhatsApp & DM'],
    color: '#0065ff',
  },
  {
    num: '02',
    title: 'Performance Paid Ads',
    desc: 'Creative-first Meta and Google campaigns built on margin math, not vanity metrics. Average client reaches 4.5× ROAS by month 3 with our data-driven creative testing system.',
    tags: ['Meta & Google', '4.5× Avg ROAS', 'Creative Testing'],
    color: '#0065ff',
  },
  {
    num: '03',
    title: 'AI Content Engine',
    desc: 'We aggregate trending topics in your niche, script a full week of hooks, captions, and video scripts using AI, then deliver a content calendar ready to post — all in 60 seconds.',
    tags: ['Video Scripts', 'Auto-Scheduling', 'Trend Research'],
    color: '#0065ff',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Mehta', role: 'Founder, Glow Republic', initials: 'PM',
    impact: '4.2× ROAS in 60 days',
    text: 'Our ROAS went from 1.8 to 4.2 in 60 days. Our previous agency gave us pretty reports — Social Ninja\'s gave us revenue we could actually see in Shopify.',
    platform: 'Meta Ads',
  },
  {
    name: 'Rahul Sharma', role: 'Fitness Coach, FitWithRahul', initials: 'RS',
    impact: '2K → 18K followers in 3 months',
    text: 'The AI knows my niche better than most agencies. Three months of consistent content got me from 2,000 to 18,000 Instagram followers.',
    platform: 'Instagram',
  },
  {
    name: 'Vikram Singh', role: 'CEO, Velocity Logistics', initials: 'VS',
    impact: '40% lower cost per lead',
    text: 'They found leaks in our ad account we didn\'t even know existed. Two weeks later our CPL dropped 40%. Real money back in our pocket.',
    platform: 'Google Ads',
  },
  {
    name: 'Fatima Al-Rashidi', role: 'Marketing Head, Al-Futtaim Group', initials: 'FA',
    impact: '4.5× ROAS across 3 markets',
    text: 'No jargon, no fluff. Clear numbers showing what we spent and what we made. Their transparency is unlike anything I\'ve seen from an agency.',
    platform: 'Meta + Google',
  },
];

const TOOLS = [
  { name: 'WhatsApp Generator', desc: 'Build wa.me links with pre-filled messages and QR codes for campaigns.', url: 'https://linkwa.in', label: 'linkwa.in', tag: 'Free Tool' },
  { name: 'Salary Calculators', desc: 'Gross-to-net tax calculators, hourly converters, FICA deductions.', url: 'https://salary.socialninjas.in', label: 'salary.socialninjas.in', tag: 'Free Tool' },
  { name: 'AI Content Studio', desc: 'Aggregates trending topics and scripts a full week of content in 60s.', url: '/content-studio', label: 'content-studio', tag: 'AI Product' },
  { name: 'Fit Ninja Coach', desc: 'Personalized AI fitness coaching with diet plans and workout programs.', url: 'https://fit.socialninjas.in', label: 'fit.socialninjas.in', tag: 'App' },
];

const DEMO_CHAT = [
  { from: 'lead', text: 'Hi, I want to run ads for my coaching business.' },
  { from: 'ai',   text: 'Hi there! Great timing 🎯 — we specialise in coaches and educators. What\'s your current monthly ad budget?' },
  { from: 'lead', text: 'Around ₹80,000 per month.' },
  { from: 'ai',   text: 'Perfect. At that budget we typically generate 180–220 qualified leads/month with a CPL of ₹360–450. Can I book a 15-min audit call?' },
  { from: 'lead', text: 'Yes, tomorrow works.' },
  { from: 'ai',   text: 'Done! I\'ve sent a calendar link to your email. Our growth strategist will join you tomorrow. 📅' },
];

/* ─── HOME COMPONENT ─────────────────────────────────────── */
const Home: React.FC = () => {
  useReveal();

  /* Chat demo */
  const [chatMsgs, setChatMsgs] = useState<typeof DEMO_CHAT>([]);
  const [typing, setTyping] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMsgs, typing]);

  useEffect(() => {
    playNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function playNext() {
    if (idxRef.current >= DEMO_CHAT.length) {
      timerRef.current = setTimeout(() => { setChatMsgs([]); idxRef.current = 0; playNext(); }, 5000);
      return;
    }
    const msg = DEMO_CHAT[idxRef.current];
    if (msg.from === 'ai') {
      setTyping(true);
      timerRef.current = setTimeout(() => {
        setTyping(false);
        setChatMsgs(p => [...p, msg]);
        idxRef.current++;
        timerRef.current = setTimeout(playNext, 1800);
      }, 1400);
    } else {
      setChatMsgs(p => [...p, msg]);
      idxRef.current++;
      timerRef.current = setTimeout(playNext, 900);
    }
  }

  /* ROAS slider */
  const [budget, setBudget] = useState(1000000);
  const revenue = budget * 4.8;
  const leads   = Math.round(budget / 380);

  /* Testimonial rotation */
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTIdx(p => (p + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, []);

  /* Scroll parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const smoothY    = useSpring(rawY,       { stiffness: 60, damping: 18 });
  const smoothOp   = useSpring(rawOpacity, { stiffness: 60, damping: 18 });

  /* Parallax floating layer — cards shift at a different rate than hero text */
  const rawCardsY  = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const smoothCards = useSpring(rawCardsY, { stiffness: 50, damping: 20 });

  return (
    <div className="page-wrap" style={{ fontFamily: "'Inter',system-ui,sans-serif", background: '#fff', color: '#141414' }}>
      <SEO
        title="Social Ninja's | AI-Powered Performance Marketing Agency"
        description="AI automation, paid ads, and content creation that actually works. Book a free strategy call."
        keywords="performance marketing India, AI automation agency, paid ads agency India, AI content creation"
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>

        {/* Subtle grid bg */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(#ededed 1px, transparent 1px), linear-gradient(90deg, #ededed 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
          opacity: 0.5,
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">

            {/* Left — text, fades out on scroll */}
            <motion.div style={{ y: smoothY, opacity: smoothOp }}>
              <div className="pill" style={{ marginBottom: 24, width: 'fit-content' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ba213', flexShrink: 0 }} />
                150+ brands scaled globally since 2022
              </div>

              <h1 style={{ fontSize: 'clamp(40px,4.5vw,64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 20, color: '#141414', fontFamily: "'Plus Jakarta Sans',system-ui" }}>
                AI-powered<br />growth systems<br />
                <span style={{ color: '#0065ff' }}>that scale.</span>
              </h1>

              <p style={{ fontSize: 17, fontWeight: 400, color: '#717171', lineHeight: 1.65, maxWidth: 480, marginBottom: 36 }}>
                We build custom AI sales pipelines, run data-driven paid ads, and engineer content systems for brands that want measurable, repeatable growth.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}>
                <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '12px 22px' }}>Book Free Audit <ArrowRight size={14} /></button></Link>
                <Link to="/services"><button className="btn-ghost" style={{ fontSize: 14 }}>Explore Systems</button></Link>
              </div>

              {/* Mini stats row */}
              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', paddingTop: 28, borderTop: '1px solid #ededed' }}>
                {STATS.slice(0, 3).map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 22, fontWeight: 900, letterSpacing: '-1px', color: '#141414', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 11, color: '#adadad', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — chat demo card, scrolls at slightly different rate (parallax) */}
            <motion.div style={{ y: smoothCards }}>
              <div className="card" style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

                {/* Card header */}
                <div style={{ background: '#fafafa', padding: '14px 18px', borderBottom: '1px solid #ededed', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bot size={14} color="#0065ff" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#141414' }}>AI Lead Qualifier</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ba213' }} />
                    <span style={{ fontSize: 11, color: '#717171', fontWeight: 500 }}>Active</span>
                  </div>
                </div>

                {/* Messages */}
                <div ref={chatContainerRef} style={{ padding: '20px 18px', height: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, background: '#fff' }}>
                  {chatMsgs.length === 0 && !typing && (
                    <div style={{ textAlign: 'center', color: '#adadad', fontSize: 12, margin: 'auto', fontFamily: "'Geist Mono',monospace" }}>Initialising simulation...</div>
                  )}
                  {chatMsgs.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.from === 'ai' ? 'flex-start' : 'flex-end' }}>
                      <div style={{
                        maxWidth: '80%',
                        padding: '9px 13px',
                        borderRadius: m.from === 'ai' ? '14px 14px 14px 3px' : '14px 14px 3px 14px',
                        fontSize: 13,
                        lineHeight: 1.45,
                        background: m.from === 'ai' ? '#f5f5f5' : '#0065ff',
                        color: m.from === 'ai' ? '#141414' : '#fff',
                        animation: 'fadeUp 0.25s ease',
                      }}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div style={{ display: 'flex', gap: 4, padding: '9px 14px', background: '#f5f5f5', borderRadius: '14px 14px 14px 3px', width: 'fit-content' }}>
                      {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#adadad', animation: `bounce 1s infinite ${i * 0.2}s`, display: 'block' }} />)}
                    </div>
                  )}
                </div>

                {/* Input bar mock */}
                <div style={{ background: '#fafafa', padding: '10px 14px', borderTop: '1px solid #ededed', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ flex: 1, background: '#fff', border: '1px solid #ededed', borderRadius: 8, padding: '7px 12px', fontSize: 12, color: '#adadad' }}>Simulating responses…</div>
                  <Link to="/contact">
                    <button className="btn-primary" style={{ padding: '7px 14px', fontSize: 12 }}>Build Mine <ArrowRight size={11} /></button>
                  </Link>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── LOGO TICKER ──────────────────────────────────── */}
      <div className="section-wrap-alt" style={{ padding: '24px 0', margin: '40px 0 0 0' }}>
        <div className="ticker-wrap" style={{ border: 'none', background: 'transparent', padding: 0 }}>
          <div className="ticker-track">
            {[...Array(2)].map((_, ri) =>
              ['Meta Ads','Google Ads','WhatsApp API','AI Automation','Content Creation','Paid Media','Lead Qualification','Instagram Growth','B2B Outbound','CRM Integration'].map(t => (
                <span key={`${ri}-${t}`} style={{ fontSize: 13, fontWeight: 500, color: '#adadad', whiteSpace: 'nowrap' }}>{t}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <div className="section-wrap-white">
        <section className="section">
          <div style={{ marginBottom: 56 }} className="reveal">
            <div className="pill" style={{ marginBottom: 16 }}>Core Systems</div>
            <h2 className="reveal d1" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#141414', maxWidth: 560, fontFamily: "'Plus Jakarta Sans',system-ui" }}>
              Everything you need to grow. Nothing you don't.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  borderTop: '1px solid #ededed',
                  padding: '36px 12px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: 32,
                  alignItems: 'start',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#0065ff';
                  e.currentTarget.style.paddingLeft = '24px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#ededed';
                  e.currentTarget.style.paddingLeft = '12px';
                }}
              >
                <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, color: '#adadad', paddingTop: 4 }}>{svc.num}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', color: '#141414', marginBottom: 10 }}>{svc.title}</h3>
                  <p style={{ fontSize: 14.5, color: '#717171', lineHeight: 1.65, maxWidth: 580, marginBottom: 16 }}>{svc.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {svc.tags.map(t => <span key={t} className="pill" style={{ fontSize: 11 }}>{t}</span>)}
                  </div>
                </div>
                <Link to="/services">
                  <button className="btn-ghost" style={{ marginTop: 4, fontSize: 13 }}>Details <ArrowRight size={12} /></button>
                </Link>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ededed' }} />
          </div>
        </section>
      </div>

      {/* ── ROAS CALCULATOR + COPY SPLIT ─────────────────── */}
      <div className="section-wrap-alt">
        <section className="section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid-cols">

            <div className="reveal-l">
              <div className="pill" style={{ marginBottom: 16 }}>See The Math</div>
              <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 16, color: '#141414' }}>
                We run your ads<br />on pure math.
              </h2>
              <p style={{ fontSize: 15, color: '#717171', lineHeight: 1.65, marginBottom: 28 }}>
                Every campaign starts with a profitability model — your CPL target, your close rate, your LTV. We reverse-engineer from your revenue goal and never burn budget without a data-backed reason.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Margin-first media buying','Creative fatigue monitoring','Weekly ROAS reporting','Full attribution across channels'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#141414' }}>
                    <Check size={14} color="#0065ff" strokeWidth={2.5} />{item}
                  </li>
                ))}
              </ul>
              <Link to="/contact"><button className="btn-primary">Start Scaling <ArrowRight size={14} /></button></Link>
            </div>

            <div className="reveal-r d2">
              <div className="card" style={{ padding: 28, borderRadius: 20, background: '#ffffff' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#adadad', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>ROAS Calculator</div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: '#717171' }}>Monthly ad budget</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#141414' }}>₹{(budget / 100000).toFixed(0)}L</span>
                  </div>
                  <input type="range" min={200000} max={5000000} step={100000} value={budget} onChange={e => setBudget(+e.target.value)}
                    style={{ width: '100%', accentColor: '#0065ff', height: 4, cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: '#adadad' }}>₹2L</span>
                    <span style={{ fontSize: 11, color: '#adadad' }}>₹50L</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Qualified Leads / mo', value: leads.toLocaleString(), sub: 'at ₹380 CPL avg' },
                    { label: 'Projected Revenue', value: `₹${(revenue / 100000).toFixed(1)}L`, sub: 'at 4.8× ROAS avg' },
                  ].map(cell => (
                    <div key={cell.label} style={{ background: '#fafafa', border: '1px solid #ededed', borderRadius: 12, padding: '14px 16px' }}>
                      <div style={{ fontSize: 11, color: '#adadad', marginBottom: 6 }}>{cell.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Plus Jakarta Sans'", letterSpacing: '-0.5px', color: '#141414' }}>{cell.value}</div>
                      <div style={{ fontSize: 11, color: '#adadad', marginTop: 4 }}>{cell.sub}</div>
                    </div>
                  ))}
                </div>
                <Link to="/contact" style={{ display: 'block' }}>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 0' }}>Get This For My Brand <ArrowRight size={14} /></button>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <div className="section-wrap-white">
        <section className="section">
          <div style={{ marginBottom: 48 }} className="reveal">
            <div className="pill" style={{ marginBottom: 16 }}>Client Results</div>
            <h2 className="reveal d1" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#141414', fontFamily: "'Plus Jakarta Sans',system-ui" }}>
              Real brands. Real numbers.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="services-grid reveal">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="card" style={{ padding: 32, borderRadius: 18 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#0065ff" color="#0065ff" />)}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#141414', marginBottom: 8 }}>{t.impact}</div>
                <p style={{ fontSize: 13.5, color: '#717171', lineHeight: 1.6, marginBottom: 18 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #ededed' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0065ff' }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#141414' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: '#adadad' }}>{t.role}</div>
                    </div>
                  </div>
                  <span className="pill" style={{ fontSize: 11 }}>{t.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── TOOLS ECOSYSTEM ──────────────────────────────── */}
      <div className="section-wrap-alt">
        <section className="section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="hero-grid-cols">
            <div className="reveal-l" style={{ position: 'sticky', top: 80 }}>
              <div className="pill" style={{ marginBottom: 16 }}>Free Tools</div>
              <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 16, color: '#141414' }}>
                The Social Ninja's<br />product ecosystem.
              </h2>
              <p style={{ fontSize: 15, color: '#717171', lineHeight: 1.65, marginBottom: 28 }}>
                Alongside our agency services, we build and maintain free and SaaS tools for marketers, creators, and businesses — all under our unified brand network.
              </p>
              <Link to="/tools"><button className="btn-ghost">View All Tools <ArrowRight size={13} /></button></Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }} className="reveal-r d1">
              {TOOLS.map((tool, i) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{
                      borderTop: '1px solid #ededed',
                      padding: '24px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#0065ff';
                      e.currentTarget.style.paddingLeft = '24px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#ededed';
                      e.currentTarget.style.paddingLeft = '12px';
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#141414' }}>{tool.name}</span>
                        <span className="pill" style={{ fontSize: 10, padding: '3px 8px' }}>{tool.tag}</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#717171', lineHeight: 1.5, marginBottom: 6 }}>{tool.desc}</p>
                      <span style={{ fontSize: 12, color: '#adadad', fontFamily: "'Geist Mono',monospace" }}>{tool.label}</span>
                    </div>
                    <ArrowUpRight size={16} color="#adadad" style={{ flexShrink: 0, marginTop: 2, marginLeft: 16 }} />
                  </div>
                </a>
              ))}
              <div style={{ borderTop: '1px solid #ededed' }} />
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <div className="section-wrap-white">
        <section className="section">
          <div className="reveal" style={{ border: '1px solid #ededed', borderRadius: 20, padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: '#fff' }}>
            {/* Subtle top gradient line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #fff, #0065ff, #fff)' }} />
            <div className="pill" style={{ marginBottom: 20, margin: '0 auto 20px' }}>Free Audit</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-2px', color: '#141414', marginBottom: 14, maxWidth: 540, margin: '0 auto 14px' }}>
              Ready to stop guessing and start scaling?
            </h2>
            <p style={{ fontSize: 16, color: '#717171', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
              Book a free 30-minute growth blueprint call. We'll find leaks in your current setup and map out a system to fix them.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }}>Book Free Audit <ArrowRight size={14} /></button></Link>
              <a href="/content-studio">
                <button className="btn-ghost" style={{ padding: '12px 24px', fontSize: 15 }}>Try Content Studio Free</button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @media(max-width:768px){
          [style*="gridTemplateColumns: '80px 1fr auto'"]{grid-template-columns:1fr!important;gap:8px!important;}
          [style*="auto"]:last-child{display:none}
        }
      `}</style>
    </div>
  );
};

export default Home;
