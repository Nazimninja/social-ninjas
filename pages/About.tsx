import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Target, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import TiltCard from '../components/TiltCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import AnimatedNumber from '../components/AnimatedNumber';

const VALUES = [
  { icon: Target, title: 'Margin & Profit First', desc: 'We do not report vanity impressions or empty clicks. Every campaign is measured on direct bottom-line revenue.' },
  { icon: Zap, title: '< 1-Second AI Execution', desc: 'Speed wins deals. Our automated AI lead agents respond to inbound leads in under 1 second to maximize close rates.' },
  { icon: Shield, title: 'Total Data Transparency', desc: 'No hidden agency markups or confusing pitch decks. You get live dashboard access to every metric in real-time.' },
  { icon: Award, title: 'Constant A/B Iteration', desc: 'Growth is engineered through relentless creative testing and data-driven optimization across every funnel stage.' }
];

const About: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="About Us | Social Ninja's"
        description="Learn about Social Ninja's — the AI performance marketing agency scaling revenue for brands globally."
      />

      {/* HERO WITH AURORA BACKGROUND */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            WHO WE ARE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            We Build Revenue Systems, <br />
            <span className="text-[#1F4B99]">Not Vanity Campaigns.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Social Ninja’s is an AI-powered performance marketing agency operating across India and Dubai. We fuse autonomous AI agents with high-margin media buying to build predictable growth engines.
          </p>
        </div>
      </AuroraBackground>

      {/* PROOF NUMBERS */}
      <section className="py-16 bg-[#0b0e17] border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800">
              <div className="text-3xl sm:text-4xl font-black text-[#1F4B99]">
                <AnimatedNumber value="150+" />
              </div>
              <div className="text-xs font-bold text-neutral-200 mt-2">Active Brand Partners</div>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800">
              <div className="text-3xl sm:text-4xl font-black text-[#1F4B99]">
                <AnimatedNumber value="₹40Cr+" />
              </div>
              <div className="text-xs font-bold text-neutral-200 mt-2">Ad Spend Managed</div>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800">
              <div className="text-3xl sm:text-4xl font-black text-[#1F4B99]">
                <AnimatedNumber value="4.8×" />
              </div>
              <div className="text-xs font-bold text-neutral-200 mt-2">Average Client ROAS</div>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800">
              <div className="text-3xl sm:text-4xl font-black text-[#1F4B99]">
                <AnimatedNumber value="97%" />
              </div>
              <div className="text-xs font-bold text-neutral-200 mt-2">Retention Rate</div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase rounded-full tracking-wider">
            OUR OPERATING PRINCIPLES
          </span>
          <h2 className="text-3xl font-black text-white">Engineered for Predictable Profit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/30 flex items-center justify-center text-[#4281f5]">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{v.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{v.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <SpotlightCard className="p-12 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white animate-text-shimmer">
            Partner With an Agency That Focuses on Profit
          </h2>
          <div className="flex justify-center pt-2">
            <Link to="/contact">
              <ShinyButton variant="primary" className="text-sm font-bold">
                Book Strategy Call <ArrowRight size={16} />
              </ShinyButton>
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default About;
