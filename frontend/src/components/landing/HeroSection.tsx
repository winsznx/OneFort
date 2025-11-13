'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Hero section for landing page
 * Emphasizes fortress-grade security with Web2 simplicity
 */
export const HeroSection: FC = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-accent/10 px-4 py-2 w-fit">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Powered by OneChain
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Your Financial{' '}
            <span className="text-accent">Fortress</span>{' '}
            on OneChain
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-primary/70 sm:text-xl md:text-2xl max-w-2xl">
            Web2 Simplicity. Web3 Power. Access payments, identity, and business
            tools without blockchain complexity.
          </p>

          {/* Value Props */}
          <div className="flex flex-col space-y-3 pt-4">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-primary">Gasless USDO transfers</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-primary">
                One-click wallet creation (no seed phrases)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-primary">
                Username-based payments (@alice)
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-6">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="accent" size="xl" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-6 pt-8 text-sm text-primary/60">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>MPC Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>No Seed Phrases</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Gasless Transactions</span>
            </div>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative lg:pl-12">
          <div className="relative rounded-2xl bg-gradient-to-br from-accent/20 to-highlight/50 p-8 shadow-2xl">
            {/* Fortress Illustration */}
            <div className="flex flex-col items-center justify-center space-y-8 py-12">
              <div className="relative">
                <Shield
                  className="h-48 w-48 text-accent drop-shadow-lg"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">1</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-primary">
                  Built Strong. Built Simple.
                </p>
                <p className="text-primary/70">
                  Fortress-grade security meets one-click simplicity
                </p>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-4 top-1/4 rounded-lg bg-white p-4 shadow-lg border border-secondary/50 hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Payment Sent
                  </p>
                  <p className="text-xs text-primary/60">100 USDO to @alice</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 rounded-lg bg-white p-4 shadow-lg border border-secondary/50 hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Wallet Created
                  </p>
                  <p className="text-xs text-primary/60">MPC Secured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
