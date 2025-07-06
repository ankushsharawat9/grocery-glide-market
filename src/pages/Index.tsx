
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, User, Settings, Heart, MapPin } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(8)
        .order('rating', { ascending: false });
      
      if (data) {
        setFeaturedProducts(data.map(product => ({
          id: product.id,
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
      
      {/* Profile Management Section */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Manage Your Profile</h2>
          
          {user ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
                <CardHeader className="text-center pb-4">
                  <User className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">Personal Info</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">Update your name, email, phone, and other personal details</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
                <CardHeader className="text-center pb-4">
                  <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">Addresses</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">Manage your saved delivery and billing addresses</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/orders')}>
                <CardHeader className="text-center pb-4">
                  <Settings className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">Order History</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">View and track your past orders and purchases</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/wishlist')}>
                <CardHeader className="text-center pb-4">
                  <Heart className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">Wishlist</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">Manage your saved items and favorites</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
                <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
                <p className="text-gray-600 mb-6">
                  Sign up or log in to manage your profile, save addresses, track orders, and create your wishlist.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full sm:w-auto">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
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
