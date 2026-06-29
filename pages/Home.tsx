import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  Smartphone, 
  ChevronRight,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Globe,
  Sliders
} from 'lucide-react';
import SEO from '../components/SEO';

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
  const [currentT, setCurrentT] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Interactive Playground State
  const [activeTab, setActiveTab] = useState<'ecommerce' | 'saas' | 'agency'>('ecommerce');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scriptIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive ROAS Calculator State
  const [budget, setBudget] = useState(500000); // ₹5L default
  const estimatedROAS = 4.5;
  const projectedRevenue = budget * estimatedROAS;
  const estimatedLeads = Math.floor(budget / 320); // ₹320 CPL average

  // Scroll target ref for hero animations
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Apple-style scroll transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.93]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const dashboardScale = useTransform(scrollYProgress, [0, 0.8], [0.94, 1.05]);
  const dashboardY = useTransform(scrollYProgress, [0, 0.8], [30, -10]);
  const dashboardBorderRadius = useTransform(scrollYProgress, [0, 0.8], ["24px", "12px"]);

  // Auto rotate testimonials
  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setCurrentT(p => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [hovered]);

  // Restart chat demo on tab change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setMessages([]);
    scriptIndexRef.current = 0;
    setIsTyping(false);

    playNextMessage();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab]);

  const playNextMessage = () => {
    const currentScript = demoScripts[activeTab];
    const currentIndex = scriptIndexRef.current;

    if (currentIndex >= currentScript.length) {
      timerRef.current = setTimeout(() => {
        setMessages([]);
        scriptIndexRef.current = 0;
        playNextMessage();
      }, 6000);
      return;
    }

    const currentMsg = currentScript[currentIndex];
    
    if (currentMsg.sender === 'ai') {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, currentMsg]);
        scriptIndexRef.current = currentIndex + 1;
        timerRef.current = setTimeout(playNextMessage, 2000);
      }, 1500);
    } else {
      setMessages(prev => [...prev, currentMsg]);
      scriptIndexRef.current = currentIndex + 1;
      timerRef.current = setTimeout(playNextMessage, 1000);
    }
  };

  return (
    <div className="page-bg overflow-x-hidden min-h-screen relative" style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: '#030712' }}>
      <div className="amb-1" style={{ opacity: 0.15 }} />
      <div className="amb-2" style={{ opacity: 0.15 }} />
      <div className="amb-3" style={{ opacity: 0.15 }} />
      <SEO
        title="Social Ninja's | AI-Powered Performance Marketing Agency"
        description="AI automation, paid ads, and content creation that actually works. Book a free strategy call and see exactly how we'd grow your business."
        keywords="performance marketing India, AI automation agency, social media growth agency Dubai, AI marketing tools India, content creation agency, digital marketing for small business, AI ads agency, social media management India, growth marketing agency"
      />

      {/* HERO SECTION */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '130vh', paddingTop: 130, paddingBottom: 80, overflow: 'hidden' }}>
        <div className="hero-grid" style={{ opacity: 0.08 }} />
        
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', width: '100%', position: 'relative', zIndex: 10 }}>
          
          {/* Scroll-fading Hero Header */}
          <motion.div 
            style={{ 
              scale: heroScale, 
              opacity: heroOpacity, 
              y: heroTranslateY,
              textAlign: 'center', 
              marginBottom: 48 
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 50, background: 'rgba(91,164,245,0.06)', border: '1px solid rgba(91,164,245,0.18)', fontSize: 11, fontWeight: 600, color: '#5ba4f5', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              Accelerating Brand Scale via Automation & Math
            </div>
            
            <h1 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(36px,5.8vw,68px)', fontWeight: 800, lineHeight: 0.98, letterSpacing: '-2.5px', marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
              We engineer systemized<br />
              <span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                AI Sales Pipelines.
              </span>
            </h1>
            
            <p style={{ fontSize: 'clamp(14px,1.6vw,16.5px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 28px' }}>
              Stop losing leads to slow responses. We combine custom <strong style={{ color: '#fff', fontWeight: 500 }}>AI Agents, data-driven paid media, and content workflows</strong> to capture, qualify, and book clients 24/7.
            </p>
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px' }}>Book Free Audit <ArrowRight size={14} /></button></Link>
              <Link to="/services"><button className="btn-ghost" style={{ fontSize: 14 }}>Explore Systems →</button></Link>
            </div>
            
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['4.8×','Average ROAS'], ['₹40Cr+','Media Spend Managed'], ['97%','Client Retention']].map(([n,l]) => (
                <div key={l} style={{ minWidth: 120 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll-linked Expanding Dashboard */}
          <motion.div 
            style={{ 
              scale: dashboardScale, 
              y: dashboardY,
              borderRadius: dashboardBorderRadius,
              width: '100%', 
              maxWidth: 960,
              margin: '0 auto',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
            }}
            className="hero-dashboard"
          >
            <div className="glass-card" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              
              {/* Header bar */}
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.35)' }}>AI Lead Qualification Sandbox</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                  <span style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Simulation Active</span>
                </div>
              </div>

              {/* Tab switchers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {(['ecommerce', 'saas', 'agency'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '14px 6px',
                      background: activeTab === tab ? 'rgba(255,255,255,0.04)' : 'transparent',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid #5ba4f5' : '2px solid transparent',
                      color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                      fontSize: 10.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab === 'ecommerce' ? '🛍️ D2C Ecom' : tab === 'saas' ? '💻 B2B SaaS' : '🚀 Agency Leads'}
                  </button>
                ))}
              </div>

              {/* Simulator Area */}
              <div style={{ padding: '24px 20px', minHeight: 280, display: 'flex', flexDirection: 'column', gap: 14, background: 'rgba(4,8,18,0.35)' }}>
                {messages.length === 0 && !isTyping && (
                  <div style={{ margin: 'auto', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, fontFamily: "'JetBrains Mono'" }}>
                    Initializing client handoff simulation...
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
                        padding: '11px 16px',
                        borderRadius: 16,
                        fontSize: 13,
                        lineHeight: 1.5,
                        background: msg.sender === 'ai' ? 'rgba(91,164,245,0.08)' : 'rgba(255,255,255,0.04)',
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

                {isTyping && (
                  <div style={{ display: 'flex', justifySelf: 'flex-start' }}>
                    <div style={{ background: 'rgba(91,164,245,0.07)', border: '1px solid rgba(91,164,245,0.12)', borderRadius: 16, borderBottomLeftRadius: 4, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite' }} />
                      <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite 0.2s' }} />
                      <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ba4f5', animation: 'bounce 1s infinite 0.4s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Input Bar Mockup */}
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '8px 14px', fontSize: 12, color: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Simulating lead responses...</span>
                  <Send size={11} style={{ opacity: 0.3 }} />
                </div>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button style={{ background: 'linear-gradient(135deg, #2563eb, #5ba4f5)', border: 'none', borderRadius: 20, padding: '8px 16px', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Build Mine <Zap size={10} fill="#fff" />
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', overflow: 'hidden', background: 'rgba(8,16,31,0.4)' }}>
        <div className="ticker-track">
          {['Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants','Priya Skincare','FitLife Studio','Velocity Logistics','Lumina Skin','SaaSify','Al-Futtaim','CareRev','D2C Fashion Co','EdTech India','B2B Consultants'].map((b,i) => (
            <span key={i} style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 26, color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap', fontStyle: 'italic', margin: '0 24px' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ASYMMETRIC BENTO GRID - OUR SERVICES */}
      <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(91,164,245,0.05)', border: '1px solid rgba(91,164,245,0.15)', fontSize: 10, fontWeight: 700, color: '#5ba4f5', textTransform: 'uppercase', marginBottom: 14 }}>Core Capabilities</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.05 }}>
              High-converting systems<br />designed for rapid brand growth.
            </h2>
          </div>

          {/* Bento Box Grid */}
          <div className="bento-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            
            {/* Box 1 (Large - AI Lead Automation) - Spans 3 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 3', padding: '36px', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 240, background: 'radial-gradient(circle, rgba(91,164,245,0.12) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(91,164,245,0.1)', border: '1px solid rgba(91,164,245,0.2)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 20, marginBottom: 20 }}>🤖</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5ba4f5', marginBottom: 6 }}>SYSTEM 01</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 21, fontWeight: 700, color: '#fff', marginBottom: 10 }}>AI Automation & Conversational Pipelines</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 420 }}>
                  We deploy automated conversational sales agents that reply to Instagram DMs, web forms, and WhatsApp inquiries in under 1 second. The AI qualifies leads based on criteria, and shares calendar links instantly.
                </p>
              </div>

              {/* Graphic/Interactive visual */}
              <div style={{ marginTop: 28, padding: '16px 20px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>AI Agent qualifying workflow</span>
                  <span style={{ color: '#34d399' }}>● Active</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 11.5, background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>📥 Lead Arrived</div>
                  <div style={{ color: 'rgba(255,255,255,0.2)' }}>➡️</div>
                  <div style={{ fontSize: 11.5, background: 'rgba(91,164,245,0.08)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(91,164,245,0.18)', color: '#5ba4f5', fontWeight: 600 }}>💬 Auto-Qualified (0.8s)</div>
                  <div style={{ color: 'rgba(255,255,255,0.2)' }}>➡️</div>
                  <div style={{ fontSize: 11.5, background: 'rgba(52,211,153,0.08)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(52,211,153,0.18)', color: '#34d399', fontWeight: 600 }}>📅 Handoff (Call Booked)</div>
                </div>
              </div>
            </div>

            {/* Box 2 (Medium - Paid Ads Media Buying) - Spans 2 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 2', padding: '30px', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 20, marginBottom: 18 }}>🚀</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#818cf8', marginBottom: 6 }}>SYSTEM 02</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Paid Ads & Math Media</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  Creative-first campaign architecture built on strict margin math. Average client scales to 4.5x+ ROAS.
                </p>
              </div>

              {/* Interactive ROAS Calculator Graphic */}
              <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Sliders size={9} /> Budget Adjuster</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: '#818cf8' }}>₹{(budget/100000).toFixed(1)}L/mo</span>
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="5000000" 
                  step="100000"
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#818cf8', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', cursor: 'pointer', marginBottom: 12 }} 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: 8 }}>
                    <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.3)' }}>Qualified Leads</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono'" }}>{estimatedLeads}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: 8 }}>
                    <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.3)' }}>ROAS Revenue</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#34d399', fontFamily: "'JetBrains Mono'" }}>₹{(projectedRevenue/100000).toFixed(1)}L</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3 (Medium - AI Content Studio) - Spans 2 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 2', padding: '30px', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, background: 'radial-gradient(circle, rgba(47,207,142,0.12) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(47,207,142,0.1)', border: '1px solid rgba(47,207,142,0.2)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 20, marginBottom: 18 }}>⚡</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2fcf8e', marginBottom: 6 }}>SYSTEM 03</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 8 }}>AI Content Engine</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  Automatically aggregate viral topics in your niche, scripting content loops, headlines, and captions in 60s.
                </p>
              </div>

              {/* Carousel preview graphics */}
              <div style={{ marginTop: 22, height: 80, position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="bento-creative-strip-item" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(47,207,142,0.06)', border: '1px solid rgba(47,207,142,0.15)', borderRadius: 10, padding: '8px 12px', fontSize: 10, color: '#2fcf8e' }}>
                    <span>✍️ Hook: "B2B Outbound Deliverability in 2026..."</span>
                    <span style={{ fontWeight: 700 }}>98% Match</span>
                  </div>
                </div>
                <div className="bento-creative-strip-item" style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 12px', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                    <span>🎞️ YouTube Script draft complete.</span>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 4 (Large - Unified Tools Hub Ecosystem) - Spans 3 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 3', padding: '36px', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 240, background: 'radial-gradient(circle, rgba(147,139,250,0.1) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 20, marginBottom: 20 }}>🌎</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 6 }}>PRODUCT ECOSYSTEM</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 21, fontWeight: 700, color: '#fff', marginBottom: 10 }}>The Unified Growth Hub</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 420 }}>
                  Consolidating your traffic and SEO value under one roof. Access our live micro-tools, calculators, and software platforms hosted directly inside the brand network.
                </p>
              </div>

              {/* Mini Tools Hub badges list */}
              <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://linkwa.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 12, padding: '8px 12px', color: '#25D366', textDecoration: 'none', fontWeight: 600 }}>WhatsApp LinkWA ↗</a>
                <a href="https://salary.socialninjas.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, padding: '8px 12px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Salary calculators ↗</a>
                <a href="https://fit.socialninjas.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '8px 12px', color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>Fit Ninja Coach ↗</a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REVELATION: COMPARATIVE COMPARISON */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '100px 0', background: 'rgba(4,8,18,0.25)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
            
            <div className="reveal-l">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(91,164,245,0.05)', border: '1px solid rgba(91,164,245,0.15)', fontSize: 10, fontWeight: 700, color: '#5ba4f5', textTransform: 'uppercase', marginBottom: 14 }}>Operational Strategy</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.04, marginBottom: 20, color: '#fff' }}>
                Your competitors sleep.<br /><span style={{ color: '#5ba4f5' }}>Your AI Agent doesn't.</span>
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 28, borderLeft: '2px solid rgba(91,164,245,0.3)', paddingLeft: 18 }}>
                Most companies take 47 hours to reply to a new lead. By then, they've already moved on. Our custom AI Agents qualify inbound leads in under 1 second, book them into calendars, and hand them off only when they are ready to transact.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14 }}>Deploy AI Sales Agent <ArrowRight size={14} /></button></Link>
            </div>
            
            <div className="reveal-r d2">
              <div className="glass-card" style={{ borderRadius: 24, padding: 32, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bot size={16} color="#5ba4f5" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>AI Agent Operational Efficiency</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} /><span style={{ fontSize: 9.5, color: '#34d399', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE</span></div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['Inquiries Handled Automically','142 Leads','rgba(255,255,255,0.9)'],
                    ['Meetings Instantly Scheduled','18 Syncs','#5ba4f5'],
                    ['Average Agent Reply Speed','0.8 seconds','#34d399'],
                    ['Handoff Pipeline Velocity','3.2× Increase','#818cf8']
                  ].map(([l,v,c]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px' }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)' }}>{l}</span>
                      <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600, color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COHESIVE SYSTEM SHOWCASE - THE SOCIAL NINJAS "CIRCLE" */}
      <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)', fontSize: 10, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 14 }}>Unified Platform</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.05 }}>
              The Social Ninjas Ecosystem.
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '10px auto 0' }}>
              We build, launch, and scale dedicated software products. All connected under our secure, blazing-fast web circle.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="tools-circle-grid">
            
            {/* Tool 1 */}
            <a href="https://linkwa.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '24px', borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.18)', color: '#25D366', fontSize: 9.5, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 18 }}>🟢 LinkWA Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>WhatsApp Generator</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.5 }}>
                    Generate custom wa.me links with pre-filled campaign messages and colored QR codes.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#25D366', fontWeight: 600, marginTop: 20 }}>Launch Tool <ArrowRight size={12} /></div>
              </div>
            </a>

            {/* Tool 2 */}
            <a href="https://salary.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '24px', borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', color: '#3b82f6', fontSize: 9.5, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 18 }}>🟢 Calculator Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>Salary Calculators</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.5 }}>
                    Detailed gross-to-net tax breakdowns, hourly-to-salary converters, and FICA deductions.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#3b82f6', fontWeight: 600, marginTop: 20 }}>Launch Tool <ArrowRight size={12} /></div>
              </div>
            </a>

            {/* Tool 3 */}
            <a href="https://contentstudio.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '24px', borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(47,207,142,0.08)', border: '1px solid rgba(47,207,142,0.18)', color: '#2fcf8e', fontSize: 9.5, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 18 }}>🟢 SaaS Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>AI Content Studio</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.5 }}>
                    Aggregates trending live topics and scripts a whole week of social copy in 60s.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#2fcf8e', fontWeight: 600, marginTop: 20 }}>Launch Studio <ArrowRight size={12} /></div>
              </div>
            </a>

            {/* Tool 4 */}
            <a href="https://fit.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '24px', borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#ef4444', fontSize: 9.5, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 18 }}>🟢 AI Coach Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>Fit Ninja AI Coach</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.5 }}>
                    Personalized diet planning, structured gym workouts, and continuous AI fitness coaching.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#ef4444', fontWeight: 600, marginTop: 20 }}>Launch Coach <ArrowRight size={12} /></div>
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
          
          <div className="reveal-l">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(91,164,245,0.05)', border: '1px solid rgba(91,164,245,0.15)', fontSize: 10, fontWeight: 700, color: '#5ba4f5', textTransform: 'uppercase', marginBottom: 14 }}>Real Validation</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20, color: '#fff' }}>
              Our clients don't just stay.<br /><span style={{ color: '#5ba4f5' }}>They scale.</span>
            </h2>
            <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, marginBottom: 32, maxWidth: 400 }}>97% of clients continue working with us month-over-month. We construct clear, economic outcomes for all our partners.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['4.9★','Client Satisfaction','🌟'],
                ['97%','Monthly Retention','📈'],
                ['150+','Partner Brands','🌎'],
                ['₹40Cr+','Media Spend Managed','💰']
              ].map(([n,l,ic]) => (
                <div key={l} className="glass-card" style={{ padding: '20px 22px', borderRadius: 18 }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.32)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="reveal-r d1" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: '100%' }}>
            <div className="glass-card" style={{ borderRadius: 28, padding: 0, overflow: 'hidden', minHeight: 360, position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ position: i===0?'relative':'absolute', inset: 0, padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)', opacity: i===currentT?1:0, transform: i===currentT?'translateX(0)':'translateX(36px)', pointerEvents: i===currentT?'auto':'none' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ display: 'flex', gap: 3 }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={12} fill="#5ba4f5" color="#5ba4f5" />)}</div>
                      <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 50, background: 'rgba(47,207,142,0.1)', border: '1px solid rgba(47,207,142,0.2)', color: '#34d399', fontWeight: 700, letterSpacing: '0.06em' }}>✓ VERIFIED PARTNER</div>
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
      </section>

      {/* FINAL CALL TO ACTION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 100px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.6)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 16, color: 'rgba(255,255,255,0.96)' }}>
            Ready to deploy your AI Sales Pipeline?
          </h2>
          <p style={{ fontSize: 16.5, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 36, maxWidth: 480, margin: '0 auto' }}>
            Book a free 30-minute growth blueprint audit call. We will locate lead leaks in your sales pipeline, and map out your custom AI qualifier systems.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14.5, padding: '15px 32px' }}>Book My Free Audit</button></Link>
            <a href="https://contentstudio.socialninjas.in"><button className="btn-ghost" style={{ fontSize: 14.5 }}>⚡ Try Content Studio Free</button></a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        
        .ticker-track { display: flex; gap: 52px; width: max-content; animation: tickerRun 32s linear infinite; }
        @keyframes tickerRun { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        
        /* Bento Card Hover Visuals */
        .bento-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.015);
        }
        .bento-card:hover {
          background: rgba(255, 255, 255, 0.035);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.15) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        /* Tools Circle Cards styling */
        .tool-circle-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
        }
        .tool-circle-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 22px;
          border: 1.5px solid transparent;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.5;
        }
        .tool-circle-card:hover {
          background: rgba(255, 255, 255, 0.035);
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.15) !important;
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
        }
        .tool-circle-card:hover svg {
          transform: translateX(4px);
        }
        .tool-circle-card svg {
          transition: transform 0.2s ease-in-out;
        }

        @media(max-width:960px){
          .hero-grid-cols { grid-template-columns: 1fr!important; gap: 48px!important; }
          .hero-dashboard { margin-top: 16px!important; max-width: 100%!important; }
          section { text-align: center; }
          .bento-container { grid-template-columns: 1fr !important; }
          .bento-card { grid-column: span 1 !important; padding: 28px !important; }
          .tools-circle-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
        }
        @media(max-width:560px){
          .tools-circle-grid { grid-template-columns: 1fr !important; }
          .hero-grid-cols { padding: 0 2px!important; }
          section { padding-top: 100px !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
