import { Request, Response, NextFunction } from 'express';
import * as authService from '#services/auth.service.js';
import { AuthenticationError } from '#utils/errors.js';

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    const result = await authService.register({ email, password, name });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
      tokens: result.tokens,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login({ email, password });
    
    res.json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
      tokens: result.tokens,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 */
export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new AuthenticationError('Refresh token is required');
    }
    
    const result = await authService.refreshToken(refreshToken);
    
    res.json({
      message: 'Token refreshed successfully',
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('User not authenticated');
    }
    
    res.json({
      message: 'Profile retrieved successfully',
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthenticationError('User not authenticated');
    }
    
    const { name, email } = req.body;
    
    const user = await authService.updateProfile(userId, { name, email });
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change user password
 */
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthenticationError('User not authenticated');
    }
    
    const { currentPassword, newPassword } = req.body;
    
    await authService.changePassword(userId, currentPassword, newPassword);
    
    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 * @returns void
 * @throws AuthenticationError if user is not authenticated
 */
//@ts-ignore
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}; 