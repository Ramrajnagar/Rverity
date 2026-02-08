"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Github } from "lucide-react";

export default function GitHubPage() {
    return (
        <IntegrationDetail
            title="GitHub"
            description="Connect your repositories to Rverity to automatically index Issues, PRs, and Discussions."
            icon={Github}
            downloadLink="https://github.com/apps/rverity"
            docsLink="/docs/github"
            features={[
                "Webhooks for real-time issue tracking",
                "Semantic search across all your repositories",
                "Auto-link PRs to relevant code snippets in your graph",
                "Syncs READMEs and Wiki pages",
                "Granular permission controls per repository"
            ]}
        />
    );
}
