'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'

export type SupabaseUser = {
  id: string
  email: string | null
  user_metadata?: Record<string, any>
  created_at?: string
} | null

interface UserState {
  user: SupabaseUser
  isLoading: boolean
  error: string | null
  initialized: boolean
  setUser(u: SupabaseUser): void
  clear(): void
  fetch(): Promise<void>
  init(): Promise<void>
}

let inFlightFetch: Promise<void> | null = null

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      initialized: false,

      setUser: (u) => set({ user: u }),

      clear: () => set({ user: null, error: null }),

      fetch: async () => {
        try {
          // If a fetch is already in progress, wait for it
          if (get().isLoading && inFlightFetch) {
            await inFlightFetch
            return
          }

          set({ isLoading: true, error: null })

          const p = (async () => {
            const supabase = createClient()
            const { data, error } = await supabase.auth.getUser()

            if (error) {
              set({ user: null, error: error.message })
              return
            }

            const u = (data?.user
              ? {
                  id: data.user.id,
                  email: data.user.email,
                  user_metadata: data.user.user_metadata,
                  created_at: (data.user as any).created_at,
                }
              : null) as SupabaseUser

            set({ user: u })
          })()

          inFlightFetch = p
          await p
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unexpected error fetching user'
          set({ user: null, error: message })
          // eslint-disable-next-line no-console
          console.error('Error fetching user:', err)
        } finally {
          inFlightFetch = null
          set({ isLoading: false, initialized: true })
        }
      },

      init: async () => {
        const state = get()
        if (state.initialized) return
        // If user was restored from storage, consider initialized
        if (state.user) {
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
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
      version: 1,
    }
  )
)

export const selectUser = (s: UserState) => s.user
export const selectUserLoading = (s: UserState) => s.isLoading
export const selectUserInitialized = (s: UserState) => s.initialized
export const selectUserError = (s: UserState) => s.error