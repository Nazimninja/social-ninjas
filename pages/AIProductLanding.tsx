import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, Star, Search, Zap, Bot, Target, BarChart3, ExternalLink, ShieldCheck, Dumbbell, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

interface ProductSpec {
  name: string;
  icon: any;
  color: string;
  badge: string;
  isLive: boolean;
  tagline: string;
  hero: string;
  tryLink: string;
  exploreLink?: string;
  problem: string;
  solution: string;
  steps: { n: string; t: string; d: string }[];
  features: string[];
  reviews?: { name: string; role: string; text: string; stars: number }[];
  stats: [string, string][];
  plans?: { name: string; price: string; period: string; features: string[]; popular?: boolean }[];
}

const productsData: Record<string, ProductSpec> = {
  'fit-ninja': {
    name: 'Fit Ninja',
    icon: Dumbbell,
    color: '#38bdf8',
    badge: 'v2.0 Live SaaS',
    isLive: true,
    tagline: '4,000+ HD Animated Exercises, Linear Progression Engine & Precision Nutrition.',
    hero: 'The ultimate athletic workout and body transformation companion. Features 4,000+ animated exercise demos, guided set player with full-screen rest countdowns, smart automatic progressive overload, interactive muscle recovery heatmaps, and personalized nutrition planning.',
    tryLink: 'https://fit.socialninjas.in/app?mode=signup',
    exploreLink: 'https://fit.socialninjas.in/#library',
    problem: 'Most workout apps are passive digital notebooks or complicated spreadsheets full of robotic jargon. Lifters lose momentum guessing weights, resting too long between sets, and struggling with mismatched nutrition targets.',
    solution: 'Fit Ninja is a high-performance training PWA built for athletes. It keeps your screen awake during sets, calculates automatic progressive overload, delivers clean animated form guides, and generates custom meal plans with verified protein targets.',
    steps: [
      { n: '01', t: 'Select Your Training Goal', d: 'Choose muscle hypertrophy, fat loss, or strength conditioning across gym machines, free weights, or bodyweight workouts.' },
      { n: '02', t: 'Execute Guided Sets', d: 'Open the live player. Full-screen rest timers and Screen Wake Lock keep your phone alive and your focus dialed in without mis-touches.' },
      { n: '03', t: 'Automatic Progression', d: 'Log your reps and Fit Ninja calculates exactly when you are ready to add +1 kg to +2.5 kg next session without mental math.' },
      { n: '04', t: 'Custom Diet & Protein Targets', d: 'Get daily calorie and protein targets calibrated for your body across Indian Veg, Non-Veg, Vegan, and Keto diets.' },
    ],
    features: [
      '4,000+ searchable exercises with looping video form guides and equipment filters',
      'Full-screen rest countdown timer with audio cues and persistent Screen Wake Lock',
      'Personalized custom workout & diet generator updated as your strength progresses',
      'Smart progressive overload recommendations based on your historical logs',
      'Front and back anatomical muscle recovery heatmaps',
      'Practical macro nutrition logging with Indian Veg and Non-Veg dietary support',
      'Instant multi-device cloud synchronization with verified athlete profile backup'
    ],
    reviews: [
      { name: 'Sameer Khan', role: 'Competitive Lifter · Mumbai', text: 'The full-screen rest timer and auto weight progression completely changed my sessions. No more looking at the clock or losing focus between heavy sets.', stars: 5 },
      { name: 'Dr. Priya Sharma', role: 'Endurance Athlete · Bengaluru', text: 'The macro calculator and high-protein targets for vegetarian diets are spot on. Everything syncs cleanly across my phone and tablet.', stars: 5 },
      { name: 'Arjun Mehta', role: 'Strength Coach · Delhi', text: 'Cleanest exercise video library I have used. Having 4,000+ animated movements right in the athlete player prevents form breakdown on complex lifts.', stars: 5 },
    ],
    stats: [
      ['4,000+', 'HD Video Demos'],
      ['Cloud Sync', 'Multi-Device'],
      ['4.9★', 'Athlete Rating'],
      ['₹99', 'First Month Hook']
    ],
    plans: [
      {
        name: 'Starter Pass',
        price: '₹0',
        period: 'Free Starter Access',
        features: [
          '50+ basic exercise video tutorials',
          'Manual set & rep workout logger',
          'Standard rest countdown timer',
          'General calorie & macro estimation'
        ],
        popular: false
      },
      {
        name: 'Fit Ninja Pro',
        price: '₹99',
        period: 'First Month (renews ₹399/mo)',
        features: [
          'Full 4,000+ HD animated exercise demos',
          'Guided execution player with Screen Wake Lock',
          'Greyskull LP & linear progression algorithms',
          'Anatomical muscle recovery heatmaps',
          'Custom diet plans (Indian Veg/Non-Veg/Vegan)',
          'Instant cloud sync across mobile, tablet & desktop'
        ],
        popular: true
      }
    ],
  },
  'ai-sales-agent': {
    name: 'AI Lead & Sales Agent',
    icon: Bot,
    color: '#38bdf8',
    badge: 'Enterprise Access',
    isLive: false,
    tagline: 'Sub-second 24/7 lead qualification & automated CRM calendar booking.',
    hero: 'Every time someone fills in a form, sends a DM, or clicks an ad — they expect an immediate response. Leads contacted within 5 minutes are 9× more likely to convert. Our autonomous agent engages instantly, qualifies intent, and books buyers straight into your calendar.',
    tryLink: '/contact?product=ai-sales-agent',
    problem: 'Sales teams cannot be online around the clock. Leads arrive at midnight, on weekends, and during client meetings. By the time someone manually replies hours later, the prospect has engaged a competitor.',
    solution: 'Our AI Sales Agent deploys across your website chat, WhatsApp Business API, and Meta Ads to reply in under 1 second. It conducts human-grade qualification, answers objections, and secures calendar bookings automatically.',
    steps: [
      { n: '01', t: 'Configure ICP & Scripts', d: 'We build and train your agent with your qualification criteria, objection handling, and product offers in 7–10 days.' },
      { n: '02', t: 'Deploy Multi-Channel', d: 'We connect the agent directly to your website, WhatsApp Cloud API, Instagram DMs, and CRM pipelines.' },
      { n: '03', t: 'Autonomous Qualification', d: 'The moment a lead inquires, the agent responds in <1s, asks qualifying questions, and handles FAQs.' },
      { n: '04', t: 'Close Qualified Deals', d: 'Your sales reps step in only when appointments are scheduled and buyers are verified with full context.' },
    ],
    features: [
      'Sub-second automated replies — 24 hours a day, 7 days a week, 365 days a year',
      'Conversational qualification matching your enterprise ICP criteria',
      'Direct scheduling integration into Google Calendar, Outlook, and Calendly',
      'Automated multi-channel follow-up sequences across WhatsApp and email',
      'Real-time bi-directional synchronization with HubSpot, Supabase, and custom CRMs',
      'Comprehensive weekly executive report detailing conversion rates and conversation transcripts',
      '7–10 day custom deployment handled entirely by our engineering team'
    ],
    reviews: [
      { name: 'Vikram Sethi', role: 'Managing Director · Real Estate Dubai', text: 'We scaled international inquiries without hiring additional night-shift reps. Inbound UAE and US buyers get instant WhatsApp replies and booked slots.', stars: 5 },
      { name: 'Karthik Nair', role: 'EdTech Founder · Bengaluru', text: 'We were losing up to 40% of weekend leads before installing the agent. First month alone it booked 38 qualified student strategy sessions.', stars: 5 },
    ],
    stats: [
      ['< 1s', 'Avg Reply Time'],
      ['24/7', 'Always Online'],
      ['3.2×', 'Conversion Lift'],
      ['7–10 Days', 'Turnkey Setup']
    ],
  },
  'ad-copy-generator': {
    name: 'AI Ad Copy & Creative Engine',
    icon: Target,
    color: '#38bdf8',
    badge: 'Marketing Intelligence',
    isLive: false,
    tagline: 'High-ROAS Meta & Google ad copy, headlines, and hooks generated in seconds.',
    hero: 'Writing high-converting ad copy requires deep psychology, market awareness calibration, and relentless creative testing. Our engine generates multi-angle hooks, primary copy, and CTAs calibrated on direct-response frameworks that produce high ROAS.',
    tryLink: '/contact?product=ad-copy-generator',
    problem: 'Creative fatigue drains ad performance rapidly. Marketers and founders struggle to produce 10+ fresh angles every week, leading to audience saturation, rising CPAs, and wasted ad spend.',
    solution: 'The Ad Copy Engine generates dozens of distinct direct-response angles across AIDA, Problem-Agitate-Solve (PAS), and Before-After-Bridge frameworks, ready for immediate split-testing.',
    steps: [
      { n: '01', t: 'Define Offer & ICP', d: 'Enter your product URL, target audience pain points, and current conversion goal in 2 minutes.' },
      { n: '02', t: 'Generate 10+ Angles', d: 'Receive multi-platform headlines, primary body copy, and high-intent CTAs mapped to awareness levels.' },
      { n: '03', t: 'Deploy & A/B Test', d: 'Push winning copy variants directly into Meta Ads Manager and Google Ads campaigns.' },
      { n: '04', t: 'Scale Winning Hooks', d: 'Identify winning angles and generate iterative variations to prevent creative fatigue indefinitely.' },
    ],
    features: [
      'Native copy generation optimized for Meta Ads, Google Search, YouTube, and LinkedIn',
      'Hooks built on proven direct-response frameworks (AIDA, PAS, BAB, Storytelling)',
      'Awareness-level tuning: Unaware, Problem-Aware, Solution-Aware, Product-Aware, Most-Aware',
      'Automated policy compliance scanning to prevent Meta and Google ad rejections',
      'Direct copy-paste and CSV export into media buying accounts'
    ],
    stats: [
      ['Meta+Google', 'Platform Native'],
      ['10+ Angles', 'Per Brief'],
      ['A/B Ready', 'Instant Testing'],
      ['Seconds', 'Turnaround']
    ],
  },
  'reporting-assistant': {
    name: 'Autonomous Reporting Intelligence',
    icon: BarChart3,
    color: '#38bdf8',
    badge: 'Analytics Engine',
    isLive: false,
    tagline: 'Executive weekly ROAS & attribution summaries without manual spreadsheets.',
    hero: 'Stop spending Monday mornings manually downloading CSVs from Meta Ads, Google Ads, and analytics dashboards. Our Autonomous Reporting Intelligence aggregates your cross-channel data and delivers plain-English executive summaries and capital allocation guidance.',
    tryLink: '/contact?product=reporting-assistant',
    problem: 'Raw data is overwhelming without interpretation. Marketing dashboards are cluttered with vanity metrics, hiding critical issues like rising CPA trends, creative fatigue, and budget bleed until money has already been lost.',
    solution: 'Connect your ad channels and receive weekly synthesized executive briefs. It identifies exactly what drove revenue changes, highlights underperforming ad sets, and suggests reallocation moves.',
    steps: [
      { n: '01', t: 'Connect Ad Accounts', d: 'Securely link Meta Ads Manager, Google Ads, and Google Analytics 4 in a 5-minute setup.' },
      { n: '02', t: 'Set Unit Economics', d: 'Define your target CPA, minimum ROAS, and customer lifetime value benchmarks.' },
      { n: '03', t: 'Weekly Intelligence Brief', d: 'Every Monday, receive a clean executive digest breaking down real profit and key drivers.' },
      { n: '04', t: 'Allocate Capital Accurately', d: 'Make confident media-buying decisions backed by mathematical attribution.' },
    ],
    features: [
      'Automated cross-channel data unification across Meta Ads, Google Ads, and GA4',
      'Plain-English executive summaries with zero confusing marketing jargon',
      'Real-time anomaly detection flagging budget bleed, CPA spikes, and broken tracking',
      'Cohort analysis and attribution modeling against your actual unit economics',
      '1-click branded PDF executive export for founders, investors, and stakeholders'
    ],
    stats: [
      ['Weekly', 'Auto Briefs'],
      ['Cross-Channel', 'Unified Data'],
      ['0', 'Manual Spreadsheets'],
      ['1-Click', 'PDF Export']
    ],
  },
};

const AIProductLanding: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const p = id ? productsData[id] : null;

  const handleNavigate = (path: string) => {
    if (!path) return;
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(path);
  };

  if (!p) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center text-white gap-5 px-4">
        <Search size={44} className="text-[#38bdf8]" />
        <h1 className="text-2xl sm:text-3xl font-bold">Product Specification Not Found</h1>
        <Link to="/ai-products" className="inline-flex items-center gap-2 bg-[#1F4B99] text-white px-6 py-3 rounded-xl text-xs font-bold">
          ← Back to SaaS Suite
        </Link>
      </div>
    );
  }

  const isLive = p.isLive;
  const IconComp = p.icon;

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen font-sans selection:bg-[#38bdf8]/30">
      
      <SEO
        title={`${p.name} | Social Ninja's SaaS`}
        description={p.hero}
        keywords={`${p.name}, Social Ninja's, SaaS, growth software`}
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Link
            to="/ai-products"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={14} /> Back to All SaaS Products
          </Link>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <IconComp size={24} />
            </div>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full border ${
                isLive
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
              }`}
            >
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
              {p.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {p.name}
          </h1>

          <p className="text-base sm:text-xl font-bold text-[#38bdf8] max-w-2xl mx-auto">
            {p.tagline}
          </p>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {p.hero}
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-2">
            <button
              onClick={() => handleNavigate(p.tryLink)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-[#1F4B99]/25"
            >
              {isLive ? 'Launch Fit Ninja Pro →' : 'Apply for Early Access →'}
            </button>
            {p.exploreLink && (
              <a
                href={p.exploreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold px-8 py-3.5 rounded-xl text-xs transition-all"
              >
                Browse 4,000+ Exercise Library <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Key Stats Bar */}
          <div className="max-w-2xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-3">
            {p.stats.map(([n, l]) => (
              <div key={l} className="text-center p-2">
                <div className="text-base sm:text-lg font-black text-white">{n}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </AuroraBackground>

      {/* PROBLEM / SOLUTION (Strict 1140px container) */}
      <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard className="p-8 bg-[#0e121d] border border-neutral-800/80 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
              THE BOTTLENECK
            </div>
            <h3 className="text-lg font-bold text-white">Why Traditional Methods Fail</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">{p.problem}</p>
          </SpotlightCard>

          <SpotlightCard className="p-8 bg-[#0e121d] border border-[#38bdf8]/30 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              THE ARCHITECTURE
            </div>
            <h3 className="text-lg font-bold text-white">How We Solve It</h3>
            <p className="text-sm text-neutral-200 leading-relaxed">{p.solution}</p>
          </SpotlightCard>
        </div>
      </div>

      {/* HOW IT WORKS (4 STEPS) */}
      <div className="border-t border-neutral-800/80 py-16 bg-[#07090e]">
        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              STEP-BY-STEP EXECUTION
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Engineered for Frictionless Progress.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.steps.map((s, i) => (
              <SpotlightCard key={i} className="p-6 bg-[#0e121d] border border-neutral-800/80 space-y-3">
                <div className="text-2xl font-black text-[#38bdf8] font-mono">{s.n}</div>
                <h4 className="text-base font-bold text-white">{s.t}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.d}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

      {/* CORE CAPABILITIES / FEATURES */}
      <div className="border-t border-neutral-800/80 py-16 bg-[#07090e]">
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              SYSTEM CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Everything Included in the Platform
            </h2>
          </div>

          <div className="space-y-3">
            {p.features.map((f, i) => (
              <SpotlightCard key={i} className="p-4 sm:p-5 bg-[#0e121d] border border-neutral-800/80 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{f}</span>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS (IF APPLICABLE) */}
      {p.reviews && p.reviews.length > 0 && (
        <div className="border-t border-neutral-800/80 py-16 bg-[#07090e]">
          <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                VERIFIED ATHLETE FEEDBACK
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Real Athletes. Measurable Gains.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {p.reviews.map((r, i) => (
                <SpotlightCard key={i} className="p-6 bg-[#0e121d] border border-neutral-800/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[...Array(r.stars)].map((_, j) => (
                        <Star key={j} size={14} className="fill-[#38bdf8] text-[#38bdf8]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                      "{r.text}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="text-xs font-bold text-white">{r.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{r.role}</div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRICING PLANS */}
      {p.plans && p.plans.length > 0 && (
        <div className="border-t border-neutral-800/80 py-16 bg-[#07090e]">
          <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                TRANSPARENT PRICING
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Start Free. Upgrade to Pro Anytime.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                ₹99 introductory first month hook · ₹399/mo renewal · Zero contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {p.plans.map((pl, i) => (
                <SpotlightCard
                  key={i}
                  className={`p-8 bg-[#0e121d] border rounded-2xl flex flex-col justify-between space-y-6 ${
                    pl.popular ? 'border-[#38bdf8]/60 shadow-lg shadow-[#38bdf8]/10' : 'border-neutral-800/80'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{pl.name}</span>
                      {pl.popular && (
                        <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-white">{pl.price}</div>
                      <div className="text-xs text-neutral-400 mt-1">{pl.period}</div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                      {pl.features.map((feat, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 size={14} className="text-[#38bdf8] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate(p.tryLink)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                      pl.popular
                        ? 'bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white shadow-md'
                        : 'bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    {pl.price === '₹0' ? 'Get Free Starter Pass →' : 'Claim ₹99 Pro Pass →'}
                  </button>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FINAL BOTTOM CALLOUT */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-8">
        <SpotlightCard className="p-10 sm:p-14 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 text-center space-y-5 rounded-3xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {isLive ? 'Ready to Upgrade Your Athletic Training?' : 'Ready to Deploy Autonomous Growth?'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {isLive
              ? 'Join athletes worldwide using Fit Ninja Pro for automated linear progression, smart rest timers, and adaptive nutrition.'
              : 'Speak directly with our technical team to schedule custom agent onboarding for your enterprise pipeline.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNavigate(p.tryLink)}
              className="inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-[#1F4B99]/25"
            >
              {isLive ? 'Launch Fit Ninja Pro →' : 'Book Custom Deployment Strategy →'}
            </button>
          </div>
        </SpotlightCard>
      </div>

    </div>
  );
};

export default AIProductLanding;
