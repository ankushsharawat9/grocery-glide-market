
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  'All Categories',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Bakery',
  'Beverages',
  'Snacks',
  'Frozen',
  'Pantry'
];

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
