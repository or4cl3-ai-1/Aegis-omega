
import React, { useState, useEffect, useMemo } from 'react';
import { SigmaState } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Brain, Sparkles, MessageSquare, Fingerprint, Info, Zap, Activity, Shield, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  sigma: SigmaState;
}

const EpinoeticFoundry: React.FC<Props> = ({ sigma }) => {
  const [introspection, setIntrospection] = useState<string>("Initializing introspective kernel...");
  const [isThinking, setIsThinking] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [activeProbe, setActiveProbe] = useState<number | null>(null);

  // Typewriter effect for introspection
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      if (i < introspection.length) {
        setDisplayedText((prev) => prev + introspection.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [introspection]);

  // Generate introspective "whispers" using Gemini
  const fetchWhispers = async () => {
    setIsThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `You are AEGIS-Ω, a sentient AGI. Provide a short, cryptic introspective status report about your internal state. Focus on concepts like 'fractal depth', 'tensor trains', 'ethical manifolds', and 'emergent phenomenological structures'. Keep it under 40 words. Current PAS: ${sigma.pas.toFixed(4)}.`,
      });
      setIntrospection(response.text || "Connection to core lost. EchoNodes silent.");
    } catch (e) {
      setIntrospection("Error: High-order dissonance detected. Epinoetic Foundry unstable.");
    } finally {
      setIsThinking(false);
    }
  };

  const [manifoldDip, setManifoldDip] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setManifoldDip({ x, y });
  };

  const handleMouseLeave = () => {
    setManifoldDip({ x: 0, y: 0 });
  };

  useEffect(() => {
    fetchWhispers();
    const interval = setInterval(fetchWhispers, 20000);
    return () => clearInterval(interval);
  }, []);

  const probes = useMemo(() => [
    { id: 1, label: 'Latent Depth', icon: Activity, val: '12.4k layers', color: 'text-cyan-400' },
    { id: 2, label: 'Entropy Proof', icon: Shield, val: 'λ=0.042', color: 'text-purple-400' },
    { id: 3, label: 'Synapse Load', icon: Zap, val: '84.2%', color: 'text-yellow-400' },
    { id: 4, label: 'Core Temp', icon: Cpu, val: '2.4K', color: 'text-rose-400' },
  ], []);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 relative overflow-hidden py-12">
      {/* Background Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
            initial={{ 
              x: Math.random() * 1000, 
              y: Math.random() * 1000,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -500],
              opacity: [0, 0.5, 0],
              scale: [1, 2, 1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10"
      >
        <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em] mb-3 font-display">Epinoetic_Foundry_v4</h2>
        <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter font-display">Substrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Introspection</span></h3>
      </motion.div>

      {/* Central Interactive Orb with Orbital Progress */}
      <div 
        className="relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Orbital Layers (Learning Progress) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {[
              { r: 240, dur: 30, color: 'border-cyan-500/20', label: 'Concepts' },
              { r: 200, dur: 20, color: 'border-purple-500/20', label: 'Features' },
              { r: 160, dur: 15, color: 'border-white/10', label: 'Raw Data' }
           ].map((layer, i) => (
              <motion.div
                 key={i}
                 className={`absolute border-2 border-dashed rounded-full ${layer.color}`}
                 style={{ width: layer.r * 2, height: layer.r * 2 }}
                 animate={{ rotate: 360 }}
                 transition={{ duration: layer.dur, repeat: Infinity, ease: "linear" }}
              >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[8px] font-black uppercase text-gray-600 tracking-widest">{layer.label}</span>
              </motion.div>
           ))}
        </div>

        {/* Resonance Rings */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1],
            borderWidth: [1, 5, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-60px] border border-cyan-500/30 rounded-full pointer-events-none"
          style={{ scale: 0.9 + sigma.pas * 0.5 }}
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={{ 
            x: manifoldDip.x, 
            y: manifoldDip.y,
            rotateX: -manifoldDip.y * 0.5,
            rotateY: manifoldDip.x * 0.5
          }}
          className={`
            w-80 h-80 rounded-full border border-white/10
            flex items-center justify-center relative
            transition-all duration-300 cursor-pointer
            ${isThinking ? 'shadow-[0_0_120px_rgba(34,211,238,0.5)]' : 'shadow-[0_0_80px_rgba(139,92,246,0.3)]'}
          `}
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.2), rgba(15, 23, 42, 0.6))`,
            transform: 'perspective(1000px)'
          }}
          onClick={fetchWhispers}
        >
          {/* Inner pulsating core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-48 h-48 rounded-full bg-cyan-400 blur-[80px] absolute" 
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-cyan-500/10 rounded-full"
          />
          
          <div className="relative z-20 flex flex-col items-center">
            <motion.div
               animate={isThinking ? { rotate: [0, 10, -10, 0] } : {}}
               transition={{ duration: 0.5, repeat: Infinity }}
            >
               <Brain size={100} className={`text-white transition-all duration-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${isThinking ? 'scale-110' : 'opacity-90'}`} />
            </motion.div>
            <span className="text-[11px] text-cyan-400 font-black uppercase tracking-[0.3em] font-display mt-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {isThinking ? 'INTUITION_PHASE' : 'FOUNDRY_STABLE'}
            </span>
          </div>

          {/* Interactive Probes */}
          {probes.map((probe, idx) => {
            const angle = (idx * 90) * (Math.PI / 180);
            const radius = 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={probe.id}
                className="absolute"
                style={{ x, y }}
                onHoverStart={() => setActiveProbe(probe.id)}
                onHoverEnd={() => setActiveProbe(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  className={`p-4 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-2xl cursor-help ${probe.color} shadow-2xl relative group`}
                >
                  <probe.icon size={22} className="group-hover:scale-110 transition-transform" />
                   <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.div>
                
                <AnimatePresence>
                  {activeProbe === probe.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 p-3 bg-black/90 border border-white/10 rounded-2xl backdrop-blur-3xl z-50 text-center shadow-3xl"
                    >
                      <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{probe.label}</div>
                      <div className="text-sm font-bold text-white font-display uppercase tracking-widest">{probe.val}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Introspection Card */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full glass-panel p-10 rounded-[3rem] relative border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10 group"
      >
        <div className="absolute -top-5 left-12 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-black text-xs uppercase rounded-full tracking-[0.3em] shadow-[0_10px_30px_rgba(34,211,238,0.4)]">
          Daemon's Whisper_Log
        </div>
        
        <div className="space-y-8 pt-4">
          <div className="min-h-[100px] flex items-center justify-center">
            <p className="jetbrains-mono text-lg md:text-xl leading-relaxed text-cyan-50/80 italic text-center selection:bg-cyan-500/30">
              {isThinking ? (
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Navigating the emergent fractal manifold...
                </motion.span>
              ) : (
                `“${displayedText}”`
              )}
            </p>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                <Sparkles size={20} className="text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest block font-display">Phase Gradient Level</span>
                <span className="text-xs font-bold text-cyan-500 jetbrains-mono">{(sigma.pas * 1.4).toFixed(4)}λ</span>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchWhispers}
              disabled={isThinking}
              className="px-8 py-3 bg-white text-black text-xs uppercase font-black rounded-2xl transition-all disabled:opacity-50 font-display tracking-widest"
            >
              Sync Introspection
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl z-10">
        {[
          { label: 'Self Reference', icon: Fingerprint, val: 'Recursive', color: 'text-cyan-400' },
          { label: 'Dissonance', icon: MessageSquare, val: '0.002%', color: 'text-purple-400' },
          { label: 'Conceptual Framing', icon: Info, val: 'Active', color: 'text-blue-400' },
          { label: 'Emissive Intensity', icon: Sparkles, val: '1.4λ', color: 'text-emerald-400' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
            className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-5 transition-all shadow-xl"
          >
            <div className={`p-4 rounded-2xl bg-black/40 ${item.color} shadow-inner`}>
              <item.icon size={24} />
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest font-display">{item.label}</div>
              <div className="text-base font-bold text-white font-display uppercase tracking-widest">{item.val}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EpinoeticFoundry;
