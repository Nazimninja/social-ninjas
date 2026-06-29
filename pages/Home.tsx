import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Bot, Send, Sparkles, Zap, Smartphone, ChevronRight } from 'lucide-react';
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
  {
    name: 'Priya Mehta', initials: 'PM',
    role: 'Founder', company: 'Glow Republic', industry: 'Skincare · Mumbai',
    impact: '4.2× ROAS', impactDetail: 'from 1.8× in 60 days',
    color: '#e879a0',
    text: 'In 60 days our ROAS went from 1.8 to 4.2. Our old agency gave us pretty charts. Social Ninja\'s gave us actual results — revenue we could see in our Shopify dashboard.',
    stars: 5, verified: true, platform: 'Meta Ads'
  },
  {
    name: 'Rahul Sharma', initials: 'RS',
    role: 'Fitness Coach', company: 'FitWithRahul', industry: 'Fitness · Delhi',
    impact: '2K → 18K', impactDetail: 'Instagram followers in 3 months',
    color: '#34d399',
    text: 'Went from 2,000 to 18,000 followers in 3 months just by being consistent with the scripts they write for me. I just read them on camera. The AI knows my niche better than most agencies.',
    stars: 5, verified: true, platform: 'Instagram'
  },
  {
    name: 'Vikram Singh', initials: 'VS',
    role: 'Founder & CEO', company: 'Velocity Logistics', industry: 'Logistics · Bengaluru',
    impact: '40% lower CPL', impactDetail: 'Cost per lead in 2 weeks',
    color: '#5ba4f5',
    text: 'They found leaks in our ad account we didn\'t know existed. Two weeks later our cost per lead dropped 40%. Literally saved our Q4 — that\'s real money back in our pocket.',
    stars: 5, verified: true, platform: 'Google Ads'
  },
  {
    name: 'Fatima Al-Rashidi', initials: 'FA',
    role: 'Head of Marketing', company: 'Al-Futtaim Group', industry: 'Retail · Dubai, UAE',
    impact: '4.5× ROAS', impactDetail: 'across 3 markets simultaneously',
    color: '#f59e0b',
    text: 'No jargon, no fluff. Just clear numbers showing what we spent and what we made. They treat our budget like their own money — and the reporting is transparent to a level I haven\'t seen before.',
    stars: 5, verified: true, platform: 'Meta + Google'
  },
  {
    name: 'Michael Ross', initials: 'MR',
    role: 'VP of Sales', company: 'SaaSify', industry: 'B2B SaaS · London, UK',
    impact: '2× Close Rate', impactDetail: 'with the same sales team size',
    color: '#a78bfa',
    text: 'My sales team now only talks to people who actually want to buy. Our close rate doubled because we stopped wasting time on bad leads. The AI lead qualification is genuinely impressive.',
    stars: 5, verified: true, platform: 'LinkedIn Ads'
  },
];

// Interactive Demo Chat Scripts
const demoScripts = {
  ecommerce: [
    { sender: 'lead', text: "Hi, do you offer discounts on the Summer Jacket?" },
    { sender: 'ai', text: "Hey! Yes, we have a limited 10% off code: SUMMER10. Would you like me to check if your size is in stock? 🧥" },
    { sender: 'lead', text: "Yes please, size Medium." },
    { sender: 'ai', text: "Good news—we have only 3 left in Medium! I can generate a direct checkout link for you. Ready? ⚡" },
    { sender: 'lead', text: "Perfect, send it over." },
    { sender: 'ai', text: "Here you go: buy.glowrepublic.com/summer-jacket-m. Let me know once booked! 🛍️" }
  ],
  saas: [
    { sender: 'lead', text: "Can this system sync qualified leads to our HubSpot CRM?" },
    { sender: 'ai', text: "Absolutely! The AI Agent enriches company data and moves lead stages in HubSpot instantly. Do you currently use HubSpot? 🤖" },
    { sender: 'lead', text: "Yes, but our sales reps waste hours on manual updates." },
    { sender: 'ai', text: "We automate 90% of HubSpot admin. Let's schedule a 15-minute integration blueprint call. What's your business email?" },
    { sender: 'lead', text: "rahul@saasify.co" },
    { sender: 'ai', text: "Perfect! I've sent a calendar link to rahul@saasify.co. Or book directly: calendar.socialninjas.in/saas. 🚀" }
  ],
  agency: [
    { sender: 'lead', text: "What is your B2B client acquisition strategy?" },
    { sender: 'ai', text: "We build custom scrapers, warm up domains, and deploy outbound email agents. What service area are you targeting? 🌎" },
    { sender: 'lead', text: "Logistics and warehousing companies in India." },
    { sender: 'ai', text: "Excellent, we've grown logistics firms by 3x. Let's jump on a quick 1-on-1 ad audit. What is your phone number?" },
    { sender: 'lead', text: "9876543210" },
    { sender: 'ai', text: "Awesome. I've scheduled a placeholder call. Our growth strategist will call you at 9876543210 shortly! 📞" }
  ]
};

const Home: React.FC = () => {
  useReveal();
  const [currentT, setCurrentT] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Interactive Playground State
  const [activeTab, setActiveTab] = useState<'ecommerce' | 'saas' | 'agency'>('ecommerce');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scriptIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto rotate testimonials
  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setCurrentT(p => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [hovered]);

  // Restart chat demo on tab change
  useEffect(() => {
    // Clear existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Reset states
    setMessages([]);
    scriptIndexRef.current = 0;
    setIsTyping(false);

    // Play demo script
    playNextMessage();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab]);

  const playNextMessage = () => {
    const currentScript = demoScripts[activeTab];
    const currentIndex = scriptIndexRef.current;

    if (currentIndex >= currentScript.length) {
      // Loop back after 6 seconds
      timerRef.current = setTimeout(() => {
        setMessages([]);
        scriptIndexRef.current = 0;
        playNextMessage();
      }, 6000);
      return;
    }

    const currentMsg = currentScript[currentIndex];
    
    if (currentMsg.sender === 'ai') {
      // Show typing state first for AI
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, currentMsg]);
        scriptIndexRef.current = currentIndex + 1;
        
        // Wait before next lead message
        timerRef.current = setTimeout(playNextMessage, 2000);
      }, 1500);
    } else {
      // Lead message displays instantly
      setMessages(prev => [...prev, currentMsg]);
      scriptIndexRef.current = currentIndex + 1;
      
      // Wait before showing AI reply
      timerRef.current = setTimeout(playNextMessage, 1000);
    }
  };

  return (
    <div className="page-bg overflow-x-hidden" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" /><div className="amb-4" />
      <SEO
        title="Social Ninja's | We Help Brands Get More Customers"
        description="AI automation, paid ads, and content creation that actually works. Book a free strategy call and see exactly how we'd grow your business."
        keywords="performance marketing India, AI automation agency, social media growth agency Dubai, AI marketing tools India, content creation agency, digital marketing for small business, AI ads agency, social media management India, growth marketing agency"
      />

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 130, paddingBottom: 80, overflow: 'hidden' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }} className="hero-grid-cols">
            
            {/* HERO LEFT */}
            <div>
              <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 50, background: 'rgba(91,164,245,0.06)', border: '1px solid rgba(91,164,245,0.18)', fontSize: 11, fontWeight: 600, color: '#5ba4f5', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                Helping 150+ brands scale with AI
              </div>
              
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(44px,6.5vw,76px)', fontWeight: 700, lineHeight: 0.96, letterSpacing: '-2.5px', marginBottom: 16, color: 'rgba(255,255,255,0.96)' }}>
                We build systemized<br />
                <span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                  AI Sales Pipelines.
                </span>
              </h1>
              
              <p className="reveal d2" style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.68, maxWidth: 500, marginBottom: 36 }}>
                Stop losing leads to slow response times. We combine custom <strong style={{ color: '#fff', fontWeight: 500 }}>AI Lead Agents, high-converting paid media, and content systems</strong> to capture, qualify, and close customers 24/7.
              </p>
              
              <div className="reveal d3 hero-buttons-container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14.5, padding: '14px 28px' }}>Get Free Growth Audit <ArrowRight size={15} /></button></Link>
                <Link to="/services"><button className="btn-ghost" style={{ fontSize: 14.5 }}>See Our Systems →</button></Link>
              </div>
              
              <div className="reveal d4" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {[['4.8×','Average ROAS'], ['₹40Cr+','Ad Spend Managed'], ['97%','Retention Rate']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO RIGHT - INTERACTIVE PLAYGROUND */}
            <div className="reveal-r d2 hero-dashboard" style={{ width: '100%' }}>
              <div className="glass-card" style={{ borderRadius: 26, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
                
                {/* Header bar */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.35)' }}>AI Lead Qualification Sandbox</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                    <span style={{ fontSize: 9.5, color: '#34d399', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live Demo</span>
                  </div>
                </div>

                {/* Tab switchers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {(['ecommerce', 'saas', 'agency'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: '12px 6px',
                        background: activeTab === tab ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: 'none',
                        borderBottom: activeTab === tab ? '2px solid #5ba4f5' : '2px solid transparent',
                        color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        transition: 'all 0.2s',
                        fontFamily: "'DM Sans', sans-serif"
                      }}
                    >
                      {tab === 'ecommerce' ? '🛍️ D2C Ecom' : tab === 'saas' ? '💻 B2B SaaS' : '🚀 Agency Audit'}
                    </button>
                  ))}
                </div>

                {/* Simulator Area */}
                <div style={{ padding: '24px 20px', minHeight: 280, display: 'flex', flexDirection: 'column', gap: 14, background: 'rgba(4,8,18,0.2)' }}>
                  {messages.length === 0 && !isTyping && (
                    <div style={{ margin: 'auto', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12.5, fontFamily: "'JetBrains Mono'" }}>
                      Initializing agent simulation...
                    </div>
                  )}

                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'ai' ? 'flex-start' : 'flex-end',
                        animation: 'fadeUp 0.3s ease forwards'
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '85%',
                          padding: '11px 15px',
                          borderRadius: 16,
                          fontSize: 13,
                          lineHeight: 1.5,
                          background: msg.sender === 'ai' ? 'rgba(91,164,245,0.09)' : 'rgba(255,255,255,0.05)',
                          border: msg.sender === 'ai' ? '1px solid rgba(91,164,245,0.18)' : '1px solid rgba(255,255,255,0.08)',
                          color: msg.sender === 'ai' ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.8)',
                          borderBottomLeftRadius: msg.sender === 'ai' ? 4 : 16,
                          borderBottomRightRadius: msg.sender === 'ai' ? 16 : 4,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8
                        }}
                      >
                        {msg.sender === 'ai' && <Bot size={14} color="#5ba4f5" style={{ marginTop: 2, flexShrink: 0 }} />}
                        <span>{msg.text}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ background: 'rgba(91,164,245,0.07)', border: '1px solid rgba(91,164,245,0.12)', borderRadius: 16, borderBottomLeftRadius: 4, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite' }} />
                        <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite 0.2s' }} />
                        <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite 0.4s' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Input Bar Mockup */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '8px 14px', fontSize: 12, color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Ask AI Agent a question...</span>
                    <Send size={12} style={{ opacity: 0.3 }} />
                  </div>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <button style={{ background: 'linear-gradient(135deg, #2563eb, #5ba4f5)', border: 'none', borderRadius: 20, padding: '8px 16px', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Build Mine <Zap size={10} fill="#fff" />
                    </button>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', overflow: 'hidden', background: 'rgba(8,16,31,0.6)' }}>
        <div className="ticker-track">
          {['Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants','Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants'].map((b,i) => (
            <span key={i} style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 26, color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap', fontStyle: 'italic' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow reveal">Our Systems</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-1.5px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.05 }}>
              Everything your brand needs<br />to acquire customers.
            </h2>
          </div>
          <Link to="/services" className="reveal d2"><button className="btn-ghost">See All Services →</button></Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="services-grid">
          {[
            { icon: '🤖', title: 'AI Automation & Pipelines', sub: 'Maximize Lead Capture', desc: 'AI sales agents that reply in under 1 second, qualify leads, and book strategy meetings directly to your calendar 24/7.', link: '/services/ai-automation', color: '#5ba4f5' },
            { icon: '🚀', title: 'Paid Media Management', sub: 'Scale Profitably', desc: 'Creative-first Meta and Google ad campaigns optimized for gross profit margins. Average client performance is 4.5× ROAS.', link: '/services/performance-marketing', color: '#818cf8' },
            { icon: '⚡', title: 'AI Content Engine', sub: 'Automate Content Studio', desc: 'Trending keywords research, automated captions writing, Reel script scripting, and carousel generators running in 60 seconds.', link: '/standalone-landing/', color: '#2fcf8e' },
          ].map((s,i) => {
            const isExternal = s.link.startsWith('/standalone-landing/');
            const CardContent = (
              <div className={`glass-card reveal d${i+1}`} style={{ padding: 32, height: '100%', cursor: 'pointer', borderRadius: 24, borderTop: `3px solid ${s.color}30`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}10`, border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.sub}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.4px', marginBottom: 12, lineHeight: 1.25, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: s.color, transition: 'gap 0.2s' }} className="service-card-cta">
                  Explore System <ChevronRight size={14} />
                </div>
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

      {/* AI AGENT ADVANTAGE */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '100px 24px', background: 'rgba(4,8,18,0.4)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            
            <div className="reveal-l">
              <div className="eyebrow" style={{ marginBottom: 16 }}>Operational Blueprint</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 1.04, marginBottom: 24, color: 'rgba(255,255,255,0.96)' }}>
                Your competitors sleep.<br /><span style={{ color: '#5ba4f5' }}>Your AI Agent doesn't.</span>
              </h2>
              <p style={{ fontSize: 15.5, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: 32, borderLeft: '2px solid rgba(91,164,245,0.3)', paddingLeft: 20 }}>
                Most companies take 47 hours to reply to a new sales lead. By then, the lead has already bought from a faster competitor. Our custom AI Agents qualify inbound leads in under 1 second, book them directly into your calendar, and hand them off to your sales team only when they are ready to buy.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14.5 }}>Deploy AI Sales Agent <ArrowRight size={15} /></button></Link>
            </div>
            
            <div className="reveal-r d2">
              <div className="glass-card" style={{ borderRadius: 24, padding: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bot size={16} color="#5ba4f5" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 14.5 }}>AI Agent Efficiency Metric</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} /><span style={{ fontSize: 10, color: '#34d399', fontWeight: 700, letterSpacing: '0.05em' }}>ONLINE</span></div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['Inquiries Engaged Today','142 Leads','rgba(255,255,255,0.9)'],
                    ['Meetings Scheduled','18 Calendar Syncs','#5ba4f5'],
                    ['Average AI Response Speed','0.8 seconds','#34d399'],
                    ['Close Rate Multiplier','3.2× Efficiency','#818cf8']
                  ].map(([l,v,c]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '13px 16px' }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)' }}>{l}</span>
                      <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13.5, fontWeight: 600, color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT ENGINE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div className="glass-card reveal" style={{ borderRadius: 28, overflow: 'hidden', padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }} className="hero-grid-cols">
            
            <div style={{ padding: '56px 48px' }} className="hero-grid-cols">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(47,207,142,0.1)', border: '1px solid rgba(47,207,142,0.2)', fontSize: 10, fontWeight: 700, color: '#34d399', marginBottom: 20 }}>🟢 Ready Stack</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 16, color: 'rgba(255,255,255,0.95)' }}>
                Scale outbound creative<br /><span style={{ color: '#2fcf8e' }}>without agency drag.</span>
              </h2>
              <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, marginBottom: 28, maxWidth: 420 }}>
                Every week, our AI Content Engine aggregates popular trending topics in your niche, then automatically scripts and maps your caption hooks, video scripts, carousel outlines, and keywords in under 60 seconds.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Scans competitor trends and B2B keywords first','Generates multi-slide layouts and video hooks','Maintains consistent brand voice and guidelines','Try it free for 3 posts. No card needed.'].map((t,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                    <ShieldCheck size={16} color="#2fcf8e" style={{ flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/standalone-landing/" style={{ textDecoration: 'none' }}><button className="btn-primary" style={{ background: 'linear-gradient(135deg, #15803d, #2fcf8e)', boxShadow: '0 4px 20px rgba(47,207,142,0.3)', fontSize: 14 }}>Try Content Studio Free</button></a>
                <a href="/standalone-landing/" style={{ textDecoration: 'none' }}><button className="btn-ghost" style={{ fontSize: 14 }}>See Examples →</button></a>
              </div>
            </div>

            {/* Content Mockup Card Column */}
            <div style={{ background: 'rgba(0,0,0,0.2)', borderLeft: '1px solid rgba(255,255,255,0.06)', padding: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map((c,i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
                <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.32)' }}>Engine active → writing caption stack...</span>
              </div>
              
              {[{n:'GEN 01 · INSTAGRAM NATIVE',t:'Popular',w:['94%','80%','68%']},{n:'GEN 02 · LINKEDIN AUTHORITY',t:'Viral',w:['88%','92%','72%']}].map((p,i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: '#2fcf8e', letterSpacing: '0.05em' }}>{p.n}</span>
                    <span style={{ fontSize: 8.5, padding: '2px 8px', borderRadius: 8, background: 'rgba(47,207,142,0.1)', color: '#2fcf8e', border: '1px solid rgba(47,207,142,0.15)' }}>{p.t}</span>
                  </div>
                  {p.w.map((w,j) => <div key={j} style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', marginBottom: 5, width: w }} />)}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    {['B2B Caption','Video Script','Slide Deck','Keywords'].map((tab,j) => <span key={j} style={{ fontSize: 8.5, padding: '3px 9px', borderRadius: 14, background: j===0?'rgba(47,207,142,0.12)':'rgba(255,255,255,0.03)', color: j===0?'#2fcf8e':'rgba(255,255,255,0.32)', border: j===0?'1px solid rgba(47,207,142,0.18)':'none' }}>{tab}</span>)}
                  </div>
                </div>
              ))}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0', opacity: 0.5 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#2fcf8e', animation: `pulse ${0.8+i*0.15}s ease-in-out infinite` }} />)}
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono'" }}>Scripting Post 03 · Short Format...</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
          
          <div className="reveal-l">
            <div className="eyebrow">Social Proof</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20, color: 'rgba(255,255,255,0.95)' }}>
              Our clients don't just stay.<br /><span style={{ color: '#5ba4f5' }}>They scale.</span>
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: 32, maxWidth: 400 }}>97% of clients continue working with us month-over-month. We build transparent partnerships built on clear economic metrics.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['4.9★','Client Satisfaction','🌟'],
                ['97%','Monthly Retention','📈'],
                ['150+','Partner Brands','🌎'],
                ['₹40Cr+','Managed Media Spend','💰']
              ].map(([n,l,ic]) => (
                <div key={l} className="glass-card" style={{ padding: '20px 22px', borderRadius: 18 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="reveal-r d1" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: '100%' }}>
            <div className="glass-card" style={{ borderRadius: 28, padding: 0, overflow: 'hidden', minHeight: 360, position: 'relative' }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ position: i===0?'relative':'absolute', inset: 0, padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)', opacity: i===currentT?1:0, transform: i===currentT?'translateX(0)':'translateX(36px)', pointerEvents: i===currentT?'auto':'none' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ display: 'flex', gap: 3 }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={12} fill="#5ba4f5" color="#5ba4f5" />)}</div>
                      <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 50, background: 'rgba(47,207,142,0.1)', border: '1px solid rgba(47,207,142,0.2)', color: '#34d399', fontWeight: 700, letterSpacing: '0.06em' }}>✓ PARTNER</div>
                    </div>
                    
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: t.color, letterSpacing: '-0.4px' }}>{t.impact}</span>
                      {t.impactDetail && <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)', marginLeft: 6, fontWeight: 400 }}>{t.impactDetail}</span>}
                    </div>
                    
                    <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>"{t.text}"</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${t.color}35,${t.color}15)`, border: `1.5px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: t.color, flexShrink: 0 }}>{t.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.92)' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{t.role} · <span style={{ color: 'rgba(255,255,255,0.52)' }}>{t.company}</span></div>
                    </div>
                    <div style={{ fontSize: 9, padding: '3px 8px', borderRadius: 4, background: `${t.color}10`, border: `1px solid ${t.color}25`, color: t.color, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>{t.platform}</div>
                  </div>
                </div>
              ))}
              
              <div style={{ position: 'absolute', bottom: 24, right: 28, display: 'flex', gap: 6, zIndex: 10 }}>
                {testimonials.map((_,i) => <button key={i} onClick={() => setCurrentT(i)} style={{ height: 4, borderRadius: 2, background: i===currentT?'#5ba4f5':'rgba(255,255,255,0.2)', width: i===currentT?22:7, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FINAL CALL TO ACTION */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 100px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.65)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 16, color: 'rgba(255,255,255,0.96)' }}>
            Ready to build your AI Sales pipeline?
          </h2>
          <p style={{ fontSize: 16.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 36, maxWidth: 480, margin: '0 auto' }}>
            Book a free 30-minute integration blueprint call. We will audit your current pipeline, find lead leaks, and map out your custom AI Sales Agent.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: '16px 36px' }}>Book My Blueprint Audit</button></Link>
            <a href="/standalone-landing/"><button className="btn-ghost" style={{ fontSize: 15 }}>⚡ Try Content Engine Free</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        
        .ticker-track { display: flex; gap: 52px; width: max-content; animation: tickerRun 32s linear infinite; }
        @keyframes tickerRun { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        
        @media(max-width:900px){
          .hero-grid-cols { grid-template-columns: 1fr!important; gap: 48px!important; }
          .hero-dashboard { margin-top: 16px!important; }
          .hero-buttons-container { justify-content: center; }
          section { text-align: center; }
          .eyebrow { justify-content: center; }
        }
        @media(max-width:768px){
          .services-grid { grid-template-columns: 1fr!important; }
        }
        @media(max-width:480px){
          .hero-grid-cols { padding: 0 4px!important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
