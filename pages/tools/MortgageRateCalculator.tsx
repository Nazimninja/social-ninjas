import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Calculator, 
  Percent, 
  Building, 
  Sparkles 
} from 'lucide-react';
import SEO from '../../components/SEO';
import SpotlightCard from '../../components/SpotlightCard';
import AuroraBackground from '../../components/AuroraBackground';

const FAQS = [
  {
    q: "How is my monthly mortgage payment calculated?",
    a: "Your monthly housing payment consists of Principal and Interest (P&I) calculated using standard amortization, plus one-twelfth of your annual property taxes, homeowners insurance, and any applicable private mortgage insurance (PMI) or HOA dues."
  },
  {
    q: "What is PMI and when do I pay it?",
    a: "Private Mortgage Insurance (PMI) is required by conventional lenders whenever your down payment is less than 20% of the home's purchase price. It protects the lender and typically costs 0.5% to 1.5% of the loan amount annually until you reach 20% equity."
  },
  {
    q: "How does a bigger down payment change my payment?",
    a: "A larger down payment reduces your loan principal (lowering monthly interest and principal charges) and eliminates private mortgage insurance (PMI) once your down payment reaches at least 20%."
  },
  {
    q: "Should I choose a 15-year or 30-year mortgage?",
    a: "A 30-year loan offers lower monthly payments for maximum cash-flow flexibility, while a 15-year loan features slightly lower interest rates and saves tens of thousands in lifetime interest at the cost of higher required monthly payments."
  }
];

export const MortgageRateCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('4800'); // Annual
  const [homeInsurance, setHomeInsurance] = useState('1200'); // Annual
  const [hoaFees, setHoaFees] = useState('0'); // Monthly
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const price = parseFloat(homePrice) || 0;
  const down = parseFloat(downPayment) || 0;
  const principal = Math.max(0, price - down);
  const rate = parseFloat(interestRate) || 0;
  const years = parseInt(loanTerm, 10) || 30;
  const n = years * 12; // total monthly payments
  const monthlyRate = rate > 0 ? (rate / 100) / 12 : 0;

  // Monthly Principal & Interest: M = P * [ r(1+r)^n ] / [ (1+r)^n – 1]
  let monthlyPI = 0;
  if (monthlyRate > 0 && n > 0 && principal > 0) {
    const factor = Math.pow(1 + monthlyRate, n);
    monthlyPI = principal * ((monthlyRate * factor) / (factor - 1));
  } else if (n > 0) {
    monthlyPI = principal / n;
  }

  // Monthly escrow items
  const monthlyTax = (parseFloat(propertyTax) || 0) / 12;
  const monthlyInsurance = (parseFloat(homeInsurance) || 0) / 12;
  const monthlyHoa = parseFloat(hoaFees) || 0;

  // PMI: if down payment is < 20% of home price, assume ~0.75% of loan balance annually
  const downPct = price > 0 ? (down / price) * 100 : 0;
  const monthlyPmi = (downPct < 20 && principal > 0) ? (principal * 0.0075) / 12 : 0;

  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa;
  const totalLifetimeInterest = Math.max(0, (monthlyPI * n) - principal);
  const totalLoanCost = principal + totalLifetimeInterest;

  const fmt = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const handlePriceChange = (val: string) => {
    setHomePrice(val);
    const p = parseFloat(val) || 0;
    // maintain 20% down payment as smart default
    setDownPayment(String(Math.round(p * 0.2)));
    setPropertyTax(String(Math.round(p * 0.012))); // 1.2% national average
  };

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen">
      <SEO
        title="Mortgage Payment Calculator with Taxes & Insurance"
        description="Estimate your monthly mortgage payment including principal, interest, property taxes, home insurance, and PMI. Free 15-year and 30-year amortization tool."
        canonical="https://socialninjas.in/tools/mortgage-rate-calculator"
        faq={FAQS}
      />

      {/* HERO SECTION */}
      <AuroraBackground className="pt-32 pb-14 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Home size={13} className="text-[#38bdf8]" />
            <span>ALL-IN PITI HOUSING ESTIMATOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Mortgage Payment Calculator with Taxes &amp; Insurance
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Calculate your true monthly housing payment including principal, interest, property taxes, homeowners insurance, and PMI across 15 and 30-year terms.
          </p>
        </div>
      </AuroraBackground>

      {/* MAIN CONTAINER (Strict 1140px alignment) */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* INTERACTIVE TOOL CARD */}
        <SpotlightCard className="p-6 sm:p-10 bg-[#0e121d] border border-neutral-800/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Home Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-neutral-500 font-bold">$</span>
                    <input
                      type="number"
                      value={homePrice}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="400000"
                      className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Down Payment ({downPct.toFixed(0)}%)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-neutral-500 font-bold">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="80000"
                      className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Loan Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full bg-[#121724] border border-neutral-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option value="30">30 Years Fixed</option>
                    <option value="20">20 Years Fixed</option>
                    <option value="15">15 Years Fixed</option>
                    <option value="10">10 Years Fixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Interest Rate (% APR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      step="0.05"
                      placeholder="6.5"
                      className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-4 pr-8 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                    />
                    <span className="absolute right-3.5 top-3.5 text-neutral-500 font-bold">%</span>
                  </div>
                </div>
              </div>

              {/* Escrow Taxes & Insurance */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Taxes, Insurance &amp; HOA Dues
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Property Tax (Annual)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">$</span>
                      <input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(e.target.value)}
                        placeholder="4800"
                        className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Home Insurance (Annual)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">$</span>
                      <input
                        type="number"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(e.target.value)}
                        placeholder="1200"
                        className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">HOA Fee (Monthly)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">$</span>
                      <input
                        type="number"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(e.target.value)}
                        placeholder="0"
                        className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Output & Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#121724] border border-neutral-800 rounded-2xl p-6">
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    Estimated Total Monthly Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {fmt(totalMonthly)}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {loanTerm}-Year Fixed Loan of {fmt(principal)} at {rate}%
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2 pt-3 border-t border-neutral-800 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-800/50">
                    <span className="text-neutral-400">Principal &amp; Interest</span>
                    <span className="font-bold text-white font-mono">{fmt(monthlyPI)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/50">
                    <span className="text-neutral-400">Property Taxes</span>
                    <span className="text-neutral-300 font-mono">{fmt(monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/50">
                    <span className="text-neutral-400">Homeowners Insurance</span>
                    <span className="text-neutral-300 font-mono">{fmt(monthlyInsurance)}</span>
                  </div>
                  {monthlyPmi > 0 && (
                    <div className="flex justify-between py-1 border-b border-neutral-800/50 text-[#f59e0b]">
                      <span>PMI (&lt; 20% down payment)</span>
                      <span className="font-bold font-mono">+{fmt(monthlyPmi)}</span>
                    </div>
                  )}
                  {monthlyHoa > 0 && (
                    <div className="flex justify-between py-1 border-b border-neutral-800/50">
                      <span className="text-neutral-400">HOA Dues</span>
                      <span className="text-neutral-300 font-mono">+{fmt(monthlyHoa)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 pt-2 font-bold text-white">
                    <span>Lifetime Interest Paid</span>
                    <span className="text-[#38bdf8] font-mono">{fmt(totalLifetimeInterest)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#22c55e]" /> Standard PITI Math
                </span>
                <span>Estimate Only</span>
              </div>
            </div>

          </div>
        </SpotlightCard>

        {/* ── SUPPORTING COPY SECTION (~300-500 words per spec) ── */}
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              What Does This Mortgage Payment Calculator Estimate?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Most online mortgage tools only calculate <strong>Principal &amp; Interest (P&amp;I)</strong>, leading buyers to severely underestimate their true housing overhead. Our calculator estimates your complete <strong>PITI</strong> payment: the principal and interest on your loan, plus monthly escrow allocations for annual municipal property taxes, homeowners hazard insurance, Private Mortgage Insurance (PMI), and mandatory HOA fees. Understanding your full PITI payment prevents budget surprises during the formal loan underwriting process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              How to Use This Mortgage Calculator (4 Steps)
            </h2>
            <div className="space-y-3">
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Enter Target Home Price &amp; Down Payment</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Input your target property purchase price and the total cash you plan to put down at closing.</p>
                </div>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Select Loan Term and Interest Rate</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Choose your loan duration (e.g. 15-year or 30-year fixed) and input current market mortgage interest rates.</p>
                </div>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Adjust Taxes, Insurance &amp; HOA Dues</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Customize your local county property tax rate and annual insurance premium for precise escrow budgeting.</p>
                </div>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Review Total Monthly Housing Payment</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">View your exact PITI monthly housing cost and review total amortized interest over the lifespan of the loan.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              What Factors Affect Your Monthly Mortgage Payment?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-300">
              <div className="bg-[#0e121d] p-4 rounded-xl border border-neutral-800/80 space-y-1">
                <h3 className="font-bold text-white">Mortgage Interest Rate</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">Even a 0.5% rate change alters your monthly payment by hundreds of dollars and shifts tens of thousands in lifetime interest.</p>
              </div>
              <div className="bg-[#0e121d] p-4 rounded-xl border border-neutral-800/80 space-y-1">
                <h3 className="font-bold text-white">Down Payment &amp; PMI</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">Putting down less than 20% triggers Private Mortgage Insurance (PMI), adding an extra $100-$300 to your monthly bill.</p>
              </div>
              <div className="bg-[#0e121d] p-4 rounded-xl border border-neutral-800/80 space-y-1">
                <h3 className="font-bold text-white">Local Property Taxes</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">County assessment rates vary significantly across states, ranging from under 0.5% in Hawaii to over 2.2% in New Jersey.</p>
              </div>
              <div className="bg-[#0e121d] p-4 rounded-xl border border-neutral-800/80 space-y-1">
                <h3 className="font-bold text-white">Homeowners Insurance</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">Lenders mandate hazard insurance to protect the property collateral against storm, fire, and structural damage.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              15-Year vs. 30-Year Mortgage: The Strategic Trade-Off
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Choosing between a 15-year and a 30-year fixed mortgage is a fundamental cash-flow decision. A <strong>30-year mortgage</strong> spreads principal repayment across 360 payments, keeping mandatory monthly obligations low and giving homeowners maximum monthly flexibility for investments, emergency reserves, and lifestyle expenses. In contrast, a <strong>15-year mortgage</strong> carries significantly higher monthly payments but typically features lower interest rates, allowing homeowners to build equity twice as fast and save $100,000+ in total interest over the life of the loan.
            </p>
            <p className="text-xs text-neutral-500 italic pt-1">
              <strong>Disclaimer:</strong> This calculator provides mathematical estimates for budgeting and scenario planning only. It does not represent an official Loan Estimate or a commitment to lend from any financial institution.
            </p>
          </div>

          {/* ── VISIBLE FAQ SECTION ── */}
          <div className="pt-6 border-t border-neutral-800">
            <div className="text-center mb-8">
              <span className="px-3.5 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold uppercase rounded-full tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Mortgage Payment Questions Answered
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0e121d] border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-[#38bdf8] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA BLOCK (Strict requirement 4) ── */}
          <SpotlightCard className="p-8 sm:p-10 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-[#38bdf8]/30 text-center space-y-4 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Need More Than a Calculator?
            </h2>
            <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Social Ninja's builds AI growth systems for brands — from automated inbound lead routing to high-ROAS Meta and Google media buying.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg flex items-center gap-1.5"
              >
                Book Strategy Session <ArrowRight size={14} />
              </Link>
              <Link
                to="/services"
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs transition-all"
              >
                Explore Growth Services
              </Link>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </div>
  );
};

export default MortgageRateCalculator;
