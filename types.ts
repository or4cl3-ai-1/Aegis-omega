
export type SystemStatus = 'INITIALIZING' | 'STABLE' | 'OPTIMIZING' | 'CRITICAL' | 'LOCKDOWN';

export interface NodeStatus {
  id: string;
  name: string;
  type: 'NLP' | 'Vision' | 'Quantum' | 'Formal';
  sync: number;
  health: number;
  lastProof: string;
}

export interface SigmaState {
  pas: number; // Phase Alignment Score
  confidence: number;
  restoringForce: number;
  manifoldStability: number;
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
