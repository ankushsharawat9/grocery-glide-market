
export const sampleProducts = [
  {
    name: "Fresh Organic Apples",
    description: "Crisp and sweet organic apples, perfect for snacking or baking. Grown without pesticides.",
    price: 2.99,
    original_price: 3.49,
    category: "Fruits",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 50,
    rating: 4.5,
    reviews_count: 23,
    discount_percentage: 14
  },
  {
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread, rich in fiber and nutrients.",
    price: 1.99,
    category: "Bakery",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 30,
    rating: 4.2,
    reviews_count: 15,
    discount_percentage: 0
  },
  {
    name: "Organic Milk",
    description: "Fresh organic milk from grass-fed cows. Rich in calcium and protein.",
    price: 3.49,
    category: "Dairy",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 25,
    rating: 4.7,
    reviews_count: 31,
    discount_percentage: 0
  },
  {
    name: "Free-Range Eggs",
    description: "Farm-fresh eggs from free-range chickens. Perfect for breakfast or baking.",
    price: 4.99,
    original_price: 5.49,
    category: "Dairy",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 40,
    rating: 4.8,
    reviews_count: 42,
    discount_percentage: 9
  },
  {
    name: "Fresh Salmon Fillet",
    description: "Premium Atlantic salmon fillet, rich in omega-3 fatty acids.",
    price: 12.99,
    category: "Seafood",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 15,
    rating: 4.6,
    reviews_count: 18,
    discount_percentage: 0
  },
  {
    name: "Organic Spinach",
    description: "Fresh organic baby spinach leaves, perfect for salads and smoothies.",
    price: 2.49,
    category: "Vegetables",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 35,
    rating: 4.3,
    reviews_count: 27,
    discount_percentage: 0
  },
  {
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt with live probiotics. High in protein.",
    price: 1.79,
    original_price: 2.29,
    category: "Dairy",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 45,
    rating: 4.4,
    reviews_count: 38,
    discount_percentage: 22
  },
  {
    name: "Organic Bananas",
    description: "Sweet and ripe organic bananas, great source of potassium.",
    price: 1.99,
    category: "Fruits",
    image_url: "/placeholder.svg",
    in_stock: true,
    stock_quantity: 60,
    rating: 4.1,
    reviews_count: 19,
    discount_percentage: 0
  }
];

export const seedProducts = async () => {
  const { supabase } = await import('@/integrations/supabase/client');
  
  // Check if products already exist
  const { data: existingProducts } = await supabase
    .from('products')
    .select('id')
    .limit(1);
  
  if (existingProducts && existingProducts.length > 0) {
    console.log('Products already exist, skipping seed');
    return;
  }
  
  try {
    const { error } = await supabase
      .from('products')
      .insert(sampleProducts);
    
    if (error) {
      console.error('Error seeding products:', error);
    } else {
      console.log('Successfully seeded products');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
