import { useState, useEffect } from 'react'

// =============================================
// PLANS HOOK - OPTIMIZED DATA FETCHING
// =============================================

interface PlanPricing {
  id: string
  price_cents: number
  price_display: string
  variant_id: string
  savings_percentage?: number
}

interface Plan {
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

interface UsePlansReturn {
  plans: Plan[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function usePlans(): UsePlansReturn {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/plans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 24 hours since plans don't change frequently
        cache: 'force-cache',
        next: { revalidate: 86400 } // Revalidate every 24 hours (86400 seconds)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setPlans(data.plans || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plans'
      setError(errorMessage)
      console.error('Error fetching plans:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return {
    plans,
    loading,
    error,
    refetch: fetchPlans
  }
}
