'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface SubscriptionData {
  subscription_id: string
  plan_name: string
  billing_cycle: 'monthly' | 'yearly'
  price_cents: number
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
  current_period_end: string
}

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null
  hasActiveSubscription: boolean
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscription = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        setSubscription(null)
        setError('User not authenticated')
        return
      }

      // Get user's active subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase.rpc('get_user_active_subscription', {
        user_uuid: user.id
      })

      if (subscriptionError) {
        console.error('Error fetching subscription:', subscriptionError)
        setError('Error fetching subscription information')
        setSubscription(null)
        return
      }

      // If there's subscription data, take the first one (should be unique)
      if (subscriptionData && subscriptionData.length > 0) {
        setSubscription(subscriptionData[0])
      } else {
        setSubscription(null)
      }

    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Unexpected error fetching subscription')
      setSubscription(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  const refetch = async () => {
    await fetchSubscription()
  }

  return {
    subscription,
    hasActiveSubscription: subscription !== null && subscription.status === 'active',
    isLoading,
    error,
    refetch
  }
}