import { FC } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { RegisterForm } from '@/components/auth/RegisterForm';

/**
 * Registration page
 * Supports OAuth providers and automatically creates OneWallet
 */
const RegisterPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-highlight/20 to-accent/5 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-4"
          >
            <Shield className="h-10 w-10 text-accent" strokeWidth={2.5} />
            <span className="text-3xl font-bold text-primary">
              One<span className="text-accent">Fort</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-primary">
            Create Your Account
          </h1>
          <p className="text-primary/70">
            Get started in minutes with no blockchain knowledge required
          </p>
        </div>

        {/* Registration Form */}
        <RegisterForm />

        {/* Sign In Link */}
        <p className="text-center text-sm text-primary/70">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 pt-4 text-xs text-primary/60">
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Free Forever</span>
          </div>
          <span>•</span>
          <span>No Credit Card</span>
          <span>•</span>
          <span>Instant Setup</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
