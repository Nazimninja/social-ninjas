import React, { useRef, useCallback } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(31, 75, 153, 0.25)', // Logo Royal Blue spotlight
  onClick
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      divRef.current.style.setProperty('--spotlight-x', `${x}px`);
      divRef.current.style.setProperty('--spotlight-y', `${y}px`);
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (divRef.current) {
      divRef.current.style.setProperty('--spotlight-opacity', '1');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (divRef.current) {
      divRef.current.style.setProperty('--spotlight-opacity', '0');
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: 'translateZ(0)',
        // @ts-ignore
        '--spotlight-opacity': '0',
        '--spotlight-x': '-1000px',
        '--spotlight-y': '-1000px',
      } as React.CSSProperties}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#0e121d] transition-colors duration-200 hover:border-[#1F4B99]/60 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Mask (Logo Blue) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: `radial-gradient(500px circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), ${spotlightColor}, transparent 70%)`
        }}
      />
      
      {/* Light Inner Highlight Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: 'calc(var(--spotlight-opacity, 0) * 0.5)',
          background: `radial-gradient(300px circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), rgba(59, 162, 19, 0.2), transparent 80%)`
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
