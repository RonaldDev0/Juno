import { NextResponse, type NextRequest } from 'next/server'
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { createClient } from '@/lib/supabase/server'

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
  onError: error => console.error('Lemonsqueezy error:', error)
})

export async function getCheckoutUrl(variantIds: number[], planId: string, billingCycle: string, userId: string) {
  const supabase = await createClient()

  const { data: getUserActiveSubscription, error } = await supabase.rpc('get_user_active_subscription', {
    user_uuid: userId
  })

  if (error) return NextResponse.json({ message: 'Error checking if user can change subscription' }, { status: 500 })

  const isUserActiveSubscription = getUserActiveSubscription && getUserActiveSubscription.length > 0

  if (isUserActiveSubscription) {
    return NextResponse.json({ message: 'You already have an active subscription', url: `${process.env.NEXT_PUBLIC_SITE}/home` }, { status: 400 })
  }

  if (!(planId && billingCycle && variantIds)) {
    return NextResponse.json({ message: 'Plan ID, billing cycle, and variant IDs are required' }, { status: 400 })
  }

  // TODO: create user

  // TODO: create checkout url
  const checkoutUrl = await createCheckout(process.env.LEMONSQUEEZY_STORE_ID!, variantIds[variantIds.length - 1], {
    checkoutOptions: {
      embed: false,
      logo: false,
    },
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE}/home`,
      enabledVariants: variantIds,
      receiptButtonText: 'Go to Dashboard',
      receiptThankYouNote: 'Thank you for signing up to Juno'
    }
  })

  return checkoutUrl.data?.data.attributes.url
}