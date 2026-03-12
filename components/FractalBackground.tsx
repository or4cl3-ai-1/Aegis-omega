
import React from 'react';

interface Props {
  pas: number;
}

const FractalBackground: React.FC<Props> = ({ pas }) => {
  // Map PAS (0.88 - 0.99 range approx) to aesthetic factors
  const normalizedPas = Math.min(1, Math.max(0, (pas - 0.85) / 0.15));
  
  // Shift from Deep Purple (270deg) towards Vibrant Pink
  const hueRotate = (1 - normalizedPas) * 45;
  
  // Modulate intensity of the "Symbiosis" pulse
  const glowOpacity = 0.08 + (normalizedPas * 0.12);
  const fractalOpacity = 0.15 + (normalizedPas * 0.15);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505] transition-all duration-1000"
      style={{
        filter: `hue-rotate(${hueRotate}deg)`
      }}
    >
      {/* Fractal Lattice Overlay */}
      <svg 
        className="absolute w-full h-full fractal-bg transition-opacity duration-1000" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ opacity: fractalOpacity }}
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.1"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
      
      {/* Ambient Glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600 blur-[150px] transition-all duration-1000"
        style={{ opacity: glowOpacity }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-pink-900 blur-[180px] transition-all duration-1000"
        style={{ opacity: glowOpacity * 0.8 }}
      />
      
      {/* High-energy focal pulse */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-400/5 blur-[200px] animate-pulse"
        style={{ opacity: normalizedPas * 0.2 }}
      />
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(168,85,247,0.02),rgba(236,72,153,0.01),rgba(0,255,255,0.02))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </div>
  );
};

export default FractalBackground;
