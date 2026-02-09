import { createClient } from '@supabase/supabase-js';

// Ensure these are set in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.warn('Supabase Admin: Missing env vars');
}

// Check if we have the service key. If not, we might be in a build environment without secrets.
// We can't return a functional client without the key, but we can prevent the build from crashing
// if this module is imported but not actively used for data fetching during build.
export const supabaseAdmin = (supabaseUrl && serviceRoleKey)
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : ({} as any); // Fallback to empty object to prevent build crash, will fail at runtime if used without key
