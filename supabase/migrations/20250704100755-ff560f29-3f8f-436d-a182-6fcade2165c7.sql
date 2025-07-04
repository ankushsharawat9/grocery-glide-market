
-- Add more products with better variety and proper images
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, reviews_count, discount_percentage, in_stock) VALUES

-- Fruits
('Premium Avocados', 'Creamy, ripe avocados perfect for guacamole, toast, or salads. Rich in healthy fats and nutrients.', 5.99, 7.99, 'Fruits', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400', 45, 4.7, 89, 25, true),
('Organic Strawberries', 'Sweet, juicy organic strawberries. Perfect for snacking, smoothies, or desserts.', 6.49, null, 'Fruits', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', 30, 4.8, 156, 0, true),
('Fresh Pineapple', 'Sweet and tangy fresh pineapple. Great source of vitamin C and digestive enzymes.', 4.99, null, 'Fruits', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', 25, 4.6, 73, 0, true),
('Red Grapes', 'Sweet, seedless red grapes. Perfect for snacking or adding to fruit salads.', 4.49, 5.99, 'Fruits', 'https://images.unsplash.com/photo-1537640538966-79f369143780?w=400', 40, 4.5, 92, 25, true),

-- Vegetables
('Organic Carrots', 'Fresh, crunchy organic carrots. Great for snacking, cooking, or juicing.', 2.99, null, 'Vegetables', 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400', 60, 4.4, 67, 0, true),
('Bell Peppers Mixed', 'Colorful mix of red, yellow, and orange bell peppers. Perfect for stir-fries and salads.', 5.99, null, 'Vegetables', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', 35, 4.6, 84, 0, true),
('Fresh Broccoli', 'Nutritious fresh broccoli crowns. High in vitamins and perfect for steaming or roasting.', 3.49, null, 'Vegetables', 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400', 50, 4.3, 76, 0, true),
('Organic Cucumbers', 'Crisp, refreshing organic cucumbers. Great for salads, sandwiches, or pickling.', 2.49, null, 'Vegetables', 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400', 55, 4.2, 58, 0, true),

-- Dairy
('Greek Yogurt', 'Creamy, protein-rich Greek yogurt. Perfect for breakfast or snacks.', 4.99, null, 'Dairy', 'https://images.unsplash.com/photo-1571212515416-cf4d5ba31c23?w=400', 25, 4.7, 134, 0, true),
('Organic Milk', 'Fresh organic whole milk from grass-fed cows. Rich and creamy taste.', 5.49, null, 'Dairy', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 30, 4.8, 98, 0, true),
('Aged Cheddar Cheese', 'Sharp, aged cheddar cheese. Perfect for sandwiches, cooking, or snacking.', 7.99, 9.99, 'Dairy', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', 20, 4.9, 187, 20, true),
('Fresh Mozzarella', 'Creamy fresh mozzarella cheese. Ideal for caprese salads and pizza.', 6.99, null, 'Dairy', 'https://images.unsplash.com/photo-1576406359362-009fe209a41c?w=400', 15, 4.6, 92, 0, true),

-- Bakery
('Artisan Sourdough', 'Traditional sourdough bread with crispy crust and tangy flavor.', 5.99, null, 'Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 12, 4.8, 167, 0, true),
('Fresh Croissants', 'Buttery, flaky croissants baked fresh daily. Perfect for breakfast.', 8.99, null, 'Bakery', 'https://images.unsplash.com/photo-1555507036-ab794f43aa1b?w=400', 8, 4.7, 89, 0, true),
('Chocolate Muffins', 'Rich chocolate chip muffins made with premium ingredients.', 6.49, null, 'Bakery', 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400', 15, 4.5, 76, 0, true),
('Bagels Variety Pack', 'Assorted fresh bagels including plain, sesame, and everything.', 4.99, null, 'Bakery', 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', 20, 4.4, 54, 0, true),

-- Meat & Seafood
('Atlantic Salmon', 'Fresh Atlantic salmon fillets. Rich in omega-3 fatty acids.', 12.99, 15.99, 'Meat & Seafood', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400', 10, 4.8, 123, 19, true),
('Organic Chicken Breast', 'Lean, organic chicken breast. Perfect for grilling or baking.', 8.99, null, 'Meat & Seafood', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', 18, 4.6, 87, 0, true),
('Ground Turkey', 'Lean ground turkey. Great for healthy meal prep and cooking.', 6.99, null, 'Meat & Seafood', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400', 22, 4.5, 65, 0, true),

-- Pantry
('Quinoa', 'Organic quinoa grain. High in protein and perfect for healthy meals.', 7.99, null, 'Pantry', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 35, 4.7, 142, 0, true),
('Extra Virgin Olive Oil', 'Premium extra virgin olive oil. Cold-pressed for maximum flavor.', 11.99, 14.99, 'Pantry', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 25, 4.9, 234, 20, true),
('Organic Pasta', 'Whole wheat organic pasta. Perfect base for healthy Italian dishes.', 3.99, null, 'Pantry', 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400', 40, 4.4, 89, 0, true),
('Himalayan Pink Salt', 'Pure Himalayan pink salt. Rich in minerals and perfect for seasoning.', 8.49, null, 'Pantry', 'https://images.unsplash.com/photo-1596040740998-6fd0531cd627?w=400', 50, 4.6, 156, 0, true),

-- Snacks
('Mixed Nuts', 'Premium mix of almonds, cashews, and walnuts. Great for healthy snacking.', 9.99, 12.99, 'Snacks', 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400', 30, 4.7, 198, 23, true),
('Organic Granola', 'Crunchy organic granola with honey and dried fruits. Perfect for breakfast.', 6.99, null, 'Snacks', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400', 25, 4.5, 87, 0, true),
('Dark Chocolate Bar', 'Premium 70% dark chocolate bar. Rich and satisfying.', 4.99, null, 'Snacks', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', 45, 4.8, 276, 0, true);
