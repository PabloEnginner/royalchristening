export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const { sendNewsletterWelcomeEmail, sendNewsletterAdminNotification } = await import('@/lib/email')

    await Promise.all([
      sendNewsletterWelcomeEmail(email),
      sendNewsletterAdminNotification(email),
    ])

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Newsletter error:', err)
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
