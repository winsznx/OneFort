import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticate } from '../../../middleware/auth';
import { paymentRateLimiter } from '../../../middleware/rateLimit';
import { catchAsync } from '../../../middleware/errorHandler';

const router = Router();

/**
 * @route   POST /api/v1/payments/send
 * @desc    Send payment to a user
 * @access  Private
 */
router.post(
  '/send',
  authenticate,
  paymentRateLimiter,
  catchAsync(paymentController.sendPayment.bind(paymentController))
);

/**
 * @route   GET /api/v1/payments/history
 * @desc    Get payment history for authenticated user
 * @access  Private
 */
router.get(
  '/history',
  authenticate,
  catchAsync(paymentController.getPaymentHistory.bind(paymentController))
);

/**
 * @route   GET /api/v1/payments/:id
 * @desc    Get payment by ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  catchAsync(paymentController.getPaymentById.bind(paymentController))
);

export default router;
