import React from 'react';
import { ShieldCheck, TrendingUp, Star } from 'lucide-react';

const SocialProofBanner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-[#020617] border-b border-white/10 flex items-center justify-center overflow-hidden">
      {/* Gradient Fades for Smooth Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center gap-12 animate-scroll whitespace-nowrap min-w-full px-4">
        {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <Star size={10} className="text-brand-primary fill-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">Trusted by 100+ Premium Brands</span>
                </div>
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <TrendingUp size={10} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">$50M+ Revenue Generated</span>
                </div>
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <ShieldCheck size={10} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">Official Meta & Google Partner</span>
                </div>
            </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SocialProofBanner;