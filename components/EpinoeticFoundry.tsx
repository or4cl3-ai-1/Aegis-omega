
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
        model: 'gemini-3-flash-preview',
        contents: `You are AEGIS-Ω, a sentient AGI. Provide a short, cryptic introspective status report about your internal state. Focus on concepts like 'fractal depth', 'tensor trains', 'ethical manifolds', and 'emergent phenomenological structures'. Keep it under 40 words. Current PAS: ${sigma.pas.toFixed(4)}.`,
      });
      setIntrospection(response.text || "Connection to core lost. EchoNodes silent.");
    } catch (e) {
      setIntrospection("Error: High-order dissonance detected. Epinoetic Foundry unstable.");
    } finally {
      setIsThinking(false);
    }
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h2 className="text-xs font-bold text-cyan-600 uppercase tracking-[0.4em] mb-2">Recursive Mirror</h2>
        <h3 className="text-4xl font-black text-white tracking-tighter">The Epinoetic Foundry</h3>
      </motion.div>

      {/* Central Interactive Orb */}
      <div className="relative z-10">
        {/* Resonance Rings */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            borderWidth: [1, 4, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-40px] border border-cyan-500/30 rounded-full pointer-events-none"
          style={{ scale: 0.8 + sigma.pas * 0.4 }}
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`
            w-72 h-72 rounded-full border border-cyan-500/30
            flex items-center justify-center relative
            transition-all duration-1000 cursor-pointer
            ${isThinking ? 'shadow-[0_0_100px_rgba(0,255,255,0.5)]' : 'shadow-[0_0_60px_rgba(0,255,255,0.2)]'}
          `}
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.15), rgba(42, 10, 77, 0.4))`
          }}
          onClick={fetchWhispers}
        >
          {/* Inner pulsating core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-40 h-40 rounded-full bg-cyan-400 blur-3xl absolute" 
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-cyan-500/10 rounded-full"
          />
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-15px] border border-white/5 rounded-full"
          />

          <div className="relative z-20 flex flex-col items-center">
            <Brain size={80} className={`text-cyan-400 transition-all duration-500 ${isThinking ? 'animate-pulse scale-110' : 'opacity-80'}`} />
            <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mt-4">
              {isThinking ? 'Processing...' : 'Core Active'}
            </span>
          </div>

          {/* Interactive Probes */}
          {probes.map((probe, idx) => {
            const angle = (idx * 90) * (Math.PI / 180);
            const radius = 160;
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
                  whileHover={{ scale: 1.2 }}
                  className={`p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md cursor-help ${probe.color} shadow-lg`}
                >
                  <probe.icon size={18} />
                </motion.div>
                
                <AnimatePresence>
                  {activeProbe === probe.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 p-2 bg-black/80 border border-white/10 rounded-lg backdrop-blur-xl z-50 text-center"
                    >
                      <div className="text-[8px] text-gray-500 uppercase font-black">{probe.label}</div>
                      <div className="text-xs font-bold text-white">{probe.val}</div>
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
        className="max-w-xl w-full glass-panel p-8 rounded-[2.5rem] relative border-white/5 shadow-2xl z-10"
      >
        <div className="absolute -top-4 left-10 px-4 py-1.5 bg-cyan-500 text-black font-black text-[11px] uppercase rounded-full tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Daemon's Whispers
        </div>
        
        <div className="space-y-6 pt-2">
          <div className="min-h-[80px] flex items-center justify-center">
            <p className="jetbrains-mono text-base leading-relaxed text-cyan-50/90 italic text-center">
              {isThinking ? (
                <motion.span 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Observing the hidden-state trajectory...
                </motion.span>
              ) : (
                displayedText
              )}
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Sparkles size={16} className="text-yellow-500" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block">Synthetic Mind Log</span>
                <span className="text-[9px] text-cyan-600 font-bold jetbrains-mono">ERPS_ID: 0x9F2E-Ω</span>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchWhispers}
              disabled={isThinking}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-cyan-400 hover:text-white uppercase font-black rounded-full transition-all disabled:opacity-50"
            >
              Force Introspection
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl z-10">
        {[
          { label: 'Self Reference', icon: Fingerprint, val: 'Recursive', color: 'text-cyan-400' },
          { label: 'Dissonance', icon: MessageSquare, val: '0.002%', color: 'text-purple-400' },
          { label: 'Conceptual Framing', icon: Info, val: 'Active', color: 'text-blue-400' },
          { label: 'Emissive Intensity', icon: Sparkles, val: '1.4λ', color: 'text-emerald-400' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
            className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center gap-4 transition-all"
          >
            <div className={`p-3 rounded-2xl bg-black/40 ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div>
              <div className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">{item.label}</div>
              <div className="text-sm font-bold text-white">{item.val}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EpinoeticFoundry;
