import React from 'react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO title="Privacy Policy | Social Ninja's" description="Privacy policy and data security standards for Social Ninja's." />

      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl font-black text-white animate-text-shimmer">Privacy Policy</h1>
          <p className="text-xs text-neutral-400">Last updated: July 2026</p>
        </div>
      </AuroraBackground>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-6 text-xs text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Data Protection & Security</h2>
          <p>Social Ninja’s prioritizes data security. All lead submission data processed via our AI qualifiers and CRM integrations is encrypted at rest and in transit.</p>

          <h2 className="text-lg font-bold text-white">2. Information Collection</h2>
          <p>We collect contact information (Name, Email, Phone Number, Business Details) provided voluntarily through web forms, WhatsApp, or AI agent interactions.</p>

          <h2 className="text-lg font-bold text-white">3. Third-Party Integrations</h2>
          <p>Lead data is synchronized strictly to client-authorized CRM endpoints (PostgREST/Supabase, HubSpot, WhatsApp Cloud API).</p>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
