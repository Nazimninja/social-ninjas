import React, { useState, useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Sparkles, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ChevronDown,
  PhoneCall,
  Code
} from 'lucide-react';
import SEO from '../../components/SEO';
import SpotlightCard from '../../components/SpotlightCard';
import AuroraBackground from '../../components/AuroraBackground';

const COUNTRY_CODES = [
  { code: '91', name: 'India (+91)' },
  { code: '1', name: 'United States / Canada (+1)' },
  { code: '44', name: 'United Kingdom (+44)' },
  { code: '971', name: 'United Arab Emirates (+971)' },
  { code: '61', name: 'Australia (+61)' },
  { code: '65', name: 'Singapore (+65)' },
  { code: '49', name: 'Germany (+49)' },
  { code: '33', name: 'France (+33)' },
  { code: '966', name: 'Saudi Arabia (+966)' },
  { code: '974', name: 'Qatar (+974)' },
  { code: '60', name: 'Malaysia (+60)' },
  { code: '62', name: 'Indonesia (+62)' },
];

const QUICK_PROMPTS = [
  "Hi! I'd like to book a growth audit for my brand.",
  "Hi, I saw your website and want to learn more about your services.",
  "Hello, I'd like to schedule a 15-minute consultation call.",
  "Hi there! Can you share details on your pricing packages?"
];

const FAQS = [
  {
    q: "Is the WhatsApp link generator free?",
    a: "Yes, 100% free with no registration or hidden fees. You can generate unlimited wa.me direct-chat links and download QR codes instantly."
  },
  {
    q: "Do I need WhatsApp Business to use wa.me links?",
    a: "No. wa.me links work identically on standard personal WhatsApp accounts, WhatsApp Business, and WhatsApp Web."
  },
  {
    q: "How do I add a pre-filled message to my WhatsApp link?",
    a: "Type your desired text into the message box above. Our tool URL-encodes the text into the ?text= parameter automatically so it opens ready to send."
  },
  {
    q: "Where can I share my WhatsApp link?",
    a: "You can paste your link into your Instagram bio, TikTok profile, YouTube description, email signature, Google Business profile, or embed it behind website buttons."
  },
  {
    q: "Will my wa.me link work for international numbers?",
    a: "Yes. As long as you include the correct country code without leading plus signs or zeros, customers anywhere in the world can reach you instantly."
  }
];

export const WhatsAppLinkGenerator: React.FC = () => {
  const [countryCode, setCountryCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const location = useLocation();
  const isEmbed = new URLSearchParams(location.search).get('embed') === 'true';

  const embedSnippet = `<iframe src="https://socialninjas.in/tools/whatsapp-link-generator?embed=true" width="100%" height="700" frameborder="0" style="border-radius:16px;border:1px solid rgba(255,255,255,0.1);max-width:680px;width:100%;display:block;margin:0 auto;" title="Free WhatsApp Link Generator"></iframe>\n<p style="font-size:12px;color:#888888;text-align:center;margin-top:8px;">Free WhatsApp Link Generator powered by <a href="https://socialninjas.in/tools/whatsapp-link-generator" target="_blank" rel="noopener" style="color:#38bdf8;text-decoration:underline;">Social Ninja's</a></p>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedSnippet);
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  // Clean phone number: remove non-digits
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const fullPhone = cleanNumber ? `${countryCode}${cleanNumber}` : '';
  
  // Build wa.me URL
  const generatedUrl = fullPhone 
    ? `https://wa.me/${fullPhone}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`
    : '';

  // Quick QR code API via qrserver
  const qrCodeUrl = generatedUrl 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(generatedUrl)}&bgcolor=0e121d&color=38bdf8` 
    : '';

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isEmbed) {
    return (
      <div className="bg-[#07090e] text-white p-4 min-h-screen flex flex-col justify-between box-sizing-border">
        <SpotlightCard className="p-5 sm:p-7 bg-[#0e121d] border border-neutral-800/90 shadow-2xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
              <Zap size={13} /> Free WhatsApp Link Generator
            </span>
            <span className="text-[10px] text-neutral-400">100% Client-Side Private</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Country &amp; Phone Number
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full bg-[#121724] border border-neutral-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="sm:col-span-2 w-full bg-[#121724] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Pre-filled Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Hello! I would like more details about..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#121724] border border-neutral-800 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] resize-none"
                />
              </div>
            </div>

            {/* Output (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#121724] border border-neutral-800 rounded-xl p-4 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Generated Link</span>
                <div className="bg-[#0b0e17] border border-neutral-800/80 rounded-lg p-2 break-all font-mono text-[11px] text-[#38bdf8] min-h-[42px] flex items-center select-all">
                  {generatedUrl || <span className="text-neutral-500">Enter phone number...</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!generatedUrl}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#38bdf8] hover:bg-[#38bdf8]/90 disabled:opacity-40 text-[#07090e] font-bold py-2 px-3 rounded-lg text-xs transition-all"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <a
                  href={generatedUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !generatedUrl && e.preventDefault()}
                  className={`w-full flex items-center justify-center gap-1.5 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all ${!generatedUrl ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <ExternalLink size={13} />
                  <span>Open in WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Backlink Attribution Footer */}
        <div className="text-center py-2.5 text-[11px] text-neutral-400">
          Free WhatsApp Link Tool by <a href="https://socialninjas.in/tools/whatsapp-link-generator" target="_blank" rel="noopener" className="text-[#38bdf8] font-bold hover:underline">Social Ninja's</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap bg-[#07090e] text-white min-h-screen">
      <SEO
        title="Free WhatsApp Link Generator | Create wa.me Links"
        description="Generate free direct WhatsApp wa.me chat links and QR codes with custom pre-filled messages. No signup required. Fast, free, and mobile-ready."
        canonical="https://socialninjas.in/tools/whatsapp-link-generator"
        faq={FAQS}
      />

      {/* HERO SECTION */}
      <AuroraBackground className="pt-32 pb-14 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-bold uppercase tracking-wider">
            <Zap size={13} className="text-[#22c55e]" />
            <span>FREE GROWTH UTILITY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Free WhatsApp Link Generator
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Create direct click-to-chat <code className="text-[#38bdf8] font-mono bg-neutral-900 px-2 py-0.5 rounded">wa.me</code> links with custom pre-filled messages and instant QR codes in seconds.
          </p>
        </div>
      </AuroraBackground>

      {/* MAIN CONTAINER (Strict 1140px container) */}
      <div style={{ maxWidth: 1140, margin: '0 auto 80px', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* INTERACTIVE TOOL CARD */}
        <SpotlightCard className="p-6 sm:p-10 bg-[#0e121d] border border-neutral-800/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  1. Country &amp; WhatsApp Phone Number
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full bg-[#121724] border border-neutral-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="sm:col-span-2 w-full bg-[#121724] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] font-mono"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5">
                  Enter digits only. Country code (+{countryCode}) is automatically formatted.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  2. Pre-filled Message (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Hello! I would like more details about..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#121724] border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] resize-none leading-relaxed"
                />
                
                {/* Quick Prompts */}
                <div className="mt-2.5">
                  <span className="text-[11px] font-semibold text-neutral-400 block mb-1.5">Quick message templates:</span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMessage(p)}
                        className="text-[11px] bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-lg border border-neutral-800 transition-colors"
                      >
                        {p.slice(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Output & Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#121724] border border-neutral-800 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Generated wa.me Link</span>
                  {generatedUrl && (
                    <span className="text-[10px] font-bold text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /> Active
                    </span>
                  )}
                </div>

                <div className="bg-[#0b0e17] border border-neutral-800/80 rounded-xl p-3.5 break-all font-mono text-xs text-[#38bdf8] min-h-[56px] flex items-center select-all">
                  {generatedUrl || <span className="text-neutral-500">Enter a phone number to generate link...</span>}
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={handleCopy}
                    disabled={!generatedUrl}
                    className="w-full flex items-center justify-center gap-2 bg-[#38bdf8] hover:bg-[#38bdf8]/90 disabled:opacity-40 disabled:hover:bg-[#38bdf8] text-[#07090e] font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md"
                  >
                    {copied ? <Check size={15} className="text-[#07090e]" /> : <Copy size={15} />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy WhatsApp Link'}</span>
                  </button>

                  <a
                    href={generatedUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => !generatedUrl && e.preventDefault()}
                    className={`w-full flex items-center justify-center gap-2 bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all ${!generatedUrl ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    <ExternalLink size={15} />
                    <span>Test Link in WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setShowQr(!showQr)}
                    disabled={!generatedUrl}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 disabled:opacity-40 text-neutral-300 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
                  >
                    <QrCode size={15} className="text-[#38bdf8]" />
                    <span>{showQr ? 'Hide QR Code' : 'Generate Printable QR Code'}</span>
                  </button>
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
                  >
                    <Code size={15} className="text-[#38bdf8]" />
                    <span>{showEmbed ? 'Hide Embed Code' : 'Embed This Tool On Your Website (Free)'}</span>
                  </button>
                </div>

                {/* Embed Code Drawer */}
                {showEmbed && (
                  <div className="pt-4 border-t border-neutral-800 space-y-2.5 text-left animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Embed Code (HTML)</span>
                      <button
                        onClick={handleCopyEmbed}
                        className="text-[11px] font-semibold text-[#38bdf8] hover:text-[#38bdf8]/80 flex items-center gap-1"
                      >
                        {embedCopied ? <Check size={12} className="text-[#22c55e]" /> : <Copy size={12} />}
                        <span>{embedCopied ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="bg-[#0b0e17] border border-neutral-800 rounded-xl p-3 text-[10px] text-neutral-400 font-mono overflow-x-auto whitespace-pre-wrap select-all">
                      {embedSnippet}
                    </pre>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      Paste this iframe snippet into your WordPress, Webflow, Shopify, or static site.
                    </p>
                  </div>
                )}

                {/* QR Code Container */}
                {showQr && generatedUrl && (
                  <div className="pt-4 border-t border-neutral-800 text-center space-y-3 animate-fade-in">
                    <div className="bg-[#0e121d] p-4 rounded-xl border border-neutral-800 inline-block shadow-lg">
                      <img 
                        src={qrCodeUrl} 
                        alt="WhatsApp Direct Chat QR Code" 
                        className="w-40 h-40 mx-auto rounded-lg"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Right-click or hold to save QR code for printed menus, business cards, or packaging.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#22c55e]" /> 100% Client-Side Private
                </span>
                <span>Zero Data Stored</span>
              </div>
            </div>

          </div>
        </SpotlightCard>

        {/* ── SUPPORTING COPY SECTION (~300-500 words per spec) ── */}
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              What is a wa.me Link and Why Do Businesses Use It?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              A <strong>wa.me link</strong> (also known as a WhatsApp click-to-chat link) is an official short URL protocol developed by WhatsApp that allows anyone to start a direct chat conversation with you or your business without having to manually save your phone number to their contacts first. In traditional sales funnels, forcing prospects to copy a 10-digit number, open their address book, create a new contact, and refresh WhatsApp introduces massive friction and causes up to 60% of potential inbound leads to drop off. A direct wa.me link eliminates this barrier entirely: with a single tap, WhatsApp launches immediately on mobile or desktop with a pre-written message ready to send.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              How to Create and Use Your WhatsApp Link (3 Easy Steps)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#0e121d] border border-neutral-800 p-5 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-black text-sm flex items-center justify-center">1</div>
                <h3 className="font-bold text-white text-sm">Enter Phone Number</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Select your country code and enter your WhatsApp phone number. Ensure you omit any leading zeros, dashes, plus signs, or brackets.
                </p>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-5 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-black text-sm flex items-center justify-center">2</div>
                <h3 className="font-bold text-white text-sm">Add Pre-filled Text</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Type a greeting or qualifying question. When a prospect clicks, this text appears automatically in their input field so they don't have to think about what to say.
                </p>
              </div>
              <div className="bg-[#0e121d] border border-neutral-800 p-5 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] font-black text-sm flex items-center justify-center">3</div>
                <h3 className="font-bold text-white text-sm">Copy &amp; Deploy</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Copy your custom link or download the generated QR code. Share it across your marketing channels to begin receiving qualified conversations instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Where to Use Your WhatsApp Chat Link
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Direct-response brands and service agencies deploy wa.me links across high-intent touchpoints to capture buyers at peak interest:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-start gap-2 bg-[#0e121d] p-3 rounded-lg border border-neutral-800/80">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span><strong>Instagram &amp; TikTok Bio:</strong> Drive bio clicks directly into sales conversations.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#0e121d] p-3 rounded-lg border border-neutral-800/80">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span><strong>Website Floating CTA:</strong> Replace slow web inquiry forms with instant chat.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#0e121d] p-3 rounded-lg border border-neutral-800/80">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span><strong>Email Signatures:</strong> Provide a friction-free mobile channel for fast replies.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#0e121d] p-3 rounded-lg border border-neutral-800/80">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span><strong>Packaging &amp; QR Stands:</strong> Print QR codes on physical products for VIP reorders.</span>
              </li>
            </ul>
            <p className="text-xs text-neutral-400 pt-1">
              <strong>Compatibility Note:</strong> This generator is fully compatible with standard WhatsApp, WhatsApp Business app, and WhatsApp Cloud API. No software installation, signup, or login is ever required.
            </p>
          </div>

          {/* ── VISIBLE FAQ SECTION ── */}
          <div className="pt-6 border-t border-neutral-800">
            <div className="text-center mb-8">
              <span className="px-3.5 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold uppercase rounded-full tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                WhatsApp Link Questions Answered
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
              Social Ninja's builds autonomous AI growth systems, WhatsApp sales automation, and high-ROAS paid media funnels for modern digital brands.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="bg-[#1F4B99] hover:bg-[#1F4B99]/90 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg flex items-center gap-1.5"
              >
                Book Free Growth Audit <ArrowRight size={14} />
              </Link>
              <Link
                to="/services"
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold px-6 py-3 rounded-xl text-xs transition-all"
              >
                Explore Growth Systems
              </Link>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </div>
  );
};

export default WhatsAppLinkGenerator;
