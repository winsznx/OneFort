'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Chrome, Github, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OAuthProvider = 'google' | 'github' | 'twitter';

/**
 * Login form component
 * Handles OAuth authentication with multiple providers
 */
export const LoginForm: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    setLoading(provider);

    try {
      // TODO: Implement OAuth flow
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: 'Success!',
        description: `Logged in with ${provider}`,
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to login. Please try again.',
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

  return (
    <Card className="border-secondary/50 shadow-lg">
      <CardContent className="pt-6 space-y-4">
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
                onClick={() => handleOAuthLogin(provider.id)}
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

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-xs text-primary/60">
              Secure OAuth Login
            </span>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-center text-xs text-primary/60">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-accent hover:underline">
            Terms
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
