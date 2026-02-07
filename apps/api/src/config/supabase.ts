
import { createClient } from '@supabase/supabase-js';
import { env } from './env';

if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Supabase credentials missing. Database features will be disabled.');
}

export const supabase = createClient(
    env.SUPABASE_URL || '',
    env.SUPABASE_SERVICE_ROLE_KEY || ''
);
