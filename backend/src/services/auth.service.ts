import { eq } from 'drizzle-orm';
import { db } from '../database/connection';
import { users, usernameRegistry } from '../database/schema';
import { generateToken } from '../utils/jwt';
import { AuthenticationError, ConflictError, NotFoundError } from '../utils/errors';
import logger from '../utils/logger';

export interface OAuthUserData {
  email: string;
  displayName?: string;
  avatarUrl?: string;
  provider: string;
  providerId: string;
}

export interface RegisterUsernameData {
  userId: string;
  username: string;
}

/**
 * Auth Service
 * Handles user authentication and registration
 */
export class AuthService {
  /**
   * OAuth login/registration (mock for demo)
   * Creates user if doesn't exist, returns JWT token
   */
  async oauthLogin(data: OAuthUserData) {
    try {
      // Check if user exists by email
      let user = await db.query.users.findFirst({
        where: eq(users.email, data.email),
      });

      if (user) {
        // Update last login
        await db
          .update(users)
          .set({ lastLoginAt: new Date() })
          .where(eq(users.id, user.id));

        logger.info('User logged in via OAuth', { userId: user.id, email: user.email });
      } else {
        // Create new user
        const walletAddress = this.generateMockWalletAddress();
        const onewalletId = `onewallet_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const [newUser] = await db
          .insert(users)
          .values({
            email: data.email,
            displayName: data.displayName,
            avatarUrl: data.avatarUrl,
            walletAddress,
            oauthProvider: data.provider,
            oauthId: data.providerId,
            onewalletId,
            emailVerified: true,
            lastLoginAt: new Date(),
          })
          .returning();

        user = newUser;

        logger.info('New user created via OAuth', { userId: user.id, email: user.email });
      }

      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        walletAddress: user.walletAddress,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      logger.error('OAuth login failed', error);
      throw error;
    }
  }

  /**
   * Register a username for a user
   */
  async registerUsername(data: RegisterUsernameData) {
    try {
      // Check if user exists
      const user = await db.query.users.findFirst({
        where: eq(users.id, data.userId),
      });

      if (!user) {
        throw new NotFoundError('User');
      }

      // Check if username is already taken
      const existingUsername = await db.query.usernameRegistry.findFirst({
        where: eq(usernameRegistry.username, data.username),
      });

      if (existingUsername) {
        throw new ConflictError('Username is already taken');
      }

      // Check if user already has a username
      const userRegistry = await db.query.usernameRegistry.findFirst({
        where: eq(usernameRegistry.userId, data.userId),
      });

      if (userRegistry) {
        // Update existing username
        await db
          .update(usernameRegistry)
          .set({
            previousUsername: userRegistry.username,
            username: data.username,
            isVerified: false,
            updatedAt: new Date(),
          })
          .where(eq(usernameRegistry.userId, data.userId));

        // Update user table
        await db
          .update(users)
          .set({
            username: data.username,
            usernameVerified: false,
            updatedAt: new Date(),
          })
          .where(eq(users.id, data.userId));
      } else {
        // Create new username registry entry
        await db.insert(usernameRegistry).values({
          userId: data.userId,
          username: data.username,
          isVerified: false,
        });

        // Update user table
        await db
          .update(users)
          .set({
            username: data.username,
            usernameVerified: false,
            updatedAt: new Date(),
          })
          .where(eq(users.id, data.userId));
      }

      logger.info('Username registered', { userId: data.userId, username: data.username });

      return {
        username: data.username,
        verified: false,
      };
    } catch (error) {
      logger.error('Username registration failed', error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }

  /**
   * Resolve username to user
   */
  async resolveUsername(username: string) {
    // Remove @ prefix if present
    const cleanUsername = username.startsWith('@') ? username.substring(1) : username;

    const user = await db.query.users.findFirst({
      where: eq(users.username, cleanUsername),
    });

    if (!user) {
      throw new NotFoundError('Username');
    }

    return {
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      walletAddress: user.walletAddress,
      verified: user.usernameVerified,
    };
  }

  /**
   * Generate mock wallet address (for demo)
   * In production, this would be generated by OneWallet API
   */
  private generateMockWalletAddress(): string {
    const randomHex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `0x${randomHex}`;
  }
}

export const authService = new AuthService();
