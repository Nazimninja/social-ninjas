import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Check, Bot, Flame, CheckCircle, Shield, Zap, Sparkles, TrendingUp, BarChart3, Clock, Users } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import MeteorsBackground from '../components/MeteorsBackground';
import AuroraBackground from '../components/AuroraBackground';
import TiltCard from '../components/TiltCard';
import ShinyButton from '../components/ShinyButton';
import AnimatedBeam from '../components/AnimatedBeam';
import AnimatedNumber from '../components/AnimatedNumber';

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
  { num: '4.8×',   label: 'Average Client ROAS', desc: 'Across Meta & Google Ads' },
  { num: '₹40Cr+', label: 'Media Spend Managed', desc: 'Data-driven ad campaigns' },
  { num: '150+',   label: 'Active Brand Partners', desc: 'Worldwide client base' },
  { num: '97%',    label: 'Client Retention Rate', desc: 'Month-over-month stability' },
];

const SERVICES = [
  {
    num: '01',
    title: 'AI Lead & Sales Automation',
    desc: 'Custom AI agents reply to Instagram DMs, WhatsApp, and web forms in under 1 second — qualifying, nurturing, and booking leads into your calendar 24/7 without manual work.',
    tags: ['< 1s AI Response', 'Enterprise CRM Sync', 'WhatsApp & IG Automation'],
    color: 'from-orange-500/20 to-amber-500/10',
    borderColor: 'border-orange-500/30'
  },
  {
    num: '02',
    title: 'Performance Paid Ads Engine',
    desc: 'Creative-first Meta and Google campaigns engineered on unit economics, not vanity metrics. Average client reaches 4.5× ROAS by month 3 with our automated ad testing system.',
    tags: ['Meta & Google Ads', '4.5× Avg ROAS', 'Creative Matrix Testing'],
    color: 'from-blue-500/20 to-indigo-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    num: '03',
    title: 'AI Content Studio & Branding',
    desc: 'High-converting video scripts, carousel graphics, and social posts generated and scheduled automatically for your target niche.',
    tags: ['Automated Content', 'Viral Script Writing', 'Niche Audio Models'],
    color: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30'
  },
  {
    num: '04',
    title: 'Full-Funnel CRO & Web Systems',
    desc: 'High-speed landing pages and checkout systems optimized for maximum conversion rate, Instant speed scores, and zero lead dropoff.',
    tags: ['Sub-Second Speed', 'Instant Conversion', 'A/B Split Testing'],
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30'
  }
];

const DEMO_CHAT = [
  { from: 'lead', text: 'Hi! I run a fitness brand and need more qualified leads.' },
  { from: 'ai',   text: 'Hi there! Great timing 🎯 — we specialise in scaling fitness & e-commerce brands. What is your current monthly ad budget?' },
  { from: 'lead', text: 'Around ₹80,000 per month.' },
  { from: 'ai',   text: 'Perfect. At that budget we typically generate 180–220 qualified leads/month with a target CPL of ₹360–450. Can I schedule a 15-min audit call for you?' },
  { from: 'lead', text: 'Yes, tomorrow works!' },
  { from: 'ai',   text: 'Done! I have booked your call and synced your details directly into our CRM calendar. 📅' },
];

/* ─── HOME COMPONENT ─────────────────────────────────────── */
const Home: React.FC = () => {
  useReveal();

  /* Chat demo */
  const [chatMsgs, setChatMsgs] = useState<typeof DEMO_CHAT>([]);
  const [typing, setTyping] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<any>(null);
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
  const [spend, setSpend] = useState(150000);
  const roas = 4.2;
  const rev = Math.round(spend * roas);
  const profit = Math.round(rev - spend);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smoothY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const smoothOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans selection:bg-brand-primary selection:text-white">
      <SEO
        title="Social Ninja's | AI-Powered Performance Marketing & Growth Systems"
        description="We build custom AI sales pipelines, run high-ROAS Meta & Google ads, and engineer automated content systems for scaling brands."
      />

      {/* ── 1. HERO SECTION WITH AURORA & METEORS ──────────────── */}
      <AuroraBackground className="min-h-screen pt-28 pb-16 relative overflow-hidden">
        <MeteorsBackground number={24} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column — Text & CTAs */}
            <motion.div style={{ y: smoothY, opacity: smoothOp }} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs font-bold uppercase tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                150+ Brands Scaled Globally Since 2022
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] animate-text-shimmer">
                AI-Powered <br /> Growth Systems <br />
                <span className="text-brand-primary font-black">That Scale Revenue.</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                We build autonomous AI lead pipelines, run high-margin Meta & Google ad campaigns, and deploy automated content systems engineered for repeatable profit.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact">
                  <ShinyButton variant="primary" className="text-sm font-bold">
                    Book Free Audit <ArrowRight size={16} />
                  </ShinyButton>
                </Link>
                <Link to="/services">
                  <ShinyButton variant="secondary" className="text-sm font-bold">
                    Explore Core Systems
                  </ShinyButton>
                </Link>
              </div>

              {/* Proof Badges */}
              <div className="pt-6 border-t border-neutral-800/80 flex items-center gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-emerald-400" />
                  <span>Guaranteed ROAS Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-400" />
                  <span>Sub-Second AI Speed</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column — 3D Tilt Chat Demo */}
            <motion.div style={{ y: smoothY }}>
              <TiltCard className="p-6 bg-[#0e121d]/90 backdrop-blur-xl border border-neutral-800 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                      <Bot size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">AI Qualifier Agent</div>
                      <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Automated Sync
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full font-mono">Response: 0.4s</span>
                </div>

                <div ref={chatContainerRef} className="space-y-3 h-64 overflow-y-auto pr-1 text-xs font-sans">
                  {chatMsgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === 'lead' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        m.from === 'lead'
                          ? 'bg-brand-primary text-white rounded-br-none shadow-md font-medium'
                          : 'bg-[#141a29] text-neutral-200 border border-neutral-800 rounded-bl-none'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-[#141a29] border border-neutral-800 p-2.5 rounded-2xl text-neutral-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </AuroraBackground>

      {/* ── 2. PROOF METRICS WITH ANIMATED NUMBERS ────────────── */}
      <section className="py-16 bg-[#0b0e17] border-y border-neutral-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <SpotlightCard key={i} className="p-6 text-center bg-[#0e121d] border border-neutral-800/80">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight text-brand-primary">
                  <AnimatedNumber value={stat.num} />
                </div>
                <div className="font-bold text-xs text-neutral-200 mt-2">{stat.label}</div>
                <div className="text-[11px] text-neutral-500 mt-1">{stat.desc}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENTO GRID CORE SYSTEMS SECTION ──────────────── */}
      <section className="py-24 bg-[#07090e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase rounded-full tracking-wider">
              CORE GROWTH SYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Everything You Need to Scale Revenue.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Four engineered growth pillars designed to capture leads, scale ads profitability, and automate client acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((svc, i) => (
              <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800/80 space-y-4 hover:border-brand-primary/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-primary px-2.5 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    {svc.num}
                  </span>
                  <ArrowRight size={16} className="text-neutral-500 group-hover:text-brand-primary transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{svc.desc}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {svc.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-[#141a29] border border-neutral-800 text-neutral-300 rounded-lg text-[11px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. LIVE SYSTEM FLOW (ANIMATED BEAM) ─────────────── */}
      <section className="py-16 bg-[#07090e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedBeam />
        </div>
      </section>

      {/* ── 5. INTERACTIVE ROAS CALCULATOR ─────────────────── */}
      <section className="py-20 bg-[#0b0e17] border-t border-neutral-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full tracking-wider">
                PROFIT CALCULATOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Calculate Your Projected Ad Revenue & Profit
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Adjust your estimated monthly ad budget below to see projected revenue built on our historical 4.2× ROAS average.
              </p>
            </div>

            <TiltCard className="p-8 bg-[#0e121d] border border-neutral-800 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-neutral-300 mb-2">
                  <span>Monthly Ad Budget</span>
                  <span className="text-base text-brand-primary font-black">₹{spend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={spend}
                  onChange={e => setSpend(Number(e.target.value))}
                  className="w-full h-2 bg-[#141a29] rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                <div className="bg-[#141a29] p-4 rounded-xl border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 font-bold uppercase">Projected Revenue</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">₹{rev.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-[#141a29] p-4 rounded-xl border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 font-bold uppercase">Estimated Profit</div>
                  <div className="text-xl font-black text-brand-primary mt-1">₹{profit.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* ── 6. FINAL CALL TO ACTION ─────────────────────────── */}
      <section className="py-24 bg-[#07090e] relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SpotlightCard className="p-12 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight animate-text-shimmer">
              Ready to Build Your AI Revenue Engine?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Book a 15-minute growth strategy session with our agency team. We will audit your current funnels and outline an action plan.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link to="/contact">
                <ShinyButton variant="primary" className="text-sm font-bold px-8 py-4">
                  Schedule Strategy Audit <ArrowRight size={16} />
                </ShinyButton>
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </section>

    </div>
  );
};

export default Home;
