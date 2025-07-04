
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';

interface SearchResultsProps {
  searchQuery: string;
  category?: string;
}

export const SearchResults = ({ searchQuery, category }: SearchResultsProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) return;

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

        setProducts(data?.map(product => ({
          id: parseInt(product.id),
          name: product.name,
          price: product.price,
          originalPrice: product.original_price,
          image: product.image_url || '/placeholder.svg',
          rating: product.rating || 0,
          reviews: product.reviews_count || 0,
          discount: product.discount_percentage || 0,
          inStock: product.in_stock || false,
          category: product.category
        })) || []);
      } catch (error) {
        console.error('Search error:', error);
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
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{searchQuery}" ({products.length} found)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
