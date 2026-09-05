import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AuroraBackground from '../components/AuroraBackground';
import SpotlightCard from '../components/SpotlightCard';
import ShinyButton from '../components/ShinyButton';
import { Target, Zap, TrendingUp, ArrowRight, Users, ChevronRight, ShieldCheck, BarChart3 } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const CaseStudies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'E-Commerce', 'B2B Lead Gen', 'App Growth', 'Local Business'];

  const filteredStudies = activeCategory === 'All'
    ? caseStudies
    : caseStudies.filter(s => s.category === activeCategory);

  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Case Studies | Real Results: $50M+ Revenue Generated via Paid Media"
        description="See the proof. We don't hide behind vanity metrics. Explore how we drove 5x ROAS for E-commerce brands and 120% lead volume for B2B companies."
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            <Zap size={12} /> Proven Track Record
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            We let the <br />
            <span className="text-[#1F4B99]">Data do the talking.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            No fluff. No vanity metrics. Just engineered growth systems that print revenue for our partners.
          </p>
        </div>
      </AuroraBackground>

      {/* STATS BANNER */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Ad Spend Managed', value: '$50M+' },
            { label: 'Avg. ROAS', value: '4.5x' },
            { label: 'Client Retention', value: '97%' },
            { label: 'Global Presence', value: 'Worldwide' },
          ].map((stat, i) => (
            <SpotlightCard key={i} className="p-6 bg-[#0e121d] border border-neutral-800 text-center hover:border-[#1F4B99]/30 transition-colors duration-300">
              <p className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-800/80 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1F4B99] text-white shadow-lg shadow-[#1F4B99]/20 scale-105'
                  : 'bg-[#0e121d] text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {filteredStudies.map((study, index) => (
          <SpotlightCard key={study.id} className="p-8 md:p-12 bg-[#0e121d] border border-neutral-800 rounded-3xl group hover:border-neutral-700 transition-colors duration-500 relative overflow-hidden">
            {/* Background glow (GPU-optimized radial gradient) */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(31,75,153,0.18) 0%, transparent 70%)', transform: 'translateZ(0)' }} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
              {/* LEFT: Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    {study.logo && (
                      <img src={study.logo} alt={study.client} className="h-10 w-auto object-contain brightness-0 invert opacity-80" />
                    )}
                    <div className="h-4 w-px bg-neutral-700" />
                    <span className="text-[#4281f5] text-xs font-bold uppercase tracking-widest">{study.category}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                    {study.client}: <span className="text-neutral-400 font-medium">{study.metricLabel}</span>
                  </h2>

                  <div className="space-y-5 mb-8">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Target size={13} className="text-red-400" /> The Bottleneck
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed border-l-2 border-neutral-700 pl-4">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Zap size={13} className="text-[#3ba213]" /> The Fix
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed border-l-2 border-[#3ba213]/40 pl-4">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-[#0b0e17] border border-neutral-800 text-xs text-neutral-500 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={`/case-studies/${study.id}`}>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-700 text-sm font-bold text-neutral-300 hover:border-[#1F4B99] hover:text-white transition-all duration-200 group/btn">
                    View Full Breakdown <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* RIGHT: Metrics */}
              <div className="relative">
                {/* Metric Card */}
                <div className="bg-[#0b0e17] border border-neutral-800 rounded-2xl p-8 mb-5 hover:border-neutral-700 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Primary Outcome</p>
                      <p className="text-5xl md:text-6xl font-black text-white">{study.mainMetric}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/25 text-[#4281f5]">
                      <TrendingUp size={22} />
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-20 w-full flex items-end gap-1 mb-6 opacity-40">
                    {[40, 65, 55, 80, 70, 90, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#1F4B99] rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-neutral-800">
                    {study.secondaryMetrics.map((m, i) => (
                      <div key={i}>
                        <p className="text-xl font-bold text-white">{m.value}</p>
                        <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="relative bg-[#0b0e17] border border-neutral-800 rounded-xl p-5 group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="absolute -top-3 -left-3 bg-[#1F4B99] text-white p-2 rounded-lg">
                      <Users size={14} />
                    </div>
                    <p className="text-sm text-neutral-400 italic mb-4 leading-relaxed mt-1">"{study.testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <img src={study.testimonial.image} alt={study.testimonial.author} className="w-9 h-9 rounded-full border border-neutral-700 object-cover" />
                      <div>
                        <p className="text-white text-xs font-bold">{study.testimonial.author}</p>
                        <p className="text-neutral-500 text-[10px] uppercase font-bold">{study.testimonial.role}</p>
                      </div>
                      <div className="ml-auto px-2 py-1 bg-[#3ba213]/10 border border-[#3ba213]/20 rounded text-[10px] font-bold text-[#3ba213] uppercase tracking-widest flex items-center gap-1">
                        <ShieldCheck size={10} /> Verified
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-5xl mx-auto px-4 text-center">
        <SpotlightCard className="p-12 md:p-20 bg-gradient-to-br from-[#1F4B99]/20 via-[#0e121d] to-[#0e121d] border border-[#1F4B99]/25 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F4B99]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ba213]/30 to-transparent" />
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Your growth is <span className="text-[#1F4B99]">waiting.</span>
          </h2>
          <p className="text-base text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed">
            We analyze your data, identify the bottlenecks, and deploy the system to fix them.
          </p>
          <Link to="/contact">
            <button className="mt-2 px-12 py-5 rounded-full font-black text-base bg-[#1F4B99] hover:bg-[#2558b5] text-white transition-all duration-200 shadow-lg shadow-[#1F4B99]/25 hover:shadow-[#1F4B99]/40 hover:scale-105 flex items-center gap-2 mx-auto">
              Get Your Free Audit <ChevronRight size={18} />
            </button>
          </Link>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default CaseStudies;
