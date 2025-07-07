import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '#services/auth.service.js';
import { AuthenticationError } from '#utils/errors.js';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

/**
 * Authentication middleware
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 * @returns void
 * @throws AuthenticationError if authentication fails
 */
//@ts-ignore
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication required');
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const payload = verifyToken(token);
    
    if (payload.type !== 'access') {
      throw new AuthenticationError('Invalid token type');
    }
    
    req.user = {
      id: payload.userId,
      email: payload.email,
    };
    
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware
 */
//@ts-ignore
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.substring(7);
    
    const payload = verifyToken(token);
    
    if (payload.type === 'access') {
      req.user = {
        id: payload.userId,
        email: payload.email,
      };
    }
    
    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
}; 