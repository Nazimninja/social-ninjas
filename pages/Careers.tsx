
import React, { useState, useRef } from 'react';
import { Briefcase, Globe, Zap, Layers, ArrowRight, CheckCircle2, User, Mail, Phone, Link as LinkIcon, FileText, Loader2, Send } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { submitToGoogleSheets } from '../services/googleSheets';

const Careers: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        portfolio: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const benefits = [
        {
            icon: Globe,
            title: "Global Impact",
            desc: "Work on premium brands across India, UAE, and global markets. Your work will be seen by millions."
        },
        {
            icon: Layers,
            title: "Full-Stack Exposure",
            desc: "Don't get siloed. Gain exposure to paid ads, video production, and AI automation workflows."
        },
        {
            icon: Zap,
            title: "Performance Culture",
            desc: "We value output over hours. Clear processes, real responsibility, and a focus on measurable growth."
        },
        {
            icon: Briefcase,
            title: "Ownership",
            desc: "We hire leaders, not task-takers. You own your projects from strategy to final execution."
        }
    ];

    const roles = [
        {
            title: "Social Media Manager",
            type: "Full-time / Hybrid",
            desc: "Lead content strategy and community growth for luxury and corporate accounts."
        },
        {
            title: "Video Editor (Short-Form)",
            type: "Remote / Contract",
            desc: "Create high-retention Reels and edits using Premiere Pro and After Effects."
        },
        {
            title: "Performance Marketer",
            type: "Full-time",
            desc: "Manage and scale ad spend on Meta & Google with a focus on ROAS."
        },
        {
            title: "AI Automation Specialist",
            type: "Project-based",
            desc: "Build workflows using n8n, Zapier, and LLMs to automate agency operations."
        }
    ];

    const handleApplyClick = (roleTitle: string) => {
        setFormData(prev => ({ ...prev, role: roleTitle }));
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.role) newErrors.role = "Please select a position";
        if (!formData.portfolio.trim()) newErrors.portfolio = "Portfolio/LinkedIn link is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/nazim@socialninjas.in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Job Application: ${formData.role}`,
                    _template: "table",
                    Role: formData.role,
                    Name: formData.name,
                    Email: formData.email,
                    Phone: formData.phone,
                    Portfolio: formData.portfolio,
                    Cover_Note: formData.message,
                    Source: "Careers Page"
                })
            });

            if (!response.ok) throw new Error("Failed to submit");

            // Send to Google Sheets
            try {
                await submitToGoogleSheets({
                    type: 'Careers',
                    Role: formData.role,
                    Name: formData.name,
                    Email: formData.email,
                    Phone: formData.phone,
                    Portfolio: formData.portfolio,
                    "Cover Note": formData.message, // Key matches sheet header "Cover Note"
                    Date: new Date().toISOString()
                });
            } catch (sheetError) {
                console.error("Google Sheet submission error:", sheetError);
                // Continue to success state even if sheet fails, as email is primary
            }

            // Simulated delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', role: '', portfolio: '', message: '' });
        } catch (error: any) {
            console.error("Application error:", error);
            alert("There was an error sending your application. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-brand-dark">
            <SEO
                title="Careers at Social Ninja's | Hiring Elite Marketers & Creatives"
                description="Join the special forces of digital marketing. We are hiring performance marketers, video editors, and AI engineers who want to build systems, not just campaigns."
                keywords="marketing jobs dubai, remote video editor jobs, performance marketing careers, AI automation jobs, agency jobs india, social media careers"
            />

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
                    <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Join the Team</span>
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Build Your Career at <br />
                        <span className="text-transparent bg-clip-text bg-gradient-premium">Social Ninja's.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed mb-8">
                        Work on real brands, real growth challenges, and performance-driven digital systems.
                    </p>
                    <div className="bg-brand-surface border border-white/5 p-8 rounded-2xl max-w-3xl mx-auto text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary rounded-l-2xl"></div>
                        <p className="text-neutral-300 leading-relaxed text-lg">
                            Social Ninja’s works with ambitious brands that demand excellence. We value ownership, quality, and execution speed. This is not a place for shortcuts or generic work. If you are ready to master the craft of digital growth and build systems that scale, you belong here.
                        </p>
                    </div>
                </div>

                {/* Why Work With Us */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
                        <div className="h-px bg-white/10 w-12 md:w-20"></div>
                        <h2 className="text-neutral-500 font-bold uppercase tracking-widest text-sm text-center">Why Join Us</h2>
                        <div className="h-px bg-white/10 w-12 md:w-20"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((item, i) => (
                            <div key={i} className="bg-brand-surface border border-white/5 p-8 rounded-2xl hover:border-brand-primary/30 transition-all duration-300 group hover:-translate-y-1">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Open Roles */}
                <div className="max-w-4xl mx-auto mb-24">
                    <h2 className="font-display text-4xl font-bold text-white mb-8 text-center">Open Roles</h2>
                    <p className="text-neutral-500 text-center mb-12 uppercase tracking-wider text-xs font-bold">Roles are updated based on current requirements</p>

                    <div className="space-y-4">
                        {roles.map((role, i) => (
                            <div key={i} className="bg-brand-surface/50 border border-white/5 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-brand-surface transition-colors group">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">{role.title}</h3>
                                        <span className="text-xs font-bold bg-white/5 border border-white/10 text-brand-primary px-3 py-1 rounded-full uppercase tracking-wider">{role.type}</span>
                                    </div>
                                    <p className="text-neutral-400 text-sm">{role.desc}</p>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                    <Button
                                        variant="outline"
                                        className="w-full md:w-auto text-xs py-3 rounded-lg border-white/20 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-dark"
                                        onClick={() => handleApplyClick(role.title)}
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form Section */}
                <div ref={formRef} className="max-w-3xl mx-auto">
                    <div className="bg-brand-surface border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

                        {!isSuccess ? (
                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <h3 className="font-display text-3xl font-bold text-white mb-4">Apply Now</h3>
                                    <p className="text-neutral-400 text-sm">Submit your application. We review every portfolio personally.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <User size={12} /> Full Name <span className="text-brand-primary">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full bg-brand-dark border ${errors.name ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-brand-primary'} rounded-lg p-3 text-base text-white focus:outline-none transition-colors`}
                                                placeholder="Your full name"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Mail size={12} /> Email Address <span className="text-brand-primary">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className={`w-full bg-brand-dark border ${errors.email ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-brand-primary'} rounded-lg p-3 text-base text-white focus:outline-none transition-colors`}
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Phone */}
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Phone size={12} /> Phone Number <span className="text-brand-primary">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                className={`w-full bg-brand-dark border ${errors.phone ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-brand-primary'} rounded-lg p-3 text-base text-white focus:outline-none transition-colors`}
                                                placeholder="+91 00000 00000"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                            />
                                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                        </div>

                                        {/* Position Select */}
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Briefcase size={12} /> Position <span className="text-brand-primary">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className={`w-full bg-brand-dark border ${errors.role ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-brand-primary'} rounded-lg p-3 text-base text-white focus:outline-none transition-colors appearance-none cursor-pointer`}
                                                    value={formData.role}
                                                    onChange={(e) => handleChange('role', e.target.value)}
                                                >
                                                    <option value="" disabled>Select a role...</option>
                                                    {roles.map((r, i) => (
                                                        <option key={i} value={r.title}>{r.title}</option>
                                                    ))}
                                                    <option value="General Application">General Application (Other)</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                                    <ArrowRight size={14} className="rotate-90" />
                                                </div>
                                            </div>
                                            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                                        </div>
                                    </div>

                                    {/* Portfolio */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <LinkIcon size={12} /> Portfolio / LinkedIn URL <span className="text-brand-primary">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            className={`w-full bg-brand-dark border ${errors.portfolio ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-brand-primary'} rounded-lg p-3 text-base text-white focus:outline-none transition-colors`}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            value={formData.portfolio}
                                            onChange={(e) => handleChange('portfolio', e.target.value)}
                                        />
                                        {errors.portfolio && <p className="text-red-400 text-xs mt-1">{errors.portfolio}</p>}
                                    </div>

                                    {/* Message / Cover Letter */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <FileText size={12} /> Why You? (Short Cover Note)
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-brand-dark border border-white/10 focus:border-brand-primary rounded-lg p-3 text-base text-white focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us about your best work or why you want to join Social Ninja's..."
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            fullWidth
                                            type="submit"
                                            className="rounded-lg py-4 text-base font-bold shadow-xl"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className="animate-spin" size={20} />
                                                    <span>Submitting...</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>Submit Application</span>
                                                    <Send size={18} />
                                                </div>
                                            )}
                                        </Button>
                                        <p className="text-center text-neutral-500 text-xs mt-4">
                                            By submitting, you agree to our <a href="/#/privacy" className="text-brand-primary hover:underline">Privacy Policy</a>.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="relative z-10 py-12 text-center animate-fade-in-up">
                                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8 border border-brand-primary/20">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="font-display text-3xl font-bold text-white mb-4">Application Received!</h3>
                                <p className="text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
                                    Thank you for your interest in Social Ninja's. Our recruitment team will review your portfolio and contact you if your profile matches our requirements.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setFormData({ name: '', email: '', phone: '', role: '', portfolio: '', message: '' });
                                    }}
                                    className="rounded-lg"
                                >
                                    Submit Another Application
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Careers;
