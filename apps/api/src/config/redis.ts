
import { Redis } from '@upstash/redis';
import { env } from './env';

if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Upstash credentials missing. Redis features will be disabled.');
}

export const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL || 'http://localhost:8080',
    token: env.UPSTASH_REDIS_REST_TOKEN || 'example_token',
});
