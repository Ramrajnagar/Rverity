
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import websocket from '@fastify/websocket';
import { healthRoutes } from './routes/health';
import { memoryRoutes } from './routes/memory';
import { paymentRoutes } from './routes/payment';
import { apiKeyRoutes } from './routes/api-keys';
import { errorHandler } from './middleware/errorHandler';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { env } from './config/env';

export const buildApp = async () => {
    const app = Fastify({
        logger: {
            level: env.NODE_ENV === 'development' ? 'debug' : 'info',
            // transport: env.NODE_ENV === 'development' ? {
            //     target: 'pino-pretty',
            //     options: {
            //         translateTime: 'HH:MM:ss Z',
            //         ignore: 'pid,hostname',
            //     },
            // } : undefined,
        }
    });

    app.setErrorHandler(errorHandler);

    // Rate Limiter
    app.addHook('onRequest', rateLimitMiddleware);

    // Register Plugins
    await app.register(helmet, { global: true });

    await app.register(cors, {
        origin: [env.FRONTEND_URL, 'http://localhost:3000'], // Allow Configured URL + Localhost fallback
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    await app.register(websocket);

    // Initialize WebSocket Routes
    const { WebSocketService } = await import('./services/websocket.service');
    WebSocketService.init(app);

    // Register Routes
    await app.register(healthRoutes, { prefix: '/v1/health' });
    await app.register(memoryRoutes, { prefix: '/v1/memory' });
    await app.register(paymentRoutes, { prefix: '/v1/payment' });
    await app.register(apiKeyRoutes, { prefix: '/v1/api-keys' });

    app.get('/', async () => {
        return { status: 'ok', message: 'NeuroSync AI API' };
    });

    return app;
};
