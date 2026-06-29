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
            style={{display:"flex",alignItems:"center",gap:8,background:"#f5f5f5",backdropFilter:"blur(24px)",border:"1px solid rgba(34,197,94,0.2)",color:"#2a2a2a",fontSize:12,fontWeight:500,padding:"8px 16px",borderRadius:50,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",fontFamily:"'DM Sans',sans-serif"}}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"; e.currentTarget.style.background = "rgba(34,197,94,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)"; e.currentTarget.style.background = "rgba(11,20,34,0.92)"; }}
          >
            <MessageCircle size={14} style={{color:"#22c55e"}} />
            WhatsApp Support
          </a>
          {/* Email */}
          <a
            href="mailto:info@socialninjas.in"
            style={{display:"flex",alignItems:"center",gap:8,background:"#f5f5f5",backdropFilter:"blur(24px)",border:"1px solid rgba(91,164,245,0.2)",color:"#2a2a2a",fontSize:12,fontWeight:500,padding:"8px 16px",borderRadius:50,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",fontFamily:"'DM Sans',sans-serif"}}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,164,245,0.5)"; e.currentTarget.style.background = "rgba(91,164,245,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(91,164,245,0.2)"; e.currentTarget.style.background = "rgba(11,20,34,0.92)"; }}
          >
            <Mail size={14} style={{color:"#5ba4f5"}} />
            info@socialninjas.in
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/socialninja.s/"
            target="_blank"
            rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:8,background:"#f5f5f5",backdropFilter:"blur(24px)",border:"1px solid rgba(236,72,153,0.2)",color:"#2a2a2a",fontSize:12,fontWeight:500,padding:"8px 16px",borderRadius:50,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",fontFamily:"'DM Sans',sans-serif"}}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.5)"; e.currentTarget.style.background = "rgba(236,72,153,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.2)"; e.currentTarget.style.background = "rgba(11,20,34,0.92)"; }}
          >
            <Instagram size={14} style={{color:"#ec4899"}} />
            @socialninja.s
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg border border-white/10 transition-all"
        style={{ background: open ? '#0f172a' : 'linear-gradient(135deg, #22c55e, #15803d)' }}
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
