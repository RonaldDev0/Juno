import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

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

      // Show loading toast
      const loadingToast = toast.loading('Processing payment...', {
        description: 'Please wait while we prepare your checkout'
      })

      // Check if user is authenticated
      const supabase = createClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        toast.dismiss(loadingToast)
        toast.error('Authentication required', {
          description: 'Please log in to continue with your purchase'
        })
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
        toast.dismiss(loadingToast)
        toast.error('Payment failed', {
          description: errorData.message || 'Unable to process payment. Please try again.'
        })
        throw new Error(errorData.message || 'Payment failed')
      }

      const responseData = await response.json()
      setData(responseData)
      
      // Show success toast
      toast.dismiss(loadingToast)
      toast.success('Redirecting to checkout...', {
        description: 'You will be redirected to complete your payment'
      })
      
      router.push(responseData.url)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      
      // Show error toast if not already shown
      if (!errorMessage.includes('Payment failed') && !errorMessage.includes('Authentication required')) {
        toast.error('Something went wrong', {
          description: 'Please try again or contact support if the problem persists'
        })
      }
      
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
