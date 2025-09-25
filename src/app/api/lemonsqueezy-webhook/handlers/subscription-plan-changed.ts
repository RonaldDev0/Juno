import { LemonSqueezyWebhookEvent } from '../types'

export async function handleSubscriptionPlanChanged(e: LemonSqueezyWebhookEvent) {
  console.log('Subscription plan changed:', e.data.id)
}