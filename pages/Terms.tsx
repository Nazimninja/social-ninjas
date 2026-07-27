import React from 'react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

const Terms: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO title="Terms of Service | Social Ninja's" description="Terms of service and user agreements for Social Ninja's services." />
      
      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl font-black text-white animate-text-shimmer">Terms of Service</h1>
          <p className="text-xs text-neutral-400">Last updated: July 2026</p>
        </div>
      </AuroraBackground>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-6 text-xs text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Agency Engagement & Scope</h2>
          <p>By engaging Social Ninja’s for AI automation, performance marketing, or strategy consulting, client agrees to the scope outlined in their service agreement.</p>

          <h2 className="text-lg font-bold text-white">2. Payments & Subscriptions</h2>
          <p>All subscription retainers and campaign management fees are billed according to agreed terms. Refunds are governed strictly by contract milestones.</p>

          <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
          <p>Custom AI agent prompt architectures and proprietary automation scripts developed during client retainer remain protected under agency IP licenses.</p>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default Terms;
