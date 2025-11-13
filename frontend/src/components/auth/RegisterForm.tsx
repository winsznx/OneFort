'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Chrome, Github, Twitter, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OAuthProvider = 'google' | 'github' | 'twitter';

/**
 * Registration form component
 * Handles OAuth authentication and automatic wallet creation
 */
export const RegisterForm: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleOAuthRegister = async (provider: OAuthProvider) => {
    setLoading(provider);

    try {
      // TODO: Implement OAuth flow with wallet creation
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Welcome to OneFort!',
        description: 'Your account and wallet have been created.',
      });

      // Redirect to username registration
      router.push('/register/username');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  const providers: Array<{
    id: OAuthProvider;
    name: string;
    icon: typeof Chrome;
  }> = [
    { id: 'google', name: 'Google', icon: Chrome },
    { id: 'github', name: 'GitHub', icon: Github },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
  ];

  const benefits = [
    'Automatic wallet creation (MPC secured)',
    'No seed phrases to remember',
    'Gasless USDO transactions',
    'Free forever',
  ];

  return (
    <Card className="border-secondary/50 shadow-lg">
      <CardContent className="pt-6 space-y-6">
        {/* Benefits List */}
        <div className="space-y-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-primary/70">{benefit}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* OAuth Buttons */}
        <div className="space-y-3">
          {providers.map((provider) => {
            const Icon = provider.icon;
            const isLoading = loading === provider.id;

            return (
              <Button
                key={provider.id}
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleOAuthRegister(provider.id)}
                disabled={loading !== null}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="mr-2 h-5 w-5" />
                )}
                Continue with {provider.name}
              </Button>
            );
          })}
        </div>

        {/* Info Text */}
        <p className="text-center text-xs text-primary/60">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-accent hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>
        </p>
      </CardContent>
    </Card>
  );
};
