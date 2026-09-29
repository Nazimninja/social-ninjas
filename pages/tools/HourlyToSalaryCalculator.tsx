import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Calculator, 
  TrendingUp, 
  Table, 
  Sparkles 
} from 'lucide-react';
import SEO from '../../components/SEO';
import SpotlightCard from '../../components/SpotlightCard';
import AuroraBackground from '../../components/AuroraBackground';

const REFERENCE_RATES = [
  { hourly: 15, annual: 31200, monthly: 2600, biweekly: 1200, weekly: 600 },
  { hourly: 20, annual: 41600, monthly: 3467, biweekly: 1600, weekly: 800 },
  { hourly: 25, annual: 52000, monthly: 4333, biweekly: 2000, weekly: 1000 },
  { hourly: 30, annual: 62400, monthly: 5200, biweekly: 2400, weekly: 1200 },
  { hourly: 40, annual: 83200, monthly: 6933, biweekly: 3200, weekly: 1600 },
  { hourly: 50, annual: 104000, monthly: 8667, biweekly: 4000, weekly: 2000 },
];

const FAQS = [
  {
    q: "How do you convert hourly wage to annual salary?",
    a: "Multiply your hourly wage by the number of hours worked per week, then multiply by 52 (weeks in a year). For a standard 40-hour full-time schedule, multiply your hourly wage directly by 2,080 hours."
  },
  {
    q: "What is $25 an hour annually?",
    a: "Working 40 hours per week, $25 an hour equals $52,000 per year before taxes, which breaks down to $4,333 per month, $2,000 bi-weekly, or $1,000 per week."
  },
  {
    q: "Does the calculator include overtime?",
    a: "Yes. You can toggle the overtime feature to calculate hours worked beyond 40 hours per week at the standard 1.5× time-and-a-half overtime rate."
  },
  {
    q: "Is 40 hours a week assumed?",
    a: "Yes, 40 hours per week across 52 weeks is the standard full-time baseline, but you can adjust your weekly hours to match any part-time, seasonal, or overtime schedule."
  }
];

export const HourlyToSalaryCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [includeOvertime, setIncludeOvertime] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState('5');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const wage = parseFloat(hourlyRate) || 0;
  const hours = parseFloat(hoursPerWeek) || 0;
  const otHours = includeOvertime ? (parseFloat(overtimeHours) || 0) : 0;
  const weeks = parseFloat(weeksPerYear) || 52;

  // Math: base regular pay + overtime pay (1.5x)
  const regularWeekly = wage * hours;
  const overtimeWeekly = otHours * (wage * 1.5);
  const totalWeekly = regularWeekly + overtimeWeekly;

  const annualSalary = totalWeekly * weeks;
  const monthlySalary = annualSalary / 12;
  const biweeklySalary = annualSalary / 26;
  const dailySalary = totalWeekly / 5;

  const fmt = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen">
      <SEO
        title="Hourly to Salary Calculator | Convert Wage to Annual Pay"
        description="Convert your hourly rate to annual, monthly, and weekly salary. Includes overtime toggle, tax reference tables, and standard 40-hour work week math."
        canonical="https://socialninjas.in/tools/hourly-to-salary-calculator"
        faq={FAQS}
      />

      {/* HERO SECTION */}
      <AuroraBackground className="pt-32 pb-14 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Clock size={13} className="text-[#38bdf8]" />
            <span>WAGE CONVERSION &amp; PAYROLL UTILITY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Hourly to Salary Calculator
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Convert any hourly wage to its exact annual, monthly, bi-weekly, and weekly equivalent with optional overtime and workweek settings.
          </p>
        </div>
      </AuroraBackground>

      {/* MAIN CONTAINER (Strict 1140px alignment) */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* INTERACTIVE TOOL CARD */}
        <SpotlightCard className="p-6 sm:p-10 bg-[#0e121d] border border-neutral-800/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Hourly Wage ($ / Hour)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-neutral-500 font-bold">$</span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="25"
                      step="0.5"
                      className="w-full bg-[#121724] border border-neutral-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Hours Worked Per Week
                  </label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    placeholder="40"
                    className="w-full bg-[#121724] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              {/* Overtime Toggle */}
              <div className="bg-[#121724] border border-neutral-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Include Overtime (1.5x Pay)</span>
                    <span className="text-[11px] text-neutral-400">Calculate time-and-a-half beyond standard hours</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeOvertime}
                    onChange={(e) => setIncludeOvertime(e.target.checked)}
                    className="w-4 h-4 rounded text-[#38bdf8] bg-neutral-900 border-neutral-700 cursor-pointer"
                  />
                </div>

                {includeOvertime && (
                  <div className="pt-2 border-t border-neutral-800 flex items-center gap-3">
                    <label className="text-xs text-neutral-400">Overtime hours per week:</label>
                    <input
                      type="number"
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                      placeholder="5"
                      className="w-24 bg-[#0e121d] border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                    />
                    <span className="text-xs text-[#22c55e] font-semibold">
                      at {fmt(wage * 1.5)}/hr
                    </span>
                  </div>
                )}
              </div>

              {/* Weeks Worked */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Weeks Worked Per Year
                </label>
                <select
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full bg-[#121724] border border-neutral-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                >
                  <option value="52">52 Weeks (Full year with paid time off)</option>
                  <option value="50">50 Weeks (2 weeks unpaid vacation)</option>
                  <option value="48">48 Weeks (4 weeks unpaid time off)</option>
                </select>
              </div>

              {/* Quick Jump Buttons */}
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-2">Popular wage conversions:</span>
                <div className="flex flex-wrap gap-2">
                  {['15', '20', '25', '30', '35', '40', '50'].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setHourlyRate(rate)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-colors ${hourlyRate === rate ? 'bg-[#38bdf8] text-[#07090e] border-[#38bdf8] font-bold' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'}`}
                    >
                      ${rate}/hr
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output & Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#121724] border border-neutral-800 rounded-2xl p-6">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    Gross Annual Equivalent
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {fmt(annualSalary)}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Based on {hours} regular hrs/wk ({weeks} weeks/yr)
                  </div>
                </div>

                {/* Breakdown Grid */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Monthly Equivalent</span>
                    <span className="font-bold text-white font-mono">{fmt(monthlySalary)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Bi-Weekly Paycheck</span>
                    <span className="font-bold text-white font-mono">{fmt(biweeklySalary)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Weekly Pay</span>
                    <span className="font-bold text-white font-mono">{fmt(totalWeekly)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Daily Pay (8-hr day)</span>
                    <span className="font-bold text-white font-mono">{fmt(dailySalary)}</span>
                  </div>
                  {includeOvertime && otHours > 0 && (
                    <div className="flex justify-between py-1.5 border-b border-neutral-800/60 text-[#22c55e]">
                      <span>Overtime Premium Included</span>
                      <span className="font-bold font-mono">+{fmt(overtimeWeekly * weeks)}/yr</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#22c55e]" /> Standard FLSA Formula
                </span>
                <span>Instant Calculation</span>
              </div>
            </div>

          </div>
        </SpotlightCard>

        {/* ── SUPPORTING COPY SECTION (~300-500 words per spec) ── */}
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Conversion Math: How to Calculate Hourly Pay into Annual Salary
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Converting an hourly wage to an annual salary is calculated using a standard equation: <strong>Hourly Wage × Hours Worked Per Week × 52 Weeks = Gross Annual Salary</strong>. For a traditional full-time employee in the United States working 40 hours per week, the baseline multiplier is exactly <strong>2,080 working hours per year</strong> (40 hours × 52 weeks). For example, earning $25 an hour results in $25 × 2,080 = $52,000 per year before taxes. This baseline provides an accurate reference when comparing hourly contractor rates against salaried corporate positions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              How to Use the Hourly-to-Salary Calculator
            </h2>
            <div className="space-y-3">
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Enter Your Base Wage</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Input your agreed hourly rate in dollars.</p>
                </div>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Adjust Workweek Hours</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Set your standard hours per week (default is 40 full-time hours).</p>
                </div>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h3 className="font-bold text-white text-sm">Toggle Overtime &amp; Weeks Worked</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Account for time-and-a-half (1.5x) overtime hours and any unpaid vacation time to see your realistic gross income.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── REFERENCE TABLE (SPEC REQUIREMENT C) ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Hourly to Annual Salary Reference Table
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              *Assumptions: Based on standard 40 hours per week and 52 weeks per year without overtime or unpaid leave.
            </p>

            <div className="overflow-x-auto bg-[#0e121d] border border-neutral-800 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase text-[11px] bg-neutral-900/60">
                    <th className="py-3 px-4">Hourly Rate</th>
                    <th className="py-3 px-4">Weekly Pay</th>
                    <th className="py-3 px-4">Bi-Weekly Pay</th>
                    <th className="py-3 px-4">Monthly Pay</th>
                    <th className="py-3 px-4 text-[#38bdf8]">Annual Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-mono">
                  {REFERENCE_RATES.map((row) => (
                    <tr key={row.hourly} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">${row.hourly} / hr</td>
                      <td className="py-3 px-4 text-neutral-300">{fmt(row.weekly)}</td>
                      <td className="py-3 px-4 text-neutral-300">{fmt(row.biweekly)}</td>
                      <td className="py-3 px-4 text-neutral-300">{fmt(row.monthly)}</td>
                      <td className="py-3 px-4 font-bold text-[#38bdf8]">{fmt(row.annual)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Overtime, Unpaid Leave &amp; Tax Considerations
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              When transitioning from hourly work to an annual salary, consider factors that impact take-home cash. Hourly non-exempt workers receive 1.5× time-and-a-half pay for hours worked over 40 under the Fair Labor Standards Act (FLSA), whereas exempt salaried employees do not receive extra pay for long weeks. Conversely, taking unpaid time off or unpaid sick days quickly reduces an hourly worker’s effective annual earnings, while salaried employees typically receive stable compensation regardless of brief schedule fluctuations.
            </p>
          </div>

          {/* ── VISIBLE FAQ SECTION ── */}
          <div className="pt-6 border-t border-neutral-800">
            <div className="text-center mb-8">
              <span className="px-3.5 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold uppercase rounded-full tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Hourly to Salary Questions Answered
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

export default HourlyToSalaryCalculator;
