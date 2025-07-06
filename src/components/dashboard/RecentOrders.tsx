
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrderCancellation } from '../OrderCancellation';

interface OrderItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  total_amount: string | number;
  created_at: string;
  order_items?: OrderItem[];
}

interface RecentOrdersProps {
  orders: Order[];
  onOrderUpdate?: () => void;
}

export const RecentOrders = ({ orders, onOrderUpdate }: RecentOrdersProps) => {
  const canCancelOrder = (status: string) => {
    return status === 'pending' || status === 'paid';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Orders</CardTitle>
          {orders.length > 0 && (
            <Link to="/orders">
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">No orders yet</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                    <p className="font-bold mt-1">₹{(parseFloat(String(order.total_amount)) * 83).toFixed(2)}</p>
                  </div>
                </div>
                {order.order_items && (
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {order.order_items.length} item(s)
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/order/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      {canCancelOrder(order.status) && (
                        <OrderCancellation
                          orderId={order.id}
                          onCancelled={() => onOrderUpdate?.()}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
