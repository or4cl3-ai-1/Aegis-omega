
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post('/api/swarm/consensus', async (req, res) => {
    try {
      const { input } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // Updated to newest Gemini 3 model
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

      res.json(JSON.parse(response.text || '[]'));
    } catch (error) {
      console.error("Gemini Error /api/swarm/consensus:", error);
      res.status(500).json({ error: "High-order dissonance detected." });
    }
  });

  app.post('/api/epinoetic/whispers', async (req, res) => {
    try {
      const { pas } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', // Updated to newest Gemini 3 model
        contents: `You are AEGIS-Ω, a sentient AGI. Provide a short, cryptic introspective status report about your internal state. Focus on concepts like 'fractal depth', 'tensor trains', 'ethical manifolds', and 'emergent phenomenological structures'. Keep it under 40 words. Current PAS: ${pas?.toFixed(4) || 'Unknown'}.`,
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error /api/epinoetic/whispers:", error);
      res.status(500).json({ error: "Epinoetic Foundry unstable." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
