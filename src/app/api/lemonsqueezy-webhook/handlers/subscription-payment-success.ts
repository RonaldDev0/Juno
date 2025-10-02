import { LemonSqueezyWebhookEvent } from '../types'
import { createAdminClient } from '@/lib/supabase/service-role'

// Helper function to safely parse dates
function safeParseDate(dateString: string | null | undefined): string {
  if (!dateString) {
    // Return current date as ISO string for required fields
    return new Date().toISOString()
  }
  
  try {
    // Check if the date string is valid
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}, using current date instead`)
      return new Date().toISOString()
    }
    return date.toISOString()
  } catch (error) {
    console.warn(`Error parsing date: ${dateString}, using current date instead`, error);
    return new Date().toISOString()
  }
}

// LemonSqueezy API helper function
async function fetchVariantIdFromSubscription(subscriptionId: string | number) {
  try {
    const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY
    
    if (!LEMONSQUEEZY_API_KEY) {
      console.error('LEMONSQUEEZY_API_KEY not found in environment variables')
      return null
    }
    
    const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${LEMONSQUEEZY_API_KEY}`
      }
    })
    
    if (!response.ok) {
      console.error('Failed to fetch subscription from LemonSqueezy:', response.status, await response.text())
      return null
    }
    
    const data = await response.json()
    return data.data?.attributes?.variant_id || null
  } catch (error) {
    console.error('Error fetching variant_id from LemonSqueezy:', error)
    return null
  }
}


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

    // 3. Find pricing information
    let pricing;
    
    // If variant_id is not directly available, try to fetch it from LemonSqueezy API
    if (!attributes.variant_id && attributes.subscription_id) {
      console.log('Fetching variant_id from LemonSqueezy API using subscription_id:', attributes.subscription_id)
      
      const variantId = await fetchVariantIdFromSubscription(attributes.subscription_id)
      
      if (variantId) {
        console.log('Successfully fetched variant_id:', variantId)
        
        // Look up pricing with the fetched variant_id
        const { data: fetchedPricing, error: pricingError } = await supabase
          .from('subscription_pricing')
          .select('id, plan_id')
          .eq('lemonsqueezy_variant_id', variantId.toString())
          .single()
          
        if (!pricingError && fetchedPricing) {
          pricing = fetchedPricing
        } else {
          console.error('Pricing not found for fetched variant_id:', variantId, pricingError)
        }
      }
    }
    
    // If we still don't have pricing (either no variant_id or fetch failed), try free tier
    if (!pricing) {
      if (!attributes.variant_id) {
        console.log('No variant_id available - handling as free tier subscription')
        
        // Get the free plan from the database
        const { data: freePlan, error: freePlanError } = await supabase
          .from('subscription_plans')
          .select('id')
          .eq('name', 'Free')
          .single()
        
        if (freePlanError || !freePlan) {
          console.error('Free plan not found in DB:', freePlanError)
          return
        }
        
        // Get the free pricing for this plan
        const { data: freePricing, error: freePricingError } = await supabase
          .from('subscription_pricing')
          .select('id, plan_id')
          .eq('plan_id', freePlan.id)
          .eq('price_cents', 0)
          .single()
        
        if (freePricingError || !freePricing) {
          console.error('Free pricing not found in DB:', freePricingError)
          return
        }
        
        pricing = freePricing
      } else {
        // Use variant_id directly from webhook payload
        const variantId = attributes.variant_id.toString()
        
        const { data: paidPricing, error: pricingError } = await supabase
          .from('subscription_pricing')
          .select('id, plan_id')
          .eq('lemonsqueezy_variant_id', variantId)
          .single()

        if (pricingError || !paidPricing) {
          console.error('Pricing not found in DB for variant:', attributes.variant_id, pricingError)
          return
        }
        
        pricing = paidPricing
      }
    }
    
    if (!pricing) {
      console.error('Failed to determine pricing')
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
        started_at: safeParseDate(attributes.created_at),
        current_period_start: safeParseDate(attributes.current_period_start),
        current_period_end: safeParseDate(attributes.current_period_end),
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
        period_start: safeParseDate(attributes.current_period_start),
        period_end: safeParseDate(attributes.current_period_end),
        paid_at: new Date().toISOString(),
        lemonsqueezy_receipt_url: attributes.urls.invoice_url,
      })

    if (paymentError) {
      console.error('Error inserting payment record:', paymentError)
      return
    }

  } catch (error) {
    console.error('Error in handleSubscriptionPaymentSuccess:', error)
  }
}