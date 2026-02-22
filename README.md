<div align="center">
  <img src="apps/web/public/rverity-brand.svg" alt="Rverity Logo" width="120" height="120">

  <h1>RVERITY 🧠</h1>

  <p align="center">
    <strong>The self-hosted Knowledge Graph and Operating System for your Digital Soul.</strong>
  </p>

  <p align="center">
    <a href="https://rverityai.vercel.app">Live Demo</a> •
    <a href="#system-architecture">Architecture</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="https://github.com/Ramrajnagar/Rverity/issues">Report Bug</a>
  </p>

  <p align="center">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
    <img alt="WebGL" src="https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white" />
  </p>
</div>

---

## ⚡ The Context Collapse

Your digital life is profoundly fragmented.

**Engineers lose up to 30% of their day to context switching.** Your codebase lives in **GitHub**, your research is scattered across 50 **Chrome** tabs, your technical decisions are buried deep in **Slack** threads, and your personal thoughts are trapped inside **Notion**. 

Right now, we are building powerful AI systems (LLMs, coding agents, co-pilots) that have access to the entire knowledge of humanity—but they know absolutely **nothing** about *you*. They lack your unique history, your mental models, and your implicit development context.

## 🔮 The Solution: Rverity

**Rverity** is an open-source, self-hosted, personal **Knowledge Graph**. It is an infrastructure layer that sits silently alongside your workflow, observing and streaming your interactions into a deeply unified semantic database.

It doesn’t just "search" your history via keywords. By chunking your data and generating high-fidelity vector embeddings (via OpenAI/Anthropic/FreeLLM), Rverity **reconstructs your train of thought** using a mathematical 3D relationship visualizer.

### Why use Rverity?
- 🔒 **Absolute Sovereignty**: You run the stack. Your vector weights belong to you. Your memories stay local.
- 🚀 **Blazing Fast**: Supabase + Redis cache guarantees sub-millisecond context retrieval.
- 🎨 **Aesthetic Superiority**: Built with breathtaking WebGL visualizers, so your thoughts look as beautiful as they are.

---

## 🏗 System Architecture

Rverity is built as a highly robust, scalable **Monorepo** orchestrating independent applications, extensions, and microservices perfectly synced through a centralized AI pipeline.

### Core Stack Components
* **Frontend Application (`apps/web`)**: Next.js 14+ standard leveraging React Server Components, Server Actions for mutations, and highly-optimized native TailwindCSS.
* **Semantic Database & Auth**: Powered by **Supabase**. We route all user authentication securely, while taking full advantage of `pgvector` inside PostgreSQL for high-dimensional cosine similarity searches.
* **Vector Embeddings**: LLM-agnostic design (`src/lib/openai.ts`) allowing developers to plug in OpenAI's `text-embedding-3-small`, Anthropic, or even free-tier drop-in replacements like FreeLLM API to generate 1536-dimensional semantic tokens.
* **Queue & Caching (`Upstash Redis`)**: Used to aggressively cache frequent memory hits and orchestrate background processing events for massive GitHub repository ingestions.

### Integration Tooling
1. **VS Code Extension (`extensions/vscode`)**: 
   A lightweight TypeScript extension that observes file read/writes, terminal commits, and active viewport data. It intelligently debounces keystrokes to prevent noise, only saving highly contextual diffs into your graph.
2. **Chrome Extension (`extensions/chrome`)**: 
   A manifest V3 extension running background service workers that record the precise documentation URL, highlighted texts, and session timestamps of your engineering research.
3. **GitHub Webhooks Server (`apps/web/src/app/api/github/webhook`)**: 
   Receives massive payloads of PR pushes, issue resolutions, and merge events, slicing them into parsable markdown memories.

### Data Synthesis Pipeline
1. **Ingest Phase**: An event is caught via extension or webhook.
2. **Sanitize & Vectorize Phase**: AI strips noisy JSON artifacts → Generates Embedding array matching the cognitive context.
3. **Graphing Phase**: React Three Fiber reads the semantic proximity in real-time, pulling floating graph nodes towards each other using physics-based force simulation (`d3-force`).

---

## 🚀 Quick Start

> **Prerequisites:** Node.js 18+, Git, and a free Supabase account.

1. **Clone the Source**
   ```bash
   git clone https://github.com/Ramrajnagar/Rverity.git
   cd Rverity
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Duplicate `.env.example` into `.env` (or `.env.local` inside `apps/web`) and populate your Supabase and LLM API keys.
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   AI_API_KEY=your-llm-api-key
   ```

4. **Initialize Database**
   Run the embedded SQL migrations in your Supabase SQL editor located at `apps/web/supabase/migrations/20240523000000_init_vector.sql`

5. **Engage the Runtime Matrix**
   ```bash
   npm run dev
   ```
   *Dashboard available instantly at `http://localhost:3000`*

---

## 🧭 The Roadmap

Rverity is actively compounding its capabilities. We welcome pull requests that align with our core manifesto of speed, privacy, and aesthetics.

- [x] WebGL 3D Knowledge Graph
- [x] Multi-tenant Authentication with Supabase
- [x] GitHub Full-Repo Webhook Ingestion
- [ ] **AI-Predictive Prototyping**: Local LLM agents that write code matching the styles found in your personal graph.
- [ ] **Notion / Slack Native Integrations**: Webhook ingestion for text-based platforms.
- [ ] **Fully Offline LLMs**: Wrapping `llama.cpp` to ditch external API reliance completely.

<br>

<div align="center">
    <p>Built with conviction by <a href="https://github.com/Ramrajnagar">Ramraj</a> and the <strong>Rverity</strong> Team.</p>
</div>
