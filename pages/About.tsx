import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import {
   BarChart3, Clock, Lock, ArrowRight, Plus, Minus,
   Users, Heart, Trophy, Quote, Sparkles, Globe,
   MapPin, Zap, Activity, ShieldCheck, Target
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
   const [openFaq, setOpenFaq] = useState<number | null>(0);

   const faqs = [
      {
         question: "How is Social Ninja's different from a traditional agency?",
         answer: "Traditional agencies often rely on disjointed freelancers and charge for 'hours' or 'posts'. We operate as a tactical strike team that builds revenue infrastructure. We combine high-fidelity creative production directly with algorithmic media buying. We don't sell deliverables; we sell measurable business outcomes (ROAS, CAC, Net Margin)."
      },
      {
         question: "Do you work with startups or established brands?",
         answer: "We work with brands that have achieved product-market fit and are ready to scale aggressively. Typically, our partners are generating at least $30k-$50k/mo in revenue, though we make exceptions for well-funded startups with exceptional unit economics."
      },
      {
         question: "What does your pricing structure look like?",
         answer: "We believe in aligning incentives. Our pricing is typically a hybrid model: a flat base fee to cover the 'hard costs' of our premium talent and infrastructure, plus a performance incentive based on the revenue or qualified leads we generate. If we win, you win."
      },
      {
         question: "How long does it take to see results?",
         answer: "Speed is our strategy. We launch initial campaigns within 7-10 days of onboarding. While algorithmic learning takes time, most clients see a significant trend reversal in lead quality and CPA within the first 30-45 days. We operate in 90-day sprints to allow for full full-funnel optimization."
      },
      {
         question: "Do I own the data and creative assets?",
         answer: "100%. We practice 'Extreme Ownership'. Unlike other agencies that hold ad accounts hostage, you retain full ownership of your Ad Manager accounts, creative assets, and data. We are building *your* infrastructure, not ours."
      }
   ];



   const toggleFaq = (index: number) => {
      setOpenFaq(openFaq === index ? null : index);
   };

   return (
      <div className="min-h-screen bg-[#020617] overflow-hidden selection:bg-brand-primary selection:text-black font-sans">
         <SEO
            title="About Social Ninja's | #1 Digital Growth Partner for India & UAE"
            description="We are a tactical revenue strike team. We combine high-fidelity creative with algorithmic media buying to help brands dominate their market. Zero fluff, 100% outcomes."
            keywords="growth agency team, performance marketing specialists, brand scaling strategy, tactical digital agency, marketing ROI experts, India marketing agency, Dubai digital agency"
         />

         {/* --- HERO: MISSION CONTROL --- */}
         <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
               <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-[#020617] to-transparent"></div>
               <div className="absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                  {/* Left: Manifesto */}
                  <div className="lg:w-1/2">
                     <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-8">
                           <Activity size={12} className="animate-pulse" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">System Status: Optimal</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8">
                           REVENUE <br />
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary">DOMINANCE.</span>
                        </h1>

                        <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-xl border-l-2 border-brand-primary/50 pl-6 mb-10">
                           We are the antidote to the bloated, slow-moving agency. A tactical strike team engineering growth infrastructure for the world's most ambitious brands.
                        </p>

                        <div className="flex gap-6">
                           <div className="flex flex-col">
                              <span className="text-3xl font-display font-bold text-white">4.8x</span>
                              <span className="text-xs text-neutral-500 uppercase tracking-widest">Avg ROAS</span>
                           </div>
                           <div className="w-px h-12 bg-white/10"></div>
                           <div className="flex flex-col">
                              <span className="text-3xl font-display font-bold text-white">$40M+</span>
                              <span className="text-xs text-neutral-500 uppercase tracking-widest">Ad Spend Managed</span>
                           </div>
                        </div>
                     </ScrollReveal>
                  </div>

                  {/* Right: Network Map / Visual */}
                  <div className="lg:w-1/2 relative">
                     <ScrollReveal delay="200ms">
                        <div className="relative aspect-square max-w-[500px] mx-auto">
                           {/* Central Globe Representation */}
                           <div className="absolute inset-0 rounded-full border border-brand-primary/20 animate-spin-slow-reverse opacity-30"></div>
                           <div className="absolute inset-12 rounded-full border border-dashed border-white/10 animate-spin-slow"></div>

                           {/* Nodes */}
                           <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2">
                              <div className="relative group cursor-pointer">
                                 <div className="w-4 h-4 bg-brand-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                                 <div className="w-4 h-4 bg-brand-primary rounded-full relative z-10 shadow-[0_0_20px_#38bdf8]"></div>
                                 <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-bold text-xs bg-brand-dark/80 px-2 py-1 rounded border border-brand-primary/30">INDIA HQ</span>
                                 </div>
                              </div>
                           </div>

                           <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2">
                              <div className="relative group cursor-pointer">
                                 <div className="w-3 h-3 bg-brand-secondary rounded-full animate-ping absolute inset-0 opacity-75 animation-delay-500"></div>
                                 <div className="w-3 h-3 bg-brand-secondary rounded-full relative z-10 shadow-[0_0_20px_#8b5cf6]"></div>
                                 <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-bold text-xs bg-brand-dark/80 px-2 py-1 rounded border border-brand-secondary/30">UAE OPS</span>
                                 </div>
                              </div>
                           </div>

                           {/* Connecting Line */}
                           <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <path d="M 125 250 Q 250 150 375 166" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5 5" className="animate-dash" />
                              <defs>
                                 <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#38bdf8" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                 </linearGradient>
                              </defs>
                           </svg>
                        </div>
                     </ScrollReveal>
                  </div>
               </div>
            </div>
         </div>

         {/* --- OPERATING PRINCIPLES (Holographic Cards) --- */}
         <div className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Core Protocols</h2>
                  <p className="text-neutral-400">The operating system that drives our decisions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     {
                        icon: BarChart3,
                        title: "Profit > Popularity",
                        desc: "Vanity metrics are for influencers. We optimize for the numbers that actually appear on your P&L: CAC, LTV, and Net Margin.",
                        color: "brand-primary"
                     },
                     {
                        icon: Clock,
                        title: "Speed as Standard",
                        desc: "The market penalizes slowness. We launch, test, and pivot campaigns faster than your internal team can schedule a meeting.",
                        color: "brand-secondary"
                     },
                     {
                        icon: ShieldCheck,
                        title: "Extreme Ownership",
                        desc: "No 'brand awareness' excuses. If the needle isn't moving, we fix it. You retain full ownership of all data and assets.",
                        color: "brand-accent"
                     }
                  ].map((item, i) => (
                     <ScrollReveal key={i} delay={`${i * 100}ms`}>
                        <div className="group relative p-8 rounded-3xl bg-[#050A1F]/50 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-500 h-full overflow-hidden hover:-translate-y-2">
                           <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}/10 rounded-full blur-[60px] group-hover:bg-${item.color}/20 transition-all`}></div>

                           <div className="relative z-10">
                              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-${item.color} transition-colors shadow-lg`}>
                                 <item.icon size={28} />
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                              <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
                           </div>
                        </div>
                     </ScrollReveal>
                  ))}
               </div>
            </div>
         </div>

         {/* --- CULTURE & PEOPLE --- */}
         <div className="py-24 border-t border-white/5 bg-[#030921]">
            <div className="max-w-7xl mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="max-w-2xl">
                     <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Inside The Dojo</span>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Culture & People</h2>
                     <p className="text-neutral-400 mt-6 text-lg font-light leading-relaxed">
                        Great systems need great operators. We’ve built a culture of radical autonomy and high performance.
                     </p>
                  </div>
                  <Link to="/careers">
                     <Button variant="outline" className="rounded-full px-8">Join the Team</Button>
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-brand-surface border border-white/5 p-10 rounded-3xl flex flex-col items-center text-center hover:border-brand-primary/20 transition-all duration-300 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white mb-8 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all">
                        <Users size={28} />
                     </div>
                     <h3 className="text-2xl font-display font-bold text-white mb-4">Zero Politics</h3>
                     <p className="text-neutral-400 leading-relaxed">
                        Best idea wins. We don't care about tenure or titles. We care about data and outcomes.
                     </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-brand-surface border border-white/5 p-10 rounded-3xl flex flex-col items-center text-center hover:border-brand-primary/20 transition-all duration-300 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white mb-8 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all">
                        <Trophy size={28} />
                     </div>
                     <h3 className="text-2xl font-display font-bold text-white mb-4">Meritocracy</h3>
                     <p className="text-neutral-400 leading-relaxed">
                        Compensation and promotion are tied directly to the value you create, not hours worked.
                     </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-brand-surface border border-white/5 p-10 rounded-3xl flex flex-col items-center text-center hover:border-brand-primary/20 transition-all duration-300 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white mb-8 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all">
                        <Heart size={28} />
                     </div>
                     <h3 className="text-2xl font-display font-bold text-white mb-4">Obsessive Growth</h3>
                     <p className="text-neutral-400 leading-relaxed">
                        We invest heavily in upskilling. If you aren't growing 50% YoY personally, you're in the wrong place.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* --- FAQ SECTION REFINED --- */}
         <div className="py-24 border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Briefing Room</h2>
                  <p className="text-neutral-400">Debriefing common tactical inquiries.</p>
               </div>

               <div className="space-y-4">
                  {faqs.map((faq, index) => (
                     <div
                        key={index}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === index
                           ? 'bg-brand-surface border-brand-primary/40 shadow-[0_0_30px_rgba(56,189,248,0.1)]'
                           : 'bg-white/5 border-white/5 hover:border-brand-primary/20 hover:bg-white/10'
                           }`}
                     >
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
                        >
                           <span className={`text-lg font-bold transition-colors duration-300 ${openFaq === index ? 'text-brand-primary' : 'text-white'}`}>
                              {faq.question}
                           </span>
                           <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4 ${openFaq === index
                              ? 'bg-brand-primary border-brand-primary text-brand-dark rotate-180'
                              : 'bg-transparent border-white/20 text-white/50 group-hover:text-white group-hover:border-white'
                              }`}>
                              {openFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                           </div>
                        </button>

                        <div
                           className={`grid transition-[grid-template-rows] duration-500 ease-out ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                        >
                           <div className="overflow-hidden">
                              <div className="px-6 pb-6 text-neutral-400 leading-relaxed text-sm lg:text-base border-t border-white/5 pt-4">
                                 {faq.answer}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* --- CTA --- */}
         <div className="py-24 relative overflow-hidden bg-brand-primary">
            <div className="absolute inset-0 bg-brand-dark opacity-90"></div>
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
               <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">Ready to mobilize?</h2>
               <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  We are currently accepting 3 new partners for Q1. Initiate your audit request before our roster fills.
               </p>
               <Link to="/contact">
                  <Button className="bg-white text-brand-dark hover:bg-neutral-200 border-none px-12 py-5 text-lg font-bold rounded-full shadow-2xl">
                     Initiate Protocol
                  </Button>
               </Link>
            </div>
         </div>

      </div>
   );
};

export default About;
