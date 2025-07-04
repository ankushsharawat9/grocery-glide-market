
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderCleared, setOrderCleared] = useState(false);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart after successful order
    const handleOrderSuccess = async () => {
      if (sessionId && !orderCleared) {
        try {
          await clearCart();
          setOrderCleared(true);
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      }
    };

    handleOrderSuccess();
  }, [sessionId, clearCart, orderCleared]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Thank you for your order! Your payment has been processed successfully.
              </p>
              {sessionId && (
                <p className="text-sm text-gray-500">
                  Order ID: {sessionId.slice(-8).toUpperCase()}
                </p>
              )}
              <div className="space-y-2 pt-4">
                <Link to="/products">
                  <Button className="w-full" size="lg">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
