
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Target, Zap, TrendingUp, ArrowRight, BarChart3, Users, Globe, ChevronRight, ShieldCheck } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const CaseStudies: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'E-Commerce', 'B2B Lead Gen', 'App Growth', 'Local Business'];

    const filteredStudies = activeCategory === 'All'
        ? caseStudies
        : caseStudies.filter(s => s.category === activeCategory);

    return (
        <div className="pt-28 pb-24 min-h-screen bg-white relative selection:bg-brand-primary selection:text-black">
            <SEO
                title="Case Studies | Real Results: $50M+ Revenue Generated via Paid Media"
                description="See the proof. We don't hide behind vanity metrics. Explore how we drove 5x ROAS for E-commerce brands and 120% lead volume for B2B companies."
            />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <ScrollReveal>
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap size={14} />
                            <span>Proven Track Record</span>
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 mb-8 leading-[0.9]">
                            We let the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary">Data do the talking.</span>
                        </h1>
                        <p className="text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
                            No fluff. No vanity metrics. Just engineered growth systems that print revenue for our partners.
                        </p>
                    </div>

                    {/* Agency Aggregated Stats Banner */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
                        {[
                            { label: "Ad Spend Managed", value: "$50M+" },
                            { label: "Avg. ROAS", value: "4.5x" },
                            { label: "Client Retention", value: "97%" },
                            { label: "Global Presence", value: "Worldwide" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl text-center backdrop-blur-sm hover:border-brand-primary/30 transition-colors">
                                <p className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-1">{stat.value}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Category Filter */}
                <ScrollReveal delay="100ms">
                    <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-neutral-200 pb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-white text-black shadow-[0_0_20px_#adadad] scale-105'
                                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Case Studies List - Interconnected Layout */}
                <div className="space-y-24">
                    {filteredStudies.map((study, index) => (
                        <ScrollReveal key={study.id} delay="100ms">
                            <div className="bg-neutral-50/50 border border-neutral-200 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
                                {/* Background Gradient */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand-primary/10 transition-colors duration-700"></div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                                    {/* Left: Challenge & Impact */}
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-8">
                                                <img src={study.logo} alt={study.client} className="h-12 w-auto object-contain brightness-0 invert" />
                                                <div className="h-4 w-px bg-neutral-100"></div>
                                                <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">{study.category}</span>
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                                                {study.client}: <span className="text-neutral-600">{study.metricLabel}</span>
                                            </h2>

                                            <div className="space-y-6 mb-8">
                                                <div>
                                                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                        <Target size={14} className="text-red-400" /> The Bottleneck
                                                    </h3>
                                                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base border-l-2 border-neutral-200 pl-4">
                                                        {study.challenge}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                        <Zap size={14} className="text-brand-primary" /> The Fix
                                                    </h3>
                                                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base border-l-2 border-neutral-200 pl-4">
                                                        {study.solution}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {study.tags.map((tag, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-mono">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Link to={`/case-studies/${study.id}`}>
                                            <Button variant="outline" className="rounded-full w-full md:w-auto border-neutral-200 hover:border-brand-primary group/btn">
                                                View Full Breakdown <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Right: The "Evidence" (Testimonial + Metrics) */}
                                    <div className="relative">
                                        {/* 1. Main Visual Card (Metric) */}
                                        <div className="relative z-10 bg-neutral-50 border border-neutral-200 rounded-3xl p-8 mb-6 shadow-2xl group-hover:border-brand-primary/30 transition-all duration-500">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Primary Outcome</p>
                                                    <p className="text-5xl md:text-6xl font-display font-bold text-neutral-900">{study.mainMetric}</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                                                    <TrendingUp size={24} />
                                                </div>
                                            </div>

                                            {/* Mini Chart Visualization */}
                                            <div className="h-24 w-full flex items-end gap-1 mb-6 opacity-50">
                                                {[40, 65, 55, 80, 70, 90, 100].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-brand-primary rounded-t-sm hover:bg-white transition-colors" style={{ height: `${h}%` }}></div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
                                                {study.secondaryMetrics.map((m, i) => (
                                                    <div key={i}>
                                                        <p className="text-xl font-bold text-neutral-900">{m.value}</p>
                                                        <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">{m.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2. Interconnected Testimonial Card */}
                                        {study.testimonial && (
                                            <div className="relative md:-ml-12 z-20 bg-neutral-50 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 shadow-lg transform md:translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                                                <div className="absolute -top-3 -left-3 bg-brand-primary text-neutral-900 p-2 rounded-lg shadow-lg">
                                                    <Users size={16} fill="currentColor" />
                                                </div>
                                                <p className="text-neutral-700 text-sm italic mb-4 leading-relaxed">"{study.testimonial.text}"</p>
                                                <div className="flex items-center gap-3">
                                                    <img src={study.testimonial.image} alt={study.testimonial.author} className="w-10 h-10 rounded-full border border-neutral-200" />
                                                    <div>
                                                        <p className="text-neutral-900 text-xs font-bold">{study.testimonial.author}</p>
                                                        <p className="text-neutral-500 text-[10px] uppercase font-bold">{study.testimonial.role}</p>
                                                    </div>
                                                    <div className="ml-auto px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                                                        <ShieldCheck size={10} /> Verified
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24">
                    <ScrollReveal>
                        <div className="relative rounded-[3rem] overflow-hidden bg-brand-primary p-12 md:p-24 text-center group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-50"></div>

                            <div className="relative z-10">
                                <h2 className="font-display text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">Your growth is waiting.</h2>
                                <p className="text-neutral-900/80 text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                                    We analyze your data, identify the bottlenecks, and deploy the system to fix them.
                                </p>
                                <Link to="/contact">
                                    <button className="bg-white text-neutral-900 px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                        Get Your Free Audit <ChevronRight size={20} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
