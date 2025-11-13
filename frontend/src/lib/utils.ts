import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format USDO amount for display
 * @param amount - Amount in smallest unit (1 USDO = 10^6 units)
 * @returns Formatted string (e.g., "100.00 USDO")
 */
export function formatUSDO(amount: number): string {
  const usdo = amount / 1000000;
  return `${usdo.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USDO`;
}

/**
 * Format address to short version
 * @param address - Full blockchain address
 * @returns Shortened address (e.g., "0x1234...5678")
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format date to relative time
 * @param date - Date to format
 * @returns Relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return then.toLocaleDateString();
}

/**
 * Validate username format (@username)
 * @param username - Username to validate
 * @returns True if valid
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^@?[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate OneChain address format
 * @param address - Address to validate
 * @returns True if valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
