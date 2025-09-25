import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionResumed(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription resumed:', e.data.id)
}