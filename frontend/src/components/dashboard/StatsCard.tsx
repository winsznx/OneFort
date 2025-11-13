import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
}

/**
 * Statistics card component
 * Shows a single metric with trend indicator
 */
export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
}) => {
  return (
    <Card className="border-secondary/50 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary/70">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
        <p
          className={cn(
            'text-xs mt-1',
            trend === 'up' && 'text-green-600',
            trend === 'down' && 'text-red-600',
            trend === 'neutral' && 'text-primary/60'
          )}
        >
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
};
