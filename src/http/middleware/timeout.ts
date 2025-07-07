import { Request, Response, NextFunction } from 'express';
import { Application } from '#core/application.js';

/**
 * Middleware to set request timeout
 */
export function createRequestTimeoutMiddleware(timeoutMs: number = 30000) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(timeoutMs);
    res.setTimeout(timeoutMs);
    next();
  };
}

/**
 * Middleware to set response timeout
 */
export function createResponseTimeoutMiddleware(timeoutMs: number = 30000) {
//@ts-ignore
  return (req: Request, res: Response, next: NextFunction) => {
    res.setTimeout(timeoutMs, () => {
      res.status(408).json({ 
        error: 'Request Timeout',
        message: 'The request took too long to process'
      });
    });
    next();
  };
}

/**
 * Middleware to set connection timeout with cleanup
 */
export function createConnectionTimeoutMiddleware(app: Application, timeoutMs: number = 30000) {
  //@ts-ignore
  return (req: Request, res: Response, next: NextFunction) => {
    // Set connection timeout
    if (req.socket) {
      req.socket.setTimeout(timeoutMs, () => {
        app.logger.warn('Connection timeout', {
          ip: req.ip,
          url: req.url,
          method: req.method,
          timeout: timeoutMs
        });
        
        // Close the connection
        req.socket.destroy();
      });
    }

    // Handle connection close
    req.on('close', () => {
      app.logger.debug('Connection closed', {
        ip: req.ip,
        url: req.url,
        method: req.method
      });
    });

    next();
  };
}

/**
 * Middleware for different timeout strategies based on route
 */
export function createAdaptiveTimeoutMiddleware(app: Application) {
  return (req: Request, res: Response, next: NextFunction) => {
    const path = req.path;
    let timeout = 30000; // Default 30 seconds

    // Set different timeouts based on route type
    if (path.startsWith('/api/auth')) {
      timeout = 15000; // 15 seconds for auth
    } else if (path.startsWith('/api/upload')) {
      timeout = 300000; // 5 minutes for uploads
    } else if (path.startsWith('/api/stream')) {
      timeout = 600000; // 10 minutes for streaming
    } else if (path.startsWith('/api/process')) {
      timeout = 180000; // 3 minutes for processing
    }

    // Set timeouts
    req.setTimeout(timeout);
    res.setTimeout(timeout);

    // Log timeout configuration
    app.logger.debug('Setting timeout for request', {
      path,
      timeout,
      method: req.method
    });

    next();
  };
}

/**
 * Middleware to handle timeout errors gracefully
 */
export function createTimeoutErrorHandler(app: Application) {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      app.logger.warn('Request timeout', {
        error: error.message,
        code: error.code,
        url: req.url,
        method: req.method,
        ip: req.ip
      });

      // Only send response if headers haven't been sent
      if (!res.headersSent) {
        res.status(408).json({
          error: 'Request Timeout',
          message: 'The request timed out',
          timestamp: new Date().toISOString()
        });
      }
      return;
    }

    next(error);
  };
}

/**
 * Utility to set connection-specific timeouts
 */
export function setConnectionTimeouts(connection: any, timeoutMs: number = 30000) {
  connection.setTimeout(timeoutMs);
  connection.setKeepAlive(true, 60000); // Enable keep-alive with 60s delay
} 