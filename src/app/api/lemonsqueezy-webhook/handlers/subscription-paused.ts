import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionPaused(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription paused:', e.data.id)
}