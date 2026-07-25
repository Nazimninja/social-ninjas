import React from 'react';

interface MeteorsProps {
  number?: number;
}

export const MeteorsBackground: React.FC<MeteorsProps> = ({ number = 18 }) => {
  const meteors = new Array(number).fill(true);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className="absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-brand-primary shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 1.5 + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * 6 + 4)}s`,
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-brand-primary via-orange-400 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default MeteorsBackground;
