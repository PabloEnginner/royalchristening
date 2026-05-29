'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function SuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>

        <Image
          src="/logo.png"
          alt="Royal Christening"
          width={50}
          height={75}
          className="mx-auto mb-6 opacity-40"
        />

        <h1
          className="text-4xl lg:text-5xl text-stone-800 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Order Confirmed!
        </h1>

        <p className="text-stone-500 text-base leading-relaxed mb-6">
          Thank you for your order. We are preparing your little blessing&apos;s garment
          with love and care. You will receive a confirmation email shortly.
        </p>

        <div className="bg-cream-50 border border-gold-100 p-6 mb-8 text-left">
          <h3
            className="text-lg text-stone-700 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
          >
            What happens next?
          </h3>
          <ul className="space-y-3">
            {[
              { icon: Mail,        text: "You'll receive an order confirmation email within a few minutes" },
              { icon: CheckCircle, text: "We'll prepare your order with care (1–2 business days)" },
              { icon: CheckCircle, text: "Your order ships and you'll receive a tracking number" },
              { icon: CheckCircle, text: "Delivery in 5–7 business days (standard) or 2–3 days (expedited)" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                <item.icon size={15} className="text-gold-500 mt-0.5 shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="mb-8 border-l-2 border-gold-300 pl-5 text-left">
          <p
            className="text-xl text-gold-700 italic mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
          </p>
          <cite className="text-gold-400 text-sm not-italic">— Jeremiah 29:11</cite>
        </blockquote>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm tracking-widest uppercase"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gold-300 text-gold-700 font-semibold hover:bg-gold-50 transition-colors text-sm tracking-widest uppercase"
          >
            Go Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-stone-400">
          Questions about your order?{' '}
          <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  )
}
