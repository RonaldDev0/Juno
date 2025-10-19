import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'

export interface SubscriptionData {
  subscription_id: string
  plan_name: string
  billing_cycle: 'monthly' | 'yearly'
  price_cents: number
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'paused'
  current_period_end: string
}

type SubscriptionState = {
  subscription: SubscriptionData | null
  hasActiveSubscription: boolean
  isLoading: boolean
  error: string | null
  initialized: boolean
  setSubscription: (sub: SubscriptionData | null) => void
  clear: () => void
  fetch: () => Promise<void>
  init: () => Promise<void>
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: null,
      hasActiveSubscription: false,
      isLoading: false,
      error: null,
      initialized: false,

      setSubscription: (sub) =>
        set({
          subscription: sub,
          hasActiveSubscription: !!sub && sub.status === 'active',
        }),

      clear: () => set({ subscription: null, hasActiveSubscription: false }),

      fetch: async () => {
        try {
          set({ isLoading: true, error: null })

          const supabase = createClient()
          const { data: { user }, error: userError } = await supabase.auth.getUser()

          if (userError || !user) {
            set({ subscription: null, hasActiveSubscription: false, error: 'User not authenticated' })
            return
          }

          const { data: subscriptionData, error: subscriptionError } = await supabase.rpc('get_user_active_subscription', {
            user_uuid: user.id
          })

          if (subscriptionError) {
            set({ subscription: null, hasActiveSubscription: false, error: 'Error fetching subscription information' })
            return
          }

          const sub = subscriptionData && subscriptionData.length > 0 ? (subscriptionData[0] as SubscriptionData) : null
          set({ subscription: sub, hasActiveSubscription: !!sub && sub.status === 'active' })
        } catch (err) {
          set({ subscription: null, hasActiveSubscription: false, error: 'Unexpected error fetching subscription' })
        } finally {
          set({ isLoading: false, initialized: true })
        }
      },

      init: async () => {
        if (!get().initialized) {
          await get().fetch()
        }
      },
    }),
    {
      name: 'subscription-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        subscription: state.subscription,
        hasActiveSubscription: state.hasActiveSubscription,
      }),
      version: 1,
    }
  )
)

export const selectSubscription = (s: SubscriptionState) => s.subscription
export const selectHasActiveSubscription = (s: SubscriptionState) => s.hasActiveSubscription
export const selectLoading = (s: SubscriptionState) => s.isLoading
export const selectError = (s: SubscriptionState) => s.error