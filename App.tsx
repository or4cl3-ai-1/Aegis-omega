
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
  Terminal,
  Palette
} from 'lucide-react';
import FractalBackground from './components/FractalBackground';
import Dashboard from './components/Dashboard';
import NodeManager from './components/NodeManager';
import EpinoeticFoundry from './components/EpinoeticFoundry';
import SwarmChat from './components/SwarmChat';
import FractalGenerator from './components/FractalGenerator';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import { SystemStatus, SigmaState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'landing' | 'loading' | 'main'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nodes' | 'foundry' | 'swarm-chat' | 'generator'>('dashboard');
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

  if (appState === 'landing') {
    return <LandingPage onStart={() => setAppState('loading')} />;
  }

  if (appState === 'loading') {
    return <LoadingScreen onComplete={() => setAppState('main')} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-slate-100 bg-[#050505]">
      <FractalBackground pas={sigma.pas} />

      {/* Top Status Bar */}
      <header className="absolute top-0 left-0 w-full h-16 flex items-center justify-between px-4 md:px-6 glass-panel z-50 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-purple-500/50 animate-spin-slow" />
            <span className="text-xl font-black text-white neon-text-purple">Ω</span>
          </div>
          <h1 className="text-lg md:text-xl font-black tracking-tighter text-white">
            AEGIS-<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Ω</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 jetbrains-mono text-[10px] md:text-xs">
          <div className="flex flex-col items-end">
            <span className="text-purple-600 font-black uppercase tracking-widest">Attractor</span>
            <span className={`font-bold ${systemStatus === 'LOCKDOWN' ? 'text-red-500' : 'text-cyan-400'}`}>
              {systemStatus}
            </span>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-purple-600 font-black uppercase tracking-widest">Entropy</span>
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
          {activeTab === 'generator' && <FractalGenerator />}
        </div>
      </main>

      {/* Bottom Navigation (Sovereignty) */}
      <nav className="absolute bottom-0 left-0 w-full glass-panel z-50 flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-2 md:py-4 border-t border-purple-500/20">
        <div className="flex w-full md:w-auto justify-around md:justify-start gap-1 md:gap-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Matrix' },
            { id: 'nodes', icon: Cpu, label: 'Swarm' },
            { id: 'swarm-chat', icon: Terminal, label: 'Chat' },
            { id: 'generator', icon: Palette, label: 'Gen' },
            { id: 'foundry', icon: BrainCircuit, label: 'Foundry' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center p-2 md:p-3 rounded-xl transition-all flex-1 md:flex-none ${activeTab === tab.id ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/30' : 'text-gray-500 hover:text-purple-300'}`}
            >
              <tab.icon size={18} className="md:w-5 md:h-5" />
              <span className="text-[8px] md:text-[10px] uppercase font-black mt-1 tracking-tighter">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
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
