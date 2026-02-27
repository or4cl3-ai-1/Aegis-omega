
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Shield, 
  Cpu, 
  Database, 
  Zap, 
  Lock, 
  RefreshCcw, 
  Settings, 
  LayoutDashboard,
  Box,
  BrainCircuit,
  Terminal
} from 'lucide-react';
import FractalBackground from './components/FractalBackground';
import Dashboard from './components/Dashboard';
import NodeManager from './components/NodeManager';
import EpinoeticFoundry from './components/EpinoeticFoundry';
import SwarmChat from './components/SwarmChat';
import { SystemStatus, SigmaState } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nodes' | 'foundry' | 'swarm-chat'>('dashboard');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('STABLE');
  const [sigma, setSigma] = useState<SigmaState>({
    pas: 0.934,
    confidence: 0.992,
    restoringForce: 0.85,
    manifoldStability: 0.941
  });

  // Simulate dynamic fluctuations in the PAS (Phase Alignment Score)
  useEffect(() => {
    const interval = setInterval(() => {
      setSigma(prev => {
        const jitter = (Math.random() - 0.5) * 0.005;
        const newPas = Math.min(0.99, Math.max(0.88, prev.pas + jitter));
        return {
          ...prev,
          pas: newPas,
          // Lyapunov convergence simulation
          confidence: 0.99 + (Math.random() * 0.009)
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyLockdown = () => {
    setSystemStatus('LOCKDOWN');
    alert("CRITICAL: Manual Lockdown Engaged. Z3 Satisfiability Return: UNSAT.");
  };

  const handleReset = () => {
    setSystemStatus('INITIALIZING');
    setTimeout(() => setSystemStatus('STABLE'), 3000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-cyan-50">
      <FractalBackground pas={sigma.pas} />

      {/* Top Status Bar */}
      <header className="absolute top-0 left-0 w-full h-16 flex items-center justify-between px-6 glass-panel z-50">
        <div className="flex items-center gap-3">
          <div className="tensor-loader w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent shadow-[0_0_10px_#00ffff]" />
          <h1 className="text-xl font-extrabold tracking-tighter neon-text">
            AEGIS-<span className="text-cyan-400">Ω</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6 jetbrains-mono text-xs">
          <div className="flex flex-col items-end">
            <span className="text-cyan-600 font-bold uppercase tracking-widest">System Attractor</span>
            <span className={`font-bold ${systemStatus === 'LOCKDOWN' ? 'text-red-500' : 'text-cyan-400'}`}>
              {systemStatus}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-cyan-600 font-bold uppercase tracking-widest">Proof Entropy</span>
            <span className="text-white">λ=0.0421</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="absolute inset-0 pt-20 pb-24 overflow-y-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto h-full">
          {activeTab === 'dashboard' && <Dashboard sigma={sigma} systemStatus={systemStatus} />}
          {activeTab === 'nodes' && <NodeManager />}
          {activeTab === 'foundry' && <EpinoeticFoundry sigma={sigma} />}
          {activeTab === 'swarm-chat' && <SwarmChat sigma={sigma} />}
        </div>
      </main>

      {/* Bottom Navigation (Sovereignty) */}
      <nav className="absolute bottom-0 left-0 w-full glass-panel z-50 flex justify-between items-center px-6 py-4">
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-cyan-300'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] uppercase font-bold mt-1">Matrix</span>
          </button>
          <button 
            onClick={() => setActiveTab('nodes')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTab === 'nodes' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-cyan-300'}`}
          >
            <Cpu size={20} />
            <span className="text-[10px] uppercase font-bold mt-1">Swarm</span>
          </button>
          <button 
            onClick={() => setActiveTab('swarm-chat')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTab === 'swarm-chat' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-cyan-300'}`}
          >
            <Terminal size={20} />
            <span className="text-[10px] uppercase font-bold mt-1">Chat</span>
          </button>
          <button 
            onClick={() => setActiveTab('foundry')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTab === 'foundry' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-cyan-300'}`}
          >
            <BrainCircuit size={20} />
            <span className="text-[10px] uppercase font-bold mt-1">Foundry</span>
          </button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
          >
            <RefreshCcw size={20} className="text-gray-400" />
          </button>
          <button 
            onClick={handleEmergencyLockdown}
            className="flex items-center gap-2 px-6 py-2 bg-red-600/20 border border-red-500/50 hover:bg-red-600/40 rounded-full text-red-500 font-bold text-sm tracking-widest uppercase transition-all active:scale-95"
          >
            <Lock size={16} />
            Lockdown
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
