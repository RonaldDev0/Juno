import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionPaymentRefunded(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription payment refunded:', e.data.id)
}