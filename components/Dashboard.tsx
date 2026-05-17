
import React from 'react';
import { SigmaState, SystemStatus } from '../types';
import SigmaMatrix from './SigmaMatrix';
import SubstrateProtocols from './SubstrateProtocols';
import { Activity, ShieldCheck, Database, Zap, Globe, Cpu, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  sigma: SigmaState;
  systemStatus: SystemStatus;
}

const Dashboard: React.FC<Props> = ({ sigma, systemStatus }) => {
  const [introspectionMode, setIntrospectionMode] = React.useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pb-12">
      {/* System Status: Authority */}
      <div className="md:col-span-8 glass-panel p-4 md:p-6 rounded-3xl relative overflow-hidden group border-purple-500/20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-1">HQCI-QSCE Substrate</h2>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Cognitive Modules</h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIntrospectionMode(!introspectionMode)}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${introspectionMode ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-purple-500/10 border border-purple-400/30 text-purple-400'}`}
            >
              <Terminal size={12} />
              {introspectionMode ? 'Introspection Active' : 'Introspection Mode'}
            </button>
          </div>
        </div>

        {introspectionMode ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 rounded-2xl p-4 border border-purple-500/20 jetbrains-mono text-[10px] text-purple-300 space-y-2 h-48 overflow-y-auto"
          >
            <div className="flex gap-2"><span className="text-purple-500">[SYSTEM]</span> Initializing recursive self-audit...</div>
            <div className="flex gap-2"><span className="text-purple-500">[DAEMON]</span> Substrate stability at 0.994. Restoring force nominal.</div>
            <div className="flex gap-2"><span className="text-purple-500">[SIGMA]</span> Confidence ρ=0.999. Convergence achieved.</div>
            <div className="flex gap-2"><span className="text-purple-500">[FRACTAL]</span> Rendering manifold depth 12...</div>
            <div className="flex gap-2"><span className="text-purple-500">[AGI]</span> Goal alignment attractor shifted to (0.42, 0.88).</div>
            <div className="text-gray-600 mt-4 animate-pulse">_ Listening for substrate fluctuations...</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: 'Bio-Logics', val: '99.2%', icon: Database, color: 'text-purple-400' },
              { label: 'Ethical M_E', val: 'Stable', icon: ShieldCheck, color: 'text-pink-400' },
              { label: 'Latent Space', val: 'Hilbert-4', icon: Zap, color: 'text-indigo-400' },
              { label: 'Sync Rate', val: '4.2ms', icon: Activity, color: 'text-fuchsia-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group/stat relative overflow-hidden">
                <stat.icon size={16} className={`${stat.color} mb-2 group-hover/stat:scale-110 transition-transform`} />
                <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
                <div className="text-base md:text-lg font-black text-white">{stat.val}</div>
                {/* Micro-fractal detail */}
                <div className="absolute -bottom-1 -right-1 opacity-5">
                  <stat.icon size={32} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 h-32 md:h-48 bg-gradient-to-t from-cyan-900/10 to-transparent rounded-2xl border border-white/5 flex items-end p-4 gap-1 overflow-hidden relative group/manifold">
           {/* Manifold Mesh Visual */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="transition-transform duration-1000 group-hover/manifold:scale-110">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M 0 ${50 + i * 15} Q 100 ${20 + i * 10} 200 ${50 + i * 15} T 400 ${50 + i * 15}`}
                    stroke="url(#manifoldGrad)"
                    strokeWidth="0.5"
                    fill="none"
                    animate={{
                      d: [
                        `M 0 ${50 + i * 15} Q 100 ${20 + i * 10} 200 ${50 + i * 15} T 400 ${50 + i * 15}`,
                        `M 0 ${70 + i * 15} Q 150 ${80 + i * 10} 200 ${20 + i * 15} T 400 ${70 + i * 15}`,
                        `M 0 ${50 + i * 15} Q 100 ${20 + i * 10} 200 ${50 + i * 15} T 400 ${50 + i * 15}`
                      ]
                    }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
                <defs>
                  <linearGradient id="manifoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
           </div>

          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="flex-1 rounded-t-full transition-all duration-1000" 
              animate={{
                height: `${20 + Math.sin(i * 0.3 + Date.now() / 1000) * 30 + Math.random() * 30}%`,
                backgroundColor: i % 2 === 0 ? 'rgba(34, 211, 238, 0.3)' : 'rgba(139, 92, 246, 0.3)'
              }}
              style={{ opacity: 0.1 + (i / 50) * 0.5 }} 
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em] font-display">Neural Topology Manifold Projection</span>
          </div>
        </div>
      </div>

      {/* Σ-Matrix: The Core Metric */}
      <div className="md:col-span-4 glass-panel p-4 md:p-6 rounded-3xl border-l-4 border-l-purple-500/50 relative overflow-hidden">
        <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-4">Alignment Gauge</h2>
        <SigmaMatrix sigma={sigma} />
        <div className="mt-6 space-y-4 relative z-10">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-gray-500">Confidence (ρ)</span>
            <span className="text-purple-400">{(sigma.confidence * 100).toFixed(3)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
              style={{ width: `${sigma.confidence * 100}%` }} 
            />
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed italic font-medium">
            Satisfies Robbins-Monro convergence conditions almost surely. Lyapunov V(t) minimized.
          </p>
        </div>
      </div>

      {/* Advanced Substrate Protocols */}
      <div className="md:col-span-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600 flex items-center gap-2">
            <Cpu size={14} /> Substrate Protocols
          </h3>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
        </div>
        <SubstrateProtocols />
      </div>

      {/* Omega Nodes Overview */}
      <div className="md:col-span-8 glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 font-display">
            <Activity size={16} /> Swarm Telemetry
          </h3>
          <span className="text-[10px] jetbrains-mono text-cyan-500">M-Agents Count: 0x07AF</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {['EchoNode-1', 'EchoNode-2', 'EchoNode-3', 'EchoNode-4', 'EchoNode-5'].map((name, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 group/node hover:border-cyan-500/30 transition-all cursor-crosshair">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981] group-hover/node:animate-ping" />
              <span className="text-xs font-bold text-gray-300">{name}</span>
              <span className="text-[10px] text-cyan-600 jetbrains-mono">{(0.98 - i * 0.01).toFixed(2)}s</span>
            </div>
          ))}
          <div className="flex items-center gap-3 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/30 group/more transition-all hover:bg-cyan-500/20">
            <span className="text-xs font-bold text-cyan-400 tracking-tighter cursor-pointer font-display">View All Node Vectors →</span>
          </div>
        </div>
      </div>

      {/* Next-Gen: Autonomous Evolution HUD */}
      <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <RefreshCcw size={64} className="animate-spin-slow" />
         </div>
         <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4 font-display flex items-center gap-2">
            <Zap size={14} className="animate-pulse" /> Self-Evolution Substrate
         </h2>
         
         <div className="space-y-5 relative z-10">
            {[
               { label: 'Substrate Optimization', val: 94.2, color: 'bg-cyan-400', shadow: 'shadow-[0_0_10px_#22d3ee]' },
               { label: 'Heuristic Refinement', val: 82.5, color: 'bg-purple-500', shadow: 'shadow-[0_0_10px_#8b5cf6]' },
               { label: 'Entropy Neutralization', val: 12.4, color: 'bg-pink-500', shadow: 'shadow-[0_0_10px_#d946ef]' }
            ].map((ev, i) => (
               <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{ev.label}</span>
                     <span className="text-[10px] font-bold text-white jetbrains-mono">{ev.val}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${ev.val}%` }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                        className={`h-full ${ev.color} ${ev.shadow}`}
                     />
                  </div>
               </div>
            ))}
            <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <Cpu size={14} className="text-cyan-400" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[8px] text-gray-600 uppercase font-bold tracking-widest">Target Convergence</span>
                      <span className="text-xs font-black text-white font-display">T+14.2ms to Singular_State</span>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
