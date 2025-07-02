
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Fresh Groceries Delivered Fast
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Get the freshest produce, quality meats, and everyday essentials delivered 
              to your doorstep in as little as 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-primary">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Free Delivery</p>
                <p className="text-xs text-primary-foreground/80">Orders over $50</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">30-Min Delivery</p>
                <p className="text-xs text-primary-foreground/80">In select areas</p>
              </div>
              <div className="text-center">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Fresh Quality</p>
                <p className="text-xs text-primary-foreground/80">100% Guaranteed</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img
              src="/placeholder.svg"
              alt="Fresh groceries"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
