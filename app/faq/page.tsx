import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Answers to common questions about our christening sets, sizing, shipping, and care.',
}

const FAQS = [
  {
    category: 'Orders & Products',
    items: [
      {
        q: 'What is included in a christening set?',
        a: 'Each christening set includes everything needed for the baptism ceremony. Most sets include a christening cape or outfit, a romper or suit, a baptismal manta (cloth), a decorated baptismal candle (vela), and a baptismal shell (concha). Exact contents vary by set — check the "What\'s Included" section on each product page for full details.',
      },
      {
        q: 'What sizes do you carry?',
        a: 'We carry sizes from Newborn (NB) through 3T for most sets. Each size corresponds to your baby\'s age and measurements. Visit our Size Guide for detailed measurements to find the perfect fit.',
      },
      {
        q: 'Can I order if my baby\'s baptism is soon?',
        a: 'Yes! We offer expedited shipping (2–3 business days). If you need your order quickly, select expedited shipping at checkout. Orders are prepared within 1–2 business days before shipping.',
      },
      {
        q: 'Are the photos on the website accurate to the actual product?',
        a: 'We strive for 100% accuracy. All product photos show the actual item you will receive. Colors may vary slightly due to monitor settings.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'Where do you ship?',
        a: 'We ship within the United States. All orders are shipped from our location in the US.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5–7 business days. Expedited shipping takes 2–3 business days. You will receive a tracking number once your order ships.',
      },
      {
        q: 'How much does shipping cost?',
        a: 'Shipping rates are calculated at checkout based on your address and the carrier option you choose. You\'ll see all available options with real-time pricing before completing your order.',
      },
      {
        q: 'Will I receive a tracking number?',
        a: 'Yes! Once your order ships, you will receive an email with your tracking number. Delivery typically follows 1–2 business days after the shipping confirmation.',
      },
    ],
  },
  {
    category: 'Care Instructions',
    items: [
      {
        q: 'How do I care for the christening garments?',
        a: 'Most of our garments are dry clean recommended to preserve the delicate embroidery, beadwork, and fabric blends. See our Care Instructions page for detailed guidance.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), Apple Pay, and Google Pay. All payments are processed securely through Stripe.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use Stripe for all payment processing — a PCI-DSS Level 1 certified payment provider. We never store your card information on our servers.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Help Center</p>
        <h1
          className="text-4xl lg:text-5xl text-stone-800 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto">
          Everything you need to know about our christening sets, sizing, shipping, and care.
        </p>
      </div>

      {/* FAQ sections */}
      <div className="space-y-12">
        {FAQS.map(section => (
          <div key={section.category}>
            <h2
              className="text-2xl text-stone-700 mb-6 pb-3 border-b border-gold-100"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
            >
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.items.map((item, i) => (
                <div key={i} className="bg-cream-50 border border-gold-100 p-6">
                  <h3 className="text-stone-800 font-semibold text-sm mb-3 flex items-start gap-2">
                    <span className="text-gold-400 font-bold mt-px shrink-0">Q.</span>
                    {item.q}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed pl-5">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-16 text-center bg-gold-900 text-white p-10">
        <h2
          className="text-2xl text-gold-100 mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Still Have Questions?
        </h2>
        <p className="text-gold-300 text-sm mb-6">
          Our team is happy to help Monday–Friday, 9 am – 5 pm CT.
        </p>
        <a
          href="mailto:hello@royalchristening.com"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold hover:bg-gold-400 transition-colors text-sm tracking-widest uppercase"
        >
          Contact Us
        </a>
      </div>

      <p className="mt-8 text-center text-xs text-stone-400">
        <Link href="/size-guide" className="text-gold-600 hover:underline">Size Guide</Link>
        {' · '}
        <Link href="/care-guide" className="text-gold-600 hover:underline">Care Instructions</Link>
        {' · '}
        <Link href="/products" className="text-gold-600 hover:underline">Shop Collection</Link>
      </p>
    </div>
  )
}
