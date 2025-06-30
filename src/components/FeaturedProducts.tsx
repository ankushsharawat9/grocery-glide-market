
import { ProductCard } from '@/components/ProductCard';

// Mock data for featured products
const featuredProducts = [
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
  }
];

export const FeaturedProducts = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our hand-picked selection of the freshest and highest quality products
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
