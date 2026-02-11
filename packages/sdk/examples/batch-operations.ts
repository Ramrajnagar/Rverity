import { NeuroSyncClient, type ContextItem } from '../src';

const client = new NeuroSyncClient({
    apiKey: 'your-api-key-here',
    endpoint: 'http://localhost:3000',
    enableOfflineQueue: true,
    debug: true
});

// Batch send multiple context items
async function batchSendExample() {
    const items: ContextItem[] = [
        {
            content: 'Fixed login bug in auth.ts',
            source: 'vscode',
            tags: ['bug', 'fix', 'auth'],
            metadata: { file: 'auth.ts', lines: '42-56' }
        },
        {
            content: 'Updated user profile UI',
            source: 'vscode',
            tags: ['ui', 'profile'],
            metadata: { file: 'Profile.tsx', component: 'UserProfile' }
        },
        {
            content: 'Added unit tests for authentication',
            source: 'vscode',
            tags: ['test', 'auth'],
            metadata: { file: 'auth.test.ts', tests: 5 }
        },
        {
            content: 'Reviewed PR #123 - Database optimization',
            source: 'github',
            tags: ['review', 'database'],
            metadata: { pr: 123, repo: 'backend' }
        },
        {
            content: 'Researched Redis caching strategies',
            source: 'chrome',
            tags: ['research', 'redis', 'caching'],
            metadata: { url: 'https://redis.io/docs/caching' }
        }
    ];

    console.log(`Sending ${items.length} items in batch...`);

    const response = await client.batchSendContext(items);

    if (response.status === 'success') {
        console.log('✅ Batch sent successfully:', response.data);
    } else {
        console.error('❌ Batch send failed:', response.error);
    }
}

// Simulate offline scenario
async function offlineQueueExample() {
    console.log('Simulating offline scenario...');

    // Simulate being offline
    Object.defineProperty(window, 'navigator', {
        value: { onLine: false },
        writable: true
    });

    // These will be queued
    await client.sendContext('Offline work 1', 'vscode', ['offline']);
    await client.sendContext('Offline work 2', 'vscode', ['offline']);
    await client.sendContext('Offline work 3', 'vscode', ['offline']);

    console.log(`Queue size: ${client.getQueueSize()}`);

    // Simulate coming back online
    Object.defineProperty(window, 'navigator', {
        value: { onLine: true },
        writable: true
    });

    console.log('Back online, processing queue...');
    await client.processQueue();

    console.log(`Queue size after processing: ${client.getQueueSize()}`);
}

// Bulk import from external source
async function bulkImportExample() {
    // Example: Import from a JSON file
    const externalData = [
        { content: 'Meeting notes from Q1 planning', source: 'notion', tags: ['meeting', 'planning'] },
        { content: 'Code review feedback on API design', source: 'slack', tags: ['review', 'api'] },
        { content: 'Bug report: Login fails on Safari', source: 'jira', tags: ['bug', 'safari'] },
        // ... more items
    ];

    // Process in batches of 50
    const batchSize = 50;
    for (let i = 0; i < externalData.length; i += batchSize) {
        const batch = externalData.slice(i, i + batchSize);

        console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);

        const response = await client.batchSendContext(batch);

        if (response.status === 'success') {
            console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} imported`);
        } else {
            console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, response.error);
        }

        // Rate limiting: wait 1 second between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Bulk import complete!');
}

// Run examples
async function main() {
    try {
        console.log('=== Batch Send Example ===');
        await batchSendExample();

        console.log('\n=== Offline Queue Example ===');
        await offlineQueueExample();

        console.log('\n=== Bulk Import Example ===');
        await bulkImportExample();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
