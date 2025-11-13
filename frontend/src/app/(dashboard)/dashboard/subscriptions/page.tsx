import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, DollarSign, TrendingUp } from 'lucide-react';

/**
 * Subscriptions page
 * Manage subscription plans and subscribers
 */
const SubscriptionsPage: FC = () => {
  // TODO: Fetch real subscriptions from API
  const plans = [
    {
      id: '1',
      name: 'Basic Plan',
      price: 9.99,
      interval: 'monthly',
      subscribers: 45,
      revenue: 449.55,
    },
    {
      id: '2',
      name: 'Pro Plan',
      price: 29.99,
      interval: 'monthly',
      subscribers: 23,
      revenue: 689.77,
    },
    {
      id: '3',
      name: 'Enterprise Plan',
      price: 99.99,
      interval: 'monthly',
      subscribers: 7,
      revenue: 699.93,
    },
  ];

  const stats = [
    {
      title: 'Total Plans',
      value: '3',
      icon: TrendingUp,
    },
    {
      title: 'Total Subscribers',
      value: '75',
      icon: Users,
    },
    {
      title: 'Monthly Revenue',
      value: '$1,839',
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Subscriptions</h1>
          <p className="text-primary/70 mt-1">
            Manage your subscription plans
          </p>
        </div>
        <Link href="/dashboard/subscriptions/new">
          <Button variant="accent">
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
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

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-secondary/50">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-accent">
                ${plan.price}
                <span className="text-sm font-normal text-primary/60">
                  /{plan.interval}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/70">Subscribers</span>
                  <span className="font-semibold text-primary">
                    {plan.subscribers}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/70">Monthly Revenue</span>
                  <span className="font-semibold text-accent">
                    ${plan.revenue.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Manage Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
