import { env, Env } from '#config/env.js';
import { createDBClient, DB } from '#config/database.js';
import { Redis } from '#config/redis.js';
import { createLogger, Logger } from '#utils/logger.js';
import { ApplicationStates } from '#types/types.js';
import Hooks from '@poppinss/hooks'
import type { HookHandler } from '@poppinss/hooks/types'

type HookeState = [
  [Application],
  [Application],
]
export interface ApplicationEvents extends Record<string, [any[], any[]]> {
  'app:initiating': HookeState;
  'app:initiated': HookeState;
  'app:starting': HookeState;
  'app:booting': HookeState;
  'app:booted': HookeState;
  'app:ready': HookeState;
  'app:terminating': HookeState;
  'app:terminated': HookeState;
}



/**
 * Central application class that manages all shared services
 */
class Application {
  private state: ApplicationStates = 'created';
  private _isTerminating: boolean = false;
  private _db: DB | null = null;
  private _redis: Redis | null = null;
  private _logger: Logger;
  private _env: Env;

  private _hooks = new Hooks<ApplicationEvents>()

  constructor() {
    this._env = env;
    this._logger = createLogger(this._env);
  }

  /**
   * Get the database client
   */
  get database() {
    return this._db!;
  }

  /**
   * Get the Redis client
   */
  get redis() {
    return this._redis;
  }

  /**
   * Get the logger instance
   */
  get logger() {
    return this._logger;
  }

  /**
   * Get the environment configuration
   */
  get env() {
    return this._env;
  }

  /**
   * Get the current state of the application
   */
  get getState() {
    return this.state;
  }

  /**
     * A boolean to know if the application has been booted
     */
  get isBooted() {
    return this.state !== 'created' && this.state !== 'initiated'
  }

  /**
   * A boolean to know if the application is ready
   */
  get isReady() {
    return this.state === 'ready'
  }

  /**
   * A boolean to know if the application has been terminated
   */
  get isTerminated() {
    return this.state === 'terminated'
  }

  /**
   * A boolean to know if the application is in the middle of getting
   * terminating
   */
  get isTerminating() {
    return this._isTerminating && this.state !== 'terminated'
  }

  /**
 * Return true when `this.env.NODE_ENV === 'production'`
 */
  get inProduction(): boolean {
    return this.env.NODE_ENV === 'production'
  }

  /**
   * Return true when `this.env.NODE_ENV === 'development'`
   */
  get inDev(): boolean {
    return this.env.NODE_ENV === 'development'
  }

  /**
   * Returns true when `this.env.NODE_ENV === 'test'`
   */
  get inTest(): boolean {
    return this.env.NODE_ENV === 'test'
  }

  /**
   * Returns true when `this.env.NODE_ENV === 'local'`
   */
  get inLocal(): boolean {
    return this.env.NODE_ENV === 'local'
  }

  listen(signal: NodeJS.Signals, callback: NodeJS.SignalsListener): this {
    process.on(signal, callback);
    return this;
  }

  once(signal: NodeJS.Signals, callback: NodeJS.SignalsListener): this {
    process.once(signal, callback);
    return this;
  }
  

  initiating(handler: HookHandler<[Application], [Application]>): this {
    this._hooks.add('app:initiating', handler)
    return this
  }

  async init(): Promise<void> {
    
    if (this.state !== 'created') {
      this.logger.debug('app already initialized');
      return;
    }
    this.logger.debug('initializing app');
    Object.freeze(this._env);
    await this._hooks.runner('app:initiating').run(this)
    this._hooks.clear('app:initiating')
    
    this.state = 'initiated';
  }

  /**
 * Register hooks that are called before the app boot
 * process starts
 */
  booting(
    handler: HookHandler<[Application], [Application]>
  ): this {
    this._hooks.add('app:booting', handler)
    return this
  }

  /**
   * Initialize the application
   */
  async boot(): Promise<void> {
    if (this.state !== 'initiated') {
      this.logger.warn('Application is not initialized');
      return;
    }

    /**
     * Execute booting hooks
     */
    await this._hooks.runner('app:booting').run(this)
    this._hooks.clear('app:booting')

    try {
      this.logger.info('🚀 Booting application...');

      this._db = createDBClient(this._env);
      this._redis = new Redis(this._env, this._logger);
      /**
       * Notify the app is booted
      */
      await this._hooks.runner('app:booted').run(this)
      this._hooks.clear('app:booted')
      this.state = 'booted'

      this.logger.info('application booted successfully')


    } catch (error) {
      this.logger.error('❌ Failed to start application:', error);
      throw error;
    }


  }

  async start(callback: (app: this) => void): Promise<void> {
    if (this.state !== 'booted') {
      this.logger.debug(`cannot start app from state ${this.state}`);
      return;
    }

    this.logger.debug('starting app');

    // Initialize database connection
    // await testDbConnection(this._env, this._logger);

    // Initialize Redis connection
    // await initRedis(this._env, this._logger);

    await this._hooks.runner('app:starting').run(this)
    this._hooks.clear('app:starting')

    callback(this);

    await this._hooks.runner('app:ready').run(this)
    this._hooks.clear('app:ready')

    this.state = 'ready';
    this.logger.debug('application ready');

  }

  public terminating(handler: HookHandler<[Application], [Application]>): this {
    this._hooks.add('app:terminating', handler)
    return this;
  }

  /**
   * Stop the application gracefully
   */
  async terminate(): Promise<void> {
    if (this.state === 'created' || this.state === 'terminated') {
      this.logger.debug(`cannot terminate app from state ${this.state}`)
      return
    }

    this.logger.debug('app terminating');

    try {
      this._isTerminating = true;

      // Close Redis connection
      //   await closeRedis();

      // Close database connection
      //   await closeDbConnection();

      await this._hooks.runner('app:terminating').run(this)
      this._hooks.clear('app:terminating')
      this.state = 'terminated'

      this.logger.debug('application terminated successfully');

    } catch (error) {
      this.logger.error('error stopping application:', error);
      throw error;
    }

  }
}

// Export a singleton instance
export const app = new Application();
export { Application }; 