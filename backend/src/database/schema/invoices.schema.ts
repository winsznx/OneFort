import { pgTable, uuid, varchar, timestamp, numeric, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users.schema';

/**
 * Invoice status enum
 */
export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'sent',
  'viewed',
  'paid',
  'overdue',
  'cancelled',
]);

/**
 * Invoices table schema
 */
export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),

  // References
  sellerId: uuid('seller_id').references(() => users.id).notNull(),
  buyerId: uuid('buyer_id').references(() => users.id),

  // Invoice details
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  amount: numeric('amount', { precision: 20, scale: 6 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('USDO').notNull(),

  // Payment details
  paymentId: uuid('payment_id'), // References payment when paid

  // Invoice data
  title: varchar('title', { length: 200 }).notNull(),
  description: varchar('description', { length: 1000 }),
  items: varchar('items', { length: 5000 }), // JSON array of line items

  // Status
  status: invoiceStatusEnum('status').default('draft').notNull(),

  // Dates
  dueDate: timestamp('due_date'),
  paidAt: timestamp('paid_at'),

  // Settings
  isRecurring: boolean('is_recurring').default(false),
  recurringInterval: varchar('recurring_interval', { length: 20 }), // monthly, quarterly, yearly

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas
export const insertInvoiceSchema = createInsertSchema(invoices);
export const selectInvoiceSchema = createSelectSchema(invoices);

// TypeScript types
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
