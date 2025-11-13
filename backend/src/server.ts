import { createApp } from './app';
import config from './config';
import logger from './utils/logger';

/**
 * Start the Express server
 */
const startServer = async () => {
  try {
    // Create Express app
    const app = createApp();

    // Start listening
    const server = app.listen(config.port, () => {
      logger.info(`🚀 OneFort API Server started`, {
        environment: config.env,
        port: config.port,
        nodeVersion: process.version,
      });
      logger.info(`📍 Health check available at http://localhost:${config.port}/health`);
      logger.info(`🔧 API endpoints available at http://localhost:${config.port}/api/v1`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received, starting graceful shutdown...`);

      server.close(() => {
        logger.info('HTTP server closed');

        // Close database connections, Redis, etc.
        // TODO: Add cleanup for database and cache connections

        logger.info('Graceful shutdown complete');
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: any) => {
      logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
