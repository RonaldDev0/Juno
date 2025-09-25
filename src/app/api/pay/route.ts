import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCheckoutUrl } from './get-checkout-url'

export async function POST(req: NextRequest) {
  try {
    const { planId, billingCycle, variantIds } = await req.json()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const url = await getCheckoutUrl(variantIds, planId, billingCycle, user.id)

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
