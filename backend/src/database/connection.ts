import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import config from '../config';
import logger from '../utils/logger';
import * as schema from './schema';

/**
 * PostgreSQL connection
 */
const connectionString = config.database.url;

// Create postgres client
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

/**
 * Drizzle ORM database instance
 */
export const db = drizzle(client, { schema });

/**
 * Test database connection
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    await client`SELECT 1`;
    logger.info('✅ Database connection successful');
    return true;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    return false;
  }
};

/**
 * Close database connection
 */
export const closeConnection = async (): Promise<void> => {
  await client.end();
  logger.info('Database connection closed');
};

export default db;
