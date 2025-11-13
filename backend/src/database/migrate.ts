import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import config from '../config';
import logger from '../utils/logger';

/**
 * Run database migrations
 */
const runMigrations = async () => {
  logger.info('Running database migrations...');

  const connectionString = config.database.url;

  // Create a postgres client for migrations
  const migrationClient = postgres(connectionString, { max: 1 });

  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    logger.info('✅ Migrations completed successfully');
  } catch (error) {
    logger.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await migrationClient.end();
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.info('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration process failed:', error);
      process.exit(1);
    });
}

export default runMigrations;
