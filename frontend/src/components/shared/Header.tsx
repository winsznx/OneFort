'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Main navigation header component
 * Includes logo, navigation links, and CTA buttons
 */
export const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-secondary/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow duration-300',
        isScrolled && 'shadow-md'
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-accent" strokeWidth={2.5} />
          <span className="text-2xl font-bold text-primary">
            One<span className="text-accent">Fort</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <a
            href="#features"
            className="relative text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#how-it-works"
            className="relative text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#use-cases"
            className="relative text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            Use Cases
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <Link
            href="/docs"
            className="relative text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            Docs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="default">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="accent" size="default">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-secondary/50 bg-white">
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            <a
              href="#features"
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#use-cases"
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use Cases
            </a>
            <Link
              href="/docs"
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/login">
                <Button variant="outline" size="default" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="accent" size="default" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
