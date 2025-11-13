'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  LayoutDashboard,
  Send,
  FileText,
  Users,
  Clock,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

/**
 * Dashboard sidebar navigation
 */
export const DashboardSidebar: FC = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const mainNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Payments',
      href: '/dashboard/payments',
      icon: Send,
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: FileText,
    },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      icon: Clock,
    },
    {
      name: 'Payroll',
      href: '/dashboard/payroll',
      icon: Users,
    },
  ];

  const secondaryNavigation = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-secondary/50 bg-white px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-primary">
              One<span className="text-accent">Fort</span>
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {mainNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                          isActive
                            ? 'bg-accent/10 text-accent'
                            : 'text-primary/70 hover:text-accent hover:bg-accent/5'
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li>
              <Separator />
            </li>

            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                          isActive
                            ? 'bg-accent/10 text-accent'
                            : 'text-primary/70 hover:text-accent hover:bg-accent/5'
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary/70 hover:text-accent"
                onClick={logout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
