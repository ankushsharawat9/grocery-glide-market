
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const categories = [
  { id: 'fruits', name: 'Fruits & Vegetables', count: 156 },
  { id: 'dairy', name: 'Dairy & Eggs', count: 89 },
  { id: 'meat', name: 'Meat & Seafood', count: 124 },
  { id: 'bakery', name: 'Bakery', count: 67 },
  { id: 'beverages', name: 'Beverages', count: 203 },
  { id: 'snacks', name: 'Snacks', count: 145 },
  { id: 'frozen', name: 'Frozen Foods', count: 98 },
  { id: 'pantry', name: 'Pantry Staples', count: 234 }
];

export const CategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  return (
    <div className="w-64 space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <label 
                htmlFor={category.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {category.name}
              </label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={(checked) => 
                  setSelectedRating(checked ? rating : null)
                }
              />
              <label 
                htmlFor={`rating-${rating}`} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {rating} Stars & Up
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 100]);
          setSelectedRating(null);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
};
