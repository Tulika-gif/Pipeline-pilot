import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', iconOnly = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-xl font-extrabold',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract violet geometric symbol inspired by connected pipeline nodes & forward-moving trajectory */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#6C45F5] to-[#21164F] shadow-sm shadow-[#6C45F5]/30 p-2 text-white shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Node 1: Origin */}
          <circle cx="5" cy="12" r="2.5" fill="#EDE7FF" />
          {/* Connection Line 1 to Upper Node */}
          <path
            d="M7 11L11.5 6.5"
            stroke="#EDE7FF"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Node 2: Top Branch */}
          <circle cx="13" cy="5.5" r="2.2" fill="#FFFFFF" />
          {/* Connection Line 1 to Lower Node */}
          <path
            d="M7 13L11.5 17.5"
            stroke="#EDE7FF"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Node 3: Bottom Branch */}
          <circle cx="13" cy="18.5" r="2.2" fill="#FFFFFF" />
          {/* Convergence to Forward Target Node */}
          <path
            d="M15 6.5L19.5 11"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M15 17.5L19.5 13"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Forward Pilot Apex Node */}
          <circle cx="20.5" cy="12" r="2.8" fill="#EDE7FF" />
          <circle cx="20.5" cy="12" r="1.2" fill="#6C45F5" />
        </svg>
      </div>

      {!iconOnly && (
        <span
          className={`tracking-tight text-[#211D35] ${textSizes[size]} whitespace-nowrap`}
        >
          Pipeline <span className="text-[#6C45F5]">Pilot</span>
        </span>
      )}
    </div>
  );
};
