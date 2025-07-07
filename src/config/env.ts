import { z } from 'zod';
import 'dotenv/config';

// Define the schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'local']).default('development'),
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default('0.0.0.0'),
  
  // Database
  DB: z.enum(['postgres', 'mysql', 'sqlite', 'mongodb']).default('postgres'),
  DB_URL: z.string().url(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_HOST: z.string().optional().default('localhost'),
  DB_PORT: z.coerce.number().optional().default(5432),
  DB_DATABASE: z.string().optional().default(''),
  
  // Redis
  REDIS_URL: z.string().url(),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100), // 100 requests per minute
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  
  // Security
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

  // Vite Server
  VITE_SERVER_PORT: z.coerce.number().default(5173),
  VITE_SERVER_HOST: z.string().default('localhost'),
  VITE_SERVER_SSL: z.coerce.boolean().default(false),
  VITE_SERVER_SSL_KEY: z.string().optional(),
  VITE_SERVER_SSL_CERT: z.string().optional(),
  
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
};

// Export the validated environment configuration
export const env = parseEnv();

export type Env = z.infer<typeof envSchema>;

export { envSchema }; 