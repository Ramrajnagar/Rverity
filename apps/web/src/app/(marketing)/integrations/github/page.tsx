"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Github } from "lucide-react";

export default function GitHubPage() {
    return (
        <IntegrationDetail
            title="GitHub Integration"
            description="Automatically capture your development activity from GitHub repositories. Track commits, pull requests, issues, and releases to build a comprehensive development timeline."
            icon={Github}
            installCommand="Connect via GitHub App installation in your account settings"
            downloadLink="/settings#integrations"
            docsLink="/docs"
            features={[
                "Push event tracking capturing commits, changed files, and branch information",
                "Pull request monitoring including creation, updates, reviews, and merge events",
                "Issue tracking with creation, updates, comments, and label changes",
                "Comment capture for both issues and pull requests with full context",
                "Code review tracking including review comments and approval status",
                "Release monitoring capturing version tags, release notes, and publication events",
                "Branch lifecycle tracking for creation and deletion events",
                "Privacy-first approach capturing only metadata without code content",
                "Multi-account support allowing connection of multiple GitHub accounts",
                "Secure OAuth flow with webhook signature verification",
                "Comprehensive analytics including commit frequency and PR patterns",
                "Real-time capture via webhooks with instant synchronization"
            ]}
            setupSteps={[
                {
                    title: "Create GitHub App",
                    description: "Navigate to GitHub Developer settings and create a new GitHub App with the required configuration.",
                    code: "GitHub Settings → Developer settings → GitHub Apps → New GitHub App\n\nRequired fields:\nName: NeuroSync\nWebhook URL: https://<your-domain>/api/github/webhook\nCallback URL: https://<your-domain>/api/github/callback\n(For local dev, use ngrok: https://<id>.ngrok.io/api...)"
                },
                {
                    title: "Configure Permissions",
                    description: "Set repository permissions to read-only access for the required resources.",
                    code: "Repository Permissions (Read-only):\n- Contents\n- Metadata\n- Pull requests\n- Issues\n- Commit statuses"
                },
                {
                    title: "Subscribe to Events",
                    description: "Enable webhook events to receive notifications for repository activity.",
                    code: "Webhook Events:\n- Push\n- Pull request\n- Pull request review\n- Issues\n- Issue comment\n- Release\n- Create/Delete (branches and tags)"
                },
                {
                    title: "Install App",
                    description: "Install the GitHub App on your repositories to begin capturing activity.",
                    code: "GitHub App Settings → Install App → Select repositories → Install\n\nYou can choose:\n- All repositories\n- Only select repositories"
                }
            ]}
            codeExample={`// Commit Event Example
{
  "content": "Pushed 3 commits to owner/repo/main: Fix auth bug, Add tests, Update docs",
  "source": "github",
  "tags": ["github", "push", "commit", "main"],
  "metadata": {
    "repository": "owner/repo",
    "branch": "main",
    "commits": 3,
    "filesChanged": 12,
    "author": "username"
  }
}

// Pull Request Event Example
{
  "content": "opened PR #42 in owner/repo: Add authentication feature",
  "source": "github",
  "tags": ["github", "pull-request", "opened"],
  "metadata": {
    "repository": "owner/repo",
    "prNumber": 42,
    "title": "Add authentication feature",
    "baseBranch": "main",
    "headBranch": "feature/auth",
    "additions": 500,
    "deletions": 20
  }
}`}
        />
    );
}
