'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail]   = useState('')
  const [state, setState]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setState('success')
      setMessage('Thank you! Check your inbox for a welcome note.')
      setEmail('')
    } catch (err: unknown) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="max-w-sm mx-auto text-center py-3">
        <p className="text-gold-700 font-medium text-sm">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="flex border border-gold-200">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 text-sm focus:outline-none bg-white"
          disabled={state === 'loading'}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="px-6 py-3 bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap tracking-wide disabled:opacity-60"
        >
          {state === 'loading' ? '...' : 'Subscribe'}
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-xs text-red-500 text-center">{message}</p>
      )}
    </form>
  )
}
