import { ConfigManager } from '../shared/utils';

document.addEventListener('DOMContentLoaded', async () => {
    // Load current config
    await loadConfig();

    // Setup save button
    document.getElementById('saveBtn')?.addEventListener('click', saveConfig);

    // Setup reset button
    document.getElementById('resetBtn')?.addEventListener('click', resetConfig);
});

async function loadConfig() {
    const config = await ConfigManager.getConfig();

    // API settings
    (document.getElementById('apiKey') as HTMLInputElement).value = config.apiKey;
    (document.getElementById('endpoint') as HTMLInputElement).value = config.endpoint;

    // Capture settings
    (document.getElementById('autoCapture') as HTMLInputElement).checked = config.autoCapture;
    (document.getElementById('captureHistory') as HTMLInputElement).checked = config.captureHistory;
    (document.getElementById('captureBookmarks') as HTMLInputElement).checked = config.captureBookmarks;
    (document.getElementById('captureSelection') as HTMLInputElement).checked = config.captureSelection;
    (document.getElementById('respectIncognito') as HTMLInputElement).checked = config.respectIncognito;

    // Privacy settings
    (document.getElementById('blacklist') as HTMLTextAreaElement).value = config.blacklist.join('\n');
    (document.getElementById('whitelist') as HTMLTextAreaElement).value = config.whitelist.join('\n');
}

async function saveConfig() {
    const statusEl = document.getElementById('status');
    if (!statusEl) return;

    try {
        // Get values
        const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value.trim();
        const endpoint = (document.getElementById('endpoint') as HTMLInputElement).value.trim();

        if (!apiKey) {
            throw new Error('API key is required');
        }

        const config = {
            apiKey,
            endpoint: endpoint || 'https://rverity.ai',
            autoCapture: (document.getElementById('autoCapture') as HTMLInputElement).checked,
            captureHistory: (document.getElementById('captureHistory') as HTMLInputElement).checked,
            captureBookmarks: (document.getElementById('captureBookmarks') as HTMLInputElement).checked,
            captureSelection: (document.getElementById('captureSelection') as HTMLInputElement).checked,
            respectIncognito: (document.getElementById('respectIncognito') as HTMLInputElement).checked,
            blacklist: (document.getElementById('blacklist') as HTMLTextAreaElement).value
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 0),
            whitelist: (document.getElementById('whitelist') as HTMLTextAreaElement).value
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 0)
        };

        await ConfigManager.setConfig(config);

        // Notify background script
        chrome.runtime.sendMessage({ type: 'config_updated' });

        // Show success
        statusEl.className = 'status success';
        statusEl.textContent = '✓ Settings saved successfully!';

        setTimeout(() => {
            statusEl.className = 'status';
        }, 3000);

    } catch (error) {
        statusEl.className = 'status error';
        statusEl.textContent = `Error: ${(error as Error).message}`;
    }
}

async function resetConfig() {
    if (!confirm('Are you sure you want to reset all settings to defaults?')) {
        return;
    }

    await ConfigManager.setConfig({
        apiKey: '',
        endpoint: 'https://rverity.ai',
        autoCapture: true,
        captureHistory: true,
        captureBookmarks: true,
        captureSelection: true,
        respectIncognito: true,
        blacklist: [],
        whitelist: []
    });

    await loadConfig();

    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.className = 'status success';
        statusEl.textContent = '✓ Settings reset to defaults';

        setTimeout(() => {
            statusEl.className = 'status';
        }, 3000);
    }
}
