import { NextResponse, type NextRequest } from 'next/server'
import { LemonSqueezyWebhookEvent } from './types'
import { verifyWebhookSignature } from './verify-webhook-signature'
import { eventTypes } from './event-types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-signature')

    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event: LemonSqueezyWebhookEvent = JSON.parse(body)

    const eventType = eventTypes.find(eventType => eventType.name === event.meta.event_name)

    if (!eventType) {
      console.log(`Unhandled event type: ${event.meta.event_name}`)
      return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 })
    }

    eventType.handler(event)

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

