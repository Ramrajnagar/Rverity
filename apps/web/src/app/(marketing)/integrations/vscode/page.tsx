"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Code2 } from "lucide-react";

export default function VSCodePage() {
    return (
        <IntegrationDetail
            title="VS Code"
            description="The world's first IDE extension that remembers what you coded last week, last month, and last year."
            icon={Code2}
            installCommand="code --install-extension rverity.vscode"
            downloadLink="https://marketplace.visualstudio.com/items?itemName=rverity.vscode"
            docsLink="/docs/vscode"
            features={[
                "Automatic file indexing on save",
                "Context-aware code completion based on your entire history",
                "Syncs cursor position to the Knowledge Graph",
                "Private by default: .env and .pem files ignored automatically",
                "Works with Remote-SSH and DevContainers"
            ]}
        />
    );
}
