import React from 'react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import { FileText, CreditCard, Shield, AlertTriangle, Clock, Globe, Scale, Mail } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: '1. Agency Engagement & Scope of Services',
    content: `By engaging Social Ninja's for AI automation, performance marketing, creative production, or strategy consulting services, the client agrees to the service scope as outlined in their individual service agreement or Statement of Work (SOW). Any additions or changes to scope must be agreed upon in writing. Social Ninja's reserves the right to decline work that conflicts with our brand values or operational capabilities.`,
  },
  {
    icon: CreditCard,
    title: '2. Payments & Subscription Retainers',
    content: `All subscription retainers, campaign management fees, and one-time project fees are billed according to agreed payment terms. Monthly retainers are due on the 1st of each billing cycle. Late payments beyond 7 days may result in service suspension. Refunds are governed strictly by the milestone schedule outlined in the client's contract — refunds are not available for completed deliverables or active ad spend already deployed.`,
  },
  {
    icon: Shield,
    title: '3. Intellectual Property Rights',
    content: `Custom AI agent architectures, proprietary automation scripts, prompt engineering frameworks, and strategic playbooks developed during client retainers remain protected under Social Ninja's agency IP licenses. Upon full payment, clients receive a perpetual license to use all creative deliverables (ad creatives, copy, graphics) exclusively for their brand. Agency methodologies, templates, and systems remain our intellectual property.`,
  },
  {
    icon: AlertTriangle,
    title: '4. Performance Disclaimers',
    content: `While Social Ninja's maintains a strong track record with average 4.5x ROAS across clients, individual campaign performance depends on factors including market competition, product-market fit, budget allocation, and platform algorithm changes. We make no guarantee of specific revenue outcomes. Historical results shared in case studies are real but are not guarantees of future performance.`,
  },
  {
    icon: Clock,
    title: '5. Contract Duration & Termination',
    content: `Service agreements typically operate on a 3-month minimum engagement to allow sufficient time for AI system training, ad creative testing, and optimization cycles. Early termination requires 30 days written notice. Upon termination, all completed work is delivered to the client, and any ongoing ad campaigns may be handed over. Access to Social Ninja's proprietary tools and systems ceases upon contract end.`,
  },
  {
    icon: Globe,
    title: '6. Acceptable Use of AI Tools',
    content: `Social Ninja's AI-powered tools (Content Studio, AI Lead Automation, CRM 2.0) may only be used for lawful purposes. Users must not use our tools to generate spam, misleading content, illegal advertising, or content violating platform policies of Meta, Google, LinkedIn, or WhatsApp. Violation of acceptable use may result in immediate account termination without refund.`,
  },
  {
    icon: Scale,
    title: '7. Limitation of Liability',
    content: `Social Ninja's total liability for any claim arising from services provided shall not exceed the total fees paid by the client in the 3 months preceding the claim. We are not liable for indirect, incidental, or consequential damages including lost profits, data loss, or platform account suspensions resulting from advertising decisions. Clients remain responsible for ensuring all advertising content complies with applicable laws and platform policies.`,
  },
  {
    icon: Mail,
    title: '8. Governing Law & Disputes',
    content: `These Terms of Service are governed by the laws of Karnataka, India. Any disputes arising from service agreements shall first be addressed through good-faith negotiation. If resolution is not reached within 30 days, disputes will be resolved through binding arbitration in Bangalore, India. For any questions about these terms, contact us at hello@socialninjas.in.`,
  },
];

const Terms: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO title="Terms of Service | Social Ninja's" description="Terms of service, engagement policies, payment terms, and intellectual property rights for Social Ninja's services." />

      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white animate-text-shimmer">Terms of Service</h1>
          <p className="text-xs text-neutral-500">Last updated: July 2026 — Effective for all engagements and platform users.</p>
        </div>
      </AuroraBackground>

      <section className="py-16 max-w-4xl mx-auto px-4 space-y-6">
        {/* Intro card */}
        <SpotlightCard className="p-8 bg-[#0e121d] border border-[#1F4B99]/20 space-y-3">
          <p className="text-sm text-neutral-300 leading-relaxed">
            These Terms of Service govern your relationship with <strong className="text-white">Social Ninja's</strong> and your use of all services, platforms, and AI tools operated by us. By signing a service agreement, making a payment, or using any of our tools, you accept and agree to be bound by these terms in full.
          </p>
        </SpotlightCard>

        {/* Section cards */}
        {sections.map((s, i) => (
          <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800 space-y-4 hover:border-neutral-700 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F4B99]/15 border border-[#1F4B99]/25 flex items-center justify-center text-[#4281f5] flex-shrink-0">
                <s.icon size={17} />
              </div>
              <h2 className="text-base font-bold text-white">{s.title}</h2>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed pl-12">{s.content}</p>
          </SpotlightCard>
        ))}

        {/* Footer note */}
        <div className="text-center py-4">
          <p className="text-xs text-neutral-600">
            Questions about our terms? Email us at{' '}
            <a href="mailto:hello@socialninjas.in" className="text-[#4281f5] hover:underline">hello@socialninjas.in</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
