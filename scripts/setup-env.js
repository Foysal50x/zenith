#!/usr/bin/env node

/**
 * Environment Setup Script
 * 
 * This script helps you configure your environment variables
 * for the Node.js Fullstack Starter template.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Default configuration
const defaultConfig = {
  NODE_ENV: 'development',
  PORT: 8080,
  HOST: '0.0.0.0',
  DB: 'postgres',
  DB_URL: 'postgresql://username:password@localhost:5432/database_name',
  REDIS_URL: 'redis://localhost:6379',
  JWT_SECRET: 'your-super-secret-jwt-key-minimum-32-characters-long',
  JWT_EXPIRES_IN: '7d',
  RATE_LIMIT_WINDOW_MS: 60000,
  RATE_LIMIT_MAX_REQUESTS: 100,
  LOG_LEVEL: 'info',
  CORS_ORIGIN: 'http://localhost:5173',
  BCRYPT_SALT_ROUNDS: 12,
  VITE_SERVER_PORT: 5173,
  VITE_SERVER_HOST: 'localhost',
  VITE_SERVER_SSL: false,
};

// Environment-specific overrides
const envOverrides = {
  development: {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
  },
  production: {
    NODE_ENV: 'production',
    PORT: 8080,
    LOG_LEVEL: 'info',
    VITE_SERVER_SSL: false,
  },
  test: {
    NODE_ENV: 'test',
    PORT: 8080,
    LOG_LEVEL: 'error',
  },
};

function generateEnvContent(config) {
  return `# =============================================================================
# Node.js Fullstack Starter - Environment Variables
# Generated on: ${new Date().toISOString()}
# =============================================================================

# =============================================================================
# CORE CONFIGURATION
# =============================================================================

NODE_ENV=${config.NODE_ENV}
PORT=${config.PORT}
HOST=${config.HOST}

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================

DB_URL=${config.DB_URL}

# =============================================================================
# REDIS CONFIGURATION
# =============================================================================

REDIS_URL=${config.REDIS_URL}

# =============================================================================
# AUTHENTICATION & SECURITY
# =============================================================================

JWT_SECRET=${config.JWT_SECRET}
JWT_EXPIRES_IN=${config.JWT_EXPIRES_IN}
BCRYPT_SALT_ROUNDS=${config.BCRYPT_SALT_ROUNDS}

# =============================================================================
# RATE LIMITING
# =============================================================================

RATE_LIMIT_WINDOW_MS=${config.RATE_LIMIT_WINDOW_MS}
RATE_LIMIT_MAX_REQUESTS=${config.RATE_LIMIT_MAX_REQUESTS}

# =============================================================================
# LOGGING
# =============================================================================

LOG_LEVEL=${config.LOG_LEVEL}

# =============================================================================
# CORS & SECURITY
# =============================================================================

CORS_ORIGIN=${config.CORS_ORIGIN}

# =============================================================================
# FRONTEND CONFIGURATION (Vite)
# =============================================================================

VITE_SERVER_PORT=${config.VITE_SERVER_PORT}
VITE_SERVER_HOST=${config.VITE_SERVER_HOST}
VITE_SERVER_SSL=${config.VITE_SERVER_SSL}

`;
}

function setupEnvironment() {
  const args = process.argv.slice(2);
  const env = args[0] || 'development';
  
  if (!['development', 'production', 'test'].includes(env)) {
    console.error('❌ Invalid environment. Use: development, production, or test');
    process.exit(1);
  }

  console.log(`🚀 Setting up environment for: ${env}`);
  
  // Merge default config with environment-specific overrides
  const config = {
    ...defaultConfig,
    ...envOverrides[env],
  };

  // Generate .env file content
  const envContent = generateEnvContent(config);
  const envPath = path.join(projectRoot, '.env');

  try {
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Environment file created: ${envPath}`);
    console.log(`📋 Configuration for ${env} environment:`);
    console.log(`   Backend: http://${config.HOST}:${config.PORT}`);
    console.log(`   Frontend: http://${config.VITE_SERVER_HOST}:${config.VITE_SERVER_PORT}`);
    console.log(`   Database: ${config.DB_URL}`);
    console.log(`   Redis: ${config.REDIS_URL}`);
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupEnvironment(); 