import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Bot, Target, BarChart3, Sparkles, ExternalLink, ShieldCheck, Dumbbell } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

interface ProductItem {
  id: string;
  isLive: boolean;
  badge: string;
  icon: any;
  name: string;
  tagline: string;
  desc: string;
  tryLink: string;
  learnLink: string;
  stats: [string, string][];
  features: string[];
  plans?: { name: string; price: string; note: string; popular?: boolean }[];
}

const products: ProductItem[] = [
  {
    id: 'fit-ninja',
    isLive: true,
    badge: 'v2.0 Live SaaS',
    icon: Dumbbell,
    name: 'Fit Ninja',
    tagline: '4,000+ HD Animated Exercises, Linear Progression Engine & Precision Nutrition.',
    desc: 'The athletic performance & body transformation SaaS. Built for real athletes and serious lifters with 4,000+ animated exercise demonstrations, guided set player with smart rest timers, Greyskull LP & linear progression algorithms, real-time anatomical muscle heatmaps, and adaptive macro nutrition planning.',
    tryLink: 'https://fit.socialninjas.in/app?mode=signup',
    learnLink: '/ai-products/fit-ninja',
    stats: [
      ['4,000+', 'HD Exercises'],
      ['4.9★', 'Athlete Rating'],
      ['Live Sync', 'Multi-Device Cloud'],
      ['₹99', 'First Month Hook']
    ],
    features: [
      '4,000+ searchable exercises with animated form guides & equipment filters',
      'Guided workout player with full-screen rest countdowns and screen wake-lock',
      'Anatomical muscle recovery heatmap tracking trained vs neglected groups',
      'Greyskull LP, linear progression & 1RM strength tracking algorithms',
      'Adaptive Macro & Nutrition engine with Indian Veg, Non-Veg & Vegan meal targets',
      'Instant multi-device cloud sync with verified athlete profile'
    ],
    plans: [
      { name: 'Starter Pass', price: '₹0', note: '50+ tutorials, basic set logger & rest timer' },
      { name: 'Fit Ninja Pro', price: '₹99 first mo', note: 'Then ₹399/mo renewal · Full 4,000+ Exercises, Workouts & Nutrition', popular: true },
    ],
  },
  {
    id: 'ai-sales-agent',
    isLive: false,
    badge: 'Enterprise Access',
    icon: Bot,
    name: 'AI Lead & Sales Agent',
    tagline: 'Sub-second 24/7 lead qualification & automated CRM calendar booking.',
    desc: 'Never lose a warm inbound prospect to delay. Automatically engages new leads across your website, WhatsApp, and Meta Ads within 1 second. Conducts multi-turn conversational qualification tuned to your ICP and books high-ticket buyers directly into your calendar.',
    tryLink: '/contact?product=ai-sales-agent',
    learnLink: '/ai-products/ai-sales-agent',
    stats: [
      ['< 1s', 'Avg Reply Time'],
      ['24/7/365', 'Always Active'],
      ['3.2×', 'Conversion Lift'],
      ['7–10 Days', 'Custom Setup']
    ],
    features: [
      'Instant sub-second response on website chat, WhatsApp, and Meta Ads',
      'Multi-turn conversational qualification tuned to your exact ICP criteria',
      'Automated meeting scheduling directly into Google Calendar & Calendly',
      'Bi-directional sync with HubSpot, Supabase, and custom CRM systems',
      'Automated follow-up drip sequences across WhatsApp & email',
      'Weekly conversational analytics and conversion rate reporting'
    ],
    plans: [
      { name: 'Custom Deployment', price: 'Inquire', note: 'Tailored to your sales volume, qualification criteria, and CRM' }
    ]
  },
  {
    id: 'ad-copy-generator',
    isLive: false,
    badge: 'Marketing Intelligence',
    icon: Target,
    name: 'AI Ad Copy & Creative Engine',
    tagline: 'High-ROAS Meta & Google ad copy, headlines, and hooks generated in seconds.',
    desc: 'Generate mathematically sound direct-response ad copy built on proven marketing frameworks (AIDA, PAS, BAB). Outputs platform-native headlines, primary text, and high-converting CTAs calibrated to eliminate creative fatigue and maximize ROAS.',
    tryLink: '/contact?product=ad-copy-generator',
    learnLink: '/ai-products/ad-copy-generator',
    stats: [
      ['Meta+Google', 'Platform Native'],
      ['10+ Angles', 'Per Creative Brief'],
      ['AIDA / PAS', 'Proven Frameworks'],
      ['Instant', 'Creative Output']
    ],
    features: [
      'Multi-variation ad copy generation for Meta Ads, Google Ads, and LinkedIn',
      'Hooks and headlines engineered around psychological conversion triggers',
      'Audience-specific angle customization (problem-aware to most-aware)',
      'Brand tone preservation and automated compliance policy checks',
      'Direct export to ad accounts and creative testing sheets'
    ],
  },
  {
    id: 'reporting-assistant',
    isLive: false,
    badge: 'Analytics Engine',
    icon: BarChart3,
    name: 'Autonomous Reporting Intelligence',
    tagline: 'Executive weekly ROAS & attribution summaries without manual spreadsheets.',
    desc: 'Connect your ad accounts, CRM, and analytics for unified attribution intelligence. Automatically translates complex multi-channel data into executive takeaways, anomaly alerts, and capital allocation recommendations.',
    tryLink: '/contact?product=reporting-assistant',
    learnLink: '/ai-products/reporting-assistant',
    stats: [
      ['Weekly', 'Automated Briefs'],
      ['Cross-Channel', 'Meta + Google'],
      ['0', 'Manual Spreadsheets'],
      ['1-Click', 'Executive PDF']
    ],
    features: [
      'Unified cross-channel performance aggregation (Meta, Google, GA4)',
      'Plain-English executive insights explaining what drove revenue changes',
      'Real-time anomaly alerts for CPA spikes, fatigue, or budget bleed',
      'Benchmarking against historical cohort data and unit economics',
      'Instant 1-click executive PDF report generation for stakeholders'
    ],
  },
];

export const AIProducts: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen font-sans selection:bg-[#38bdf8]/30">
      
      <SEO
        title="AI Products & SaaS Suite | Social Ninja's"
        description="Explore Fit Ninja athletic OS, AI Sales Agents, Ad Copy Engines, and Autonomous Reporting Intelligence built by Social Ninja's."
        keywords="Fit Ninja, fitness app, workout tracker, AI marketing tools, AI sales agent, Social Ninja's SaaS"
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#38bdf8]" />
            <span>SAAS & AUTONOMOUS SYSTEMS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Proprietary Software That <br />
            <span className="text-[#38bdf8]">Drives Real Outcomes.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            From our flagship athletic OS to autonomous sales and marketing agents — tools engineered for tangible execution and high-margin scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <a
              href="https://fit.socialninjas.in/app?mode=signup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#1F4B99]/25 transition-all text-xs"
            >
              Launch Fit Ninja SaaS <ExternalLink size={14} />
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-8 py-3.5 rounded-full hover:border-neutral-700 transition-all text-xs"
            >
              Request Custom AI Build →
            </Link>
          </div>
        </div>
      </AuroraBackground>

      {/* PRODUCTS SHOWCASE CONTAINER (Strict 1140px alignment) */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {products.map((p, i) => {
          const IconComp = p.icon;
          return (
            <SpotlightCard
              key={p.id}
              className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800/80 rounded-3xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Specs Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                        <IconComp size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">{p.name}</h2>
                        <p className="text-xs text-[#38bdf8] font-bold mt-0.5">{p.tagline}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                        p.isLive
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      {p.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {p.badge}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {p.stats.map(([n, l]) => (
                      <div key={l} className="bg-[#121724] border border-neutral-800 rounded-xl p-3 text-center">
                        <div className="text-base font-extrabold text-white">{n}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {p.tryLink.startsWith('http') ? (
                      <a
                        href={p.tryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-[#1F4B99]/20"
                      >
                        Launch Platform <ExternalLink size={13} />
                      </a>
                    ) : (
                      <Link
                        to={p.tryLink}
                        className="inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-[#1F4B99]/20"
                      >
                        Apply for Early Access →
                      </Link>
                    )}

                    <Link
                      to={p.learnLink}
                      className="inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs hover:border-neutral-700 transition-all"
                    >
                      Detailed Product Specs <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Features & Plans Column */}
                <div className="lg:col-span-5 bg-[#121724] border border-neutral-800/80 rounded-2xl p-6 sm:p-7 space-y-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] mb-3">
                      CORE CAPABILITIES
                    </div>
                    <div className="space-y-2.5">
                      {p.features.map((f, j) => (
                        <div key={j} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                          <CheckCircle2 size={15} className="text-[#38bdf8] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {p.plans && (
                    <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        MEMBERSHIP & PRICING
                      </div>
                      <div className="space-y-2">
                        {p.plans.map((pl) => (
                          <div
                            key={pl.name}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                              pl.popular
                                ? 'bg-[#1F4B99]/15 border-[#1F4B99]/40 text-white'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                            }`}
                          >
                            <div>
                              <div className="font-bold flex items-center gap-2">
                                <span>{pl.name}</span>
                                {pl.popular && (
                                  <span className="text-[9px] font-extrabold bg-[#38bdf8]/20 text-[#38bdf8] px-2 py-0.5 rounded-full uppercase">
                                    RECOMMENDED
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-neutral-400 mt-0.5">{pl.note}</div>
                            </div>
                            <div className="font-bold text-sm text-white pl-3 text-right">
                              {pl.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};

export default AIProducts;
