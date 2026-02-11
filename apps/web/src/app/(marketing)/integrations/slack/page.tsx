"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { MessageSquare } from "lucide-react";

export default function SlackPage() {
    return (
        <IntegrationDetail
            title="Slack"
            description="Automatically capture important conversations, decisions, and knowledge shared in your Slack workspace. Never lose track of critical discussions again."
            icon={MessageSquare}
            installCommand="Add App to Slack Workspace"
            downloadLink="https://github.com/Ramrajnagar/Rverity"
            docsLink="/docs"
            features={[
                "Automatic message capture from selected channels with smart filtering",
                "Thread tracking to preserve conversation context and replies",
                "Reaction-based bookmarking using custom emoji for quick saves",
                "File and attachment indexing with full-text search support",
                "Code snippet extraction from messages with syntax highlighting",
                "Decision tracking by detecting keywords like 'decided', 'agreed', 'action item'",
                "User mention indexing to find all discussions involving specific people",
                "Channel categorization for organized knowledge management",
                "Real-time sync with configurable update intervals",
                "Privacy controls to exclude sensitive channels and DMs",
                "Search across all captured messages with advanced filters",
                "Integration with Slack's API using OAuth 2.0 for secure access"
            ]}
            setupSteps={[
                {
                    title: "Install Slack App",
                    description: "Add the Rverity app to your Slack workspace through the Slack App Directory or by deploying your own instance.",
                    code: "Visit: https://slack.com/apps/rverity\nClick 'Add to Slack'\nAuthorize required permissions"
                },
                {
                    title: "Configure Channels",
                    description: "Select which channels to monitor and set up capture rules. You can choose to capture all messages or only those with specific reactions.",
                    code: "/rverity setup\n/rverity add-channel #engineering\n/rverity set-reaction :bookmark:"
                },
                {
                    title: "Connect to Rverity",
                    description: "Link your Slack integration to your Rverity account using your API key. This enables automatic synchronization.",
                    code: "Settings → Integrations → Slack\nEnter API Key\nSelect sync frequency (real-time, hourly, daily)"
                }
            ]}
            codeExample={`// Slack Commands
// /rverity search [query] - Search captured messages
// /rverity bookmark - Save current message
// /rverity stats - View capture statistics

// Capture Rules
// React with :bookmark: to save any message
// Messages in monitored channels auto-captured
// Threads automatically linked to parent message

// Privacy & Security
// OAuth 2.0 authentication
// Encrypted message storage
// Exclude private channels and DMs
// Configurable data retention policies`}
        />
    );
}
