import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionPaymentFailed(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription payment failed:', e.data.id)
}