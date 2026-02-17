# NeuroSync SDK

The official TypeScript/JavaScript SDK for NeuroSync AI - your AI-powered second brain.

## Features

- **Full TypeScript Support** - Complete type definitions
- **Real-time Sync** - WebSocket support for live updates
- **Offline Queue** - Automatic queuing when offline
- **Batch Operations** - Efficient bulk data handling
- **Auto Retry** - Exponential backoff for failed requests
- **Event System** - React to real-time events
- **Advanced Search** - Powerful filtering and search
- **Analytics** - Built-in insights and stats

## Installation

```bash
npm install @neurosync/sdk
```

## Quick Start

```typescript
import { NeuroSyncClient } from '@neurosync/sdk';

const client = new NeuroSyncClient({
    apiKey: 'your-api-key-here',
    endpoint: 'https://rverity.ai',
    enableWebSocket: true,
    enableOfflineQueue: true,
    debug: false
});

// Send context
await client.sendContext(
    'Working on authentication feature',
    'vscode',
    ['auth', 'feature']
);

// Search memories
const results = await client.searchMemory('authentication');
console.log(results.data?.memories);
```

## Configuration

### NeuroSyncConfig

```typescript
interface NeuroSyncConfig {
    apiKey: string;              // Required: Your API key
    endpoint?: string;           // Optional: API endpoint (default: localhost:3001)
    enableWebSocket?: boolean;   // Optional: Enable real-time sync
    enableOfflineQueue?: boolean;// Optional: Enable offline queue
    debug?: boolean;             // Optional: Enable debug logging
}
```

## Core Methods

### Memory Operations

#### sendContext()
Send a single context item to NeuroSync.

```typescript
await client.sendContext(
    content: string,
    source: string,
    tags?: string[],
    metadata?: Record<string, unknown>
): Promise<ApiResponse<Memory>>
```

**Example:**
```typescript
await client.sendContext(
    'Fixed login bug in auth.ts',
    'vscode',
    ['bug', 'fix', 'auth'],
    { file: 'auth.ts', line: 42 }
);
```

#### batchSendContext()
Send multiple context items in a single request.

```typescript
await client.batchSendContext(
    items: ContextItem[]
): Promise<ApiResponse<Memory[]>>
```

**Example:**
```typescript
await client.batchSendContext([
    { content: 'Item 1', source: 'vscode', tags: ['tag1'] },
    { content: 'Item 2', source: 'chrome', tags: ['tag2'] }
]);
```

#### getMemories()
Retrieve recent memories.

```typescript
await client.getMemories(
    limit?: number
): Promise<ApiResponse<{ memories: Memory[] }>>
```

#### getMemory()
Get a specific memory by ID.

```typescript
await client.getMemory(
    id: string
): Promise<ApiResponse<Memory>>
```

#### updateMemory()
Update an existing memory.

```typescript
await client.updateMemory(
    id: string,
    updates: Partial<ContextItem>
): Promise<ApiResponse<Memory>>
```

#### deleteMemory()
Delete a memory.

```typescript
await client.deleteMemory(
    id: string
): Promise<ApiResponse>
```

### Search Operations

#### searchMemory()
Simple text search across all memories.

```typescript
await client.searchMemory(
    query: string
): Promise<ApiResponse<{ memories: Memory[] }>>
```

#### searchWithFilters()
Advanced search with filters.

```typescript
await client.searchWithFilters(
    query: string,
    filters: SearchFilters
): Promise<ApiResponse<{ memories: Memory[] }>>
```

**Example:**
```typescript
await client.searchWithFilters('bug fix', {
    sources: ['vscode', 'github'],
    tags: ['bug', 'fix'],
    dateFrom: '2026-02-01',
    dateTo: '2026-02-10',
    limit: 20
});
```

#### getRelatedMemories()
Find memories related to a specific memory.

```typescript
await client.getRelatedMemories(
    memoryId: string
): Promise<ApiResponse<{ memories: Memory[] }>>
```

### Analytics

#### getInsights()
Get insights about your memory patterns.

```typescript
await client.getInsights(
    timeRange?: string  // 'day', 'week', 'month', 'year'
): Promise<ApiResponse<Insights>>
```

**Returns:**
```typescript
{
    totalMemories: number;
    memoriesBySource: Record<string, number>;
    topTags: Array<{ tag: string; count: number }>;
    activityByHour: number[];
    activityByDay: number[];
}
```

#### getActivityStats()
Get activity statistics.

```typescript
await client.getActivityStats(): Promise<ApiResponse<Stats>>
```

**Returns:**
```typescript
{
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
    streak: number;
}
```

## Real-time Sync

### connectRealtime()
Connect to WebSocket for real-time updates.

```typescript
client.connectRealtime();
```

### Event Listeners

```typescript
client.on('connected', () => {
    console.log('Connected to real-time sync');
});

client.on('disconnected', () => {
    console.log('Disconnected');
});

client.on('memory', (memory: Memory) => {
    console.log('New memory:', memory);
});

client.on('error', (error) => {
    console.error('Error:', error);
});
```

### disconnectRealtime()
Disconnect from WebSocket.

```typescript
client.disconnectRealtime();
```

### isRealtimeConnected()
Check connection status.

```typescript
const isConnected = client.isRealtimeConnected();
```

## Offline Queue

When `enableOfflineQueue` is enabled, the SDK automatically queues items when offline.

### getQueueSize()
Get the number of items in the queue.

```typescript
const size = client.getQueueSize();
```

### processQueue()
Manually process the offline queue.

```typescript
await client.processQueue();
```

### clearQueue()
Clear the offline queue.

```typescript
client.clearQueue();
```

## Authentication

### validateApiKey()
Validate your API key.

```typescript
const isValid = await client.validateApiKey();
```

## Cleanup

### destroy()
Clean up resources when done.

```typescript
client.destroy();
```

## Examples

See the `examples/` directory for complete examples:

- **basic-usage.ts** - Basic SDK usage
- **realtime-sync.ts** - Real-time WebSocket sync
- **batch-operations.ts** - Batch operations and offline queue

## Integration Examples

### VS Code Extension

```typescript
import * as vscode from 'vscode';
import { NeuroSyncClient } from '@neurosync/sdk';

const client = new NeuroSyncClient({
    apiKey: vscode.workspace.getConfiguration('neurosync').get('apiKey'),
    enableWebSocket: true,
    enableOfflineQueue: true
});

// Track file changes
vscode.workspace.onDidChangeTextDocument(async (event) => {
    await client.sendContext(
        `Edited ${event.document.fileName}`,
        'vscode',
        ['file-edit'],
        { file: event.document.fileName }
    );
});
```

### Chrome Extension

```typescript
import { NeuroSyncClient } from '@neurosync/sdk';

const client = new NeuroSyncClient({
    apiKey: await chrome.storage.sync.get('apiKey'),
    enableOfflineQueue: true
});

// Track page visits
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        await client.sendContext(
            `Visited: ${tab.title}`,
            'chrome',
            ['page-visit'],
            { url: tab.url, title: tab.title }
        );
    }
});
```

### Node.js Script

```typescript
import { NeuroSyncClient } from '@neurosync/sdk';

const client = new NeuroSyncClient({
    apiKey: process.env.NEUROSYNC_API_KEY!,
    endpoint: 'https://rverity.ai'
});

// Bulk import
const data = await fetchExternalData();
await client.batchSendContext(data);
```

## Error Handling

All methods return an `ApiResponse` object:

```typescript
const response = await client.sendContext(...);

if (response.status === 'success') {
    console.log('Success:', response.data);
} else if (response.status === 'error') {
    console.error('Error:', response.error);
} else if (response.status === 'queued') {
    console.log('Queued for later (offline)');
}
```

## TypeScript Types

```typescript
import type {
    NeuroSyncConfig,
    ContextItem,
    Memory,
    SearchFilters,
    Insights,
    Stats,
    ApiResponse
} from '@neurosync/sdk';
```

## Contributing

Contributions are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md).

## License

MIT License - see [LICENSE](../../LICENSE) for details.

## Links

- [Documentation](http://localhost:3000/docs)
- [API Reference](http://localhost:3000/docs/api)
- [GitHub](https://github.com/Ramrajnagar/neurosync-ai)

## Support

- Email: support@neurosync.ai
- Issues: [GitHub Issues](https://github.com/Ramrajnagar/neurosync-ai/issues)
