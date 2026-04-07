import React from 'react';
import SEO from '../components/SEO';
import { FileText, AlertCircle, CreditCard, Shield, Ban, Scale, Mail } from 'lucide-react';

const Terms: React.FC = () => {
    const lastUpdated = 'April 7, 2026';

    return (
        <div className="pt-24 pb-16 min-h-screen bg-brand-dark selection:bg-brand-primary selection:text-black">
            <SEO
                title="Terms of Service | Social Ninja's"
                description="Read the Terms of Service for Social Ninja's Digital Agency. Understand your rights, our obligations, payment terms, and the governing law for our services."
                keywords="terms of service, terms and conditions, digital agency agreement, AI content studio terms, social media agency terms India UAE"
            />

            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Scale size={14} />
                        <span>Legal Agreement</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-neutral-500 text-sm font-medium">Last Updated: {lastUpdated} · Effective immediately upon account creation or service engagement.</p>
                </div>

                <div className="space-y-10">

                    {/* 1. Agreement */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-brand-primary" size={22} />
                            <h2 className="text-2xl font-bold text-white font-display">1. Agreement to Terms</h2>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            By accessing or using any service provided by <strong className="text-white">Social Ninja's</strong> ("Company," "we," "us," or "our") — including our website at socialninjas.in, AI Content Studio, performance marketing retainers, or any other offering — you agree to be bound by these Terms of Service.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity. If you do not agree to these Terms, do not use our services.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                            These Terms apply to all clients, visitors, and users across India, UAE, UK, USA, and any other jurisdiction where our services are accessed.
                        </p>
                    </section>

                    {/* 2. Services */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-5 pl-4 border-l-2 border-brand-primary font-display">2. Services We Provide</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Performance Marketing', desc: 'Paid media management across Meta, Google, LinkedIn, and other platforms. Results are influenced by platform algorithms, market conditions, and ad spend — no specific outcome is guaranteed.' },
                                { title: 'AI Content Studio', desc: 'A SaaS-adjacent subscription product providing AI-generated social media content. Trial users receive 3 posts at no charge. Paid plans are billed monthly. Content is AI-generated and should be reviewed before publishing.' },
                                { title: 'Social Media Management', desc: 'Content creation, scheduling, and community management services as outlined in individual service agreements.' },
                                { title: 'AI Automation & Systems', desc: 'Lead generation, CRM automation, chatbots, and workflow systems. Implementation timelines are estimates and may vary based on client-side dependencies.' },
                                { title: 'Consulting & Strategy', desc: 'Advisory services billed at agreed rates. Strategy recommendations are based on available information and industry best practice — outcomes depend on client execution.' },
                            ].map((s, i) => (
                                <div key={i} className="bg-brand-surface border border-white/5 rounded-xl p-5">
                                    <h3 className="font-bold text-white mb-1">{s.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Payments */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <CreditCard className="text-brand-primary" size={22} />
                            <h2 className="text-2xl font-bold text-white font-display">3. Payments & Billing</h2>
                        </div>
                        <ul className="space-y-3 text-neutral-400">
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">AI Content Studio:</strong> Subscriptions are billed monthly via Razorpay. Starter ₹2,999/mo, Growth ₹5,499/mo, Pro ₹8,999/mo. USD pricing applies for international clients.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Retainer Services:</strong> Monthly retainers are due on the 1st of each month. A 7-day grace period applies before service suspension.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Ad Spend:</strong> Ad budgets managed by us are held separately. We do not mark up ad spend unless explicitly agreed in writing.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Late Payments:</strong> Invoices unpaid after 14 days may incur a 2% monthly interest charge and result in service pause.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Taxes:</strong> All prices are exclusive of applicable GST (India) or VAT (UAE/EU) unless stated otherwise.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Refunds:</strong> Due to the bespoke nature of marketing work, we do not issue refunds for completed work. AI Content Studio subscriptions may be cancelled before the next billing cycle. Disputes must be raised within 30 days of invoice.</span></li>
                        </ul>
                    </section>

                    {/* 4. Client Obligations */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-5 pl-4 border-l-2 border-brand-primary font-display">4. Client Obligations</h2>
                        <p className="text-neutral-400 mb-4 leading-relaxed">To enable us to deliver results, you agree to:</p>
                        <div className="grid md:grid-cols-2 gap-3">
                            {[
                                'Provide accurate business information, brand assets, and access credentials in a timely manner',
                                'Respond to requests for feedback and approvals within 3 business days',
                                'Maintain sufficient ad budget as agreed — underfunding campaigns affects outcomes',
                                'Not use our services for any unlawful, deceptive, or spam-related activities',
                                'Ensure all content you provide to us is legally owned or licensed by you',
                                'Keep your Razorpay payment method current and valid',
                            ].map((item, i) => (
                                <div key={i} className="bg-brand-surface border border-white/5 rounded-xl p-4 flex gap-3">
                                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. Intellectual Property */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white font-display mb-4">5. Intellectual Property</h2>
                        <ul className="space-y-3 text-neutral-400">
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Your IP:</strong> All content, brand assets, and materials you provide remain your property. You grant us a non-exclusive licence to use them solely to deliver the agreed services.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Our IP:</strong> Our proprietary systems, methodologies, prompt frameworks, and platform code remain our intellectual property. You may not reverse-engineer or resell them.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Deliverables:</strong> Upon full payment, final creative deliverables (copy, designs, campaigns) are assigned to you. Strategy documents, internal frameworks, and source templates remain ours.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">AI-Generated Content:</strong> Content generated by our AI Content Studio is provided to you for your use. We retain rights to improve our models using aggregate, anonymised usage data.</span></li>
                        </ul>
                    </section>

                    {/* 6. Confidentiality */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary font-display">6. Confidentiality</h2>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            Both parties agree to keep confidential any proprietary information shared in the course of service delivery. This includes — but is not limited to — business strategies, financial data, customer lists, marketing data, and technical systems.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                            We reserve the right to reference your brand name and aggregate results (e.g., "achieved 4× ROAS") in case studies and marketing materials, unless you request otherwise in writing. We will never share specific financial figures or personal data without your written consent.
                        </p>
                    </section>

                    {/* 7. Prohibited Use */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <Ban className="text-red-400" size={22} />
                            <h2 className="text-2xl font-bold text-white font-display">7. Prohibited Use</h2>
                        </div>
                        <p className="text-neutral-400 mb-4">You may not use our services to:</p>
                        <div className="grid md:grid-cols-2 gap-2">
                            {[
                                'Promote illegal products, services, or activities',
                                'Engage in deceptive advertising or misleading claims',
                                'Spam, phish, or harass individuals',
                                'Infringe on third-party trademarks, copyrights, or patents',
                                'Violate platform advertising policies (Meta, Google, etc.)',
                                'Generate content involving minors in any inappropriate context',
                                'Resell or white-label our AI Content Studio without written permission',
                                'Attempt to reverse-engineer our systems or access APIs without authorisation',
                            ].map((item, i) => (
                                <div key={i} className="flex gap-2 text-sm text-neutral-400 bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                                    <span className="text-red-400 flex-shrink-0">✗</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-neutral-500 text-sm mt-4">Violation of these terms may result in immediate service termination without refund.</p>
                    </section>

                    {/* 8. Limitation of Liability */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pl-4 border-l-2 border-brand-primary font-display">8. Limitation of Liability & Disclaimers</h2>
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-4">
                            <div className="flex gap-3">
                                <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-amber-200 font-semibold mb-2">Important — please read carefully</p>
                                    <p className="text-neutral-400 text-sm leading-relaxed">Marketing results depend on numerous factors outside our control: platform algorithm changes, market conditions, seasonality, product-market fit, creative quality, and client-side execution. We do not guarantee specific ROAS, follower counts, lead volumes, or revenue outcomes.</p>
                                </div>
                            </div>
                        </div>
                        <ul className="space-y-3 text-neutral-400">
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span>Our total liability to you in any calendar month shall not exceed the fees paid to us in that month.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span>We are not liable for indirect, consequential, or punitive damages of any kind, including lost profits or business interruption.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span>We are not responsible for third-party platform outages, policy changes, or account suspensions (Meta, Google, etc.) that affect campaign delivery.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span>AI-generated content is provided "as-is." You are responsible for reviewing it before publishing and ensuring it complies with applicable laws and platform policies.</span></li>
                        </ul>
                    </section>

                    {/* 9. Termination */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white font-display mb-4">9. Termination</h2>
                        <ul className="space-y-3 text-neutral-400">
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">By You:</strong> You may cancel any monthly subscription before the next billing date. Retainer agreements require 30 days' written notice. Work completed up to the notice date is billable.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">By Us:</strong> We reserve the right to terminate services with 14 days' notice for any non-material reason, or immediately for breach of these Terms, non-payment, or conduct harmful to our team or reputation.</span></li>
                            <li className="flex gap-3"><span className="text-brand-primary font-bold mt-0.5 flex-shrink-0">→</span><span><strong className="text-white">Effect:</strong> On termination, each party returns or destroys the other's confidential information. Outstanding invoices remain due. Clauses 5, 6, 8, and 10 survive termination.</span></li>
                        </ul>
                    </section>

                    {/* 10. Governing Law */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="text-brand-primary" size={22} />
                            <h2 className="text-xl font-bold text-white font-display">10. Governing Law & Dispute Resolution</h2>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            These Terms shall be governed by the laws of <strong className="text-white">India</strong>. Any disputes shall first be attempted to be resolved through good-faith negotiation within 30 days.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            If unresolved, disputes shall be submitted to binding arbitration in accordance with the <strong className="text-white">Arbitration and Conciliation Act, 1996</strong> (India). The seat of arbitration shall be Bengaluru, Karnataka. The language shall be English. The award shall be final and binding.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                            For UAE-based clients, disputes may alternatively be referred to the <strong className="text-white">DIFC Courts</strong> or <strong className="text-white">ADGM Courts</strong> at our election. For UK/EU clients, we comply with applicable consumer protection regulations in your jurisdiction.
                        </p>
                    </section>

                    {/* 11. Changes */}
                    <section className="bg-brand-surface border border-white/5 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white font-display mb-4">11. Changes to These Terms</h2>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            We may update these Terms periodically. Material changes will be communicated via email to active clients at least 14 days before taking effect. Continued use of our services after the effective date constitutes acceptance.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                            The most current version of these Terms is always available at <strong className="text-white">socialninjas.in/terms</strong>.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="text-brand-primary" size={22} />
                            <h2 className="text-2xl font-bold text-white font-display">Questions?</h2>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-3">
                            For any questions regarding these Terms of Service, please contact our legal team:
                        </p>
                        <div className="space-y-2 text-sm">
                            <p><strong className="text-white">Email:</strong> <a href="mailto:legal@socialninjas.in" className="text-brand-primary hover:underline">legal@socialninjas.in</a></p>
                            <p><strong className="text-white">General:</strong> <a href="mailto:hello@socialninjas.in" className="text-brand-primary hover:underline">hello@socialninjas.in</a></p>
                            <p><strong className="text-white">Entity:</strong> Social Ninja's Digital Agency, India</p>
                        </div>
                        <div className="mt-6 flex gap-4 flex-wrap">
                            <a href="/privacy" className="text-sm text-brand-primary hover:underline">← Privacy Policy</a>
                            <a href="/contact" className="text-sm text-brand-primary hover:underline">Contact Us →</a>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Terms;
