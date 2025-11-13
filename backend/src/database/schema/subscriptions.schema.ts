import { pgTable, uuid, varchar, timestamp, numeric, pgEnum, boolean, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users.schema';

/**
 * Subscription status enum
 */
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'paused',
  'cancelled',
  'expired',
]);

/**
 * Subscription interval enum
 */
export const subscriptionIntervalEnum = pgEnum('subscription_interval', [
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
]);

/**
 * Subscriptions table schema
 */
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),

  // User references
  subscriberId: uuid('subscriber_id').references(() => users.id).notNull(),
  merchantId: uuid('merchant_id').references(() => users.id).notNull(),

  // Subscription details
  name: varchar('name', { length: 200 }).notNull(),
  description: varchar('description', { length: 1000 }),

  // Payment details
  amount: numeric('amount', { precision: 20, scale: 6 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('USDO').notNull(),
  interval: subscriptionIntervalEnum('interval').notNull(),

  // Status
  status: subscriptionStatusEnum('status').default('active').notNull(),

  // Billing cycle
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  nextBillingDate: timestamp('next_billing_date').notNull(),

  // Payment tracking
  totalPaid: numeric('total_paid', { precision: 20, scale: 6 }).default('0'),
  paymentCount: integer('payment_count').default(0),
  lastPaymentId: uuid('last_payment_id'),

  // Settings
  autoRenew: boolean('auto_renew').default(true),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  cancelledAt: timestamp('cancelled_at'),
});

// Zod schemas
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const selectSubscriptionSchema = createSelectSchema(subscriptions);

// TypeScript types
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
