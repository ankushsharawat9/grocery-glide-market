
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Mock products data
const allProducts = [
  {
    id: 1,
    name: "Fresh Organic Bananas",
    price: 2.99,
    originalPrice: 3.99,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 124,
    discount: 25,
    inStock: true,
    category: "Fruits"
  },
  {
    id: 2,
    name: "Premium Tomatoes",
    price: 4.49,
    originalPrice: 5.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 89,
    discount: 25,
    inStock: true,
    category: "Vegetables"
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    price: 3.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: "Bakery"
  },
  {
    id: 4,
    name: "Farm Fresh Eggs",
    price: 5.99,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    category: "Dairy"
  },
  {
    id: 5,
    name: "Organic Apples",
    price: 3.49,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    category: "Fruits"
  },
  {
    id: 6,
    name: "Fresh Spinach",
    price: 2.99,
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 45,
    inStock: true,
    category: "Vegetables"
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleSearch = () => {
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <div className="flex gap-4">
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
        
        <div className="flex gap-8">
          <CategoryFilter />
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
