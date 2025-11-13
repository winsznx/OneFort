import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * Users table schema
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).unique(),
  walletAddress: varchar('wallet_address', { length: 42 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),

  // OAuth data
  oauthProvider: varchar('oauth_provider', { length: 50 }), // google, github, etc.
  oauthId: varchar('oauth_id', { length: 255 }),

  // OneWallet data
  onewalletId: varchar('onewallet_id', { length: 255 }).notNull().unique(),

  // Preferences
  emailVerified: boolean('email_verified').default(false),
  usernameVerified: boolean('username_verified').default(false),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export const selectUserSchema = createSelectSchema(users);

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
