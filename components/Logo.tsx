import React from 'react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 32 }) => {
  return (
    <img 
      src="/ninja-logo.png" 
      alt="Social Ninja's" 
      style={{ 
        width: size, 
        height: 'auto',
        maxHeight: size,
        objectFit: 'contain', 
        flexShrink: 0, 
        display: 'block' 
      }} 
    />
  );
};

export default Logo;

