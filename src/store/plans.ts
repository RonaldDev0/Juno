'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface PlanPricing {
  id: string
  price_cents: number
  price_display: string
  variant_id: string
  savings_percentage?: number
}

export interface Plan {
  id: string
  name: string
  description: string | null
  features: string[]
  pricing: {
    monthly: PlanPricing
    yearly: PlanPricing
  }
  is_popular: boolean
}

type PlansState = {
  plans: Plan[]
  isLoading: boolean
  error: string | null
  initialized: boolean
  setPlans(plans: Plan[]): void
  clear(): void
  fetch(): Promise<void>
  init(): Promise<void>
}

let inFlightFetch: Promise<void> | null = null

export const usePlansStore = create<PlansState>()(
  persist(
    (set, get) => ({
      plans: [],
      isLoading: false,
      error: null,
      initialized: false,

      setPlans: (plans) => set({ plans }),

      clear: () => set({ plans: [], error: null }),

      fetch: async () => {
        try {
          if (get().isLoading) {
            // If already fetching, wait for the existing promise
            if (inFlightFetch) {
              await inFlightFetch
              return
            }
          }

          set({ isLoading: true, error: null })

          const p = (async () => {
            const response = await fetch('/api/plans', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              // We rely on client-side store for caching, so no-store is fine
              cache: 'no-store',
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({ plans: data.plans || [] })
          })()

          inFlightFetch = p
          await p
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plans'
          set({ error: errorMessage })
          // eslint-disable-next-line no-console
          console.error('Error fetching plans:', err)
        } finally {
          inFlightFetch = null
          set({ isLoading: false, initialized: true })
        }
      },

      init: async () => {
        const state = get()
        if (state.initialized) return
        // If plans are already in storage (persisted), consider initialized
        if (state.plans.length > 0) {
          set({ initialized: true })
          return
        }
        if (state.isLoading) {
          if (inFlightFetch) await inFlightFetch
          return
        }
        await get().fetch()
      },
    }),
    {
      name: 'plans-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ plans: state.plans }),
      version: 1,
    }
  )
)

export const selectPlans = (s: PlansState) => s.plans
export const selectPlansLoading = (s: PlansState) => s.isLoading
export const selectPlansError = (s: PlansState) => s.error