/**
 * URL Encoder Utility
 * 
 * Handles URL encoding for special characters in passwords and connection strings
 */

/**
 * URL encode a password for use in connection strings
 * @param password - The password to encode
 * @returns The URL-encoded password
 */
export function encodePassword(password: string): string {
  return encodeURIComponent(password);
}

/**
 * Build a PostgreSQL connection URL with proper encoding
 * @param config - Database connection configuration
 * @returns A properly formatted PostgreSQL connection string
 */
export function buildPostgresUrl(config: {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  ssl?: boolean;
}): string {
  const encodedUsername = encodeURIComponent(config.username);
  const encodedPassword = encodeURIComponent(config.password);
  const sslParam = config.ssl ? '?ssl=true' : '';
  
  return `postgresql://${encodedUsername}:${encodedPassword}@${config.host}:${config.port}/${config.database}${sslParam}`;
}

/**
 * Build a Redis connection URL with proper encoding
 * @param config - Redis connection configuration
 * @returns A properly formatted Redis connection string
 */
export function buildRedisUrl(config: {
  password?: string;
  host: string;
  port: number;
  database?: number;
}): string {
  const auth = config.password ? `${encodeURIComponent(config.password)}@` : '';
  const db = config.database ? `/${config.database}` : '';
  
  return `redis://${auth}${config.host}:${config.port}${db}`;
}

/**
 * Parse a connection URL and safely extract components
 * @param url - The connection URL to parse
 * @returns Parsed connection components
 */
export function parseConnectionUrl(url: string): {
  protocol: string;
  username?: string;
  password?: string;
  host: string;
  port: number;
  database?: string;
} {
  const urlObj = new URL(url);
  
  const result: {
    protocol: string;
    username?: string;
    password?: string;
    host: string;
    port: number;
    database?: string;
  } = {
    protocol: urlObj.protocol.replace(':', ''),
    host: urlObj.hostname,
    port: parseInt(urlObj.port),
  };
  
  if (urlObj.username) {
    result.username = decodeURIComponent(urlObj.username);
  }
  
  if (urlObj.password) {
    result.password = decodeURIComponent(urlObj.password);
  }
  
  const database = urlObj.pathname.slice(1);
  if (database) {
    result.database = database;
  }
  
  return result;
}

/**
 * Common special characters and their URL encodings
 */
export const URL_ENCODING_MAP = {
  '@': '%40',
  ':': '%3A',
  '/': '%2F',
  '?': '%3F',
  '#': '%23',
  '[': '%5B',
  ']': '%5D',
  '%': '%25',
  ' ': '%20',
  '+': '%2B',
  '&': '%26',
  '=': '%3D',
  '\\': '%5C',
  '"': '%22',
  "'": '%27',
  '<': '%3C',
  '>': '%3E',
  '|': '%7C',
  '^': '%5E',
  '`': '%60',
  '{': '%7B',
  '}': '%7D',
  '~': '%7E'
} as const;

/**
 * Display encoding examples for debugging
 */
export function getEncodingExamples(): Record<string, string> {
  const examples: Record<string, string> = {};
  
  Object.entries(URL_ENCODING_MAP).forEach(([char, encoded]) => {
    examples[`my${char}pass`] = `my${encoded}pass`;
  });
  
  return examples;
} 