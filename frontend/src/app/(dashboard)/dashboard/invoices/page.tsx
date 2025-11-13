import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, DollarSign, Clock } from 'lucide-react';

/**
 * Invoices page
 * Manage and create invoices
 */
const InvoicesPage: FC = () => {
  // TODO: Fetch real invoices from API
  const invoices = [
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 1500,
      status: 'paid',
      dueDate: '2025-11-01',
    },
    {
      id: 'INV-002',
      client: 'TechStart Inc',
      amount: 2300,
      status: 'pending',
      dueDate: '2025-11-15',
    },
    {
      id: 'INV-003',
      client: 'Digital Agency',
      amount: 890,
      status: 'overdue',
      dueDate: '2025-10-30',
    },
  ];

  const stats = [
    {
      title: 'Total Invoiced',
      value: '$12,450',
      icon: FileText,
    },
    {
      title: 'Paid',
      value: '$8,730',
      icon: DollarSign,
    },
    {
      title: 'Pending',
      value: '$3,720',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Invoices</h1>
          <p className="text-primary/70 mt-1">
            Create and manage your invoices
          </p>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button variant="accent">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary/70">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoices List */}
      <Card className="border-secondary/50">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-4 border-b border-secondary/30 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-semibold text-primary">
                    {invoice.id}
                  </div>
                  <div className="text-sm text-primary/60">
                    {invoice.client}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="font-semibold text-primary">
                    ${invoice.amount}
                  </div>
                  <div className="text-sm text-primary/60">
                    Due: {invoice.dueDate}
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
