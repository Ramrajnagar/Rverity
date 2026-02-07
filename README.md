
# NeuroSync AI - Unified Memory Logic

NeuroSync AI connects all your AI tools (VSCode, Cursor, Claude, Browser) and maintains a persistent, shared memory context.

## 🚀 Features
- **Universal Memory**: Sync context between IDEs and agents.
- **Vector Search**: Semantic recall of past tasks and code snippets.
- **3D Visualization**: Knowledge graph of your development journey.
- **Real-time**: Instant updates via WebSockets.

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, React Three Fiber.
- **Backend**: Node.js, Fastify, TypeScript.
- **Database**: Supabase (PostgreSQL + pgvector).
- **Cache**: Upstash Redis.
- **Infrastructure**: Docker, Vercel, Railway/Render.

## 📂 Project Structure
```
/neurosync-ai
  /apps
    /web     # Next.js Frontend
    /api     # Fastify Backend
  /packages
    /sdk     # Plugin Client SDK
    /shared  # Shared Types
  /docker    # DevOps Config
```

## 🏁 Getting Started

### Prerequisites
- **Node.js 20+**
- **Docker Desktop** (Required for containerized deployment) - [Install Docker](https://www.docker.com/products/docker-desktop/)
- **Supabase Account**
- **Upstash Account**

### Setup
1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd neurosync-ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Copy the root `.env.example` to `.env` and fill in your keys.
   ```bash
   cp .env.example .env
   ```

4. **Run Locally**
   ```bash
   npm run dev --workspaces
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

5. **Docker Deployment**
   run the following command to start the production stack:
   ```bash
   docker-compose up -d --build
   ```

## 📜 API Documentation
- `GET /v1/health`: Health check
- `POST /v1/memory`: Store context (needs Auth)
- `GET /v1/memory/search`: Semantic search

## 📦 SDK Usage
```typescript
import { NeuroSyncClient } from '@neurosync/sdk';

const client = new NeuroSyncClient({ apiKey: '...' });
await client.sendContext('Refactoring auth middleware', 'vscode');
```
