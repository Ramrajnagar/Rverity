import { EventEmitter } from './utils';
import type { Memory } from './types';

export class WebSocketManager extends EventEmitter {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private isIntentionallyClosed = false;

    constructor(
        private url: string,
        private apiKey: string,
        private debug = false
    ) {
        super();
    }

    connect(): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.log('WebSocket already connected');
            return;
        }

        this.isIntentionallyClosed = false;
        const wsUrl = `${this.url.replace('http', 'ws')}/v1/ws?token=${this.apiKey}`;

        try {
            this.ws = new WebSocket(wsUrl);
            this.setupEventHandlers();
        } catch (error) {
            this.log('Failed to create WebSocket:', error);
            this.emit('error', error);
            this.scheduleReconnect();
        }
    }

    disconnect(): void {
        this.isIntentionallyClosed = true;
        this.stopHeartbeat();

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        this.emit('disconnected');
    }

    send(data: unknown): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            this.log('WebSocket not connected, cannot send data');
        }
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }

    private setupEventHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            this.log('WebSocket connected');
            this.reconnectAttempts = 0;
            this.startHeartbeat();
            this.emit('connected');
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            } catch (error) {
                this.log('Failed to parse message:', error);
            }
        };

        this.ws.onerror = (error) => {
            this.log('WebSocket error:', error);
            this.emit('error', error);
        };

        this.ws.onclose = (event) => {
            this.log('WebSocket closed:', event.code, event.reason);
            this.stopHeartbeat();
            this.emit('disconnected');

            if (!this.isIntentionallyClosed) {
                this.scheduleReconnect();
            }
        };
    }

    private handleMessage(data: { type: string; payload?: unknown }): void {
        switch (data.type) {
            case 'memory':
                this.emit('memory', data.payload as Memory);
                break;
            case 'sync':
                this.emit('sync', data.payload);
                break;
            case 'pong':
                // Heartbeat response
                break;
            default:
                this.log('Unknown message type:', data.type);
        }
    }

    private startHeartbeat(): void {
        this.heartbeatInterval = setInterval(() => {
            if (this.isConnected()) {
                this.send({ type: 'ping' });
            }
        }, 30000); // 30 seconds
    }

    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    private scheduleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.log('Max reconnect attempts reached');
            this.emit('error', new Error('Failed to reconnect after maximum attempts'));
            return;
        }

        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
        this.reconnectAttempts++;

        this.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

        setTimeout(() => {
            this.connect();
        }, delay);
    }

    private log(...args: unknown[]): void {
        if (this.debug) {
            console.log('[WebSocketManager]', ...args);
        }
    }
}
