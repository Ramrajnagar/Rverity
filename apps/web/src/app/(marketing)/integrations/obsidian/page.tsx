"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { BookOpen } from "lucide-react";

export default function ObsidianPage() {
    return (
        <IntegrationDetail
            title="Obsidian"
            description="Connect your Obsidian vault to Rverity. Sync your markdown notes, backlinks, and knowledge graph for powerful cross-tool search and discovery."
            icon={BookOpen}
            installCommand="Install Rverity plugin from Obsidian Community Plugins"
            downloadLink="https://github.com/Ramrajnagar/Rverity"
            docsLink="/docs"
            features={[
                "Vault synchronization with automatic change detection",
                "Markdown file indexing preserving formatting and frontmatter",
                "Backlink and wikilink resolution for relationship mapping",
                "Tag and metadata extraction from frontmatter and inline tags",
                "Graph view integration showing connections across tools",
                "Bidirectional linking between Obsidian and other integrations",
                "File attachment indexing including images and PDFs",
                "Daily note capture with automatic date-based organization",
                "Template support for consistent note structure",
                "Search across all vaults with advanced query syntax",
                "Real-time sync with conflict resolution",
                "Privacy mode to exclude specific folders or files"
            ]}
            setupSteps={[
                {
                    title: "Install Plugin",
                    description: "Open Obsidian settings and install the Rverity plugin from the Community Plugins directory.",
                    code: "Settings → Community Plugins → Browse\nSearch: Rverity\nClick Install → Enable"
                },
                {
                    title: "Configure API",
                    description: "Enter your Rverity API key and configure which folders to sync. You can exclude private folders or specific file patterns.",
                    code: "Settings → Rverity Plugin\nAPI Key: [your-key]\nVault Path: /\nExclude: private/, temp/\nSync Frequency: Real-time"
                },
                {
                    title: "Initial Sync",
                    description: "Trigger the initial sync to index your existing notes. This may take a few minutes depending on vault size.",
                    code: "Command Palette (Ctrl/Cmd + P)\nType: Rverity: Sync Vault\nWait for completion notification\nVerify in Rverity dashboard"
                }
            ]}
            codeExample={`// Frontmatter Configuration
---
tags: [project, important]
rverity-sync: true
rverity-public: false
created: 2024-02-11
---

// Wikilink Support
[[Related Note]] - Auto-linked in Rverity
![[Embedded Note]] - Content indexed
#tag - Searchable across all tools

// Search Syntax
// Find notes by tag: tag:#project
// Search by date: created:2024-02
// Full-text: "exact phrase"
// Backlinks: linked-to:[[Note Name]]

// Privacy Controls
// Exclude folders: private/, personal/
// Exclude files: *.draft.md, temp-*
// Respect .gitignore patterns`}
        />
    );
}
