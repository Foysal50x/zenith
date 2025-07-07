import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { app } from '#core/application.js';
import { users, type User, type NewUser } from '#db/schema.js';
import { AuthenticationError, ConflictError } from '#utils/errors.js';
import { generateSecureToken } from '#utils/helpers.js';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * Hash a password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, app.env.BCRYPT_SALT_ROUNDS);
};

/**
 * Verify a password
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Generate JWT tokens
 */
export const generateTokens = async (user: User): Promise<AuthTokens> => {
  const payload = {
    userId: user.id,
    email: user.email,
    type: 'access' as const,
  };

  const accessToken = jwt.sign(payload, app.env.JWT_SECRET);

  const refreshToken = generateSecureToken(32);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, app.env.JWT_SECRET) as any;
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }
};

/**
 * Convert User to AuthUser
 */
const toAuthUser = (user: User): AuthUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> => {
  const { email, password, name } = data;

  // Check if user already exists
  const existingUser = await app.database?.select().from(users).where(eq(users.email, email));
  if (existingUser && existingUser.length > 0) {
    throw new ConflictError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, app.env.BCRYPT_SALT_ROUNDS);

  // Create user
  const newUser: NewUser = {
    email,
    password: hashedPassword,
    name,
  };

  const [user] = await app.database!.insert(users).values(newUser).returning();

  // Generate tokens
  const tokens = await generateTokens(user!);

  return { user: user!, tokens };
};

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
  const { email, password } = credentials;

  // Find user
  const [user] = await app.database!.select().from(users).where(eq(users.email, email));
  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AuthenticationError('Invalid credentials');
  }

  // Generate tokens
  const tokens = await generateTokens(user);

  return { user, tokens };
};

/**
 * Refresh access token
 * @param refreshToken - The refresh token to refresh
 * @returns The new access token
 */
export const refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  // In a real application, you would validate the refresh token against a database
  console.log('refreshToken', refreshToken);
  // For now, we'll just generate a new access token
  const payload = {
    userId: 'temp',
    email: 'temp@example.com',
    type: 'access' as const,
  };

  const accessToken = jwt.sign(payload, app.env.JWT_SECRET);

  return { accessToken };
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<AuthUser> => {
  const [user] = await app.database!.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) {
    throw new AuthenticationError('User not found');
  }

  return toAuthUser(user);
};

/**
 * Update user profile
 */
export const updateProfile = async (userId: string, updates: { name?: string; email?: string }): Promise<AuthUser> => {
  // If email is being updated, check if it's already taken
  if (updates.email) {
    const existingUser = await app.database.select().from(users).where(eq(users.email, updates.email)).limit(1);
    if (existingUser.length > 0 && existingUser[0]?.id !== userId) {
      throw new ConflictError('Email already in use');
    }
  }

  const [user] = await app.database.update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  if (!user) {
    throw new Error('Failed to update user');
  }

  app.logger.info('User profile updated:', { userId: user.id, email: user.email });

  return toAuthUser(user);
};

/**
 * Change user password
 */
export const changePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
  // Find user
  const [user] = await app.database.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) {
    throw new AuthenticationError('User not found');
  }

  // Verify current password
  const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new AuthenticationError('Current password is incorrect');
  }

  // Hash new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update password
  await app.database.update(users)
    .set({ password: hashedNewPassword, updatedAt: new Date() })
    .where(eq(users.id, userId));

  app.logger.info('User password changed:', { userId: user.id, email: user.email });
}; 