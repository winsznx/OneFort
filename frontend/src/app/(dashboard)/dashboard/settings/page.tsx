import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Shield, Bell, CreditCard } from 'lucide-react';

/**
 * Settings page
 * Manage account settings and preferences
 */
const SettingsPage: FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        <p className="text-primary/70 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="border-secondary/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-accent" />
            <CardTitle>Profile Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="@username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button variant="accent">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-secondary/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-primary">
                Two-Factor Authentication
              </div>
              <div className="text-sm text-primary/60">
                Add an extra layer of security
              </div>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-primary">Wallet Address</div>
              <div className="text-sm text-primary/60 font-mono">
                0x742d...bEb1
              </div>
            </div>
            <Button variant="ghost">View</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-secondary/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-accent" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-primary">
                Payment Notifications
              </div>
              <div className="text-sm text-primary/60">
                Get notified when you receive payments
              </div>
            </div>
            <Button variant="outline">Enabled</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-primary">Email Summaries</div>
              <div className="text-sm text-primary/60">
                Weekly transaction summaries
              </div>
            </div>
            <Button variant="outline">Enabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-secondary/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-accent" />
            <CardTitle>Payment Methods</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-primary/70">
            Manage your payment methods and billing information
          </p>
          <Button variant="outline">Add Payment Method</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
