import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '#utils/errors.js';

/**
 * Validation middleware
 */
export const validate = (schema: ZodSchema) => {
  //@ts-ignore
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request body
      if (req.body && Object.keys(req.body).length > 0) {
        req.body = schema.parse(req.body);
      }

      // Validate query parameters
      if (req.query && Object.keys(req.query).length > 0) {
        req.query = schema.parse(req.query);
      }

      // Validate URL parameters
      if (req.params && Object.keys(req.params).length > 0) {
        req.params = schema.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        const validationError = new ValidationError(`Validation failed: ${errorMessage}`);
        return next(validationError);
      }
      next(error);
    }
  };
};

/**
 * Validate query parameters
 */
export const validateQuery = (schema: ZodSchema) => {
  //@ts-ignore
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.query);
      
      if (!result.success) {
        const errorMessages = result.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        throw new ValidationError(`Query validation failed: ${errorMessages.map(e => e.message).join(', ')}`);
      }
      
      req.query = result.data;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(error);
      }
      
      next(new ValidationError('Invalid query parameters'));
    }
  };
};

/**
 * Validate route parameters
 */
export const validateParams = (schema: ZodSchema) => {
  //@ts-ignore
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.params);
      
      if (!result.success) {
        const errorMessages = result.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        throw new ValidationError(`Parameter validation failed: ${errorMessages.map(e => e.message).join(', ')}`);
      }
      
      req.params = result.data;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(error);
      }
      
      next(new ValidationError('Invalid route parameters'));
    }
  };
}; 