export interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string
    custom_data?: Record<string, any>
    webhook_id: string
  }
  data: {
    id: string
    type: string
    attributes: {
      // Core subscription data (mapped to database fields)
      subscription_id: number
      customer_id: number
      status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
      
      // Customer information
      user_email: string
      user_name: string
      
      // Subscription lifecycle dates
      created_at: string
      updated_at: string
      cancelled_at?: string
      current_period_start: string
      current_period_end: string
      
      // Billing information (LemonSqueezy sends amounts in cents)
      total_usd: number // Actually in cents, not dollars
      billing_reason: string
      
      // Lemonsqueezy specific IDs for mapping
      variant_id: number
      product_id: number
      
      // Additional metadata
      test_mode?: boolean

      // URLs
      urls: {
        invoice_url: string
      }
    }
  }
}