import type { Server as NodeHttpsServer } from 'node:https'
import { Server as NodeHttpServer } from 'node:http';
import { app, Application } from '#core/application.js';
import { createHttpKernal } from '#http/server/http-kernal.js';
import express, { Express } from 'express';
import { Logger } from '#utils/logger.js';

/**
 * HTTP Server Process class that manages the Node.js HTTP server lifecycle
 * Optimized for high-scale scenarios with memory-efficient connection tracking
 */
export class HttpServerProcess {
  private _isRunning: boolean = false;
  private _activeConnections: number = 0;
  private _maxConnections: number = 10_000; // Configurable limit
  private _connectionCount: number = 0; // Lightweight counter
  private _memoryWarningThreshold: number = 0.8; // 80% of available memory

  /**
   * Check if the server is running
   */
  get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Get current connection count (lightweight)
   */
  get connectionCount(): number {
    return this._connectionCount;
  }

  /**
   * Get active connections size (for monitoring)
   */
  get activeConnectionsSize(): number {
    return this._activeConnections;
  }

  /**
   * Set maximum connections limit
   */
  setMaxConnections(max: number): void {
    this._maxConnections = max;
  }

  /**
   * Monitor memory usage and connection health
   */
  private monitorMemoryAndConnections(app: Application, interval: number = 30000): NodeJS.Timeout {
    return setInterval(() => {
      import('node:v8').then((v8) => {
        const heapStats = v8.getHeapStatistics();
        app.logger.debug('*** In-Monitor Diagnostic ***', {
          noe: process.env['NODE_OPTIONS'],
          v8HeapLimitMB: Math.floor(heapStats.heap_size_limit / (1024 * 1024)),
          currentHeapTotalMB: Math.floor(process.memoryUsage().heapTotal / (1024 * 1024))
      });
      })
      const memUsage = process.memoryUsage();
      const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
      const heapTotalMB = memUsage.heapTotal / 1024 / 1024;
      const rssMB = memUsage.rss / 1024 / 1024;

      // Log memory usage every 30 seconds
      app.logger.debug('memory and connection status', {
        connections: this.connectionCount,
        activeConnections: this.activeConnectionsSize,
        heapUsed: `${heapUsedMB.toFixed(2)}MB`,
        heapTotal: `${heapTotalMB.toFixed(2)}MB`,
        rss: `${rssMB.toFixed(2)}MB`,
        memoryUsage: `${((heapUsedMB / heapTotalMB) * 100).toFixed(1)}%`
      });

      // Memory warning threshold
      if (heapUsedMB / heapTotalMB > this._memoryWarningThreshold) {
        app.logger.warn('high memory usage detected', {
          heapUsed: `${heapUsedMB.toFixed(2)}MB`,
          heapTotal: `${heapTotalMB.toFixed(2)}MB`,
          usage: `${((heapUsedMB / heapTotalMB) * 100).toFixed(1)}%`
        });
      }

      // Connection limit warning
      if (this.connectionCount > this._maxConnections * 0.8) {
        app.logger.warn('approaching connection limit', {
          current: this.connectionCount,
          limit: this._maxConnections,
          percentage: `${((this.connectionCount / this._maxConnections) * 100).toFixed(1)}%`
        });
      }
    }, interval);
  }

  private close(nodeHttpServer: NodeHttpServer | NodeHttpsServer, logger: Logger): Promise<void> {
    return new Promise((resolve) => {
      logger.debug('closing http server process')

      // If there are active connections, destroy them
      // if (this.activeConnectionsSize > 0) {
      //   logger.debug('destroying active connections');
      //   this._activeConnections.forEach(connection => {
      //     connection.destroy();
      //   });
      //   this._activeConnections.clear();
      // }

      // Reset counters
      this._connectionCount = 0;
      this._activeConnections = 0;

      // Close the server
      nodeHttpServer.close(() => resolve());
    })
  }

  private monitor(server: NodeHttpServer | NodeHttpsServer, app: Application) {

    const timer = this.monitorMemoryAndConnections(app);
    /**
     * Close the HTTP server when the application begins to
     * terminate
     */
    app.terminating(async () => {
      app.logger.debug('terminating signal received')
      await this.close(server, app.logger)
      clearInterval(timer)
      app.logger.debug('http server closed')
    })

    /**
     * Terminate the app when the HTTP server crashes
     */
    server.once('error', (error: NodeJS.ErrnoException) => {
      app.logger.debug(`http server crashed with error ${error.message}`)
      app.logger.error(error)
      process.exitCode = 1
      app.terminate()
    })

  }

  /**
   * Start the HTTP server process
   */
  async start(): Promise<void> {
    // const startTime = process.hrtime()
    if (this._isRunning) {
      app.logger.warn('HTTP Server Process is already running');
      return;
    }

    try {
      app.initiating(async (app) => {
        this.registerGracefulShutdown(app)
      })
      // Initialize the application
      await app.init();
      // Start the application first
      await app.boot();

      await app.start(async (app) => {
        const httpKernal = createHttpKernal(app);
        httpKernal.setExpressApp(express());
        httpKernal.boot();

        const { server } = await this.listen(httpKernal.expressApp, app)
        this._isRunning = true;

        this.monitor(server, app)

      });

    } catch (error) {
      app.logger.error('Failed to start HTTP Server Process:', error);
      throw error;
    }
  }


  private async listen(
    expressApp: Express,
    app: Application
  ): Promise<{ server: NodeHttpServer | NodeHttpsServer, port: number; host: string }> {
    return new Promise((resolve, reject) => {

      const host = app.env.HOST || '0.0.0.0'
      const port = Number(app.env.PORT || '8080')
      const nodeHttpServer = expressApp.listen(port, host)

      nodeHttpServer.keepAliveTimeout = expressApp.get('keepAliveTimeout') || 65000;
      nodeHttpServer.headersTimeout = expressApp.get('headersTimeout') || 66000;
      nodeHttpServer.timeout = expressApp.get('timeout') || 30000;

      nodeHttpServer.on('connection', (connection) => {
        this._activeConnections++;
        connection.on('close', () => {
          this._activeConnections--;
        });
      });

      nodeHttpServer.once('listening', () => {
        app.logger.info(`server running at http://${host}:${port}`);
        app.logger.info(`health check available at http://${host}:${port}/health`);
        app.logger.info(`api available at http://${host}:${port}/api`);
        resolve({ server: nodeHttpServer, port, host })
      })

      nodeHttpServer.once('error', (error: NodeJS.ErrnoException) => {
        app.logger.error(`error on http server: ${error.message}`, error);
        reject(error)
      })
    })
  }

  private registerGracefulShutdown(app: Application) {
    /**
     * Graceful shutdown handler
     */
    const gracefulShutdown = async (signal: string) => {
      if (app.getState === 'terminated' || app.getState === 'created') {
        app.logger.debug('app already terminated or created');
        process.exit(0);
      }
      app.logger.info(`📡 Received ${signal}. Starting graceful shutdown...`);

      try {
        await app.terminate();
        process.exit(0);
      } catch (error) {
        app.logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    };

    app.listen('SIGINT', gracefulShutdown);
    app.listen('SIGTERM', gracefulShutdown);
    app.listen('SIGQUIT', gracefulShutdown);
    app.listen('SIGBREAK', gracefulShutdown);

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      app.logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      app.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }

}


// Export a singleton instance
export const httpServerProcess = new HttpServerProcess(); 