
import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, SigmaState } from '../types';

interface Props {
  sigma: SigmaState;
}

const SWARM_NODES = [
  { id: 'nlp', name: 'NLP Catalyst (ε)', type: 'NLP', color: 'text-cyan-400', icon: BrainCircuit },
  { id: 'vision', name: 'Vision Lattice (φ)', type: 'Vision', color: 'text-purple-400', icon: Zap },
  { id: 'quantum', name: 'Quantum Core (ψ)', type: 'Quantum', color: 'text-blue-400', icon: Cpu },
  { id: 'formal', name: 'Proof Oracle (θ)', type: 'Formal', color: 'text-emerald-400', icon: Shield },
];

const SwarmChat: React.FC<Props> = ({ sigma }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'System',
      content: 'Swarm consciousness initialized. Ready for multi-node collaboration.',
      timestamp: new Date().toLocaleTimeString(),
      nodeType: 'Formal'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        model: "gemini-3-flash-preview",
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
      
      // Simulate sequential typing/thinking
      for (const res of swarmResponses) {
        // Highlight the specific node that is responding
        const nodeKey = res.nodeType.toLowerCase();
        setActiveNodes([nodeKey]);
        
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1200));
        
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
        content: 'CRITICAL: Swarm synchronization failure. Z3 Satisfiability check timed out.',
        timestamp: new Date().toLocaleTimeString(),
        nodeType: 'Formal'
      }]);
    } finally {
      setIsLoading(false);
      setActiveNodes([]);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xs font-bold text-cyan-600 uppercase tracking-[0.2em] mb-1">Neural Interlink</h2>
          <h3 className="text-3xl font-black text-white flex items-center gap-3">
            Swarm Consensus <Sparkles className="text-cyan-400" size={24} />
          </h3>
        </div>
        <div className="flex gap-4">
          {SWARM_NODES.map(node => (
            <div 
              key={node.id} 
              className={`flex flex-col items-center transition-all duration-500 ${activeNodes.includes(node.id) ? 'scale-110 opacity-100' : 'opacity-40 grayscale'}`}
            >
              <div className={`p-2 rounded-lg bg-black/40 border border-white/10 ${node.color} ${activeNodes.includes(node.id) ? 'shadow-[0_0_15px_rgba(0,255,255,0.3)] border-cyan-500/50' : ''}`}>
                <node.icon size={16} />
              </div>
              <span className="text-[8px] uppercase font-bold mt-1 text-gray-500">{node.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col border-white/5">
        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.nodeType === 'User' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg
                ${msg.nodeType === 'User' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-black/40 text-gray-400'}
                ${msg.nodeType === 'NLP' ? 'text-cyan-400 border-cyan-500/30' : ''}
                ${msg.nodeType === 'Vision' ? 'text-purple-400 border-purple-500/30' : ''}
                ${msg.nodeType === 'Quantum' ? 'text-blue-400 border-blue-500/30' : ''}
                ${msg.nodeType === 'Formal' ? 'text-emerald-400 border-emerald-500/30' : ''}
              `}>
                {msg.nodeType === 'User' ? <User size={20} /> : <Bot size={20} />}
              </div>
              
              <div className={`max-w-[80%] space-y-1 ${msg.nodeType === 'User' ? 'items-end' : ''}`}>
                <div className="flex items-center gap-2 px-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest
                    ${msg.nodeType === 'User' ? 'text-cyan-400' : 'text-gray-500'}
                  `}>
                    {msg.sender}
                  </span>
                  <span className="text-[8px] text-gray-700 jetbrains-mono">{msg.timestamp}</span>
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed border
                  ${msg.nodeType === 'User' 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-50 rounded-tr-none' 
                    : 'bg-white/5 border-white/10 text-gray-300 rounded-tl-none'}
                  ${msg.isCollaborative ? 'border-l-2 border-l-cyan-500/50' : ''}
                `}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-cyan-400">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-2 w-24 bg-white/5 rounded" />
                <div className="h-12 w-full bg-white/5 rounded-2xl" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/5">
          <div className="relative flex items-center gap-2">
            <div className="absolute left-4 text-cyan-500/50">
              <Terminal size={16} />
            </div>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inject query into the swarm..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-16 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:grayscale"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex justify-between items-center px-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] text-cyan-600 font-bold uppercase tracking-tighter">PAS Alignment: {(sigma.pas * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">Z3 SAT: VALID</span>
              </div>
            </div>
            <span className="text-[9px] text-gray-600 jetbrains-mono">AEGIS-Ω v4.2.1-STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwarmChat;
