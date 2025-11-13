import jwt from 'jsonwebtoken';
import config from '../config';
import { AuthenticationError } from './errors';

export interface JWTPayload {
  userId: string;
  email: string;
  walletAddress: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token for user
 */
export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

/**
 * Decode JWT token without verification (for debugging)
 */
export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    return null;
  }
};
