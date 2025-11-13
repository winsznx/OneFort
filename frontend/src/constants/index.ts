/**
 * Application-wide constants
 */

export const APP_NAME = 'OneFort';
export const APP_TAGLINE = 'Your Financial Fortress on OneChain';

export const BRAND_COLORS = {
  primary: '#4A4A4A',
  secondary: '#CBCBCB',
  accent: '#CE8946',
  highlight: '#FDFBD4',
} as const;

export const ONECHAIN_NETWORKS = {
  devnet: {
    name: 'OneChain Devnet',
    rpcUrl: 'https://rpc-devnet.onelabs.cc',
    chainId: 1001,
  },
  testnet: {
    name: 'OneChain Testnet',
    rpcUrl: 'https://rpc-testnet.onelabs.cc',
    chainId: 1002,
  },
  mainnet: {
    name: 'OneChain Mainnet',
    rpcUrl: 'https://rpc-mainnet.onelabs.cc',
    chainId: 1,
  },
} as const;

export const USDO_DECIMALS = 6; // 1 USDO = 10^6 smallest units

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_TYPES = {
  INSTANT: 'instant',
  RECURRING: 'recurring',
  ESCROW: 'escrow',
  SCHEDULED: 'scheduled',
} as const;

export const OAUTH_PROVIDERS = ['google', 'github', 'twitter'] as const;
