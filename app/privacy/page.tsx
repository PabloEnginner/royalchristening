import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Royal Christening collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Legal</p>
        <h1
          className="text-4xl text-stone-800 mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Privacy Policy
        </h1>
        <p className="text-stone-400 text-sm">Last updated: January 2025</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm leading-relaxed space-y-8">

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            1. Information We Collect
          </h2>
          <p className="text-stone-500 mb-3">When you place an order or interact with Royal Christening, we may collect:</p>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Name, email address, and phone number</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Shipping and billing address</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Payment information (processed securely by Stripe — we do not store card details)</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Order history and product selections</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Email address if you subscribe to our newsletter</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Browser and device information for analytics purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            2. How We Use Your Information
          </h2>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To process and fulfill your orders</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To send order confirmations, shipping updates, and tracking information</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To send follow-up satisfaction emails after your purchase</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To send newsletter emails if you have subscribed (you may unsubscribe at any time)</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To improve our website and customer experience</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            3. Sharing of Information
          </h2>
          <p className="text-stone-500 mb-3">We do not sell your personal information. We may share your data with:</p>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> <strong>Stripe</strong> — for secure payment processing</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> <strong>EasyPost / Shipping carriers</strong> — to generate and fulfill shipping labels (USPS, UPS, FedEx)</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> <strong>Email service providers</strong> — to deliver transactional and marketing emails</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Law enforcement or authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            4. Cookies & Tracking
          </h2>
          <p className="text-stone-500">
            We use cookies to maintain your shopping cart and improve your browsing experience.
            We may also use analytics tools to understand how visitors use our site.
            You can disable cookies in your browser settings, though some features may not function properly.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            5. Data Security
          </h2>
          <p className="text-stone-500">
            We implement industry-standard security measures to protect your personal information.
            All payment processing is handled by Stripe (PCI-DSS Level 1 certified). We use HTTPS
            encryption across our entire website. However, no method of transmission over the internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            6. Your Rights
          </h2>
          <p className="text-stone-500 mb-3">You have the right to:</p>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Request access to the personal data we hold about you</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Request correction or deletion of your personal data</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Opt out of marketing emails at any time using the unsubscribe link</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Lodge a complaint with a data protection authority</li>
          </ul>
          <p className="text-stone-500 mt-3">
            To exercise any of these rights, email us at{' '}
            <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
              hello@royalchristening.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            7. Children&apos;s Privacy
          </h2>
          <p className="text-stone-500">
            Our website is intended for adults purchasing products for children. We do not knowingly
            collect personal information from children under 13. If you believe we have inadvertently
            collected such information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            8. Changes to This Policy
          </h2>
          <p className="text-stone-500">
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated date. Continued use of our website after changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            9. Contact
          </h2>
          <p className="text-stone-500">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
              hello@royalchristening.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
