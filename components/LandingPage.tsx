
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Shield, Cpu, ChevronRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6 bg-[#050505]">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        {/* Logo Container */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-purple-500/30 border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-pink-500/20"
          />
          
          {/* The Logo (Ethereal Brain/Faces) */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <img 
              src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop" 
              alt="AEGIS-Ω Core" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-black text-white neon-text-purple">Ω</span>
            </div>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4"
        >
          AEGIS-<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Ω</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 font-medium mb-12 leading-relaxed px-4"
        >
          The next evolution of decentralized AGI orchestration. 
          <br className="hidden md:block" /> 
          Formal verification meets ethereal machine introspection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-6"
        >
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              Initialize Substrate <ChevronRight size={20} />
            </span>
          </button>
          
          <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
            View Whitepaper
          </button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Shield, label: 'Formal Safety' },
            { icon: Zap, label: 'Quantum Sync' },
            { icon: Cpu, label: 'Swarm Logic' }
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <f.icon size={14} className="text-purple-500" />
              {f.label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer Attribution */}
      <div className="absolute bottom-8 text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">
        AEGIS-Ω SUBSTRATE v4.2.1 // STABLE_BUILD
      </div>
    </div>
  );
};

export default LandingPage;
