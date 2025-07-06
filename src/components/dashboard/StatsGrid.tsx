
import { ShoppingBag, Package, Clock, CheckCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface StatsGridProps {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalSpent: number;
  };
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={ShoppingBag}
        title="Total Orders"
        value={stats.totalOrders}
        iconColor="text-blue-600"
      />
      <StatsCard
        icon={Clock}
        title="Pending"
        value={stats.pendingOrders}
        iconColor="text-yellow-600"
      />
      <StatsCard
        icon={CheckCircle}
        title="Completed"
        value={stats.completedOrders}
        iconColor="text-green-600"
      />
      <StatsCard
        icon={Package}
        title="Total Spent"
        value={`₹${stats.totalSpent.toFixed(2)}`}
        iconColor="text-purple-600"
      />
    </div>
  );
};
