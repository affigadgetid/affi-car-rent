import React from 'react';

interface AffiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

export const AffiLogo: React.FC<AffiLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color'
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', subtitle: 'text-[9px]' },
    md: { icon: 38, text: 'text-2xl', subtitle: 'text-[11px]' },
    lg: { icon: 48, text: 'text-3xl', subtitle: 'text-xs' },
    xl: { icon: 60, text: 'text-4xl', subtitle: 'text-sm' }
  };

  const { icon, text } = sizeMap[size];
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Modern Automotive 'A' with Road Tracks */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="affiBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="60%" stopColor="#075BEA" />
            <stop offset="100%" stopColor="#071B49" />
          </linearGradient>
          <linearGradient id="affiWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAF3FF" />
          </linearGradient>
        </defs>

        {/* Outer stylized slanted chevron A left track */}
        <path
          d="M26 6L2 58H16L34 16L26 6Z"
          fill={isWhite ? 'url(#affiWhiteGrad)' : 'url(#affiBlueGrad)'}
        />
        {/* Right slanted track */}
        <path
          d="M34 16L48 58H62L38 6L34 16Z"
          fill={isWhite ? '#FFFFFF' : '#075BEA'}
          fillOpacity={isWhite ? 0.9 : 1}
        />
        {/* Middle road stripe bridge */}
        <path
          d="M19 40H47L43 32H23L19 40Z"
          fill={isWhite ? '#075BEA' : '#00D2FF'}
        />
        {/* Road center dash */}
        <path
          d="M30 46H34L35 52H29L30 46Z"
          fill={isWhite ? '#071B49' : '#FFFFFF'}
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold italic tracking-tight font-sans ${text} ${
            isWhite ? 'text-white' : 'text-[#071B49]'
          }`}
        >
          Affi <span className={isWhite ? 'text-sky-300' : 'text-[#075BEA]'}>Car Rent</span>
        </span>
      </div>
    </div>
  );
};
