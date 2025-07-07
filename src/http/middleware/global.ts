import { AppError, isOperationalError } from "#utils/errors.js";
import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";
import { Application } from "#core/application.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import helmet from 'helmet';
import cors from 'cors';

export function createHelmetMiddleware(app: Application) {
    const viteDevServer = `${app.env.VITE_SERVER_HOST}:${app.env.VITE_SERVER_PORT}`;
    const directives = app.inProduction ? {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
    } : {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "'unsafe-inline'", // Allow inline scripts for Vite HMR
            "'unsafe-eval'", // Allow eval for development
        ],
        styleSrc: [
            "'self'",
            "'unsafe-inline'", // Allow inline styles for Vite
            "https://fonts.googleapis.com", // Allow Google Fonts
        ],
        connectSrc: [
            "'self'",
            "ws:", // Allow WebSocket connections for HMR
            "wss:", // Allow secure WebSocket connections
            `http://${viteDevServer}`, // Allow connections to Vite dev server
            `ws://${viteDevServer}`, // Allow WebSocket to Vite dev server
        ],
        imgSrc: ["'self'", "data:", "blob:"],
    };

    return helmet({
        contentSecurityPolicy: {
            directives,
        },
    });
}

export function createCorsMiddleware(app: Application) {
    return cors({
        origin: app.env.CORS_ORIGIN,
        credentials: true,
    });
}

export function createErrorHandlingMiddleware(app: Application) {
    //@ts-ignore
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
        const { logger } = app;

        // Log error
        logger.error('Request error:', {
            error: error.message,
            stack: error.stack,
            method: req.method,
            url: req.originalUrl,
            ip: (req as any).clientIp || req.ip,
            userAgent: req.get('User-Agent'),
        });

        // Handle operational errors
        if (isOperationalError(error)) {
            const appError = error as AppError;
            return res.status(appError.statusCode).json({
                error: appError.message,
                statusCode: appError.statusCode,
                timestamp: new Date().toISOString(),
            });
        }

        // Handle non-operational errors
        return res.status(500).json({
            error: 'Internal Server Error',
            message: app.inProduction
                ? 'Something went wrong'
                : error.message,
            timestamp: new Date().toISOString(),
        });
    }
}

export function createViteProxyMiddleware(app: Application) {
    const vitePort = app.env.VITE_SERVER_PORT || '5173';
    const viteHost = app.env.VITE_SERVER_HOST || 'localhost';
    const viteUrl = `http://${viteHost}:${vitePort}`;

    app.logger.info('Setting up Vite proxy', {
        viteUrl,
        environment: app.env.NODE_ENV,
    });

    // Proxy all non-API, non-events requests to Vite dev server
    const viteProxy = createProxyMiddleware({
        target: viteUrl,
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying for HMR
    });

    // apply proxy to all routes except API, events and health for development environment only
    return (req: Request, res: Response, next: NextFunction) => {
        
        if (app.inProduction) {
            const currentDir = path.dirname(fileURLToPath(import.meta.url));
            return express.static(path.join(currentDir, '../../../public/dist'))(req, res, next);
        }

        // Skip proxy for API routes and SSE events
        if (req.path.startsWith('/api') || req.path.startsWith('/events') || req.path.startsWith('/health')) {
            return next();
        }

        // Log the proxy request
        app.logger.debug('proxying request to vite', {
            method: req.method,
            url: req.url,
            target: viteUrl,
        });

        // Proxy everything else to Vite with error handling
        try {
            return viteProxy(req, res, next);
        } catch (error: any) {
            app.logger.debug('vite proxy error', {
                error: error.message,
                stack: error.stack,
                method: req.method,
                url: req.url,
                target: viteUrl,
            });
            return res.status(503).json({
                status: 'error',
                error: 'Development server unavailable',
                message: 'Vite development server is not running. Please start it with: npm run dev:client',
                timestamp: new Date().toISOString(),
            });
        }
    }
}
