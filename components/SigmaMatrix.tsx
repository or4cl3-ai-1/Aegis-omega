
import React from 'react';
import { SigmaState } from '../types';

interface Props {
  sigma: SigmaState;
}

const SigmaMatrix: React.FC<Props> = ({ sigma }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (sigma.pas * circumference);

  return (
    <div className="relative flex flex-col items-center justify-center py-8 group">
      {/* Perception Retina Grid (Fractal UI Principle: Perception) */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20 pointer-events-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div 
            key={i} 
            className="w-full h-full bg-purple-500/20 rounded-[1px] transition-all duration-500"
            style={{ 
              opacity: 0.1 + Math.random() * 0.4,
              transform: `scale(${0.8 + Math.sin(Date.now() / 1000 + i) * 0.2})`
            }}
          />
        ))}
      </div>

      <svg className="w-56 h-56 transform -rotate-90 relative z-10">
        {/* Background Circle */}
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="rgba(168, 85, 247, 0.1)"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Alignment Gauge */}
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.6))' }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-[10px] text-purple-500 uppercase font-black tracking-[0.3em] mb-1">Σ-PAS Index</span>
        <span className="text-5xl font-black text-white neon-text-purple">
          {(sigma.pas * 100).toFixed(1)}
        </span>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[9px] text-gray-500 jetbrains-mono font-bold uppercase tracking-widest">
            κ = {sigma.restoringForce.toFixed(3)}
          </span>
          <div className="w-1 h-1 rounded-full bg-purple-500 animate-ping" />
        </div>
      </div>

      {/* Restoring Force Stability Indicators */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none z-10">
        <div 
          className="w-[220px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent absolute transition-transform duration-1000 ease-in-out"
          style={{ transform: `rotate(${(sigma.pas - 0.5) * 360}deg)` }}
        >
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff] absolute right-0 -top-[3.5px]" />
          <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] absolute left-0 -top-[3.5px]" />
        </div>
      </div>
    </div>
  );
};

export default SigmaMatrix;
