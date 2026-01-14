
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { MessageSquare, Clock, TrendingUp, Settings, CheckCircle, Bot, Zap, Users, XCircle, ArrowRight, Cpu, Database, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const AiAutomation: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#020617] overflow-hidden selection:bg-brand-primary selection:text-black font-sans">
            <SEO
                title="AI Automation | Hire Infinite Workforce | Social Ninja's"
                description="Deploy intelligent AI agents that qualify leads, book appointments, and handle customer support instantly. The new digital workforce."
                keywords="AI business automation, custom AI agents, lead qualification automation, CRM integration services, automated sales funnels"
            />

            {/* --- BACKGROUND EFFECT (Premium/Clean) --- */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 pt-20 pb-32 border-b border-brand-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 mb-10 mx-auto animate-fade-in-up backdrop-blur-md">
                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
                            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">System Online v2.4</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-8xl font-black text-white mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            HIRE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary animate-shine">DIGITAL WORKFORCE</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '200ms' }}>
                            Initialize intelligent agents that qualify leads, book calls, and close deals 24/7. No downtime. Infinite scale.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <Link to="/contact">
                                <Button className="rounded-full px-10 py-5 text-lg font-bold shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)]">
                                    Deploy Agent
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-10 py-5 text-neutral-400 hover:text-white uppercase tracking-widest text-sm font-bold border-b border-transparent hover:border-brand-primary transition-all">
                                    View Protocol
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- AGENT CATALOG (BENTO - REFINED) --- */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="flex items-end justify-between mb-16 border-b border-brand-primary/20 pb-6">
                    <h2 className="text-3xl md:text-5xl text-white font-display font-bold">
                        Available Units
                    </h2>
                    <div className="hidden md:block text-right">
                        <p className="text-brand-primary text-xs tracking-widest uppercase">Select Unit to Configure</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* AGENT 1: THE QUALIFIER */}
                    <div className="group relative bg-[#050A1F]/50 backdrop-blur-sm border border-brand-primary/20 hover:border-brand-primary/60 transition-all duration-500 overflow-hidden rounded-3xl">
                        <div className="absolute top-6 right-6">
                            <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-widest uppercase">
                                Unit-01
                            </div>
                        </div>

                        <div className="p-10 h-full flex flex-col relative z-10">
                            <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-brand-primary group-hover:text-brand-realBlack transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                                <Zap size={32} />
                            </div>

                            <h3 className="text-3xl text-white font-display font-bold mb-2">The Qualifier</h3>
                            <p className="text-brand-primary/80 text-xs uppercase tracking-widest mb-8 font-bold">
                                Sales Filtering Agent
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {[
                                    "Reads incoming lead intent",
                                    "Checks budget authority",
                                    "Routes VIPs to Calendly",
                                    "Discards spam automatically"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 group-hover:text-white transition-colors">
                                        <CheckCircle size={16} className="text-brand-primary mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between text-xs text-brand-primary mb-2 font-bold uppercase tracking-wider">
                                    <span>Efficiency</span>
                                    <span>99.8%</span>
                                </div>
                                <div className="w-full h-1 bg-brand-primary/20 rounded-full overflow-hidden">
                                    <div className="w-[99.8%] h-full bg-brand-primary shadow-[0_0_10px_#38bdf8]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Scan Effect (Subtle) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>

                    {/* AGENT 2: THE SUPPORT */}
                    <div className="group relative bg-[#050A1F]/50 backdrop-blur-sm border border-brand-primary/20 hover:border-brand-primary/60 transition-all duration-500 overflow-hidden rounded-3xl">
                        <div className="absolute top-6 right-6">
                            <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-widest uppercase">
                                Unit-02
                            </div>
                        </div>

                        <div className="p-10 h-full flex flex-col relative z-10">
                            <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-brand-primary group-hover:text-brand-realBlack transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                                <MessageSquare size={32} />
                            </div>

                            <h3 className="text-3xl text-white font-display font-bold mb-2">The Helpdesk</h3>
                            <p className="text-brand-primary/80 text-xs uppercase tracking-widest mb-8 font-bold">
                                24/7 Support Agent
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {[
                                    "Answers FAQs instantly",
                                    "Troubleshoots common issues",
                                    "Escalates complex tickets",
                                    "Never gets frustrated"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 group-hover:text-white transition-colors">
                                        <CheckCircle size={16} className="text-brand-primary mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between text-xs text-brand-primary mb-2 font-bold uppercase tracking-wider">
                                    <span>Uptime</span>
                                    <span>100%</span>
                                </div>
                                <div className="w-full h-1 bg-brand-primary/20 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-brand-primary shadow-[0_0_10px_#38bdf8]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AGENT 3: THE OUTREACH */}
                    <div className="group relative bg-[#050A1F]/50 backdrop-blur-sm border border-brand-primary/20 hover:border-brand-primary/60 transition-all duration-500 overflow-hidden rounded-3xl">
                        <div className="absolute top-6 right-6">
                            <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-widest uppercase">
                                Unit-03
                            </div>
                        </div>

                        <div className="p-10 h-full flex flex-col relative z-10">
                            <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mb-8 rounded-2xl group-hover:bg-brand-primary group-hover:text-brand-realBlack transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                                <Globe size={32} />
                            </div>

                            <h3 className="text-3xl text-white font-display font-bold mb-2">The Hunter</h3>
                            <p className="text-brand-primary/80 text-xs uppercase tracking-widest mb-8 font-bold">
                                Outbound Sales Agent
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {[
                                    "Identifies prospects on LinkedIn",
                                    "Personalizes cold DMs",
                                    "Follows up automatically",
                                    "Books meetings for humans"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 group-hover:text-white transition-colors">
                                        <CheckCircle size={16} className="text-brand-primary mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between text-xs text-brand-primary mb-2 font-bold uppercase tracking-wider">
                                    <span>Volume</span>
                                    <span>Infinite</span>
                                </div>
                                <div className="w-full h-1 bg-brand-primary/20 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-brand-primary shadow-[0_0_10px_#38bdf8]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- ROI COMPARISON TABLE (New Section) --- */}
            <div className="max-w-7xl mx-auto px-6 py-24 border-t border-brand-primary/10">
                <div className="text-center mb-16">
                    <p className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-4">The ROI Calculation</p>
                    <h2 className="text-4xl md:text-5xl text-white font-display font-bold">
                        Why Smart Brands Switch.
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-[#050A1F]/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 border-b border-white/5 bg-white/5">
                            <div className="col-span-4 p-6 md:p-8 flex items-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Metric</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5">
                                <span className="text-lg md:text-xl font-bold text-white">Human SDR</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-brand-primary text-brand-dark text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Winner</div>
                                <span className="text-lg md:text-xl font-bold text-brand-primary flex items-center gap-2">
                                    <Bot size={20} /> AI Agent
                                </span>
                            </div>
                        </div>

                        {/* Row 1: Cost */}
                        <div className="grid grid-cols-12 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="col-span-4 p-6 md:p-8 flex items-center">
                                <span className="text-white font-medium">Monthly Cost</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5">
                                <span className="text-red-400 font-bold text-lg">$3,500 - $5,000</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 bg-brand-primary/5">
                                <span className="text-green-400 font-bold text-lg">$500 - $1,500</span>
                            </div>
                        </div>

                        {/* Row 2: Availability */}
                        <div className="grid grid-cols-12 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="col-span-4 p-6 md:p-8 flex items-center">
                                <span className="text-white font-medium">Availability</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 text-center">
                                <span className="text-neutral-400 text-sm font-medium">8 Hours / Day<br /><span className="text-xs opacity-50">(Mon-Fri)</span></span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 bg-brand-primary/5">
                                <span className="text-brand-primary font-bold text-lg">24/7/365</span>
                            </div>
                        </div>

                        {/* Row 3: Response Time */}
                        <div className="grid grid-cols-12 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="col-span-4 p-6 md:p-8 flex items-center">
                                <span className="text-white font-medium">Response Time</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5">
                                <span className="text-neutral-400 font-medium">1 - 4 Hours (Avg)</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 bg-brand-primary/5">
                                <span className="text-brand-primary font-bold text-lg">Instant <span className="text-sm font-normal opacity-70">(Seconds)</span></span>
                            </div>
                        </div>

                        {/* Row 4: Scalability */}
                        <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                            <div className="col-span-4 p-6 md:p-8 flex items-center">
                                <span className="text-white font-medium">Scalability</span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5">
                                <span className="text-neutral-400 font-medium">Linear <span className="text-xs opacity-50">(Hire more)</span></span>
                            </div>
                            <div className="col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/5 bg-brand-primary/5">
                                <span className="text-brand-primary font-bold text-lg">Infinite <span className="text-sm font-normal opacity-70">(Instant)</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CTA SECTION (Brand Aligned) --- */}
            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="bg-brand-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 bg-brand-primary/5"></div>
                    <div className="p-12 md:p-16 text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl text-white font-display font-bold mb-6">
                            Ready to deploy?
                        </h2>
                        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                            Stop relying on human hours. Initiate your automated workforce audit today and find your 10x leverage points.
                        </p>

                        <Link to="/contact">
                            <Button className="rounded-full px-12 py-5 text-lg font-bold shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] hover:scale-105 transition-transform">
                                Initiate Scale Protocol
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default AiAutomation;
