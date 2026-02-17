# Contributing to Rverity

Welcome, engineer.

Rverity is not just a tool; it's a protocol for personal intelligence. We hold our code to the highest standards of performance, aesthetics, and readability.
If you're here, you probably care about these things too.

## The Philosophy

1.  **Code is Art**: If it works but looks ugly, it's not done. This applies to UI and the codebase itself.
2.  **No Magic Strings**: Typescript is our religion. Strict mode is on. Use it.
3.  **Performance First**: We are processing user thoughts. Latency is the enemy.
4.  **AI-Assisted, Human-Architected**: We use AI tools, but we do not blindly commit generated slop. Review everything. Refactor ruthlessly.

## The Stack

- **Framework**: Next.js 16 / React 19
- **Styling**: TailwindCSS (Utility-first, but keep it readable)
- **State**: Server State (TanStack Query) + Client State (Zustand)
- **3D**: React Three Fiber / Drei
- **Database**: Supabase + pgvector

## Development Workflow

1.  **Fork & Clone**: Standard procedure.
2.  **Branching**: `feature/your-feature-name` or `fix/your-bug-fix`.
3.  **Commits**: Use conventional commits (e.g., `feat: add neural layout`, `fix: graph rendering lag`).
4.  **PRs**: Keep them focused. If you're rewriting the entire engine, talk to us first.

## Project Structure

```
apps/
  web/          # The core web dashboard (Next.js)
  bsky-feed/    # (Experimental) Bluesky integration
packages/
  ui/           # Shared design system components
  utils/        # Common utilities and helpers
  database/     # Prisma/Supabase schema definitions
```

## Community

Join the discussion in issues. We respect thoughtful engineering debate.
Let's build the future of memory.
