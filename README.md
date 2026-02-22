<div align="center">
  <a href="https://rverity.ai">
    <img src="apps/web/public/rverity-brand.svg" alt="Rverity Logo" width="120" height="120">
  </a>

  <h1>RVERITY</h1>

  <p align="center">
    <strong>The Operating System for your Digital Soul.</strong>
  </p>
</div>

---

### The Fragmentation Crisis

We live in a state of cognitive fracture.

Your code lives in GitHub. Your research lives in Chrome. Your communication lives in Slack. Your thoughts live in Notion.
These systems do not talk to each other. They are isolated silos of intelligence.

As we approach the AGI horizon, this fragmentation becomes a liability. AI models are generic geniuses they know everything about the world, but **nothing about you**. They lack the context of your specific history, your unique patterns, and your implicit knowledge.

### The Solution: Consilience

Rverity is a self-hosted **Knowledge Graph** that unifies your digital existence.
It is an infrastructure layer that sits below your applications, observing the data stream of your life. It vectors, links, and indexes every interaction into a single, navigable 3D graph.

It does not just "search" your history. It reconstructs your train of thought.

---

## Technical Architecture

We adhere to a philosophy of **sovereign computing**. You run the stack. You own the weights. You control the graph.

### Core Infrastructure
- **Runtime**: Next.js 16 (App Router) on Node.js Edge.
- **State Management**: Server-side highly consistent state via TanStack Query.
- **Visual Engine**: React Three Fiber (WebGL) for high-performance 3D graph rendering.
- **Vector Database**: Supabase (PostgreSQL + pgvector) for high-dimensional semantic search.
- **Caching**: Upstash Redis for sub-millisecond context retrieval.

### The Pipeline
1.  **Ingestion**: Passive observers in VS Code and Chrome capture text, code, and navigational intent.
2.  **Synthesis**: Data is chunked and embedded using OpenAI/Anthropic high-fidelity models.
3.  **Graphing**: Semantic relationships are established between disparate data points (e.g., linking a StackOverflow article to a specific Git commit).
4.  **Recall**: The Context Engine anticipates your needs, surfacing relevant memories before you explicitly query for them.

---

## Quick Start

We assume you are comfortable with a terminal.

1.  **Clone the Protocol**
    ```bash
    git clone https://github.com/Ramrajnagar/Rverity.git
    cd Rverity
    ```

2.  **Ignite the Engine**
    ```bash
    npm install
    npm run dev
    ```

3.  **Access the Interface**
    Open `http://localhost:3000`. The graph will begin assembling immediately.

---

## The Manifesto

We maximize for three variables:

1.  **Speed**: Latency is the enemy of thought. Every interaction must be instant.
2.  **Privacy**: Your thoughts are your own. We build for a local-first future where data never leaves your perimeter without explicit consent.
3.  **Aesthetics**: Tools for the mind should be beautiful. We reject the utilitarian drabness of enterprise software.

## Roadmap

Refining the interface between human intent and machine execution.

-   [ ] **Neural Visualizations**: Immersive WebGL graph navigation.
-   [ ] **Predictive Context**: Agents that code *with* you, not just for you.
-   [ ] **Local Vaults**: Fully offline, local-only vector storage.
-   [ ] **Brain-Computer Interface**: Experimental typeless input streams.

---

<div align="center">
    <p>Built with conviction by <a href="https://github.com/Ramrajnagar">Ramraj</a> and the Rverity Team.</p>
</div>
