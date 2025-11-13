import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users.schema';

/**
 * Username registry table
 * Manages username reservations and verifications
 */
export const usernameRegistry = pgTable('username_registry', {
  id: uuid('id').defaultRandom().primaryKey(),

  // User reference
  userId: uuid('user_id').references(() => users.id).notNull().unique(),

  // Username data
  username: varchar('username', { length: 50 }).notNull().unique(),
  previousUsername: varchar('previous_username', { length: 50 }),

  // Verification
  isVerified: boolean('is_verified').default(false).notNull(),
  verifiedAt: timestamp('verified_at'),

  // NFT data (for username NFT if implemented)
  nftTokenId: varchar('nft_token_id', { length: 100 }),
  nftContractAddress: varchar('nft_contract_address', { length: 42 }),

  // Timestamps
  reservedAt: timestamp('reserved_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas
export const insertUsernameRegistrySchema = createInsertSchema(usernameRegistry);
export const selectUsernameRegistrySchema = createSelectSchema(usernameRegistry);

// TypeScript types
export type UsernameRegistry = typeof usernameRegistry.$inferSelect;
export type NewUsernameRegistry = typeof usernameRegistry.$inferInsert;
