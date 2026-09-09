import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowRight, ShieldCheck, Clock, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import TiltCard from '../components/TiltCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

const PRODUCT_NAMES: Record<string, string> = {
  'ai-sales-agent': 'AI Sales Agent (Waitlist / Early Access)',
  'ad-copy-generator': 'AI Ad Copy Generator (Waitlist / Early Access)',
  'reporting-assistant': 'AI Reporting Assistant (Waitlist / Early Access)',
  'fit-ninja': 'Fit Ninja Pro',
};

const Contact: React.FC = () => {
  const location = useLocation();
  const [productKey, setProductKey] = useState<string | null>(null);
  const [goals, setGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get('product');
    const subj = params.get('subject');
    if (p && PRODUCT_NAMES[p]) {
      setProductKey(p);
      setGoals(`I am interested in early access / waitlist for ${PRODUCT_NAMES[p]}.`);
    } else if (subj) {
      setGoals(`Inquiry regarding: ${subj}`);
    }
  }, [location.search]);

  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Contact Us | Social Ninja's"
        description="Get in touch with Social Ninja's. Schedule a free growth audit or reach out directly."
      />

      {/* HERO WITH AURORA BACKGROUND */}
      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            {productKey ? '⚡ EARLY ACCESS APPLICATION' : 'GET IN TOUCH'}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            {productKey ? (
              <>Join the Waitlist for <br /><span className="text-[#1F4B99]">{PRODUCT_NAMES[productKey] || 'Our AI Tool'}</span></>
            ) : (
              <>Let’s Build Your <br /><span className="text-[#1F4B99]">AI Revenue Engine.</span></>
            )}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {productKey ? (
              `Reserve your spot for priority deployment and early founder pricing as soon as ${PRODUCT_NAMES[productKey]} goes live.`
            ) : (
              'Fill out the form below to book a free 15-minute growth strategy audit with our team.'
            )}
          </p>
        </div>
      </AuroraBackground>

      {/* CONTACT FORM & INFO GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column — Contact Info Cards */}
          <div className="space-y-6">
            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/30 flex items-center justify-center text-[#4281f5]">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Direct Email</h3>
              <p className="text-xs text-neutral-400">Reach our strategy team directly anytime</p>
              <a href="mailto:info@socialninjas.in" className="text-xs font-bold text-[#4281f5] hover:underline block pt-1">
                info@socialninjas.in
              </a>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3ba213]/15 border border-[#3ba213]/30 flex items-center justify-center text-[#3ba213]">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Phone & WhatsApp</h3>
              <p className="text-xs text-neutral-400">Instant response during business hours</p>
              <a href="tel:+919876543210" className="text-xs font-bold text-[#3ba213] hover:underline block pt-1">
                +91 98765 43210
              </a>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/30 flex items-center justify-center text-[#4281f5]">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Global Hubs</h3>
              <p className="text-xs text-neutral-400">India & Dubai Operations</p>
              <div className="text-xs text-neutral-300 font-semibold pt-1">
                Dubai • Bengaluru • Mumbai
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column — 3D Tilt Contact Form */}
          <div className="lg:col-span-2">
            <TiltCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-2xl font-bold text-white">
                  {productKey ? `Apply for Early Access: ${PRODUCT_NAMES[productKey]}` : 'Book Your Free Growth Audit'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  {productKey ? 'Fill in your details to secure priority founder pricing and immediate onboarding.' : 'Select your business goal and we will reach out within 2 hours.'}
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#3ba213]/20 border border-[#3ba213]/40 flex items-center justify-center text-[#3ba213] mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {productKey ? 'Waitlist Application Received!' : 'Audit Request Received!'}
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    {productKey
                      ? 'Thank you! We have added you to our priority early access queue. You will receive an onboarding invitation shortly.'
                      : 'Thank you! Our growth team has received your information and will reach out to you within 2 business hours.'}
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#38bdf8] font-bold hover:underline"
                    >
                      ← Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setIsSubmitted(true);
                    }, 1200);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Your Full Name *</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]" />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Work Email *</label>
                      <input type="email" required placeholder="john@company.com" className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Phone Number</label>
                      <input type="tel" placeholder="+91..." className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]" />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Monthly Ad Budget</label>
                      <select className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]">
                        <option>Under ₹50,000 / mo</option>
                        <option>₹50,000 - ₹2,00,000 / mo</option>
                        <option>₹2,00,000 - ₹10,00,000 / mo</option>
                        <option>₹10,00,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Your Business & Goals</label>
                    <textarea rows={4} value={goals} onChange={e => setGoals(e.target.value)} placeholder="Tell us about your brand, current challenges, and revenue goals..." className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]" />
                  </div>

                  <div className="pt-2">
                    <ShinyButton
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>{productKey ? 'Submitting Application…' : 'Submitting Audit Request…'}</span>
                        </>
                      ) : (
                        <>
                          <span>{productKey ? 'Submit Waitlist Request' : 'Submit Audit Request'}</span>
                          <Send size={16} />
                        </>
                      )}
                    </ShinyButton>
                  </div>
                </form>
              )}
            </TiltCard>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
