'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Zap,
  Users,
  DollarSign,
  FileText,
  Clock,
  TrendingUp,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'OneID - Universal Identity',
    description:
      'Login with Google/GitHub. Auto-create MPC wallet. Register @username for easy payments.',
  },
  {
    icon: Zap,
    title: 'Gasless Payments',
    description:
      'Send USDO with zero gas fees. Payment links, QR codes, and multi-recipient transfers.',
  },
  {
    icon: Users,
    title: 'Payroll Automation',
    description:
      'Automate salary payments for employees and contractors. Vesting schedules supported.',
  },
  {
    icon: FileText,
    title: 'Smart Invoicing',
    description:
      'Create professional invoices with payment links. Invoice factoring for early liquidity.',
  },
  {
    icon: Clock,
    title: 'Subscriptions',
    description:
      'Recurring billing with NFT-based access control. Cancel anytime, no commitments.',
  },
  {
    icon: TrendingUp,
    title: 'Reputation Score',
    description:
      'Build on-chain reputation through transactions. Unlock better rates and opportunities.',
  },
  {
    icon: DollarSign,
    title: 'Multi-Currency Support',
    description:
      'USDO stablecoin payments today. More tokens and currencies coming soon.',
  },
  {
    icon: Lock,
    title: 'Fortress Security',
    description:
      'MPC wallets, no seed phrases, gasless transactions. Your funds stay secure.',
  },
];

/**
 * Features section showcasing platform capabilities
 */
export const FeaturesSection: FC = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-24 md:py-32">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          Everything You Need to Build on Web3
        </h2>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
          From identity to payments to business tools - OneFort provides
          complete infrastructure for the OneChain ecosystem.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-secondary/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg text-primary">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary/70">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
