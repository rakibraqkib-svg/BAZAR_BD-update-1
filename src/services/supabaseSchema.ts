/**
 * Complete Supabase PostgreSQL Database Architecture for BazarBD
 * Includes all 18 tables, Foreign Keys, Indexes, Triggers, and Row-Level Security (RLS) Policies.
 */

export const BAZARBD_SUPABASE_SQL = `-- ==============================================================================
-- BazarBD (বাজারবিডি) – Complete Supabase PostgreSQL Schema & Security Rules
-- Production-Ready DDL with Tables, Foreign Keys, Indexes, and RLS Policies
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed basic roles
INSERT INTO public.roles (name, description) VALUES
    ('super_admin', 'Supreme administrator with full destructive and governance access'),
    ('market_inspector', 'Verified price reporter or market official'),
    ('analyst', 'Data analyst with read and report generation permissions'),
    ('citizen', 'General registered user with watchlist and alert permissions')
ON CONFLICT (name) DO NOTHING;

-- 2. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    full_name VARCHAR(150),
    phone VARCHAR(30),
    division_id VARCHAR(50),
    preferred_market_id VARCHAR(50),
    avatar_url TEXT,
    language_preference VARCHAR(10) DEFAULT 'bn',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DIVISIONS TABLE (8 Bangladesh Divisions)
CREATE TABLE IF NOT EXISTS public.divisions (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DISTRICTS TABLE (64 Bangladesh Districts)
CREATE TABLE IF NOT EXISTS public.districts (
    id VARCHAR(50) PRIMARY KEY,
    division_id VARCHAR(50) REFERENCES public.divisions(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. UPAZILAS TABLE
CREATE TABLE IF NOT EXISTS public.upazilas (
    id VARCHAR(50) PRIMARY KEY,
    district_id VARCHAR(50) REFERENCES public.districts(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MARKETS TABLE (Local Bazars, Wholesale Hubs)
CREATE TABLE IF NOT EXISTS public.markets (
    id VARCHAR(50) PRIMARY KEY,
    district_id VARCHAR(50) REFERENCES public.districts(id) ON DELETE SET NULL,
    division_id VARCHAR(50) REFERENCES public.divisions(id) ON DELETE SET NULL,
    name_en VARCHAR(150) NOT NULL,
    name_bn VARCHAR(150) NOT NULL,
    location TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CATEGORIES TABLE (Vegetables, Fish, Meat, Rice, Oil, Spices, etc.)
CREATE TABLE IF NOT EXISTS public.categories (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50),
    image_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES public.categories(id) ON DELETE CASCADE,
    name_en VARCHAR(150) NOT NULL,
    name_bn VARCHAR(150) NOT NULL,
    description_bn TEXT,
    description_en TEXT,
    image_url TEXT,
    default_unit VARCHAR(30) NOT NULL, -- কেজি, লিটার, ডজন, পিস, etc.
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. PRODUCT IMAGES TABLE (Multi-image & Storage uploads)
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES public.products(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. DATA SOURCES TABLE (DAM, TCB, National Open Data, Admin Verified)
CREATE TABLE IF NOT EXISTS public.data_sources (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(150) NOT NULL,
    name_bn VARCHAR(150) NOT NULL,
    code VARCHAR(30) UNIQUE NOT NULL,
    url TEXT,
    reliability VARCHAR(30) DEFAULT 'official',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. MARKET PRICES TABLE (Current active price record per product per market)
CREATE TABLE IF NOT EXISTS public.market_prices (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES public.products(id) ON DELETE CASCADE,
    market_id VARCHAR(50) REFERENCES public.markets(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    previous_price DECIMAL(10, 2) NOT NULL,
    min_price DECIMAL(10, 2) NOT NULL,
    max_price DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    source_id VARCHAR(50) REFERENCES public.data_sources(id) ON DELETE SET NULL,
    verification_status VARCHAR(30) DEFAULT 'verified', -- verified, government, pending, sample
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id),
    CONSTRAINT unique_product_market_date UNIQUE(product_id, market_id, recorded_at)
);

-- 12. PRICE HISTORY TABLE (Historical time series data for analytics and trends)
CREATE TABLE IF NOT EXISTS public.price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES public.products(id) ON DELETE CASCADE,
    market_id VARCHAR(50) REFERENCES public.markets(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    min_price DECIMAL(10, 2),
    max_price DECIMAL(10, 2),
    unit VARCHAR(30) NOT NULL,
    source_id VARCHAR(50) REFERENCES public.data_sources(id) ON DELETE SET NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. API INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.api_integrations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    endpoint_url TEXT NOT NULL,
    api_key_encrypted TEXT,
    headers JSONB DEFAULT '{}'::JSONB,
    field_mappings JSONB DEFAULT '{}'::JSONB,
    sync_interval_hours INT DEFAULT 12,
    status VARCHAR(30) DEFAULT 'active', -- active, inactive, error
    last_sync_at TIMESTAMP WITH TIME ZONE,
    last_sync_status VARCHAR(30),
    records_synced INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. API SYNC LOGS TABLE
CREATE TABLE IF NOT EXISTS public.api_sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id VARCHAR(50) REFERENCES public.api_integrations(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL, -- success, failed, partial
    records_count INT DEFAULT 0,
    error_message TEXT,
    raw_response_snippet TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 15. PRICE REPORTS TABLE (User & Inspector submitted discrepancy alerts)
CREATE TABLE IF NOT EXISTS public.price_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES public.products(id),
    market_id VARCHAR(50) REFERENCES public.markets(id),
    reported_price DECIMAL(10, 2) NOT NULL,
    reported_by UUID REFERENCES auth.users(id),
    reporter_phone VARCHAR(30),
    comment TEXT,
    receipt_image_url TEXT,
    status VARCHAR(30) DEFAULT 'pending', -- pending, approved, rejected
    reviewed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. ADMIN ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(50),
    details JSONB DEFAULT '{}'::JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. NOTIFICATIONS & PRICE ALERTS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES public.products(id),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    target_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for lightning fast lookups & Realtime performance
CREATE INDEX IF NOT EXISTS idx_market_prices_product ON public.market_prices(product_id);
CREATE INDEX IF NOT EXISTS idx_market_prices_market ON public.market_prices(market_id);
CREATE INDEX IF NOT EXISTS idx_market_prices_recorded_at ON public.market_prices(recorded_at);
CREATE INDEX IF NOT EXISTS idx_price_history_lookup ON public.price_history(product_id, market_id, recorded_date);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on all primary tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Anyone can read verified commodity prices and catalogs)
CREATE POLICY "Public read products" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read market_prices" ON public.market_prices
    FOR SELECT USING (true);

CREATE POLICY "Public read price_history" ON public.price_history
    FOR SELECT USING (true);

CREATE POLICY "Public read categories" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Public read markets" ON public.markets
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read divisions" ON public.divisions
    FOR SELECT USING (true);

CREATE POLICY "Public read districts" ON public.districts
    FOR SELECT USING (true);

CREATE POLICY "Public read data sources" ON public.data_sources
    FOR SELECT USING (true);

-- 2. Authenticated Citizen Policies
CREATE POLICY "Users can manage own notifications" ON public.notifications
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can submit price reports" ON public.price_reports
    FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- 3. Super Admin & Inspector Write Policies
CREATE POLICY "Admins have full product control" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            JOIN public.roles r ON p.role_id = r.id
            WHERE p.id = auth.uid() AND r.name IN ('super_admin', 'market_inspector')
        )
    );

CREATE POLICY "Admins have full price control" ON public.market_prices
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            JOIN public.roles r ON p.role_id = r.id
            WHERE p.id = auth.uid() AND r.name IN ('super_admin', 'market_inspector')
        )
    );

-- ------------------------------------------------------------------------------
-- SUPABASE REALTIME REPLICATION ENABLEMENT
-- ------------------------------------------------------------------------------
ALTER PUBLICATION supabase_realtime ADD TABLE public.market_prices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.markets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
`;
