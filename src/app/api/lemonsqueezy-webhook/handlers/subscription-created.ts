import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionCreated(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription created:', e.data.id)
}