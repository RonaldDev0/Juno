'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/user'
import { useSubscriptionStore } from '@/store/subscription'

export function StoreInitializer() {
  useEffect(() => {
    useUserStore.getState().init()
    useSubscriptionStore.getState().init()
  }, [])

  return null
}

