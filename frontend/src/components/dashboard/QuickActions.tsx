'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, QrCode, Link as LinkIcon, FileText } from 'lucide-react';

/**
 * Quick actions component
 * Provides fast access to common operations
 */
export const QuickActions: FC = () => {
  const actions = [
    {
      title: 'Send Payment',
      description: 'Send USDO to anyone',
      icon: Send,
      href: '/dashboard/payments/send',
      variant: 'accent' as const,
    },
    {
      title: 'Receive QR',
      description: 'Show your QR code',
      icon: QrCode,
      href: '/dashboard/payments/receive',
      variant: 'outline' as const,
    },
    {
      title: 'Payment Link',
      description: 'Create shareable link',
      icon: LinkIcon,
      href: '/dashboard/payments/link',
      variant: 'outline' as const,
    },
    {
      title: 'New Invoice',
      description: 'Create an invoice',
      icon: FileText,
      href: '/dashboard/invoices/new',
      variant: 'outline' as const,
    },
  ];

  return (
    <Card className="border-secondary/50">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant={action.variant}
                className="h-auto flex-col items-start p-4 w-full text-left space-y-2"
              >
                <action.icon className="h-5 w-5" />
                <div>
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-80">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
