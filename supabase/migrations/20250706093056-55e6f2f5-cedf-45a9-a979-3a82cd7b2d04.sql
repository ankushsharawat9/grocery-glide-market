
-- Create wishlist table
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id UUID REFERENCES public.products NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Add Row Level Security (RLS) to wishlists
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Create policies for wishlists
CREATE POLICY "Users can view their own wishlist" 
  ON public.wishlists 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" 
  ON public.wishlists 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own wishlist" 
  ON public.wishlists 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create order cancellations table
CREATE TABLE public.order_cancellations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(order_id)
);

-- Add Row Level Security (RLS) to order cancellations
ALTER TABLE public.order_cancellations ENABLE ROW LEVEL SECURITY;

-- Create policies for order cancellations
CREATE POLICY "Users can view their own order cancellations" 
  ON public.order_cancellations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own order cancellations" 
  ON public.order_cancellations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add gender column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say'));

-- Add saved addresses to profiles table
ALTER TABLE public.profiles 
ADD COLUMN saved_addresses JSONB DEFAULT '[]'::jsonb;

-- Add avatar_url to profiles table
ALTER TABLE public.profiles 
ADD COLUMN avatar_url TEXT;

-- Update orders table to include cancellation status
ALTER TABLE public.orders 
ADD COLUMN cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN cancellation_reason TEXT;
