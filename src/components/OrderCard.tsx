
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image_url: string;
  };
}

interface Order {
  id: string;
  status: string;
  total_amount: string | number;
  created_at: string;
  shipping_address?: any;
  billing_address?: any;
  payment_method?: string;
  order_items?: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  showDetails?: boolean;
}

export const OrderCard = ({ order, showDetails = false }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'shipped':
        return 'outline';
      case 'delivered':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Calendar className="h-4 w-4" />
              {formatDate(order.created_at)}
            </div>
          </div>
          <div className="text-right">
            <Badge variant={getStatusColor(order.status)} className="mb-2">
              {order.status.toUpperCase()}
            </Badge>
            <p className="text-lg font-bold">${parseFloat(String(order.total_amount)).toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order Items */}
        {order.order_items && order.order_items.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Items ({order.order_items.length})
            </h4>
            <div className="space-y-2">
              {order.order_items.slice(0, showDetails ? undefined : 3).map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.image_url || '/placeholder.svg'} 
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              {!showDetails && order.order_items.length > 3 && (
                <p className="text-sm text-gray-600 text-center">
                  +{order.order_items.length - 3} more items
                </p>
              )}
            </div>
          </div>
        )}

        {/* Shipping Address */}
        {showDetails && order.shipping_address && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h4>
            <div className="p-3 bg-gray-50 rounded text-sm">
              <p>{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
              <p>{order.shipping_address.address}</p>
              <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}</p>
              {order.shipping_address.phone && <p>Phone: {order.shipping_address.phone}</p>}
            </div>
          </div>
        )}

        {/* Payment Method */}
        {showDetails && order.payment_method && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h4>
            <p className="text-sm text-gray-600 capitalize">{order.payment_method}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {!showDetails && (
            <Link to={`/order/${order.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          )}
          {order.status === 'delivered' && (
            <Button variant="outline" size="sm">
              Reorder
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
