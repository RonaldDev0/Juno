import { NextResponse } from 'next/server'
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { createClient } from '@/lib/supabase/server'

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
  onError: error => console.error('Lemonsqueezy error:', error)
})

export async function getCheckoutUrl(
  variantIds: Array<number | string>,
  planId: string,
  billingCycle: string,
  userId: string
): Promise<NextResponse> {
  const supabase = await createClient()

  const { data: getUserActiveSubscription, error } = await supabase.rpc('get_user_active_subscription', {
    user_uuid: userId
  })

  if (error) {
    return NextResponse.json({ message: 'Error checking if user can change subscription' }, { status: 500 })
  }

  const isUserActiveSubscription = getUserActiveSubscription && getUserActiveSubscription.length > 0

  if (isUserActiveSubscription) {
    return NextResponse.json({
      message: 'You already have an active subscription',
      code: 'ALREADY_SUBSCRIBED',
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE}/home`
    }, { status: 400 })
  }

  if (!(planId && billingCycle && variantIds && variantIds.length > 0)) {
    return NextResponse.json({
      message: 'Plan ID, billing cycle, and variant IDs are required',
      code: 'INVALID_REQUEST'
    }, { status: 400 })
  }

  // TODO: create user

  // TODO: create checkout url
  const lastVariantId = Number(variantIds[variantIds.length - 1])
  const enabledVariants = variantIds.map(v => Number(v))
  const checkoutUrl = await createCheckout(process.env.LEMONSQUEEZY_STORE_ID!, lastVariantId, {
    checkoutOptions: {
      embed: false,
      logo: false,
    },
    productOptions: {
      // After payment, redirect to a processing page that will poll subscription status
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE}/pay/success`,
      enabledVariants,
      receiptButtonText: 'Go to Dashboard',
      receiptThankYouNote: 'Thank you for signing up to Juno'
    }
  })

  return NextResponse.json({ url: checkoutUrl.data?.data.attributes.url }, { status: 200 })
}