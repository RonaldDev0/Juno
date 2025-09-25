import { LemonSqueezyWebhookEvent } from '../types'
import { createAdminClient } from '@/lib/supabase/service-role'


export async function handleSubscriptionPaymentSuccess(e: LemonSqueezyWebhookEvent) {
  try {
    const supabase = createAdminClient()
    const attributes = e.data.attributes

    // 1. Find user by email in auth.users
    const { data: users, error: userError } = await supabase.auth.admin.listUsers()
    const user = users.users.find(u => u.email === attributes.user_email)

    if (userError || !user) {
      console.error('User not found:', userError)
      return
    }

    const userId = user.id

    // 2. Check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from('user_subscriptions')
      .select('id, status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (existingSubscription) {
      console.log('User already has active subscription, updating instead of creating new one:', {
        user_id: userId,
        existing_subscription_id: existingSubscription.id
      })
      // TODO: Handle subscription update instead of creation
      return
    }

    // 3. Find pricing by lemonsqueezy_variant_id (REQUIRED - must exist in DB)
    const { data: pricing, error: pricingError } = await supabase
      .from('subscription_pricing')
      .select('id, plan_id')
      .eq('lemonsqueezy_variant_id', attributes.variant_id.toString())
      .single()

    if (pricingError || !pricing) {
      console.error('Pricing not found in DB for variant:', attributes.variant_id, pricingError)
      return
    }

    // 4. Create new subscription
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: pricing.plan_id, // Required - from DB
        pricing_id: pricing.id, // Required - from DB
        status: 'active',
        started_at: new Date(attributes.created_at).toISOString(),
        current_period_start: new Date(attributes.current_period_start).toISOString(),
        current_period_end: new Date(attributes.current_period_end).toISOString(),
        lemonsqueezy_subscription_id: attributes.subscription_id.toString(),
        lemonsqueezy_customer_id: attributes.customer_id.toString(),
        // Store LemonSqueezy pricing info in metadata for reference
        metadata: {
          lemonsqueezy_variant_id: attributes.variant_id,
          lemonsqueezy_product_id: attributes.product_id,
          lemonsqueezy_amount_cents: attributes.total_usd
        }
      })
      .select()
      .single()

    if (subError || !subscription) {
      console.error('Error creating subscription:', subError)
      return
    }

    // 5. Insert payment record
    const { error: paymentError } = await supabase
      .from('payment_history')
      .insert({
        subscription_id: subscription.id,
        amount_cents: attributes.total_usd, // LemonSqueezy already sends amount in cents
        currency: 'USD',
        status: 'succeeded',
        lemonsqueezy_order_id: e.data.id,
        period_start: new Date(attributes.current_period_start).toISOString(),
        period_end: new Date(attributes.current_period_end).toISOString(),
        paid_at: new Date().toISOString()
      })

    if (paymentError) {
      console.error('Error inserting payment record:', paymentError)
      return
    }

    console.log('Successfully created subscription and processed payment:', {
      subscription_id: subscription.id,
      user_id: userId,
      payment_amount_cents: attributes.total_usd
    })

  } catch (error) {
    console.error('Error in handleSubscriptionPaymentSuccess:', error)
  }
}