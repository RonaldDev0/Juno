import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionCancelled(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription cancelled:', e.data.id)
}
