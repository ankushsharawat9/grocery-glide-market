
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface CategoryFilterProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export const CategoryFilter = ({ onCategorySelect, selectedCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category');

        if (error) throw error;
        
        const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
        setCategories(uniqueCategories.sort());
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
  };

  if (loading) {
    return (
      <Card className="w-64 h-fit">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-64 h-fit">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant={selectedCategory === '' || selectedCategory === 'All' ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={() => handleCategoryClick('All')}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
