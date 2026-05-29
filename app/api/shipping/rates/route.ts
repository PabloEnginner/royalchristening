export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getShippingRates } from '@/lib/easypost'

export async function POST(req: NextRequest) {
  try {
    const { name, street1, city, state, zip } = await req.json()

    if (!street1 || !city || !state || !zip) {
      return NextResponse.json({ error: 'Complete address required' }, { status: 400 })
    }

    const result = await getShippingRates({ name: name ?? '', street1, city, state, zip })
    return NextResponse.json(result)
  } catch (err: unknown) {
    console.error('Shipping rates error:', err)
    const message = err instanceof Error ? err.message : 'Unable to get shipping rates'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
