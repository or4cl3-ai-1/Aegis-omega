
import React from 'react';
import { 
  Zap, 
  Map, 
  Maximize, 
  Layers, 
  ShieldCheck, 
  History,
  Activity,
  Cpu
} from 'lucide-react';

const SubstrateProtocols: React.FC = () => {
  const protocols = [
    { 
      name: 'Predictive Latency Reduction', 
      status: 'Active', 
      value: '0.12ms', 
      icon: Zap, 
      color: 'text-purple-400',
      desc: 'Anticipatory packet routing via temporal folding.'
    },
    { 
      name: 'Probabilistic Context Mapping', 
      status: 'Optimizing', 
      value: 'ρ=0.994', 
      icon: Map, 
      color: 'text-pink-400',
      desc: 'High-dimensional semantic manifold projection.'
    },
    { 
      name: 'Dynamic Spatial UI Scaling', 
      status: 'Enabled', 
      value: 'Auto', 
      icon: Maximize, 
      color: 'text-indigo-400',
      desc: 'Fractal responsive layout adaptation.'
    },
    { 
      name: 'AR Overlay Support', 
      status: 'Standby', 
      value: 'Ready', 
      icon: Layers, 
      color: 'text-fuchsia-400',
      desc: 'Holographic projection substrate interface.'
    },
    { 
      name: 'Formal Privacy Verification', 
      status: 'Verified', 
      value: 'Z3_SAT', 
      icon: ShieldCheck, 
      color: 'text-violet-400',
      desc: 'Mathematical proof of zero-leakage constraints.'
    },
    { 
      name: 'Immutable Audit Logging', 
      status: 'Syncing', 
      value: 'Block_42', 
      icon: History, 
      color: 'text-rose-400',
      desc: 'Cryptographic chain of cognitive provenance.'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {protocols.map((p, i) => (
        <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden h-32 hover:h-48 duration-500">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg bg-black/40 border border-white/5 ${p.color}`}>
              <p.icon size={18} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{p.status}</span>
              <span className="text-xs font-bold text-white jetbrains-mono">{p.value}</span>
            </div>
          </div>
          <h4 className="text-xs font-black text-white mb-1 uppercase tracking-tight">{p.name}</h4>
          <p className="text-[9px] text-gray-500 leading-tight mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
            {p.desc}
          </p>
          
          {/* Recursive Detail (Fractal UI Principle: Density) */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 mt-2">
            <div className="flex gap-1 h-8 items-end mb-2">
              {Array.from({ length: 12 }).map((_, j) => (
                <div 
                  key={j} 
                  className={`flex-1 ${p.color.replace('text-', 'bg-')} opacity-30 rounded-t-[1px]`}
                  style={{ height: `${20 + Math.random() * 80}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
              <span>Sub-Metric_α</span>
              <span>Sub-Metric_β</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5 overflow-hidden">
            <div 
              className={`h-full ${p.color.replace('text-', 'bg-')} opacity-40`} 
              style={{ width: `${60 + Math.random() * 40}%` }}
            />
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
            <p.icon size={80} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubstrateProtocols;
