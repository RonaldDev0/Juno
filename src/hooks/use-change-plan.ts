'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { usePlans } from './use-plans'
import { useSubscriptionStore, selectSubscription, selectHasActiveSubscription, type SubscriptionData } from '@/store/subscription'
import { createClient } from '@/lib/supabase/client'

type BillingCycle = 'monthly' | 'yearly'

interface ChangePlanParams {
  planId: string
  billingCycle: BillingCycle
}

interface UseChangePlanOptions {
  onConfirm?: (params: ChangePlanParams) => Promise<void>
  initialOpen?: boolean
  initialCycle?: BillingCycle
}

interface UseChangePlanReturn {
  // Dialog state
  open: boolean
  setOpen: (open: boolean) => void
  openModal: (params?: Partial<ChangePlanParams>) => void
  closeModal: () => void

  // Selection state
  selectedPlanId: string | null
  setSelectedPlanId: (planId: string | null) => void
  billingCycle: BillingCycle
  setBillingCycle: (cycle: BillingCycle) => void

  // Data
  plans: ReturnType<typeof usePlans>['plans']
  plansLoading: boolean
  subscription: SubscriptionData | null
  hasActiveSubscription: boolean

  // Computed
  selectedPlan: any | null
  selectedPricing: { variant_id: string } | null

  // Action
  confirmChange: () => Promise<void>
  isProcessing: boolean
  error: string | null

  // Helper to wire into <Dialog open={...} onOpenChange={...} /> quickly
  getDialogProps: () => { open: boolean; onOpenChange: (open: boolean) => void }
}

export function useChangePlan(options: UseChangePlanOptions = {}): UseChangePlanReturn {
  const router = useRouter()
  const supabase = createClient()
  const { plans, loading: plansLoading } = usePlans()
  const subscription = useSubscriptionStore(selectSubscription)
  const hasActiveSubscription = useSubscriptionStore(selectHasActiveSubscription)

  const [open, setOpen] = useState<boolean>(options.initialOpen ?? false)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(options.initialCycle ?? 'monthly')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openModal = (params?: Partial<ChangePlanParams>) => {
    if (params?.planId) setSelectedPlanId(params.planId)
    if (params?.billingCycle) setBillingCycle(params.billingCycle)
    setOpen(true)
  }

  const closeModal = () => setOpen(false)

  const selectedPlan = useMemo(() => {
    if (!selectedPlanId) return null
    return plans.find(p => p.id === selectedPlanId) ?? null
  }, [plans, selectedPlanId])

  const selectedPricing = useMemo(() => {
    if (!selectedPlan) return null
    return billingCycle === 'monthly' ? selectedPlan.pricing.monthly : selectedPlan.pricing.yearly
  }, [selectedPlan, billingCycle])

  const confirmChange = async () => {
    try {
      setIsProcessing(true)
      setError(null)

      // Ensure user is authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        toast.error('Authentication required', {
          description: 'Please log in to manage your subscription'
        })
        router.push('/login')
        return
      }

      if (!selectedPlanId || !selectedPricing) {
        toast.error('Select a plan', {
          description: 'Choose a plan and billing cycle to continue'
        })
        return
      }

      // Prevent no-op changes
      if (hasActiveSubscription && subscription) {
        const isSamePlan = subscription.plan_name?.toLowerCase() === selectedPlan?.name?.toLowerCase()
        const isSameCycle = subscription.billing_cycle === billingCycle
        if (isSamePlan && isSameCycle) {
          toast.info('Already on this plan', {
            description: 'Select a different plan or cycle to change'
          })
          return
        }
      }

      // Loading toast
      const loadingToast = toast.loading('Preparing plan change...', {
        description: 'We will redirect you to manage your subscription'
      })

      if (options.onConfirm) {
        await options.onConfirm({ planId: selectedPlanId, billingCycle })
      } else {
        // Default behavior: try to open customer portal (to be implemented)
        // As a placeholder, show info and keep the modal open until UI handles navigation
        toast.info('Customer portal not configured', {
          description: 'Please implement /api/lemonsqueezy/customer-portal and wire navigation'
        })
      }

      toast.dismiss(loadingToast)
      toast.success('Redirecting...', {
        description: 'Follow the steps to finalize your plan change'
      })

      // Close modal by default after action
      setOpen(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Plan change failed'
      setError(msg)
      toast.error('Plan change failed', {
        description: 'Please try again or contact support'
      })
      throw err
    } finally {
      setIsProcessing(false)
    }
  }

  const getDialogProps = () => ({ open, onOpenChange: setOpen })

  return {
    open,
    setOpen,
    openModal,
    closeModal,
    selectedPlanId,
    setSelectedPlanId,
    billingCycle,
    setBillingCycle,
    plans,
    plansLoading,
    subscription,
    hasActiveSubscription,
    selectedPlan,
    selectedPricing,
    confirmChange,
    isProcessing,
    error,
    getDialogProps,
  }
}