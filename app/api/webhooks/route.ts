export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { generateOrderNumber } from '@/lib/utils'
import { CartItem } from '@/types'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const meta = session.metadata ?? {}

      const rawItems = JSON.parse(meta.items ?? '[]') as Array<{
        id: string; name: string; size: string; sizeLabel: string; qty: number; price: number
      }>

      const items: CartItem[] = rawItems.map(i => ({
        product:   { id: i.id, name: i.name, price: i.price } as CartItem['product'],
        size:      i.size,
        sizeLabel: i.sizeLabel,
        quantity:  i.qty,
      }))

      const orderNumber    = generateOrderNumber()
      const customerName   = meta.customerName  ?? session.customer_details?.name  ?? 'Customer'
      const customerEmail  = session.customer_details?.email ?? ''

      const shippingAddr = {
        name:    customerName,
        address: meta.shippingStreet  ?? '',
        city:    meta.shippingCity    ?? '',
        state:   meta.shippingState   ?? '',
        zip:     meta.shippingZip     ?? '',
        country: 'US',
      }

      // ── 1. Buy EasyPost label ────────────────────────────────────────
      let trackingCode     = ''
      let labelUrl         = ''
      let shippingCarrier  = meta.shippingLabel ?? ''

      if (meta.shipmentId && meta.rateId) {
        try {
          const { buyShippingLabel } = await import('@/lib/easypost')
          const label = await buyShippingLabel(meta.shipmentId, meta.rateId)
          trackingCode    = label.trackingCode
          labelUrl        = label.labelUrl
          shippingCarrier = `${label.carrier} ${label.service}`
        } catch (labelErr) {
          console.error('Label purchase error:', labelErr)
          // Non-fatal — emails still send, admin notified
        }
      }

      const emailData = {
        orderNumber,
        customerName,
        customerEmail,
        items,
        total:    session.amount_total ?? 0,
        shipping: shippingAddr,
        trackingCode,
        labelUrl,
        shippingCarrier,
      }

      // ── 2. Send confirmation emails ──────────────────────────────────
      const { sendAdminOrderEmail, sendCustomerOrderEmail } = await import('@/lib/email')

      await Promise.all([
        sendAdminOrderEmail(emailData),
        customerEmail ? sendCustomerOrderEmail(emailData) : Promise.resolve(),
      ])

      // ── 3. Queue 5-day review email in Upstash Redis ─────────────────
      if (customerEmail) {
        try {
          const { Redis } = await import('@upstash/redis')
          const redis = new Redis({
            url:   process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
          })

          const reviewPayload = JSON.stringify({
            customerName,
            customerEmail,
            orderNumber,
            productNames: rawItems.map(i => i.name),
            paidAt:       Date.now(),
          })

          // Store in a sorted set with timestamp as score for easy range querying
          await redis.zadd('review_queue', {
            score:  Date.now(),
            member: reviewPayload,
          })
        } catch (redisErr) {
          console.error('Redis queue error:', redisErr)
          // Non-fatal
        }
      }

    } catch (err) {
      console.error('Webhook processing error:', err)
    }
  }

  return NextResponse.json({ received: true })
}
