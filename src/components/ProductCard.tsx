
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    setIsInCart(true);
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Wishlist logic here
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.name}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
      {product.discount && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500">
          -{product.discount}%
        </Badge>
      )}
      
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 z-10 ${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
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
              disabled={!product.inStock}
              className={isInCart ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isInCart ? 'Added' : 'Add'}
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
