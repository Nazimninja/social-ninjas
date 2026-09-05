import React from 'react';
import { ArrowRight, Zap, MessageSquare, Clock, Home, DollarSign, Sparkles, Dumbbell } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

const TOOLS = [
  {
    id: 'fit-ninja',
    Icon: Dumbbell,
    title: 'Fit Ninja — Workout & Nutrition PWA',
    desc: '1,324+ animated exercises, guided workout player, smart rest timers, muscle heatmaps, and AI macro nutrition engine.',
    badge: 'Fitness OS',
    badgeColor: '#f59e0b',
    url: 'https://fit.socialninjas.in',
    isExternal: true,
  },
  {
    id: 'whatsapp',
    Icon: MessageSquare,
    title: 'WhatsApp Link Generator',
    desc: 'Generate pre-filled instant WhatsApp chat links for your ad campaigns and social media bios in seconds.',
    badge: 'Marketing Tool',
    badgeColor: '#3ba213',
    url: 'https://linkwa.in',
    isExternal: true,
  },
  {
    id: 'salary-conv',
    Icon: Clock,
    title: 'Hourly ↔ Salary Converter',
    desc: 'Instantly convert hourly wages to annual, monthly, bi-weekly, and weekly earnings — or reverse from annual to hourly.',
    badge: 'Calculators',
    badgeColor: '#4281f5',
    url: 'https://salary.socialninjas.in/',
    isExternal: true,
  },
  {
    id: 'salary-calc',
    Icon: DollarSign,
    title: 'US Take-Home Pay Calculator',
    desc: 'Calculate net take-home salary after federal, state, and local taxes across all 50 US states.',
    badge: 'Financial Tool',
    badgeColor: '#a855f7',
    url: 'https://salary.socialninjas.in/salary-calculator/',
    isExternal: true,
  },
  {
    id: 'mortgage',
    Icon: Home,
    title: 'Mortgage Rate Calculator',
    desc: 'Estimate monthly mortgage payments including principal, interest, taxes, and PMI with any interest rate.',
    badge: 'Real Estate Tool',
    badgeColor: '#f59e0b',
    url: 'https://mortgage.socialninjas.in/',
    isExternal: true,
  },
];

const Tools: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Free Growth & Marketing Tools | Social Ninja's"
        description="Explore free calculators and growth tools built by Social Ninja's for performance marketers."
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            <Zap size={12} /> FREE GROWTH UTILITIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Free Marketing & <br />
            <span className="text-[#1F4B99]">Financial Tools.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            A suite of free utilities designed to streamline lead capture, unit economics, and campaign calculations.
          </p>
        </div>
      </AuroraBackground>

      {/* TOOLS GRID */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left group w-full block decoration-none"
              style={{ textDecoration: 'none' }}
            >
              <SpotlightCard className="p-7 bg-[#0e121d] border border-neutral-800 space-y-5 hover:border-neutral-700 transition-all duration-300 h-full">
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
                  <h3 className="text-lg font-bold text-white group-hover:text-[#4281f5] transition-colors duration-200 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{tool.desc}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold pt-1" style={{ color: tool.badgeColor }}>
                  Open Tool <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tools;
