import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Env } from '#config/env.js';
import { Logger } from '#utils/logger.js';

// Guard clause for database URL
function guardDBURL(env: Env) {
  if (!env.DB_URL) {
    console.error('❌ DB_URL is not set');
    process.exit(1);
  }
}


export const createPostgresClient = (env: Env) => {
  return postgres(env.DB_URL, {
    max: 10, // Maximum number of connections
    idle_timeout: 20, // Idle timeout in seconds
    connect_timeout: 10, // Connection timeout in seconds
    prepare: false, // Disable prepared statements for better compatibility
  });
};

export const createDBClient = (env: Env) => {
  const client = getDefaultDBDriver(env);
  return drizzle(client);
};

export const getDefaultDBDriver = (env: Env) => {
  guardDBURL(env);
  switch (env.DB) {
    case 'postgres':
      return createPostgresClient(env);
    default:
      throw new Error(`Unsupported database driver: ${env.DB}`);
  }
};

export type DB = ReturnType<typeof createDBClient>;

// Test database connection
export const testDbConnection = async (env: Env, logger: Logger): Promise<void> => {
  try {
    const client = getDefaultDBDriver(env);
    await client`SELECT 1`;
    logger.info('✅ Database connection established');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Close database connection
export const closeDbConnection = async (env: Env, logger: Logger): Promise<void> => {
  const client = getDefaultDBDriver(env);
  try {
    await client.end();
    logger.info('🔌 Database connection closed');
  } catch (error) {
    logger.error('❌ Error closing database connection:', error);
    throw error;
  }
};
