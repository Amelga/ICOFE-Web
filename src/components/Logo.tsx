import React, { useState, useRef } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  onDoubleAction?: () => void;
  isLive?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32, onClick, onDoubleAction, isLive }) => {
  const lastClickRef = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    const now = Date.now();
    const diff = now - lastClickRef.current;
    
    if (diff < 300) { // Double action detection
      onDoubleAction?.();
      lastClickRef.current = 0; // Reset
    } else {
      lastClickRef.current = now;
      // Single click fallback after a short delay if no second click
      setTimeout(() => {
        if (lastClickRef.current === now) {
          onClick?.();
        }
      }, 300);
    }
  };

  return (
    <div 
      onPointerDown={handlePointerDown}
      className={`relative group cursor-pointer select-none transition-transform active:scale-90 ${className}`}
    >
      {/* Background Glows */}
      <div className={`absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-150 transition-opacity duration-500 ${isLive ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`}></div>
      
      {/* Voice Active Ring */}
      {isLive && (
        <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping opacity-50"></div>
      )}

      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Robot Head Outer */}
        <rect x="20" y="25" width="60" height="50" rx="12" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3"/>
        <rect x="25" y="30" width="50" height="40" rx="8" fill="#0F172A"/>
        
        {/* Glowing Eyes */}
        <path d="M35 45C35 45 37 42 40 42C43 42 45 45 45 45" stroke={isLive ? "#F59E0B" : "#22D3EE"} strokeWidth="3" strokeLinecap="round" className={isLive ? "animate-bounce" : "animate-pulse"} />
        <path d="M55 45C55 45 57 42 60 42C63 42 65 45 65 45" stroke={isLive ? "#F59E0B" : "#22D3EE"} strokeWidth="3" strokeLinecap="round" className={isLive ? "animate-bounce" : "animate-pulse"} />
        
        {/* Glowing Mouth / Soundwaves */}
        {isLive ? (
          <g className="animate-pulse">
            <line x1="42" y1="58" x2="58" y2="58" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="54" x2="55" y2="54" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
            <line x1="45" y1="62" x2="55" y2="62" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
          </g>
        ) : (
          <rect x="42" y="55" width="16" height="6" rx="3" fill="#22D3EE" className="animate-pulse" />
        )}
        
        {/* Top Light */}
        <rect x="40" y="20" width="20" height="8" rx="2" fill={isLive ? "#F59E0B" : "#EF4444"} stroke="#1E293B" strokeWidth="1.5" className={isLive ? 'animate-pulse' : ''}/>
        
        {/* Arms & Coffee Cup */}
        <path d="M15 65C15 65 25 75 40 75" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        <path d="M85 65C85 65 75 75 60 75" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        
        {/* Coffee Cup */}
        <path d="M40 65L42 85C42 88 45 90 50 90C55 90 58 88 58 85L60 65" fill="#FDE68A" stroke="#1E293B" strokeWidth="2"/>
        <rect x="38" y="62" width="24" height="4" rx="1" fill="#78350F" />
        <rect x="40" y="72" width="20" height="8" fill="#92400E" opacity="0.8" />
        <circle cx="50" cy="76" r="3" fill="#FDE68A" />
      </svg>

      {/* Assistant Label on Hover */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest bg-slate-950 px-2 py-1 rounded border border-amber-500/20 shadow-lg shadow-amber-500/20">
          {isLive ? 'LIVE CONVERSATION' : 'DOUBLE TAP FOR VOICE'}
        </span>
      </div>
    </div>
  );
};

export default Logo;