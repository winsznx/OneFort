'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Shield, Twitter, Github, BookOpen } from 'lucide-react';

/**
 * Footer component with links and branding
 */
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/50 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" strokeWidth={2.5} />
              <span className="text-xl font-bold text-primary">
                One<span className="text-accent">Fort</span>
              </span>
            </Link>
            <p className="text-sm text-primary/70 max-w-xs">
              Your Financial Fortress on OneChain. Web2 Simplicity, Web3 Power.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/onefort"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/onefort"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="/docs"
                className="text-primary/60 hover:text-accent transition-colors"
              >
                <BookOpen className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Use Cases Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Use Cases
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/individuals"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  For Individuals
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  For Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  For Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-primary/60">
            © {currentYear} OneFort. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-primary/60 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-primary/60 hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="text-sm text-primary/60 hover:text-accent transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
