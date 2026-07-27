import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

const JOBS = [
  { title: 'AI Automation Engineer', loc: 'Remote / Dubai', type: 'Full-Time', desc: 'Build autonomous WhatsApp & web AI lead qualifiers using LLM APIs, Webhooks, and PostgREST databases.' },
  { title: 'Senior Meta Ads Strategist', loc: 'Remote / Bengaluru', type: 'Full-Time', desc: 'Manage margin-backed paid traffic campaigns with ₹10L+ monthly budgets across e-commerce & high-ticket niches.' },
  { title: 'Creative Strategist & Motion Designer', loc: 'Remote', type: 'Full-Time', desc: 'Design high-converting short-form video ads and carousel assets based on conversion analytics.' }
];

const Careers: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Careers | Social Ninja's"
        description="Join Social Ninja's team of AI engineers and growth strategists scaling revenue globally."
      />

      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            JOIN OUR TEAM
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Build the Future of <br />
            <span className="text-[#1F4B99]">AI Growth Engineering.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            We are hiring elite media buyers, AI developers, and creative strategists across India & Dubai.
          </p>
        </div>
      </AuroraBackground>

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {JOBS.map((job, i) => (
          <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-[#1F4B99]/15 text-[#4281f5] border border-[#1F4B99]/30 rounded-full">
                  {job.type}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{job.loc}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{job.title}</h3>
              <p className="text-xs text-neutral-400 max-w-lg leading-relaxed">{job.desc}</p>
            </div>

            <Link to="/contact">
              <ShinyButton variant="secondary" className="text-xs font-bold whitespace-nowrap">
                Apply Now <ArrowRight size={14} />
              </ShinyButton>
            </Link>
          </SpotlightCard>
        ))}
      </section>
    </div>
  );
};

export default Careers;
