
import { FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from '../config/supabase';

export interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        id: string;
        email?: string;
    };
}

export const requireAuth = async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({ error: 'Missing Authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    // DEVELOPMENT ONLY: Allow specific dev key
    if (process.env.NODE_ENV !== 'production' && token === 'dev_key') {
        req.log.warn('⚠️  Auth bypassed using dev_key');
        (req as AuthenticatedRequest).user = {
            id: 'dev_user_123', // Static ID for dev
            email: 'dev@neurosync.ai'
        };
        return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return reply.status(401).send({ error: 'Invalid or expired token' });
    }

    // Attach user to request
    (req as AuthenticatedRequest).user = {
        id: user.id,
        email: user.email
    };
};
