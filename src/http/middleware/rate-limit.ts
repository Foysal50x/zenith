import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { app } from '#core/application.js';
import { TooManyRequestsError } from '#utils/errors.js';
import { getClientIp } from '#utils/helpers.js';

// Lazy rate limiter creation
let rateLimiter: RateLimiterRedis | null = null;

const getRateLimiter = () => {
  if (!rateLimiter) {
    rateLimiter = new RateLimiterRedis({
      storeClient: app.redis,
      keyPrefix: 'rl',
      points: app.env.RATE_LIMIT_MAX_REQUESTS,
      duration: Math.floor(app.env.RATE_LIMIT_WINDOW_MS / 1000),
      blockDuration: Math.floor(app.env.RATE_LIMIT_WINDOW_MS / 1000),
    });
  }
  return rateLimiter;
};

/**
 * Rate limiting middleware
 */
export const rateLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const key = (req as any).clientIp || getClientIp(req);
    const limiter = getRateLimiter();
    await limiter.consume(key);
    next();
  } catch (rateLimiterRes: any) {
    // Rate limit exceeded
    if (rateLimiterRes instanceof Error) {
      app.logger.error('Rate limiter error:', rateLimiterRes);
      return next(rateLimiterRes);
    }

    const remainingPoints = rateLimiterRes.remainingPoints;
    const msBeforeNext = rateLimiterRes.msBeforeNext;
    const totalHits = rateLimiterRes.totalHits;

    // Set rate limit headers
    res.set({
      'Retry-After': Math.round(msBeforeNext / 1000) || 1,
      'X-RateLimit-Limit': app.env.RATE_LIMIT_MAX_REQUESTS,
      'X-RateLimit-Remaining': remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString(),
    });

    app.logger.warn('Rate limit exceeded:', {
      ip: (req as any).clientIp || getClientIp(req),
      totalHits,
      remainingPoints,
      msBeforeNext,
    });

    next(new TooManyRequestsError('Too many requests, please try again later'));
  }
};

/**
 * Create a custom rate limiter
 */
export const createRateLimit = (options: {
  points: number;
  duration: number;
  blockDuration?: number;
  keyPrefix?: string;
}) => {
  const customRateLimiter = new RateLimiterRedis({
    storeClient: app.redis,
    keyPrefix: options.keyPrefix || 'rl_custom',
    points: options.points,
    duration: options.duration,
    blockDuration: options.blockDuration || options.duration,
  });

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = (req as any).clientIp || getClientIp(req);
      await customRateLimiter.consume(key);
      next();
    } catch (rateLimiterRes: any) {
      if (rateLimiterRes instanceof Error) {
        app.logger.error('Custom rate limiter error:', rateLimiterRes);
        return next(rateLimiterRes);
      }

      const msBeforeNext = rateLimiterRes.msBeforeNext;

      res.set({
        'Retry-After': Math.round(msBeforeNext / 1000) || 1,
        'X-RateLimit-Limit': options.points,
        'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
        'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString(),
      });

      next(new TooManyRequestsError('Rate limit exceeded for this operation'));
    }
  };
}; 