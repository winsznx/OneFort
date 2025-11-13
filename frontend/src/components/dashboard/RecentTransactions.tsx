'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUpRight, ArrowDownLeft, ArrowRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

/**
 * Recent transactions component
 * Shows last 5 transactions
 */
export const RecentTransactions: FC = () => {
  // TODO: Fetch real transactions from API
  const transactions = [
    {
      id: '1',
      type: 'sent',
      to: '@alice',
      amount: 100,
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '2',
      type: 'received',
      from: '@bob',
      amount: 250,
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: '3',
      type: 'sent',
      to: '@charlie',
      amount: 75.5,
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: '4',
      type: 'received',
      from: '@david',
      amount: 500,
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: '5',
      type: 'sent',
      to: '@eve',
      amount: 150,
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
  ];

  return (
    <Card className="border-secondary/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link href="/dashboard/payments">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-secondary/30 last:border-0"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback
                    className={
                      tx.type === 'sent'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }
                  >
                    {tx.type === 'sent' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-primary">
                    {tx.type === 'sent' ? 'Sent to' : 'Received from'}{' '}
                    {tx.type === 'sent' ? tx.to : tx.from}
                  </div>
                  <div className="text-sm text-primary/60">
                    {formatRelativeTime(tx.createdAt)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold ${
                    tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {tx.type === 'sent' ? '-' : '+'}
                  {tx.amount.toFixed(2)} USDO
                </div>
                <div
                  className={`text-xs ${
                    tx.status === 'completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
