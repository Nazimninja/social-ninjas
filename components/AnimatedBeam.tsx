import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Flame, CheckCircle, Database } from 'lucide-react';

export const AnimatedBeam: React.FC = () => {
  const NODES = [
    { icon: Flame, label: 'Meta & Google Ads', desc: 'Paid Traffic Intake', color: 'from-[#1F4B99] to-[#255ec4]' },
    { icon: Bot, label: 'AI Qualifier Agent', desc: '< 1s Instant Response', color: 'from-[#1F4B99] to-[#3ba213]' },
    { icon: MessageSquare, label: 'WhatsApp & DM Sync', desc: 'Automated Nurture', color: 'from-[#3ba213] to-[#2e880e]' },
    { icon: Database, label: 'Enterprise CRM 2.0', desc: 'Calendar Booking & Deal', color: 'from-[#1F4B99] to-[#163773]' },
  ];

  return (
    <div className="w-full bg-[#0b0e17] border border-neutral-800/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1F4B99]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <span className="px-3.5 py-1 bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] rounded-full text-xs font-bold uppercase tracking-wider">
          LIVE SYSTEM FLOW
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white mt-3">
          Zero-Latency Growth Engine Architecture
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Watch how incoming ad leads are qualified and converted in seconds via automated AI pipelines
        </p>
      </div>

      {/* Interactive System Beam Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {NODES.map((node, idx) => {
          const Icon = node.icon;
          return (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="bg-[#121826] border border-neutral-800 p-5 rounded-2xl flex flex-col items-center text-center relative group hover:border-[#1F4B99]/50 transition-colors shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} p-0.5 shadow-lg mb-3 flex items-center justify-center`}>
                  <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center text-white">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>
                <div className="font-bold text-sm text-white mb-1">{node.label}</div>
                <div className="text-[11px] text-neutral-400 font-medium">{node.desc}</div>

                {/* Status Dot */}
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#3ba213] font-semibold bg-[#3ba213]/10 px-2.5 py-0.5 rounded-full border border-[#3ba213]/20">
                  <CheckCircle size={10} /> Active Pipeline
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Animated Beam Laser Track (Logo Blue) */}
      <div className="mt-8 relative h-2 bg-neutral-800/80 rounded-full overflow-hidden hidden md:block">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#1F4B99] to-transparent shadow-[0_0_15px_#1F4B99]"
        />
      </div>
    </div>
  );
};

export default AnimatedBeam;
