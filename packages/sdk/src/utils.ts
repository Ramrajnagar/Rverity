import type { EventType, EventHandler } from './types';

export class EventEmitter {
    private events: Map<EventType, Set<EventHandler>> = new Map();

    on(event: EventType, handler: EventHandler): void {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event)!.add(handler);
    }

    off(event: EventType, handler: EventHandler): void {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.delete(handler);
        }
    }

    emit(event: EventType, data?: unknown): void {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    removeAllListeners(event?: EventType): void {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number;
        delayMs?: number;
        backoff?: boolean;
    } = {}
): Promise<T> {
    const { maxAttempts = 3, delayMs = 1000, backoff = true } = options;

    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            if (attempt < maxAttempts) {
                const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
                await sleep(delay);
            }
        }
    }

    throw lastError || new Error('Retry failed');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delayMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delayMs);
    };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delayMs: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;

    return (...args: Parameters<T>) => {
        const now = Date.now();

        if (now - lastCall >= delayMs) {
            lastCall = now;
            fn(...args);
        }
    };
}
