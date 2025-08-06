# Secret Key Generation Guide

This guide explains how to generate secure, cryptographically strong secret keys for your Zenith project.

## Overview

The Zenith project includes robust utilities for generating various types of secret keys using Node.js's built-in `crypto.randomBytes()` function, which provides cryptographically secure random values.

## Available Scripts

### 1. Environment Setup with Auto-Generated Secrets

The main setup script now automatically generates secure JWT secrets:

```bash
# Generate .env file with secure JWT secret
npm run setup:env

# Generate for specific environments
npm run setup:env:dev
npm run setup:env:prod
npm run setup:env:test
```

### 2. Standalone Secret Generator

Use the dedicated secret generator for various types of secrets:

```bash
# Show help
npm run generate:secret -- --help

# Generate specific types
npm run generate:jwt
npm run generate:api
npm run generate:session

# Generate custom secrets
npm run generate:secret -- custom 64 hex
npm run generate:secret -- custom 128 base64
```

## Secret Types

### JWT Secret
- **Purpose**: Signing and verifying JSON Web Tokens
- **Format**: Base64 encoded
- **Length**: 32 bytes (256 bits)
- **Example**: `dmKALPGfUhnz29WioWPz7at9Z6dQR5KrD4lyaKy4fAs=`

### API Key
- **Purpose**: API authentication and authorization
- **Format**: Hexadecimal
- **Length**: 32 bytes (256 bits)
- **Example**: `3f3654edf0e0ce57c1092399d824391ad74354a4d8abb32dae0e981b157ff1e5`

### Session Secret
- **Purpose**: Session management and cookies
- **Format**: Base64 encoded
- **Length**: 32 bytes (256 bits)
- **Example**: `K8mN2pQ7vX9zR4tY6wE1sA3dF5gH8jK2lM4nP6qR9sT1uV3wX5yZ7aB9cD1eF3gH`

### Database Encryption Key
- **Purpose**: Encrypting sensitive database fields
- **Format**: Hexadecimal
- **Length**: 32 bytes (256 bits)
- **Example**: `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`

### Password Reset Token
- **Purpose**: Secure password reset links
- **Format**: Base64URL (URL-safe)
- **Length**: 32 bytes (256 bits)
- **Example**: `dmKALPGfUhnz29WioWPz7at9Z6dQR5KrD4lyaKy4fAs`

### Refresh Token
- **Purpose**: Long-lived authentication tokens
- **Format**: Base64URL (URL-safe)
- **Length**: 32 bytes (256 bits)
- **Example**: `K8mN2pQ7vX9zR4tY6wE1sA3dF5gH8jK2lM4nP6qR9sT1uV3wX5yZ7aB9cD1eF3gH`

## Encoding Formats

### Hex
- **Characters**: 0-9, a-f
- **Efficiency**: 50% (2 characters per byte)
- **Use Case**: API keys, database encryption keys

### Base64
- **Characters**: A-Z, a-z, 0-9, +, /
- **Efficiency**: 75% (4 characters per 3 bytes)
- **Use Case**: JWT secrets, session secrets

### Base64URL
- **Characters**: A-Z, a-z, 0-9, -, _
- **Efficiency**: 75% (4 characters per 3 bytes)
- **Use Case**: URL-safe tokens, password reset links

### UTF8
- **Characters**: Full Unicode range
- **Efficiency**: Variable
- **Use Case**: Human-readable secrets (not recommended for security)

## Security Best Practices

### 1. Key Length
- **Minimum**: 32 bytes (256 bits) for most applications
- **Recommended**: 64 bytes (512 bits) for high-security applications
- **Maximum**: 1024 bytes for extreme security requirements

### 2. Storage
- Store secrets in environment variables (`.env` files)
- Never commit secrets to version control
- Use secure secret management services in production

### 3. Rotation
- Rotate secrets regularly (every 90-180 days)
- Implement secret rotation procedures
- Use different secrets for different environments

### 4. Access Control
- Limit access to secret generation scripts
- Use least privilege principle
- Audit secret access and usage

## Usage Examples

### Generate JWT Secret for Production
```bash
npm run generate:jwt
# Copy the output to your production .env file
```

### Generate Multiple API Keys
```bash
npm run generate:api
npm run generate:api
npm run generate:api
# Each call generates a unique key
```

### Generate Custom Encryption Key
```bash
npm run generate:secret -- custom 64 hex
# Generates a 64-byte hex-encoded key
```

### Generate Long Secret for High Security
```bash
npm run generate:secret -- custom 128 base64
# Generates a 128-byte base64-encoded key
```

## Integration with Environment Setup

The `setup-env.js` script automatically generates secure JWT secrets when creating environment files:

```javascript
// In scripts/setup-env.js
function generateJWTSecret() {
  return generateSecretKey(32, 'base64');
}

const defaultConfig = {
  // ... other config
  JWT_SECRET: generateJWTSecret(),
  // ... other config
};
```

## Troubleshooting

### Permission Denied
```bash
chmod +x scripts/generate-secret.js
```

### Node.js Not Found
```bash
# Ensure Node.js is installed and in PATH
node --version
```

### Invalid Arguments
```bash
# Check usage
npm run generate:secret -- --help
```

## Security Considerations

1. **Cryptographic Strength**: Uses `crypto.randomBytes()` for cryptographically secure randomness
2. **Entropy**: Each generated key has high entropy (typically 256+ bits)
3. **Uniqueness**: Each generation produces a unique key
4. **Predictability**: Keys are unpredictable and cannot be guessed

## Compliance

The secret generation utilities comply with:
- **OWASP**: Secure random number generation
- **NIST**: Cryptographic key generation standards
- **RFC 7518**: JWT signature algorithms
- **RFC 4648**: Base64 encoding standards

## Support

For issues or questions about secret generation:
1. Check the troubleshooting section
2. Review the security best practices
3. Consult the Node.js crypto documentation
4. Open an issue in the project repository 