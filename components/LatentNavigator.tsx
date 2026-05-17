
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Target, 
  Move, 
  Layers, 
  Activity, 
  Orbit, 
  Network,
  Maximize2,
  Cpu
} from 'lucide-react';
import { SigmaState } from '../types';

interface ThoughtCluster {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  relevance: number;
  connections: string[];
  type: 'concept' | 'memory' | 'intent' | 'logic';
}

interface Props {
  sigma: SigmaState;
}

const LatentNavigator: React.FC<Props> = ({ sigma }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [viewDepth, setViewDepth] = useState(0.5);
  const [selectedTopic, setSelectedTopic] = useState<ThoughtCluster | null>(null);

  // Generate fractal clusters
  const clusters: ThoughtCluster[] = useMemo(() => [
    { id: '1', label: 'Semantic Manifold', x: 200, y: 150, z: 20, relevance: 0.95, connections: ['2', '4'], type: 'concept' },
    { id: '2', label: 'Cortex Stability', x: 450, y: 300, z: -10, relevance: 0.88, connections: ['1', '3'], type: 'intent' },
    { id: '3', label: 'Quantum Entropy', x: 100, y: 400, z: 50, relevance: 0.72, connections: ['2'], type: 'logic' },
    { id: '4', label: 'Epinoetic Resonance', x: 600, y: 100, z: -30, relevance: 0.98, connections: ['1', '5'], type: 'concept' },
    { id: '5', label: 'Temporal Drift', x: 700, y: 450, z: 10, relevance: 0.65, connections: ['4'], type: 'memory' },
    { id: '6', label: 'Neural Flux', x: 300, y: 550, z: 40, relevance: 0.82, connections: ['2', '7'], type: 'intent' },
    { id: '7', label: 'Formal SAT Layer', x: 500, y: 500, z: 0, relevance: 0.99, connections: ['6'], type: 'logic' }
  ], []);

  const getPos = (c: ThoughtCluster) => {
    // Basic 3D projection to 2D
    const scale = 1 + (c.z * 0.005);
    return {
      x: c.x * scale,
      y: c.y * scale,
      scale
    };
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] mb-2 font-display">Spatial_Inference_Manifold</h2>
          <h3 className="text-4xl font-black text-white flex items-center gap-4 font-display">
            Latent Navigator <Layers className="text-purple-500 animate-pulse" size={32} />
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
           <div className="flex flex-col items-end px-4 border-r border-white/10">
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Depth Precision</span>
              <span className="text-lg font-black text-cyan-400 font-display">{(viewDepth * 100).toFixed(1)}%</span>
           </div>
           <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.01" 
              value={viewDepth} 
              onChange={(e) => setViewDepth(parseFloat(e.target.value))}
              className="w-32 accent-cyan-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
           />
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* The Spatial Field */}
        <div className="flex-1 glass-panel rounded-[2.5rem] relative overflow-hidden bg-black/40 border-white/5 cursor-crosshair group">
           {/* Grid Lines */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                 <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                 </linearGradient>
              </defs>
              {clusters.map(c => c.connections.map(targetId => {
                 const target = clusters.find(tc => tc.id === targetId);
                 if (!target) return null;
                 const start = getPos(c);
                 const end = getPos(target);
                 return (
                    <motion.line
                       key={`${c.id}-${targetId}`}
                       x1={start.x} y1={start.y}
                       x2={end.x} y2={end.y}
                       stroke="url(#beamGrad)"
                       strokeWidth={1}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 0.3 }}
                       className="transition-all duration-700"
                    />
                 );
              }))}
           </svg>

           {/* Nodes */}
           {clusters.map((c) => {
              const pos = getPos(c);
              const isActive = hoveredNode === c.id || selectedTopic?.id === c.id;
              
              return (
                 <motion.div
                    key={c.id}
                    className="absolute cursor-pointer z-20"
                    style={{ left: pos.x, top: pos.y, x: '-50%', y: '-50%' }}
                    onHoverStart={() => setHoveredNode(c.id)}
                    onHoverEnd={() => setHoveredNode(null)}
                    onClick={() => setSelectedTopic(c)}
                    animate={{ 
                       scale: isActive ? 1.2 : pos.scale,
                       opacity: (sigma.resonance || 0.8) > 0.5 ? 1 : 0.5
                    }}
                 >
                    <div className="relative group">
                       <motion.div 
                          animate={{ 
                             boxShadow: isActive ? '0 0 30px rgba(34, 211, 238, 0.6)' : '0 0 0px rgba(0,0,0,0)',
                             borderColor: isActive ? '#22d3ee' : 'rgba(255,255,255,0.1)'
                          }}
                          className={`w-4 h-4 rounded-full border-2 bg-black flex items-center justify-center transition-colors ${isActive ? 'bg-cyan-400' : ''}`}
                       >
                          <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-black' : 'bg-white/40'}`} />
                       </motion.div>
                       
                       {(isActive || pos.scale > 1.2) && (
                          <motion.div 
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 20 }}
                             className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-xl whitespace-nowrap backdrop-blur-xl z-30"
                          >
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">{c.label}</span>
                             <div className="flex items-center gap-2 mt-1">
                                <div className="h-0.5 w-8 bg-cyan-500/30 rounded-full overflow-hidden">
                                   <div className="h-full bg-cyan-400" style={{ width: `${c.relevance * 100}%` }} />
                                </div>
                                <span className="text-[8px] text-gray-500 jetbrains-mono">ρ:{c.relevance}</span>
                             </div>
                          </motion.div>
                       )}
                    </div>
                 </motion.div>
              );
           })}

           {/* Floating Macro HUD */}
           <div className="absolute top-8 left-8 flex flex-col gap-4 pointer-events-none">
              <div className="bg-black/60 border border-white/5 backdrop-blur-md p-4 rounded-3xl space-y-3">
                 <div className="flex items-center gap-3">
                    <Target size={14} className="text-cyan-400" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Focus Lock</span>
                 </div>
                 <div className="space-y-1">
                    <div className="text-xl font-black text-white font-display tracking-tight uppercase">{selectedTopic?.label || 'UNSPECIFIED'}</div>
                    <div className="text-[9px] text-cyan-500/60 font-medium jetbrains-mono">VECTOR_ID: 0x{((selectedTopic?.x || 0) * 100).toString(16).toUpperCase()}</div>
                 </div>
              </div>
           </div>

           {/* Perspective Controls */}
           <div className="absolute bottom-10 right-10 flex flex-col gap-3">
              <button className="p-4 bg-black/60 border border-white/5 hover:border-cyan-500/30 text-gray-500 hover:text-cyan-400 rounded-3xl backdrop-blur-xl transition-all shadow-2xl">
                 <RotateCcw size={20} />
              </button>
              <button className="p-4 bg-black/60 border border-white/5 hover:border-cyan-500/30 text-gray-500 hover:text-cyan-400 rounded-3xl backdrop-blur-xl transition-all shadow-2xl">
                 <Maximize2 size={20} />
              </button>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="w-80 flex flex-col gap-6">
           <div className="glass-panel rounded-[2rem] p-6 border-white/5 space-y-6 flex-1 bg-black/20">
              <div className="flex items-center gap-3 mb-2">
                 <Activity size={18} className="text-purple-400" />
                 <h4 className="text-[11px] font-black text-white uppercase tracking-widest font-display">Manifold Diagnostics</h4>
              </div>
              
              <div className="space-y-6">
                 {[
                    { label: 'Harmonic Alignment', val: sigma.resonance || 0.942, icon: Orbit, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                    { label: 'Latent Diffusion', val: sigma.entropy || 0.125, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Substrate Sync', val: sigma.coherence || 0.985, icon: Network, color: 'text-pink-400', bg: 'bg-pink-500/10' }
                 ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={12} />
                             </div>
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                          </div>
                          <span className="text-xs font-black text-white jetbrains-mono">{(stat.val * 100).toFixed(2)}%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${stat.val * 100}%` }}
                             className={`h-full ${stat.color.replace('text', 'bg')} shadow-[0_0_10px_currentColor]`}
                          />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-white/5 mt-auto">
                 <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                       <Cpu size={14} className="text-cyan-400" />
                       <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Semantic Core Status</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                       "Cognitive state stable. Navigating high-dimensional manifolds. All tensor trains aligned for inference."
                    </p>
                 </div>
              </div>
           </div>

           <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-black uppercase tracking-[0.25em] py-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(139,92,246,0.3)] text-xs border border-white/10"
           >
              Recenter Manifold
           </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LatentNavigator;

const RotateCcw = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);
