import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionExpired(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription expired:', e.data.id)
}