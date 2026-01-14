
import React from 'react';
import SEO from '../components/SEO';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="pt-24 pb-16 min-h-screen bg-brand-dark selection:bg-brand-primary selection:text-black">
            <SEO
                title="Privacy Policy | Data Protection & Compliance | Social Ninja's"
                description="Our commitment to protecting your data. Review the Privacy Policy for Social Ninja's Digital Agency regarding data collection, usage, and security."
                keywords="privacy policy, data protection, digital agency compliance, user data rights, GDPR compliance marketing, DPDP India, PDPL UAE"
            />

            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-10 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Shield size={14} />
                        <span>Legal & Compliance</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-neutral-500 text-sm font-medium">Last Updated: {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

                    {/* 1. Introduction */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-brand-primary" size={24} />
                            <h2 className="text-2xl font-bold text-white font-display">1. Introduction</h2>
                        </div>
                        <p className="text-neutral-400 leading-relaxed">
                            Welcome to <strong>Social Ninja's</strong> ("we," "our," or "us"). We are a performance marketing and AI automation agency operating globally, with headquarters in <strong>India</strong> and strategic operations in the <strong>UAE</strong>.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mt-4">
                            Your trust is our currency. This Privacy Policy outlines how we collect, process, and protect your data when you engage with our services, including our AI Agents, Paid Media management, and Website interactions. We are committed to compliance with global standards, including the <strong>Digital Personal Data Protection Act (India)</strong> and the <strong>UAE Personal Data Protection Law (PDPL)</strong>.
                        </p>
                    </section>

                    {/* 2. Information We Collect */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">2. Information We Collect</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-white font-bold mb-2">A. Personal Information</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    When you book a strategy call or submit a form, we collect:
                                </p>
                                <ul className="list-disc list-inside text-neutral-400 mt-2 ml-2">
                                    <li>Name, Email Address, Phone Number.</li>
                                    <li>Company Name, Job Title, and Revenue Details.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">B. Operational Data (For Clients)</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    To deliver our services, we may process:
                                </p>
                                <ul className="list-disc list-inside text-neutral-400 mt-2 ml-2">
                                    <li><strong>Ad Account Data:</strong> Spend, ROAS, creative assets, and audience insights from platforms like Meta, Google, and TikTok.</li>
                                    <li><strong>CRM Data:</strong> Lead names and statuses for our AI Automation systems to qualify and follow up.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. How We Use Information */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">3. How We Use Your Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2 text-sm">Service Execution</h3>
                                <p className="text-neutral-400 text-sm">Deploying ad campaigns, training custom AI agents, and automating lead follow-ups.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2 text-sm">Communication</h3>
                                <p className="text-neutral-400 text-sm">Sending strategy updates, reports, and administrative notifications.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2 text-sm">AI Training (Restricted)</h3>
                                <p className="text-neutral-400 text-sm">Your data is used to train <em>your specific</em> AI agents. We do NOT use your proprietary data to train public models.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2 text-sm">Legal Compliance</h3>
                                <p className="text-neutral-400 text-sm">Fulfilling obligations under Indian and UAE tax and data laws.</p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Tracking & Cookies */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">4. Cookies & Pixel Tracking</h2>
                        <div className="flex gap-4 items-start">
                            <Eye className="text-neutral-500 mt-1 shrink-0" size={20} />
                            <p className="text-neutral-400 leading-relaxed">
                                We practice what we preach. We use tracking technologies (like the Meta Pixel and Google Analytics) to measure legitimate business interest and effective ad targeting. You can manage your cookie preferences through your browser settings.
                            </p>
                        </div>
                    </section>

                    {/* 5. Data Sharing */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">5. Data Sharing & Security</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            <strong>We guard your data like a ninja.</strong> We do not sell your personal data. We only share data with:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-2 mb-6">
                            <li><strong>Service Providers:</strong> Hosting (AWS/Vercel), AI Providers (OpenAI/Anthropic), and Payment Processors.</li>
                            <li><strong>Legal Authorities:</strong> If required by law in India or UAE.</li>
                        </ul>
                        <div className="flex gap-4 items-start bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10">
                            <Lock className="text-brand-primary mt-1 shrink-0" size={20} />
                            <p className="text-neutral-300 text-sm leading-relaxed">
                                We use enterprise-grade encryption for moving data. Access to your ad accounts and CRMs is restricted to authorized "Operators" within our agency on a strict need-to-know basis.
                            </p>
                        </div>
                    </section>

                    {/* 6. International Transfers */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">6. International Data Transfers</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            As an agency with a footprint in <strong>India and the UAE</strong>, your information may be transferred to computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. We take all necessary steps to ensure your data is treated securely and in accordance with this policy.
                        </p>
                    </section>

                    {/* 7. Your Rights */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary">7. Your Rights</h2>
                        <p className="text-neutral-400 leading-relaxed mb-2">
                            Under applicable laws (GDPR, DPDP Act 2023, UAE PDPL), you have the right to:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-2">
                            <li>Access the personal data we hold about you.</li>
                            <li>Request correction of inaccurate data.</li>
                            <li>Request deletion of your data ("Right to be Forgotten"), subject to legal retention requirements.</li>
                            <li>Withdraw consent for marketing communications.</li>
                        </ul>
                    </section>

                    {/* 10. Contact Information */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl md:col-span-2 mt-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Mail className="text-brand-primary" size={24} />
                            <h2 className="text-2xl font-bold text-white font-display">Contact Us</h2>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            If you have questions about this policy or wish to exercise your data rights, initiate a request below:
                        </p>

                        <div className="space-y-2">
                            <p className="text-white font-bold">Social Ninja's (Data Compliance Officer)</p>
                            <a href="mailto:nazim@socialninjas.in" className="text-brand-primary hover:text-white transition-colors block text-lg font-mono">
                                nazim@socialninjas.in
                            </a>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
