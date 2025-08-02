-- Fix the foreign key constraint for cart_items table
-- First, let's check what constraints exist
-- Remove any existing foreign key constraint on user_id if it exists
DO $$ 
DECLARE 
    constraint_name text;
BEGIN
    -- Find the constraint name for user_id foreign key
    SELECT tc.constraint_name INTO constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'cart_items' 
        AND tc.constraint_type = 'FOREIGN KEY'
        AND kcu.column_name = 'user_id';
    
    -- Drop the constraint if it exists
    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.cart_items DROP CONSTRAINT ' || constraint_name;
    END IF;
END $$;

-- Add proper foreign key constraint to auth.users
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Similarly fix wishlists table
DO $$ 
DECLARE 
    constraint_name text;
BEGIN
    -- Find the constraint name for user_id foreign key in wishlists
    SELECT tc.constraint_name INTO constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'wishlists' 
        AND tc.constraint_type = 'FOREIGN KEY'
        AND kcu.column_name = 'user_id';
    
    -- Drop the constraint if it exists
    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.wishlists DROP CONSTRAINT ' || constraint_name;
    END IF;
END $$;

-- Add proper foreign key constraint to auth.users for wishlists
ALTER TABLE public.wishlists 
ADD CONSTRAINT wishlists_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;