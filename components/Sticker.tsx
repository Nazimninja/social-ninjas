import React from 'react';

interface StickerProps {
  children: React.ReactNode;
  color?: string; // Kept for API compatibility
  rotate?: string; 
  className?: string;
  delay?: boolean;
  id?: string;
}

const Sticker: React.FC<StickerProps> = ({ 
  children, 
  className = '',
  delay = false,
  id
}) => {
  return (
    <div 
      id={id}
      className={`relative group bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-brand-primary/10 ${className}`}
    >
        {/* Subtle Gradient Glow - refined to be softer */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] transition-all duration-700 group-hover:bg-brand-primary/20 pointer-events-none opacity-50 group-hover:opacity-100"></div>
        
        {/* Bottom Left Glow for Balance */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] transition-all duration-700 group-hover:bg-brand-secondary/10 pointer-events-none opacity-0 group-hover:opacity-100"></div>

        <div className="relative z-10">
          {children}
        </div>
    </div>
  );
};

export default React.memo(Sticker);