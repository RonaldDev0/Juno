'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, Star, ArrowRight, Loader2 } from 'lucide-react'
import { usePlans } from '@/hooks/use-plans'
import { usePay } from '@/hooks/use-pay'

export default function Pricing() {
  const { plans, loading, error } = usePlans()
  const { processPayment, isLoading: paymentLoading, error: paymentError } = usePay()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)

  const handlePayment = async (plan: { id: string; pricing: { monthly: { variant_id: string }; yearly: { variant_id: string } } }) => {
    setProcessingPlan(plan.id)
    
    try {
      await processPayment({
        planId: plan.id,
        billingCycle,
        planPricing: plan.pricing
      })
    } catch (error) {
      console.error('Payment error:', error)
      // You can add toast notification here
    } finally {
      setProcessingPlan(null)
    }
  }

  // Loading state with skeleton
  if (loading) {
    return (
      <div className='grid md:grid-cols-3 gap-8 mb-16'>
        {[1, 2, 3].map(i => (
          <Card key={i} className='relative border-0 shadow-lg flex flex-col h-full'>
            <CardHeader className='text-center pt-8'>
              <Skeleton className='h-8 w-24 mx-auto mb-2' />
              <Skeleton className='h-4 w-32 mx-auto mb-4' />
              <Skeleton className='h-12 w-20 mx-auto' />
            </CardHeader>
            <CardContent className='space-y-4 flex flex-col flex-grow'>
              <div className='space-y-3 flex-grow'>
                {[1, 2, 3, 4, 5].map(j => (
                  <div key={j} className='flex items-center gap-3'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <Skeleton className='h-4 flex-1' />
                  </div>
                ))}
              </div>
              <Skeleton className='h-12 w-full mt-6' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-600 mb-4'>Error loading pricing plans</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Payment Error Display */}
      {paymentError && (
        <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <p className='text-red-600 dark:text-red-400 text-sm'>{paymentError}</p>
        </div>
      )}

      {/* Billing Toggle - Sliding Background */}
      <div className='flex flex-col items-center space-y-4 mb-12'>
        <div className='relative bg-muted/30 rounded-full p-1.5 border border-border/50'>
          {/* Sliding background */}
          <div 
            className={`absolute top-1 bottom-1 bg-background rounded-full shadow-sm border border-border/50 transition-all duration-300 ease-in-out ${
              billingCycle === 'monthly' 
                ? 'left-1 w-[calc(50%-2px)]' 
                : 'left-[calc(50%+1px)] w-[calc(50%-2px)]'
            }`}
          />
          
          <div className='relative flex items-center space-x-1'>
            <Button
              onClick={() => setBillingCycle('monthly')}
              variant='ghost'
              size='default'
              className={`rounded-full px-6 py-2 relative z-10 transition-colors duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-foreground hover:text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </Button>
            <div className='relative'>
              <Button
                onClick={() => setBillingCycle('yearly')}
                variant='ghost'
                size='default'
                className={`rounded-full px-6 py-2 relative z-10 transition-colors duration-300 ${
                  billingCycle === 'yearly'
                    ? 'text-foreground hover:text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Yearly
              </Button>
              <div className='absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-bold z-20'>
                17% off
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-8 mb-16'>
        {plans.map(plan => {
          const currentPricing = billingCycle === 'monthly' ? plan.pricing.monthly : plan.pricing.yearly
          const savings = billingCycle === 'yearly' ? plan.pricing.yearly.savings_percentage : 0
          const hasSavings = savings && savings > 0
          
          // Calculate USD savings for yearly billing
          const monthlyYearlyTotal = plan.pricing.monthly.price_cents * 12
          const yearlyPrice = plan.pricing.yearly.price_cents
          const usdSavings = billingCycle === 'yearly' ? (monthlyYearlyTotal - yearlyPrice) / 100 : 0

          return (
            <Card
              key={plan.id}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${plan.is_popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
            >
              {plan.is_popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2'>
                    <Star className='h-4 w-4' />
                    Most popular
                  </div>
                </div>
              )}

              <CardHeader className='text-center pt-8'>
                <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                <CardDescription className='text-base'>{plan.description}</CardDescription>
                <div className='mt-4'>
                  <span className='text-4xl font-bold'>{currentPricing.price_display}</span>
                  <span className='text-muted-foreground ml-1'>
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {hasSavings ? (
                  <div className='text-sm text-green-600 font-medium mt-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full inline-block border border-green-200 dark:border-green-800'>
                    Save ${usdSavings.toFixed(0)} with yearly billing
                  </div>
                ) : null}
              </CardHeader>

              <CardContent className='space-y-4 flex flex-col flex-grow'>
                <ul className='space-y-3 flex-grow'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center gap-3'>
                      <Check className='h-5 w-5 text-green-500 flex-shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className='w-full mt-6' 
                  size='lg'
                  onClick={() => handlePayment(plan)}
                  disabled={processingPlan === plan.id}
                >
                  {processingPlan === plan.id ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}