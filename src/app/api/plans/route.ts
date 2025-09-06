import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// =============================================
// PLANS API - OPTIMIZED FOR LANDING PAGE
// =============================================

export async function GET() {
  try {
    const supabase = createClient()
    
    // Get all plans with pricing using the optimized function
    const supabaseClient = await supabase
    const { data: plans, error } = await supabaseClient
      .rpc('get_all_plans_with_variants')

    if (error) {
      console.error('Error fetching plans:', error)
      return NextResponse.json(
        { error: 'Failed to fetch plans' },
        { status: 500 }
      )
    }

    console.log('Plans:', plans)

    // Transform data for frontend consumption
    const transformedPlans = plans.map((plan: any) => ({
      id: plan.plan_id,
      name: plan.plan_name,
      description: plan.plan_description,
      features: plan.plan_features,
      pricing: {
        monthly: {
          id: plan.monthly_pricing_id,
          price_cents: plan.monthly_price_cents,
          price_display: formatPrice(plan.monthly_price_cents),
          variant_id: plan.monthly_lemonsqueezy_variant_id
        },
        yearly: {
          id: plan.yearly_pricing_id,
          price_cents: plan.yearly_price_cents,
          price_display: formatPrice(plan.yearly_price_cents),
          variant_id: plan.yearly_lemonsqueezy_variant_id,
          savings_percentage: calculateYearlySavings(plan.monthly_price_cents, plan.yearly_price_cents)
        }
      },
      // Determine if this is the popular plan (Professional)
      is_popular: plan.plan_name === 'Professional'
    }))

    // Cache headers for better performance (24 hours)
    return NextResponse.json(
      { plans: transformedPlans },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
          'CDN-Cache-Control': 'public, s-maxage=86400',
        }
      }
    )

  } catch (error) {
    console.error('Plans API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}

function calculateYearlySavings(monthlyPrice: number, yearlyPrice: number): number {
  const monthlyYearly = monthlyPrice * 12
  const savings = monthlyYearly - yearlyPrice
  const percentage = Math.round((savings / monthlyYearly) * 100)
  
  // Only return savings if it's at least 1%
  return percentage >= 1 ? percentage : 0
}
