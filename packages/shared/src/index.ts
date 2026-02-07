
export interface MemoryItem {
    id: string;
    content: string;
    source: 'vscode' | 'cursor' | 'browser' | 'claude';
    timestamp: string;
    tags: string[];
    vectorId?: string;
    importance: number;
}

export interface UserContext {
    userId: string;
    activeTool: string;
    currentTask: string;
    recentMemories: MemoryItem[];
}
