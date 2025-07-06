
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { WishlistButton } from '@/components/WishlistButton';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  inStock: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }

    setLoading(true);
    try {
      console.log('Adding to cart:', { productId: product.id, quantity });
      await addToCart(product.id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Convert prices to rupees
  const priceInr = product.price * 83;
  const originalPriceInr = product.originalPrice ? product.originalPrice * 83 : null;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
      {product.discount && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500">
          -{product.discount}%
        </Badge>
      )}
      
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton 
            productId={product.id} 
            variant="icon"
            className="bg-white/80 hover:bg-white shadow-sm" 
          />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{priceInr.toFixed(2)}
            </span>
            {originalPriceInr && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPriceInr.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || loading}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </div>
          
          {!product.inStock && (
            <Badge variant="destructive" className="w-full justify-center">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
