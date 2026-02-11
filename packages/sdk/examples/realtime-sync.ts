import { NeuroSyncClient } from '../src';

const client = new NeuroSyncClient({
    apiKey: 'your-api-key-here',
    endpoint: 'https://rverity.ai',
    enableWebSocket: true,
    debug: true
});

// Listen for real-time events
function setupEventListeners() {
    client.on('connected', () => {
        console.log('✅ Connected to real-time sync');
    });

    client.on('disconnected', () => {
        console.log('❌ Disconnected from real-time sync');
    });

    client.on('error', (error) => {
        console.error('🔴 Error:', error);
    });

    client.on('memory', (memory) => {
        console.log('📝 New memory received:', memory);
        // Update UI, trigger notifications, etc.
    });

    client.on('sync', (data) => {
        console.log('🔄 Sync event:', data);
    });
}

// Connect to real-time sync
async function connectRealtime() {
    setupEventListeners();
    client.connectRealtime();

    console.log('Connecting to real-time sync...');
}

// Send context while connected
async function sendContextRealtime() {
    // This will be sent via HTTP, but updates will come via WebSocket
    await client.sendContext(
        'Debugging WebSocket connection issue',
        'vscode',
        ['debug', 'websocket']
    );
}

// Disconnect when done
function disconnectRealtime() {
    client.disconnectRealtime();
    console.log('Disconnected from real-time sync');
}

// Example: Monitor real-time activity
async function monitorActivity() {
    await connectRealtime();

    // Keep connection alive
    setInterval(() => {
        if (client.isRealtimeConnected()) {
            console.log('📡 Still connected');
        } else {
            console.log('⚠️  Connection lost, reconnecting...');
            client.connectRealtime();
        }
    }, 30000); // Check every 30 seconds
}

// Run example
monitorActivity();

// Cleanup on exit
process.on('SIGINT', () => {
    console.log('\nCleaning up...');
    client.destroy();
    process.exit(0);
});
