import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import crypto from 'crypto';

export class ApiKeyService {
    /**
     * Generates a new API key, hashes it, and stores the hash.
     * Returns the raw key (only time it will be seen).
     */
    static async createKey(userId: string, name: string) {
        // 1. Generate a secure random key
        const rawKey = 'sk_neuro_' + crypto.randomBytes(24).toString('hex');

        // 2. Hash it
        const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

        // 3. Store in DB
        const { data, error } = await supabase
            .from('tools')
            .insert({
                user_id: userId,
                name: name,
                api_key_hash: hash,
                last_active: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            id: data.id,
            name: data.name,
            key: rawKey, // Return raw key only once
            createdAt: data.created_at
        };
    }

    static async listKeys(userId: string) {
        const { data, error } = await supabase
            .from('tools')
            .select('id, name, last_active, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async revokeKey(userId: string, keyId: string) {
        const { error } = await supabase
            .from('tools')
            .delete()
            .eq('id', keyId)
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    }

    static async verifyKey(rawKey: string): Promise<string | null> {
        if (!rawKey.startsWith('sk_neuro_')) return null;

        const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

        const { data, error } = await supabase
            .from('tools')
            .select('user_id, last_active')
            .eq('api_key_hash', hash)
            .single();

        if (error || !data) return null;

        // Async update last active
        supabase.from('tools').update({ last_active: new Date().toISOString() }).eq('api_key_hash', hash).then();

        return data.user_id;
    }
}
