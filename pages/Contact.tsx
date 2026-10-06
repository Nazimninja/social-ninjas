import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowRight, ShieldCheck, Clock, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import { supabase } from './supabase';

const PRODUCT_NAMES: Record<string, string> = {
  'ai-sales-agent': 'AI Sales Agent (Waitlist / Early Access)',
  'ad-copy-generator': 'AI Ad Copy Generator (Waitlist / Early Access)',
  'reporting-assistant': 'AI Reporting Assistant (Waitlist / Early Access)',
  'fit-ninja': 'Fit Ninja Pro',
};

const Contact: React.FC = () => {
  const location = useLocation();
  const [productKey, setProductKey] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('Under $1,000 / ₹50,000 / mo');
  const [goals, setGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        title="Book a Free Growth Strategy Session | Social Ninja's"
        description="Book a 15-minute growth strategy session. We'll audit your funnels and outline an AI-powered action plan for your brand."
        localBusiness={true}
      />

      {/* HERO WITH AURORA BACKGROUND */}
      <AuroraBackground className="pt-36 pb-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            {productKey && <Sparkles size={13} />}
            <span>{productKey ? 'EARLY ACCESS APPLICATION' : 'GET IN TOUCH'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer text-white">
            {productKey ? `Join the Waitlist for ${PRODUCT_NAMES[productKey] || 'Our AI Tool'}` : 'Book a Strategy Session'}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-[#38bdf8] tracking-tight">
            {productKey ? 'Exclusive Founder Access' : 'Let’s Build Your AI Revenue Engine.'}
          </p>
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
              <a href="tel:+918147757479" className="text-xs font-bold text-[#3ba213] hover:underline block pt-1">
                +91 81477 57479
              </a>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/30 flex items-center justify-center text-[#4281f5]">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Office Headquarters</h3>
              <p className="text-xs text-neutral-400">Primary Registered Office</p>
              <div className="text-xs text-neutral-300 font-semibold pt-1">
                Social Ninja's Agency, Bangalore, Karnataka, India
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Global Partner Hub: Business Bay, Dubai, UAE
              </p>
              <a
                href="https://www.google.com/maps/place/Social+Ninja's/@21.0680074,82.7525294,17z/data=!3m1!4b1!4m6!3m5!1s0x2027c91d5288325f:0xbad4c06d3856e671!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11zyznkfn_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#38bdf8] hover:underline inline-flex items-center gap-1 pt-1"
              >
                View on Google Maps →
              </a>
            </SpotlightCard>
          </div>

          {/* Right Column — Contact Form (Rock-Solid Flat, No Tilt) */}
          <div className="lg:col-span-2">
            <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-6">
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
                  onSubmit={async e => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setErrorMessage(null);

                    const payload = {
                      name: fullName.trim(),
                      email: email.trim(),
                      phone: phone.trim() || null,
                      company: goals ? goals.substring(0, 100) : null,
                      message: `[Budget: ${budget}] ${goals}`.trim(),
                      source: productKey ? `waitlist-${productKey}` : 'main-contact-page',
                      status: 'new'
                    };

                    try {
                      // 1. Insert lead directly into Supabase CRM
                      try {
                        await supabase.from('leads').insert([payload]);
                      } catch (sbErr) {
                        console.warn('Supabase lead insert note:', sbErr);
                      }

                      // 2. Send instant email notification via FormSubmit
                      try {
                        await fetch("https://formsubmit.co/ajax/info@socialninjas.in", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                          },
                          body: JSON.stringify({
                            _subject: `🔥 New Lead from socialninjas.in: ${fullName}`,
                            _template: "table",
                            Name: fullName,
                            Email: email,
                            Phone: phone || 'Not provided',
                            Budget: budget,
                            "Business & Goals": goals || 'Not provided',
                            Source: productKey ? `Early Access: ${productKey}` : 'Free Strategy Audit',
                            Date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                          })
                        });
                      } catch (fsErr) {
                        console.warn('FormSubmit note:', fsErr);
                      }

                      // 3. Track conversion event
                      if (typeof window !== 'undefined') {
                        if ((window as any).gtag) {
                          (window as any).gtag('event', 'generate_lead', {
                            event_category: 'Contact',
                            event_label: productKey || 'Strategy Audit'
                          });
                        }
                        if ((window as any).fbq) {
                          (window as any).fbq('track', 'Lead', {
                            content_name: productKey || 'Strategy Audit'
                          });
                        }
                      }

                      setIsSubmitted(true);
                    } catch (err: any) {
                      console.error('Lead submission error:', err);
                      setIsSubmitted(true);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 / +44 / +971 / +91..."
                        className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Monthly Ad Budget</label>
                      <select
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]"
                      >
                        <option>Under $1,000 / ₹50,000 / mo</option>
                        <option>$1,000 - $3,000 / ₹50,000 - ₹2,50,000 / mo</option>
                        <option>$3,000 - $10,000 / ₹2,50,000 - ₹8,00,000 / mo</option>
                        <option>$10,000+ / ₹8,00,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-300 uppercase tracking-wider mb-2">Your Business & Goals</label>
                    <textarea
                      rows={4}
                      value={goals}
                      onChange={e => setGoals(e.target.value)}
                      placeholder="Tell us about your brand, current challenges, and revenue goals..."
                      className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#1F4B99]"
                    />
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
            </SpotlightCard>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
