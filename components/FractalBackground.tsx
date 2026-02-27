
import React from 'react';

interface Props {
  pas: number;
}

const FractalBackground: React.FC<Props> = ({ pas }) => {
  // Map PAS (0.88 - 0.99 range approx) to aesthetic factors
  // Intensity factor (0 to 1 scale for the relevant PAS range)
  const normalizedPas = Math.min(1, Math.max(0, (pas - 0.85) / 0.15));
  
  // Shift from Deep Purple (270deg) towards Neon-Cyan (180deg)
  const hueRotate = (1 - normalizedPas) * 90;
  
  // Modulate intensity of the "Symbiosis" pulse
  const glowOpacity = 0.05 + (normalizedPas * 0.15);
  const fractalOpacity = 0.1 + (normalizedPas * 0.2);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505] transition-all duration-1000"
      style={{
        filter: `hue-rotate(${hueRotate}deg)`
      }}
    >
      {/* Fractal Lattice Overlay (Matrix Product States visualization) */}
      <svg 
        className="absolute w-full h-full fractal-bg transition-opacity duration-1000" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ opacity: fractalOpacity }}
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.15"/>
          </pattern>
          <radialGradient id="cyanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
      
      {/* Ambient Glows (Mystery x Symbiosis) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-500 blur-[150px] transition-all duration-1000"
        style={{ opacity: glowOpacity }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-purple-900 blur-[180px] transition-all duration-1000"
        style={{ opacity: glowOpacity * 0.8 }}
      />
      
      {/* High-energy focal pulse anchored to system stability */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/5 blur-[200px] animate-pulse"
        style={{ opacity: normalizedPas * 0.2 }}
      />
      
      {/* Static Scanlines for depth-mapping Authority */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </div>
  );
};

export default FractalBackground;
