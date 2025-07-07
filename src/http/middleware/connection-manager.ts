import { Request, Response, NextFunction } from 'express';
import { Application } from '#core/application.js';

/**
 * Middleware to explicitly close connections after response
 */
export function createConnectionManagerMiddleware(app: Application) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Method 1: Close connection after response is sent
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any, cb?: () => void) {
      const result = originalEnd.call(this, chunk, encoding, cb);
      
      // Explicitly close the connection
      if (req.socket && !req.socket.destroyed) {
        req.socket.end();
      }
      
      return result;
    };

    // Method 2: Handle connection close events
    req.on('close', () => {
      app.logger.debug('Client disconnected', {
        ip: req.ip,
        url: req.url,
        method: req.method
      });
    });

    // Method 3: Set keep-alive timeout for this specific request
    if (req.socket) {
      req.socket.setTimeout(30000); // 30 seconds
    }
    
    next();
  };
}

/**
 * Middleware for streaming responses with proper connection handling
 */
export function createStreamingMiddleware(app: Application) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Handle client disconnect
    req.on('close', () => {
      app.logger.debug('Client disconnected from stream');
      res.end();
    });

    // Handle server shutdown
    req.on('error', (error) => {
      app.logger.error('Request error:', error);
      res.end();
    });

    next();
  };
}

/**
 * Middleware for long-running operations with connection management
 */
export function createLongRunningMiddleware(app: Application) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Set a longer timeout for long-running operations
    req.setTimeout(300000); // 5 minutes
    res.setTimeout(300000);

    // Handle client disconnect during long operation
    req.on('close', () => {
      app.logger.debug('Client disconnected during long operation');
      // Clean up any ongoing operations here
    });

    // Handle server shutdown during long operation
    req.on('error', (error) => {
      app.logger.error('Request error during long operation:', error);
      // Clean up any ongoing operations here
    });

    next();
  };
}

/**
 * Utility function to force close connection
 */
export function forceCloseConnection(req: Request, res: Response) {
  // Send response first
  res.end();
  
  // Then close the connection
  if (req.socket && !req.socket.destroyed) {
    req.socket.destroy();
  }
}

/**
 * Utility function to gracefully close connection
 */
export function gracefulCloseConnection(req: Request, res: Response) {
  // Send response
  res.end();
  
  // Wait a bit then close
  setTimeout(() => {
    if (req.socket && !req.socket.destroyed) {
      req.socket.end();
    }
  }, 100);
} 