
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconColor: string;
}

export const StatsCard = ({ icon: Icon, title, value, iconColor }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <Icon className={`h-8 w-8 ${iconColor}`} />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
