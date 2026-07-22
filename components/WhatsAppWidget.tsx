import React, { useState } from 'react';
import { Mail, Instagram, X, MessageCircle } from 'lucide-react';

const ContactWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Expanded options */}
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          {/* WhatsApp */}
          <a
            href="https://wa.me/918147757479"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FFFFFF",
              border: "1px solid #EDEDED",
              color: "#141414",
              fontSize: 12,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 50,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "all .2s",
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)";
              e.currentTarget.style.background = "rgba(34,197,94,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#EDEDED";
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
            <MessageCircle size={14} style={{ color: "#22c55e" }} />
            WhatsApp Support
          </a>

          {/* Email */}
          <a
            href="mailto:info@socialninjas.in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FFFFFF",
              border: "1px solid #EDEDED",
              color: "#141414",
              fontSize: 12,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 50,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "all .2s",
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(61,109,181,0.4)";
              e.currentTarget.style.background = "rgba(61,109,181,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#EDEDED";
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
            <Mail size={14} style={{ color: "#3D6DB5" }} />
            info@socialninjas.in
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/socialninja.s/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FFFFFF",
              border: "1px solid #EDEDED",
              color: "#141414",
              fontSize: 12,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 50,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "all .2s",
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(236,72,153,0.4)";
              e.currentTarget.style.background = "rgba(236,72,153,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#EDEDED";
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
            <Instagram size={14} style={{ color: "#ec4899" }} />
            @socialninja.s
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg border transition-all"
        style={{
          background: open ? '#141414' : 'linear-gradient(135deg, #3D6DB5, #2A5299)',
          borderColor: open ? '#141414' : 'rgba(61,109,181,0.1)'
        }}
        aria-label="Contact us"
      >
        {open
          ? <X size={20} className="text-white" />
          : <MessageCircle size={22} className="text-white" />
        }
      </button>
    </div>
  );
};

export default ContactWidget;
