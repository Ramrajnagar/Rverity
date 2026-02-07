
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export const errorHandler = (error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    // Log the error
    req.log.error(error);

    // Zod Validation Errors
    if (error instanceof ZodError) {
        return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation Error',
            details: (error as any).errors,
        });
    }

    // Default Error Handling
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return reply.status(statusCode).send({
        statusCode,
        error: statusCode === 500 ? 'Internal Server Error' : 'Error',
        message: statusCode === 500 ? 'Something went wrong' : message,
    });
};
