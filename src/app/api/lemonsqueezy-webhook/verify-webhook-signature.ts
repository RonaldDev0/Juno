import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

export function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) {
    return false
  }

  // Lemon Squeezy uses HMAC-SHA256
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('hex')

  // Compare signatures securely
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}