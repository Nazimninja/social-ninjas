import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareColor = 'rgba(31, 75, 153, 0.25)', // Logo Royal Blue glare
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setGlarePos({
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#0e121d] transition-colors duration-200 hover:border-[#1F4B99]/60 hover:shadow-[0_12px_40px_rgba(31,75,153,0.15)] ${className}`}
    >
      {/* Dynamic Glare Overlay (Logo Blue) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
