import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionUnpaused(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription unpaused:', e.data.id)
}
