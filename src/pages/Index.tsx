
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>Search</Button>
        </div>
        
        <div className="flex gap-8">
          <CategoryFilter />
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Products will be loaded here */}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
