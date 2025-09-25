import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionUpdated(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription updated:', e.data.id)
}