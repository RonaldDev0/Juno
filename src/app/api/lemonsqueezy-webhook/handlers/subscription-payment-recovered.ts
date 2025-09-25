import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionPaymentRecovered(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription payment recovered:', e.data.id)
}