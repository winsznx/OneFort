'use client';

import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LogIn, UserPlus, Send, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: LogIn,
    number: '01',
    title: 'Login with OAuth',
    description:
      'Sign in with Google, GitHub, or Twitter. No complicated wallet setup.',
  },
  {
    icon: UserPlus,
    number: '02',
    title: 'Get Your OneID',
    description:
      'Automatic MPC wallet creation. Register your @username for easy receiving.',
  },
  {
    icon: Send,
    number: '03',
    title: 'Start Transacting',
    description:
      'Send USDO to anyone by username, email, or address. Gasless and instant.',
  },
  {
    icon: CheckCircle2,
    number: '04',
    title: 'Build Your Reputation',
    description:
      'Every transaction builds on-chain reputation. Unlock better rates and opportunities.',
  },
];

/**
 * How It Works section
 * Step-by-step guide to getting started
 */
export const HowItWorksSection: FC = () => {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-br from-highlight/30 to-accent/5 py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            No blockchain knowledge required. OneFort handles all the complexity
            so you can focus on what matters.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-secondary/50 bg-white hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-4">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <step.icon className="h-8 w-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary/70">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-accent/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
