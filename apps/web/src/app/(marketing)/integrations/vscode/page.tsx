"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Code2 } from "lucide-react";

export default function VSCodePage() {
    return (
        <IntegrationDetail
            title="VS Code Extension"
            description="Automatically capture your coding context, file changes, and Git commits. Build a comprehensive memory of your development work without manual effort."
            icon={Code2}
            installCommand="Download from VS Code Marketplace or install manually"
            downloadLink="https://github.com/Ramrajnagar/Rverity/tree/main/extensions/vscode"
            docsLink="/docs"
            features={[
                "Automatic file change tracking with intelligent debouncing to reduce noise",
                "Git commit message capture integrated directly with VS Code's source control",
                "Sidebar views displaying recent memories and comprehensive statistics",
                "Quick search command accessible via Command Palette for instant memory retrieval",
                "Timeline webview providing visual history of your coding activity",
                "Quick notes capture with keyboard shortcut for manual context preservation",
                "Real-time synchronization via WebSocket for instant updates across devices",
                "Offline queue support ensuring no context is lost during network interruptions",
                "Nine configuration options providing granular control over capture behavior",
                "Privacy-first design respecting .gitignore patterns and sensitive file exclusions",
                "Full compatibility with Remote-SSH and DevContainer workflows"
            ]}
            setupSteps={[
                {
                    title: "Install Extension",
                    description: "Download the .vsix file from the GitHub repository and install it in VS Code using the Extensions panel.",
                    code: "Extensions → Install from VSIX → Select downloaded file"
                },
                {
                    title: "Configure API Key",
                    description: "Navigate to VS Code settings and enter your Rverity API key to enable synchronization with your account.",
                    code: "Settings → Rverity → API Key → Enter your key from dashboard"
                },
                {
                    title: "Start Capturing",
                    description: "The extension automatically begins tracking file changes and Git commits. Monitor sync status in the status bar.",
                    code: "Status bar displays: Connection status, Queue size, Last sync time"
                }
            ]}
            codeExample={`// Automatic Capture
// The extension captures the following without any manual intervention:
// - File edits, saves, creates, and deletions
// - Git commit messages with author and timestamp
// - Active file context including language and path

// Manual Capture
// Press Ctrl+Shift+N to open quick note input
// Type your note and press Enter to save

// Search Memories
// Press Ctrl+Shift+P → "Rverity: Search Memories"
// Enter search query to find relevant context
// Results display with source, timestamp, and content preview`}
        />
    );
}
