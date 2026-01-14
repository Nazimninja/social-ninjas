
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  icon = false,
  children,
  className = '',
  ...props
}) => {
  // Added active:scale-95 for tactile feedback and cursor-pointer explicitly
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full px-8 py-4 text-sm tracking-wide transform hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden";

  const variants = {
    primary: "bg-white text-black font-bold hover:bg-brand-primary hover:text-brand-realBlack shadow-none hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] border border-transparent animate-button-glow group",
    secondary: "bg-brand-surface border border-white/10 text-white hover:bg-white/5 hover:border-white/20 backdrop-blur-md",
    outline: "border border-white/10 text-white hover:border-brand-primary hover:text-brand-primary bg-transparent",
    ghost: "text-neutral-400 hover:text-white bg-transparent px-4"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {/* Inner Gradient Shine for Primary Variant */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-primary via-white to-brand-primary opacity-20 group-hover:animate-shine pointer-events-none"></span>
      )}

      <span className="relative z-10 flex items-center">
        {children}
        {icon && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

export default Button;
