
import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Loader2, AlertCircle, Phone, Globe, Building, User, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { submitToGoogleSheets } from '../services/googleSheets';

// Common Country Codes for the selector
const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+1', country: 'Other', flag: '🌍' },
];

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    company: '',
    website: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Validate current step before proceeding
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Work email is required.';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (currentStep === 2) {
      if (!formData.website.trim()) newErrors.website = 'Website or social handle is required.';
    }

    if (currentStep === 3) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number (digits only).';
      }
      if (!formData.message.trim()) newErrors.message = 'Please describe your bottleneck.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // 1. Send Email via FormSubmit.co (AJAX)
    try {
      // Existing FormSubmit.co call
      const response = await fetch("https://formsubmit.co/ajax/nazim@socialninjas.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Discovery Call Request: ${formData.name}`,
          _template: "table",
          Name: formData.name,
          Email: formData.email,
          Phone: `${formData.countryCode} ${formData.phone}`,
          Company: formData.company || "Not Provided",
          Website: formData.website,
          Bottleneck: formData.message,
          Source: "Contact Page Form"
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      console.log("Lead captured successfully via Email");

    } catch (error) {
      console.error("Form email submission error:", error);
    }

    // 1.5 Send to Google Sheets
    try {
      await submitToGoogleSheets({
        type: 'Leads',
        Name: formData.name,
        Email: formData.email,
        Phone: `${formData.countryCode} ${formData.phone}`,
        Company: formData.company || "Not Provided",
        Website: formData.website,
        Bottleneck: formData.message,
        Date: new Date().toISOString()
      });
      console.log("Lead captured successfully via Sheets");
    } catch (error) {
      console.error("Google Sheet submission error:", error);
      // We don't stop execution here because we still want to show the AI response
    }

    // 2. Generate AI Insight via backend
    try {
      const prompt = `You are a Senior Growth Strategist at Social Ninja's.
A potential client submitted a strategy call request.
Name: ${formData.name} | Company: ${formData.company || "Not specified"} | Website: ${formData.website}
Bottleneck: "${formData.message}"
Give a 2-3 sentence "Preliminary Insight" — specific, strategic, no generic advice. Professional and confident tone.`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text || "";
      setAiResponse(text || `Thank you, ${formData.name}. Our strategy team will review your request and contact you shortly.`);


    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse(`Thank you, ${formData.name}. We have received your request. Our strategy team will review your bottleneck regarding "${formData.message}" and contact you shortly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to update state and clear error
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-dark">
      <SEO
        title="Book a Strategy Call | #1 Global Performance Marketing Agency"
        description="Stop burning cash on ads. Book a free 30-minute audit with our strategists. We analyze your creative, offer, and media buying to find your 10x growth levers."
        keywords="global growth marketing agency, performance marketing audit, free marketing strategy call, ad account audit services, hire marketing agency"
      />
      <div className="max-w-7xl mx-auto px-6 safe-area-bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Context */}
          <div className="order-2 lg:order-1">
            {/* ... (Same context content as before, keeping it for consistency) ... */}
            <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-4 block">Discovery Call</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Let's Talk <br /> <span className="text-brand-primary">Growth.</span></h1>
            <p className="text-neutral-400 text-lg mb-10 font-light leading-relaxed">
              Fill out the form to schedule a free 30-minute strategy session. We'll audit your current digital presence and identify the low-hanging fruit for rapid scaling.
            </p>

            <div className="space-y-4 mb-12">
              {[
                "Free Audit of your current Ad Account or Social Feed",
                "Clear Roadmap for the next 90 days",
                "Pricing tailored to your unit economics",
                "No obligation to hire us"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-brand-primary" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-brand-surface p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold">Direct Email</p>
                  <p className="font-medium">nazim@socialninjas.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* New Multi-Step Form */}
          <div className="order-1 lg:order-2 bg-brand-surface border border-white/5 p-6 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">

            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            {!aiResponse ? (
              <>
                <div className="mb-8 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">Book Your Strategy Call</h3>
                    <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Step {step}/{totalSteps}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary transition-all duration-500 ease-out"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form className="relative z-10 flex-grow flex flex-col justify-between" onSubmit={(e) => e.preventDefault()}>

                  {/* Step 1: Identity */}
                  <div className={`space-y-6 transition-all duration-500 ${step === 1 ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'}`}>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <User size={12} /> Full Name <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full bg-brand-dark border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-brand-primary'} rounded-md p-4 text-lg text-white focus:outline-none transition-colors`}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        autoFocus
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Mail size={12} /> Work Email <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="email"
                        className={`w-full bg-brand-dark border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-brand-primary'} rounded-md p-4 text-lg text-white focus:outline-none transition-colors`}
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Step 2: Context */}
                  <div className={`space-y-6 transition-all duration-500 ${step === 2 ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'}`}>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Building size={12} /> Company Name <span className="text-neutral-600 lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-brand-dark border border-white/10 rounded-md p-4 text-lg text-white focus:border-brand-primary focus:outline-none transition-colors"
                        placeholder="Brand / Company"
                        value={formData.company}
                        onChange={e => handleChange('company', e.target.value)}
                        autoFocus={step === 2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <LinkIcon size={12} /> Website or Social Handle <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full bg-brand-dark border ${errors.website ? 'border-red-500/50' : 'border-white/10 focus:border-brand-primary'} rounded-md p-4 text-lg text-white focus:outline-none transition-colors`}
                        placeholder="company.com"
                        value={formData.website}
                        onChange={e => handleChange('website', e.target.value)}
                      />
                      {errors.website && <p className="text-red-400 text-xs mt-1.5">{errors.website}</p>}
                    </div>
                  </div>

                  {/* Step 3: Strategy */}
                  <div className={`space-y-6 transition-all duration-500 ${step === 3 ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'}`}>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Phone size={12} /> Phone Number <span className="text-brand-primary">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative w-1/3 md:w-1/4">
                          <select
                            value={formData.countryCode}
                            onChange={e => handleChange('countryCode', e.target.value)}
                            className="w-full h-full bg-brand-dark border border-white/10 rounded-md pl-3 pr-8 text-white focus:border-brand-primary focus:outline-none appearance-none cursor-pointer text-base"
                          >
                            {COUNTRY_CODES.map((c, i) => (
                              <option key={i} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="tel"
                          className={`flex-1 bg-brand-dark border ${errors.phone ? 'border-red-500/50' : 'border-white/10 focus:border-brand-primary'} rounded-md p-4 text-lg text-white focus:outline-none transition-colors`}
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={e => handleChange('phone', e.target.value)}
                          autoFocus={step === 3}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        Biggest Growth Bottleneck <span className="text-brand-primary">*</span>
                      </label>
                      <textarea
                        rows={3}
                        className={`w-full bg-brand-dark border ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-brand-primary'} rounded-md p-4 text-base text-white focus:outline-none transition-colors resize-none`}
                        placeholder="e.g. Low lead quality..."
                        value={formData.message}
                        onChange={e => handleChange('message', e.target.value)}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex gap-4">
                    {step > 1 && (
                      <button
                        onClick={handleBack}
                        className="px-6 py-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors font-bold"
                      >
                        Back
                      </button>
                    )}

                    {step < totalSteps ? (
                      <Button
                        fullWidth={step === 1}
                        onClick={handleNext}
                        className="rounded-full py-4 text-md font-bold shadow-xl flex-grow"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="rounded-full py-4 text-md font-bold shadow-xl animate-button-glow"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Book Free Strategy Call"
                        )}
                      </Button>
                    )}
                  </div>

                </form>
              </>
            ) : (
              /* Success Message (Same as before) */
              <div className="animate-fade-in-up relative z-10 py-8 flex flex-col justify-center h-full">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-6 border border-brand-primary/20 mx-auto">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2 text-center">Request Received.</h3>
                <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest mb-8 text-center">AI Preliminary Analysis</p>

                <div className="bg-brand-dark/50 border border-white/10 p-6 rounded-xl mb-8 relative">
                  <div className="absolute -left-[1px] top-6 bottom-6 w-1 bg-brand-primary rounded-r-full"></div>
                  <p className="text-neutral-300 italic leading-relaxed text-lg">
                    "{aiResponse}"
                  </p>
                </div>

                <div className="flex items-center justify-center text-center text-neutral-500 text-sm">
                  <p>Check your email for confirmation.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Contact;
