-- =============================================
-- SUBSCRIPTION SYSTEM DATABASE SCHEMA
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid', 'paused');
CREATE TYPE subscription_action AS ENUM ('created', 'upgraded', 'downgraded', 'canceled', 'reactivated', 'paused', 'resumed');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'canceled', 'refunded');

-- =============================================
-- SUBSCRIPTION PLANS TABLE
-- =============================================
-- Stores available subscription plans (Basic, Premium, etc.)

CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb, -- Array of features
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- SUBSCRIPTION PRICING TABLE
-- =============================================
-- Stores pricing for each plan and billing cycle

CREATE TABLE subscription_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
    billing_cycle billing_cycle NOT NULL,
    price_cents INTEGER NOT NULL, -- Price in cents to avoid decimal issues
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    lemonsqueezy_variant_id VARCHAR(255), -- Lemonsqueezy variant ID for checkout
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    -- One price per plan per billing cycle
    UNIQUE(plan_id, billing_cycle)
);

-- =============================================
-- USER SUBSCRIPTIONS TABLE
-- =============================================
-- Stores user subscription records

CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    pricing_id UUID NOT NULL REFERENCES subscription_pricing(id),
    status subscription_status DEFAULT 'active' NOT NULL,
    
    -- Important dates
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    canceled_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    
    -- Lemonsqueezy integration
    lemonsqueezy_subscription_id VARCHAR(255) UNIQUE,
    lemonsqueezy_customer_id VARCHAR(255),
    
    -- Metadata for additional data
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- SUBSCRIPTION HISTORY TABLE
-- =============================================
-- Tracks all subscription changes for audit trail

CREATE TABLE subscription_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
    action subscription_action NOT NULL,
    from_plan_id UUID REFERENCES subscription_plans(id),
    to_plan_id UUID REFERENCES subscription_plans(id),
    from_pricing_id UUID REFERENCES subscription_pricing(id),
    to_pricing_id UUID REFERENCES subscription_pricing(id),
    reason TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- PAYMENT HISTORY TABLE
-- =============================================
-- Tracks payment transactions

CREATE TABLE payment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    status payment_status NOT NULL,
    lemonsqueezy_order_id VARCHAR(255),
    lemonsqueezy_receipt_url VARCHAR(255),
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User subscriptions indexes
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_lemonsqueezy_subscription_id ON user_subscriptions(lemonsqueezy_subscription_id);
CREATE INDEX idx_user_subscriptions_current_period_end ON user_subscriptions(current_period_end);
CREATE INDEX idx_user_subscriptions_user_status ON user_subscriptions(user_id, status);

-- Subscription pricing indexes
CREATE INDEX idx_subscription_pricing_plan_id ON subscription_pricing(plan_id);
CREATE INDEX idx_subscription_pricing_billing_cycle ON subscription_pricing(billing_cycle);

-- Subscription history indexes
CREATE INDEX idx_subscription_history_subscription_id ON subscription_history(subscription_id);
CREATE INDEX idx_subscription_history_created_at ON subscription_history(created_at DESC);

-- Payment history indexes
CREATE INDEX idx_payment_history_subscription_id ON payment_history(subscription_id);
CREATE INDEX idx_payment_history_status ON payment_history(status);
CREATE INDEX idx_payment_history_paid_at ON payment_history(paid_at);

-- =============================================
-- CONSTRAINTS
-- =============================================

-- Ensure only one active subscription per user
-- This is critical for Netflix-style subscriptions
CREATE UNIQUE INDEX idx_user_subscriptions_one_active_per_user 
ON user_subscriptions(user_id) 
WHERE status = 'active';

-- =============================================
-- TRIGGERS
-- =============================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_subscription_plans_updated_at 
    BEFORE UPDATE ON subscription_plans 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_pricing_updated_at 
    BEFORE UPDATE ON subscription_pricing 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at 
    BEFORE UPDATE ON user_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read)
CREATE POLICY "Anyone can view active subscription plans" ON subscription_plans
    FOR SELECT USING (is_active = true);

-- Policies for subscription_pricing (public read)
CREATE POLICY "Anyone can view active pricing" ON subscription_pricing
    FOR SELECT USING (is_active = true);

-- Policies for user_subscriptions (users can only see their own)
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON user_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON user_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for subscription_history (users can see history of their subscriptions)
CREATE POLICY "Users can view own subscription history" ON subscription_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_subscriptions 
            WHERE id = subscription_history.subscription_id 
            AND user_id = auth.uid()
        )
    );

-- Policies for payment_history (users can see payment history of their subscriptions)
CREATE POLICY "Users can view own payment history" ON payment_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_subscriptions 
            WHERE id = payment_history.subscription_id 
            AND user_id = auth.uid()
        )
    );

-- =============================================
-- UTILITY FUNCTIONS
-- =============================================

-- Function to get user's active subscription
CREATE OR REPLACE FUNCTION get_user_active_subscription(user_uuid UUID)
RETURNS TABLE (
    subscription_id UUID,
    plan_name VARCHAR(100),
    billing_cycle billing_cycle,
    price_cents INTEGER,
    status subscription_status,
    current_period_end TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        us.id,
        sp.name,
        spr.billing_cycle,
        spr.price_cents,
        us.status,
        us.current_period_end
    FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    JOIN subscription_pricing spr ON us.pricing_id = spr.id
    WHERE us.user_id = user_uuid 
    AND us.status = 'active'
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user can change subscription
CREATE OR REPLACE FUNCTION can_change_subscription(user_uuid UUID, new_plan_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    has_active_subscription BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM user_subscriptions 
        WHERE user_id = user_uuid 
        AND status = 'active'
    ) INTO has_active_subscription;
    
    -- If no active subscription, can create new one
    IF NOT has_active_subscription THEN
        RETURN TRUE;
    END IF;
    
    -- If has active subscription, verify new plan exists and is active
    RETURN EXISTS(
        SELECT 1 FROM subscription_plans 
        WHERE id = new_plan_id 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get plan with pricing variants (for checkout)
CREATE OR REPLACE FUNCTION get_plan_with_variants(plan_uuid UUID)
RETURNS TABLE (
    plan_id UUID,
    plan_name VARCHAR(100),
    plan_description TEXT,
    plan_features JSONB,
    monthly_pricing_id UUID,
    monthly_price_cents INTEGER,
    monthly_lemonsqueezy_variant_id VARCHAR(255),
    yearly_pricing_id UUID,
    yearly_price_cents INTEGER,
    yearly_lemonsqueezy_variant_id VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id,
        sp.name,
        sp.description,
        sp.features,
        monthly.id,
        monthly.price_cents,
        monthly.lemonsqueezy_variant_id,
        yearly.id,
        yearly.price_cents,
        yearly.lemonsqueezy_variant_id
    FROM subscription_plans sp
    LEFT JOIN subscription_pricing monthly ON sp.id = monthly.plan_id AND monthly.billing_cycle = 'monthly' AND monthly.is_active = true
    LEFT JOIN subscription_pricing yearly ON sp.id = yearly.plan_id AND yearly.billing_cycle = 'yearly' AND yearly.is_active = true
    WHERE sp.id = plan_uuid 
    AND sp.is_active = true
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get all plans with their variants (for pricing page)
CREATE OR REPLACE FUNCTION get_all_plans_with_variants()
RETURNS TABLE (
    plan_id UUID,
    plan_name VARCHAR(100),
    plan_description TEXT,
    plan_features JSONB,
    monthly_pricing_id UUID,
    monthly_price_cents INTEGER,
    monthly_lemonsqueezy_variant_id VARCHAR(255),
    yearly_pricing_id UUID,
    yearly_price_cents INTEGER,
    yearly_lemonsqueezy_variant_id VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id,
        sp.name,
        sp.description,
        sp.features,
        monthly.id,
        monthly.price_cents,
        monthly.lemonsqueezy_variant_id,
        yearly.id,
        yearly.price_cents,
        yearly.lemonsqueezy_variant_id
    FROM subscription_plans sp
    LEFT JOIN subscription_pricing monthly ON sp.id = monthly.plan_id AND monthly.billing_cycle = 'monthly' AND monthly.is_active = true
    LEFT JOIN subscription_pricing yearly ON sp.id = yearly.plan_id AND yearly.billing_cycle = 'yearly' AND yearly.is_active = true
    WHERE sp.is_active = true
    ORDER BY sp.sort_order;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SEED DATA
-- =============================================

-- Insert subscription plans (Good-Better-Best strategy)
INSERT INTO subscription_plans (name, description, features, sort_order) VALUES
('Starter', 'Perfect for individuals and small projects', 
 '["Basic platform access", "Email support", "Up to 3 projects", "Basic analytics", "Standard templates"]', 1),
('Professional', 'Ideal for growing teams and businesses', 
 '["Full platform access", "Priority support", "Unlimited projects", "Advanced analytics", "Premium templates", "Team collaboration", "API access"]', 2),
('Enterprise', 'Complete solution for large organizations', 
 '["Everything in Professional", "24/7 phone support", "Custom integrations", "Advanced security", "Dedicated account manager", "Custom branding", "White-label options"]', 3);

-- Insert pricing for Starter plan - Monthly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'monthly',
    2000, -- $20.00
    'lemonsqueezy_starter_monthly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Starter';

-- Insert pricing for Starter plan - Yearly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'yearly',
    20000, -- $200.00 (17% savings)
    'lemonsqueezy_starter_yearly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Starter';

-- Insert pricing for Professional plan - Monthly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'monthly',
    5000, -- $50.00
    'lemonsqueezy_professional_monthly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Professional';

-- Insert pricing for Professional plan - Yearly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'yearly',
    50000, -- $500.00 (17% savings)
    'lemonsqueezy_professional_yearly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Professional';

-- Insert pricing for Enterprise plan - Monthly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'monthly',
    10000, -- $100.00
    'lemonsqueezy_enterprise_monthly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Enterprise';

-- Insert pricing for Enterprise plan - Yearly
INSERT INTO subscription_pricing (plan_id, billing_cycle, price_cents, lemonsqueezy_variant_id) 
SELECT 
    sp.id,
    'yearly',
    100000, -- $1000.00 (17% savings)
    'lemonsqueezy_enterprise_yearly_variant_id' -- Replace with actual Lemonsqueezy variant ID
FROM subscription_plans sp
WHERE sp.name = 'Enterprise';
