import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Sparkles, MessageSquare, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

const TOOLS_LIST = [
  { id: 'whatsapp-link-gen', title: 'WhatsApp Direct Chat Link Generator', desc: 'Generate pre-filled instant WhatsApp chat links for your ad campaigns and social media bios in seconds.', path: '/tools/whatsapp-link-gen', badge: 'Free Marketing Tool' },
  { id: 'us-takehome-pay-calc', title: 'US Take-Home Pay & Salary Calculator', desc: 'Calculate net take-home salary after federal, state, and local taxes across all 50 US states.', path: '/tools/us-takehome-pay-calc', badge: 'Financial Growth Tool' },
  { id: 'hourly-salary-conv', title: 'Hourly to Annual Salary Converter', desc: 'Convert hourly wages to annual, monthly, bi-weekly, and weekly earnings instantly.', path: '/tools/hourly-salary-conv', badge: 'Calculators' },
  { id: 'mortgage-calc', title: 'Mortgage Payment & Rate Calculator', desc: 'Estimate monthly mortgage payments including principal, interest, taxes, and PMI.', path: '/tools/mortgage-calc', badge: 'Real Estate Tool' }
];

const Tools: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Free Growth & Marketing Tools | Social Ninja's"
        description="Explore free calculators and growth tools built by Social Ninja's for performance marketers."
      />

      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            FREE GROWTH UTILITIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Free Marketing & <br />
            <span className="text-[#1F4B99]">Financial Calculators.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Free tools built by Social Ninja’s to streamline lead capture, unit economics, and campaign calculations.
          </p>
        </div>
      </AuroraBackground>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOOLS_LIST.map((tool, i) => (
            <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-3 py-1 bg-[#1F4B99]/15 text-[#4281f5] border border-[#1F4B99]/30 rounded-full">
                  {tool.badge}
                </span>
                <Wrench size={18} className="text-[#4281f5]" />
              </div>

              <h3 className="text-xl font-bold text-white">{tool.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{tool.desc}</p>

              <div className="pt-2">
                <Link to={tool.path}>
                  <ShinyButton variant="secondary" className="w-full text-xs font-bold">
                    Use Tool Free <ArrowRight size={14} />
                  </ShinyButton>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tools;
