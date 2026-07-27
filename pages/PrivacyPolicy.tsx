import React from 'react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import { Shield, Database, Eye, Bell, Lock, Globe, UserCheck, Mail } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: '1. Data Protection & Security',
    content: `Social Ninja's prioritizes the security and confidentiality of your data above all else. All lead submission data, client records, and personal information processed via our AI qualifiers, CRM integrations, and contact forms is encrypted at rest (AES-256) and in transit (TLS 1.3+). We conduct regular security audits and maintain strict access controls across all systems.`,
  },
  {
    icon: Database,
    title: '2. Information We Collect',
    content: `We collect contact information voluntarily provided through our web forms, WhatsApp interactions, AI agent conversations, and consultation bookings. This includes: full name, business email address, phone number, company name, business details, and marketing budget ranges. We only collect information necessary to deliver our services.`,
  },
  {
    icon: Eye,
    title: '3. How We Use Your Information',
    content: `Your information is used exclusively to: respond to service inquiries and consultation requests, deliver the growth and automation services you have engaged us for, communicate campaign performance updates and strategy reports, and send relevant educational content and updates you have opted into. We never sell, rent, or trade your personal information to third parties.`,
  },
  {
    icon: Globe,
    title: '4. Third-Party Integrations',
    content: `Lead data is synchronized strictly to client-authorized platforms including Supabase/PostgREST CRM, HubSpot, WhatsApp Cloud API (Meta), Google Analytics, and Razorpay (payment processing). Each integration operates under their respective data processing agreements. We maintain data processing records for all third-party services.`,
  },
  {
    icon: Bell,
    title: '5. Marketing Communications',
    content: `If you opt in to our newsletter or marketing updates, you will receive performance marketing guides, AI automation playbooks, and agency insights. You may unsubscribe at any time by clicking "Unsubscribe" in any email or by contacting us directly at hello@socialninjas.in. We comply fully with CAN-SPAM and GDPR regulations.`,
  },
  {
    icon: Lock,
    title: '6. Cookies & Tracking',
    content: `Our website uses cookies and similar technologies to improve your browsing experience, analyze traffic patterns, and measure advertising effectiveness. This includes Google Analytics (GA4) for anonymized usage statistics, and Google Ads conversion tracking for campaign measurement. You may disable cookies in your browser settings at any time.`,
  },
  {
    icon: UserCheck,
    title: '7. Your Rights',
    content: `You have the right to access, correct, or request deletion of any personal information we hold about you. You may also request data portability or restrict processing of your data at any time. To exercise any of these rights, contact our Data Protection team at hello@socialninjas.in. We will respond to all requests within 30 days.`,
  },
  {
    icon: Mail,
    title: '8. Contact & Data Requests',
    content: `For any privacy-related queries, data access requests, or to report a security concern, contact us at: hello@socialninjas.in. Our registered address is Bangalore, Karnataka, India. We take all privacy concerns seriously and will respond promptly to any inquiry or complaint.`,
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO title="Privacy Policy | Social Ninja's" description="Privacy policy, data protection standards, and your rights as a user of Social Ninja's services." />

      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white animate-text-shimmer">Privacy Policy</h1>
          <p className="text-xs text-neutral-500">Last updated: July 2026 — Effective immediately for all users.</p>
        </div>
      </AuroraBackground>

      <section className="py-16 max-w-4xl mx-auto px-4 space-y-6">
        {/* Intro card */}
        <SpotlightCard className="p-8 bg-[#0e121d] border border-[#1F4B99]/20 space-y-3">
          <p className="text-sm text-neutral-300 leading-relaxed">
            This Privacy Policy describes how <strong className="text-white">Social Ninja's</strong> ("we", "our", or "the Agency") collects, uses, and protects information you provide when using our website (<a href="https://socialninjas.in" className="text-[#4281f5] hover:underline">socialninjas.in</a>), AI tools, CRM systems, and marketing services. By using our services, you agree to the practices described below.
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
            Questions? Email us at{' '}
            <a href="mailto:hello@socialninjas.in" className="text-[#4281f5] hover:underline">hello@socialninjas.in</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
