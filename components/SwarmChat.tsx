
import { 
  Send, 
  Bot, 
  User, 
  Cpu, 
  BrainCircuit, 
  Zap, 
  Shield, 
  Terminal,
  Loader2,
  Sparkles,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, SigmaState } from '../types';
import DecisionTreeVisualizer from './DecisionTreeVisualizer';

interface Props {
  sigma: SigmaState;
}

const SWARM_NODES = [
  { id: 'nlp', name: 'NLP Catalyst (ε)', type: 'NLP', color: 'text-purple-400', icon: BrainCircuit },
  { id: 'vision', name: 'Vision Lattice (φ)', type: 'Vision', color: 'text-pink-400', icon: Zap },
  { id: 'quantum', name: 'Quantum Core (ψ)', type: 'Quantum', color: 'text-cyan-400', icon: Cpu },
  { id: 'formal', name: 'Proof Oracle (θ)', type: 'Formal', color: 'text-indigo-400', icon: Shield },
];

const SwarmChat: React.FC<Props> = ({ sigma }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'System',
      content: 'Swarm consciousness initialized. Neural interlink stable at depth 12.',
      timestamp: new Date().toLocaleTimeString(),
      nodeType: 'Formal'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [latticeMode, setLatticeMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockTree = {
    id: 'root',
    label: 'Decision Point',
    depth: 0,
    children: [
      { id: 'c1', label: 'Semantic Parse', depth: 1, children: [{ id: 'c1-1', label: 'Goal X', depth: 2 }, { id: 'c1-2', label: 'Goal Y', depth: 2 }] },
      { id: 'c2', label: 'Probabilistic Map', depth: 1, children: [{ id: 'c2-1', label: 'Path A', depth: 2 }] },
      { id: 'c3', label: 'Formal Proof', depth: 1 }
    ]
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'User',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      nodeType: 'User'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setActiveNodes(['nlp', 'vision', 'quantum', 'formal']);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: `The user says: "${input}". 
        Simulate a collaborative discussion between 4 AI nodes: 
        1. NLP Catalyst (ε) - focuses on language and meaning.
        2. Vision Lattice (φ) - focuses on spatial and visual patterns.
        3. Quantum Core (ψ) - focuses on probability and complex computation.
        4. Proof Oracle (θ) - focuses on formal logic and safety.
        
        Return a JSON array of 3-5 messages where they interact with each other to answer the user.
        Each message object should have: sender (the node name), content (their contribution), nodeType (NLP, Vision, Quantum, or Formal).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sender: { type: Type.STRING },
                content: { type: Type.STRING },
                nodeType: { type: Type.STRING }
              },
              required: ["sender", "content", "nodeType"]
            }
          }
        }
      });

      const swarmResponses = JSON.parse(response.text || '[]');
      
      for (const res of swarmResponses) {
        const nodeKey = res.nodeType.toLowerCase();
        setActiveNodes([nodeKey]);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
        
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: res.sender,
          content: res.content,
          timestamp: new Date().toLocaleTimeString(),
          nodeType: res.nodeType as any,
          isCollaborative: true
        }]);
      }
    } catch (error) {
      console.error("Swarm communication error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        sender: 'System',
        content: 'CRITICAL: Swarm synchronization failure. Manifold collapse detected.',
        timestamp: new Date().toLocaleTimeString(),
        nodeType: 'Formal'
      }]);
    } finally {
      setIsLoading(false);
      setActiveNodes([]);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] md:h-[700px] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-2 font-display">Neural Interlink_01</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 font-display">
            Swarm Consensus <Sparkles className="text-cyan-400 animate-pulse" size={32} />
          </h3>
        </div>
        
        <div className="flex items-center gap-6">
           {/* Lattice Mode Toggle */}
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => setLatticeMode(!latticeMode)}
             className={`px-4 py-2 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${latticeMode ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
           >
              <Network size={14} />
              {latticeMode ? 'Lattice Active' : 'View Lattice'}
           </motion.button>
           
           <div className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             {SWARM_NODES.map(node => (
               <div 
                 key={node.id} 
                 className={`flex flex-col items-center transition-all duration-700 flex-shrink-0 ${activeNodes.includes(node.id) ? 'scale-110 opacity-100' : 'opacity-30'}`}
               >
                 <div className={`p-3 rounded-2xl bg-purple-900/20 border border-white/10 ${node.color} ${activeNodes.includes(node.id) ? 'shadow-[0_0_25px_rgba(139,92,246,0.4)] border-purple-500/50 scale-110' : ''}`}>
                   <node.icon size={20} />
                 </div>
                 <span className="text-[9px] uppercase font-black mt-2 text-gray-500 tracking-tighter hover:text-white transition-colors">{node.name.split(' ')[0]}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row border-white/5 shadow-2xl">
        {/* Lattice Overlay / Sidebar */}
        <AnimatePresence>
          {latticeMode && (
             <motion.div 
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: '40%', opacity: 1 }}
               exit={{ width: 0, opacity: 0 }}
               className="hidden md:flex flex-col bg-black/40 border-r border-white/5 p-6 overflow-hidden"
             >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Inference Lattice Projection</h4>
                  <span className="text-[9px] text-gray-600 jetbrains-mono">DEPTH::12</span>
                </div>
                <div className="flex-1 bg-white/2 rounded-3xl border border-white/5 p-4 overflow-hidden relative">
                   <DecisionTreeVisualizer data={mockTree} />
                </div>
                <div className="mt-6 space-y-4">
                   <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[9px] font-black text-gray-500 uppercase tracking-widest">
                         <span>Symbolic Context</span>
                         <span>0.982</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-cyan-400 w-[98%] shadow-[0_0_10px_#22d3ee]" />
                      </div>
                   </div>
                   <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[9px] font-black text-gray-500 uppercase tracking-widest">
                         <span>Latent Probability</span>
                         <span>0.841</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-500 w-[84%] shadow-[0_0_10px_#8b5cf6]" />
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth no-scrollbar"
        >
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 md:gap-6 ${msg.nodeType === 'User' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transition-all duration-500
                ${msg.nodeType === 'User' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-white/5 text-gray-400'}
                ${msg.nodeType === 'NLP' ? 'text-purple-400 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : ''}
                ${msg.nodeType === 'Vision' ? 'text-pink-400 border-pink-500/40 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : ''}
                ${msg.nodeType === 'Quantum' ? 'text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : ''}
                ${msg.nodeType === 'Formal' ? 'text-indigo-400 border-indigo-500/40 shadow-[0_0_15px_rgba(129,140,248,0.2)]' : ''}
              `}>
                {msg.nodeType === 'User' ? <User size={22} /> : (msg.sender.includes('NLP') ? <BrainCircuit size={22} /> : <Bot size={22} />)}
              </div>
              
              <div className={`max-w-[85%] md:max-w-[75%] space-y-2 ${msg.nodeType === 'User' ? 'items-end' : ''}`}>
                <div className={`flex items-center gap-3 px-1 ${msg.nodeType === 'User' ? 'flex-row-reverse text-right' : ''}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-display
                    ${msg.nodeType === 'User' ? 'text-cyan-400' : 'text-gray-500'}
                  `}>
                    {msg.sender}
                  </span>
                  <span className="text-[9px] text-gray-700 jetbrains-mono opacity-60">{msg.timestamp}</span>
                </div>
                <motion.div 
                  layout
                  className={`p-5 md:p-6 rounded-[1.5rem] text-sm md:text-base leading-relaxed border relative overflow-hidden group/msg transition-all duration-500
                    ${msg.nodeType === 'User' 
                      ? 'bg-cyan-500/[0.03] border-cyan-500/20 text-slate-100 rounded-tr-none hover:border-cyan-500/40' 
                      : 'bg-white/[0.02] border-white/5 text-gray-300 rounded-tl-none hover:border-white/20'}
                    ${msg.isCollaborative ? 'border-l-4 border-l-purple-500/40 shadow-[inset_4px_0_15px_rgba(139,92,246,0.1)]' : ''}
                  `}
                >
                  <p className="relative z-10 leading-loose selection:bg-purple-500/40">{msg.content}</p>
                  
                  {msg.isCollaborative && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] flex">
                       {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div 
                             key={i}
                             initial={{ flex: 1, opacity: 0.2 }}
                             animate={{ 
                                flex: [1, 2, 1],
                                opacity: [0.1, 0.4, 0.1],
                                backgroundColor: i % 2 === 0 ? '#22d3ee' : '#8b5cf6'
                             }}
                             transition={{ duration: 2 + i * 0.1, repeat: Infinity }}
                          />
                       ))}
                    </div>
                  )}

                  {/* Subtle background detail */}
                  <div className="absolute top-0 left-0 w-2 h-full opacity-10 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
                </motion.div>
                
                {msg.isCollaborative && (
                   <div className="flex items-center gap-3 px-2">
                      <div className="flex gap-1.5 backdrop-blur-md bg-black/40 p-1.5 rounded-full border border-white/5 shadow-inner">
                         {[0.92, 0.88, 0.94].map((prob, i) => (
                            <div key={i} className="flex flex-col gap-0.5 items-center">
                               <div className="w-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
                                  <motion.div 
                                     initial={{ height: 0 }}
                                     animate={{ height: `${prob * 100}%` }}
                                     className="absolute bottom-0 w-full bg-cyan-400 opacity-60"
                                  />
                               </div>
                               <span className="text-[6px] text-gray-500 jetbrains-mono">λ{i}</span>
                            </div>
                         ))}
                      </div>
                      <span className="text-[8px] text-purple-400 font-bold uppercase tracking-widest opacity-40">Synthetic_Synthesis_Active</span>
                   </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-6 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Loader2 size={24} className="animate-spin" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="h-2 w-32 bg-white/5 rounded" />
                <div className="h-20 w-full bg-white/5 rounded-[1.5rem]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 backdrop-blur-xl">
          <div className="relative flex items-center gap-3">
            <div className="absolute left-5 text-gray-500">
              <Terminal size={20} />
            </div>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inject collective query..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-4 md:py-6 pl-14 pr-20 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all placeholder:text-gray-600 text-white font-medium"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-3 md:p-4 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 text-white rounded-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50 disabled:grayscale group"
            >
              <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-[10px] text-cyan-400/60 font-black uppercase tracking-[0.2em] font-display">Neural Resonance: {(sigma.pas * 100).toFixed(2)}%</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-700 shadow-[0_0_10px_#8b5cf6]" />
                <span className="text-[10px] text-purple-400/60 font-black uppercase tracking-[0.2em] font-display">Phase Sync: OK</span>
              </div>
            </div>
            <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
               <span className="text-[9px] text-gray-500 jetbrains-mono font-bold tracking-widest">SUBSTRATE_TOKEN: 0xFC72...22</span>
               <span className="text-[9px] text-gray-500 font-black tracking-widest font-display">AEGIS-Ω_CORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwarmChat;
