'use client';

import { FC } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';

/**
 * Dashboard header component
 * Shows user info and actions
 */
export const DashboardHeader: FC = () => {
  const { user } = useAuthStore();

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-secondary/50 bg-white px-4 sm:px-6 lg:px-8">
      {/* Search / Title */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-primary">
          {user?.username ? `@${user.username}` : user?.email}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-primary/70" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-primary/70" />
        </Button>
        <Avatar>
          <AvatarFallback className="bg-accent text-white">
            {user?.email ? getInitials(user.email) : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
