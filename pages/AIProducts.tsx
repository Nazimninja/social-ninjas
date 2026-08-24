import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

const products = [
  {
    id: 'content-studio', badge: '🟢 Live Now', icon: '⚡', name: 'AI Content Studio',
    tagline: 'Your whole week of content — written in 60 seconds.',
    desc: 'Tell the AI about your brand once. Every week it looks up what\'s trending in your niche, then writes your captions, Reel scripts, carousel slides, and hashtags. All platform-specific. All ready to copy and post.',
    color: '#4281f5',
    tryLink: '/app/content-studio?plan=trial',
    learnLink: '/content-studio',
    stats: [['150+','Brands Using It'], ['2.4M+','Posts Generated'], ['7','Platforms'], ['60s','Per Generate']],
    features: ['Researches live trends before writing — every time','Word-for-word scripts for Reels and YouTube Shorts','Captions written specifically for each platform','Carousel slide copy — paste straight into Canva','Real hashtag research — never generic or repeated','Thread writer for Twitter/X and Threads','Posting checklist with the best time to post'],
    plans: [
      { name: 'Starter', price: '₹2,999', note: '15 posts/mo · 2 platforms' },
      { name: 'Growth',  price: '₹5,499', note: '25 posts/mo · 4 platforms', popular: true },
      { name: 'Pro',     price: '₹8,999', note: 'Unlimited posts · All 7 platforms' },
    ],
  },
  {
    id: 'fit-ninja', badge: '🟢 v2.0 Live', icon: '🥷', name: 'Fit Ninja',
    tagline: '1,324+ Animated Exercises, Guided Workouts & AI Macro Nutrition.',
    desc: 'The ultimate gym workout and body transformation OS. Features 1,324+ animated exercise demos, guided set player with smart rest timers, Greyskull LP & linear progression algorithms, real-time anatomical muscle heatmaps, and AI macro nutrition planning.',
    color: '#f59e0b',
    tryLink: 'https://fit.socialninjas.in',
    learnLink: 'https://fit.socialninjas.in',
    stats: [['1,324+','Animated Exercises'], ['4.9★','User Rating'], ['100%','Offline PWA Ready'], ['₹299/mo','Starting Price']],
    features: [
      '1,324+ searchable exercises with animated demos & equipment filters',
      'Guided workout execution player with live rest timers and wake-lock',
      'Anatomical muscle heatmap showing trained vs neglected muscle groups',
      'Greyskull LP, linear progression & 1RM strength tracking algorithms',
      'AI Macro & Nutrition engine with custom high-protein & veg meal plans',
      '100% offline-capable PWA for seamless gym use on iPhone & Android'
    ],
    plans: [
      { name: 'Fit Ninja Pro', price: '₹299/mo', note: 'Full 1,324+ Exercises, Workouts & AI Nutrition' },
    ],
  },
  {
    id: 'ai-sales-agent', badge: '🔜 Coming Soon', icon: '🤖', name: 'AI Sales Agent',
    tagline: 'Never miss a lead again. Even at 3am.',
    desc: 'An AI that replies to every new lead in under 1 second — any time of day or night. It answers their questions, figures out if they\'re a good fit, and books them straight into your calendar.',
    color: '#9b8ef0',
    tryLink: '/contact',
    learnLink: '/ai-products/ai-sales-agent',
    stats: [['0.8s','Avg Reply Time'], ['24/7','Never Offline'], ['3×','More Conversions'], ['7–10','Days to Launch']],
    features: ['Responds to leads instantly — before your competitors','Qualifies each lead with smart questions','Books meetings directly into your calendar','Sends follow-up emails and SMS automatically','Logs everything to your CRM — no manual work','Full weekly report of all conversations'],
  },
  {
    id: 'ad-copy-generator', badge: '🔜 Coming Soon', icon: '🎯', name: 'AI Ad Copy Generator',
    tagline: 'High-converting ad copy in seconds, not days.',
    desc: 'Stop spending hours writing Facebook and Google ads. Describe what you\'re selling, and the AI writes multiple versions of your headline, body copy, and CTA — all based on proven frameworks.',
    color: '#2fcf8e',
    tryLink: '/contact',
    learnLink: '/ai-products/ad-copy-generator',
    stats: [['Meta+Google','Both Platforms'], ['∞','Copy Variations'], ['A/B','Test Ready'], ['Seconds','Not Days']],
    features: ['Headlines and body copy for Meta and Google ads','Multiple variations ready to A/B test','Hooks based on psychology frameworks that convert','CTA options tuned to your campaign goal','Keeps your brand voice consistent across all ads'],
  },
  {
    id: 'reporting-assistant', badge: '🔜 Coming Soon', icon: '📊', name: 'AI Reporting Assistant',
    tagline: 'Know exactly what\'s working — without the spreadsheets.',
    desc: 'Connect your ad accounts and every week the AI sends you a plain-English summary of what worked, what didn\'t, and what to do about it. No more spending Mondays building reports.',
    color: '#e8b86d',
    tryLink: '/contact',
    learnLink: '/ai-products/reporting-assistant',
    stats: [['Weekly','Auto Reports'], ['Meta+Google','Data Connected'], ['Plain English','No Jargon'], ['1-Click','PDF Export']],
    features: ['Automatic weekly performance summaries','Written in plain English — no marketing jargon','Spots problems before they cost you more money','Compares your performance to industry benchmarks','Export as PDF to share with your team or clients'],
  },
];

export const AIProducts: React.FC = () => {
  useReveal();
  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen font-sans selection:bg-[#1F4B99]/40">
      
      <SEO
        title="AI Products & SaaS Suite | Social Ninja's"
        description="Explore AI Content Studio, Fit Ninja, AI Sales Agent, Ad Copy Generator, and Reporting Assistant built by Social Ninja's."
        keywords="AI content generator India, AI marketing tools, Fit Ninja, Social Ninja's AI"
      />

      {/* HERO */}
      <div className="relative pt-36 pb-20 overflow-hidden border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            ✨ PREMIUM AI SAAS PRODUCTS
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight font-['Bricolage_Grotesque'] text-white">
            Tools that do the work <br />
            <span className="bg-gradient-to-r from-white via-[#4281f5] to-[#3ba213] bg-clip-text text-transparent">
              you don't have time for.
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We're building a suite of AI tools that handle repetitive marketing and health workflows — so you can focus on scaling your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link to="/app/content-studio?plan=trial" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#1F4B99]/25 transition-all text-sm">
              ⚡ Try Content Studio Free
            </Link>
            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-8 py-3.5 rounded-full hover:border-neutral-700 transition-all text-sm">
              Join Waitlist for New Tools →
            </Link>
          </div>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {products.map((p, i) => (
          <div key={p.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-[#0e121d] border border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl shadow-inner">
                  {p.icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${p.badge.includes('Live') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}>
                  {p.badge}
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Bricolage_Grotesque'] mb-2">
                  {p.name}
                </h2>
                <p className="text-sm sm:text-base font-semibold" style={{ color: p.color }}>
                  {p.tagline}
                </p>
              </div>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {p.desc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {p.stats.map(([n, l]) => (
                  <div key={l} className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-3 text-center space-y-1">
                    <div className="text-base sm:text-lg font-bold font-['Bricolage_Grotesque']" style={{ color: p.color }}>
                      {n}
                    </div>
                    <div className="text-[10px] text-neutral-400 leading-tight">
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {p.tryLink.startsWith('http') ? (
                  <a href={p.tryLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md">
                    {p.badge.includes('Live') ? '⚡ Open App →' : 'Join Waitlist →'}
                  </a>
                ) : (
                  <Link to={p.tryLink} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md">
                    {p.badge.includes('Live') ? '⚡ Try Free →' : 'Join Waitlist →'}
                  </Link>
                )}

                {p.learnLink.startsWith('http') ? (
                  <a href={p.learnLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs hover:border-neutral-700 transition-all">
                    See Full Details
                  </a>
                ) : (
                  <Link to={p.learnLink} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs hover:border-neutral-700 transition-all">
                    See Full Details
                  </Link>
                )}
              </div>
            </div>

            {/* Included Features & Pricing Column */}
            <div className={`bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: p.color }}>
                WHAT'S INCLUDED
              </div>

              <div className="space-y-3">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    <CheckCircle2 size={16} style={{ color: p.color }} className="shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {p.plans && (
                <div className="pt-4 border-t border-neutral-800/80 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                    PRICING OPTIONS
                  </div>
                  <div className="space-y-2.5">
                    {p.plans.map((pl: any) => (
                      <div
                        key={pl.name}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs ${
                          pl.popular
                            ? 'bg-[#1F4B99]/15 border-[#1F4B99]/40 text-white'
                            : 'bg-neutral-900/80 border-neutral-800 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{pl.name}</span>
                          {pl.popular && (
                            <span className="text-[9px] font-extrabold bg-[#1F4B99]/30 border border-[#1F4B99]/50 text-[#4281f5] px-2 py-0.5 rounded-full uppercase">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm text-white font-['Bricolage_Grotesque']">
                            {pl.price}
                          </div>
                          <div className="text-[10px] text-neutral-400">{pl.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-[11px] text-neutral-500 pt-1">
                    Instant access · Cancel anytime
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProducts;
