
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, ShieldCheck, Star, Rocket, ChevronRight, BarChart3, PieChart, Activity, Zap, Bot, Cpu } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import InstagramFeed from '../components/InstagramFeed';

const Home: React.FC = () => {
    // Testimonial Carousel State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const testimonials = [
        {
            name: "Gordy Hirsch",
            role: "Director of Creative Services",
            company: "CareRev",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            impact: "300% Lead Volume",
            text: "Honestly, I was skeptical about hiring another agency. But the team just gets it. We didn't just get 'leads'—we got actual qualified sales calls. The volume tripled in a month. It’s rare to find partners who care this much.",
            stars: 5
        },
        {
            name: "Fatima Al-Maktoum",
            role: "Head of Marketing",
            company: "Al-Futtaim",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            impact: "4.5x ROAS",
            text: "We've worked with the big global agencies, but Social Ninja's operates differently. No fluff reports. Just 'here's what we spent, here's what we made'. They treat our budget like it's their own money. The ROI speaks for itself.",
            stars: 5
        },
        {
            name: "Vikram Singh",
            role: "Founder",
            company: "Velocity Logistics",
            image: "https://randomuser.me/api/portraits/men/86.jpg",
            impact: "$250k Net Profit",
            text: "We were stuck at a plateau for months. The team came in, audited our ad account, and found leaks we didn't know existed. Two weeks later, our CPA dropped by 40%. They literally saved our Q4 targets.",
            stars: 5
        },
        {
            name: "Sarah Jenkins",
            role: "Founder",
            company: "Lumina Skin",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            impact: "Scale to $50k/mo",
            text: "Creative burnout is real. We were churning out ads that flopped constantly. Their creative team stepped in and produced videos that actually stopped the scroll. Our ROAS went from 1.8 to 4.2 in just 60 days.",
            stars: 5
        },
        {
            name: "Mike Ross",
            role: "VP of Sales",
            company: "SaaSify",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            impact: "Auto-Booked Demos",
            text: "Most agencies just send you a spreadsheet of emails that never pick up the phone. These guys set up an AI qualification system for us. Now my sales team only talks to people who actually want to buy. Game changer.",
            stars: 5
        },
        {
            name: "Arjun Mehta",
            role: "Managing Director",
            company: "Skyline Real Estate",
            image: "https://randomuser.me/api/portraits/men/54.jpg",
            impact: "High-Ticket Sales",
            text: "I don't care about likes. I care about closings. They built a funnel that nurtured leads automatically. I wake up to booked appointments on my calendar. It feels like magic, but I know it's just really good engineering.",
            stars: 5
        }
    ];

    // Auto-advance carousel with hover pause
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [isHovered, currentTestimonial]);

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <main className="overflow-x-hidden selection:bg-brand-primary selection:text-brand-dark bg-brand-dark">
            <SEO
                title="Social Ninja's | Premium Digital Growth & Performance Marketing Agency"
                description="We scale brands through elite content production, AI automation, and mathematical media buying. Experience the ROI-focused growth infrastructure for 1% brands."
                keywords="performance marketing agency, digital growth partner, social media management, AI business automation, premium video production, ROI digital agency"
            />

            {/* --- HERO SECTION RE-ENGINEERED --- */}
            <section className="relative min-h-[90vh] lg:min-h-[100dvh] flex items-center pt-24 pb-12 lg:pt-20 lg:pb-0 overflow-hidden">

                {/* Subtle Background Glows (No more messy noise) */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* LEFT COLUMN: Authoritative Copy (Span 7 cols for more breathing room) */}
                        <div className="lg:col-span-7 flex flex-col justify-center relative z-20">

                            {/* Premium Tag */}
                            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-md animate-fade-in-up">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-primary animate-pulse"></div>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-300">Ads • Content • Automation</span>
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] md:leading-[1.05] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                We Scale Brands with <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary">Ads, Content & AI.</span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                Social Ninja’s is the performance agency for <span className="text-white font-medium">India & UAE</span>. We combine high-converting video creatives with data-driven media buying and 24/7 AI sales agents.
                            </p>

                            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 sm:gap-6 animate-fade-in-up md:ml-32" style={{ animationDelay: '300ms' }}>
                                <Link to="/contact" className="w-full sm:w-auto">
                                    <Button variant="primary" className="w-full sm:w-auto rounded-full px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-bold shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:shadow-[0_0_60px_rgba(56,189,248,0.3)]">
                                        Book Strategy Call
                                    </Button>
                                </Link>
                                <Link to="/case-studies" className="w-full sm:w-auto px-6 py-4 text-sm font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all flex items-center justify-center sm:justify-start gap-2 group">
                                    View Case Studies <ChevronRight size={16} className="text-brand-primary group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Trust Indicators - Tighter & Aligned */}
                            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 animate-fade-in-up md:ml-32" style={{ animationDelay: '400ms' }}>

                                {/* Meta Partner */}
                                <div className="flex items-center gap-4 group">
                                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all duration-300">
                                        <ShieldCheck size={20} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Meta Certified</p>
                                        <p className="text-[10px] text-neutral-500 font-medium">Top 1% Performance Partner</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                                {/* Regional Authority */}
                                <div className="flex items-center gap-4 group">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-dark flex items-center justify-center text-lg z-20 shadow-lg group-hover:translate-x-1 transition-transform duration-300" title="India">
                                            <span className="drop-shadow-md filter grayscale-0">🇮🇳</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-dark flex items-center justify-center text-lg z-10 shadow-lg group-hover:translate-x-2 transition-transform duration-300 delay-75" title="UAE">
                                            <span className="drop-shadow-md filter grayscale-0">🇦🇪</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">India & UAE Focus</p>
                                        <p className="text-[10px] text-neutral-500 font-medium">Local Expertise. Global Scale.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT COLUMN: Cohesive Abstract Composition (Span 5 cols) */}
                        <div className="lg:col-span-5 relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end perspective-1000 mt-8 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

                            {/* Visual Container - The "Revenue Engine" */}
                            <div className="relative w-full max-w-[400px] lg:max-w-[450px] aspect-[4/5] transform scale-90 md:scale-100">

                                {/* 1. Background Blur Plate */}
                                <div className="absolute inset-0 bg-brand-primary/5 rounded-[40px] blur-3xl transform rotate-6"></div>

                                {/* 2. Main Glass Card - The Dashboard */}
                                <div className="absolute inset-4 md:inset-10 bg-brand-surface/80 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-10 animate-float">
                                    {/* Header of Card */}
                                    <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Live Metrics</div>
                                    </div>

                                    {/* Body of Card */}
                                    <div className="p-6 flex-1 flex flex-col justify-between relative">
                                        {/* Chart Line Decor */}
                                        <div className="absolute top-20 left-0 right-0 h-32 opacity-20 pointer-events-none">
                                            <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-brand-primary stroke-[0.5]">
                                                <path d="M0 35 Q 20 30, 40 15 T 100 5" />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-neutral-400 text-xs font-bold uppercase mb-1">Total Revenue</p>
                                            <h3 className="text-4xl font-display font-bold text-white">$4.2M<span className="text-brand-primary text-xl">+</span></h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-brand-primary/20 text-brand-primary"><Activity size={16} /></div>
                                                    <span className="text-sm font-bold text-white">ROAS</span>
                                                </div>
                                                <span className="text-brand-primary font-bold">5.2x</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-brand-secondary/20 text-brand-secondary"><TrendingUp size={16} /></div>
                                                    <span className="text-sm font-bold text-white">Growth</span>
                                                </div>
                                                <span className="text-brand-secondary font-bold">+128%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Floating Elements for Depth */}

                                {/* Top Right Sphere */}
                                <div className="absolute top-4 -right-4 md:top-12 md:-right-6 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary shadow-2xl z-20 animate-float-delayed flex items-center justify-center border border-white/10">
                                    <Rocket className="text-white w-8 h-8 md:w-10 md:h-10 transform -rotate-45" strokeWidth={1.5} />
                                </div>

                                {/* Bottom Left Badge */}
                                <div className="absolute bottom-8 -left-4 md:bottom-12 md:-left-8 bg-brand-dark/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl z-30 animate-float flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 rounded-full border-2 border-brand-dark" alt="Client" />
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border-2 border-brand-dark" alt="Client" />
                                        <div className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-secondary flex items-center justify-center text-[10px] font-bold text-white">50+</div>
                                    </div>
                                    <div>
                                        <p className="text-white text-xs font-bold">Active Clients</p>
                                        <p className="text-neutral-500 text-[10px]">India & UAE</p>
                                    </div>
                                </div>

                                {/* Decorative Geometric Elements behind */}
                                <div className="absolute top-[20%] -left-[10%] w-32 h-32 border border-white/5 rounded-full z-0"></div>
                                <div className="absolute bottom-[10%] -right-[5%] w-48 h-48 border border-dashed border-white/10 rounded-full z-0 animate-spin-slow"></div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- TRUST TICKER (Cleaned Up) --- */}
            <section className="py-6 bg-brand-dark border-y border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Trusted by 100+ Brands:</p>
                    <div className="flex-1 overflow-hidden w-full relative">
                        <div className="flex gap-24 animate-scroll whitespace-nowrap items-center">
                            {["AcmeCorp", "Nebula", "BoxInc", "GlobalTech", "Velocity", "Fusion", "Vertex", "Oasis"].map((brand, i) => (
                                <span key={i} className="font-display font-bold text-3xl text-white/90">{brand}</span>
                            ))}
                            {["AcmeCorp", "Nebula", "BoxInc", "GlobalTech", "Velocity", "Fusion", "Vertex", "Oasis"].map((brand, i) => (
                                <span key={`dup-${i}`} className="font-display font-bold text-3xl text-white/90">{brand}</span>
                            ))}
                        </div>
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES --- */}
            <section className="py-16 md:py-24 bg-brand-dark relative">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-4 block">Our Expertise</span>
                                <h2 className="font-display text-4xl font-bold text-white">Strategic Growth Systems</h2>
                            </div>
                            <Link to="/services">
                                <Button variant="outline" className="rounded-full px-8">View All Services</Button>
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Rocket, title: "Performance Marketing", outcome: "Revenue & ROAS", desc: "Data-driven ad campaigns on Meta & Google that maximize your ROI.", bg: "from-blue-500/10 to-purple-500/5", delay: '0ms' },
                            { icon: Zap, title: "Creative Studio", outcome: "Authority & Retention", desc: "Eye-catching videos and designs that grab attention and tell your story.", bg: "from-purple-500/10 to-pink-500/5", delay: '100ms' },
                            { icon: Activity, title: "AI & Automation", outcome: "Efficiency & Speed", desc: "Intelligent chatbots and workflows that handle sales 24/7.", bg: "from-green-500/10 to-teal-500/5", delay: '200ms' }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={item.delay}>
                                <Link to="/services">
                                    <div className="group relative bg-brand-surface border border-white/5 p-8 rounded-3xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden h-full flex flex-col cursor-pointer">
                                        {/* Dynamic Gradient Background */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`}></div>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>

                                        <div className="relative z-10 flex-1">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 bg-brand-dark rounded-2xl border border-white/10 flex items-center justify-center text-brand-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-dark shadow-lg">
                                                    <item.icon size={28} strokeWidth={1.5} />
                                                </div>
                                                <div className="px-3 py-1.5 rounded-full bg-brand-dark border border-white/5 text-[10px] font-bold uppercase tracking-wider text-brand-primary group-hover:bg-white group-hover:text-brand-dark transition-colors">
                                                    {item.outcome}
                                                </div>
                                            </div>

                                            <h3 className="text-white font-display text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                                            <p className="text-neutral-400 leading-relaxed text-sm mb-6 group-hover:text-neutral-300 transition-colors">{item.desc}</p>
                                        </div>

                                        <div className="relative z-10 mt-auto flex items-center gap-2 text-sm font-bold text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEW AI REVOLUTION SPOTLIGHT SECTION --- */}
            <section className="relative py-16 md:py-24 bg-[#000] border-y border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                {/* Animated Mesh Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56,189,248,0.2) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                        {/* Left: Copy */}
                        <div className="max-w-2xl">
                            <ScrollReveal>
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                                    <Bot size={14} className="text-brand-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">The AI Advantage</span>
                                </div>
                                <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    Your competitors sleep. <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Your AI Agent doesn't.</span>
                                </h2>
                                <p className="text-xl text-neutral-400 font-light leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                                    70% of leads are lost due to slow response times. Deploy intelligent agents that qualify, book, and close 24/7.
                                </p>
                                <Link to="/ai-automation">
                                    <Button variant="primary" className="rounded-full px-10 py-5 text-lg font-bold shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                        Deploy AI Workforce <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </ScrollReveal>
                        </div>

                        {/* Right: Visual */}
                        <div className="relative">
                            <ScrollReveal delay="200ms">
                                <div className="w-[350px] md:w-[450px] aspect-square relative">
                                    {/* Pulsing Core */}
                                    <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>

                                    <div className="relative bg-brand-dark border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-3">
                                                <Cpu className="text-brand-primary" size={24} />
                                                <span className="text-white font-bold">Neural Core</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Active</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                                <span className="text-neutral-400 text-sm">Leads Processed (Today)</span>
                                                <span className="text-white font-mono font-bold">142</span>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                                <span className="text-neutral-400 text-sm">Meetings Booked</span>
                                                <span className="text-brand-primary font-mono font-bold text-xl">18</span>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                                <span className="text-neutral-400 text-sm">Avg. Response Time</span>
                                                <span className="text-green-400 font-mono font-bold">0.8s</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <p className="text-xs text-neutral-500 font-mono text-center">SYSTEM OPERATIONAL • V2.4</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-16 md:py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-brand-surface/30"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                            {/* Left Column */}
                            <div className="space-y-8">
                                <div>
                                    <span className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Market Validation</span>
                                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        Trust is our currency. <br />
                                        <span className="text-neutral-500">Results are the proof.</span>
                                    </h2>
                                    <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                                        We don't just ask for trust; we earn it through measurable revenue impact. See what happens when ambition meets execution.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-brand-dark border border-white/5 p-6 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                            <span className="text-white font-bold text-xl">4.9/5</span>
                                        </div>
                                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Client Rating</p>
                                    </div>
                                    <div className="bg-brand-dark border border-white/5 p-6 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="text-brand-primary" size={20} />
                                            <span className="text-white font-bold text-xl">97%</span>
                                        </div>
                                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Retention Rate</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Interactive Testimonial Card */}
                            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                <div className="bg-brand-dark border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-[450px] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] group">
                                    {testimonials.map((t, i) => (
                                        <div
                                            key={i}
                                            className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-between transition-all duration-700 ease-in-out transform ${i === currentTestimonial
                                                ? 'opacity-100 translate-x-0 z-10'
                                                : 'opacity-0 translate-x-12 z-0 pointer-events-none'
                                                }`}
                                        >
                                            <div>
                                                <div className="flex justify-between items-start mb-8">
                                                    <div className="flex gap-1">
                                                        {[...Array(t.stars)].map((_, idx) => (
                                                            <Star key={idx} size={16} className="text-yellow-400 fill-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                        {t.impact}
                                                    </div>
                                                </div>
                                                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">"{t.text}"</p>
                                            </div>

                                            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-white/5">
                                                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full border-2 border-brand-primary/20 object-cover shadow-lg" />
                                                <div>
                                                    <h4 className="font-bold text-white text-base leading-none mb-1">{t.name}</h4>
                                                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold">{t.role}, {t.company}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Dots */}
                                    <div className="absolute bottom-8 right-12 flex gap-2 z-20">
                                        {testimonials.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentTestimonial(idx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'w-8 bg-brand-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="relative py-16 md:py-24 flex items-center justify-center bg-brand-dark border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8">Ready to dominate?</h2>
                        <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light">Stop leaving revenue on the table. Partner with the agency that treats your budget like their own.</p>
                        <Link to="/contact">
                            <Button variant="primary" className="text-lg px-12 py-5 rounded-full font-bold shadow-2xl shadow-brand-primary/30 hover:scale-105 transition-transform">Book Your Strategy Call</Button>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            <InstagramFeed />
        </main>
    );
};

export default Home;
