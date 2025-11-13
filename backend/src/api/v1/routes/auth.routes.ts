import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../../../middleware/auth';
import { authRateLimiter } from '../../../middleware/rateLimit';
import { catchAsync } from '../../../middleware/errorHandler';

const router = Router();

/**
 * @route   POST /api/v1/auth/oauth/google
 * @desc    Mock OAuth login with Google
 * @access  Public
 */
router.post(
  '/oauth/google',
  authRateLimiter,
  catchAsync(authController.oauthGoogle.bind(authController))
);

/**
 * @route   POST /api/v1/auth/register-username
 * @desc    Register a username for authenticated user
 * @access  Private
 */
router.post(
  '/register-username',
  authenticate,
  catchAsync(authController.registerUsername.bind(authController))
);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get('/me', authenticate, catchAsync(authController.getMe.bind(authController)));

/**
 * @route   GET /api/v1/auth/resolve/:username
 * @desc    Resolve username to wallet address
 * @access  Public
 */
router.get(
  '/resolve/:username',
  catchAsync(authController.resolveUsername.bind(authController))
);

export default router;
