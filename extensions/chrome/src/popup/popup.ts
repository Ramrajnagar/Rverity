// Popup script
let currentTab: 'recent' | 'search' = 'recent';
let searchTimeout: NodeJS.Timeout | null = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Setup tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.getAttribute('data-tab') as 'recent' | 'search';
            loadContent();
        });
    });

    // Setup search
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    searchInput.addEventListener('input', () => {
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.trim()) {
                currentTab = 'search';
                document.querySelector('[data-tab="search"]')?.classList.add('active');
                document.querySelector('[data-tab="recent"]')?.classList.remove('active');
                loadContent(searchInput.value.trim());
            } else {
                currentTab = 'recent';
                document.querySelector('[data-tab="recent"]')?.classList.add('active');
                document.querySelector('[data-tab="search"]')?.classList.remove('active');
                loadContent();
            }
        }, 300);
    });

    // Setup settings button
    document.getElementById('settingsBtn')?.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });

    // Load initial content
    await loadContent();
});

async function loadContent(query?: string) {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = '<div class="loading">Loading...</div>';

    try {
        let memories: any[] = [];

        if (currentTab === 'search' && query) {
            const response = await chrome.runtime.sendMessage({
                type: 'search',
                query
            });

            if (response.success) {
                memories = response.results;
            } else {
                throw new Error(response.error || 'Search failed');
            }
        } else {
            const response = await chrome.runtime.sendMessage({
                type: 'get_recent',
                limit: 20
            });

            if (response.success) {
                memories = response.memories;
            } else {
                throw new Error(response.error || 'Failed to load memories');
            }
        }

        if (memories.length === 0) {
            content.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div>No memories found</div>
                </div>
            `;
            return;
        }

        content.innerHTML = memories.map(memory => {
            const memoryContent = memory.payload?.content || memory.content || 'Unknown';
            const source = memory.payload?.source || memory.source || 'unknown';
            const tags = memory.payload?.tags || memory.tags || [];
            const timestamp = memory.payload?.timestamp || memory.timestamp;
            const date = timestamp ? new Date(timestamp).toLocaleString() : 'Unknown time';

            return `
                <div class="memory-item">
                    <div class="memory-content">${escapeHtml(memoryContent)}</div>
                    <div class="memory-meta">
                        <div>
                            ${tags.map((tag: string) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                        </div>
                        <div>${date}</div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        content.innerHTML = `
            <div class="error">
                ${escapeHtml((error as Error).message)}
            </div>
        `;
    }
}

function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
