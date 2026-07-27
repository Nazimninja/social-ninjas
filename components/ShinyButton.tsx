import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button'
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const baseStyle = variant === 'primary' 
    ? 'bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 text-white font-black shadow-lg shadow-brand-primary/30 border border-orange-400/40' 
    : variant === 'secondary'
    ? 'bg-[#121724] hover:bg-[#1a2133] text-white border border-neutral-700/80 font-bold'
    : 'bg-transparent text-neutral-300 hover:text-white border border-neutral-800 font-medium';

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden px-6 py-3.5 rounded-xl text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-shadow duration-300 ${baseStyle} ${className}`}
    >
      {/* Running Shimmer Border Highlight */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 -translate-x-full animate-shimmer-sweep"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </span>

      {/* Radial Pointer Glow Mask */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(255, 255, 255, 0.35), transparent 80%)`,
          }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default ShinyButton;
