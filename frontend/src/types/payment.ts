/**
 * Payment-related TypeScript types
 */

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export type PaymentType = 'instant' | 'recurring' | 'escrow' | 'scheduled';

export interface Payment {
  id: string;
  fromUserId: string;
  toUserId?: string;
  fromAddress: string;
  toAddress: string;
  amount: number; // In smallest unit (1 USDO = 10^6 units)
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  txHash?: string;
  memo?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  completedAt?: string;
}

export interface SendPaymentParams {
  to: string; // Username, email, or address
  amount: number;
  currency?: string;
  memo?: string;
}

export interface PaymentLink {
  id: string;
  userId: string;
  linkId: string;
  recipientAddress: string;
  amount?: number;
  currency: string;
  description?: string;
  expiresAt?: string;
  maxUses?: number;
  uses: number;
  active: boolean;
  createdAt: string;
}

export interface CreatePaymentLinkParams {
  amount?: number;
  currency?: string;
  description?: string;
  expiresAt?: string;
  maxUses?: number;
}
