# Subscription System Database Schema

## 🎯 Overview

This is a Netflix-style subscription system designed for Supabase with the following key features:

- **One subscription per user** (enforced by database constraint)
- **Flexible pricing** (monthly/yearly billing cycles)
- **Complete audit trail** (subscription history)
- **Stripe integration ready**
- **Row Level Security** (RLS) for data protection
- **Type-safe** with TypeScript

## 📊 Database Tables

### 1. `subscription_plans`
Stores available subscription plans (Basic, Premium, etc.)

```sql
- id (UUID, PK)
- name (VARCHAR) - e.g: "Basic", "Premium"
- description (TEXT)
- features (JSONB) - Array of features
- is_active (BOOLEAN)
- sort_order (INTEGER)
- created_at, updated_at (TIMESTAMP)
```

### 2. `subscription_pricing`
Stores pricing for each plan and billing cycle

```sql
- id (UUID, PK)
- plan_id (UUID, FK) - References subscription_plans
- billing_cycle (ENUM) - 'monthly' | 'yearly'
- price_cents (INTEGER) - Price in cents
- currency (VARCHAR) - e.g: 'USD'
- stripe_price_id (VARCHAR) - Stripe integration
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

### 3. `user_subscriptions`
Stores user subscription records

```sql
- id (UUID, PK)
- user_id (UUID, FK) - References auth.users
- plan_id (UUID, FK) - References subscription_plans
- pricing_id (UUID, FK) - References subscription_pricing
- status (ENUM) - 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
- started_at (TIMESTAMP)
- current_period_start (TIMESTAMP)
- current_period_end (TIMESTAMP)
- canceled_at (TIMESTAMP)
- ended_at (TIMESTAMP)
- stripe_subscription_id (VARCHAR)
- stripe_customer_id (VARCHAR)
- metadata (JSONB)
- created_at, updated_at (TIMESTAMP)
```

### 4. `subscription_history`
Tracks all subscription changes for audit trail

```sql
- id (UUID, PK)
- subscription_id (UUID, FK) - References user_subscriptions
- action (ENUM) - 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'reactivated' | 'paused' | 'resumed'
- from_plan_id (UUID, FK) - Previous plan
- to_plan_id (UUID, FK) - New plan
- from_pricing_id (UUID, FK) - Previous pricing
- to_pricing_id (UUID, FK) - New pricing
- reason (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMP)
```

### 5. `payment_history`
Tracks payment transactions

```sql
- id (UUID, PK)
- subscription_id (UUID, FK) - References user_subscriptions
- amount_cents (INTEGER)
- currency (VARCHAR)
- status (ENUM) - 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded'
- stripe_payment_intent_id (VARCHAR)
- stripe_invoice_id (VARCHAR)
- period_start (TIMESTAMP)
- period_end (TIMESTAMP)
- paid_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

## 🔒 Security Features

### Row Level Security (RLS)
- **Enabled on all tables** for data protection
- **Users can only see their own data**
- **Plans and pricing are publicly readable**
- **Complete audit trail** for compliance

### Constraints
- **One active subscription per user** (unique index)
- **One price per plan per billing cycle** (unique constraint)
- **Foreign key relationships** for data integrity

## 🚀 Key Features

### 1. Netflix-Style Subscriptions
- Only one active subscription per user
- Easy upgrade/downgrade between plans
- Complete change history

### 2. Flexible Pricing
- Monthly and yearly billing cycles
- Easy to add new plans and pricing
- Stripe integration ready

### 3. Audit Trail
- Complete history of all changes
- Reason tracking for changes
- Metadata support for additional data

### 4. Performance Optimized
- Strategic indexes on frequently queried columns
- Efficient foreign key relationships
- JSONB for flexible metadata storage

## 📝 Setup Instructions

1. **Run the SQL schema** in your Supabase SQL editor
2. **Update Stripe price IDs** in the seed data
3. **Configure environment variables** for Stripe integration
4. **Test the RLS policies** to ensure security

## 🔧 Database Functions

### `get_user_active_subscription(user_uuid)`
Returns the active subscription for a user with plan and pricing details.

### `can_change_subscription(user_uuid, new_plan_id)`
Checks if a user can change their subscription to a new plan.

## 📊 Sample Data

The schema includes seed data for:
- **Basic Plan**: $9.99/month, $99.99/year
- **Premium Plan**: $19.99/month, $199.99/year

## 🎯 Next Steps

1. **Review the schema** and confirm it meets your requirements
2. **Run the SQL** in your Supabase project
3. **Test the RLS policies** to ensure security
4. **Update Stripe price IDs** with real values
5. **Start building the application logic**

## 💡 Best Practices Implemented

- **Price in cents** to avoid decimal issues
- **UUID primary keys** for better distribution
- **JSONB metadata** for flexible data storage
- **Comprehensive indexing** for performance
- **Audit trail** for compliance
- **Type safety** with TypeScript
- **Row Level Security** for data protection
