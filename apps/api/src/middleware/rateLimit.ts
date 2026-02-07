
import { FastifyReply, FastifyRequest } from 'fastify';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../config/redis';
import { AuthenticatedRequest } from './auth';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
});

export const rateLimitMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
    // Identify by User ID if auth, otherwise IP
    const userId = (req as AuthenticatedRequest).user?.id || req.ip;

    const { success, limit, reset, remaining } = await ratelimit.limit(userId);

    reply.header('X-RateLimit-Limit', limit);
    reply.header('X-RateLimit-Remaining', remaining);
    reply.header('X-RateLimit-Reset', reset);

    if (!success) {
        return reply.status(429).send({
            statusCode: 429,
            error: 'Too Many Requests',
            message: 'You have exceeded your rate limit. Please upgrade your plan.',
        });
    }
};
