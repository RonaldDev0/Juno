import { LemonSqueezyWebhookEvent } from './types'
import {
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionCancelled,
  handleSubscriptionExpired,
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
  // Subscription lifecycle events (active for SaaS)
  { name: 'subscription_created', handler: handleSubscriptionCreated },
  { name: 'subscription_updated', handler: handleSubscriptionUpdated },
  { name: 'subscription_cancelled', handler: handleSubscriptionCancelled },
  { name: 'subscription_expired', handler: handleSubscriptionExpired },

  // Subscription payment events
  { name: 'subscription_payment_failed', handler: handleSubscriptionPaymentFailed },
  { name: 'subscription_payment_success', handler: handleSubscriptionPaymentSuccess },
  { name: 'subscription_payment_recovered', handler: handleSubscriptionPaymentRecovered },
  { name: 'subscription_payment_refunded', handler: handleSubscriptionPaymentRefunded },

  // Plan change events
  { name: 'subscription_plan_changed', handler: handleSubscriptionPlanChanged }
]
