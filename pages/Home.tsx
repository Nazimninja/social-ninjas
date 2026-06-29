import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  ChevronRight,
  Sliders
} from 'lucide-react';
import SEO from '../components/SEO';

// Custom Scroll Reveal Text Component for line-by-line highlight effect
const ScrollRevealText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.75], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.75], [20, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <motion.div ref={ref} style={{ ...style, opacity: smoothOpacity, y: smoothY }}>
      {children}
    </motion.div>
  );
};

const testimonials = [
  {
    name: 'Priya Mehta', initials: 'PM',
    role: 'Founder', company: 'Glow Republic', industry: 'Skincare · Mumbai',
    impact: '4.2× ROAS', impactDetail: 'from 1.8× in 60 days',
    color: '#d946ef',
    text: 'In 60 days our ROAS went from 1.8 to 4.2. Our old agency gave us pretty charts. Social Ninja\'s gave us actual results — revenue we could see in our Shopify dashboard.',
    stars: 5, verified: true, platform: 'Meta Ads'
  },
  {
    name: 'Rahul Sharma', initials: 'RS',
    role: 'Fitness Coach', company: 'FitWithRahul', industry: 'Fitness · Delhi',
    impact: '2K → 18K', impactDetail: 'Instagram followers in 3 months',
    color: '#8b5cf6',
    text: 'Went from 2,000 to 18,000 followers in 3 months just by being consistent with the scripts they write for me. The AI knows my niche better than most agencies.',
    stars: 5, verified: true, platform: 'Instagram'
  },
  {
    name: 'Vikram Singh', initials: 'VS',
    role: 'Founder & CEO', company: 'Velocity Logistics', industry: 'Logistics · Bengaluru',
    impact: '40% lower CPL', impactDetail: 'Cost per lead in 2 weeks',
    color: '#ec4899',
    text: 'They found leaks in our ad account we didn\'t know existed. Two weeks later our cost per lead dropped 40%. Literally saved our Q4 — that\'s real money back in our pocket.',
    stars: 5, verified: true, platform: 'Google Ads'
  },
  {
    name: 'Fatima Al-Rashidi', initials: 'FA',
    role: 'Head of Marketing', company: 'Al-Futtaim Group', industry: 'Retail · Dubai, UAE',
    impact: '4.5× ROAS', impactDetail: 'across 3 markets simultaneously',
    color: '#a855f7',
    text: 'No jargon, no fluff. Just clear numbers showing what we spent and what we made. They treat our budget like their own money — and the reporting is transparent to a level I haven\'t seen before.',
    stars: 5, verified: true, platform: 'Meta + Google'
  },
  {
    name: 'Michael Ross', initials: 'MR',
    role: 'VP of Sales', company: 'SaaSify', industry: 'B2B SaaS · London, UK',
    impact: '2× Close Rate', impactDetail: 'with the same sales team size',
    color: '#6366f1',
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
  const [budget, setBudget] = useState(1000000); // ₹10L default
  const estimatedROAS = 4.8;
  const projectedRevenue = budget * estimatedROAS;
  const estimatedLeads = Math.floor(budget / 350); // ₹350 CPL average

  // Scroll targets for page parallax
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // spring-smoothed parallax offsets (GSAP style)
  const rawBgOrb1Y = useTransform(scrollY, [0, 3000], [0, 450]);
  const rawBgOrb2Y = useTransform(scrollY, [0, 3000], [0, -350]);
  const rawBgGridY = useTransform(scrollY, [0, 3000], [0, 150]);

  const bgOrb1Y = useSpring(rawBgOrb1Y, { stiffness: 45, damping: 15 });
  const bgOrb2Y = useSpring(rawBgOrb2Y, { stiffness: 45, damping: 15 });
  const bgGridY = useSpring(rawBgGridY, { stiffness: 45, damping: 15 });

  // Hero specific scroll transitions
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const rawHeroScale = useTransform(heroProgress, [0, 0.5], [1, 0.94]);
  const rawHeroOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const rawHeroY = useTransform(heroProgress, [0, 0.4], [0, -40]);
  const rawDashboardScale = useTransform(heroProgress, [0, 0.7], [0.93, 1.03]);
  const rawDashboardY = useTransform(heroProgress, [0, 0.7], [20, -20]);

  const heroScale = useSpring(rawHeroScale, { stiffness: 50, damping: 18 });
  const heroOpacity = useSpring(rawHeroOpacity, { stiffness: 50, damping: 18 });
  const heroY = useSpring(rawHeroY, { stiffness: 50, damping: 18 });
  const dashboardScale = useSpring(rawDashboardScale, { stiffness: 50, damping: 18 });
  const dashboardYSpring = useSpring(rawDashboardY, { stiffness: 50, damping: 18 });

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
    <div ref={pageRef} className="page-bg overflow-x-hidden min-h-screen relative selection:bg-purple-500 selection:text-white" style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: '#050508' }}>
      
      {/* GSAP-Style Dynamic Parallax Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glowing Neon Violet Orb */}
        <motion.div 
          style={{ 
            y: bgOrb1Y,
            position: 'absolute',
            top: '8%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        {/* Glowing Neon Fuchsia Orb */}
        <motion.div 
          style={{ 
            y: bgOrb2Y,
            position: 'absolute',
            top: '35%',
            right: '-15%',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)',
            filter: 'blur(85px)'
          }}
        />
        {/* Additional Ambient Deep Blue Orb */}
        <div 
          style={{ 
            position: 'absolute',
            top: '70%',
            left: '10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 75%)',
            filter: 'blur(90px)'
          }}
        />
        
        {/* Parallax Grid Pattern Overlay */}
        <motion.div 
          style={{ 
            y: bgGridY,
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.8
          }}
        />
      </div>

      <SEO
        title="Social Ninja's | AI-Powered Performance Marketing Agency"
        description="AI automation, paid ads, and content creation that actually works. Book a free strategy call and see exactly how we'd grow your business."
        keywords="performance marketing India, AI automation agency, social media growth agency Dubai, AI marketing tools India, content creation agency, digital marketing for small business, AI ads agency, social media management India, growth marketing agency"
      />

      {/* HERO SECTION */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '115vh', paddingTop: 100, paddingBottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', width: '100%' }}>
          
          {/* Scroll-fading Hero Header */}
          <motion.div 
            style={{ 
              scale: heroScale, 
              opacity: heroOpacity, 
              y: heroY,
              textAlign: 'center',
              marginBottom: 32
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.22)', fontSize: 10.5, fontWeight: 600, color: '#a78bfa', marginBottom: 16 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d946ef', boxShadow: '0 0 8px #d946ef', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              Accelerating Brand Scale via Automation & Math
            </div>
            
            <h1 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2.5px', marginBottom: 16, color: '#fff' }}>
              We engineer systemized<br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                AI Sales Pipelines.
              </span>
            </h1>
            
            <p style={{ fontSize: 'clamp(13.5px,1.5vw,15.5px)', fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.55, maxWidth: 560, margin: '0 auto 24px' }}>
              Stop losing leads to slow responses. We combine custom <strong style={{ color: '#fff', fontWeight: 500 }}>AI Agents, data-driven paid media, and content workflows</strong> to capture, qualify, and book clients 24/7.
            </p>
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
              <Link to="/contact"><button className="btn-primary" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)', border: 'none', boxShadow: '0 4px 20px rgba(139,92,246,0.25)', fontSize: 13.5, padding: '12px 24px' }}>Book Free Audit <ArrowRight size={14} /></button></Link>
              <Link to="/services"><button className="btn-ghost" style={{ fontSize: 13.5, border: '1px solid rgba(255,255,255,0.08)' }}>Explore Systems →</button></Link>
            </div>
            
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['4.8×','Average ROAS'], ['₹40Cr+','Media Spend Managed'], ['97%','Client Retention']].map(([n,l]) => (
                <div key={l} style={{ minWidth: 110 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.32)', marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Expanding Dashboard Container */}
          <motion.div 
            style={{ 
              scale: dashboardScale, 
              y: dashboardYSpring,
              width: '100%', 
              maxWidth: 920,
              margin: '0 auto',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
            }}
            className="hero-dashboard"
          >
            <div className="glass-card" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.6)', backdropFilter: 'blur(20px)' }}>
              
              {/* Header bar */}
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#8b5cf6' }} />
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.3)' }}>AI Lead Qualification Sandbox</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d946ef', boxShadow: '0 0 6px #d946ef' }} />
                  <span style={{ fontSize: 8.5, color: '#d946ef', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Simulation Active</span>
                </div>
              </div>

              {/* Tab switchers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'rgba(255,255,255,0.005)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {(['ecommerce', 'saas', 'agency'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '12px 4px',
                      background: activeTab === tab ? 'rgba(255,255,255,0.03)' : 'transparent',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid #8b5cf6' : '2px solid transparent',
                      color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.35)',
                      fontSize: 10,
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
              <div style={{ padding: '20px 18px', minHeight: 250, display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(3,3,5,0.2)' }}>
                {messages.length === 0 && !isTyping && (
                  <div style={{ margin: 'auto', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 11.5, fontFamily: "'JetBrains Mono'" }}>
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
                        padding: '10px 14px',
                        borderRadius: 14,
                        fontSize: 12.5,
                        lineHeight: 1.45,
                        background: msg.sender === 'ai' ? 'rgba(139,92,246,0.07)' : 'rgba(255,255,255,0.03)',
                        border: msg.sender === 'ai' ? '1px solid rgba(139,92,246,0.15)' : '1px solid rgba(255,255,255,0.06)',
                        color: msg.sender === 'ai' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.78)',
                        borderBottomLeftRadius: msg.sender === 'ai' ? 3 : 14,
                        borderBottomRightRadius: msg.sender === 'ai' ? 14 : 3,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8
                      }}
                    >
                      {msg.sender === 'ai' && <Bot size={13} color="#8b5cf6" style={{ marginTop: 2, flexShrink: 0 }} />}
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', justifySelf: 'flex-start' }}>
                    <div style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)', borderRadius: 14, borderBottomLeftRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="dot" style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: '#8b5cf6', animation: 'bounce 1s infinite' }} />
                      <span className="dot" style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: '#8b5cf6', animation: 'bounce 1s infinite 0.2s' }} />
                      <span className="dot" style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: '#8b5cf6', animation: 'bounce 1s infinite 0.4s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Input Bar Mockup */}
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: '7px 12px', fontSize: 11.5, color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Simulating lead responses...</span>
                  <Send size={10} style={{ opacity: 0.25 }} />
                </div>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', border: 'none', borderRadius: 20, padding: '7px 14px', color: '#fff', fontSize: 10.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                    Build Mine <Zap size={9} fill="#fff" />
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ASYMMETRIC BENTO GRID - OUR SERVICES */}
      <section style={{ padding: '60px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          
          <ScrollRevealText style={{ marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 50, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)', fontSize: 9.5, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 12 }}>Core Capabilities</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.05 }}>
              High-converting systems<br />designed for rapid brand growth.
            </h2>
          </ScrollRevealText>

          {/* Bento Box Grid */}
          <div className="bento-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            
            {/* Box 1 (AI Lead Automation) - Spans 3 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 3', padding: '28px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>🤖</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 6 }}>SYSTEM 01</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>AI Automation & Conversational Pipelines</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, maxWidth: 440 }}>
                  We deploy automated conversational sales agents that reply to Instagram DMs, web forms, and WhatsApp inquiries in under 1 second. The AI qualifies leads based on criteria, and shares calendar links instantly.
                </p>
              </div>

              {/* Graphic/Interactive visual */}
              <div style={{ marginTop: 22, padding: '14px 18px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono'", color: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>AI Agent qualifying workflow</span>
                  <span style={{ color: '#d946ef' }}>● Active</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 11, background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>📥 Lead Arrived</div>
                  <div style={{ color: 'rgba(255,255,255,0.15)' }}>➡️</div>
                  <div style={{ fontSize: 11, background: 'rgba(139,92,246,0.06)', padding: '5px 10px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', color: '#a78bfa', fontWeight: 600 }}>💬 Auto-Qualified (0.8s)</div>
                  <div style={{ color: 'rgba(255,255,255,0.15)' }}>➡️</div>
                  <div style={{ fontSize: 11, background: 'rgba(217,70,239,0.06)', padding: '5px 10px', borderRadius: 20, border: '1px solid rgba(217,70,239,0.15)', color: '#d946ef', fontWeight: 600 }}>📅 Handoff (Call Booked)</div>
                </div>
              </div>
            </div>

            {/* Box 2 (Paid Ads Media Buying) - Spans 2 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 2', padding: '26px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(217,70,239,0.08)', border: '1px solid rgba(217,70,239,0.18)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>🚀</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d946ef', marginBottom: 6 }}>SYSTEM 02</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17.5, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>Paid Ads & Math Media</h3>
                <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                  Creative-first campaign architecture built on strict margin math. Average client scales to 4.5x+ ROAS.
                </p>
              </div>

              {/* Interactive ROAS Calculator Graphic */}
              <div style={{ marginTop: 18, padding: '12px 14px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.25)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Sliders size={8} /> Budget Adjuster</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#d946ef' }}>₹{(budget/100000).toFixed(0)}L/mo</span>
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="5000000" 
                  step="100000"
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#d946ef', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)', cursor: 'pointer', marginBottom: 10 }} 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5px 7px', borderRadius: 7 }}>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>Qualified Leads</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono'" }}>{estimatedLeads}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5px 7px', borderRadius: 7 }}>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>ROAS Revenue</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#34d399', fontFamily: "'JetBrains Mono'" }}>₹{(projectedRevenue/100000).toFixed(0)}L</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3 (AI Content Studio) - Spans 2 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 2', padding: '26px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>⚡</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 6 }}>SYSTEM 03</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17.5, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>AI Content Engine</h3>
                <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                  Automatically aggregate viral topics in your niche, scripting content loops, headlines, and captions in 60s.
                </p>
              </div>

              {/* Carousel preview graphics */}
              <div style={{ marginTop: 18, height: 70, position: 'relative', display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div className="bento-creative-strip-item" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: 8, padding: '7px 10px', fontSize: 9.5, color: '#a78bfa' }}>
                    <span>✍️ Hook: "B2B Outbound Deliverability in 2026..."</span>
                    <span style={{ fontWeight: 700 }}>98% Match</span>
                  </div>
                </div>
                <div className="bento-creative-strip-item" style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '7px 10px', fontSize: 9.5, color: 'rgba(255,255,255,0.35)' }}>
                    <span>🎞️ YouTube Script draft complete.</span>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 4 (Unified Tools Hub Ecosystem) - Spans 3 columns */}
            <div className="bento-card glass-card" style={{ gridColumn: 'span 3', padding: '28px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(147,139,250,0.08) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>🌎</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 6 }}>PRODUCT ECOSYSTEM</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>The Unified Growth Hub</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, maxWidth: 420 }}>
                  Consolidating your traffic and SEO value under one roof. Access our live micro-tools, calculators, and software platforms hosted directly inside the brand network.
                </p>
              </div>

              {/* Mini Tools Hub badges list */}
              <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://linkwa.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.18)', borderRadius: 10, padding: '6px 10px', color: '#25D366', textDecoration: 'none', fontWeight: 600 }}>WhatsApp LinkWA ↗</a>
                <a href="https://salary.socialninjas.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: 10, padding: '6px 10px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Salary calculators ↗</a>
                <a href="https://fit.socialninjas.in" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 10, padding: '6px 10px', color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>Fit Ninja Coach ↗</a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REVELATION: COMPARATIVE COMPARISON */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 0', background: 'rgba(4,8,18,0.2)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 48, alignItems: 'center' }} className="hero-grid-cols">
            
            <div className="reveal-l">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 50, background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 9.5, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 12 }}>Operational Strategy</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.04, marginBottom: 16, color: '#fff' }}>
                Your competitors sleep.<br /><span style={{ color: '#8b5cf6' }}>Your AI Agent doesn't.</span>
              </h2>
              <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, marginBottom: 24, borderLeft: '2px solid rgba(139,92,246,0.22)', paddingLeft: 16 }}>
                Most companies take 47 hours to reply to a new lead. By then, they've already moved on. Our custom AI Agents qualify inbound leads in under 1 second, book them into calendars, and hand them off only when they are ready to transact.
              </p>
              <Link to="/contact"><button className="btn-primary" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)', border: 'none', fontSize: 13.5 }}>Deploy AI Sales Agent <ArrowRight size={14} /></button></Link>
            </div>
            
            <div className="reveal-r d2">
              <div className="glass-card" style={{ borderRadius: 20, padding: 26, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bot size={15} color="#8b5cf6" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 13.5 }}>AI Agent Operational Efficiency</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d946ef', boxShadow: '0 0 6px #d946ef' }} /><span style={{ fontSize: 9, color: '#d946ef', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE</span></div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    ['Inquiries Handled Automically','142 Leads','rgba(255,255,255,0.9)'],
                    ['Meetings Instantly Scheduled','18 Syncs','#8b5cf6'],
                    ['Average Agent Reply Speed','0.8 seconds','#34d399'],
                    ['Handoff Pipeline Velocity','3.2× Increase','#d946ef']
                  ].map(([l,v,c]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 10, padding: '11px 14px' }}>
                      <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)' }}>{l}</span>
                      <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12.5, fontWeight: 600, color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COHESIVE SYSTEM SHOWCASE - THE SOCIAL NINJAS "CIRCLE" */}
      <section style={{ padding: '60px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          
          <ScrollRevealText style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 50, background: 'rgba(217,70,239,0.06)', border: '1px solid rgba(217,70,239,0.18)', fontSize: 9.5, fontWeight: 700, color: '#d946ef', textTransform: 'uppercase', marginBottom: 12 }}>Unified Platform</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.05 }}>
              The Social Ninjas Ecosystem.
            </h2>
            <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.42)', maxWidth: 480, margin: '8px auto 0' }}>
              We build, launch, and scale dedicated software products. All connected under our secure, blazing-fast web circle.
            </p>
          </ScrollRevealText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="tools-circle-grid">
            
            {/* Tool 1 */}
            <a href="https://linkwa.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '20px', borderRadius: 18, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,10,12,0.4)', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)', color: '#25D366', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 14 }}>🟢 LinkWA Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>WhatsApp Generator</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.45 }}>
                    Generate custom wa.me links with pre-filled campaign messages and colored QR codes.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#25D366', fontWeight: 600, marginTop: 16 }}>Launch Tool <ArrowRight size={11} /></div>
              </div>
            </a>

            {/* Tool 2 */}
            <a href="https://salary.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '20px', borderRadius: 18, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,10,12,0.4)', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 14 }}>🟢 Calculator Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>Salary Calculators</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.45 }}>
                    Detailed gross-to-net tax breakdowns, hourly-to-salary converters, and FICA deductions.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#3b82f6', fontWeight: 600, marginTop: 16 }}>Launch Tool <ArrowRight size={11} /></div>
              </div>
            </a>

            {/* Tool 3 */}
            <a href="https://contentstudio.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '20px', borderRadius: 18, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,10,12,0.4)', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(47,207,142,0.06)', border: '1px solid rgba(47,207,142,0.15)', color: '#2fcf8e', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 14 }}>🟢 SaaS Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>AI Content Studio</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.45 }}>
                    Aggregates trending live topics and scripts a whole week of social copy in 60s.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#2fcf8e', fontWeight: 600, marginTop: 16 }}>Launch Studio <ArrowRight size={11} /></div>
              </div>
            </a>

            {/* Tool 4 */}
            <a href="https://fit.socialninjas.in" target="_blank" rel="noopener" className="circle-card-link" style={{ textDecoration: 'none' }}>
              <div className="glass-card tool-circle-card" style={{ padding: '20px', borderRadius: 18, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,10,12,0.4)', transition: 'all 0.3s' }}>
                <div>
                  <div style={{ display: 'inline-flex', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#ef4444', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 14 }}>🟢 AI Coach Live</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.3px' }}>Fit Ninja AI Coach</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.45 }}>
                    Personalized diet planning, structured gym workouts, and continuous AI fitness coaching.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#ef4444', fontWeight: 600, marginTop: 16 }}>Launch Coach <ArrowRight size={11} /></div>
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="hero-grid-cols">
          
          <div className="reveal-l">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 50, background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 9.5, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 12 }}>Real Validation</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 16, color: '#fff' }}>
              Our clients don't just stay.<br /><span style={{ color: '#8b5cf6' }}>They scale.</span>
            </h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, marginBottom: 24, maxWidth: 380 }}>97% of clients continue working with us month-over-month. We construct clear, economic outcomes for all our partners.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['4.9★','Client Satisfaction','🌟'],
                ['97%','Monthly Retention','📈'],
                ['150+','Partner Brands','🌎'],
                ['₹40Cr+','Media Spend Managed','💰']
              ].map(([n,l,ic]) => (
                <div key={l} className="glass-card" style={{ padding: '16px 18px', borderRadius: 14, background: 'rgba(10,10,12,0.4)' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{ic}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque'", fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="reveal-r d1" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: '100%' }}>
            <div className="glass-card" style={{ borderRadius: 22, padding: 0, overflow: 'hidden', minHeight: 330, position: 'relative', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.4)' }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ position: i===0?'relative':'absolute', inset: 0, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)', opacity: i===currentT?1:0, transform: i===currentT?'translateX(0)':'translateX(36px)', pointerEvents: i===currentT?'auto':'none' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 3 }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={11} fill="#8b5cf6" color="#8b5cf6" />)}</div>
                      <div style={{ fontSize: 8.5, padding: '2px 8px', borderRadius: 50, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)', color: '#a78bfa', fontWeight: 700, letterSpacing: '0.06em' }}>✓ VERIFIED PARTNER</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: t.color, letterSpacing: '-0.4px' }}>{t.impact}</span>
                      {t.impactDetail && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 6, fontWeight: 400 }}>{t.impactDetail}</span>}
                    </div>
                    
                    <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.68)', lineHeight: 1.6 }}>"{t.text}"</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${t.color}30,${t.color}10)`, border: `1.5px solid ${t.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: t.color, flexShrink: 0 }}>{t.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{t.name}</div>
                      <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.32)', marginTop: 1 }}>{t.role} · <span style={{ color: 'rgba(255,255,255,0.45)' }}>{t.company}</span></div>
                    </div>
                    <div style={{ fontSize: 8.5, padding: '3px 8px', borderRadius: 4, background: `${t.color}08`, border: `1px solid ${t.color}20`, color: t.color, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>{t.platform}</div>
                  </div>
                </div>
              ))}
              
              <div style={{ position: 'absolute', bottom: 20, right: 24, display: 'flex', gap: 5, zIndex: 10 }}>
                {testimonials.map((_,i) => <button key={i} onClick={() => setCurrentT(i)} style={{ height: 4, borderRadius: 2, background: i===currentT?'#8b5cf6':'rgba(255,255,255,0.15)', width: i===currentT?18:6, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />)}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 80px', position: 'relative', zIndex: 10 }}>
        <div className="reveal" style={{ background: 'rgba(10,10,12,0.4)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 22, padding: '56px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.25),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 12, color: '#fff' }}>
            Ready to deploy your AI Sales Pipeline?
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.42)', marginBottom: 28, maxWidth: 450, margin: '0 auto' }}>
            Book a free 30-minute growth blueprint audit call. We will locate lead leaks in your sales pipeline, and map out your custom AI qualifier systems.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)', border: 'none', fontSize: 14, padding: '13px 28px' }}>Book My Free Audit</button></Link>
            <a href="https://contentstudio.socialninjas.in"><button className="btn-ghost" style={{ fontSize: 14, border: '1px solid rgba(255,255,255,0.08)' }}>⚡ Try Content Studio Free</button></a>
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
        }
        .bento-card:hover {
          background: rgba(255, 255, 255, 0.035) !important;
          transform: translateY(-2px);
          border-color: rgba(139,92,246,0.3) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        /* Tools Circle Cards styling */
        .tool-circle-card {
          position: relative;
        }
        .tool-circle-card:hover {
          background: rgba(255, 255, 255, 0.035) !important;
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.12) !important;
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        .tool-circle-card:hover svg {
          transform: translateX(4px);
        }
        .tool-circle-card svg {
          transition: transform 0.2s ease-in-out;
        }

        @media(max-width:960px){
          .hero-grid-cols { grid-template-columns: 1fr!important; gap: 32px!important; }
          .hero-dashboard { margin-top: 12px!important; max-width: 100%!important; }
          section { text-align: center; }
          .bento-container { grid-template-columns: 1fr !important; }
          .bento-card { grid-column: span 1 !important; padding: 24px !important; }
          .tools-circle-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          section { padding: 48px 0 !important; }
        }
        @media(max-width:560px){
          .tools-circle-grid { grid-template-columns: 1fr !important; }
          .hero-grid-cols { padding: 0 2px!important; }
          section { padding-top: 80px !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
