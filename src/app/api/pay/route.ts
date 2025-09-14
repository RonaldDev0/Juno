import { NextResponse, type NextRequest } from 'next/server'
// import { createClient } from '@/lib/supabase/server'
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
  onError: error => console.error('Lemonsqueezy error:', error)
})

export async function POST(request: NextRequest) {
  try {
    const { planId, billingCycle, variantIds } = await request.json()

    if (!(planId && billingCycle && variantIds)) {
      return NextResponse.json({ message: 'Plan ID, billing cycle, and variant IDs are required' }, { status: 400 })
    }

    const checkoutUrl = await createCheckout(process.env.LEMONSQUEEZY_STORE_ID!, variantIds[variantIds.length - 1], {
      productOptions: {
        redirectUrl: 'http://localhost:3000/home?payment=success',
        enabledVariants: variantIds
      }
    })

    return NextResponse.json({ url: checkoutUrl.data?.data.attributes.url }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}