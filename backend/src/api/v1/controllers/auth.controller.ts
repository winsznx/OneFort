import { Request, Response, NextFunction } from 'express';
import { authService } from '../../../services/auth.service';
import { ValidationError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Auth Controller
 */
export class AuthController {
  /**
   * POST /api/v1/auth/oauth/google
   * Mock OAuth login (for demo)
   */
  async oauthGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, picture } = req.body;

      if (!email) {
        throw new ValidationError('Email is required');
      }

      const result = await authService.oauthLogin({
        email,
        displayName: name,
        avatarUrl: picture,
        provider: 'google',
        providerId: `google_${email}`,
      });

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: result.user.id,
            email: result.user.email,
            username: result.user.username,
            displayName: result.user.displayName,
            avatarUrl: result.user.avatarUrl,
            walletAddress: result.user.walletAddress,
            usernameVerified: result.user.usernameVerified,
          },
          token: result.token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/auth/register-username
   * Register a username for the authenticated user
   */
  async registerUsername(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ValidationError('User not authenticated');
      }

      const { username } = req.body;

      if (!username) {
        throw new ValidationError('Username is required');
      }

      // Validate username format
      const usernameRegex = /^[a-zA-Z0-9_-]{3,50}$/;
      if (!usernameRegex.test(username)) {
        throw new ValidationError(
          'Username must be 3-50 characters and contain only letters, numbers, underscores, and hyphens'
        );
      }

      const result = await authService.registerUsername({
        userId: req.user.userId,
        username,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/auth/me
   * Get current authenticated user
   */
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ValidationError('User not authenticated');
      }

      const user = await authService.getUserById(req.user.userId);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          walletAddress: user.walletAddress,
          usernameVerified: user.usernameVerified,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/auth/resolve/:username
   * Resolve a username to wallet address
   */
  async resolveUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      if (!username) {
        throw new ValidationError('Username is required');
      }

      const result = await authService.resolveUsername(username);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
