import { Router } from 'express';
import * as authController from '#http/controllers/auth.controller.js';
import { validate } from '#http/middleware/validate.js';
import { authenticate } from '#http/middleware/auth.js';
import { createRateLimit } from '#http/middleware/rate-limit.js';
import { z } from 'zod';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Rate limiting for auth endpoints
const authRateLimit = createRateLimit({
  points: 5, // 5 attempts
  duration: 60, // per minute
  keyPrefix: 'auth',
});

// Routes
router.post('/register', 
  authRateLimit,
  validate(registerSchema),
  authController.register
);

router.post('/login', 
  authRateLimit,
  validate(loginSchema),
  authController.login
);

router.post('/refresh', 
  validate(refreshSchema),
  authController.refresh
);

router.get('/profile', 
  authenticate,
  authController.getProfile
);

export default router; 