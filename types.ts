
export type SystemStatus = 'INITIALIZING' | 'STABLE' | 'OPTIMIZING' | 'CRITICAL' | 'LOCKDOWN' | 'EVOLVING' | 'TRANSCENDING';

export interface NodeStatus {
  id: string;
  name: string;
  type: 'NLP' | 'Vision' | 'Quantum' | 'Formal' | 'Semantic';
  sync: number;
  health: number;
  lastProof: string;
}

export interface SigmaState {
  pas: number; // Phase Alignment Score
  confidence: number;
  restoringForce: number;
  manifoldStability: number;
  resonance: number;
  entropy: number;
  coherence: number;
}

export interface IntrospectionLog {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'proof';
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  nodeType?: 'NLP' | 'Vision' | 'Quantum' | 'Formal' | 'User';
  isCollaborative?: boolean;
}

export interface SwarmNode {
  id: string;
  name: string;
  type: 'NLP' | 'Vision' | 'Quantum' | 'Formal';
  color: string;
  icon: string;
}

export interface FractalPreset {
  id: string;
  name: string;
  type: 'mandelbrot' | 'julia';
  maxIterations: number;
  colorScheme: 'neon' | 'obsidian' | 'plasma' | 'electric';
  juliaC?: { re: number; im: number };
  zoom: number;
  offsetX: number;
  offsetY: number;
}
