import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, QrCode, Link as LinkIcon, History } from 'lucide-react';

/**
 * Payments hub page
 * Central page for all payment operations
 */
const PaymentsPage: FC = () => {
  const options = [
    {
      title: 'Send Payment',
      description: 'Send USDO to anyone by username, email, or address',
      icon: Send,
      href: '/dashboard/payments/send',
      color: 'accent',
    },
    {
      title: 'Receive Payment',
      description: 'Generate QR code or share your wallet address',
      icon: QrCode,
      href: '/dashboard/payments/receive',
      color: 'green',
    },
    {
      title: 'Payment Links',
      description: 'Create shareable payment links for your services',
      icon: LinkIcon,
      href: '/dashboard/payments/links',
      color: 'blue',
    },
    {
      title: 'Transaction History',
      description: 'View all your past transactions and exports',
      icon: History,
      href: '/dashboard/payments/history',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Payments</h1>
        <p className="text-primary/70 mt-1">
          Send, receive, and manage your USDO payments
        </p>
      </div>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {options.map((option) => (
          <Link key={option.title} href={option.href}>
            <Card className="border-secondary/50 hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-3">
                  <option.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary/70">{option.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-secondary/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-primary/70">
            Your recent payment activity will appear here
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
