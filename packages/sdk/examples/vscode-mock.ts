
import { NeuroSyncClient } from '../src/client';

// Mock Configuration
const client = new NeuroSyncClient({
    apiKey: 'mock-api-key',
    endpoint: 'http://localhost:3001',
});

const files = ['app.ts', 'server.ts', 'user.service.ts', 'auth.middleware.ts'];
const actions = ['Refactoring', 'Debugging', 'Writing Code', 'Reviewing'];

async function simulateActivity() {
    console.log('🚀 Starting VSCode Mock Plugin...');

    let i = 0;
    setInterval(async () => {
        const file = files[Math.floor(Math.random() * files.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const content = `${action} in ${file}`;

        try {
            console.log(`Sending context: ${content}`);
            await client.sendContext(content, 'vscode', ['typescript', 'backend']);
        } catch (err) {
            console.error('Failed to send context:', err);
        }
        i++;
    }, 5000);
}

simulateActivity();
