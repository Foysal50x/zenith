import express, { Express, Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'node:events';
import compression from 'compression';
import morgan from 'morgan';
import { Application } from '#core/application.js';
import { getClientIp } from '#utils/helpers.js';
import { createCorsMiddleware, createErrorHandlingMiddleware, createHelmetMiddleware, createViteProxyMiddleware } from '#http/middleware/global.js';
import { createHealthCheckMiddleware } from "#http/middleware/health-check.js";

export interface HttpKernalEvents {
  'kernal:error': [Error];
  'kernal:booted': [];
}

declare interface HttpKernal {
  on<U extends keyof HttpKernalEvents>(event: U, listener: (...args: HttpKernalEvents[U]) => void): this;
  emit<U extends keyof HttpKernalEvents>(event: U, ...args: HttpKernalEvents[U]): boolean;
}

/**
 * HTTP Kernal class that manages Express application
 */
class HttpKernal extends EventEmitter {
  private _expressApp: Express | null = null;
  private _booted: boolean = false;

  constructor(
    private readonly app: Application,
  ) {
    super();
  }

  /**
   * Get the Express app instance
   */
  get expressApp(): Express {
    if (!this._expressApp) {
      throw new Error('Server is not booted');
    }
    return this._expressApp;
  }

  /**
   * Check if the server is ready
   */
  get isReady(): boolean {
    return this._booted;
  }


  setExpressApp(expressApp: Express, {
    timeout = 30000,
    keepAliveTimeout = 65000,
    headersTimeout = 66000,
  }: {
    timeout?: number;
    keepAliveTimeout?: number;
    headersTimeout?: number;
  } = {}): void {
    this._expressApp = expressApp;
    this._expressApp.set('timeout', timeout);
    this._expressApp.set('keepAliveTimeout', keepAliveTimeout);
    this._expressApp.set('headersTimeout', headersTimeout);
  }

  /**
   * Setup middleware stack
   */
  private setupMiddleware(): void {
    const { logger } = this.app;
    // Security middleware
    this._expressApp!.use(createHelmetMiddleware(this.app));

    // CORS middleware
    this._expressApp!.use(createCorsMiddleware(this.app));

    // Compression middleware
    this._expressApp!.use(compression());

    // Body parsing middleware
    this._expressApp!.use(express.json({ limit: '10mb' }));
    this._expressApp!.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging middleware
    this._expressApp!.use(morgan('combined', {
      stream: {
        write: (message: string) => {
          logger.info(message.trim());
        },
      },
    }));

    // Request IP middleware
    //@ts-ignore
    this._expressApp!.use((req: Request, res: Response, next: NextFunction) => {
      // Use a custom property to store the client IP
      (req as any).clientIp = getClientIp(req);
      next();
    });

    // Vite proxy middleware
    this._expressApp!.use('/', createViteProxyMiddleware(this.app));

    // Health check middleware
    this._expressApp!.use('/health', createHealthCheckMiddleware(this.app));
  }

  /**
   * Setup routes
   */
  private setupRoutes(): void {
    // API routes will be added here
    //@ts-ignore
    this._expressApp!.get('/api', (req: Request, res: Response) => {
      res.json({
        message: 'Node.js Fullstack Starter API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      });
    });

    // Import and use auth routes
    import('#http/routes/auth.routes.js')
    .then(({ default: authRoutes }) => {
      this.app.logger.info('Loading auth routes');
      this._expressApp!.use('/api/auth', authRoutes);
    }).catch((error) => {
      this.app.logger.error('Failed to load auth routes:', error);
    });

    // 404 handler
    this._expressApp!.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
      });
    });
  }

  /**
   * Setup error handling
   */
  private setupErrorHandling(): void {
    // Error handling middleware
    this._expressApp!.use(createErrorHandlingMiddleware(this.app));
  }

  /**
   * Boot the HTTP server
   */
  boot(): void {
    if (this._booted) {
      this.app.logger.warn('HTTP Server is already booted');
      return;
    }

    this.app.logger.info('Booting HTTP Server...');
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
    this._booted = true;
    this.app.logger.info('HTTP Server booted successfully');
    this.emit('kernal:booted');
  }
}

/**
 * Create a new HTTP kernal instance
 */
export function createHttpKernal(app: Application): HttpKernal {
  return new HttpKernal(app);
}