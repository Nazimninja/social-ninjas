import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Calculator, ArrowRight, ArrowLeft, Copy, Check,
  DollarSign, Home, Clock, Zap, ExternalLink, ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';

// ─── WhatsApp Link Generator ────────────────────────────────────────────────
const WhatsAppTool: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const clean = phone.replace(/\D/g, '');
    const url = `https://wa.me/${countryCode}${clean}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    setLink(url);
  };

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Country Code</label>
          <select
            value={countryCode}
            onChange={e => setCountryCode(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99]"
          >
            <option value="91">🇮🇳 +91 India</option>
            <option value="1">🇺🇸 +1 USA/Canada</option>
            <option value="44">🇬🇧 +44 UK</option>
            <option value="971">🇦🇪 +971 UAE</option>
            <option value="65">🇸🇬 +65 Singapore</option>
            <option value="61">🇦🇺 +61 Australia</option>
            <option value="27">🇿🇦 +27 South Africa</option>
            <option value="234">🇳🇬 +234 Nigeria</option>
          </select>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Phone Number</label>
          <input
            type="tel"
            placeholder="9876543210"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pre-filled Message (Optional)</label>
        <textarea
          placeholder="Hi! I'm interested in learning more about your services."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600 resize-none"
        />
      </div>
      <button
        onClick={generate}
        className="w-full py-3.5 bg-[#1F4B99] hover:bg-[#2558b5] text-white font-bold text-sm rounded-xl transition-colors duration-200"
      >
        Generate WhatsApp Link
      </button>

      {link && (
        <div className="space-y-3 p-5 bg-[#07090e] border border-[#3ba213]/30 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3ba213] uppercase tracking-wider">
            <Check size={14} /> Link Generated!
          </div>
          <div className="text-xs text-neutral-400 break-all font-mono bg-neutral-900/50 p-3 rounded-lg">{link}</div>
          <div className="flex gap-3">
            <button
              onClick={copy}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${copied ? 'bg-[#3ba213]/20 text-[#3ba213] border border-[#3ba213]/30' : 'bg-[#1F4B99]/20 text-[#4281f5] border border-[#1F4B99]/30 hover:bg-[#1F4B99]/30'}`}
            >
              {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Link</>}
            </button>
            <a href={link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#3ba213]/15 text-[#3ba213] border border-[#3ba213]/25 hover:bg-[#3ba213]/25 transition-colors"
            >
              <ExternalLink size={13} /> Test Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Hourly ↔ Annual Salary Converter ───────────────────────────────────────
const HourlyAnnualTool: React.FC = () => {
  const [mode, setMode] = useState<'hourlyToAnnual' | 'annualToHourly'>('hourlyToAnnual');
  const [hourly, setHourly] = useState('');
  const [annual, setAnnual] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  const calcFromHourly = () => {
    const h = parseFloat(hourly);
    const hrs = parseFloat(hoursPerWeek) || 40;
    if (isNaN(h)) return null;
    return { annual: h * hrs * 52, monthly: h * hrs * 52 / 12, biweekly: h * hrs * 2, weekly: h * hrs, daily: h * 8 };
  };

  const calcFromAnnual = () => {
    const a = parseFloat(annual);
    const hrs = parseFloat(hoursPerWeek) || 40;
    if (isNaN(a)) return null;
    return { hourly: a / 52 / hrs, monthly: a / 12, biweekly: a / 26, weekly: a / 52, daily: a / 260 };
  };

  const resultH = mode === 'hourlyToAnnual' ? calcFromHourly() : null;
  const resultA = mode === 'annualToHourly' ? calcFromAnnual() : null;

  return (
    <div className="space-y-6">
      <div className="flex rounded-xl overflow-hidden border border-neutral-800">
        {(['hourlyToAnnual', 'annualToHourly'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors ${mode === m ? 'bg-[#1F4B99] text-white' : 'bg-[#07090e] text-neutral-500 hover:text-neutral-300'}`}
          >
            {m === 'hourlyToAnnual' ? 'Hourly → Annual' : 'Annual → Hourly'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === 'hourlyToAnnual' ? (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Hourly Rate (₹ or $)</label>
            <input type="number" placeholder="e.g. 500" value={hourly} onChange={e => setHourly(e.target.value)}
              className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600" />
          </div>
        ) : (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Annual Salary (₹ or $)</label>
            <input type="number" placeholder="e.g. 1200000" value={annual} onChange={e => setAnnual(e.target.value)}
              className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600" />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Hours Per Week</label>
          <input type="number" placeholder="40" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600" />
        </div>
      </div>

      {resultH && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Annual', val: resultH.annual },
            { label: 'Monthly', val: resultH.monthly },
            { label: 'Bi-Weekly', val: resultH.biweekly },
            { label: 'Weekly', val: resultH.weekly },
            { label: 'Daily (8h)', val: resultH.daily },
          ].map((r, i) => (
            <div key={i} className="p-4 bg-[#07090e] border border-neutral-800 rounded-xl">
              <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-1">{r.label}</p>
              <p className="text-lg font-black text-white">{fmt(r.val)}</p>
            </div>
          ))}
        </div>
      )}
      {resultA && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Hourly Rate', val: resultA.hourly },
            { label: 'Monthly', val: resultA.monthly },
            { label: 'Bi-Weekly', val: resultA.biweekly },
            { label: 'Weekly', val: resultA.weekly },
            { label: 'Daily (8h)', val: resultA.daily },
          ].map((r, i) => (
            <div key={i} className="p-4 bg-[#07090e] border border-neutral-800 rounded-xl">
              <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-1">{r.label}</p>
              <p className="text-lg font-black text-white">{fmt(r.val)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Mortgage Calculator ─────────────────────────────────────────────────────
const MortgageTool: React.FC = () => {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('30');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(price) - parseFloat(down || '0');
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0) return;
    const M = r === 0 ? P / n : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly: M, total: M * n, interest: M * n - P, principal: P });
  };

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Home Price ($)', val: price, set: setPrice, ph: '500000' },
          { label: 'Down Payment ($)', val: down, set: setDown, ph: '100000' },
          { label: 'Annual Interest Rate (%)', val: rate, set: setRate, ph: '7.5' },
        ].map((f, i) => (
          <div key={i} className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{f.label}</label>
            <input type="number" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)}
              className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600" />
          </div>
        ))}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Loan Term</label>
          <select value={term} onChange={e => setTerm(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99]">
            <option value="30">30 Years</option>
            <option value="20">20 Years</option>
            <option value="15">15 Years</option>
            <option value="10">10 Years</option>
          </select>
        </div>
      </div>
      <button onClick={calculate}
        className="w-full py-3.5 bg-[#1F4B99] hover:bg-[#2558b5] text-white font-bold text-sm rounded-xl transition-colors duration-200">
        Calculate Monthly Payment
      </button>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Monthly Payment', val: fmt(result.monthly), accent: true },
            { label: 'Total Payment', val: fmt(result.total), accent: false },
            { label: 'Total Interest', val: fmt(result.interest), accent: false },
            { label: 'Loan Amount', val: fmt(result.principal), accent: false },
          ].map((r, i) => (
            <div key={i} className={`p-4 rounded-xl border ${r.accent ? 'bg-[#1F4B99]/15 border-[#1F4B99]/30' : 'bg-[#07090e] border-neutral-800'}`}>
              <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-1">{r.label}</p>
              <p className={`text-lg font-black ${r.accent ? 'text-[#4281f5]' : 'text-white'}`}>{r.val}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── US Take-Home Pay Calculator ─────────────────────────────────────────────
const TakeHomeTool: React.FC = () => {
  const [salary, setSalary] = useState('');
  const [state, setState] = useState('CA');
  const [filing, setFiling] = useState('single');
  const [result, setResult] = useState<any>(null);

  // Simplified federal tax brackets 2024 (single)
  const federalTax = (income: number, status: string) => {
    const brackets = status === 'married'
      ? [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]
      : [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]];
    let tax = 0, prev = 0;
    for (const [limit, rate] of brackets as [number, number][]) {
      if (income <= prev) break;
      tax += (Math.min(income, limit) - prev) * rate;
      prev = limit;
    }
    return tax;
  };

  // Rough state tax rates
  const stateTaxRates: Record<string, number> = {
    CA: 0.093, TX: 0, FL: 0, NY: 0.0685, WA: 0, IL: 0.0495,
    PA: 0.0307, OH: 0.0399, GA: 0.055, NC: 0.0525, NJ: 0.0637,
    VA: 0.0575, AZ: 0.025, MA: 0.05, TN: 0, MN: 0.0698,
  };

  const calculate = () => {
    const gross = parseFloat(salary);
    if (isNaN(gross) || gross <= 0) return;
    const federal = federalTax(gross, filing);
    const fica = Math.min(gross, 168600) * 0.062 + gross * 0.0145;
    const stateRate = stateTaxRates[state] ?? 0.05;
    const stateTax = gross * stateRate;
    const total = federal + fica + stateTax;
    const net = gross - total;
    setResult({ gross, federal, fica, stateTax, total, net, effectiveRate: (total / gross) * 100 });
  };

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const states = ['CA', 'TX', 'FL', 'NY', 'WA', 'IL', 'PA', 'OH', 'GA', 'NC', 'NJ', 'VA', 'AZ', 'MA', 'TN', 'MN'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5 sm:col-span-3">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Annual Gross Salary ($)</label>
          <input type="number" placeholder="e.g. 120000" value={salary} onChange={e => setSalary(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99] placeholder:text-neutral-600" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">State</label>
          <select value={state} onChange={e => setState(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99]">
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Filing Status</label>
          <select value={filing} onChange={e => setFiling(e.target.value)}
            className="w-full bg-[#07090e] border border-neutral-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F4B99]">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>
      <button onClick={calculate}
        className="w-full py-3.5 bg-[#1F4B99] hover:bg-[#2558b5] text-white font-bold text-sm rounded-xl transition-colors duration-200">
        Calculate Take-Home Pay
      </button>

      {result && (
        <div className="space-y-3">
          <div className="p-5 bg-[#1F4B99]/15 border border-[#1F4B99]/30 rounded-xl">
            <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Annual Take-Home Pay</p>
            <p className="text-4xl font-black text-white">{fmt(result.net)}</p>
            <p className="text-sm text-neutral-400 mt-1">{fmt(result.net / 12)} / month · {fmt(result.net / 26)} / bi-weekly</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Federal Tax', val: fmt(result.federal) },
              { label: 'FICA (SS+Med)', val: fmt(result.fica) },
              { label: 'State Tax', val: fmt(result.stateTax) },
              { label: 'Effective Rate', val: result.effectiveRate.toFixed(1) + '%' },
            ].map((r, i) => (
              <div key={i} className="p-4 bg-[#07090e] border border-neutral-800 rounded-xl">
                <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-1">{r.label}</p>
                <p className="text-base font-black text-neutral-300">{r.val}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-neutral-600 text-center">Estimates only. Consult a tax professional for accurate calculations.</p>
        </div>
      )}
    </div>
  );
};

// ─── Tool definitions ────────────────────────────────────────────────────────
const TOOLS = [
  {
    id: 'whatsapp',
    Icon: MessageSquare,
    title: 'WhatsApp Link Generator',
    desc: 'Generate pre-filled instant WhatsApp chat links for ad campaigns, social media bios, and lead gen — in seconds.',
    badge: 'Free Marketing Tool',
    badgeColor: '#3ba213',
    Component: WhatsAppTool,
  },
  {
    id: 'salary',
    Icon: Clock,
    title: 'Hourly ↔ Annual Salary Converter',
    desc: 'Instantly convert hourly wages to annual, monthly, bi-weekly, and weekly earnings — or reverse from annual to hourly.',
    badge: 'Calculators',
    badgeColor: '#4281f5',
    Component: HourlyAnnualTool,
  },
  {
    id: 'mortgage',
    Icon: Home,
    title: 'Mortgage Payment Calculator',
    desc: 'Estimate monthly mortgage payments, total interest paid, and breakdown by loan term with any interest rate.',
    badge: 'Real Estate Tool',
    badgeColor: '#f59e0b',
    Component: MortgageTool,
  },
  {
    id: 'takehome',
    Icon: DollarSign,
    title: 'US Take-Home Pay Calculator',
    desc: 'Calculate net salary after federal, state, Social Security, and Medicare taxes across 16 US states.',
    badge: 'Financial Tool',
    badgeColor: '#a855f7',
    Component: TakeHomeTool,
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
const Tools: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTool = TOOLS.find(t => t.id === activeId);

  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Free Growth & Marketing Tools | Social Ninja's"
        description="Free WhatsApp link generator, salary calculators, mortgage calculator, and US take-home pay calculator built by Social Ninja's."
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            <Zap size={12} /> FREE GROWTH UTILITIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Free Marketing & <br />
            <span className="text-[#1F4B99]">Financial Calculators.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Free tools built by Social Ninja's to streamline lead capture, unit economics, and campaign planning. No sign-up. No cost.
          </p>
        </div>
      </AuroraBackground>

      {/* TOOL OPEN VIEW */}
      {activeTool ? (
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => setActiveId(null)}
            className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> All Tools
          </button>

          <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${activeTool.badgeColor}18`, border: `1px solid ${activeTool.badgeColor}30` }}
              >
                <activeTool.Icon size={22} style={{ color: activeTool.badgeColor }} />
              </div>
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{ background: `${activeTool.badgeColor}15`, color: activeTool.badgeColor, borderColor: `${activeTool.badgeColor}28` }}
                >
                  {activeTool.badge}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{activeTool.title}</h2>
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-6">
              <activeTool.Component />
            </div>
          </SpotlightCard>
        </section>
      ) : (
        /* TOOLS GRID */
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveId(tool.id)}
                className="text-left group w-full"
              >
                <SpotlightCard className="p-7 bg-[#0e121d] border border-neutral-800 space-y-5 hover:border-neutral-700 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${tool.badgeColor}18`, border: `1px solid ${tool.badgeColor}30` }}
                    >
                      <tool.Icon size={20} style={{ color: tool.badgeColor }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase px-3 py-1 rounded-full border"
                      style={{ background: `${tool.badgeColor}12`, color: tool.badgeColor, borderColor: `${tool.badgeColor}25` }}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#4281f5] transition-colors duration-200 leading-snug">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{tool.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold pt-1" style={{ color: tool.badgeColor }}>
                    Open Tool <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </SpotlightCard>
              </button>
            ))}
          </div>

          {/* Content Studio promo */}
          <div className="mt-12">
            <SpotlightCard className="p-8 sm:p-10 bg-gradient-to-br from-[#1F4B99]/20 via-[#0e121d] to-[#0e121d] border border-[#1F4B99]/25 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F4B99]/50 to-transparent" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#3ba213] uppercase tracking-widest">AI-Powered</div>
                  <h3 className="text-2xl font-black text-white">Content Studio</h3>
                  <p className="text-sm text-neutral-400 max-w-md">
                    Generate Instagram captions, ad copy, blog posts, email sequences, and more — powered by Social Ninja's AI engine.
                  </p>
                </div>
                <Link to="/app/content-studio" className="flex-shrink-0">
                  <button className="px-7 py-3.5 bg-[#1F4B99] hover:bg-[#2558b5] text-white font-bold text-sm rounded-xl transition-colors duration-200 whitespace-nowrap flex items-center gap-2">
                    Launch Content Studio <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tools;
