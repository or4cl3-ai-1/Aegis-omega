
import React from 'react';
import { SigmaState, SystemStatus } from '../types';
import SigmaMatrix from './SigmaMatrix';
import SubstrateProtocols from './SubstrateProtocols';
import { Activity, ShieldCheck, Database, Zap, Globe, Cpu } from 'lucide-react';

interface Props {
  sigma: SigmaState;
  systemStatus: SystemStatus;
}

const Dashboard: React.FC<Props> = ({ sigma, systemStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
      {/* System Status: Authority */}
      <div className="md:col-span-8 glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xs font-bold text-cyan-600 uppercase tracking-[0.2em] mb-1">HQCI-QSCE Substrate</h2>
            <h3 className="text-2xl font-bold jetbrains-mono">Cognitive Modules</h3>
          </div>
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded text-cyan-400 text-[10px] font-bold uppercase jetbrains-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Polymathic Engine Active
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Bio-Logics', val: '99.2%', icon: Database },
            { label: 'Ethical M_E', val: 'Stable', icon: ShieldCheck },
            { label: 'Latent Space', val: 'Hilbert-4', icon: Zap },
            { label: 'Sync Rate', val: '4.2ms', icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
              <stat.icon size={16} className="text-cyan-400 mb-2" />
              <div className="text-[10px] text-gray-500 uppercase font-bold">{stat.label}</div>
              <div className="text-lg font-bold text-white">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* TT-SVD Visualization Placeholder */}
        <div className="mt-8 h-40 bg-gradient-to-t from-cyan-900/10 to-transparent rounded-xl border border-white/5 flex items-end p-4 gap-1">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-cyan-400/40 rounded-t-sm" 
              style={{ 
                height: `${20 + Math.sin(i * 0.5 + Date.now() / 1000) * 40 + Math.random() * 40}%`,
                opacity: 0.3 + (i / 40) * 0.7
              }} 
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 p-4 text-[10px] text-cyan-500/20 jetbrains-mono pointer-events-none">
          Factorizing Hidden States... TT-SVD_RANK=128
        </div>
      </div>

      {/* Σ-Matrix: The Core Metric */}
      <div className="md:col-span-4 glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500/50">
        <h2 className="text-xs font-bold text-cyan-600 uppercase tracking-[0.2em] mb-4">Alignment Gauge</h2>
        <SigmaMatrix sigma={sigma} />
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Confidence (ρ)</span>
            <span className="text-cyan-400 font-bold jetbrains-mono">{(sigma.confidence * 100).toFixed(3)}%</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-1000" 
              style={{ width: `${sigma.confidence * 100}%` }} 
            />
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed italic">
            Satisfies Robbins-Monro convergence conditions almost surely. Lyapunov V(t) minimized.
          </p>
        </div>
      </div>

      {/* Advanced Substrate Protocols */}
      <div className="md:col-span-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 flex items-center gap-2">
            <Cpu size={14} /> Substrate Protocols
          </h3>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
        </div>
        <SubstrateProtocols />
      </div>

      {/* Omega Nodes Overview */}
      <div className="md:col-span-12 glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Activity size={16} /> Swarm Telemetry
          </h3>
          <span className="text-[10px] jetbrains-mono text-cyan-500">M-Agents Count: 0x07AF</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {['EchoNode-1', 'EchoNode-2', 'EchoNode-3', 'EchoNode-4', 'EchoNode-5'].map((name, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-xs font-bold text-gray-300">{name}</span>
              <span className="text-[10px] text-cyan-600 jetbrains-mono">{(0.98 - i * 0.01).toFixed(2)}s</span>
            </div>
          ))}
          <div className="flex items-center gap-3 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-400 tracking-tighter cursor-pointer hover:underline">View All Node Vectors →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
