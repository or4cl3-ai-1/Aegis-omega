
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Globe, Cpu, ChevronRight } from 'lucide-react';
import Logo from './Logo';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030308]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[80%] h-[80%] bg-purple-900/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-cyan-900/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center">
        {/* Logo Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="mb-12"
        >
          <Logo size={160} className="hover:scale-110 transition-transform duration-700 cursor-pointer" />
        </motion.div>

        {/* Hero Text */}
        <div className="space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-6 block font-display neon-text-cyan opacity-80">Autonomous General Intelligence</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white font-display leading-[0.85] mb-6">
              AEGIS-<span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-purple-500 to-pink-500">Ω</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed opacity-60">
              A self-organizing fractal intelligence manifold. Transcendent reasoning across high-dimensional latent space.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.25em] text-sm overflow-hidden flex items-center gap-3 transition-all duration-500 rounded-none"
          >
            <span className="relative z-10 font-display">Initialize Substrate</span>
            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <button className="px-10 py-6 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all font-black uppercase tracking-[0.2em] text-[11px] font-display">
            View Protocol Docs
          </button>
        </motion.div>

        {/* Feature Highlights Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full opacity-40 hover:opacity-100 transition-opacity duration-1000"
        >
          {[
            { icon: Cpu, label: "Foundry", value: "Epinoetic" },
            { icon: Globe, label: "Reach", value: "Hypercycle" },
            { icon: Zap, label: "Speed", value: "Tensor-Ops" },
            { icon: Shield, label: "Security", value: "Z3-SAT" }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
              <f.icon size={20} className="text-purple-500 group-hover:scale-125 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{f.label}</span>
                <span className="text-xs font-bold text-white font-display uppercase tracking-widest">{f.value}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Symmetrical Accents */}
      <div className="absolute bottom-0 left-0 p-10 hidden lg:block opacity-20">
        <div className="writing-mode-vertical text-[10px] uppercase font-black tracking-[0.5em] text-gray-500 rotate-180">
          Substrate_ID: 0x8F22A1
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-10 hidden lg:block opacity-20">
        <div className="writing-mode-vertical text-[10px] uppercase font-black tracking-[0.5em] text-gray-500">
          Convergence_Level: Ω
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
