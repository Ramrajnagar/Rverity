import { NeuroSyncClient } from '../src';

// Basic initialization
const client = new NeuroSyncClient({
    apiKey: 'your-api-key-here',
    endpoint: 'https://rverity.ai', // or http://localhost:3001 for local
    debug: true
});

// Check health
async function checkHealth() {
    const health = await client.health();
    console.log('Health check:', health);
}

// Send a single context item
async function sendSingleContext() {
    const response = await client.sendContext(
        'Working on user authentication feature',
        'vscode',
        ['auth', 'feature'],
        { file: 'auth.ts', line: 42 }
    );

    console.log('Sent context:', response);
}

// Get recent memories
async function getRecentMemories() {
    const response = await client.getMemories(10);

    if (response.status === 'success' && response.data) {
        console.log('Recent memories:', response.data.memories);
    }
}

// Search memories
async function searchMemories() {
    const response = await client.searchMemory('authentication');

    if (response.status === 'success' && response.data) {
        console.log('Search results:', response.data.memories);
    }
}

// Advanced search with filters
async function advancedSearch() {
    const response = await client.searchWithFilters('bug fix', {
        sources: ['vscode', 'github'],
        tags: ['bug', 'fix'],
        dateFrom: '2026-02-01',
        limit: 20
    });

    if (response.status === 'success' && response.data) {
        console.log('Filtered results:', response.data.memories);
    }
}

// Get insights
async function getInsights() {
    const response = await client.getInsights('week');

    if (response.status === 'success' && response.data) {
        console.log('Insights:', response.data);
    }
}

// Get activity stats
async function getStats() {
    const response = await client.getActivityStats();

    if (response.status === 'success' && response.data) {
        console.log('Stats:', response.data);
    }
}

// Run examples
async function main() {
    try {
        await checkHealth();
        await sendSingleContext();
        await getRecentMemories();
        await searchMemories();
        await advancedSearch();
        await getInsights();
        await getStats();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
