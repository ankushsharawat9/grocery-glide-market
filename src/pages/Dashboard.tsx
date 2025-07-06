
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentOrders } from '@/components/dashboard/RecentOrders';

interface Order {
  id: string;
  status: string;
  total_amount: string | number;
  created_at: string;
  order_items?: Array<{
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
    };
  }>;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedOrders: Order[] = data || [];
      setOrders(typedOrders);
      
      // Calculate stats - convert to INR
      const totalOrders = typedOrders.length;
      const pendingOrders = typedOrders.filter(order => 
        order.status === 'pending' || order.status === 'paid'
      ).length;
      const completedOrders = typedOrders.filter(order => 
        order.status === 'delivered'
      ).length;
      const totalSpent = typedOrders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + parseFloat(String(order.total_amount) || '0'), 0) * 83; // Convert to INR

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalSpent
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in to view your dashboard</h1>
          <Link to="/login">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.user_metadata?.first_name || 'User'}!</h1>
          <p className="text-gray-600">Here's an overview of your account</p>
        </div>

        <StatsGrid stats={stats} />
        <RecentOrders orders={orders} onOrderUpdate={fetchOrders} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
