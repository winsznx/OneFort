'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { formatAddress } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

/**
 * Balance card component
 * Shows current USDO balance and wallet address
 */
export const BalanceCard: FC = () => {
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  // TODO: Fetch real balance from API
  const balance = 1234.56;
  const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Wallet address copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy address',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-highlight/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary/70">
          Available Balance
        </CardTitle>
        <Wallet className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Balance Display */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">
                {showBalance ? `${balance.toFixed(2)} USDO` : '••••••'}
              </div>
              <p className="text-sm text-primary/60 mt-1">
                ≈ ${balance.toFixed(2)} USD
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Wallet Address */}
          <div className="flex items-center justify-between rounded-lg bg-white/50 p-3">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-mono text-primary/70">
                {formatAddress(address)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-8 px-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
