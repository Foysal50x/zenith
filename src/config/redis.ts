import { createClient } from 'redis';
import { Env } from '#config/env.js';
import { Logger } from '#utils/logger.js';


export const createRedisClient = (env: Env, logger: Logger) => {
  const redisConfig = {
    url: env.REDIS_URL,
    socket: {
      connectTimeout: 5000,
      lazyConnect: true,
    },
    retryDelayOnFailover: 100,
    enableAutoPipelining: true,
  };
  const client = createClient(redisConfig);
  client.on('error', (error) => {
    logger.error('Redis Client Error:', error);
  });
  client.on('connect', () => {
    logger.info('Redis Client Connected');
  });
  client.on('ready', () => {
    logger.info('Redis Client Ready');
  });
  client.on('end', () => {
    logger.info('Redis Client Disconnected');
  });
  client.on('reconnecting', () => {
    logger.info('Redis Client Reconnecting');
  });
  
  return client;
};

export type RedisClientType = ReturnType<typeof createRedisClient>;

export class Redis {
  private client: RedisClientType;
  
  constructor(env: Env, logger: Logger) {
    this.client = createRedisClient(env, logger);
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: string) {
    return await this.client.set(key, value);
  }

  async del(key: string) {
    return await this.client.del(key);
  }

  async close() {
    await this.client.quit();
  }

  async ping() {
    return await this.client.ping();
  }

}


