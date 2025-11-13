import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, DollarSign, Calendar } from 'lucide-react';

/**
 * Payroll page
 * Manage employees and payroll runs
 */
const PayrollPage: FC = () => {
  // TODO: Fetch real payroll data from API
  const employees = [
    {
      id: '1',
      name: 'Alice Johnson',
      salary: 5000,
      frequency: 'monthly',
      nextPayment: '2025-12-01',
    },
    {
      id: '2',
      name: 'Bob Smith',
      salary: 4500,
      frequency: 'monthly',
      nextPayment: '2025-12-01',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      salary: 3500,
      frequency: 'bi-weekly',
      nextPayment: '2025-11-20',
    },
  ];

  const stats = [
    {
      title: 'Total Employees',
      value: '3',
      icon: Users,
    },
    {
      title: 'Monthly Payroll',
      value: '$13,000',
      icon: DollarSign,
    },
    {
      title: 'Next Run',
      value: 'Nov 20',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Payroll</h1>
          <p className="text-primary/70 mt-1">
            Automate salary payments for your team
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard/payroll/run">
            <Button variant="accent">Run Payroll</Button>
          </Link>
          <Link href="/dashboard/payroll/employees/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary/70">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employees List */}
      <Card className="border-secondary/50">
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between py-4 border-b border-secondary/30 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-semibold text-primary">
                    {employee.name}
                  </div>
                  <div className="text-sm text-primary/60">
                    {employee.frequency}
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="font-semibold text-accent">
                    ${employee.salary} USDO
                  </div>
                  <div className="text-sm text-primary/60">Salary</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-primary/70">
                    Next Payment: {employee.nextPayment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
