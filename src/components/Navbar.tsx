
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">GroceryGlide</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors">Home</a>
            <a href="/products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
            <a href="/categories" className="text-gray-700 hover:text-primary transition-colors">Categories</a>
            <a href="/deals" className="text-gray-700 hover:text-primary transition-colors">Deals</a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10 w-64" />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="/" className="text-lg font-medium">Home</a>
                  <a href="/products" className="text-lg font-medium">Products</a>
                  <a href="/categories" className="text-lg font-medium">Categories</a>
                  <a href="/deals" className="text-lg font-medium">Deals</a>
                  <div className="pt-4 border-t">
                    <div className="flex relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search products..." className="pl-10" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
