import React from 'react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Top-Right Facet (Brand Blue) */}
      <path d="M20 20L20 4L26 14L36 20Z" fill="#0065ff" />
      {/* Bottom-Left Facet (Mint Green Accent) */}
      <path d="M20 20L20 36L14 26L4 20Z" fill="#2fcf8e" />
      {/* Top-Left Facet (Dark Charcoal) */}
      <path d="M20 20L4 20L14 14L20 4Z" fill="#141414" />
      {/* Bottom-Right Facet (Medium Slate) */}
      <path d="M20 20L36 20L26 26L20 36Z" fill="#717171" />
    </svg>
  );
};

export default Logo;
