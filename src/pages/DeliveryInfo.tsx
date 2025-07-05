
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const DeliveryInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Delivery Information</h1>
          <p className="text-gray-600">Everything you need to know about our delivery service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Truck className="h-6 w-6 text-primary" />
                <CardTitle>Standard Delivery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Free delivery on orders above ₹500</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-medium">2-5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="font-medium">₹50 (Free above ₹500)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle>Express Delivery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Same day delivery in select areas</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-medium">Same day</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="font-medium">₹150</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6" />
              <span>Delivery Areas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'].map((city) => (
                <Badge key={city} variant="secondary" className="justify-center py-2">
                  {city}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600 mt-4">
              Don't see your area? Contact us to check if we deliver to your location.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span>Delivery Process</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold">Order Confirmation</h4>
                  <p className="text-gray-600">You'll receive an order confirmation email immediately after placing your order.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold">Order Processing</h4>
                  <p className="text-gray-600">Our team picks and packs your items with care.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold">Out for Delivery</h4>
                  <p className="text-gray-600">You'll receive a tracking notification when your order is dispatched.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold">Delivered</h4>
                  <p className="text-gray-600">Your order is delivered to your doorstep.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default DeliveryInfo;
