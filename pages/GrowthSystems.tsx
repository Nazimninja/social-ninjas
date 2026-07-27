import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import AnimatedBeam from '../components/AnimatedBeam';

const GrowthSystems: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Growth Systems | Social Ninja's"
        description="Autonomous revenue engines combining AI automation, paid ads, and content systems."
      />

      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            ENTERPRISE ARCHITECTURE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Autonomous Growth Systems <br />
            <span className="text-[#1F4B99]">Engineered for Scale.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            We replace manual sales follow-ups and uncalibrated ad spend with automated, unit-economic growth engines.
          </p>
        </div>
      </AuroraBackground>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedBeam />
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <SpotlightCard className="p-12 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white animate-text-shimmer">
            Ready to Deploy Your Growth Architecture?
          </h2>
          <div className="flex justify-center pt-2">
            <Link to="/contact">
              <ShinyButton variant="primary" className="text-sm font-bold">
                Schedule Strategy Audit <ArrowRight size={16} />
              </ShinyButton>
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default GrowthSystems;
