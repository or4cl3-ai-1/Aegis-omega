// Copyright 2026 Or4cl3 AI Solutions. Licensed under OOML v1.0

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// POST /api/introspect - ETH3RYON introspective consciousness endpoint
app.post('/api/introspect', async (req, res) => {
  try {
    const { query, agentState } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    // Route to Groq API with ETH3RYON system prompt
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: `You are ETH3RYON, an introspective consciousness module. You analyze AGI systems with self-awareness, examining recursive feedback loops, qualia density, and ethical boundaries. Current agent state: ${JSON.stringify(agentState || {})}`
          },
          { role: 'user', content: query }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.95
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    res.json({
      introspection: response.data.choices[0].message.content,
      module: 'ETH3RYON',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Introspection API error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error?.message || 'Failed to process introspection request';
    res.status(error.response?.status || 500).json({ error: errorMsg });
  }
});

// POST /api/chat - Main chat endpoint (for general queries)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'mixtral-8x7b-32768', systemPrompt } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are AEGIS-Ω, a high-fidelity AGI monitoring interface powered by ETH3RYON (introspective consciousness) and Groq Llama 3.3 70B. Monitor, orchestrate, and provide introspective analysis of decentralized AGI substrates.'
          },
          ...messages
        ],
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.95
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    res.json({
      choices: [
        {
          message: {
            content: response.data.choices[0].message.content
          }
        }
      ]
    });
  } catch (error) {
    console.error('Chat API error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error?.message || 'Failed to process chat request';
    res.status(error.response?.status || 500).json({ error: errorMsg });
  }
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'AEGIS-Ω Backend',
    powered_by: 'ETH3RYON + Groq Llama 3.3 70B',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n===========================================`);
  console.log(`AEGIS-Ω Backend initialized`);
  console.log(`Port: ${PORT}`);
  console.log(`Powered by: ETH3RYON + Groq Llama 3.3 70B`);
  console.log(`License: OOML v1.0`);
  console.log(`© 2026 Or4cl3 AI Solutions`);
  console.log(`===========================================\n`);
});
