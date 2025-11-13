import { pgTable, uuid, varchar, timestamp, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users.schema';

/**
 * Payment status enum
 */
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
]);

/**
 * Payment type enum
 */
export const paymentTypeEnum = pgEnum('payment_type', [
  'send',
  'receive',
  'invoice',
  'subscription',
  'payroll',
  'link',
]);

/**
 * Payments table schema
 */
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),

  // User references
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  recipientId: uuid('recipient_id').references(() => users.id).notNull(),

  // Payment details
  amount: numeric('amount', { precision: 20, scale: 6 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('USDO').notNull(),

  // Blockchain data
  txHash: varchar('tx_hash', { length: 66 }),
  blockNumber: numeric('block_number'),
  gasUsed: numeric('gas_used'),

  // Status and type
  status: paymentStatusEnum('status').default('pending').notNull(),
  type: paymentTypeEnum('type').default('send').notNull(),

  // Metadata
  note: varchar('note', { length: 500 }),
  reference: varchar('reference', { length: 100 }), // For invoices, subscriptions, etc.
  metadata: varchar('metadata', { length: 2000 }), // JSON string for additional data

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// Zod schemas
export const insertPaymentSchema = createInsertSchema(payments);
export const selectPaymentSchema = createSelectSchema(payments);

// TypeScript types
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
