import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../../../services/payment.service';
import { ValidationError } from '../../../utils/errors';

/**
 * Payment Controller
 */
export class PaymentController {
  /**
   * POST /api/v1/payments/send
   * Send payment to a user
   */
  async sendPayment(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ValidationError('User not authenticated');
      }

      const { recipient, amount, note } = req.body;

      if (!recipient) {
        throw new ValidationError('Recipient is required');
      }

      if (!amount) {
        throw new ValidationError('Amount is required');
      }

      const result = await paymentService.sendPayment({
        senderId: req.user.userId,
        recipient,
        amount: String(amount),
        note,
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
   * GET /api/v1/payments/history
   * Get payment history for authenticated user
   */
  async getPaymentHistory(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ValidationError('User not authenticated');
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const result = await paymentService.getPaymentHistory({
        userId: req.user.userId,
        limit,
        offset,
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
   * GET /api/v1/payments/:id
   * Get payment by ID
   */
  async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError('Payment ID is required');
      }

      const payment = await paymentService.getPaymentById(id);

      res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const paymentController = new PaymentController();
