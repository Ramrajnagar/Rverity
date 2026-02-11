"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { FileText } from "lucide-react";

export default function NotionPage() {
    return (
        <IntegrationDetail
            title="Notion"
            description="Sync your Notion workspace with Rverity. Keep your knowledge base searchable and connected across all your tools."
            icon={FileText}
            installCommand="Configure in Notion Workspace Settings"
            downloadLink="https://github.com/Ramrajnagar/Rverity"
            docsLink="/docs"
            features={[
                "Bi-directional sync between Notion and Rverity for seamless updates",
                "Page and database indexing with full content extraction",
                "Block-level capture preserving formatting and structure",
                "Automatic link detection and relationship mapping",
                "Tag and property synchronization for consistent organization",
                "Real-time updates when pages are edited or created",
                "Database view support including tables, boards, and galleries",
                "Embedded content extraction from videos, files, and images",
                "Comment and discussion thread capture",
                "Version history tracking for change management",
                "Template synchronization for reusable content patterns",
                "Cross-workspace search across all connected Notion accounts"
            ]}
            setupSteps={[
                {
                    title: "Create Integration",
                    description: "Set up a Notion integration in your workspace settings to generate an API key with appropriate permissions.",
                    code: "Notion Settings → Integrations → New Integration\nName: Rverity\nCapabilities: Read content, Update content\nCopy Integration Token"
                },
                {
                    title: "Share Pages",
                    description: "Share the pages or databases you want to sync with your Rverity integration. You can share individual pages or entire workspaces.",
                    code: "Open page → Share → Invite → Select Rverity integration\nRepeat for all pages/databases to sync\nOr share parent page to include all children"
                },
                {
                    title: "Configure Sync",
                    description: "Add your Notion integration token to Rverity and configure sync settings including frequency and filters.",
                    code: "Rverity Dashboard → Integrations → Notion\nPaste Integration Token\nSelect sync mode: Real-time, Hourly, or Manual\nChoose content types to sync"
                }
            ]}
            codeExample={`// Sync Configuration
{
  "sync_frequency": "real-time",
  "include_archived": false,
  "content_types": ["pages", "databases", "comments"],
  "exclude_properties": ["internal_id", "temp_data"]
}

// Search Filters
// Search by page title, content, or properties
// Filter by database, tag, or creation date
// Full-text search across all synced content

// Bi-directional Sync
// Changes in Notion → Auto-update in Rverity
// Changes in Rverity → Push back to Notion
// Conflict resolution with last-write-wins`}
        />
    );
}
