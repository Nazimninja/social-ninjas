import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, PenTool, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';

const AiProducts: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#020617] overflow-hidden selection:bg-brand-primary selection:text-black font-sans">
            <SEO
                title="AI Products | Social Ninja's"
                description="Explore our suite of powerful AI products designed to automate marketing, generate content, and scale your business instantly."
                keywords="AI products, Content Studio, Lead Automation, AI marketing tools, Social Ninjas AI"
            />

            {/* --- BACKGROUND EFFECT --- */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 pt-20 pb-20 border-b border-brand-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 mb-10 mx-auto animate-fade-in-up backdrop-blur-md">
                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
                            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Enterprise AI Suite</span>
                        </div>

                        <h1 className="font-display text-4xl md:text-8xl font-black text-white mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary animate-shine">PRODUCTS</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '200ms' }}>
                            A complete suite of intelligent agents and automation tools designed to replace busywork, generate high-converting content, and scale operations infinitely.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- PRODUCTS GRID --- */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* PRODUCT 1: CONTENT STUDIO */}
                    <div className="group relative bg-[#050A1F]/80 backdrop-blur-md border border-brand-primary/20 hover:border-brand-primary/80 transition-all duration-500 overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.2)]">
                        <div className="absolute top-6 right-6">
                            <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-widest uppercase">
                                Flagship
                            </div>
                        </div>

                        <div className="p-10 h-full flex flex-col relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-transparent border border-brand-primary/40 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                                <span className="text-3xl">🥷</span>
                            </div>

                            <h3 className="text-3xl text-white font-display font-bold mb-2 group-hover:text-brand-primary transition-colors duration-300">Content Studio</h3>
                            <p className="text-brand-primary/80 text-xs uppercase tracking-widest mb-6 font-bold">
                                AI Content Generation Engine
                            </p>
                            
                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                Deploy an AI that researches live trends in your niche and writes platform-native posts, hooks, and carousels automatically. 
                                Stop guessing what works. Let the data write it.
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {["Live Trend Research", "Platform-Native Formatting", "Automated Visual Prompts", "Zero Writer's Block"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 group-hover:text-white transition-colors">
                                        <Zap size={16} className="text-brand-primary mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto relative z-20">
                                <a href="/content-studio.html" className="block w-full py-4 rounded-xl bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 border border-brand-primary/30 text-brand-primary font-bold tracking-wider text-sm uppercase text-center hover:bg-brand-primary hover:text-black transition-all flex justify-center items-center gap-2 group/btn">
                                    Launch Studio <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT 2: LEAD AUTOMATION */}
                    <div className="group relative bg-[#050A1F]/80 backdrop-blur-md border border-brand-primary/20 hover:border-brand-primary/60 transition-all duration-500 overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="p-10 h-full flex flex-col relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary/20 to-transparent border border-brand-secondary/30 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-brand-secondary group-hover:text-black transition-all duration-500">
                                <Bot size={32} className="text-brand-secondary group-hover:text-black" />
                            </div>

                            <h3 className="text-3xl text-white font-display font-bold mb-2 group-hover:text-brand-secondary transition-colors duration-300">Lead Automation</h3>
                            <p className="text-brand-secondary/80 text-xs uppercase tracking-widest mb-6 font-bold">
                                AI Sales & Support Agents
                            </p>
                            
                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                Install customized conversational AI agents on your site that qualify leads, book calendar appointments, and answer common questions 24/7.
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {["Instant Responses 24/7", "Lead Pre-qualification", "Automated Calendar Booking", "Human Escalation Logic"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 group-hover:text-white transition-colors">
                                        <TrendingUp size={16} className="text-brand-secondary mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto relative z-20">
                                <Link to="/promo/ai-lead-handling" className="block w-full py-4 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary font-bold tracking-wider text-sm uppercase text-center hover:bg-brand-secondary hover:text-black transition-all flex justify-center items-center gap-2 group/btn">
                                    View Capabilities <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT 3: CUSTOM INTEGRATIONS */}
                    <div className="group relative bg-[#050A1F]/80 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] lg:col-span-2">
                        <div className="p-10 flex flex-col md:flex-row gap-10 items-center relative z-10">
                            <div className="flex-1">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <Database size={32} className="text-white group-hover:text-black" />
                                </div>
                                <h3 className="text-3xl text-white font-display font-bold mb-2">Custom AI & Integrations</h3>
                                <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6 font-bold">
                                    Enterprise scale operations
                                </p>
                                <p className="text-neutral-400 leading-relaxed max-w-2xl">
                                    Need something specific? We build custom Zapier flows, Make.com automations, CRM syncs, and proprietary internal dashboards to connect all your data together into one seamless machine.
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-auto">
                                <Link to="/contact">
                                    <Button className="w-full md:w-auto px-10 py-5 rounded-full bg-white text-black hover:bg-neutral-200 font-bold tracking-wide">
                                        Talk to an Engineer
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* CTA SECTION */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
                <div className="bg-brand-surface border border-brand-primary/20 rounded-3xl overflow-hidden shadow-2xl relative p-12 text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl text-white font-display font-bold mb-6">Not sure where to start?</h2>
                        <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">Let our team analyze your business and recommend the perfect automation stack to increase revenue.</p>
                        <Link to="/contact">
                            <Button variant="primary" className="rounded-full px-10 py-4 font-bold shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)]">
                                Request Strategy Call
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AiProducts;
