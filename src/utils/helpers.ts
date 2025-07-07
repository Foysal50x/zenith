import type { Request } from 'express';
import { createHash, randomBytes } from 'node:crypto';
import { env } from '#config/env.js';

/**
 * Get client IP address from request
 */
export const getClientIp = (req: Request): string => {
  // Check for forwarded headers first (for proxy/load balancer scenarios)
  const forwardedFor = req.headers['x-forwarded-for'] as string;
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  // Check for real IP header
  const realIp = req.headers['x-real-ip'] as string;
  if (realIp) {
    return realIp.trim();
  }

  // Fallback to connection remote address
  return req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
};

/**
 * Generate a random string
 */
export const generateRandomString = (length: number): string => {
  return randomBytes(length).toString('hex');
};

/**
 * Generate a secure token
 */
export const generateSecureToken = (length: number): string => {
  return randomBytes(length).toString('base64url');
};

/**
 * Hash a string using SHA-256
 */
export const hashString = (input: string): string => {
  return createHash('sha256').update(input).digest('hex');
};

/**
 * Sleep for a given number of milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if a value is a valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize a string for safe output
 */
export const sanitizeString = (str: string): string => {
  return str.replace(/[<>]/g, '');
};

/**
 * Convert string to slug
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if running in production environment
 */
export const isProduction = (): boolean => {
  return env.NODE_ENV === 'production';
};

/**
 * Check if running in development environment
 */
export const isDevelopment = (): boolean => {
  return env.NODE_ENV === 'development';
};

/**
 * Check if running in test environment
 */
export const isTest = (): boolean => {
  return env.NODE_ENV === 'test';
}; 