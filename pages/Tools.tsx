import React, { useState } from 'react';
import { ArrowRight, Zap, MessageSquare, Clock, Home, DollarSign, Sparkles, Dumbbell, ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

const UTILITY_TOOLS = [
  {
    id: 'whatsapp',
    Icon: MessageSquare,
    title: 'Free WhatsApp Link Generator',
    desc: 'Create direct click-to-chat wa.me links with custom pre-filled messages and free QR codes.',
    badge: 'Free Tool',
    badgeColor: '#22c55e',
    url: 'https://linkwa.in/',
    isExternal: true,
  },
  {
    id: 'salary-calc',
    Icon: DollarSign,
    title: 'US Take-Home Pay Calculator',
    desc: 'Calculate your net take-home pay after federal, state, and FICA taxes across all 50 US states.',
    badge: 'Free Tool',
    badgeColor: '#38bdf8',
    url: 'https://salary.socialninjas.in/salary-calculator/',
    isExternal: true,
  },
  {
    id: 'salary-conv',
    Icon: Clock,
    title: 'Hourly to Salary Calculator',
    desc: 'Convert hourly wages to annual salary, monthly, and weekly gross income with overtime calculations.',
    badge: 'Free Tool',
    badgeColor: '#a855f7',
    url: 'https://salary.socialninjas.in/',
    isExternal: true,
  },
  {
    id: 'mortgage',
    Icon: Home,
    title: 'Mortgage Rate Calculator',
    desc: 'Calculate monthly PITI mortgage payments including property taxes, home insurance, and PMI.',
    badge: 'Free Tool',
    badgeColor: '#f59e0b',
    url: 'https://mortgage.socialninjas.in/',
    isExternal: true,
  },
];

const TOOLS_FAQS = [
  {
    q: 'Is the WhatsApp link generator free?',
    a: 'Yes — free forever, no signup required. You can generate custom WhatsApp direct-chat links and QR codes instantly.'
  },
  {
    q: 'Are the salary and wage calculators accurate for all 50 US states?',
    a: 'Yes. Our take-home pay and salary calculators calculate federal income tax, FICA (Social Security & Medicare), state taxes, and local deductions across all 50 US states.'
  },
  {
    q: 'Do you store any personal, financial, or phone number data?',
    a: 'No. All calculations and link generations run locally in your browser session. We do not store your numbers, salaries, or financial inputs.'
  },
  {
    q: 'Can marketing teams use these tools for client campaigns?',
    a: 'Yes. All Social Ninja\'s growth and financial utilities are 100% free to use for personal projects, client campaigns, and commercial workflows.'
  }
];

const Tools: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen">
      <SEO
        title="Free Growth & Finance Tools | Social Ninja's"
        description="Free tools from Social Ninja's: WhatsApp link generator, take-home pay calculator, hourly-to-salary converter and mortgage calculator."
        keywords="WhatsApp link generator, salary calculator, hourly to salary converter, mortgage calculator, growth utilities, Social Ninja's"
        faq={TOOLS_FAQS}
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Zap size={13} className="text-[#38bdf8]" />
            <span>GROWTH UTILITIES & SAAS SUITE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Free Tools
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Free tools from the Social Ninja's team — built for founders, marketers and operators.
          </p>
        </div>
      </AuroraBackground>

      {/* MAIN CONTAINER (Strict 1140px alignment) */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* ── FREE GROWTH & FINANCIAL UTILITIES GRID (Directly below intro paragraph) ── */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UTILITY_TOOLS.map((tool) => {
              const cardInner = (
                <SpotlightCard className="p-7 bg-[#0e121d] border border-neutral-800/80 space-y-5 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${tool.badgeColor}18`, border: `1px solid ${tool.badgeColor}30` }}
                      >
                        <tool.Icon size={20} style={{ color: tool.badgeColor }} />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase px-3 py-1 rounded-full border"
                        style={{ background: `${tool.badgeColor}12`, color: tool.badgeColor, borderColor: `${tool.badgeColor}25` }}
                      >
                        {tool.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors duration-200 leading-snug">
                        {tool.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold pt-3 border-t border-neutral-800/60" style={{ color: tool.badgeColor }}>
                    Launch Free Tool <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </SpotlightCard>
              );

              return tool.isExternal ? (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener"
                  className="text-left group w-full block"
                  style={{ textDecoration: 'none' }}
                >
                  {cardInner}
                </a>
              ) : (
                <Link
                  key={tool.id}
                  to={tool.url}
                  className="text-left group w-full block"
                  style={{ textDecoration: 'none' }}
                >
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── FLAGSHIP SAAS SPOTLIGHT: FIT NINJA ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              <Sparkles size={14} className="text-[#38bdf8]" />
              <span>Flagship SaaS Platform</span>
            </div>
            <Link to="/ai-products/fit-ninja" className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1">
              View SaaS Specs <ArrowRight size={13} />
            </Link>
          </div>

          <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-[#38bdf8]/30 hover:border-[#38bdf8]/60 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                    <Dumbbell size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">Fit Ninja</h2>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8]">
                        Flagship SaaS
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-medium">Athletic Training & Precision Nutrition OS</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  Engineered for serious athletes and lifters. Features <strong>4,000+ HD animated exercise demos</strong>, guided execution player with full-screen rest countdowns, Greyskull LP progressive overload algorithms, anatomical muscle heatmaps, and adaptive macro nutrition planning.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                  <div className="bg-[#121724] border border-neutral-800 rounded-xl p-2.5">
                    <div className="text-base font-extrabold text-[#38bdf8]">4,000+</div>
                    <div className="text-[10px] text-neutral-400">HD Exercises</div>
                  </div>
                  <div className="bg-[#121724] border border-neutral-800 rounded-xl p-2.5">
                    <div className="text-base font-extrabold text-white">Linear</div>
                    <div className="text-[10px] text-neutral-400">Progression</div>
                  </div>
                  <div className="bg-[#121724] border border-neutral-800 rounded-xl p-2.5">
                    <div className="text-base font-extrabold text-white">Cloud</div>
                    <div className="text-[10px] text-neutral-400">Sync Active</div>
                  </div>
                  <div className="bg-[#121724] border border-neutral-800 rounded-xl p-2.5">
                    <div className="text-base font-extrabold text-[#38bdf8]">₹99</div>
                    <div className="text-[10px] text-neutral-400">First Month</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-3 lg:border-l lg:border-neutral-800 lg:pl-8">
                <div className="text-xs text-neutral-400">
                  <span className="text-white font-bold">Introductory Access:</span> ₹99 first month hook (renews ₹399/mo). Includes 50+ tutorial free pass tier.
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="https://fit.socialninjas.in/app?mode=signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-[#1F4B99]/20"
                  >
                    Launch Fit Ninja <ExternalLink size={14} />
                  </a>
                  <Link
                    to="/ai-products/fit-ninja"
                    className="inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs transition-all"
                  >
                    Full Feature Tour
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>


        {/* ── FREQUENTLY ASKED QUESTIONS SECTION (Strict 800px alignment) ── */}
        <div style={{ maxWidth: 800, margin: '40px auto 0', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
              Questions About Our Free Tools
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TOOLS_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#0e121d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: 15.5,
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={18} 
                      color="#38bdf8" 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.2s ease', 
                        flexShrink: 0 
                      }} 
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: 14.5, color: '#94a3b8', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 16 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tools;
