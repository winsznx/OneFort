'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

/**
 * Call-to-Action section
 * Final conversion push before footer
 */
export const CTASection: FC = () => {
  return (
    <section className="bg-gradient-to-br from-accent/90 to-accent py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Shield className="h-10 w-10 text-white" strokeWidth={2} />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Fortify Your Financial Future?
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of users, businesses, and developers building on
            OneChain. Get started in minutes with no blockchain knowledge
            required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="xl"
                className="w-full sm:w-auto bg-white text-accent hover:bg-white/90"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Read Documentation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 pt-8 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>MPC Wallet Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>•</span>
              <span>No Seed Phrases</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>•</span>
              <span>Gasless Transactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>•</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
