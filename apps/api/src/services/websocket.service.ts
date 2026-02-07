
import { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';
import { redis } from '../config/redis'; // keeping this as it was in original
import { supabase } from '../config/supabase';

interface ConnectedClient {
    ws: WebSocket;
    userId: string;
}

const clients: Set<ConnectedClient> = new Set();

export class WebSocketService {
    static init(app: FastifyInstance) {
        app.get('/v1/ws', { websocket: true }, async (connection: any, req: any) => {
            const { token } = req.query as { token?: string };

            if (!token) {
                if (connection && connection.socket) {
                    connection.socket.close(1008, 'Missing Authorization Token');
                }
                return;
            }

            // DEVELOPMENT MODE BYPASS
            if (process.env.NODE_ENV === 'development' && token === 'dev_key') {
                if (connection && connection.socket) {
                    const userId = 'dev_user_123';
                    const client: ConnectedClient = { ws: connection.socket, userId };
                    clients.add(client);
                    console.log(`[DEV] Client connected: ${userId}`);

                    connection.socket.on('close', () => {
                        clients.delete(client);
                        console.log(`[DEV] Client disconnected: ${userId}`);
                    });
                }
                return;
            }

            const { data: { user }, error } = await supabase.auth.getUser(token);

            if (error || !user) {
                connection.socket.close(1008, 'Invalid Token');
                return;
            }

            const userId = user.id;

            if (!connection || !connection.socket) {
                console.warn('WebSocket connection lost during auth');
                return;
            }

            const client: ConnectedClient = { ws: connection.socket, userId };
            clients.add(client);

            console.log(`Client connected: ${userId}`);

            connection.socket.on('message', (message: any) => {
                // Valid JSON check
                try {
                    const str = message.toString();
                    console.log(`WS Message from ${userId}:`, str);
                } catch (e) { /* ignore */ }
            });

            connection.socket.on('close', () => {
                clients.delete(client);
                console.log(`Client disconnected: ${userId}`);
            });
        });
    }

    static broadcast(userId: string, type: string, payload: any) {
        const message = JSON.stringify({ type, payload });
        for (const client of clients) {
            if (client.userId === userId) {
                if (client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(message);
                }
            }
        }
    }
}
