import { eq, and, or, desc } from 'drizzle-orm';
import { db } from '../database/connection';
import { payments, users } from '../database/schema';
import { NotFoundError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export interface SendPaymentData {
  senderId: string;
  recipient: string; // Can be username, email, or wallet address
  amount: string;
  note?: string;
}

export interface PaymentHistoryQuery {
  userId: string;
  limit?: number;
  offset?: number;
}

/**
 * Payment Service
 * Handles payment processing and transactions
 */
export class PaymentService {
  /**
   * Send payment to a user
   * Mock implementation for demo (no actual blockchain transaction)
   */
  async sendPayment(data: SendPaymentData) {
    try {
      // Validate amount
      const amount = parseFloat(data.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new ValidationError('Invalid payment amount');
      }

      // Get sender
      const sender = await db.query.users.findFirst({
        where: eq(users.id, data.senderId),
      });

      if (!sender) {
        throw new NotFoundError('Sender not found');
      }

      // Resolve recipient
      const recipient = await this.resolveRecipient(data.recipient);

      if (!recipient) {
        throw new NotFoundError('Recipient not found');
      }

      if (sender.id === recipient.id) {
        throw new ValidationError('Cannot send payment to yourself');
      }

      // Create payment record
      const [payment] = await db
        .insert(payments)
        .values({
          senderId: sender.id,
          recipientId: recipient.id,
          amount: data.amount,
          currency: 'USDO',
          status: 'pending',
          type: 'send',
          note: data.note,
        })
        .returning();

      // Mock blockchain transaction (in production, this would call OneChain)
      const txHash = this.generateMockTxHash();

      // Update payment with transaction details
      const [completedPayment] = await db
        .update(payments)
        .set({
          status: 'completed',
          txHash,
          blockNumber: String(Math.floor(Math.random() * 1000000)),
          gasUsed: String(Math.floor(Math.random() * 100000)),
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(payments.id, payment.id))
        .returning();

      logger.info('Payment sent successfully', {
        paymentId: payment.id,
        from: sender.username || sender.email,
        to: recipient.username || recipient.email,
        amount: data.amount,
      });

      return {
        payment: completedPayment,
        sender: {
          username: sender.username,
          displayName: sender.displayName,
          walletAddress: sender.walletAddress,
        },
        recipient: {
          username: recipient.username,
          displayName: recipient.displayName,
          walletAddress: recipient.walletAddress,
        },
      };
    } catch (error) {
      logger.error('Payment failed', error);
      throw error;
    }
  }

  /**
   * Get payment history for a user
   */
  async getPaymentHistory(query: PaymentHistoryQuery) {
    try {
      const limit = query.limit || 50;
      const offset = query.offset || 0;

      // Get payments where user is sender or recipient
      const userPayments = await db.query.payments.findMany({
        where: or(eq(payments.senderId, query.userId), eq(payments.recipientId, query.userId)),
        orderBy: [desc(payments.createdAt)],
        limit,
        offset,
        with: {
          senderId: true,
          recipientId: true,
        },
      });

      // Enrich with user data
      const enrichedPayments = await Promise.all(
        userPayments.map(async (payment) => {
          const sender = await db.query.users.findFirst({
            where: eq(users.id, payment.senderId),
          });

          const recipient = await db.query.users.findFirst({
            where: eq(users.id, payment.recipientId),
          });

          return {
            ...payment,
            sender: {
              id: sender?.id,
              username: sender?.username,
              displayName: sender?.displayName,
              walletAddress: sender?.walletAddress,
            },
            recipient: {
              id: recipient?.id,
              username: recipient?.username,
              displayName: recipient?.displayName,
              walletAddress: recipient?.walletAddress,
            },
            direction: payment.senderId === query.userId ? 'sent' : 'received',
          };
        })
      );

      return {
        payments: enrichedPayments,
        total: enrichedPayments.length,
        limit,
        offset,
      };
    } catch (error) {
      logger.error('Failed to fetch payment history', error);
      throw error;
    }
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string) {
    const payment = await db.query.payments.findFirst({
      where: eq(payments.id, paymentId),
    });

    if (!payment) {
      throw new NotFoundError('Payment');
    }

    const sender = await db.query.users.findFirst({
      where: eq(users.id, payment.senderId),
    });

    const recipient = await db.query.users.findFirst({
      where: eq(users.id, payment.recipientId),
    });

    return {
      ...payment,
      sender: {
        username: sender?.username,
        displayName: sender?.displayName,
        walletAddress: sender?.walletAddress,
      },
      recipient: {
        username: recipient?.username,
        displayName: recipient?.displayName,
        walletAddress: recipient?.walletAddress,
      },
    };
  }

  /**
   * Resolve recipient by username, email, or wallet address
   */
  private async resolveRecipient(recipient: string) {
    // Remove @ prefix if present
    const cleanRecipient = recipient.startsWith('@') ? recipient.substring(1) : recipient;

    // Try to find by username first
    let user = await db.query.users.findFirst({
      where: eq(users.username, cleanRecipient),
    });

    // Try email if username not found
    if (!user && cleanRecipient.includes('@')) {
      user = await db.query.users.findFirst({
        where: eq(users.email, cleanRecipient),
      });
    }

    // Try wallet address if email not found
    if (!user && cleanRecipient.startsWith('0x')) {
      user = await db.query.users.findFirst({
        where: eq(users.walletAddress, cleanRecipient),
      });
    }

    return user;
  }

  /**
   * Generate mock transaction hash (for demo)
   */
  private generateMockTxHash(): string {
    const randomHex = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `0x${randomHex}`;
  }
}

export const paymentService = new PaymentService();
