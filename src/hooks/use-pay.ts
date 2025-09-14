import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface PaymentParams {
  planId: string
  billingCycle: 'monthly' | 'yearly'
  planPricing: {
    monthly: { variant_id: string }
    yearly: { variant_id: string }
  }
}

interface UsePayReturn {
  processPayment: (params: PaymentParams) => Promise<void>
  isLoading: boolean
  error: string | null
  data: any | null
}

export function usePay(): UsePayReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any | null>(null)
  const router = useRouter()

  const processPayment = async ({ planId, billingCycle, planPricing }: PaymentParams) => {
    try {
      setIsLoading(true)
      setError(null)
      setData(null)

      // Check if user is authenticated
      const supabase = createClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push('/login')
        return
      }

      const { monthly: { variant_id: monthlyVariantId }, yearly: { variant_id: yearlyVariantId } } = planPricing
      
      let variantIds = []

      if (billingCycle === 'monthly') {
        variantIds.push(yearlyVariantId, monthlyVariantId)
      } else {
        variantIds.push(yearlyVariantId)
      }

      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, billingCycle, variantIds })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Payment failed')
      }

      const responseData = await response.json()
      setData(responseData)
      router.push(responseData.url)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      // console.error('Payment error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    processPayment,
    isLoading,
    error,
    data
  }
}
