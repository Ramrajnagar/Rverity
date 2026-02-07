import { Redis } from '@upstash/redis';

// Only create a Redis client if the env vars are present
// This prevents build errors during static generation if secrets aren't available
export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
