export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const {
      items,
      customerEmail,
      shippingCost,
      shippingLabel,
      shipmentId,
      rateId,
      shippingAddress,
    }: {
      items:           CartItem[]
      customerEmail?:  string
      shippingCost:    number   // cents
      shippingLabel:   string   // e.g. "USPS Priority Mail"
      shipmentId:      string
      rateId:          string
      shippingAddress: { name: string; street1: string; city: string; state: string; zip: string }
    } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const lineItems: { price_data: { currency: string; product_data: { name: string; description: string; images: string[]; metadata: Record<string, string> }; unit_amount: number }; quantity: number }[] = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name:        item.product.name,
          description: `Size: ${item.sizeLabel}`,
          images:      item.product.images[0]?.startsWith('http') ? [item.product.images[0]] : [],
          metadata:    { productId: item.product.id, size: item.size, sizeLabel: item.sizeLabel },
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
    }))

    // Shipping as a fixed line item (cost already calculated by EasyPost)
    lineItems.push({
      price_data: {
        currency:     'usd',
        product_data: {
          name:        shippingLabel,
          description: 'Shipping',
          images:      [],
          metadata:    {},
        },
        unit_amount: shippingCost,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      customer_email:       customerEmail,
      line_items:           lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        items: JSON.stringify(
          items.map(i => ({
            id:        i.product.id,
            name:      i.product.name,
            size:      i.size,
            sizeLabel: i.sizeLabel,
            qty:       i.quantity,
            price:     i.product.price,
          }))
        ),
        shipmentId,
        rateId,
        shippingLabel,
        customerName:    shippingAddress.name,
        shippingStreet:  shippingAddress.street1,
        shippingCity:    shippingAddress.city,
        shippingState:   shippingAddress.state,
        shippingZip:     shippingAddress.zip,
      },
      custom_text: {
        submit: { message: 'God bless your little one on this sacred day 🙏' },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Checkout error:', err)
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
