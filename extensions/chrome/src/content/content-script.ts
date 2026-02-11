// Content script - runs on all pages
console.log('NeuroSync content script loaded');

// Listen for selection capture command
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'capture_selection') {
        captureSelection();
        sendResponse({ success: true });
    }
    return true;
});

// Capture selected text
function captureSelection() {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text || text.length === 0) {
        showNotification('No text selected', 'error');
        return;
    }

    // Send to background script
    chrome.runtime.sendMessage({
        type: 'capture_selection',
        text: text
    }, (response) => {
        if (response.success) {
            showNotification('Selection captured!', 'success');
        } else {
            showNotification('Failed to capture selection', 'error');
        }
    });
}

// Show notification overlay
function showNotification(message: string, type: 'success' | 'error') {
    const notification = document.createElement('div');
    notification.className = `neurosync-notification neurosync-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // Fade out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Context menu support (right-click)
document.addEventListener('mouseup', (event) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 0) {
        // Could show a floating button here
        // For now, users can use the keyboard shortcut
    }
});
