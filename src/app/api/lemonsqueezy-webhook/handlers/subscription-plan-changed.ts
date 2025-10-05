import { LemonSqueezyWebhookEvent } from '../types'
import { createAdminClient } from '@/lib/supabase/service-role'

// Helper function to safely parse dates
function safeParseDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return new Date().toISOString()
  }
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return new Date().toISOString()
    }
    return date.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export async function handleSubscriptionPlanChanged(e: LemonSqueezyWebhookEvent) {
  try {
    const supabase = createAdminClient()
    const a = e.data.attributes

    // 1) Locate the existing subscription by the Lemon Squeezy subscription ID
    let existingSub: any | null = null

    const { data: byLsSub, error: byLsSubErr } = await supabase
      .from('user_subscriptions')
      .select('id, user_id, plan_id, pricing_id, metadata')
      .eq('lemonsqueezy_subscription_id', a.subscription_id.toString())
      .single()

    if (!byLsSubErr && byLsSub) {
      existingSub = byLsSub
    } else {
      // Fallback: search by customer_id
      const { data: byCustomer, error: byCustomerErr } = await supabase
        .from('user_subscriptions')
        .select('id, user_id, plan_id, pricing_id, metadata')
        .eq('lemonsqueezy_customer_id', a.customer_id.toString())
        .eq('status', 'active')
        .single()

      if (!byCustomerErr && byCustomer) {
        existingSub = byCustomer
      } else {
        // Final fallback: by email (requires listing users)
        const { data: users } = await supabase.auth.admin.listUsers()
        const user = users.users.find(u => u.email === a.user_email)

        if (user) {
          const { data: byUserActive } = await supabase
            .from('user_subscriptions')
            .select('id, user_id, plan_id, pricing_id, metadata')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single()

          if (byUserActive) existingSub = byUserActive
        }
      }
    }

    if (!existingSub) {
      console.error('Active subscription not found for plan change event', {
        subscription_id: a.subscription_id,
        customer_id: a.customer_id,
        user_email: a.user_email
      })
      return { error: 'Active subscription not found for plan change event' }
    }

    // 2) Fetch the new pricing using the Lemon Squeezy variant_id
    const { data: newPricing, error: pricingErr } = await supabase
      .from('subscription_pricing')
      .select('id, plan_id, price_cents')
      .eq('lemonsqueezy_variant_id', a.variant_id.toString())
      .single()

    if (pricingErr || !newPricing) {
      console.error('New pricing not found for variant', a.variant_id, pricingErr)
      return { error: 'New pricing not found for variant', details: pricingErr }
    }

    // 3) Retrieve previous pricing and plan to compare
    const { data: oldPricing } = await supabase
      .from('subscription_pricing')
      .select('id, plan_id, price_cents')
      .eq('id', existingSub.pricing_id)
      .single()

    const { data: oldPlan } = await supabase
      .from('subscription_plans')
      .select('id, sort_order')
      .eq('id', existingSub.plan_id)
      .single()

    const { data: newPlan } = await supabase
      .from('subscription_plans')
      .select('id, sort_order')
      .eq('id', newPricing.plan_id)
      .single()

    // 4) Determine whether this is an upgrade or downgrade
    let action: 'upgraded' | 'downgraded' = 'upgraded'
    if (oldPlan && newPlan) {
      if (newPlan.sort_order > oldPlan.sort_order) {
        action = 'upgraded'
      } else if (newPlan.sort_order < oldPlan.sort_order) {
        action = 'downgraded'
      } else {
        // Same plan: compare price (e.g., billing cycle change)
        if (oldPricing && newPricing && newPricing.price_cents > oldPricing.price_cents) {
          action = 'upgraded'
        } else {
          action = 'downgraded'
        }
      }
    }

    // 5) Update the subscription with the new plan/pricing
    const newMetadata = {
      ...(existingSub.metadata || {}),
      lemonsqueezy_variant_id: a.variant_id,
      lemonsqueezy_product_id: a.product_id,
      billing_reason: a.billing_reason,
    }

    const { data: updatedSub, error: updateErr } = await supabase
      .from('user_subscriptions')
      .update({
        plan_id: newPricing.plan_id,
        pricing_id: newPricing.id,
        status: a.status || 'active',
        current_period_start: safeParseDate(a.current_period_start),
        current_period_end: safeParseDate(a.current_period_end),
        metadata: newMetadata,
      })
      .eq('id', existingSub.id)
      .select()
      .single()

    if (updateErr || !updatedSub) {
      console.error('Error updating subscription on plan change', updateErr)
      return { error: 'Error updating subscription on plan change', details: updateErr }
    }

    // 6) Record the change in subscription_history
    const { error: historyErr } = await supabase
      .from('subscription_history')
      .insert({
        subscription_id: existingSub.id,
        action,
        from_plan_id: existingSub.plan_id,
        to_plan_id: newPricing.plan_id,
        from_pricing_id: existingSub.pricing_id,
        to_pricing_id: newPricing.id,
        reason: 'subscription_plan_changed webhook',
        metadata: {
          lemonsqueezy_event_id: e.data.id,
          test_mode: a.test_mode ?? false,
        },
      })

    if (historyErr) {
      console.error('Error inserting subscription history on plan change', historyErr)
      // Do not return a fatal error; the subscription was already updated
    }

    return {
      message: 'Subscription plan updated',
      context: {
        subscription_id: existingSub.id,
        action,
        from_plan_id: existingSub.plan_id,
        to_plan_id: newPricing.plan_id,
      },
    }

  } catch (error) {
    console.error('Error in handleSubscriptionPlanChanged:', error)
  }
}