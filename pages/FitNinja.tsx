import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, Sparkles, Check, ArrowRight, Zap, Shield, Lock, UserCheck, RefreshCw, Smartphone, CreditCard } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';

const FIT_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly Fitness Pass',
    priceINR: '₹1,499',
    period: '/month',
    desc: 'Complete AI fitness coaching, custom meal plans, and home/gym workout tracking.',
    color: '#ef4444',
    features: [
      'Personalized AI Diet & Macro Plan',
      'Custom Home or Gym Workout Split',
      '24/7 AI Fitness Coach Support',
      'Weekly Progress & Weight Tracker',
      'Recipe & Meal Swap Suggestions',
    ]
  },
  {
    id: 'pro-coaching',
    name: 'Pro AI Coaching Pass',
    priceINR: '₹3,999',
    period: '/quarterly',
    popular: true,
    desc: 'Full 90-day body transformation with priority AI coach access and workout routines.',
    color: '#f97316',
    features: [
      'Everything in Monthly Pass',
      '90-Day Full Body Transformation Plan',
      'Supplements & Nutrient Timing Guide',
      'Custom Calorie Deficit / Surplus Math',
      'Priority AI Coach Response Time',
    ]
  }
];

export const FitNinja: React.FC = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(FIT_PLANS[0]);
  
  // Sign-in state for existing paid users
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  // Signup / Payment state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('Fat Loss & Lean Muscle');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSignedInUser(emailInput);
    setShowSignInModal(false);
  };

  const handlePayment = (isTestPass = false) => {
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      setIsPaidSuccess(true);
      setSignedInUser(userEmail || 'member@fit.socialninjas.in');
    }, 1000);
  };

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen font-sans">
      <SEO
        title="Fit Ninja — AI Fitness Coach & Diet Planner | Social Ninja's"
        description="Fit Ninja is your personalized AI fitness coach and diet planner. Get custom diet plans, workout splits, and 24/7 fitness guidance."
      />

      {/* TOP ACCESS BAR */}
      <nav className="border-b border-neutral-800/80 bg-[#0c0f17]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-900/30">
              <Dumbbell size={20} />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight font-['Bricolage_Grotesque'] text-white">FIT NINJA</span>
              <span className="text-[10px] ml-2 font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 uppercase">AI COACH</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {signedInUser ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
                <UserCheck size={14} /> Member: {signedInUser}
              </div>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Lock size={13} className="text-amber-400" /> Sign In (Paid Customer)
              </button>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('pricing-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-red-950/40"
            >
              Get Access Now →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Flame size={14} /> YOUR PERSONALIZED AI FITNESS COACH
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 font-['Bricolage_Grotesque']">
          Custom Diet & Workout Plans <br />
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Powered by AI Coaching.
          </span>
        </h1>

        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          Get calorie & macro targets, structured home/gym workout splits, and 24/7 AI coaching tailored to your exact body goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              const el = document.getElementById('pricing-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-red-950/50 hover:scale-105 transition-all text-sm flex items-center justify-center gap-2"
          >
            <Zap size={18} /> Join Fit Ninja & Get Your Diet Plan
          </button>
          <button
            onClick={() => setShowSignInModal(true)}
            className="w-full sm:w-auto bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold px-8 py-4 rounded-full hover:border-neutral-700 transition-all text-sm"
          >
            Already Paid? Sign In →
          </button>
        </div>
      </section>

      {/* PRICING & ACCESS PLANS */}
      <section id="pricing-section" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-['Bricolage_Grotesque'] mb-2">Select Your Fit Ninja Pass</h2>
          <p className="text-neutral-400 text-sm">Choose a plan to get instant access to your AI fitness dashboard & coaching console.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FIT_PLANS.map((plan) => (
            <SpotlightCard
              key={plan.id}
              className={`p-8 bg-[#0e121d] border rounded-3xl space-y-6 relative ${
                plan.popular ? 'border-orange-500/50 shadow-2xl shadow-orange-950/20' : 'border-neutral-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  🔥 Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.priceINR}</span>
                <span className="text-xs text-neutral-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-neutral-800/80">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPayModal(true);
                }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-950/40 hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2"
              >
                Get Instant Access →
              </button>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* SIGN IN MODAL FOR PAID CUSTOMERS */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3">
                <Lock size={22} />
              </div>
              <h3 className="text-xl font-bold font-['Bricolage_Grotesque']">Sign In to Fit Ninja</h3>
              <p className="text-xs text-neutral-400 mt-1">Enter your registered email to access your AI fitness console.</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Registered Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="e.g. alex@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm"
              >
                Sign In to Member Dashboard →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT / PAYMENT MODAL */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm"
            >
              ✕
            </button>

            {!isPaidSuccess ? (
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3">
                    <CreditCard size={22} />
                  </div>
                  <h3 className="text-xl font-bold font-['Bricolage_Grotesque']">Complete Fit Ninja Access</h3>
                  <p className="text-xs text-neutral-400 mt-1">{selectedPlan.name} ({selectedPlan.priceINR})</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Primary Fitness Goal</label>
                    <select
                      value={fitnessGoal}
                      onChange={e => setFitnessGoal(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                    >
                      <option value="Fat Loss & Lean Muscle">Fat Loss & Lean Muscle</option>
                      <option value="Bulking & Muscle Mass">Bulking & Muscle Mass</option>
                      <option value="Home Fitness & Toning">Home Fitness & Toning</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePayment(false)}
                    disabled={isProcessingPay}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    {isProcessingPay ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                    {isProcessingPay ? 'Processing Payment...' : `Pay ${selectedPlan.priceINR} & Activate Access`}
                  </button>

                  {/* QA Instant Test Pass Button */}
                  <button
                    onClick={() => handlePayment(true)}
                    className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold py-2.5 rounded-xl hover:bg-amber-500/20 transition-all"
                  >
                    ⚡ Instant Test Pass (FIT_TEST_2026)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <h3 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-white">Access Activated! 🎉</h3>
                <p className="text-xs text-neutral-400">Your Fit Ninja membership has been activated for {signedInUser}.</p>
                <button
                  onClick={() => setShowPayModal(false)}
                  className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg hover:opacity-90 transition-all"
                >
                  Enter Fit Ninja Dashboard →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FitNinja;
