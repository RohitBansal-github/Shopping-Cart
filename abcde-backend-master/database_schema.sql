-- Shopping Cart Database Schema for Supabase PostgreSQL

-- Drop existing tables if they exist (in reverse order due to foreign keys)
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.carts CASCADE;
DROP TABLE IF EXISTS public.items CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Users table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    cart_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table
CREATE TABLE public.items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carts table
CREATE TABLE public.carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Cart Items table (junction table)
CREATE TABLE public.cart_items (
    cart_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    PRIMARY KEY (cart_id, item_id),
    FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Add foreign key for cart_id in users table (after carts table is created)
ALTER TABLE public.users ADD CONSTRAINT fk_users_cart FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE SET NULL;

-- Insert some sample items for testing
INSERT INTO public.items (name, status) VALUES
    ('Laptop', 'active'),
    ('Mouse', 'active'),
    ('Keyboard', 'active'),
    ('Monitor', 'active'),
    ('Headphones', 'active');
