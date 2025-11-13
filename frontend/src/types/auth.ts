/**
 * Authentication-related TypeScript types
 */

export type OAuthProvider = 'google' | 'github' | 'twitter';

export interface User {
  id: string;
  email: string;
  username?: string;
  onechainAddress: string;
  oauthProvider?: OAuthProvider;
  reputationScore: number;
  kycVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  user: User;
  token: string;
  walletAddress: string;
}

export interface LoginParams {
  provider: OAuthProvider;
  code: string;
}

export interface RegisterUsernameParams {
  username: string;
}
