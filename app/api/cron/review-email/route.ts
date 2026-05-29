export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  // Protect endpoint — Vercel Cron sends Authorization header with CRON_SECRET
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { Redis } = await import('@upstash/redis')
    const redis = new Redis({
      url:   process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })

    const now        = Date.now()
    const fiveDaysAgo = now - FIVE_DAYS_MS
    const oneDayAgo   = now - (6 * 24 * 60 * 60 * 1000) // remove anything older than 6 days (already sent)

    // Get orders paid between 5 and 6 days ago
    const members = await redis.zrange(
      'review_queue',
      fiveDaysAgo - FIVE_DAYS_MS, // 10 days ago floor (safety)
      fiveDaysAgo,
      { byScore: true }
    )

    if (!members.length) {
      return NextResponse.json({ sent: 0, message: 'No reviews due today' })
    }

    const { sendReviewRequestEmail } = await import('@/lib/email')
    let sent = 0

    for (const member of members) {
      try {
        const data = typeof member === 'string' ? JSON.parse(member) : member
        await sendReviewRequestEmail({
          customerName:  data.customerName,
          customerEmail: data.customerEmail,
          orderNumber:   data.orderNumber,
          productNames:  data.productNames,
        })
        sent++
      } catch (err) {
        console.error('Review email send error:', err)
      }
    }

    // Remove processed entries (all entries older than 6 days)
    await redis.zremrangebyscore('review_queue', 0, oneDayAgo)

    return NextResponse.json({ sent, total: members.length })
  } catch (err: unknown) {
    console.error('Cron error:', err)
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
