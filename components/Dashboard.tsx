
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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pb-12">
      {/* System Status: Authority */}
      <div className="md:col-span-8 glass-panel p-4 md:p-6 rounded-3xl relative overflow-hidden group border-purple-500/20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-1">HQCI-QSCE Substrate</h2>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Cognitive Modules</h3>
          </div>
          <div className="px-3 py-1 bg-purple-500/10 border border-purple-400/30 rounded-full text-purple-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Polymathic Engine
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Bio-Logics', val: '99.2%', icon: Database, color: 'text-purple-400' },
            { label: 'Ethical M_E', val: 'Stable', icon: ShieldCheck, color: 'text-pink-400' },
            { label: 'Latent Space', val: 'Hilbert-4', icon: Zap, color: 'text-cyan-400' },
            { label: 'Sync Rate', val: '4.2ms', icon: Globe, color: 'text-indigo-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group/stat">
              <stat.icon size={16} className={`${stat.color} mb-2 group-hover/stat:scale-110 transition-transform`} />
              <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
              <div className="text-base md:text-lg font-black text-white">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* TT-SVD Visualization Placeholder */}
        <div className="mt-8 h-32 md:h-40 bg-gradient-to-t from-purple-900/10 to-transparent rounded-2xl border border-white/5 flex items-end p-4 gap-1 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-purple-500/30 rounded-t-sm" 
              style={{ 
                height: `${20 + Math.sin(i * 0.5 + Date.now() / 1000) * 40 + Math.random() * 40}%`,
                opacity: 0.2 + (i / 40) * 0.6
              }} 
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 p-4 text-[9px] text-purple-500/20 jetbrains-mono pointer-events-none">
          Factorizing Hidden States... TT-SVD_RANK=128
        </div>
      </div>

      {/* Σ-Matrix: The Core Metric */}
      <div className="md:col-span-4 glass-panel p-4 md:p-6 rounded-3xl border-l-4 border-l-purple-500/50">
        <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-4">Alignment Gauge</h2>
        <SigmaMatrix sigma={sigma} />
        <div className="mt-6 space-y-4">
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
