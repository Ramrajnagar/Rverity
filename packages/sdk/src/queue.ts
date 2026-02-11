import type { ContextItem } from './types';

interface QueueItem {
    id: string;
    item: ContextItem;
    timestamp: number;
    attempts: number;
}

export class OfflineQueue {
    private queue: QueueItem[] = [];
    private storageKey = 'neurosync_offline_queue';
    private maxQueueSize = 1000;
    private maxAttempts = 3;
    private isProcessing = false;

    constructor(
        private debug = false
    ) {
        this.loadFromStorage();
    }

    add(item: ContextItem): void {
        const queueItem: QueueItem = {
            id: this.generateId(),
            item,
            timestamp: Date.now(),
            attempts: 0
        };

        this.queue.push(queueItem);

        // Limit queue size
        if (this.queue.length > this.maxQueueSize) {
            this.queue.shift(); // Remove oldest item
            this.log('Queue size exceeded, removed oldest item');
        }

        this.saveToStorage();
        this.log('Added item to queue:', queueItem.id);
    }

    async process(
        sendFn: (item: ContextItem) => Promise<void>
    ): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }

        this.isProcessing = true;
        this.log('Processing queue:', this.queue.length, 'items');

        const itemsToProcess = [...this.queue];
        const failedItems: QueueItem[] = [];

        for (const queueItem of itemsToProcess) {
            try {
                await sendFn(queueItem.item);
                this.log('Successfully sent queued item:', queueItem.id);

                // Remove from queue
                this.queue = this.queue.filter(item => item.id !== queueItem.id);
            } catch (error) {
                this.log('Failed to send queued item:', queueItem.id, error);

                queueItem.attempts++;

                if (queueItem.attempts >= this.maxAttempts) {
                    this.log('Max attempts reached for item:', queueItem.id);
                    // Remove from queue after max attempts
                    this.queue = this.queue.filter(item => item.id !== queueItem.id);
                } else {
                    failedItems.push(queueItem);
                }
            }
        }

        // Keep failed items in queue
        this.queue = [...failedItems, ...this.queue.filter(
            item => !itemsToProcess.some(processed => processed.id === item.id)
        )];

        this.saveToStorage();
        this.isProcessing = false;

        this.log('Queue processing complete. Remaining items:', this.queue.length);
    }

    getSize(): number {
        return this.queue.length;
    }

    clear(): void {
        this.queue = [];
        this.saveToStorage();
        this.log('Queue cleared');
    }

    getItems(): QueueItem[] {
        return [...this.queue];
    }

    private loadFromStorage(): void {
        if (typeof localStorage === 'undefined') {
            return;
        }

        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.queue = JSON.parse(stored);
                this.log('Loaded queue from storage:', this.queue.length, 'items');
            }
        } catch (error) {
            this.log('Failed to load queue from storage:', error);
        }
    }

    private saveToStorage(): void {
        if (typeof localStorage === 'undefined') {
            return;
        }

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
        } catch (error) {
            this.log('Failed to save queue to storage:', error);
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    private log(...args: unknown[]): void {
        if (this.debug) {
            console.log('[OfflineQueue]', ...args);
        }
    }
}
