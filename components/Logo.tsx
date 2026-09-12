import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ size = 36, className = '', style = {} }) => {
  return (
    <img 
      src="/ninja-logo.png" 
      alt="Social Ninja's" 
      className={className}
      style={{ 
        height: size, 
        width: 'auto',
        maxHeight: size,
        objectFit: 'contain', 
        flexShrink: 0, 
        display: 'block',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
        ...style
      }} 
    />
  );
};

export default Logo;

