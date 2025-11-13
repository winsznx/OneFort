import { FC } from 'react';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp } from 'lucide-react';

/**
 * Main dashboard page
 * Shows balance, stats, and recent activity
 */
const DashboardPage: FC = () => {
  // TODO: Fetch real data from API
  const stats = [
    {
      title: 'Total Sent',
      value: '1,234.56 USDO',
      change: '+12.5%',
      icon: ArrowUpRight,
      trend: 'up' as const,
    },
    {
      title: 'Total Received',
      value: '2,456.78 USDO',
      change: '+8.3%',
      icon: ArrowDownLeft,
      trend: 'up' as const,
    },
    {
      title: 'Total Transactions',
      value: '143',
      change: '+23',
      icon: DollarSign,
      trend: 'up' as const,
    },
    {
      title: 'Reputation Score',
      value: '85/100',
      change: '+5',
      icon: TrendingUp,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-primary/70 mt-1">
          Welcome back to your financial fortress
        </p>
      </div>

      {/* Balance Card */}
      <BalanceCard />

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
