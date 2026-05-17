
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
  Palette,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';
import FractalBackground from './components/FractalBackground';
import Dashboard from './components/Dashboard';
import NodeManager from './components/NodeManager';
import EpinoeticFoundry from './components/EpinoeticFoundry';
import SwarmChat from './components/SwarmChat';
import FractalGenerator from './components/FractalGenerator';
import LatentNavigator from './components/LatentNavigator';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import { SystemStatus, SigmaState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'landing' | 'loading' | 'main'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nodes' | 'foundry' | 'swarm-chat' | 'generator' | 'latent'>('dashboard');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('STABLE');
  const [saliencyActive, setSaliencyActive] = useState(false);
  const [spatialMode, setSpatialMode] = useState(false);
  const [sigma, setSigma] = useState<SigmaState>({
    pas: 0.942,
    confidence: 0.999,
    restoringForce: 0.12,
    manifoldStability: 0.985,
    resonance: 0.934,
    entropy: 0.12,
    coherence: 0.982
  });

  // Simulate dynamic fluctuations in the PAS and next-gen metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setSigma(prev => {
        const jitter = (Math.random() - 0.5) * 0.002;
        const newPas = Math.min(0.999, Math.max(0.92, prev.pas + jitter));
        return {
          ...prev,
          pas: newPas,
          confidence: 0.998 + (Math.random() * 0.001),
          resonance: Math.min(0.99, Math.max(0.85, (prev.resonance || 0.9) + (Math.random() - 0.5) * 0.01)),
          entropy: Math.min(0.3, Math.max(0.05, (prev.entropy || 0.1) + (Math.random() - 0.5) * 0.005)),
          coherence: Math.min(0.995, Math.max(0.95, (prev.coherence || 0.98) + (Math.random() - 0.5) * 0.002))
        };
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyLockdown = () => {
    setSystemStatus('LOCKDOWN');
  };

  const handleReset = () => {
    setSystemStatus('INITIALIZING');
    setTimeout(() => setSystemStatus('STABLE'), 3000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-slate-100 bg-[#030308] selection:bg-purple-500/30">
      <FractalBackground pas={sigma.pas} />

      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(30px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-[60]"
          >
            <LandingPage onStart={() => setAppState('loading')} />
          </motion.div>
        )}

        {appState === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4, filter: 'blur(40px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-[60]"
          >
            <LoadingScreen onComplete={() => setAppState('main')} />
          </motion.div>
        )}

        {appState === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Top Status Bar */}
            <header className="h-20 md:h-24 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={() => setAppState('landing')}
                  >
                    <Logo size={48} />
                  </motion.div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-black tracking-tighter uppercase font-display leading-none">AEGIS-<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ω</span></h1>
                    <p className="text-[10px] text-purple-400 font-bold tracking-[0.25em] uppercase opacity-60">Neural Substrate V3.2</p>
                  </div>
                </div>
                
                <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                
                <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar py-2">
                  <div className="flex flex-col min-w-fit">
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Coherence</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${systemStatus === 'LOCKDOWN' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`} />
                      <span className={`text-xs font-black uppercase tracking-widest font-display ${systemStatus === 'LOCKDOWN' ? 'text-red-500' : 'text-cyan-400'}`}>{systemStatus}</span>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col min-w-fit">
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Inference Confidence</span>
                    <span className="text-xs font-black text-white uppercase tracking-widest font-display">ρ = {(sigma.confidence * 100).toFixed(4)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-5">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSpatialMode(!spatialMode)}
                  className={`p-3 rounded-2xl transition-all ${spatialMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'hover:bg-white/5 text-gray-400'}`}
                >
                  <Box size={20} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSaliencyActive(!saliencyActive)}
                  className={`p-3 rounded-2xl transition-all ${saliencyActive ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'hover:bg-white/5 text-gray-400'}`}
                >
                  <Search size={20} />
                </motion.button>
                <div className="hidden sm:flex gap-3">
                  <button onClick={handleReset} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-gray-400 border border-transparent hover:border-white/10">
                    <RefreshCcw size={20} />
                  </button>
                  <button onClick={handleEmergencyLockdown} className="p-3 hover:bg-red-500/10 rounded-2xl transition-colors text-red-500/60 border border-transparent hover:border-red-500/20">
                    <Lock size={20} />
                  </button>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-500/30 p-1 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop" 
                    alt="User" 
                    className="w-full h-full rounded-full object-cover grayscale brightness-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 relative perspective-2000">
               {/* Saliency Attractor Visual - Restored and updated for Spatial Mode */}
               <AnimatePresence>
                 {saliencyActive && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0 }}
                     className="fixed right-10 top-32 w-32 h-32 pointer-events-none z-0"
                   >
                      <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff]" />
                         {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div 
                               key={i}
                               animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                               transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
                               className="absolute w-20 h-20 border border-purple-500/30 rounded-full"
                               style={{ transform: `rotate(${i * 60}deg) scale(${1 + i * 0.2})` }}
                            />
                         ))}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               <div 
                 className={`max-w-7xl mx-auto w-full h-full relative z-10 transition-all duration-1000 ease-out ${spatialMode ? 'rotate-x-2' : ''}`}
                 style={{ 
                   transform: spatialMode ? 'perspective(2000px) rotateX(10deg) rotateY(2deg) scale(0.95)' : 'none',
                   transformStyle: 'preserve-3d'
                 }}
               >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    {activeTab === 'dashboard' && <Dashboard sigma={sigma} systemStatus={systemStatus} />}
                    {activeTab === 'nodes' && <NodeManager />}
                    {activeTab === 'foundry' && <EpinoeticFoundry sigma={sigma} />}
                    {activeTab === 'swarm-chat' && <SwarmChat sigma={sigma} />}
                    {activeTab === 'generator' && <FractalGenerator />}
                    {activeTab === 'latent' && <LatentNavigator sigma={sigma} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="h-24 md:h-28 px-4 md:px-10 border-t border-purple-500/10 bg-black/60 backdrop-blur-3xl sticky bottom-0 z-50 flex items-center justify-center">
              <div className="flex items-center gap-2 md:gap-6 bg-white/5 p-2 rounded-3xl border border-white/10 shadow-2xl">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Matrix' },
                  { id: 'nodes', icon: Cpu, label: 'Swarm' },
                  { id: 'foundry', icon: BrainCircuit, label: 'Foundry' },
                  { id: 'latent', icon: Orbit, label: 'Navigator' },
                  { id: 'swarm-chat', icon: Terminal, label: 'Chat' },
                  { id: 'generator', icon: Palette, label: 'Fractals' }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-[0_10px_30px_rgba(139,92,246,0.5)]' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                  >
                    <tab.icon size={22} className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] font-display hidden sm:block ${activeTab === tab.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="navTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 -z-10"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
