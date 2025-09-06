// =============================================
// DATABASE TYPES FOR SUBSCRIPTION SYSTEM
// =============================================

export interface Database {
  public: {
    Tables: {
      subscription_plans: {
        Row: {
          id: string
          name: string
          description: string | null
          features: string[]
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          features?: string[]
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          features?: string[]
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscription_pricing: {
        Row: {
          id: string
          plan_id: string
          billing_cycle: 'monthly' | 'yearly'
          price_cents: number
          currency: string
          lemonsqueezy_variant_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          billing_cycle: 'monthly' | 'yearly'
          price_cents: number
          currency?: string
          lemonsqueezy_variant_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          billing_cycle?: 'monthly' | 'yearly'
          price_cents?: number
          currency?: string
          lemonsqueezy_variant_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          pricing_id: string
          status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
          started_at: string
          current_period_start: string
          current_period_end: string
          canceled_at: string | null
          ended_at: string | null
          lemonsqueezy_subscription_id: string | null
          lemonsqueezy_customer_id: string | null
          metadata: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          pricing_id: string
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
          started_at?: string
          current_period_start: string
          current_period_end: string
          canceled_at?: string | null
          ended_at?: string | null
          lemonsqueezy_subscription_id?: string | null
          lemonsqueezy_customer_id?: string | null
          metadata?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          pricing_id?: string
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
          started_at?: string
          current_period_start?: string
          current_period_end?: string
          canceled_at?: string | null
          ended_at?: string | null
          lemonsqueezy_subscription_id?: string | null
          lemonsqueezy_customer_id?: string | null
          metadata?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      subscription_history: {
        Row: {
          id: string
          subscription_id: string
          action: 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'reactivated' | 'paused' | 'resumed'
          from_plan_id: string | null
          to_plan_id: string | null
          from_pricing_id: string | null
          to_pricing_id: string | null
          reason: string | null
          metadata: Record<string, any>
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          action: 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'reactivated' | 'paused' | 'resumed'
          from_plan_id?: string | null
          to_plan_id?: string | null
          from_pricing_id?: string | null
          to_pricing_id?: string | null
          reason?: string | null
          metadata?: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          subscription_id?: string
          action?: 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'reactivated' | 'paused' | 'resumed'
          from_plan_id?: string | null
          to_plan_id?: string | null
          from_pricing_id?: string | null
          to_pricing_id?: string | null
          reason?: string | null
          metadata?: Record<string, any>
          created_at?: string
        }
      }
      payment_history: {
        Row: {
          id: string
          subscription_id: string
          amount_cents: number
          currency: string
          status: 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded'
          lemonsqueezy_order_id: string | null
          lemonsqueezy_receipt_url: string | null
          period_start: string
          period_end: string
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          amount_cents: number
          currency?: string
          status: 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded'
          lemonsqueezy_order_id?: string | null
          lemonsqueezy_receipt_url?: string | null
          period_start: string
          period_end: string
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          subscription_id?: string
          amount_cents?: number
          currency?: string
          status?: 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded'
          lemonsqueezy_order_id?: string | null
          lemonsqueezy_receipt_url?: string | null
          period_start?: string
          period_end?: string
          paid_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_active_subscription: {
        Args: {
          user_uuid: string
        }
        Returns: {
          subscription_id: string
          plan_name: string
          billing_cycle: string
          price_cents: number
          status: string
          current_period_end: string
        }[]
      }
      can_change_subscription: {
        Args: {
          user_uuid: string
          new_plan_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// =============================================
// DERIVED TYPES FOR EASIER USE
// =============================================

export type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row']
export type SubscriptionPricing = Database['public']['Tables']['subscription_pricing']['Row']
export type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row']
export type SubscriptionHistory = Database['public']['Tables']['subscription_history']['Row']
export type PaymentHistory = Database['public']['Tables']['payment_history']['Row']

// Insert types
export type NewSubscriptionPlan = Database['public']['Tables']['subscription_plans']['Insert']
export type NewSubscriptionPricing = Database['public']['Tables']['subscription_pricing']['Insert']
export type NewUserSubscription = Database['public']['Tables']['user_subscriptions']['Insert']
export type NewSubscriptionHistory = Database['public']['Tables']['subscription_history']['Insert']
export type NewPaymentHistory = Database['public']['Tables']['payment_history']['Insert']

// Update types
export type UpdateSubscriptionPlan = Database['public']['Tables']['subscription_plans']['Update']
export type UpdateSubscriptionPricing = Database['public']['Tables']['subscription_pricing']['Update']
export type UpdateUserSubscription = Database['public']['Tables']['user_subscriptions']['Update']
export type UpdateSubscriptionHistory = Database['public']['Tables']['subscription_history']['Update']
export type UpdatePaymentHistory = Database['public']['Tables']['payment_history']['Update']

// =============================================
// COMPOSITE TYPES FOR UI AND BUSINESS LOGIC
// =============================================

export interface PlanWithPricing {
  id: string
  name: string
  description: string | null
  features: string[]
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  pricing: {
    monthly: SubscriptionPricing | null
    yearly: SubscriptionPricing | null
  }
}

export interface SubscriptionWithDetails {
  id: string
  user_id: string
  status: UserSubscription['status']
  started_at: string
  current_period_start: string
  current_period_end: string
  canceled_at: string | null
  ended_at: string | null
  lemonsqueezy_subscription_id: string | null
  lemonsqueezy_customer_id: string | null
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  plan: {
    id: string
    name: string
    description: string | null
    features: string[]
  }
  pricing: {
    id: string
    billing_cycle: 'monthly' | 'yearly'
    price_cents: number
    currency: string
    lemonsqueezy_variant_id: string | null
  }
}

// =============================================
// REQUEST/RESPONSE TYPES
// =============================================

export interface CreateSubscriptionRequest {
  plan_id: string
  billing_cycle: 'monthly' | 'yearly'
  payment_method_id?: string
}

export interface ChangeSubscriptionRequest {
  new_plan_id: string
  new_billing_cycle?: 'monthly' | 'yearly'
  immediate?: boolean
}

export interface CancelSubscriptionRequest {
  reason?: string
  immediate?: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}
