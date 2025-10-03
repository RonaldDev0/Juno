import { LemonSqueezyWebhookEvent } from './types'
import {
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionCancelled,
  handleSubscriptionResumed,
  handleSubscriptionExpired,
  handleSubscriptionPaused,
  handleSubscriptionUnpaused,
  handleSubscriptionPaymentFailed,
  handleSubscriptionPaymentSuccess,
  handleSubscriptionPaymentRecovered,
  handleSubscriptionPaymentRefunded,
  handleSubscriptionPlanChanged
} from './handlers'

type EventType = {
  name: string,
  handler: (e: LemonSqueezyWebhookEvent) => Promise<any>
}

export const eventTypes: EventType[] = [
  // Non-subscription events (commented out for SaaS)
  // { name: 'affiliate_activated', handler: () => {} },
  // { name: 'order_created', handler: () => {}},
  // { name: 'order_refunded', handler: () => {} },
  // { name: 'license_key_created', handler: () => {} },
  // { name: 'license_key_updated', handler: () => {} },

  // Subscription lifecycle events (active for SaaS)
  { name: 'subscription_created', handler: handleSubscriptionCreated },
  { name: 'subscription_updated', handler: handleSubscriptionUpdated },
  { name: 'subscription_cancelled', handler: handleSubscriptionCancelled },
  { name: 'subscription_resumed', handler: handleSubscriptionResumed },
  { name: 'subscription_expired', handler: handleSubscriptionExpired },
  { name: 'subscription_paused', handler: handleSubscriptionPaused },
  { name: 'subscription_unpaused', handler: handleSubscriptionUnpaused },

  // Subscription payment events
  { name: 'subscription_payment_failed', handler: handleSubscriptionPaymentFailed },
  { name: 'subscription_payment_success', handler: handleSubscriptionPaymentSuccess },
  { name: 'subscription_payment_recovered', handler: handleSubscriptionPaymentRecovered },
  { name: 'subscription_payment_refunded', handler: handleSubscriptionPaymentRefunded },

  // Plan change events
  { name: 'subscription_plan_changed', handler: handleSubscriptionPlanChanged }
]
