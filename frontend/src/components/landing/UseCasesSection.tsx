'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, ShoppingCart, ArrowRight } from 'lucide-react';

const useCases = [
  {
    icon: Users,
    title: 'For Individuals',
    description: 'Send and receive payments globally with zero fees.',
    features: [
      'P2P payments with @username',
      'QR code payments',
      'Payment links for services',
      'Transaction history & exports',
    ],
    cta: 'Start as Individual',
    href: '/register',
  },
  {
    icon: Building2,
    title: 'For Businesses',
    description: 'Streamline payroll, subscriptions, and invoicing.',
    features: [
      'Automated payroll & vesting',
      'Recurring subscriptions',
      'Professional invoicing',
      'Treasury management',
    ],
    cta: 'Start as Business',
    href: '/register?type=business',
  },
  {
    icon: ShoppingCart,
    title: 'For Developers',
    description: 'Integrate Web3 payments with 5 lines of code.',
    features: [
      'Simple SDK integration',
      'Webhook notifications',
      'REST API access',
      'Test environment included',
    ],
    cta: 'View Documentation',
    href: '/docs',
  },
];

/**
 * Use Cases section
 * Shows different user personas and their benefits
 */
export const UseCasesSection: FC = () => {
  return (
    <section id="use-cases" className="container mx-auto px-4 py-24 md:py-32">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          Built for Everyone
        </h2>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
          Whether you're an individual, business, or developer - OneFort has the
          tools you need.
        </p>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        {useCases.map((useCase, index) => (
          <Card
            key={index}
            className="border-secondary/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
          >
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <useCase.icon className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-2xl text-primary">
                {useCase.title}
              </CardTitle>
              <p className="text-primary/70 pt-2">{useCase.description}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-3 mb-6 flex-1">
                {useCase.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-primary/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-white group"
                asChild
              >
                <a href={useCase.href}>
                  {useCase.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
