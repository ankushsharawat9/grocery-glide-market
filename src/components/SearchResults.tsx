
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';

interface SearchResultsProps {
  searchQuery: string;
  category?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  discount_percentage: number | null;
  in_stock: boolean | null;
  category: string;
}

export const SearchResults = ({ searchQuery, category }: SearchResultsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        let query = supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);

        if (category && category !== 'All') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error('Search error:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [searchQuery, category]);

  if (loading) {
    return <div className="text-center py-8">Searching...</div>;
  }

  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
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
            }} 
          />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your search.
        </div>
      )}
    </div>
  );
};
