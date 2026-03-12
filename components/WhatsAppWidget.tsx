import React, { useState } from 'react';
import { Mail, Instagram, X, MessageCircle } from 'lucide-react';

const ContactWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Expanded options */}
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          {/* Email */}
          <a
            href="mailto:nazim@socialninjas.in"
            className="flex items-center gap-2 bg-[#0f172a] border border-white/10 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg hover:border-brand-primary/40 transition-all whitespace-nowrap"
          >
            <Mail size={14} className="text-brand-primary" />
            nazim@socialninjas.in
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/socialninja.s/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0f172a] border border-white/10 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg hover:border-pink-500/40 transition-all whitespace-nowrap"
          >
            <Instagram size={14} className="text-pink-400" />
            @socialninja.s
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg border border-white/10 transition-all"
        style={{ background: open ? '#0f172a' : 'linear-gradient(135deg, #38bdf8, #1a3a6e)' }}
        aria-label="Contact us"
      >
        {open
          ? <X size={20} className="text-white/60" />
          : <MessageCircle size={22} className="text-white" />
        }
      </button>
    </div>
  );
};

export default ContactWidget;
