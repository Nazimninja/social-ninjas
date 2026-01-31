
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, MessageSquare, Zap, Clock, Calendar, Users, Briefcase, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../components/Button';
import { submitToGoogleSheets } from '../../services/googleSheets';

// Reusing ScrollReveal for animations
import ScrollReveal from '../../components/ScrollReveal';

const LeadAutomation: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        email: ''
    });

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const scrollToDemo = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('demo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            await submitToGoogleSheets({
                type: 'Leads',
                Name: formData.name,
                Email: formData.email,
                Phone: formData.phone,
                Company: formData.businessName,
                Source: "Promo Page (AI Lead Handling)",
                Date: new Date().toISOString()
            });
            setFormStatus('success');
        } catch (error) {
            console.error("Submission error:", error);
            // Fallback to success UI even if sheet fails
            setFormStatus('success');
        }
    };

    const features = [
        { icon: Bot, title: "AI Website Assistant", desc: "Instantly greets visitors and captures details." },
        { icon: Zap, title: "Lead Qualification", desc: "Filters 'tire kickers' from serious buyers." },
        { icon: MessageSquare, title: "Central Dashboard", desc: "All leads from all channels in one place." },
        { icon: AlertCircle, title: "Instant Alerts", desc: "Get notified via WhatsApp/SMS immediately." },
        { icon: Calendar, title: "Auto-Booking", desc: "Qualified leads book calls on your calendar." },
        { icon: Users, title: "Human Handover", desc: "Jump in chat anytime with full context." },
    ];

    const faqs = [
        { q: "Is this a chatbot or a full system?", a: "It's a complete system. While it includes a chatbot interface for leads, the backend handles CRM storage, qualification logic, calendar integration, and notifications." },
        { q: "Will this work with WhatsApp & Instagram?", a: "Yes. Our system centralizes conversations. Whether a lead comes from your website, WhatsApp, or Instagram, it lands in one dashboard." },
        { q: "Can it integrate with my CRM?", a: "Absolutely. We support integrations with HubSpot, Salesforce, Zoho, and Google Sheets." },
        { q: "Do I still need a human team?", a: "You still need humans to close the deal! The AI handles the repetitive 'qualification' and 'scheduling' work so your team focuses on selling." },
        { q: "How long does setup take?", a: "Tyically 5-7 days. We build the custom flows, train the AI on your data, and integrate it with your tools." },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-brand-primary selection:text-black">
            <Helmet>
                <title>AI Lead Handling System | Social Ninja's Promo</title>
                <meta name="description" content="Never miss a lead again. Automate lead handling with AI." />
            </Helmet>

            {/* --- CUSTOM NAVBAR FOR PROMO --- */}
            <nav className="fixed top-0 w-full z-50 py-6 bg-brand-dark/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Social Ninja's" className="h-10 w-auto" />
                        <span className="font-display font-bold text-lg hidden sm:block">Social<span className="text-brand-primary">Ninja's</span></span>
                    </div>
                    <button onClick={scrollToDemo}>
                        <Button className="py-2 px-4 md:px-6 text-sm md:text-base font-bold rounded-full">Book Free Demo</Button>
                    </button>
                </div>
            </nav>

            {/* --- 1. HERO SECTION --- */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        Now Available for Service Businesses
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Never Miss a Lead Again. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">Automate Lead Handling.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        AI-powered system that captures, qualifies, and follows up with leads automatically across Website, WhatsApp, & Instagram.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <button onClick={scrollToDemo} className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto py-4 px-10 text-lg rounded-full shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-[0_0_60px_rgba(56,189,248,0.5)]">
                                👉 Book a Free Demo
                            </Button>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-sm font-bold text-neutral-400 hover:text-white transition-colors underline underline-offset-4">
                            See How It Works
                        </button>
                    </div>

                    {/* Hero Visual */}
                    <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl transform rotate-1 blur-2xl"></div>
                        <div className="relative bg-[#0A0F2C] border border-white/10 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                            {/* Fake Chat UI */}
                            <div className="w-full md:w-1/2 bg-[#020617] rounded-xl p-4 border border-white/5 space-y-4">
                                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-xs text-neutral-500 ml-2">Live Chat Widget</span>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-brand-primary/10 text-brand-primary p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg rounded-tl-none self-start w-[85%]">
                                        👋 Hi there! Looking to automate your sales process?
                                    </div>
                                    <div className="bg-white/10 text-white p-3 rounded-tl-lg rounded-bl-lg rounded-br-lg rounded-tr-none self-end ml-auto w-[75%]">
                                        Yes, I need help managing my leads.
                                    </div>
                                    <div className="bg-brand-primary/10 text-brand-primary p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg rounded-tl-none self-start w-[85%]">
                                        Great! I can help with that. How many leads do you typically get per month?
                                    </div>
                                </div>
                                <div className="h-10 bg-white/5 rounded-lg w-full"></div>
                            </div>
                            {/* Dashboard Stats UI */}
                            <div className="w-full md:w-1/2 text-left">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-green-500/20 text-green-500 rounded-lg"><CheckCircle2 /></div>
                                    <div>
                                        <h3 className="font-bold text-white">Automated Qualification</h3>
                                        <p className="text-xs text-neutral-400">AI filters bad leads instantly.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg"><Calendar /></div>
                                    <div>
                                        <h3 className="font-bold text-white">Instant Booking</h3>
                                        <p className="text-xs text-neutral-400">Hot leads added to your CRM.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-purple-500/20 text-purple-500 rounded-lg"><Clock /></div>
                                    <div>
                                        <h3 className="font-bold text-white">24/7 Response</h3>
                                        <p className="text-xs text-neutral-400">Zero downtime. Zero delays.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- 2. PROBLEM SECTION --- */}
            <section className="py-24 bg-[#050A1F]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Why Most Businesses <span className="text-red-500">Lose Leads</span> Every Day</h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <Clock className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-bold mb-2">Slow Response Times</h3>
                            <p className="text-neutral-400">If you don't reply in 5 minutes, the lead moves to your competitor.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <Bot className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-bold mb-2">Manual Follow-ups</h3>
                            <p className="text-neutral-400">Chasing leads manually is exhausting and prone to human error.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <AlertCircle className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-bold mb-2">After-Hours Misses</h3>
                            <p className="text-neutral-400">Leads inquiring at 9 PM or weekends get ignored until Monday.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <MessageSquare className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-bold mb-2">Scattered Messages</h3>
                            <p className="text-neutral-400">DMs on Insta, WhatsApp messages, emails—it's a mess to track.</p>
                        </div>
                    </div>

                    <p className="mt-12 text-xl font-bold text-white bg-red-500/10 inline-block px-6 py-3 rounded-lg border border-red-500/20">
                        ⚠️ Every missed message = <span className="text-red-400 text-decoration-line-through">Lost Revenue.</span>
                    </p>
                </div>
            </section>

            {/* --- 3. SOLUTION SECTION --- */}
            <section className="py-24 bg-[#020617] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-4 block">The Solution</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The AI Lead Handling System</h2>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">We build a complete ecosystem that handles inquiries, qualifies leads, and routes only serious prospects to you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">
                                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6">
                                    <f.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                <p className="text-neutral-400 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. HOW IT WORKS --- */}
            <section id="how-it-works" className="py-24 bg-brand-surface border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">How It Works</h2>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-brand-primary/20 via-brand-primary to-brand-primary/20"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "01", title: "Lead Inquires", desc: "Customer messages via Website, WhatsApp, or Ads." },
                                { step: "02", title: "AI Responds", desc: "Instant reply. AI asks qualifying questions." },
                                { step: "03", title: "Qualification", desc: "AI scores the lead (Hot/Warm/Cold)." },
                                { step: "04", title: "Conversion", desc: "Meeting booked or Human notified instantly." }
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-24 h-24 bg-[#020617] border-4 border-brand-primary rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 relative shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                                        {s.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                                    <p className="text-neutral-400 text-sm px-4">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. WHO THIS IS FOR --- */}
            <section className="py-24 bg-[#020617]">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-brand-primary/10 to-blue-600/10 rounded-[3rem] p-8 md:p-16 border border-brand-primary/20 text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Who This Is Perfect For</h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                "Clinics & Healthcare",
                                "Consultants & Coaches",
                                "Real Estate Agencies",
                                "Marketing Agencies",
                                "Legal & Tax Services",
                                "Home Service Providers"
                            ].map((item, i) => (
                                <span key={i} className="px-6 py-3 rounded-full bg-[#020617] border border-white/10 text-white font-bold text-sm md:text-base shadow-lg cursor-default hover:border-brand-primary/50 transition-colors">
                                    ✅ {item}
                                </span>
                            ))}
                        </div>

                        <p className="mt-10 text-neutral-400 text-sm italic">
                            *Best for businesses receiving 5–50+ inquiries per day.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 6. BENEFITS --- */}
            <section className="py-24 bg-[#0A0F2C]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-display font-bold mb-8">What You Get</h2>
                        <ul className="space-y-6">
                            {[
                                "Zero missed enquiries (100% Response Rate)",
                                "Better lead quality (AI filters spam)",
                                "More booked appointments on your calendar",
                                "Less manual admin work for you",
                                "A system that works 24/7/365"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-lg text-neutral-300">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2">
                        <div className="bg-[#020617] border border-white/10 p-8 rounded-2xl shadow-2xl relative">
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-primary rounded-full blur-2xl opacity-50"></div>
                            <div className="text-center space-y-2">
                                <TrendingUp size={48} className="text-brand-primary mx-auto mb-4" />
                                <h3 className="text-5xl font-black text-white">40%</h3>
                                <p className="text-neutral-400 font-bold uppercase tracking-wider">Avg. Increase in Lead Conversion</p>
                                <p className="text-xs text-neutral-600 mt-2">When automation is implemented correctly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 7. DEMO FORM (CRITICAL) --- */}
            <section id="demo" className="py-24 bg-[#020617] relative">
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">See the System in Action</h2>
                        <p className="text-xl text-neutral-400">Book a free demo call. We'll show you exactly how AI can handle your specific business needs.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm">
                        {formStatus === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                <p className="text-neutral-400">We'll be in touch shortly to schedule your demo.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-400 ml-1">Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            required
                                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-400 ml-1">Business Name</label>
                                        <input
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            type="text"
                                            required
                                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                                            placeholder="Acme Inc."
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-400 ml-1">Phone / WhatsApp</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            required
                                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                                            placeholder="+91 99999 99999"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-400 ml-1">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            required
                                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={formStatus === 'submitting'} className="w-full py-4 text-lg font-bold rounded-xl mt-4">
                                    {formStatus === 'submitting' ? 'Processing...' : '👉 Book a Free Demo'}
                                </Button>

                                <p className="text-center text-xs text-neutral-500 mt-4">
                                    No commitment. 100% free consultation.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* --- 8. TRUST --- */}
            <section className="py-16 bg-[#050A1F] border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-6">Built by Experts in AI & Growth</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={32} className="text-brand-primary" />
                            <span className="text-xl font-bold">Social Ninja's</span>
                        </div>
                        <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <Briefcase size={32} className="text-brand-secondary" />
                            <span className="text-lg font-bold">Service-Business Specialists</span>
                        </div>
                        <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <Bot size={32} className="text-blue-500" />
                            <span className="text-lg font-bold">AI Automation Experts</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 9. FAQ --- */}
            <section className="py-24 bg-[#020617]">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                                >
                                    <span className="font-bold text-lg">{faq.q}</span>
                                    {activeFaq === i ? <ChevronUp className="text-brand-primary" /> : <ChevronDown className="text-neutral-500" />}
                                </button>
                                {activeFaq === i && (
                                    <div className="p-6 pt-0 text-neutral-400 leading-relaxed border-t border-white/5">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 10. FINAL CTA --- */}
            <section className="py-24 bg-gradient-to-t from-brand-primary/10 to-[#020617] text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Stop Losing Leads today.</h2>
                    <p className="text-xl text-neutral-400 mb-10">Let AI handle them for you. Deploy your system this week.</p>
                    <button onClick={scrollToDemo}>
                        <Button className="py-5 px-12 text-xl font-bold rounded-full shadow-[0_0_50px_rgba(56,189,248,0.4)] hover:scale-105 transition-transform">
                            👉 Book a Free Demo
                        </Button>
                    </button>
                    <div className="mt-12 text-sm text-neutral-600">
                        &copy; {new Date().getFullYear()} Social Ninja's. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LeadAutomation;
