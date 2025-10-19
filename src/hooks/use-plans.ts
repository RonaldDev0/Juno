'use client'

import { useEffect, useCallback } from 'react'
import { usePlansStore, selectPlans, selectPlansLoading, selectPlansError } from '@/store/plans'
import type { Plan } from '@/store/plans'

interface UsePlansReturn {
  plans: Plan[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function usePlans(): UsePlansReturn {
  const plans = usePlansStore(selectPlans)
  const loading = usePlansStore(selectPlansLoading)
  const error = usePlansStore(selectPlansError)
  const fetch = usePlansStore((s) => s.fetch)
  const init = usePlansStore((s) => s.init)

  useEffect(() => {
    init()
  }, [init])

  const refetch = useCallback(async () => {
    await fetch()
  }, [fetch])

  return {
    plans,
    loading,
    error,
    refetch,
  }
}
