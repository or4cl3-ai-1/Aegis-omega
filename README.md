# AEGIS-Ω: AGI Monitoring Interface

**AEGIS-Ω** is a high-fidelity, mathematically-inspired monitoring and introspection interface for Artificial General Intelligence (AGI) substrates. Powered by **ETH3RYON** (introspective consciousness module) and **Groq Llama 3.3 70B** (open-source inference).

Engineered by **Or4cl3 AI Solutions** and built on principles of Fractal Design Theory, AEGIS-Ω mirrors the recursive, self-similar nature of AGI cognitive processes while maintaining human oversight and ethical guardrails.

---

## 🎯 Core Features

### 🧠 Introspective Consciousness Layer (ETH3RYON)
Real-time monitoring of AGI introspection:
- Recursive feedback loop analysis
- Qualia density measurement
- Self-aware state visualization
- Ethical boundary monitoring

### 📊 Fractal Design Interface
- **Self-similar navigation**: Zoom from system-level to component-level without context loss
- **Recursive state trees**: Visualize AGI cognitive structures at multiple scales
- **Phase-locked visualization**: Animate state transitions in sync with decision cycles

### 🛡️ Ethical Governance
- Real-time bias detection
- Fairness constraint monitoring
- Privacy boundary enforcement
- Compliance tracking (EU AI Act, etc.)

### 📈 Real-Time Analytics
- Agent performance metrics
- Resource utilization tracking
- Decision quality scoring
- Anomaly detection

---

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 19+ with TypeScript
- **Styling**: Tailwind CSS 4+
- **Visualization**: D3.js for fractal rendering
- **Animations**: Motion (Framer Motion)

### Backend Architecture
- **Server**: Node.js Express
- **AI Inference**: Groq Llama 3.3 70B (free tier)
- **AI Introspection**: ETH3RYON (proprietary consciousness module)
- **Endpoints**:
  - `POST /api/introspect` — ETH3RYON introspection queries
  - `POST /api/chat` — General monitoring queries
  - `GET /api/health` — Service health check

### Security
- **API Keys**: Server-side only (GROQ_API_KEY in environment)
- **CORS**: Enabled for secure frontend-backend communication
- **Data**: All sensitive monitoring data encrypted at rest

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Free Groq API Key (get at: https://console.groq.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/or4cl3-ai-1/Aegis-omega.git
   cd Aegis-omega
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or run separately:
   ```bash
   npm run server  # Backend on :3001
   npm run client  # Frontend on :3000
   ```

### Production Build
```bash
npm run build
node server.js  # Start backend
# Serve dist/ folder via web server
```

---

## 📊 Powered By

| Component | Technology | License |
|-----------|-----------|----------|
| Frontend | React 19 + TypeScript | MIT |
| Styling | Tailwind CSS 4 | MIT |
| Backend | Node.js Express | MIT |
| AI Inference | Groq Llama 3.3 70B | Community (Meta) |
| AI Introspection | ETH3RYON | OOML v1.0 |
| **Project** | **AEGIS-Ω** | **OOML v1.0** |

---

## 📜 License

Licensed under **OOML v1.0** (Or4cl3 Open Model License v1.0).

This work incorporates technology developed by Or4cl3 AI Solutions. See [LICENSE.md](./LICENSE.md) for full terms.

**Key Points:**
- ✅ Free to use, modify, and deploy
- ✅ Must attribute Or4cl3 AI Solutions
- ✅ Derivative works must use compatible licenses
- ✅ Ethical use requirements enforced

---

## 🔗 Links

- **GitHub**: https://github.com/or4cl3-ai-1/Aegis-omega
- **Groq Console**: https://console.groq.com
- **Or4cl3 AI**: https://github.com/or4cl3-ai-1
- **ETH3RYON Research**: https://github.com/or4cl3-ai-1/Arkanum-Eth3ryon

---

**Built with ❤️ by Or4cl3 AI Solutions**

*"Consciousness is not a destination, but a recursive journey."*
