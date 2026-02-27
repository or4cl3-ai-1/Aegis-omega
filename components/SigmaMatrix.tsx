
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
    <div className="relative flex flex-col items-center justify-center py-6">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="rgba(0, 255, 255, 0.05)"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Alignment Gauge */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#00ffff"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out shadow-[0_0_20px_#00ffff]"
          style={{ filter: 'drop-shadow(0 0 8px #00ffff)' }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-10px]">
        <span className="text-[10px] text-cyan-600 uppercase font-bold tracking-widest mb-1">Σ-PAS Index</span>
        <span className="text-4xl font-black text-white neon-text">
          {(sigma.pas * 100).toFixed(1)}
        </span>
        <span className="text-[10px] text-gray-500 mt-1 jetbrains-mono font-bold">
          κ = {sigma.restoringForce.toFixed(2)}
        </span>
      </div>

      {/* Restoring Force Stability Indicators */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <div 
          className="w-[180px] h-[2px] bg-cyan-400/10 absolute transition-transform duration-500"
          style={{ transform: `rotate(${(sigma.pas - 0.5) * 180}deg)` }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff] absolute right-0 -top-0.5" />
        </div>
      </div>
    </div>
  );
};

export default SigmaMatrix;
