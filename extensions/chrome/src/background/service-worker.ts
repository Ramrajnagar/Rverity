import { ConfigManager, NeuroSyncClient } from '../shared/utils';

let client: NeuroSyncClient | null = null;

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
    console.log('NeuroSync extension installed');

    // Set default badge
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setBadgeBackgroundColor({ color: '#a855f7' });

    // Check if configured
    const isConfigured = await ConfigManager.isConfigured();
    if (!isConfigured) {
        // Open options page
        chrome.runtime.openOptionsPage();
    } else {
        await initializeClient();
    }
});

// Initialize on startup
chrome.runtime.onStartup.addListener(async () => {
    await initializeClient();
});

// Initialize client
async function initializeClient() {
    const config = await ConfigManager.getConfig();
    if (config.apiKey) {
        client = new NeuroSyncClient(config.apiKey, config.endpoint);

        // Process any queued items
        await client.processQueue();

        // Update badge
        chrome.action.setBadgeText({ text: '✓' });
    }
}

// Tab updates - capture page visits
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.title) {
        const config = await ConfigManager.getConfig();

        if (!config.captureHistory) return;
        if (!client) await initializeClient();
        if (!client) return;

        // Check if should capture
        const shouldCapture = await ConfigManager.shouldCapture(tab.url);
        if (!shouldCapture) return;

        // Skip chrome:// and extension pages
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
            return;
        }

        // Check incognito
        if (config.respectIncognito && tab.incognito) {
            return;
        }

        try {
            await client.sendContext(
                `Visited: ${tab.title}`,
                'chrome',
                ['page-visit', 'browsing'],
                {
                    url: tab.url,
                    title: tab.title,
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Failed to capture page visit:', error);
        }
    }
});

// Bookmark creation
chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
    const config = await ConfigManager.getConfig();

    if (!config.captureBookmarks) return;
    if (!client) await initializeClient();
    if (!client) return;

    if (bookmark.url && bookmark.title) {
        try {
            await client.sendContext(
                `Bookmarked: ${bookmark.title}`,
                'chrome',
                ['bookmark'],
                {
                    url: bookmark.url,
                    title: bookmark.title,
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Failed to capture bookmark:', error);
        }
    }
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handleMessage(message, sender).then(sendResponse);
    return true; // Keep channel open for async response
});

async function handleMessage(message: any, sender: chrome.runtime.MessageSender) {
    switch (message.type) {
        case 'capture_selection':
            if (!client) await initializeClient();
            if (!client) return { success: false, error: 'Not configured' };

            try {
                await client.sendContext(
                    message.text,
                    'chrome',
                    ['selection', 'manual'],
                    {
                        url: sender.tab?.url,
                        title: sender.tab?.title,
                        timestamp: new Date().toISOString()
                    }
                );
                return { success: true };
            } catch (error) {
                return { success: false, error: (error as Error).message };
            }

        case 'search':
            if (!client) await initializeClient();
            if (!client) return { success: false, error: 'Not configured', results: [] };

            try {
                const results = await client.search(message.query);
                return { success: true, results };
            } catch (error) {
                return { success: false, error: (error as Error).message, results: [] };
            }

        case 'get_recent':
            if (!client) await initializeClient();
            if (!client) return { success: false, error: 'Not configured', memories: [] };

            try {
                const memories = await client.getRecentMemories(message.limit || 20);
                return { success: true, memories };
            } catch (error) {
                return { success: false, error: (error as Error).message, memories: [] };
            }

        case 'config_updated':
            await initializeClient();
            return { success: true };

        default:
            return { success: false, error: 'Unknown message type' };
    }
}

// Command shortcuts
chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case 'search':
            // Open popup in search mode
            chrome.action.openPopup();
            break;

        case 'capture_selection':
            // Send message to content script to capture selection
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, { type: 'capture_selection' });
            }
            break;
    }
});

// Network status monitoring
if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
    window.addEventListener('online', async () => {
        console.log('Back online, processing queue');
        if (client) {
            await client.processQueue();
        }
    });
}

console.log('NeuroSync background service worker loaded');
