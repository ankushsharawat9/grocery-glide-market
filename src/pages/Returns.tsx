
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-gray-600">Easy returns within 7 days of delivery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <RefreshCw className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Easy Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Return items within 7 days of delivery</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Quick Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Refunds processed within 3-5 business days</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">100% satisfaction guarantee on all products</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span>Returnable Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Packaged foods with intact seals</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Non-perishable items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Household items in original packaging</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Personal care products (unopened)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="h-6 w-6 text-red-500" />
                <span>Non-Returnable Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>Fresh fruits and vegetables</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>Dairy products</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>Opened personal care items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>Items damaged due to misuse</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Return an Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold">Initiate Return</h4>
                  <p className="text-gray-600">Go to your order history and click "Return Item" for eligible products.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold">Schedule Pickup</h4>
                  <p className="text-gray-600">Choose a convenient time slot for our team to collect the item.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold">Quality Check</h4>
                  <p className="text-gray-600">We'll inspect the returned item to ensure it meets return conditions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold">Refund Processing</h4>
                  <p className="text-gray-600">Once approved, your refund will be processed within 3-5 business days.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button size="lg">Start Return Process</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Returns;
