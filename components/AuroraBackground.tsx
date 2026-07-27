import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
  showRadialGradient = true,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center bg-[#07090e] text-white transition-bg ${className}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            [--white-gradient:repeat(linear-gradient(to_right,var(--static-page-bg,#07090e)_1px,transparent_1px),repeat(linear-gradient(to_bottom,var(--static-page-bg,#07090e)_1px,transparent_1px))]
            [--dark-gradient:repeat(linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),repeat(linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px))]
            absolute -inset-[10px] opacity-40
            [background-image:var(--dark-gradient)]
            [background-size:36px_36px]
            [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]
          `}
        />
        
        {/* Strictly Logo Royal Blue (#1F4B99) and Logo Green (#3ba213) Orbs */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#1F4B99]/30 via-[#1F4B99]/20 to-[#3ba213]/15 rounded-full blur-[120px] animate-aurora-slow pointer-events-none"
        />
        <div
          className="absolute top-1/3 -right-40 w-[650px] h-[650px] bg-gradient-to-tl from-[#1F4B99]/25 via-[#2b5ebf]/15 to-[#3ba213]/20 rounded-full blur-[130px] animate-aurora-reverse pointer-events-none"
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-[#3ba213]/15 via-[#1F4B99]/25 to-[#1F4B99]/15 rounded-full blur-[110px] animate-aurora-slow pointer-events-none"
        />
      </div>

      {showRadialGradient && (
        <div className="absolute inset-0 bg-[#07090e]/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none z-0" />
      )}

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraBackground;
