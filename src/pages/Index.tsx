
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(8)
        .order('rating', { ascending: false });
      
      if (data) {
        setFeaturedProducts(data.map(product => ({
          id: product.id, // Use the UUID directly as string
          name: product.name,
          price: product.price,
          originalPrice: product.original_price,
          image: product.image_url || '/placeholder.svg',
          rating: product.rating || 0,
          reviews: product.reviews_count || 0,
          discount: product.discount_percentage || 0,
          inStock: product.in_stock || false,
          category: product.category
        })));
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      
      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Find What You Need</h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
        
        {/* Featured Products Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Popular Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button onClick={() => navigate('/products')} size="lg">
            View All Products
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
