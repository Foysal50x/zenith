#!/usr/bin/env node

/**
 * Secret Key Generator Utility
 * 
 * This script generates cryptographically secure secret keys
 * for various purposes (JWT, API keys, encryption, etc.)
 */

import crypto from 'crypto';

/**
 * Generates a cryptographically secure random secret key
 * @param {number} length - Length of the secret key in bytes
 * @param {string} encoding - Encoding format ('hex', 'base64', 'base64url', 'utf8')
 * @returns {string} Generated secret key
 */
function generateSecretKey(length = 32, encoding = 'hex') {
  return crypto.randomBytes(length).toString(encoding);
}

/**
 * Generates a JWT secret key (base64 encoded, 32 bytes = 256 bits)
 * @returns {string} JWT secret key
 */
function generateJWTSecret() {
  return generateSecretKey(32, 'base64');
}

/**
 * Generates an API key (hex encoded, 32 bytes = 256 bits)
 * @returns {string} API key
 */
function generateAPIKey() {
  return generateSecretKey(32, 'hex');
}

/**
 * Generates a session secret (base64 encoded, 32 bytes = 256 bits)
 * @returns {string} Session secret
 */
function generateSessionSecret() {
  return generateSecretKey(32, 'base64');
}

/**
 * Generates a database encryption key (hex encoded, 32 bytes = 256 bits)
 * @returns {string} Database encryption key
 */
function generateDBEncryptionKey() {
  return generateSecretKey(32, 'hex');
}

/**
 * Generates a password reset token (base64url encoded, 32 bytes = 256 bits)
 * @returns {string} Password reset token
 */
function generateResetToken() {
  return generateSecretKey(32, 'base64url');
}

/**
 * Generates a refresh token (base64url encoded, 32 bytes = 256 bits)
 * @returns {string} Refresh token
 */
function generateRefreshToken() {
  return generateSecretKey(32, 'base64url');
}

/**
 * Generates a custom secret key with specified parameters
 * @param {number} length - Length in bytes
 * @param {string} encoding - Encoding format
 * @returns {string} Custom secret key
 */
function generateCustomSecret(length = 32, encoding = 'hex') {
  return generateSecretKey(length, encoding);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'jwt';
const length = parseInt(args[1]) || 32;
const encoding = args[2] || 'hex';

function printUsage() {
  console.log(`
🔐 Secret Key Generator Utility

Usage: node generate-secret.js [type] [length] [encoding]

Types:
  jwt              - JWT secret (base64, 32 bytes)
  api              - API key (hex, 32 bytes)
  session          - Session secret (base64, 32 bytes)
  db-encrypt       - Database encryption key (hex, 32 bytes)
  reset-token      - Password reset token (base64url, 32 bytes)
  refresh-token    - Refresh token (base64url, 32 bytes)
  custom           - Custom secret with specified length and encoding

Examples:
  node generate-secret.js jwt
  node generate-secret.js api
  node generate-secret.js custom 64 base64
  node generate-secret.js custom 128 hex

Encodings: hex, base64, base64url, utf8
`);
}

function main() {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  let secret;
  let type;

  switch (command) {
    case 'jwt':
      secret = generateJWTSecret();
      type = 'JWT Secret';
      break;
    case 'api':
      secret = generateAPIKey();
      type = 'API Key';
      break;
    case 'session':
      secret = generateSessionSecret();
      type = 'Session Secret';
      break;
    case 'db-encrypt':
      secret = generateDBEncryptionKey();
      type = 'Database Encryption Key';
      break;
    case 'reset-token':
      secret = generateResetToken();
      type = 'Password Reset Token';
      break;
    case 'refresh-token':
      secret = generateRefreshToken();
      type = 'Refresh Token';
      break;
    case 'custom':
      secret = generateCustomSecret(length, encoding);
      type = `Custom Secret (${length} bytes, ${encoding})`;
      break;
    default:
      console.error('❌ Unknown command:', command);
      printUsage();
      process.exit(1);
  }

  console.log(`\n🔐 Generated ${type}:`);
  console.log('='.repeat(50));
  console.log(secret);
  console.log('='.repeat(50));
  console.log(`\n📏 Length: ${secret.length} characters`);
  console.log(`🔢 Entropy: ~${Math.log2(secret.length) * 8} bits`);
  console.log(`\n💡 Copy this secret to your .env file or configuration.`);
  console.log(`⚠️  Keep this secret secure and never commit it to version control!`);
}

// Run the generator
main(); 