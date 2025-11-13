import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

/**
 * Environment variable schema validation
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
  API_URL: z.string().url(),
  FRONTEND_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().optional(),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('24h'),

  // OAuth (optional for mock)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // OneChain
  ONECHAIN_NETWORK: z.enum(['devnet', 'testnet', 'mainnet']).default('devnet'),
  ONECHAIN_RPC_URL: z.string().url(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

// Validate environment variables
const env = envSchema.parse(process.env);

/**
 * Application configuration
 */
export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  apiUrl: env.API_URL,
  frontendUrl: env.FRONTEND_URL,

  database: {
    url: env.DATABASE_URL,
  },

  redis: {
    url: env.REDIS_URL || 'redis://localhost:6379',
  },

  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },

  oauth: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  onechain: {
    network: env.ONECHAIN_NETWORK,
    rpcUrl: env.ONECHAIN_RPC_URL,
  },

  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10),
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
  },

  logging: {
    level: env.LOG_LEVEL,
  },

  cors: {
    origins: env.CORS_ORIGINS.split(','),
  },
} as const;

export default config;
