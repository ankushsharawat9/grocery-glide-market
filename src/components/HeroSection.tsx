
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fresh Groceries
              <span className="text-primary block">Delivered Fast</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get fresh fruits, vegetables, and everyday essentials delivered to your doorstep in under 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Browse Categories
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 rounded-full flex items-center justify-center">
              <div className="text-8xl">🛒</div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-green-100 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Free Delivery</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fresh Guarantee</h3>
              <p className="text-gray-600">100% fresh or money back</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">30 minutes or less</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
