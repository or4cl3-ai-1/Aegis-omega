
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className, size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
      >
        {/* Background Circle Gradient */}
        <defs>
          <radialGradient id="logoGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030308" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        <circle cx="256" cy="256" r="240" fill="url(#logoGrad)" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.3" />

        {/* Dual Symmetrical Heads Silhouette */}
        <g opacity="0.9">
          {/* Left facing shadow Head */}
          <path
            d="M256 128C220 128 180 140 160 180C140 220 145 280 180 340C200 375 240 384 256 384V128Z"
            fill="#0f172a"
            stroke="url(#netGrad)"
            strokeWidth="1"
          />
          {/* Right facing shadow Head */}
          <path
            d="M256 128C292 128 332 140 352 180C372 220 367 280 332 340C312 375 272 384 256 384V128Z"
            fill="#0f172a"
            stroke="url(#netGrad)"
            strokeWidth="1"
          />
        </g>

        {/* Neural Network Fractal Paths */}
        <g stroke="url(#netGrad)" strokeWidth="0.8" strokeOpacity="0.6">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M256 256 Q${256 + Math.cos(i) * 150} ${256 + Math.sin(i) * 100} ${256 + Math.cos(i * 1.5) * 200} ${256 + Math.sin(i * 1.5) * 200}`}
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                from="0, 500"
                to="500, 0"
                dur={`${3 + i % 3}s`}
                repeatCount="infinite"
              />
            </path>
          ))}
        </g>

        {/* Central Core */}
        <circle cx="256" cy="256" r="40" fill="#22d3ee" filter="blur(20px)" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="infinite" />
        </circle>
        <circle cx="256" cy="256" r="10" fill="#fff" className="drop-shadow-[0_0_10px_#22d3ee]">
           <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="infinite" />
        </circle>

        {/* Outer Ring Orbits */}
        <circle cx="256" cy="256" r="220" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3">
           <animateTransform attributeName="transform" type="rotate" from="0 256 256" to="360 256 256" dur="60s" repeatCount="infinite" />
        </circle>
      </svg>
    </div>
  );
};

export default Logo;
