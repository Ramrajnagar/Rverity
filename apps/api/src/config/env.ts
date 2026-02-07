
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    HOST: z.string().default('0.0.0.0'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Application URLs
    FRONTEND_URL: z.string().url().default('http://localhost:3000'),

    // PayPal Configuration
    PAYPAL_MODE: z.enum(['sandbox', 'live']).default('sandbox'),
    PAYPAL_CLIENT_ID: z.string().optional(),
    PAYPAL_SECRET: z.string().optional(),
    PAYPAL_WEBHOOK_ID: z.string().optional(),

    // Legacy / Optional Stripe
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
