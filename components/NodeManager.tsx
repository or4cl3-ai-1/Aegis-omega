
import React, { useState } from 'react';
import { 
  ChevronRight, 
  Terminal, 
  ShieldAlert, 
  BarChart3, 
  Search,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

const NodeManager: React.FC = () => {
  const [expandedNode, setExpandedNode] = useState<string | null>('node-1');

  const nodes = [
    { id: 'node-1', name: 'NLP Catalyst (ε)', status: 'Optimal', sync: 0.998, load: 42, color: 'text-purple-400' },
    { id: 'node-2', name: 'Vision Lattice (φ)', status: 'Syncing', sync: 0.842, load: 78, color: 'text-pink-400' },
    { id: 'node-3', name: 'Quantum Core (ψ)', status: 'Optimal', sync: 0.999, load: 12, color: 'text-cyan-400' },
    { id: 'node-4', name: 'Proof Oracle (θ)', status: 'Formalizing', sync: 0.921, load: 95, color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-1">Decentralized Swarm</h2>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Ω-Node Configuration</h3>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Query Vector Space..." 
              className="w-full md:w-48 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs focus:border-purple-500/50 outline-none transition-all focus:md:w-64 text-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {nodes.map((node) => (
          <div key={node.id} className="glass-panel rounded-3xl overflow-hidden transition-all duration-300 border-purple-500/10">
            <div 
              className="p-4 md:p-5 flex items-center justify-between cursor-pointer hover:bg-white/5"
              onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`p-3 rounded-2xl bg-purple-900/20 border border-purple-500/20 ${node.color}`}>
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm md:text-base">{node.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_#a855f7]" />
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{node.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">State Density</span>
                  <span className="text-xs md:text-sm font-black text-white jetbrains-mono">{(node.sync * 100).toFixed(2)}%</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Load</span>
                  <span className="text-xs md:text-sm font-black text-white jetbrains-mono">{node.load}%</span>
                </div>
                <ChevronRight 
                  size={18} 
                  className={`text-gray-600 transition-transform duration-300 ${expandedNode === node.id ? 'rotate-90 text-purple-400' : ''}`} 
                />
              </div>
            </div>

            {expandedNode === node.id && (
              <div className="px-4 md:px-5 pb-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal size={14} className="text-purple-400" />
                      <span className="text-[9px] text-purple-600 font-black uppercase tracking-widest">Formal Proof Logs</span>
                    </div>
                    <div className="space-y-2 font-mono text-[9px] text-gray-400 leading-tight">
                      <div className="flex justify-between">
                        <span>[21:42:01] proof_verify(M_E_ALIGN)</span>
                        <span className="text-green-500 font-bold">PASSED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>[21:42:02] singular_value_decomposition</span>
                        <span className="text-purple-500 font-bold">RANK_128</span>
                      </div>
                      <div className="flex justify-between">
                        <span>[21:42:04] lean4_kernel_eval(Z3_SAT)</span>
                        <span className="text-pink-500 font-bold">PROVING...</span>
                      </div>
                      <div className="pt-2 border-t border-white/5 text-gray-600 italic font-medium">
                        Recursive self-similarity detected in hidden layers.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-purple-400" />
                    <span className="text-[9px] text-purple-600 font-black uppercase tracking-widest">Hilbert Vector Distribution</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-purple-500/20 rounded-t-sm"
                        style={{ height: `${30 + Math.random() * 70}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-gray-600 font-black uppercase tracking-widest">DIM_RED: UMAP(n=1024)</span>
                    <button className="text-purple-400 hover:text-purple-200 uppercase font-black tracking-tighter">Tune Hyperparams</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeManager;
