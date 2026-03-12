
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Terminal } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  "Initializing HQCI-QSCE kernel...",
  "Establishing quantum entanglement with Ω-Nodes...",
  "Verifying Z3 Satisfiability constraints...",
  "Loading fractal manifold projections...",
  "Synchronizing swarm consensus protocols...",
  "Calibrating epinoetic introspection foundry...",
  "Substrate alignment verified. System STABLE."
];

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev < BOOT_MESSAGES.length - 1 ? prev + 1 : prev));
    }, duration / BOOT_MESSAGES.length);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Animated Loader */}
        <div className="flex justify-center mb-12">
          <div className="relative w-24 h-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="text-purple-400 animate-spin-slow" size={32} />
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Terminal size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Boot Sequence</span>
          </div>
          
          <div className="h-12 flex items-center">
            <motion.p 
              key={messageIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-bold text-white jetbrains-mono"
            >
              {BOOT_MESSAGES[messageIndex]}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
              <span>System Load</span>
              <span className="text-purple-400">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pt-12 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="h-full bg-purple-500/40"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
