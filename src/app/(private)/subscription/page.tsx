'use client'

import { useChangePlan } from '@/hooks/use-change-plan'
import { usePlans } from '@/hooks/use-plans'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export default function ChangePlanPage() {
  const { plans, loading: plansLoading } = usePlans()
  const {
    setOpen,
    closeModal,
    selectedPlanId,
    setSelectedPlanId,
    billingCycle,
    setBillingCycle,
    confirmChange,
    isProcessing,
    getDialogProps,
    subscription,
    hasActiveSubscription,
  } = useChangePlan()

  // Do not auto-open the dialog on first render; open only on user action

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-2'>Change subscription plan</h1>
      <p className='text-muted-foreground mb-6'>
        Select a different plan or billing cycle. Changes may be prorated.
      </p>

      {/* Current subscription summary */}
      <div className='border rounded-md p-4 mb-6'>
        {hasActiveSubscription && subscription ? (
          <div className='flex items-center justify-between'>
            <div>
              <div className='font-medium'>Current plan</div>
              <div className='text-sm text-muted-foreground'>
                {subscription.plan_name} · {subscription.billing_cycle}
              </div>
            </div>
            <div className='text-sm text-muted-foreground'>
              Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className='text-sm text-muted-foreground'>You have no active subscription.</div>
        )}
      </div>

      {/* Billing cycle toggle */}
      <div className='flex mb-4 justify-center md:justify-start'>
        <div className='inline-flex gap-2 rounded-md border p-1'>
          <Button
            size='sm'
            variant={billingCycle === 'monthly' ? 'default' : 'outline'}
            aria-pressed={billingCycle === 'monthly'}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            size='sm'
            variant={billingCycle === 'yearly' ? 'default' : 'outline'}
            aria-pressed={billingCycle === 'yearly'}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Plans grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch'>
        {plansLoading ? (
          [0,1,2].map(i => (
            <Card key={i} className='flex flex-col h-full'>
              <CardHeader className='space-y-2'>
                <div className='h-4 w-24 bg-muted rounded animate-pulse' />
                <div className='h-3 w-16 bg-muted rounded animate-pulse' />
              </CardHeader>
              <CardContent>
                <div className='h-3 w-full bg-muted rounded mb-2 animate-pulse' />
                <div className='h-3 w-3/4 bg-muted rounded mb-2 animate-pulse' />
                <div className='h-6 w-24 bg-muted rounded mt-4 animate-pulse' />
              </CardContent>
              <CardFooter>
                <div className='h-9 w-full bg-muted rounded animate-pulse' />
              </CardFooter>
            </Card>
          ))
        ) : (
          plans.map(plan => {
            const price = billingCycle === 'monthly' ? plan.pricing.monthly.price_display : plan.pricing.yearly.price_display
            const isCurrentPlan = hasActiveSubscription && subscription ? plan.name.toLowerCase() === subscription.plan_name.toLowerCase() : false
            const isCurrentCycle = isCurrentPlan && billingCycle === subscription?.billing_cycle
            return (
              <Card key={plan.id} className='flex flex-col h-full'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 mb-2'>
                  <CardTitle className='text-base font-medium'>{plan.name}</CardTitle>
                  {isCurrentCycle ? (
                    <Badge variant='secondary'>Current</Badge>
                  ) : plan.is_popular && (
                    <Badge>Popular</Badge>
                  )}
                </CardHeader>
                <CardContent className='text-sm text-muted-foreground'>
                  {plan.description}
                  {isCurrentCycle && (
                    <div className='mt-2 text-xs'>
                      Currently on this plan · {subscription?.billing_cycle}
                    </div>
                  )}
                  <div className='text-xl font-semibold mt-4 text-foreground'>{price}</div>
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button
                    className='w-full'
                    disabled={isCurrentCycle}
                    variant={isCurrentCycle ? 'outline' : undefined}
                    onClick={() => { setSelectedPlanId(plan.id); setOpen(true); }}
                  >
                    {isCurrentCycle ? 'Current' : 'Select'}
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        )}
      </div>

      {/* Confirmation dialog */}
      <Dialog {...getDialogProps()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm plan change</DialogTitle>
            <DialogDescription>
              You will be redirected to manage your subscription. Changes may be prorated.
            </DialogDescription>
          </DialogHeader>
          {/* Selected plan summary inside the dialog */}
          {(() => {
            const selectedPlan = plans.find(p => p.id === selectedPlanId)
            const selectedPrice = selectedPlan
              ? (billingCycle === 'monthly' ? selectedPlan.pricing.monthly.price_display : selectedPlan.pricing.yearly.price_display)
              : null
            return (
              <div className='mt-2 text-sm flex items-center justify-between'>
                {selectedPlan ? (
                  <>
                    <span>
                      Selected: {selectedPlan.name} · {billingCycle}
                    </span>
                    <span className='font-medium'>{selectedPrice}</span>
                  </>
                ) : (
                  <span className='text-muted-foreground'>No plan selected.</span>
                )}
              </div>
            )
          })()}
          <DialogFooter>
            <Button
              variant='outline'
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              disabled={isProcessing || !selectedPlanId}
              onClick={confirmChange}
            >
              {isProcessing ? 'Redirecting...' : 'Manage change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}